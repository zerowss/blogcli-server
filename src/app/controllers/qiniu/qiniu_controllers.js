/*
 * @Author: wangss 
 * @Date: 2019-04-16 23:45:14 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-04-17 09:36:13
 */

 const qiniu = require('qiniu');
 const config = require('../../../config/config');
 const accessKey = config.qiniu.AK;
 const secretKey = config.qiniu.SK;
 const bucket = config.qiniu.Bucket;
 const action = config.qiniu.Action;
 const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

 const getPolicy = async (ctx)=>{
     const options = {
         scope: bucket,
         expires: 3600 * 24,
         returnBody: '{"url":"http://cdn.wsskk.top/$(key)","fsize":$(fsize),"name":"$(name)"}'
     };
     const putPolicy = new qiniu.rs.PutPolicy(options);
     const uploadToken = putPolicy.uploadToken(mac);
     ctx.status = 200;
     if (uploadToken) {
         ctx.body = {
             code: 0,
             data: {
                 action: action,
                 upload_token: uploadToken
             }
         }
     } else {
         ctx.body = {
             error: 'error'
         }
     }
 }

 const deleteFile = async (ctx)=>{
    const data = ctx.request.body;
    if(data.key){
        const config = new qiniu.conf.Config();
        //config.useHttpsDomain = true;
        config.zone = qiniu.zone.Zone_z1;
        const bucketManager = new qiniu.rs.BucketManager(mac, config);
        bucketManager.delete(bucket, data.key, function (err, respBody, respInfo) {
            if (err) {
                console.log(err);
                //throw err;
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
            }
        });
    }else{
        ctx.status = 200;
        ctx.body = {
            error: 'error'
        }
    }
    
 }

module.exports = {
    getPolicy,
    deleteFile
};
