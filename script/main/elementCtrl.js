/**
 * Created by Hu_2015 on 2016/12/10.
 */
require.config({
    paths: {
        "jquery": "../../js/jquery",
        "jqueryUi": "../../js/jquery-ui.min",
        "echarts": "../../js/echarts",
        "jquery.table2excel.min": "../../js/jquery.table2excel.min"

    }
})
define(["jquery", "util", "echarts", "model", "jqueryUi", "jquery.table2excel.min"], function ($, util) {
    var $navLi = $("nav").find("ul").find("li");
    var $rightLi = $("#index").find("li");
    var $divRoot = $("body").children("div");
    //清楚画布
    var clear = function () {
        var c = document.getElementById('progress');
        var ctx = c.getContext('2d');
        ctx.clearRect(400, 300);
    }
    //设置进度条
//     var progress = function () {
//         var c = document.getElementById('progress'),
//             ctx = c.getContext('2d'),
//             cw = c.width = 400,
//             ch = c.height = 300,
//             rand = function (a, b) {
//                 return ~~((Math.random() * (b - a + 1)) + a);
//             },
//             dToR = function (degrees) {
//                 return degrees * (Math.PI / 180);
//             },
//             circle = {
//                 x: (cw / 2) + 5,
//                 y: (ch / 2) + 22,
//                 radius: 90,
//                 speed: 2,
//                 rotation: 0,
//                 angleStart: 270,
//                 angleEnd: 90,
//                 hue: 220,
//                 thickness: 18,
//                 blur: 25
//             },
//             particles = [],
//             particleMax = 100,
//             updateCircle = function () {
//                 if (circle.rotation < 360) {
//                     circle.rotation += circle.speed;
//                 } else {
//                     circle.rotation = 0;
//                 }
//             },
//             renderCircle = function () {
//                 ctx.save();
//                 ctx.translate(circle.x, circle.y);
//                 ctx.rotate(dToR(circle.rotation));
//                 ctx.beginPath();
//                 ctx.arc(0, 0, circle.radius, dToR(circle.angleStart), dToR(circle.angleEnd), true);
//                 ctx.lineWidth = circle.thickness;
//                 ctx.strokeStyle = gradient1;
//                 ctx.stroke();
//                 ctx.restore();
//             },
//             renderCircleBorder = function () {
//                 ctx.save();
//                 ctx.translate(circle.x, circle.y);
//                 ctx.rotate(dToR(circle.rotation));
//                 ctx.beginPath();
//                 ctx.arc(0, 0, circle.radius + (circle.thickness / 2), dToR(circle.angleStart), dToR(circle.angleEnd), true);
//                 ctx.lineWidth = 2;
//                 ctx.strokeStyle = gradient2;
//                 ctx.stroke();
//                 ctx.restore();
//             },
//             renderCircleFlare = function () {
//                 ctx.save();
//                 ctx.translate(circle.x, circle.y);
//                 ctx.rotate(dToR(circle.rotation + 185));
//                 ctx.scale(1, 1);
//                 ctx.beginPath();
//                 ctx.arc(0, circle.radius, 30, 0, Math.PI * 2, false);
//                 ctx.closePath();
//                 var gradient3 = ctx.createRadialGradient(0, circle.radius, 0, 0, circle.radius, 30);
//                 gradient3.addColorStop(0, 'hsla(330, 50%, 50%, .35)');
//                 gradient3.addColorStop(1, 'hsla(330, 50%, 50%, 0)');
//                 ctx.fillStyle = gradient3;
//                 ctx.fill();
//                 ctx.restore();
//             },
//             renderCircleFlare2 = function () {
//                 ctx.save();
//                 ctx.translate(circle.x, circle.y);
//                 ctx.rotate(dToR(circle.rotation + 165));
//                 ctx.scale(1.5, 1);
//                 ctx.beginPath();
//                 ctx.arc(0, circle.radius, 25, 0, Math.PI * 2, false);
//                 ctx.closePath();
//                 var gradient4 = ctx.createRadialGradient(0, circle.radius, 0, 0, circle.radius, 25);
//                 gradient4.addColorStop(0, 'hsla(30, 100%, 50%, .2)');
//                 gradient4.addColorStop(1, 'hsla(30, 100%, 50%, 0)');
//                 ctx.fillStyle = gradient4;
//                 ctx.fill();
//                 ctx.restore();
//             },
//             createParticles = function () {
//                 if (particles.length < particleMax) {
//                     particles.push({
//                         x: (circle.x + circle.radius * Math.cos(dToR(circle.rotation - 85))) + (rand(0, circle.thickness * 2) - circle.thickness),
//                         y: (circle.y + circle.radius * Math.sin(dToR(circle.rotation - 85))) + (rand(0, circle.thickness * 2) - circle.thickness),
//                         vx: (rand(0, 100) - 50) / 1000,
//                         vy: (rand(0, 100) - 50) / 1000,
//                         radius: rand(1, 6) / 2,
//                         alpha: rand(10, 20) / 100
//                     });
//                 }
//             },
//             updateParticles = function () {
//                 var i = particles.length;
//                 while (i--) {
//                     var p = particles[i];
//                     p.vx += (rand(0, 100) - 50) / 750;
//                     p.vy += (rand(0, 100) - 50) / 750;
//                     p.x += p.vx;
//                     p.y += p.vy;
//                     p.alpha -= .01;
//
//                     if (p.alpha < .02) {
//                         particles.splice(i, 1)
//                     }
//                 }
//             },
//             renderParticles = function () {
//                 var i = particles.length;
//                 while (i--) {
//                     var p = particles[i];
//                     ctx.beginPath();
//                     ctx.fillRect(p.x, p.y, p.radius, p.radius);
//                     ctx.closePath();
//                     ctx.fillStyle = 'hsla(0, 0%, 100%, ' + p.alpha + ')';
//                 }
//             },
//             clear = function () {
//                 ctx.globalCompositeOperation = 'destination-out';
//                 ctx.fillStyle = 'rgba(0, 0, 0, .1)';
//                 ctx.fillRect(0, 0, cw, ch);
//                 ctx.globalCompositeOperation = 'lighter';
//             }
//         loop = function () {
//             clear();
//             updateCircle();
//             renderCircle();
//             renderCircleBorder();
//             renderCircleFlare();
//             renderCircleFlare2();
//             createParticles();
//             updateParticles();
//             renderParticles();
//         }
//
//         /* Append Canvas */
// //document.body.appendChild(c);
//
//         /* Set Constant Properties */
//         ctx.shadowBlur = circle.blur;
//         ctx.shadowColor = 'hsla(' + circle.hue + ', 80%, 60%, 1)';
//         ctx.lineCap = 'round'
//
//         var gradient1 = ctx.createLinearGradient(0, -circle.radius, 0, circle.radius);
//         gradient1.addColorStop(0, 'hsla(' + circle.hue + ', 60%, 50%, .25)');
//         gradient1.addColorStop(1, 'hsla(' + circle.hue + ', 60%, 50%, 0)');
//
//         var gradient2 = ctx.createLinearGradient(0, -circle.radius, 0, circle.radius);
//         gradient2.addColorStop(0, 'hsla(' + circle.hue + ', 100%, 50%, 0)');
//         gradient2.addColorStop(.1, 'hsla(' + circle.hue + ', 100%, 100%, .7)');
//         gradient2.addColorStop(1, 'hsla(' + circle.hue + ', 100%, 50%, 0)');
//
//         /* Loop It, Loop It Good */
//         setInterval(loop, 5);
//     }
    //控制按钮样式变化的函数

    //获取modelName modelInfo
    //执行的函数
    return {
        //我的模
        //
        //
        //禁止回退或者前进
        forbidBack: function () {
            if (window.history && window.history.pushState) {
                $(window).on('popstate', function () {
                    window.history.pushState('forward', null, '#');
                    window.history.forward(1);
                });
            }
            window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
            window.history.forward(1);
        },
        //注销
        logout: function () {
            $("#user-information").find("button").click(function () {
                $.get({
                    url: "/user/logout"
                })
            })
        },
        //接受用户名
        receiveUserName: function () {
            var username = sessionStorage.getItem("username");
            $("#user-information").find("span").text(username);
        },
        //    重置
        resetPage: function () {
            $navLi.eq(4).click(function () {
                // if (util.currentModelId === "") {
                $("#left").find("input[type='reset']").click();
                $("#left").find("ul").find("img").click();
                //重置之后之前的按钮不能点
                $(this).prevAll().each(function () {
                    util.buttonCss($(this), "lightsteelblue", "none");
                });
                //回到初始状态  首先是div的变化
                $divRoot.children("div").not($("#model")).each(function () {
                    $(this).hide();
                    $(this).find("*").hide();
                });
                $("#model").show();
                $("#model").find("*").show();
                $("#left").children("div").first().hide();
                $("#left").children("div").first().find("*").hide();
                $("#left").find("input[type='reset']").hide();
                $("#right").find("li").each(function () {
                    $(this).find("*").hide();
                    $(this).find("span").first().show();
                });
                $("#left").find("p").remove();
                // } else {
                //     $navLi.eq(6).click();
                // }
            })
        },
        //    编辑
        edit: function () {
            $navLi.eq(0).on("click", function () {

                $divRoot.children("div").not($("#model")).each(function () {
                    $(this).hide();
                    $(this).find("*").hide();
                });
                $("#model").show();
                $("#model").find("*").show();
                //不该显示的隐藏掉
                $("#right").find("li").each(function () {
                    $(this).find("*").hide();
                    $(this).find("span").first().show();
                });
                $("input[type='reset']").hide();
                //编辑的时候也不能点
                util.buttonCss($navLi.eq(0), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(1), "yellow", "auto");
                util.buttonCss($navLi.eq(2), "yellow", "auto");
                util.buttonCss($navLi.eq(3), "yellow", "auto");
                util.buttonCss($navLi.eq(4), "yellow", "auto");
            })
        },


        //    选择指标之后  若是修改指标  详细报告  选股以及保存都不能点击
        indexChange: function () {
            $("#left").on("change", "input[type='text']", function () {
                util.buttonCss($navLi.eq(1), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(2), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(3), "lightsteelblue", "none");
            });
            //A0008 A0009都带有校验
            $("#left").on("change", "select", function () {
                $("#left").children("div").eq(1).find("p").remove();
                var $this = $(this);
                var preVal = $this.parent().children("input[type='text']").eq(0).val();
                var lastVal = $this.parent().children("input[type='text']").eq(1).val();
                var preUnitVal = $this.parent().children("select").eq(0).val();
                var lastUnitVal = $this.parent().children("select").eq(1).val();
                if (preVal !== 0 && lastVal !== 0) {
                    if (preVal * preUnitVal >= lastVal * lastUnitVal) {
                        $this.parent().children("select").eq(0).val(1000000);
                        $this.parent().children("select").eq(1).val(100000000);
                        var warnInfo = "市值M1必须小于M2!";
                        util.warn($this, warnInfo);
                    }
                }
                util.buttonCss($navLi.eq(1), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(2), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(3), "lightsteelblue", "none");
            })
            //只要改变模型名称，模型id就会清空；不改变模型名称只改变模型信息  就更新模型
            $("#left").children("div").eq(2).find("input[type='text']").eq(3).change(function () {
                util.currentModelId = "";
            });
            $("#my-detail-report").on("change", "input[type='text']", function () {
                util.currentModelId = "";
            })
        },


        //    回退
        goBack: function () {
            $("#back").click(function () {
                $("body").find("*").end();
            })
        },
        //    换肤
        replaceSkin: function () {
            $("header").find("select").change(function () {
                var $this = $(this);
                if ($this.val() === "light") {
                    $("link").attr("href","/styles/main/light.css");
                }else if($this.val() === "black"){
                    $("link").attr("href","/styles/main/modelstyle.css");
                }else if($this.val() === "universe"){
                    $("link").attr("href","/styles/main/universe.css");
                }
            })
        }

    };
})
;