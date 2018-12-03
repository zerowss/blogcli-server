/*
 * @Author: wangss 
 * @Date: 2018-11-02 15:42:55 
 * @Last Modified by: wangss
 * @Last Modified time: 2018-12-03 13:44:31
 */

const Router = require('koa-router');
const router = new Router();

const user_controller = require('../../app/controllers/user/user_controllers'); 
router.post('/login', user_controller.login);
router.post('/register', user_controller.register);

module.exports = router;


