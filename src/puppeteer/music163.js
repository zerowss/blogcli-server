const fs = require('fs');
const fsnc = require('../common/fileunit');
const server = require('../common/proxyserver');
const URL = 'https://music.163.com/#/discover/playlist?order=hot&cat=全部&limit=35&offset=';
// ?order=hot&cat=全部&limit=35&offset=0

const { save } = require('../app/controllers/music163/music163_controllers');

const getOnePage = async (page,pageN)=>{
    // 进入页面
    await page.goto(`${URL}${pageN*35}`);
    await page.waitForSelector('body');
    let iframe = await page.frames().find(f => f.name() === 'contentFrame');
    const result = await iframe.evaluate(() => {
        // 获取所有元素
        const elements = document.querySelectorAll('#m-pl-container > li');
        // 创建数组，存放获取的数据
        let res = [];
        for (let ele of elements) {
            let image = ele.querySelector('.j-flag').getAttribute('src');
            let name = ele.querySelector('.tit').innerText;
            let count = ele.querySelector('.nb').innerText;
            let author = ele.querySelector('.nm').innerText;
            let address = 'https://music.163.com/#' + ele.querySelector('.msk').getAttribute('href');
            const flag = (count.indexOf('万') > -1) && (parseInt(count.split('万')[0]) > 1000);
            // const flag = count.indexOf('万') > -1;
            if (flag) {
                res.push({
                    image,
                    name,
                    count,
                    author,
                    address,
                    from: 'netease',
                });
            }
        }
        // 返回数据
        return res;
    })
    return result;
};


const getMusic = async (pageNum)=>{
    const browserList = await server.getProxyBrowser(1);
    const browser = browserList[0];
    const page = await browser.newPage();
    let musicPlayList = [];
    try {
        for (let i = 0; i < pageNum; i++) {
           const result = await getOnePage(page, i);
            musicPlayList = musicPlayList.concat(result);
        }
        console.log('===', musicPlayList.length);
        // 保存之前去重
        let hash = {};
        musicPlayList = musicPlayList.reduce((item, next) => {
            hash[next.address] ? '' : hash[next.address] = true && item.push(next);
            return item
        }, []);
        musicPlayList.forEach(item=>{
            save(item);
        })
        await browser.close();
    } catch (err) {
        console.log('ERR:', err.message);
        throw err;
    } 
};


getMusic(3);

