const crypto = require('crypto');
class tool {
    constructor() {
        this.cryptoKey = 'zerosnail';
    }
    /**
     * 生成len位随机数
     *
     * @param {*} len
     * @returns
     * @memberof tool
     */
    randomNumber(len){
        if (Object.prototype.toString.call(len) !== '[object Number]' || len < 1) return;
        let num = '';
        for (let index = 0; index < len; index++) {
            num += Math.floor(Math.random()*10);
            
        }
        return num;
    }

    encryption(str){
        if(!str)return;
        if (Object.prototype.toString.call(str) !== '[object String]') {
            str = JSON.stringify(str);
        }
        let cipher = crypto.createCipher('aes192', this.cryptoKey);
        let enc = cipher.update(str, 'utf8', 'hex'); //编码方式从utf-8转为hex;
        enc += cipher.final('hex');
        return enc;
    }

    deciphering(enc){
        if (!enc) return;
        if (Object.prototype.toString.call(enc) !== '[object String]') {
            enc = JSON.stringify(enc);
        }
        let decipher = crypto.createDecipher('aes192', this.cryptoKey);
        let dec = decipher.update(enc, 'hex', 'utf8'); //编码方式从hex转为utf-8;
        dec += decipher.final('utf8'); //编码方式从utf-8;
        return dec;
    }


}

module.exports = new tool();
