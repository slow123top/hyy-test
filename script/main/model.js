/**
 * Created by Hu_2015 on 2017/1/4.
 */
require.config({
    paths: {
        "jquery": "../../js/jquery",
        "echarts": "../../js/echarts",
        "toexcel": "../../js/jquery.table2excel.min"
    }
})
define(["jquery", "util", "echarts","toexcel"], function ($, util, echarts) {
    var $navLi = $("nav").find("ul").find("li");
    var $rightLi = $("#index").find("li");
    var $divRoot = $("body").children("div");
    return {
        //点击“我的模型” 返回用户的模型表
        userModelList: function () {
            //用户点击 我的模型  显示用户的模型列表
            $("header").children("h2").on("click", function () {
                //也是回到首页的功能  回到初始状态
                //隐藏  显示
                $navLi.eq(6).prevAll().each(function () {
                    $(this).hide();
                    $(this).find("*").hide();
                });

                $navLi.eq(5).nextAll().each(function () {
                    $(this).show();
                    $(this).find("*").show();
                });
                util.buttonCss($navLi.eq(1), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(2), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(4), "lightsteelblue", "none");
                //只有模型模块显示 其他模块隐藏
                $("#edit-model").show();
                $("#edit-model").find("*").show();
                $divRoot.children("div").not($("#edit-model")).each(function () {
                    $(this).hide();
                    $(this).find("*").hide();
                })
                //获取select对象 并清空
                var $ul = $("#my-model").find("ul");
                $ul.empty();
                $.post({
                    url: "/stock/mymodels",
                    success: function (data) {
                        var myModels = data["mymodels"];
                        if (myModels !== null) {
                            $("#my-model").show();
                            var myModelsLen = data["mymodels"].length;
                            for (var i = 0; i < myModelsLen; i++) {
                                var modelId = myModels[i]["modelid"];
                                var modelName = myModels[i]["modelname"];
                                $ul.append("<li id=" + modelId + ">" + modelName + "</li>");
                            }
                        } else {
                            //如果用户没有模型  就不显示
                            $("#my-model").hide();
                        }
                    }
                })

            });

        },
        //    查看每一个模型的报告
        displayModelReport: function () {
            //    通过下拉框选择模型  查看模型信息
            $("#my-model").find("ul").on("click", "li", function () {
                //首先显示报告，隐藏详细报告
                $("#my-detail-report").hide();
                $("#my-detail-report").find("*").hide();
                $("#edit-model").children("div").not($("#my-detail-report")).each(function () {
                    $(this).show();
                    $(this).find("*").show();
                })
                //获取模型的id
                var modelId = $(this).attr("id");
                $.post({
                    url: "/stock/modeldetail",
                    data: {
                        modelId: modelId
                    },
                    success: function (data) {
                        var report = eval("(" + data["report"]["reportdata"] + ")");
                        if (report["state"] === "YES") {
                            //首先清空上次的提示信息
                            $("#too-much").find("p").remove();
                            var tooMuch = "";
                            //返回数据不是太多的情况下
                            var dataReportNormal = report["data"]["dataReportNormol"];
                            var ifTooMuch = dataReportNormal["ifTooMuch"];
                            var infoTooMuch = dataReportNormal["infoTooMuch"];
                            var infoNotTooMuch = dataReportNormal["infoNotTooMuch"];
                            if (ifTooMuch === 0) {
                                if (infoTooMuch[0] === 0) {
                                    //显示选中股票为0的状况
                                    tooMuch = "<p>在回测期内，共选中 " + infoTooMuch[0] + " 个股票。</p>";
                                    $("#too-much").append(tooMuch);
                                    //之前存在的数据全部清空
                                    //重新显示
                                } else {
                                    //只显示报告
                                    $("#edit-model").find("*").show();
                                    $("#edit-model").children("div:nth-of-type(n+4)").each(function () {
                                        $(this).hide();
                                        $(this).find("*").hide();
                                    })
                                    $divRoot.children("div").not($("#edit-model")).each(function () {
                                        $(this).hide();
                                        $(this).find("*").hide();
                                    });
                                    util.buttonCss($navLi.eq(8), "yellow", "auto");
                                    var dataDetailed = report["data"]["dataDetailed"];
                                    var dataYear = report["data"]["dataYear"];
                                    var dataMonth = report["data"]["dataMonth"];
                                    //报告
                                    //填充基本信息
                                    var $span = $("#not-too-much").find("span");
                                    util.reportTable($span, infoNotTooMuch);
                                    //绘制简略折线图
                                    var reportChart = echarts.init(document.getElementById("my-detail-report-chart"));
                                    util.fundLine(reportChart, dataDetailed["datetime"], dataDetailed["profit"]["MondelConsumProfit"], dataDetailed["profit"]["HS300ConsumProfit"]);
                                    //详细报告
                                    //绘制折线图
                                    var detailChart = echarts.init(document.getElementById("my-detail-report-chart"));
                                    util.fundLine(detailChart, dataDetailed["datetime"], dataDetailed["profit"]["MondelConsumProfit"], dataDetailed["profit"]["HS300ConsumProfit"]);
                                    //    填充详细报告年份月份表格
                                    var $table = $("#my-detail-report").find(".report-table").eq(0);
                                    util.detailReportYearMonth($table, dataYear, dataMonth);
                                    //    填充详细报告选股表格
                                    var $detailTable = $("#my-detail-report").find(".report-table").eq(1);
                                    util.detailReportStock($detailTable, dataDetailed["datetime"], dataDetailed["stocks"], dataDetailed["profit"]["MondelProfit"]);
                                }
                            } else {
                                //选中股票过多
                                tooMuch = "<p>在回测期内，共选中 " + infoTooMuch[0] + " 个股票。股票数量过大，系统给出摘要信息供您参考：所有选中的股票，" + "<br>" +
                                    "在随后1个交易日的平均涨跌幅为 " + (infoTooMuch[1] * 100).toFixed(2) + "%，" + "<br>" + "在随后5个交易日的平均涨跌幅为 " + (infoTooMuch[2] * 100).toFixed(2) + "%，" + "<br>" +
                                    "在随后20个交易日的平均涨跌幅为 " + (infoTooMuch[3] * 100).toFixed(2) + "%" + "<p>";
                                //之前存在的数据全部清空
                                $("#edit-model").children("div").eq(0).nextAll().each(function () {
                                    $(this).hide();
                                    $(this).find("*").hide();
                                })
                                util.buttonCss($navLi.eq(8), "lightsteelblue", "none");
                                //只显示p
                                $("#too-much").append(tooMuch);
                            }
                        } else {
                            alert(report["error"]);
                        }

                    },
                    error: function () {
                        alert("连接服务器失败！");

                    }
                })
            })
        },
        //模型回测结果详细报告
        detailReport: function () {
            $navLi.eq(8).on("click", function () {
                //显示详细报告
                $("#my-detail-report").show();
                $("#my-detail-report").find("*").show();
                $("#edit-model").children("div").not($("#my-detail-report")).each(function () {
                    $(this).hide();
                    $(this).find("*").hide();
                });
                var myChart = echarts.init(document.getElementById("my-detail-report-chart"));
                var dataTime = ["2011-01-01", "2012-01-05", "2013-01-07", "2014-01-01", "2015-01-01", "2016-01-01", "2017-01-01", "2018-01-01", "2019-01-01", "2020-01-01"];
                util.fundLine(myChart, dataTime, [0.11111, 0.2, 0.3, 0.6, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3], [0.2, 0.4, 0.3, 0.5, 0.6, 0.4, 0.4, 0.4, 0.4, 0.4])

            })
        },
        //    导出excel
        exportExcel: function () {
            $("#my-detail-report").find("button").on("click", function () {
                $("#my-detail-report").find("table.report-table").eq(1).find("tr").first().before("<tr><td>买入日期</td><td>详细选股记录</td><td>持有期内总盈利</td></tr>");
                $("#my-detail-report").find("table.report-table").eq(1).table2excel({
                    exclude: ".noExl",
                    name: "Worksheet Name",
                    filename: "SomeFile"
                });
                $("#my-detail-report").find("table.report-table").eq(1).find("tr").first().remove();
            })

        }
    };
});