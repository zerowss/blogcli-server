/*
 * @Author: wangss 
 * @Date: 2018-11-01 10:24:52 
 * @Last Modified by: wangss
 * @Last Modified time: 2018-11-28 14:29:06
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        userId: {
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
userSchema.index({ userId: 1 });
module.exports = mongoose.model('user', userSchema);
