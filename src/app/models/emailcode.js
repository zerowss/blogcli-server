/*
 * @Author: wangss 
 * @Date: 2018-11-01 10:24:52 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-01-04 15:45:57
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const emailCodeSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        codeEmail: {
            type: String
        },
        email: {
            type: String,
            required: true
        }
    }, 
    {
        collection: 'emailcode',
        timestamps:{
            createdAt: 'created',
            updatedAt: 'updated'
        }
    }
);
module.exports = mongoose.model('emailCode', emailCodeSchema);
