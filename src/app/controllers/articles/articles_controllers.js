/*
 * @Author: wangss 
 * @Date: 2018-11-02 11:13:45 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-05-05 17:18:01
 */
const articles_col = require('../../models/article');

const saveArticles = async (ctx)=> {
  let data = ctx.request ? ctx.request.body: ctx;
  try {
    const nowDate = parseInt(+new Date() / 1000); //获取当前时间
    data.creat_time = nowDate;
    await articles_col.create(data);
    ctx.status = 200;
    ctx.body = {
      code: 0,
      desc: 'success'
    }
  }
  catch(error){
    console.log(error,'==============');
    
    ctx.throw(error) 
  }
}

const getArticlesList = async (ctx)=>{
  const params = ctx.request ? ctx.request.body : ctx;
  const { pageNum = 1, pageSize = 30 } = params;
  const doc = await articles_col.find({})
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .sort({'_id':-1});
  
  if (doc) {
    console.log(doc, '=====');
    const count = doc.length;
    ctx.body = {
      code: 0,
      totalCount: count,
      msg: '列表获取成功',
      data: doc
    };
  }else{
    ctx.body = {
      code: 1,
      msg: e
    };
  }
}

module.exports = {
  saveArticles,
  getArticlesList
}; 
