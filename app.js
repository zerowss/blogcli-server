/*
 * @Author: wangss 
 * @Date: 2018-10-30 20:05:06 
 * @Last Modified by: wangss
 * @Last Modified time: 2018-11-19 13:43:48
 */
const path = require('path');
const Koa = require('koa');
const config = require('./config/config');

const cors = require('koa2-cors');
const koaBody = require('koa-body');
const mongoose = require('mongoose');

const getUploadFileExt = require('./app/utils/getUploadFileExt');
const checkDirExist = require('./app/utils/checkDirExist');
const getUploadDirName = require('./app/utils/getUploadDirName'); 

const app = new Koa();
app.use(cors());
app.use(koaBody({
    multipart:true,
    encoding:'gzip',
    formidable:{
        uploadDir:path.join(__dirname,'public/upload'),
        keepExtensions: true,
        maxFieldsSize:2 * 1024 * 1024,
        onFileBegin:(name,file) => {
            // console.log(file);
            // 获取文件后缀
            const ext =getUploadFileExt(file.name);
            // 最终要保存到的文件夹目录
            const dir = path.join(__dirname,`public/upload/${getUploadDirName()}`);
            // 检查文件夹是否存在如果不存在则新建文件夹
            checkDirExist(dir);
            // 重新覆盖 file.path 属性
            file.path = `${dir}/${getUploadFileName(ext)}`;
        },
        onError:(err)=>{
            console.log(err);
        }
    }
}));

console.log(config.db,'ss');
mongoose.connect(config.db,{useNewUrlParser: true},(err)=>{
    if (err) {
        console.error('Failed to connect to db');
    } else {
        console.log('Connecting db successfully')
    }
});



const example_router = require('./routers/api/example_router');
app.use(example_router.routes()).use(example_router.allowedMethods());


app.listen(config.prot,()=>{
    console.error(`服务器启动成功：localhost:${config.prot}`);
});



