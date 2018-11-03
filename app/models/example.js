/*
 * @Author: wangss 
 * @Date: 2018-11-01 10:24:52 
 * @Last Modified by: wangss
 * @Last Modified time: 2018-11-02 17:53:35
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 const exampleSchema = new Schema({
     msg:{
         type:String,
         required:true
     },
     updated:{
         type:Date,
         default: Date.now
     }
 },{collection: 'example',versionKey: false});

 module.exports = mongoose.model('example', exampleSchema);



