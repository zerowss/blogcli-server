/*
 * @Author: wangss 
 * @Date: 2018-11-06 11:06:31 
 * @Last Modified by: wangss
 * @Last Modified time: 2018-11-27 15:42:49
 */

 
let getUploadDirName = ()=>{
    const date = new Date();
    let month = Number.parseInt(date.getMonth()) + 1;
    month = month > 10 ? month : `0${month}`;
    return `${date.getFullYear()}${month}${date.getDate()}`;
}

module.exports = getUploadDirName; 

