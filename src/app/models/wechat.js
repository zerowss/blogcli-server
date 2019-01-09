const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TokenSchema = new Schema(
    {
        access_token: String,
        expires_in: Number,
        refresh_token: String,
        openid: String,
        scope: String,
        create_at: String
    },
    {
        collection: 'weChatToken',
        versionKey: false,
        autoIndex: false,
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated'
        }
    }
);

TokenSchema.statics.getToken = function (openid, cb) {
    this.findOne({
        openid: openid
    }, function (err, result) {
        if (err) throw err;
        return cb(null, result);
    });
};

TokenSchema.statics.setToken = function (openid, token, cb) {
    // 有则更新，无则添加
    var query = {
        openid: openid
    };
    var options = {
        upsert: true
    };
    this.update(query, token, options, function (err, result) {
        if (err) throw err;
        return cb(null);
    });
};

module.exports = mongoose.model('weChatToken', TokenSchema);
