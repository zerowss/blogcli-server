/*
 * @Author: wangss 
 * @Date: 2018-11-02 14:55:39 
 * @Last Modified by: wangss
 * @Last Modified time: 2018-11-27 15:43:15
 */

const fs = require('fs');
const path = require('path');
// const controllers_path = path.join(__dirname,'/app/controllers');

let walk = (controllersPath)=>{
    fs.readdirSync(controllersPath).forEach(file=>{
        const filePath = path.join(controllersPath,'/'+file);
        const stat = fs.statSync(filePath);//获取fs.stats的一个实例
        if(stat.isFile()){
            if (/(.*)\.(js|coffee)/.test(file)) {
                require(filePath)
              }    
        }
        else if (stat.isDirectory()) {
            walk(filePath)
        }
    })
}

module.exports = walk;
