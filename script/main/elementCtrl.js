/**
 * Created by Hu_2015 on 2016/12/10.
 */
require.config({
    paths: {
        "jquery": "../../js/jquery",
        "jqueryUi": "../../js/jquery-ui.min",
        "echarts": "../../js/echarts"

    }
})
define(["jquery","util", "echarts", "jqueryUi"], function ($,util, echarts) {
    var currentModelId = "";
    var currentModelName = "";
    var currentModelInfo = "";

    var currentUserId = "";
    var currentReportData = "";
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

    //报告折线图
    //报告表格
    //详细报告年份月份表格
    //详细报告选股表格
    //执行的函数
    return {
        //    重置
        resetPage: function () {
            $navLi.eq(5).click(function () {
                //重置变量
                currentModelId = "";
                currentReportData = "";
                currentModelInfo = "";
                currentModelName = "";
                $("#left").find("input[type='reset']").click();
                $("#left").find("ul").find("img").click();

                //重置之后保存不能点

                util.buttonCss($navLi.eq(1), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(2), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(4), "lightsteelblue", "none");
                //回到初始状态  首先是div的变化
                $("#report").hide();
                $("#report").find("*").hide();
                $("#detail-report").hide();
                $("#detail-report").find("*").hide();
                $("#choose-stock").find("*").hide();
                $("#edit-model").hide();
                $("#edit-model").find("*").hide();
                $("#model").show();
                $("#left").children("div").first().hide();
                $("#left").children("div").first().find("*").hide();
                $("#left").find("*").not("input[type='reset']").show();
                $("#right").find("*").filter("li span:first-child").show();
                $("#model").find("div#left").show();
                $("#model").find("div#right").show();
            })
        },
        report: function () {

            $navLi.eq(1).click(function () {
                    $divRoot.children("div#model").hide();
                    $divRoot.children("div#detail-report").hide();
                    $divRoot.children("div#detail-report").find("*").hide();
                    $divRoot.children("div#report").show();
                    $divRoot.children("div#model").find("*").hide();
                    $divRoot.children("div#report").find("*").show();

                }
            )
        },
//详细报告
        detailReport: function () {
            $navLi.eq(2).click(function () {
                $divRoot.children("div#model").hide();
                $divRoot.children("div#report").hide();
                $divRoot.children("div#model").find("*").hide();
                $divRoot.children("div#report").find("*").hide();
                $divRoot.children("div#detail-report").show();
                $divRoot.children("div#detail-report").find("*").show();
            })
        },
        //    保存模型
        saveModel: function () {
            $navLi.eq(4).on("click", function () {
                var $li = $("#left").find("ul").find("li");
                var liLen = $("#left").find("ul").find("li").length;
                if (liLen !== 0) {
                    //获得模型名称和模型信息
                    var model = util.getModelName_Info($li);
                    $.post({
                        url: "/stock/savemodel",
                        data: {
                            modelId: currentModelId,
                            modelName: model.modelName,
                            modelInfo: model.modelInfo,
                            reportData: currentReportData
                        },
                        success: function (data) {
                            if (data["status"] === "SUCCESS") {
                                //把id为modelId的加入
                                // $("#edit-model").find("select").append("<option value=" + currentModelId + "></option>")
                                alert(data["message"]);
                            }
                        }
                    })
                } else {
                    alert("没有选择指标，无法保存");
                }
            })
        },
        //    编辑
        edit: function () {
            $navLi.eq(0).on("click", function () {
                //编辑的时候也不能点
                util.buttonCss($navLi.eq(1), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(2), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(4), "lightsteelblue", "none");
                $("#report").hide();
                $("#report").find("*").hide();
                $("#detail-report").hide();
                $("#detail-report").find("*").hide();
                $("#choose-stock").find("*").hide();
                $("#edit-model").hide();
                $("#edit-model").find("*").hide();
                $("#model").show();
                $("#left").children("div").first().hide();
                $("#left").children("div").first().find("*").hide();
                $("#left").find("*").not("input[type='reset']").show();
                $("#right").find("*").not("li span:last-child").show();
                $("#model").find("div#left").show();
                $("#model").find("div#right").show();
            })
        },
        //    创建新模型
        newModel: function () {
            $navLi.eq(6).on("click", function () {
                var $this = $(this);
                $this.prevAll().show();
                $this.prevAll().css({
                    "display": "inline-block"
                })
                $this.hide();
                $this.nextAll().hide();
                $navLi.eq(5).click();
            })
        },
//        首页详细报告


        //    编辑模型
        editModel: function () {
            $navLi.eq(7).on("click", function () {
                //先模拟创建新模型
                $navLi.eq(6).click();
                //    选择model  获取modelId
                var modelId = $("#edit-model").find("select").val();
                currentModelId = modelId;
                var index = $("#index");
                var $left = $("#left").find("form");
                $.post({
                    url: "/stock/modeldetail",
                    data: {
                        modelId: modelId
                    },
                    success: function (data) {
                        var model = data["model"];
                        var modelInfo = model["modelinfo"];
                        var modelName = model["modelname"];
                        //解析modelInfo
                        //    先分割
                        var modelInfoSplit = modelInfo.split("&");
                        //首先填写最后四个空
                        var controlStr = modelInfoSplit[modelInfoSplit.length - 1];
                        var control = controlStr.substring(controlStr.indexOf("-") + 1);
                        //持有期
                        var controlVals = control.split("_");
                        $left.find("input[type='text']").eq(0).val(controlVals[0]);
                        //止损
                        $left.find("input[type='text']").eq(1).val(controlVals[1]);
                        //止盈
                        $left.find("input[type='text']").eq(2).val(controlVals[2]);
                        //modelName
                        $left.find("input[type='text']").eq(3).val(modelName);
                        //回测时间
                        $left.find("input[value='" + controlVals[3] + "']").prop("checked", true);
                        //填写指标
                        for (var i = 0; i < modelInfoSplit.length; i++) {
                            //
                            var pos = modelInfoSplit[i].indexOf("-");
                            var className = modelInfoSplit[i].substring(0, pos);
                            //左栏中出现指标，但是值都为空
                            index.find("li." + className).click();
                            //    填充值，分为不同的情况
                            //    只有一个值
                            if (className === "A0007") {
                                //获取填充的值
                                var val = modelInfoSplit[i].substring(pos);
                                $("#left").find("ul").find("li." + className).find("input[value='" + val + "']").prop("checked", true);
                            } else if (className === "A0008" || className === "A0009") {
                                var vals = modelInfoSplit[i].substring(modelInfoSplit[i].indexOf("-") + 1).split("_");
                                var $input = $("#left").find("ul").find("li." + className).find("input[type='text']");
                                var $select = $("#left").find("ul").find("li." + className).find("select");
                                for (var m = 0; m < vals.length; m++) {
                                    $input.eq(m).val((vals[m] / $select.eq(m).val()).toFixed(2));
                                }
                            } else {
                                var vals = modelInfoSplit[i].substring(modelInfoSplit[i].indexOf("-") + 1).split("_");
                                var $input = $("#left").find("ul").find("li." + className).find("input[type='text']");
                                for (var j = 0; j < vals.length; j++) {
                                    $input.eq(j).val(vals[j]);
                                }
                            }
                        }

                    }
                })
            })
        },
        //    删除模型
        deleteModel: function () {
            $navLi.last().on("click", function () {
                var $select = $("#edit-model").find("select");
                var modelId = $("#edit-model").find("select").val();

                $.post({
                    url: "/deletemodel",
                    data: {
                        modelId: modelId
                    },
                    success: function (data) {
                        if (data["status"] === "SUCCESS") {

                            $select.find("option[value='" + modelId + "']").remove();
                        }
                        alert(data["message"]);
                    }

                })
            })

        }

    };
})
;