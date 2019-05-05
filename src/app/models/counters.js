/*
 * @Author: wangss 
 * @Date: 2018-11-01 10:24:52 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-04-25 14:38:42
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
        },
        artSeq:{
           type: Number,
           default: 0
        }
    }, 
    {
        collection: 'counters'
    }
);


module.exports = mongoose.model('counters', countersSchema);
