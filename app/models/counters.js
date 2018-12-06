/*
 * @Author: wangss 
 * @Date: 2018-11-01 10:24:52 
 * @Last Modified by: wangss
 * @Last Modified time: 2018-12-06 10:39:46
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const countersSchema = new Schema(
    {
       _id: {
            type: String,
            required: true
        },
        seq: {
            type: Number,
            default: 0
        }
    }, 
    {
        collection: 'counters'
    }
);

module.exports = mongoose.model('counters', countersSchema);
