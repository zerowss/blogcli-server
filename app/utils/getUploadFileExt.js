
/**
 *
 *
 * @param {*} fileName 获取上传文件名
 * @returns
 */

const getUploadFileExt = (fileName)=>{
    const ext = fileName.split('.');
    return ext[ext.length - 1];
}

module.exports = {
    getUploadFileExt
}; 

