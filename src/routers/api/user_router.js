/*
 * @Author: wangss 
 * @Date: 2018-11-02 15:42:55 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-01-09 14:49:59
 */

const Router = require('koa-router');
const router = new Router();

const user_controller = require('../../app/controllers/user/user_controllers'); 
const weChat_controller = require('../../app/controllers/wechat/wechat_controllers'); 
console.log('ppp', weChat_controller.weChatLogin);

router.post('/login', user_controller.login)
      .post('/register', user_controller.register)
      .post('/getEmailCode', user_controller.getEmailCode)
      .get('/isSameName', user_controller.isSameName)
      .get('/checkToken', weChat_controller.checkToken)
      .get('/wechat/redirect', weChat_controller.weChatLogin)
      .get('/wechat/getToken',weChat_controller.get_wx_access_token);

module.exports = router;


