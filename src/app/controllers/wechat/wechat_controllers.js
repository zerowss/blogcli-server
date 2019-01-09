const config = require('../../../config/config');
const weChatToken_col = require('../../models/wechat');
const OAuth = require('wechat-oauth');
const Tool = require('../../utils/tool');
const { login } = require('./../user/user_controllers');

let appID = config.weChat.appID;
let AppSecret = config.weChat.appsecret;
let token = config.weChat.token;
let client = new OAuth(appID, AppSecret);
let url = '';
let stateKey = "STATE";

class wechat {
    constructor() {
        console.log('sss',config);
    }

    // 二维码上用于跳转的url,需要二次跳转
    async weChatLogin(ctx) {
        const state = Tool.encryption(stateKey);
        url = client.getAuthorizeURLForWebsite('/wechat/getToken', state, 'snsapi_userinfo');
        ctx.response.redirect(url);
    }
    //二次跳转的url 获取code,state
    async get_wx_access_token(ctx) {
        const data = ctx.querst.query;
        const state = Tool.deciphering(data.state);
        
        if (state != stateKey) {
            ctx.status = 200;
            ctx.body= {
                dsec: '微信认证失败',
                code: -100
            }
        }else{
            client.getAccessToken(data.code, (err, result) => {
                if (err) {
                   ctx.status = 200;
                   ctx.body = {
                       dsec: '微信认证失败',
                       code: -100
                   }
                   return;
                };
                var accessToken = result.data.access_token;
                var openid = result.data.openid;
                weChatToken_col.setToken(openid, accessToken, () => {
                    client.getUser(openid, function (err, result) {
                        const userInfo = result;
                        login({})
                    });
                })
            });
        }
    }
}

module.exports = new wechat();
