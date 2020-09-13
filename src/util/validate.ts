
const validate =  {
    error: '',
    // 金额
    isMoney(value: any, errorMsg: string = '金额信息错误') {
        const regMoney = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/;
        const result = regMoney.test(value);
        if(!result) {this.error = errorMsg;return false;} else {return true;}
    },

    // 密码
    isPassword(value: any, errorMsg: string = '密码必须包含大写字母和数字，区分大小写') {
        const passwordReg = /^(?=.*[0-9])(?=.*[A-Z]).*$/;
        const result = passwordReg.test(value);
        if(!result) {this.error = errorMsg;return false;} else {return true;}
    },

    // 是否为空
    isNull(str: any, errorMsg: string = '必填信息不能为空') {
        if (!str) {this.error = errorMsg;return false; } else { return true; }
    },

    // 手机号或者固话
    isLinkPhone(val: any, errorMsg: string = '手机号或者固话格式错误') {
        const telReg =  /^0\d{2,3}-?\d{7,8}$/;
        const phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!telReg.test(val) && !phoneReg.test(val)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 手机号
    isPhone(val: any, errorMsg: string = '手机号格式错误') {
        const phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!phoneReg.test(val)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 判断是否为url地址
    isUrl(str: any, errorMsg: string = 'url地址格式错误') {
        const rex = /^(http|https){1}:\/\/[^\s]+$/;
        if (!rex.test(str)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 是否汉字
    isCN(str: any, errorMsg: string = '请输入汉字') {
        const reg = /^[\u4e00-\u9fa5]+$/;
        if (!reg.test(str)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 是否为邮件
    isEmail(str: any, errorMsg: string = '邮箱格式错误') {
        const reg = /^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!reg.test(str)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 是否为身份证
    isCard(str: any, errorMsg: string = '身份证格式错误') {
        const reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
        if (!reg.test(str)) {this.error = errorMsg;return false; } else { return true; }
    },

    isNum(num: any, errorMsg: string = '请输入数字') {
        const rex = /^[0-9]+$/;
        if (!rex.test(num)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 是否全为热线电话
    isHotline(num: any, errorMsg: string = '热线电话格式错误') {
        const rex = /^[0-9]([0-9]|-)*[0-9]$/;
        if (rex.test(num)) {this.error = errorMsg;return false; } else { return true; }
    },

    // 判断数组长度
    isArrayLen(arr: any, errorMsg: string = '长度不能为空') {
        if (arr instanceof Array) {
            if(!arr.length) {
                this.error = errorMsg;
                return false;
            } else {
                return true;
            }
        }
    },
}

export default  validate;
