/*
 * @Author: wangss 
 * @Date: 2018-10-30 19:55:53 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-01-02 18:08:25
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
     }
 };
