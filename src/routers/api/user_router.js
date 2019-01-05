/*
 * @Author: wangss 
 * @Date: 2018-11-02 15:42:55 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-01-04 14:00:10
 */

const Router = require('koa-router');
const router = new Router();

const user_controller = require('../../app/controllers/user/user_controllers'); 
router.post('/login', user_controller.login)
      .post('/register', user_controller.register)
      .post('/getEmailCode', user_controller.getEmailCode)
      .get('/isSameName', user_controller.isSameName);

module.exports = router;


