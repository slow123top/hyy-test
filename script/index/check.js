/**
 * Created by Hu_2015 on 2017/1/4.
 */
define(["jquery"], function ($) {
    var $loginUsername = $("#login").find("input[type='text']").eq(0);
    var $loginPassword = $("#login").find("input[type='password']");
    var $registerUsername = $("#register").find("input[type='text']").eq(0);
    var $registerPassword = $("#register").find("input[type='password']");
    var $registerEmail = $("#register").find("input[type='text']").eq(1);
    var $p = $("input[type='submit']").parent().find("p");
    return {
        loginCheck: function () {
            $loginUsername.on("focus", function () {
                $("input[type='submit']").parent().find("p").remove();
                var $this = $(this);
                //每次获得焦点时都要更新提示信息
                $this.parent().find("p").remove();
                $this.parent().append("<p>用户名支持汉字、字母和数字，字符长度为6-12</p>");
                $this.parent().find("p").css({
                    "color": "#FFFFFF"
                })
            });
            $loginUsername.on("blur", function () {
                var $this = $(this);
                $this.parent().find("p").remove();
                var registerUsernameVal = $this.val();
                //输入框为空时表示没有输入，不判断；当输入后再进行判断是否有问题产生
                if (registerUsernameVal !== "") {
                    //首先判断是否符合字符格式  仅支持汉字或者字母
                    if (registerUsernameVal.replace(/^[\u4e00-\u9fa5a-zA-Z0-9]+$/, "").length !== 0) {
                        $this.parent().append("<p>输入格式不正确!仅支持输入汉字、字母或者数字</p>")
                    } else if (registerUsernameVal.length < 6 || registerUsernameVal.length > 12) {
                        $this.parent().append("<p>用户名长度不符合要求</p>")
                    } else {
                        $this.parent().find("p").remove();
                    }
                }
                $this.parent().find("p").css({
                    "color": "#FF0000"
                })

            })

            //    注册密码校验
            $loginPassword.on("focus",function () {
                $("input[type='submit']").parent().find("p").remove();
                var $this = $(this);
                //每次获得焦点时都要更新提示信息
                $this.parent().find("p").remove();
                $this.parent().append("<p>密码仅支持数字、大小写英文，字符长度为6-12</p>");
                $this.parent().find("p").css({
                    "color": "#FFFFFF"
                })
            });
            $loginPassword.on("blur",function () {
                var $this = $(this);
                $this.parent().find("p").remove();
                var registerPasswordVal = $this.val();
                //输入框为空时表示没有输入，不判断；当输入后再进行判断是否有问题产生
                if (registerPasswordVal !== "") {
                    //首先判断是否符合字符格式  仅支持汉字或者字母
                    if (registerPasswordVal.replace(/^[a-zA-Z0-9]+$/, "").length !== 0) {
                        $this.parent().append("<p>输入格式不正确!仅支持输入数字和大小写英文</p>")
                    } else if (registerPasswordVal.length < 6 || registerPasswordVal.length > 12) {
                        $this.parent().append("<p>密码长度不符合要求</p>")
                    } else {
                        $this.parent().find("p").remove();
                    }
                }
                $this.parent().find("p").css({
                    "color": "#FF0000"
                })
            });
        },
        registerCheck: function () {
            //    注册用户名校验 当获得焦点时提示输入格式  当失去焦点时提示是否有错误
            $registerUsername.on("focus", function () {
                $("input[type='submit']").parent().find("p").remove();
                var $this = $(this);
                //每次获得焦点时都要更新提示信息
                $this.parent().find("p").remove();
                $this.parent().append("<p>用户名支持汉字、字母和数字，字符长度为6-12</p>");
                $this.parent().find("p").css({
                    "color": "#FFFFFF"
                })
            });
            $registerUsername.on("blur", function () {
                var $this = $(this);
                $this.parent().find("p").remove();
                var registerUsernameVal = $this.val();
                //输入框为空时表示没有输入，不判断；当输入后再进行判断是否有问题产生
                if (registerUsernameVal !== "") {
                    //首先判断是否符合字符格式  仅支持汉字或者字母
                    if (registerUsernameVal.replace(/^[\u4e00-\u9fa5a-zA-Z0-9]+$/, "").length !== 0) {
                        $this.parent().append("<p>输入格式不正确!仅支持输入汉字、字母或者数字</p>")
                    } else if (registerUsernameVal.length < 6 || registerUsernameVal.length > 12) {
                        $this.parent().append("<p>用户名长度不符合要求</p>")
                    } else {
                        $this.parent().find("p").remove();
                    }
                }
                $this.parent().find("p").css({
                    "color": "#FF0000"
                })

            })

            //    注册密码校验
            $registerPassword.on("focus",function () {
                $("input[type='submit']").parent().find("p").remove();
                var $this = $(this);
                //每次获得焦点时都要更新提示信息
                $this.parent().find("p").remove();
                $this.parent().append("<p>密码仅支持数字、大小写英文，字符长度为6-12</p>");
                $this.parent().find("p").css({
                    "color": "#FFFFFF"
                })
            });
            $registerPassword.on("blur",function () {
                var $this = $(this);
                $this.parent().find("p").remove();
                var registerPasswordVal = $this.val();
                //输入框为空时表示没有输入，不判断；当输入后再进行判断是否有问题产生
                if (registerPasswordVal !== "") {
                    //首先判断是否符合字符格式  仅支持汉字或者字母
                    if (registerPasswordVal.replace(/^[a-zA-Z0-9]+$/, "").length !== 0) {
                        $this.parent().append("<p>输入格式不正确!仅支持输入数字和大小写英文</p>")
                    } else if (registerPasswordVal.length < 6 || registerPasswordVal.length > 12) {
                        $this.parent().append("<p>密码长度不符合要求</p>")
                    } else {
                        $this.parent().find("p").remove();
                    }
                }
                $this.parent().find("p").css({
                    "color": "#FF0000"
                })
            });
            //    注册邮箱校验 当失去焦点时提示是否有邮箱格式的错误
            $registerEmail.on("blur", function () {
                var $this = $(this);
                $this.parent().find("p").remove();
                var registerEmailVal = $this.val();
                if(registerEmailVal !== ""){
                    if (registerEmailVal.replace(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, "").length !== 0) {
                        $this.parent().append("<p>邮箱格式不正确!</p>")
                    }
                }
                $this.parent().find("p").css({
                    "color": "#FF0000"
                })
            })
        }

    };
});