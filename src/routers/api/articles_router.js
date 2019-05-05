/*
 * @Author: wangss 
 * @Date: 2018-11-02 15:42:55 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-05-05 16:45:35
 */

const Router = require('koa-router');
const router = new Router();

const articles_controller = require('../../app/controllers/articles/articles_controllers'); 

router.post('/save-articles', articles_controller.saveArticles)
      .post('/get-artilces-list', articles_controller.getArticlesList);


module.exports = router;


