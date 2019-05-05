/*
 * @Author: wangss 
 * @Date: 2018-11-01 10:24:52 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-04-25 17:04:34
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const counters = require('./counters');
const articleSchema = new Schema(
    {
        id:{
           type: Number
        },
        header_cover_url: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        is_release: {
            type: String,
            required: true
        },
        handbook: {
            type: String,
            required: true
        },
        creat_time:{
            type: String,
            required: true
        }
    }, 
    {
        collection: 'articles',
        versionKey: false,
        autoIndex: false,
        timestamps:{
            createdAt: 'created',
            updatedAt: 'updated'
        }
    }
);

articleSchema.pre('save', function(next) {
   let doc = this;
   counters.findByIdAndUpdate(
       {_id: 'entityId'}, {$inc: { artSeq: 1} },{ new: true, upsert: true },
       function(error, counter) {
            if (error) {
                return next(error);
            }
            doc.id = counter.artSeq;
            next();
        }
    );
})
module.exports = mongoose.model('articles', articleSchema);
