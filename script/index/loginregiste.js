/**
 * Created by Hu_2015 on 2016/12/11.
 */
define(["jquery"], function ($) {
    return {
        login: function () {
            //    登录
            $("#login").find("form").on("submit", function () {
                var $submitParent = $("#login").find("input[type='submit']").parent();
                $submitParent.find("p").remove();
                var username = $("#login").find("input[type='text']").val();
                var passwd = $("#login").find("input[type='password']").val();
                if (username === "" || passwd === "") {
                    $submitParent.append("<p>用户名或者密码不能为空!</p>");
                } else {
                    $.post({
                        url: "/login",
                        withCredentials: true,
                        data: {
                            username: username,
                            password: passwd
                        },
                        success: function (data) {
                            if (data["status"] === "SUCCESS") {
                                location.href = "main.html";
                            } else {
                                $submitParent.append("<p>" + data["message"] + "</p>")
                            }
                        }
                    });

                }
                $submitParent.find("p").css({
                    "color": "#FF0000"
                })
                return false;

            });
        },
        //注册
        register: function () {
            $("#register").find("form").on("submit", function () {
                var $submitParent = $("#register").find("input[type='submit']").parent();
                $submitParent.find("p").remove();
                var username = $("#register").find("input[type='text']").eq(0).val();
                var passwd = $("#register").find("input[type='password']").val();
                var email = $("#register").find("input[type='text']").eq(1).val();
                if (username === "" || passwd === "" || email === "") {
                    $submitParent.append("<p>用户名、密码或者邮箱不能为空!</p>");
                } else {
                    $.post({
                        url: "/register",
                        data: {
                            username: username,
                            password: passwd,
                            email: email
                        },
                        success: function (data) {
                            $submitParent.append("<p>" + data["message"] + "</p>")

                        }
                    });

                }
                $submitParent.find("p").css({
                    "color": "#FF0000"
                });
                return false;
            })
        }
    }
})