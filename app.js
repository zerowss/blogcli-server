/*
 * @Author: wangss 
 * @Date: 2018-10-30 20:05:06 
 * @Last Modified by: wangss
 * @Last Modified time: 2018-10-31 19:38:23
 */

const Koa = require('koa');
const config = require('./config/config');

const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = new Koa();

const options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  };
mongoose.connect(config.db,options,(err)=>{
    if (err) {
        console.error('Failed to connect to db');
    } else {
        console.log('Connecting db successfully');
    }
});

app.use(cors());
app.use(bodyParser());






app.listen(config.port);

