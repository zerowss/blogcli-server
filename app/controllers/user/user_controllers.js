/*
 * @Author: wangss 
 * @Date: 2018-11-02 11:13:45 
 * @Last Modified by: wangss
 * @Last Modified time: 2018-12-03 15:11:17
 */
const bcrypt = require("bcrypt");
const User_col = require('../../models/user');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../../../config/config');

/**
 *
 *  登录
 * @param {*} ctx
 * @returns
 * @memberof loginCollore
 */

const login =  async(ctx) => {
  const data = ctx.request.body;
  console.log(data,'data--');
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
      ctx.status = 401
      ctx.body = {
        message: '用户名错误',
        code: -100
      }
      return;
    }
    // 匹配密码是否相等
    if (await bcrypt.compare(data.password, userInfo.password)) {
      ctx.status = 200;
      ctx.body = {
        code: 0,
        message: '登录成功',
        data: userInfo,
        token: jsonwebtoken.sign({
          data: userInfo
        }, config.secret,{expiresIn: '1h'})
      }
    } else {
      ctx.status = 401
      ctx.body = {
        message: '密码错误',
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
  const data = ctx.request.body;
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
      ctx.status = 406;
      ctx.body = {
        message: '用户名已经存在',
        code: -100
      }
      return;
    }else{
      let user = await User_col.create(data);
      ctx.status = 200;
      ctx.body = {
        message: '注册成功',
        data: user,
        code: 0
      }
    }
  }
  catch(error){
    ctx.throw(500) 
  }
}

module.exports = {
  login,
  register 
}; 
