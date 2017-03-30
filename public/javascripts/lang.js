

var language_chinese={
    reg_pan_title:"花几秒时间弄个账号",
    login_pan_title:"不是谁都能进的！",
    username_placeholder:"你的名字",
    userpass_placeholder:"你的密码",
    guess:"游客",
    reg:"注册",
    login:"登录",
    logout:"退出",
    msg_username_can_be_reg:"用户名可以注册",
    msg_username_can_not_be_reg:"用户名被占用",
    msg_reg_success:"注册成功",
    msg_reg_failed:"注册失败",
    msg_login_success:"登录成功",
    msg_login_failed:"登录失败",
    msg_please_input_username:"请输入账号",
    msg_please_input_userpass:"请输入密码",
    msg_logging:"正在登陆中",
}

var language_english={
    
}

var language_arr={
    "zh-CN":language_chinese
}


var LANG=language_arr["zh-CN"];

var client_language = '';
if (navigator.language) {
    client_language = navigator.language;
} else {
    client_language = navigator.browserLanguage;
}
console.log(client_language);

LANG=language_arr[client_language];