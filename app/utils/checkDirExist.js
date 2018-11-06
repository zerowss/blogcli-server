/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 */

 const path = require('path');
 const fs = require('fs');

 const checkDirExist = (dirName)=>{
    if(!fs.existsSync(dirName)){
        fs.mkdirSync(dirName);
    }
 }

 module.exports = checkDirExist; 
