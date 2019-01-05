/*
 * @Author: wangss 
 * @Date: 2018-11-02 14:55:39 
 * @Last Modified by: wangss
 * @Last Modified time: 2018-12-28 15:09:15
 */

const fs = require('fs');
const path = require('path');
// const controllers_path = path.join(__dirname,'/app/controllers');

class getFile {
    constructor() {
        this.fileObj = {}; //类中变量
    }
    walk(controllersPath){
        fs.readdirSync(controllersPath).forEach(file => {
            const filePath = path.join(controllersPath, '/' + file);
            const stat = fs.statSync(filePath); //获取fs.stats的一个实例
            if (stat.isFile()) {
                if (/(.*)\.(js|coffee)/.test(file)) {
                    const fileName = file.replace('.js', '');
                    this.fileObj[fileName] = require(filePath)
                }
            } else if (stat.isDirectory()) {
                walk(filePath)
            }
        })
    }
    getF() {
         return this.fileObj;
    }
}


module.exports = getFile;
