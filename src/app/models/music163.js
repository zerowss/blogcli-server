/*
 * @Author: wangss 
 * @Date: 2019-02-25 15:06:56 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-02-26 17:32:14
 */

const mongoose = require('mongoose');
const config = require('../../config/config');
// console.log(config.db, '数据库');
// mongoose.connect(config.db, {
//     useNewUrlParser: true
// }, (err) => {
//     if (err) {
//         console.error('Failed to connect to db');
//     } else {
//         console.log('Connecting db successfully');
//     }
// });
const Schema = mongoose.Schema;
const music163Schema = new Schema(
    {
        image: String,
        name: String,
        count: String,
        author: String,
        address: String,
        from: String,
        date: Date,
        show: Boolean, // 是否展示
    }, {
        collection: 'music163',
        versionKey: false,
        autoIndex: false,
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated'
        }
    }
);
music163Schema.pre("save", function (next) {
    this.date = Date.now();
    next();
});
module.exports = mongoose.model('music163', music163Schema);
