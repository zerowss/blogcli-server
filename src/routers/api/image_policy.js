const Router = require('koa-router');
const router = new Router();
const qiniu_controller = require('../../app/controllers/qiniu/qiniu_controllers');

router.get('/imagesPolicy/getPolicy', qiniu_controller.getPolicy)
      .post('/images/delete', qiniu_controller.deleteFile);
      
module.exports = router;
