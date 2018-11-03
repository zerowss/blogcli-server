/*
 * @Author: wangss 
 * @Date: 2018-10-30 20:05:06 
 * @Last Modified by: wangss
 * @Last Modified time: 2018-11-03 14:02:06
 */

const Koa = require('koa');
const config = require('./config/config');

const cors = require('koa2-cors');
const koaBody = require('koa-body');
const mongoose = require('mongoose');

const app = new Koa();
app.use(cors());
app.use(koaBody());

console.log(config.db,'ss');
mongoose.connect(config.db,{useNewUrlParser: true},(err)=>{
    if (err) {
        console.error('Failed to connect to db');
    } else {
        console.log('Connecting db successfully');
    }
});



const example_router = require('./routers/api/example_router');
app.use(example_router.routes()).use(example_router.allowedMethods());


app.listen(config.prot,()=>{
    console.error(`服务器启动成功：localhost:${config.prot}`);
});



