/**
 * Created by Hu_2015 on 2017/1/4.
 */
// require.config({
//     paths: {
//         "jquery": "../../js/jquery"
//     }
// });
define(["jquery"], function ($) {
    return {
        loginregisterSwitch: function () {
            var $loginButton = $("#login-register").children("button").first();
            var $registerButton = $("#login-register").children("button").last();
            $loginButton.on("click", function () {
                $("body").children("div").show();
                $("#register").hide();
                $("#register").find("*").hide();
                $("#login").show();
                $("#login").find("*").show();
            });
            $registerButton.on("click", function () {
                $("body").children("div").show();
                $("#login").hide();
                $("#login").find("*").hide();
                $("#register").show();
                $("#register").find("*").show();
            })
        }
    };
});