/*
 * @Author: wangss 
 * @Date: 2019-02-26 10:34:55 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-02-26 16:44:25
 */

 const Music163_col = require('../../models/music163');
 const save = async item =>{
   const has_name = await Music163_col.findOne({name:item.name});
   if(!has_name){
        await Music163_col.create(item, (err, result) => {
          if(err){
            console.log('存入数据库失败');
          }
        })
   } else {
       console.log('该数据已存在');
       return false;
   }
 }

 module.exports = { save };
