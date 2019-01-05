class tool {
    constructor() {
        
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

}

module.exports = new tool();
