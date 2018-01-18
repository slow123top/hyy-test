/**
 * Created by Hu_2015 on 2017/1/4.
 */
require.config({
    paths: {
        "jquery": "../../js/jquery",
        "echarts": "../../js/echarts",
        "jquery.table2excel.min": "/js/jquery.table2excel.min"
    }
})
define(["jquery", "util", "echarts", "jquery.table2excel.min"], function ($, util, echarts) {
    var $navLi = $("nav").find("ul").find("li");
    var $rightLi = $("#index").find("li");
    var $divRoot = $("body").children("div");
    return {
        //点击“我的模型” 返回用户的模型表
        userModelList: function () {
            //用户点击 我的模型  显示用户的模型列表
            $("header").children("h2").on("click", function () {

                //也是回到首页的功能  回到初始状态
                //按钮的变化 隐藏和显示
                $("header").children("h2").next().text("");
                $navLi.eq(5).prevAll().each(function () {
                    $(this).hide();
                    $(this).find("*").hide();
                });
                $navLi.eq(4).nextAll().each(function () {
                    $(this).show();
                    $(this).find("*").show();
                });
                //最后面四个不可点击
                $navLi.eq(5).nextAll().each(function () {
                    util.buttonCss($(this), "lightsteelblue", "none");
                });
                //只有模型模块显示 其他模块隐藏
                $("#edit-model").show();
                $("#edit-model").find("*").show();
                $("#edit-model").children("div").not($("#my-model")).each(function () {
                    $(this).hide();
                    $(this).find("*").hide();
                });
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
                        if(data["status"] === "SUCCESS"){
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
                        }else {
                            alert("空闲超时，请重新登录！");
                        }

                    }
                })

            });
            $("header").children("h2").click();

        },
        //    查看每一个模型的报告
        displayModelReport: function () {
            // window.util.goBack+Math.random().toFixed(1);
            //    选择模型  查看模型信息
            $("#my-model").find("ul").on("click", "li", function () {
                // window.history.pushState(null, null, "/profile/");
                var $this = $(this);
                //鼠标移动到按钮上的变化  以及选中时按钮的变化
                $(this).css("background-color", "rgba(255,165,0,0.6)");
                $("#my-model").find("ul").find("li").not($(this)).each(function () {
                    $(this).css({
                        "background-color": "transparent"
                    })
                });
                //编辑模型显示
                $divRoot.children("div").not($("#edit-model")).each(function () {
                    $(this).hide();
                    $(this).find("*").hide();
                });
                //编辑模型 详细报告 选股 以及删除都可以点击
                $navLi.eq(5).nextAll().each(function () {
                    util.buttonCss($(this), "yellow", "auto");
                });
                //首先显示报告，隐藏详细报告
                $("#my-detail-report").hide();
                $("#my-detail-report").find("*").hide();
                $("#edit-model").children("div").not($("#my-detail-report")).each(function () {
                    $(this).show();
                    $(this).find("*").show();
                });
                $("#too-much").find("p").remove();
                //获取模型的id
                var modelId = $(this).attr("id");
                util.currentModelId = modelId;
                $.post({
                    url: "/stock/modeldetail",
                    data: {
                        modelId: modelId
                    },
                    success: function (data) {
                        if(data["status"] === "SUCCESS"){
                            var report = eval("(" + data["report"]["reportdata"] + ")");
                            if (report["state"] === "YES") {
                                //首先清空上次的提示信息

                                var tooMuch = "";
                                //返回数据不是太多的情况下
                                var dataReportNormal = report["data"]["dataReportNormol"];
                                var ifTooMuch = dataReportNormal["ifTooMuch"];
                                var infoTooMuch = dataReportNormal["infoTooMuch"];
                                var infoNotTooMuch = dataReportNormal["infoNotTooMuch"];
                                if (ifTooMuch === 0) {
                                    if (infoTooMuch[0] === 0) {
                                        $("#not-too-much").hide();
                                        $("#not-too-much").find("*").hide();
                                        // $("#too-much").show();
                                        //显示选中股票为0的状况
                                        tooMuch = "<p>模型名称:<span>"+ $this.text()+"</span><br>在回测期内，共选中 " + infoTooMuch[0] + " 个股票。</p>";
                                        $("#too-much").append(tooMuch);
                                        //之前存在的数据全部清空
                                        //重新显示
                                    } else {
                                        //只显示报告
                                        $("#too-much").hide();
                                        util.buttonCss($navLi.eq(7), "yellow", "auto");
                                        var dataDetailed = report["data"]["dataDetailed"];
                                        var dataYear = report["data"]["dataYear"];
                                        var dataMonth = report["data"]["dataMonth"];
                                        //报告
                                        //填充基本信息
                                        var $reportSpan = $("#not-too-much").find("span");
                                        $reportSpan.eq(0).text($this.text());
                                        util.reportTable($reportSpan, infoNotTooMuch, infoTooMuch);
                                        //绘制简略折线图
                                        var reportChart = echarts.init(document.getElementById("my-report-chart"));
                                        util.fundLine(reportChart, dataDetailed["datetime"], dataDetailed["profit"]["MondelConsumProfit"], dataDetailed["profit"]["HS300ConsumProfit"]);
                                        //详细报告
                                        //填充基本信息
                                        var detailReportSpan = $("#my-detail-report").children("div").first().find("span");
                                        $("#my-detail-report").children("div").first().find("input").remove();
                                        $("#my-detail-report").children("div").first().find("span").eq(0).text($this.text());
                                        util.reportTable(detailReportSpan, infoNotTooMuch, infoTooMuch);
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
                                    $("#not-too-much").hide();
                                    $("#not-too-much").find("*").hide();
                                    // $("#too-much").show();
                                    //选中股票过多
                                    var tooMuch = "<p>模型名称:<span>"+ $this.text()+"</span><br>在回测期内，共选中 <strong>" + infoTooMuch[0] + " </strong>个股票。<br><br>股票数量过大，系统给出摘要信息供您参考：<br><br>所有选中的股票，" + "<br>" +
                                        "在随后1个交易日的平均涨跌幅为 <strong>" + (infoTooMuch[1] * 100).toFixed(2) + "%" + "</strong>，" + "<br>" + "在随后5个交易日的平均涨跌幅为 <strong>" + (infoTooMuch[2] * 100).toFixed(2) + "%" + "</strong>，" + "<br>" +
                                        "在随后20个交易日的平均涨跌幅为 <strong>" + (infoTooMuch[3] * 100).toFixed(2) + "%" + "</strong><p>";
                                    //之前存在的数据全部清空
                                    // $("#edit-model").children("div").eq(0).nextAll().each(function () {
                                    //     $(this).hide();
                                    //     $(this).find("*").hide();
                                    // });
                                    util.buttonCss($navLi.eq(7), "lightsteelblue", "none");
                                    //只显示p
                                    $("#too-much").append(tooMuch);
                                }
                            } else {
                                alert(report["error"]);
                            }
                        }else {
                            alert("空闲超时，请重新登录！");
                        }
                        //再填写详细报告和报告


                    },
                    error: function () {
                        alert("连接服务器失败！");

                    }
                })
            })
        },
        //模型回测结果详细报告
        detailReport: function () {
            $navLi.eq(7).on("click", function () {
                //首先去掉选中的指标
                $("#my-detail-report").find("ul").remove();
                $("#my-detail-report").children("p").remove();
                //显示详细报告
                $divRoot.children("div").not($("#edit-model")).each(function () {
                    $(this).hide();
                    $(this).find("*").hide();
                });
                $("#edit-model").show();
                $("#my-detail-report").show();
                $("#my-detail-report").find("*").show();
                $("#edit-model").children("div").not($("#my-detail-report")).each(function () {
                    $(this).hide();
                    $(this).find("*").hide();
                });

            })
        },
        //    导出excel
        exportExcel: function () {
            $("#my-detail-report").find("button").on("click", function () {
                $("#stock-record").find("tr").first().before("<tr><td>买入日期</td><td>详细选股记录</td><td>持有期内总盈利</td></tr>");
                $("#stock-record").table2excel({
                    exclude: ".noExl",
                    name: "Worksheet Name",
                    filename: "选股记录"
                });
                $("#stock-record").find("tr").first().remove();
            })

        }
    };
});