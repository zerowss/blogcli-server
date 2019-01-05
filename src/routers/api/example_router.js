/*
 * @Author: wangss 
 * @Date: 2018-11-02 15:42:55 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-01-04 10:45:08
 */
const Router = require('koa-router');
const router = new Router();

const example_controller = require('../../app/controllers/example/example_controllers'); 

router.get('/example/get', example_controller.getExample);
router.post('/example/post', example_controller.addExamplesMsg);

module.exports = router;


