const puppeteer = require('puppeteer-core');

const MAX_RT = 3;

function getproxylist() {
    return new Promise(async(resolve,reject)=>{
        let tempbrowser;
        for (var i = MAX_RT; i > 0; i--) {
            if (tempbrowser) {
                break;
            }
            console.log('start to init browser...');
            tempbrowser = await puppeteer.launch({
                executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                headless: true
            }).catch(ex => {
                if (i - 1 > 0) {
                    console.log('browser launch failed. now retry...');
                } else {
                    console.log('browser launch failed!');
                }

            });
        }
        if (!tempbrowser) {
            reject('fail to launch browser');
            return;
        }
        const browser = tempbrowser;
        console.log('start to new page...');
        var page = await browser.newPage().catch(ex => {
            console.log(ex);
        });
        if (!page) {
            reject('fail to open page!');
            return;
        }

        var respond;
        for (var i = MAX_RT; i > 0; i--) {

            if (respond) {
                break;
            }

            console.log('start to goto page...');
            respond = await page.goto("http://31f.cn/socks-proxy/", {
                'waitUntil': 'domcontentloaded',
                'timeout': 120000
            }).catch(ex => {
                if (i - 1 > 0) {
                    console.log('fail to goto website. now retry...');
                } else {
                    console.log('fail to goto website!');
                }

            });
        }
        if (!respond) {
            reject('fail to go to website!');
            return;
        }

        console.log('start to find element in page...');
        var layoutVisible = await page.waitForSelector('.container .table-striped tbody').catch(ex => {
            console.log("oh....no...!!!, i can not see anything!!!");
        });
        if (!layoutVisible) {
            reject('layout is invisible!');
            return;
        }
        console.log('start to get info from element...');
        var proxyModelArray = await page.evaluate(async () => {

            let list = document.querySelectorAll('.container .table-striped tbody tr');
            if (!list) {
                return;
            }
            let result = [];
            //i = 0时获取的是标题
            for (var i = 1; i < list.length; i++) {
                var row = list[i];
                var cells = row.cells;

                var ip = cells[0].textContent;
                var port = cells[1].textContent;
                var code = cells[2].textContent;
                var version = cells[4].textContent;

                var proxyServerModel = {
                    'ip': ip,
                    'port': port,
                    'code': code,
                    'version': version
                }
                result.push(proxyServerModel);
            }
            return result;

        });

        await browser.close().catch(ex => {
            console.log('fail to close the browser!');
        });
        console.log('close the browser');

        //console.log(proxyModelArray);
        if (!proxyModelArray || proxyModelArray.length === 0) {
            reject();
            return;
        }
        resolve(proxyModelArray);
    })
}


const getProxyBrowser = async (rtc=3)=>{
    return new Promise(async (resolve,reject) => {
        const proxyList = await getproxylist().catch();
        
        if (!proxyList) {
            reject();
            return;
        }
        var browserList = [];
        var newProxyList = [];
        for(var i = 0; i < rtc; i++) {
            item = proxyList[Math.floor(Math.random() * proxyList.length)];
            newProxyList.push(item);
        }
        console.log('s==', newProxyList);
        
        for (var i = 0; i < rtc; i++) {

            var proxyserver = newProxyList[i];
            var proxyOption = proxyserver.version.toLowerCase() + '://' + proxyserver.ip + ':' + proxyserver.port;
            console.log('start into page');
            var browser = await puppeteer.launch({
                executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                headless: true,
                args: [
                    '--no-sandbox',
                    //'--window-size="800,600"',
                    //'--start-fullscreen'
                    '--proxy-server=' + proxyOption
                ],
                timeout: 300000
            }).catch();
            if (browser) {

                browserList.push(browser);
            }
        }

        if (browserList.length == 0) {
            reject()
            return;
        }

        resolve(browserList);
    })
}

const test = async ()=>{
    var proxylist;
    for (var i = 0; i < MAX_RT; i++) {

        if (proxylist) {
            break;
        }

        console.log('start get proxylist from web...');
        proxylist = await getproxylist().catch(ex => {
            if (i + 1 < MAX_RT) {
                console.log('fail to get proxylist. now retry...');
            } else {
                console.log('fail to get proxylist. end!!!');
            }
        });
    }
    // var ip = proxylist[0].ip;
    // console.log(ip);
    if (!proxylist) {
        console.log('fail to get proxylist!!!');
        return;
    }
    console.log(proxylist);
}

// test();

module.exports.getProxyList = getproxylist;
module.exports.getProxyBrowser = getProxyBrowser;
module.exports.test = test;
