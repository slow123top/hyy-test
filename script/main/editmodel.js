/**
 * Created by Hu_2015 on 2017/1/6.
 */
define(["jquery", "util"], function ($, util) {
    var $navLi = $("nav").find("ul").find("li");
    return {
//    编辑模型
        editModel: function () {
            $navLi.eq(6).on("click", function () {

                $("header").children("h2").next().text("编辑模型");
                // 按钮的变化
                $navLi.eq(5).prevAll().each(function () {
                    $(this).show();
                    $(this).css({
                        "display": "inline-block"
                    });
                });
                $navLi.eq(4).nextAll().hide();
                //先模拟创建新模型
                $navLi.eq(0).click();
                var index = $("#index");
                var $left = $("#left").find("form");
                var modelId = util.currentModelId;
                $.post({
                    url: "/stock/modeldetail",
                    data: {
                        modelId: modelId
                    },
                    success: function (data) {
                        //清空之前选中的指标  更新指标
                        $("#left").children("div").eq(1).find("ul").find("img").click();
                        //把编辑模型的数据填写好
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
                            } else if (className === "A0001" || className === "A0002" || className === "A0005") {
                                var vals = modelInfoSplit[i].substring(modelInfoSplit[i].indexOf("-") + 1).split("_");
                                var $input = $("#left").find("ul").find("li." + className).find("input[type='text']");
                                $input.eq(0).val(vals[0]);
                                for (var j = 1; j < vals.length; j++) {
                                    $input.eq(j).val(Number(vals[j]) * 100);
                                }
                            } else {
                                var vals = modelInfoSplit[i].substring(modelInfoSplit[i].indexOf("-") + 1).split("_");
                                var $input = $("#left").find("ul").find("li." + className).find("input[type='text']");
                                for (var j = 0; j < vals.length; j++) {
                                    $input.eq(j).val(vals[j]);
                                }
                            }
                        }
                        util.buttonCss($navLi.eq(1), "yellow", "auto");
                        util.buttonCss($navLi.eq(2), "yellow", "auto");
                        util.buttonCss($navLi.eq(3), "yellow", "auto");

                    }
                })
            })
        },
    };
});