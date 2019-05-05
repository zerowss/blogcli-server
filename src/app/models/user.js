/*
 * @Author: wangss 
 * @Date: 2018-11-01 10:24:52 
 * @Last Modified by: wangss
 * @Last Modified time: 2019-04-25 15:33:18
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const counters = require('./counters');
const userSchema = new Schema(
    {
        id: {
            type: String,
            index: true,
            unique: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        tel: {
            type: String
        },
        sex: {
            type: String
        }
    }, 
    {
        collection: 'user',
        versionKey: false,
        autoIndex: false,
        timestamps:{
            createdAt: 'created',
            updatedAt: 'updated'
        }
    }
);
userSchema.virtual('userInfo').get(() => {
    return {
        username: this.username,
        pwd: this.pwd
    }
})
userSchema.pre('save',function(next){
   var doc = this;
   counters.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} },{ new: true, upsert: true },function(error, counter) {
       if (error) {
        return next(error);
       }
       doc.id = counter.seq;
       next();
   })
})
module.exports = mongoose.model('user', userSchema);
