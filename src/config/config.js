/*
 * @Author: wangss 
 * @Date: 2018-10-30 19:55:53 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-04-16 18:04:07
 */

 module.exports = {
     prot: 8090,
     db: 'mongodb://localhost:27017/blgcli',
     saltTimes: 3,
     secret: 'jwt_secret',
     nodemailer:{ //创建一个stmp服务器
        host: 'smtp.163.com',
        port: 465,
        auth: {
            user: 'wsskk_top@163.com', //注册的163邮箱账号
            pass: 'wss1987' //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
        }
     },
     weChat:{
        appID: 'wx801441c80b7bec7d',
        appsecret: '77f8470865fd69ec0d9302913bb1a7aa',
        token: 'zerosnail2019'
     },
     qiniu: {
         AK: 'WhMWfKREDuWXNBBpSHnLOoq-nTFJmBseOz3e6zfV',
         SK: 'WvbP38rWdmD-OmxGXM4M9ts0MPcCi5gaRjmVwQh4',
         Bucket: 'wsskangkang123456',
         Action: 'https://upload-z1.qiniup.com/'
     }
 };
