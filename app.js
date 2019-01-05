/*
 * @Author: wangss 
 * @Date: 2018-10-30 20:05:06 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-01-04 15:30:43
 */
const path = require('path');
const Koa = require('koa');
const config = require('./src/config/config');
const koajwt = require('koa-jwt');
const cors = require('koa2-cors');
// const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const compose = require('koa-compose');
const mongoose = require('mongoose');

console.log(config.db, '数据库');
mongoose.connect(config.db, {
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.error('Failed to connect to db');
    } else {
        console.log('Connecting db successfully');
    }
});

const getUploadFileExt = require('./src/app/utils/getUploadFileExt');
const checkDirExist = require('./src/app/utils/checkDirExist');
const getUploadDirName = require('./src/app/utils/getUploadDirName'); 

const errorHandle = require('./src/app/middlewares/errorhandle');
const app = new Koa();
const staticPath = './static';
app.use(koajwt({
    secret: config.secret
}).unless({
    path: [/\/register/, /\/login/, /\/getEmailCode/]
}));
const middlewares = compose([
    cors(),
    errorHandle,
    bodyParser(),
    koaStatic(__dirname + staticPath)
]);
app.use(middlewares);
// app.use(koaBody({
//     multipart:true,
//     encoding:'gzip',
//     formidable:{
//         uploadDir:path.join(__dirname,'public/upload'),
//         keepExtensions: true,
//         maxFieldsSize:2 * 1024 * 1024,
//         onFileBegin:(name,file) => {
//             // console.log(file);
//             // 获取文件后缀
//             const ext =getUploadFileExt(file.name);
//             // 最终要保存到的文件夹目录
//             const dir = path.join(__dirname,`public/upload/${getUploadDirName()}`);
//             // 检查文件夹是否存在如果不存在则新建文件夹
//             checkDirExist(dir);
//             // 重新覆盖 file.path 属性
//             file.path = `${dir}/${getUploadFileName(ext)}`;
//         },
//         onError:(err)=>{
//             console.log(err);
//         }
//     }
// }));


const routerList = require('./src/routers/index');

Object.keys(routerList).forEach(key=>{
   app.use(routerList[key].routes()).use(routerList[key].allowedMethods());
})

app.listen(config.prot,()=>{
    console.error(`服务器启动成功：localhost:${config.prot}`);
});



