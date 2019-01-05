/*
 * @Author: wangss 
 * @Date: 2018-11-02 11:13:45 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-01-04 10:45:34
 */
const Example_col = require('../../models/example');
//获取数据
 const getExample = async (ctx, next) =>{
    const req = ctx.request.body;
    const examples = await Example_col.find({});
    ctx.status = 200;
    ctx.body = {
        code:0,
        data: {
          data: req,
          examples,
        }
      }
 }

 // post 带一个 msg 参数，并插入数据库
 const addExamplesMsg = async(ctx,next)=>{
    const req = ctx.request.body;
    console.log(req,'req');
    console.log(ctx,'req');
    if (!req.msg || typeof req.msg != 'string') {
        ctx.status = 401;
        ctx.body = {
          msg: 'post request!!',
          desc: `parameter error！！msg: ${req.msg}`,
          data: req
        }
        return;
    }

    const result = await Example_col.create({msg: req.msg});
    ctx.status = 200;
    ctx.body = {
      code: 0,  
      desc: '新增成功!',
      data: result
    }
 }


 module.exports = {
    getExample,
    addExamplesMsg
 }

