/**
 * Created by Hu_2015 on 2017/1/4.
 * 运行模块
 */
require.config({
    paths: {
        "echarts": "../../js/echarts"

    }
})
define(["jquery","util","echarts"],function ($,util,echarts) {
    var $navLi = $("nav").find("ul").find("li");
    var $rightLi = $("#index").find("li");
    var $divRoot = $("body").children("div");
    return {
        //首先选择指标
        chooseIndex: function () {
            //选择指标左端出现已选指标
            var $leftUl = $("#left").children("div").eq(1).find("ul");

            $rightLi.click(function () {
                var className = $(this).attr("class");
                //复制指标标题
                var text = $(this).find("span").first().clone();
                //复制输入框
                var val = $(this).find("span").last().clone();
                //添加div 方便右对齐
                $leftUl.append("<li class='" + className + "'><div><span></span></div><div></div><div></div></li>");
                //第一个div放置第一个span  第二个div放置第二个span
                $("li." + className + ">div").children("span").text($(this).find("span").first().text() + ":");
                $("li." + className + ">div").eq(1).append($(this).find("span").eq(1).clone());
                $("li." + className + ">div").last().append($(this).find("span").last().clone());
                // $leftUl.append($(this).clone());
                $(this).css({
                    "pointer-events": "none",
                    "color": "blueviolet",
                    "border-color": "blueviolet"
                });
                // $leftUl.find("li span:last-child").show();
                // $leftUl.find("li span:last-child").find("*").show();

            });
            //    如果不想换指标，点击左端的删除图标
            $leftUl.on("click", "img", function () {
                var $parent = $(this).parent().parent().parent();
                var $matchLi = $("#right").find("li");
                var className = $parent.attr("class");

                var str = "";
                for (var i = 0; i < $matchLi.length; i++) {

                    str = $parent.find("span").eq(0).text();
                    if (str.substring(0, str.length - 1) === $matchLi.eq(i).find("span").eq(0).text()) {
                        $parent.remove();
                        $matchLi.eq(i).css({
                            "pointer-events": "auto",
                            "color": "yellow",
                            "border-color": "yellow"
                        });
                        if (className === "A0007") {
                            $matchLi.eq(i).find("input").eq(0).prop("checked", true);
                        }
                    }
                }

            });
        },
    //运行并生成报告
        runResult: function () {
            var $button = $("#left").find("button");
            var $ul = $("#left").find("ul");

            // progress();
            //运行
            $button.click(function () {
                $("#left").children("div").eq(0).find("*").hide();
                $("#left").find("p").remove();
                // progress();
                // $("#progress").show();
                // $("#report").children("div").each(function () {
                //     $(this).hide();
                //     $(this).find("*").hide();
                // })
                //封装模型信息


                //指标的个数，如果指标个数大于0 去找input的个数
                if ($ul.find("li").length !== 0) {
//判断input值是否有空值
                    var $emptyInput = $("#left").find("input[type='text']");
                    var emptyInputLen = $("#left").find("input[type='text']").length;
                    for (var m = 0; m < emptyInputLen; m++) {
                        if ($emptyInput.eq(m).val() === "") {
                            var warnInfo = "横线处信息不完整！";
                            $(".f-five").last().append("<p>" + warnInfo + "</p>")
                            // $("#left").children("div").eq(0).append("<p>"+warnInfo+"</p>");
                            return false;
                        }
                    }
                    var $li = $ul.find("li");
                    //获取模型名称和信息
                    var model = util.getModelName_Info($li);
                    $("#report").show();
                    $("#report").find("*").show();
                    $("#model").hide();
                    $("#model").find("*").hide();
                    $("#detail-report").hide()
                    $("#detail-report").find("").hide()
                    $navLi.not($navLi.eq(1)).css({
                        "pointer-events": "auto",
                        "border-color": "yellow",
                        "color": "yellow"
                    })
                    $("#report-echarts").parent().find("p").remove();
                    //加载进度条
                    $("#progress").show();
                    $("#report").children("div").each(function () {
                        $(this).hide();
                        $(this).find("*").hide();
                    })
                    //全局变量保存模型参数信息
                    // currentModelInfo = modelInfo;
                    $.post({
                        url: "/stock/runmodel",
                        data: {
                            modelId: currentModelId,
                            modelName: model.modelName,
                            modelInfo: model.modelInfo
                        },
                        success: function (data) {
                            $("#progress").hide();
                            // clear();
                            $("#report").children("div").each(function () {
                                $(this).show();
                                $(this).find("*").show();
                            })
                            //获取report的数据转换为json格式
                            var reportStr = data["dataBack"];
                            var report = eval("(" + reportStr + ")");
                            if (report["state"] === "YES") {
                                currentReportData = reportStr;
                                //返回数据不是太多的情况下
                                var modelId = report["id"];
                                //全局变量保存模型id
                                currentModelId = modelId;
                                var dataReportNormal = report["data"]["dataReportNormol"];
                                var ifTooMuch = dataReportNormal["ifTooMuch"];
                                var infoTooMuch = dataReportNormal["infoTooMuch"];
                                var infoNotTooMuch = dataReportNormal["infoNotTooMuch"];


                                if (ifTooMuch === 0) {
                                    //如果没有选中股票，提示没有股票选中
                                    if (infoTooMuch[0] === 0) {
                                        var tooMuch = "<p>在回测期内，共选中 " + infoTooMuch[0] + " 个股票。</p>"
                                        //之前存在的数据全部清空
                                        $("#report-echarts").hide();
                                        $("#report-table").hide();
                                        $("#report-echarts").empty();
                                        $("#report-table").find("td").empty();
                                        //重新显示
                                        $("#report-echarts").parent().append(tooMuch);
                                    } else {
                                        //如果选中了股票，并且股票数量不太多的情况
                                        var dataDetailed = report["data"]["dataDetailed"];
                                        var dataYear = report["data"]["dataYear"];
                                        var dataMonth = report["data"]["dataMonth"];
                                        //绘制报告折线图
                                        var myChart = echarts.init(document.getElementById("report-echarts"));
                                        util.fundLine(myChart, dataDetailed["datetime"], dataDetailed["profit"]["MondelConsumProfit"], dataDetailed["profit"]["HS300ConsumProfit"]);
                                        //填充报告表格
                                        var $td = $("#report-table").find("tbody").find("td");
                                        util.reportTable($td, infoNotTooMuch);
                                        //    填充详细报告年份月份表格
                                        var $table = $("#detail-report-month").find(".report-table");
                                        util.detailReportYearMonth($table, dataYear, dataMonth);

                                        //    填充详细报告选股表格
                                        var $detailTable = $("#detail-report-stock").find(".report-table");
                                        util.detailReportStock($detailTable, dataDetailed["datetime"], dataDetailed["stocks"], dataDetailed["profit"]["MondelProfit"]);
                                    }
                                } else {
                                    //如果选中的股票数据过多
                                    var tooMuch = "<p>在回测期内，共选中 " + infoTooMuch[0] + " 个股票。股票数量过大，系统给出摘要信息供您参考：所有选中的股票，" + "<br>" +
                                        "在随后1个交易日的平均涨跌幅为 " + (infoTooMuch[1] * 100).toFixed(2) + "%" + "，" + "<br>" + "在随后1个交易日的平均涨跌幅为 " + (infoTooMuch[2] * 100).toFixed(2) + "%" + "，" + "<br>" +
                                        "在随后1个交易日的平均涨跌幅为 " + (infoTooMuch[3] * 100).toFixed(2) + "%" + "<p>";
                                    //之前存在的数据全部清空
                                    $("#report-echarts").hide();
                                    $("#report-table").hide();
                                    $("#report-echarts").empty();
                                    $("#report-table").find("td").empty();
                                    //重新显示
                                    $("#report-echarts").parent().append(tooMuch);
                                }
                                //当有结果时，显示报告  详细报告以及可以保存
                                $navLi.eq(6).prevAll().each(function () {
                                    util.buttonCss($(this), "yellow", "auto");
                                });

                            } else {
                                alert(report["error"]);
                            }

                            //    生成折线图
                        }
                    });
                    //控制运行后的页面

                } else {
                    $(".f-five").last().append("<p>请先选择指标！</p>");
                }
                // $("#index").hide();

            });
        },
    };
});