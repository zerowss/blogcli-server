const nodemailer = require('nodemailer');
const config = require('../../config/config');

// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config.nodemailer);

//发送邮件
module.exports = mail=> {
    transporter.sendMail(mail, (error, info)=> {
        if (error) {
            console.log(error);
            return error;
        }
        console.log('mail sent:', info.response);
    });
};
