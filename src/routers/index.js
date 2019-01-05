const path = require('path');
const controllers_path = path.join(__dirname,'/api');
const Walk = require('../app/utils/walk');
let walk = new Walk();
walk.walk(controllers_path);
module.exports = walk.getF();
