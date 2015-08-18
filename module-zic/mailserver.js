exports.gotomail = function (mail) {
    var domain = mail.split('@')[1]
    if (domain == '163.com') {
        return 'mail.163.com';
    } else if (domain == 'vip.163.com') {
        return 'vip.163.com';
    } else if (domain == '126.com') {
        return 'mail.126.com';
    } else if (domain == 'qq.com' || domain == 'vip.qq.com' || domain == 'foxmail.com') {
        return 'mail.qq.com';
    } else if (domain == 'gmail.com') {
        return 'mail.google.com';
    } else if (domain == 'sohu.com') {
        return 'mail.sohu.com';
    } else if (domain == 'tom.com') {
        return 'mail.tom.com';
    } else if (domain == 'vip.sina.com') {
        return 'vip.sina.com';
    } else if (domain == 'sina.com.cn' || domain == 'sina.com') {
        return 'mail.sina.com.cn';
    } else if (domain == 'tom.com') {
        return 'mail.tom.com';
    } else if (domain == 'yahoo.com.cn' || domain == 'yahoo.cn') {
        return 'mail.cn.yahoo.com';
    } else if (domain == 'tom.com') {
        return 'mail.tom.com';
    } else if (domain == 'yeah.net') {
        return 'www.yeah.net';
    } else if (domain == '21cn.com') {
        return 'mail.21cn.com';
    } else if (domain == 'hotmail.com') {
        return 'www.hotmail.com';
    } else if (domain == 'sogou.com') {
        return 'mail.sogou.com';
    } else if (domain == '188.com') {
        return 'www.188.com';
    } else if (domain == '139.com') {
        return 'mail.10086.cn';
    } else if (domain == '189.cn') {
        return 'webmail15.189.cn/webmail';
    } else if (domain == 'wo.com.cn') {
        return 'mail.wo.com.cn/smsmail';
    } else if (domain == '139.com') {
        return 'mail.10086.cn';
    } else {
        return '';
    }
}