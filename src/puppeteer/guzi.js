const fs = require('fs');
const puppeteer = require('puppeteer-core');
const fsnc = require('../common/fileunit');
console.log('fsnc',fsnc);

(async () => {
    const browser = await (puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: true,
        //设置超时时间
        timeout: 15000,
        //如果是访问https页面 此属性会忽略https错误
        ignoreHTTPSErrors: true,
        // 打开开发者工具, 当此值为true时, headless总为false
        devtools: false,
    }));
    const page = await browser.newPage();
    console.log('sds','ooop');

    try{
        // 进入页面
        await page.goto('https://news.qq.com');
        await page.waitForSelector('body');
        // 获取页面标题
        let title = await page.title();
        console.log(title);
        const result = await page.evaluate(() => {
            let ulList = [];
            const uls = Array.from(document.querySelectorAll('#List .list>li'));
            uls.forEach(item=>{
                ulList.push({
                    title: item.innerText
                });
            })
            console.log('ss', ulList);
            return ulList;
        })
        console.log('res', result);
        fsnc.savefile('news.txt', JSON.stringify(result))
    }catch(err){
        console.log('ERR:', err.message);
        throw err;
    } finally{
        browser.close();
    }
})();
