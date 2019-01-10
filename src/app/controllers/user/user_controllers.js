/*
 * @Author: wangss 
 * @Date: 2018-11-02 11:13:45 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-01-10 14:51:10
 */
const bcrypt = require("bcrypt");
const User_col = require('../../models/user');
const EmailCode_col = require('../../models/emailcode');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../../../config/config');
const Tool = require('../../utils/tool');
const nodemail = require("../../middlewares/nodemailer");
/**
 *
 *  登录
 * @param {*} ctx
 * @returns
 * @memberof loginCollore
 */

const login =  async(ctx) => {
  const data = ctx.request.body;
  if (!data.username || !data.password) {
    ctx.status = 400;
    ctx.body = {
      error: '参数不合法',
      code: -100
    };
    return
  }
  try {
    const userInfo = await User_col.findOne({
      username: data.username
    })
    if (!userInfo) {
      ctx.status = 200
      ctx.body = {
        desc: '用户名不存在',
        code: -100
      }
      return
    }
    // 匹配密码是否相等
    if (await bcrypt.compare(data.password, userInfo.password)) {
      ctx.status = 200;
      ctx.body = {
        code: 0,
        data: userInfo,
        token: jsonwebtoken.sign({
          data: userInfo
        }, config.secret,{expiresIn: '1h'})
      }
    } else {
      ctx.status = 200
      ctx.body = {
        desc: '密码错误',
        code: -100
      }
    }
  } catch (error) {
    ctx.throw(500)
  }
}
/**
 *
 *  注册
 * @param {*} ctx
 * @memberof loginCollore
 */
const register = async (ctx)=> {
  const data = ctx.request ? ctx.request.body: ctx;
  try {
    if (!data.username || !data.password) {
      ctx.status = 400;
      ctx.body = {
        error: `expected an object with username, password but got: ${data}`,
        code: -100
      }
      return;
    }
    data.password = await bcrypt.hash(data.password, 5);
    const userInfo = await User_col.find({
      username: data.username
    });
    if(userInfo.length){
      ctx.status = 200;
      ctx.body = {
        desc: '用户名已经存在',
        code: -100
      }
      return;
    }else{
      let emailInfo = await EmailCode_col.findOne({
        $and:[
          {username: data.username},
          {email : data.email}
        ]
      })
      console.log('ss',emailInfo);
      const nowDate = +new Date(); //获取当前时间
      if (emailInfo && emailInfo.codeEmail == data.code ) {
        if (emailInfo.time - nowDate < 600000) {
          await User_col.create(data);
          ctx.status = 200;
          ctx.body = {
            desc: 'success',
            code: 0
          }
        }else{
          ctx.status = 200;
          ctx.body = {
            desc: '验证码已超时，请重新获取',
            code: -100
          }
        }
      }else{
        ctx.status = 200;
        ctx.body = {
          desc: '验证码输入错误',
          code: -100
        }
      }
    }
  }
  catch(error){
    ctx.throw(500) 
  }
}
/**
 * 获取邮箱验证码
 *
 * @param {*} ctx
 * @returns
 */
const getEmailCode = async (ctx)=>{
  let data = ctx.request.body;
  data.time = +new Date();
  console.log('ss',data);
  data.codeEmail = Tool.randomNumber(6);
  let nameResult = await User_col.find({
    username: data.username
  });
  let emailResult = await User_col.find({
    email: data.email
  })
  
  if ((nameResult && nameResult.length) || (emailResult && emailResult.length)) {
    ctx.status = 200;
    ctx.body = {
      desc: result.length ? '用户名已经存在': '邮箱已被注册',
      code: -100
    }
  }else{
    ctx.status = 200;
    ctx.body = {
      desc: 'success',
      code: 0
    }
    let mail = {
      // 发件人
      from: '<wsskk_top@163.com>',
      // 主题
      subject: '接受凭证', //邮箱主题
      // 收件人
      to: data.email, //前台传过来的邮箱
      // 邮件内容，HTML格式
      text: '用' + data.codeEmail + '作为你的验证码' //发送验证码
    }
    let emailR = await EmailCode_col.find({
      email: data.email
    })
    if (emailR && emailR.length) {
      await EmailCode_col.update(
        {email: data.email},
        {codeEmail: data.codeEmail,time: data.time},
        (err, res) => {
          if (err) {
            console.error("Error: " + err);
          } else {
            console.log("Res: " + res);
          }
        });
    }else{
      await EmailCode_col.create(data);
    }
    await nodemail(mail); //发送邮件
  }
}

const isSameName = async ctx=>{
  const data = ctx.request.query;
  let nameResult = await User_col.find({
    username: data.username
  });
  if (nameResult && nameResult.length) {
    ctx.status = 200;
    ctx.body = {
      code: 0,
      data: {
        status: -1
      }
    }
  }else{
    ctx.status = 200;
    ctx.body = {
      code: 0,
      data:{
        status: 1
      }
    }
  }
}

module.exports = {
  login,
  register,
  getEmailCode,
  isSameName
}; 
