/**
 * Created by Hu_2015 on 2017/1/4.
 */
require.config({
    paths: {
        "jquery": "../../js/jquery",
    }
});
require(['loginregiste','loginswitch','check'], function (loginRegister, loginswitch,check) {
    //输入校验

    //注册登录
    loginRegister.register();
    loginRegister.login();
//    展示模型列表
    loginswitch.loginregisterSwitch();
//    登录和注册校验
    check.loginCheck();
    check.registerCheck();
});