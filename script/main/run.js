/**
 * Created by Hu_2015 on 2017/1/4.
 * 运行模块
 */
require.config({
    paths: {
        "echarts": "../../js/echarts"

    }
})
define(["jquery", "util", "echarts"], function ($, util, echarts) {

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
                //添加div 方便右对齐
                $leftUl.append("<li class='" + className + "'><div><span></span></div><div></div><div></div></li>");
                //第一个div放置第一个span  第二个div放置第二个span
                $leftUl.find("li." + className).last().children("div").first().children("span").text($(this).find("span").first().text() + ":");
                $leftUl.find("li." + className).last().children("div").eq(1).append($(this).find("span").eq(1).clone());
                $leftUl.find("li." + className).last().children("div").last().append($(this).find("span").last().clone());
                // $leftUl.append($(this).clone());
                // $(this).css({
                //     "pointer-events": "none",
                //     "color": "blueviolet",
                //     "border-color": "blueviolet"
                // });
                $leftUl.find("li." + className).show();
                $leftUl.find("li." + className).find("*").show();
                //只要指标数量变化  详细报告 选股 以及保存都不能点击
                util.buttonCss($navLi.eq(1), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(2), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(3), "lightsteelblue", "none");

            });
            //    如果不想换指标，点击左端的删除图标
            $leftUl.on("click", "img", function () {
                var $parent = $(this).parent().parent().parent();
                var $matchLi = $("#right").find("li");
                var className = $parent.attr("class");

                var str = "";
                for (var i = 0; i < $matchLi.length; i++) {

                    str = $parent.find("span").eq(0).text();
                    $parent.remove();
                    // if (str.substring(0, str.length - 1) === $matchLi.eq(i).find("span").eq(0).text()) {
                    //
                    //     // $matchLi.eq(i).css({
                    //     //     "pointer-events": "auto",
                    //     //     "color": "yellow",
                    //     //     "border-color": "yellow"
                    //     // });
                    //     if (className === "A0007") {
                    //         $matchLi.eq(i).find("input").eq(0).prop("checked", true);
                    //     }
                    // }
                }
                util.buttonCss($navLi.eq(1), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(2), "lightsteelblue", "none");
                util.buttonCss($navLi.eq(3), "lightsteelblue", "none");

            });
        },
        //运行并生成报告
        runResult: function () {
            var $button = $("#left").find("button");
            var $ul = $("#left").find("ul");

            // progress();
            //运行  运行之后把模型详细信息里面数据全部替换掉
            $button.click(function () {
                //运行按钮变灰不能点击
                // util.buttonCss($("#left").find("button"),"lightsteelblue","none");
                $(".f-five").last().find("p").remove();
                $("#left").children("div").eq(0).find("*").hide();
                //删除提示信息
                // $("#left").find("p").remove();
                //删除股票过多或者股票为0的提示信息
                $("#detail-report").children("div.too-much").find("p").remove();
                //封装模型信息
                //指标的个数，如果指标个数大于0 去找input的个数
                if ($ul.find("li").length !== 0) {
                    $("#left").find("button").css({
                        "pointer-events":"none"
                    })
//判断input值是否有空值
                    var $emptyInput = $("#left").find("input[type='text']");
                    var emptyInputLen = $("#left").find("input[type='text']").length;
                    for (var m = 0; m < emptyInputLen; m++) {
                        if ($emptyInput.eq(m).val() === "") {
                            var warnInfo = "横线处信息不完整！";
                            $(".f-five").last().append("<p>" + warnInfo + "</p>");
                            $("#left").find("button").css({
                                "pointer-events":"auto"
                            })
                            return false;
                        }
                    }
                    var $li = $ul.find("li");
                    //获取模型名称和信息
                    var model = util.getModelName_Info($li);

                    // if(util.saveFlag === 0){
                    //     util.currentModelId ="";
                    // }
                    //显示详细报告
                    // $divRoot.children("div").not($("#detail-report")).each(function () {
                    //     $(this).hide();
                    //     $(this).find("*").hide();
                    // });
                    //全局变量保存模型参数信息
                    // currentModelInfo = modelInfo;
                    if ($("#left p").length !== 0) {
                        $("#left").find("button").css({
                            "pointer-events":"auto"
                        })
                        return false;
                    }
                    $.post({
                        url: "/stock/runmodel",
                        data: {
                            modelId: util.currentModelId,
                            modelName: model.modelName,
                            modelInfo: model.modelInfo
                        },
                        success: function (data) {
                            // clear();
                            //获取report的数据转换为json格式
                            if (data["status"] === "WAITING") {
                                //全局变量保存模型id
                                util.currentModelId = data["modelId"];
                                $button.click();
                            } else if (data["status"] === "ERROR") {
                                alert(data["message"]);
                            } else if(data["status"] === "SUCCESS"){
                                // util.buttonCss($("#left").find("button"),"lightsteelblue","none");
                                // util.appendIndexToDetail($("#detail-report"));
                                //运行成功
                                $("#left").find("button").css({
                                    "pointer-events":"auto"
                                })
                                var reportStr = data["dataBack"];
                                var report = eval("(" + reportStr + ")");
                                if (report["state"] === "YES") {
                                    //选股太多的信息提示清空
                                    $("#too-much").find("p").remove();
                                    util.currentReportData = reportStr;
                                    //返回数据不是太多的情况下
                                    var modelId = report["id"];
                                    //全局变量保存模型id
                                    util.currentModelId = modelId;
                                    var dataReportNormal = report["data"]["dataReportNormol"];
                                    var ifTooMuch = dataReportNormal["ifTooMuch"];
                                    var infoTooMuch = dataReportNormal["infoTooMuch"];
                                    var infoNotTooMuch = dataReportNormal["infoNotTooMuch"];
                                    if (ifTooMuch === 0) {
                                        //如果没有选中股票，提示没有股票选中
                                        if (infoTooMuch[0] === 0) {
                                            var tooMuch = "<p>模型名称:<input type='text' value='"+model.modelName+"'><br>在回测期内，共选中 " + infoTooMuch[0] + " 个股票。</p>"
                                            //之前存在的数据全部清空
                                            // $("#detail-report").children("div.not-too-much").hide();
                                            // $("#detail-report").children("div.not-too-much").find("*").hide();
                                            // $("#detail-report").children("div.too-much").show();
                                            //重新显示
                                            // $("#detail-report").children("div.too-much").append(tooMuch);
                                            $("#too-much").append(tooMuch);
                                        } else {
                                            // $("#edit-model").children("div").not($("#my-detail-report")).each(function () {
                                            //     $(this).hide();
                                            //     $(this).find("*").hide();
                                            // });
                                            // $("#my-detail-report").show();
                                            // $("#my-detail-report").find("*").show();
                                            //显示数据不太多的状况
                                            // $("#detail-report").children("div.not-too-much").show();
                                            // $("#detail-report").children("div.not-too-much").find("*").show();
                                            // $("#detail-report").children("div.too-much").hide();
                                            //如果选中了股票，并且股票数量不太多的情况
                                            var dataDetailed = report["data"]["dataDetailed"];
                                            var dataYear = report["data"]["dataYear"];
                                            var dataMonth = report["data"]["dataMonth"];
                                            //报告
                                            //填充基本信息
                                            var $reportSpan = $("#not-too-much").find("span");
                                            $reportSpan.eq(0).text(model.modelName);
                                            util.reportTable($reportSpan, infoNotTooMuch,infoTooMuch);
                                            //绘制简略折线图
                                            var reportChart = echarts.init(document.getElementById("my-report-chart"));
                                            util.fundLine(reportChart, dataDetailed["datetime"], dataDetailed["profit"]["MondelConsumProfit"], dataDetailed["profit"]["HS300ConsumProfit"]);
                                            //详细报告
                                            //填充基本信息
                                            var detailReportSpan = $("#my-detail-report").children("div").first().find("span");
                                            $("#my-detail-report").children("div").first().find("span").eq(0).after("<input type='text'>");
                                            $("#my-detail-report").children("div").first().find("span").eq(0).text("");
                                            $("#my-detail-report").find("input").val(model.modelName);
                                            util.reportTable(detailReportSpan, infoNotTooMuch,infoTooMuch);
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
                                        //如果选中的股票数据过多
                                        var tooMuch = "<p>模型名称:<input type='text' value='"+model.modelName+"'><br>在回测期内，共选中 <strong>" + infoTooMuch[0] + " </strong>个股票。<br><br>股票数量过大，系统给出摘要信息供您参考：<br><br>所有选中的股票，" + "<br>" +
                                            "在随后1个交易日的平均涨跌幅为 <strong>" + (infoTooMuch[1] * 100).toFixed(2) + "%" + "</strong>，" + "<br>" + "在随后5个交易日的平均涨跌幅为 <strong>" + (infoTooMuch[2] * 100).toFixed(2) + "%" + "</strong>，" + "<br>" +
                                            "在随后20个交易日的平均涨跌幅为 <strong>" + (infoTooMuch[3] * 100).toFixed(2) + "%" + "</strong><p>";
                                        //之前存在的数据全部清空
                                        // $("#detail-report").children("div.not-too-much").hide();
                                        // $("#detail-report").children("div.not-too-much").find("*").hide();
                                        // $("#detail-report").children("div.too-much").show();
                                        //重新显示
                                        // $("#detail-report").children("div.too-much").append(tooMuch);
                                        $("#too-much").append(tooMuch);
                                    }
                                    //当有结果时，显示报告  详细报告以及可以保存
                                    // $navLi.eq(5).prevAll().each(function () {
                                    //     util.buttonCss($(this), "yellow", "auto");
                                    // });

                                } else {
                                    alert(report["error"]);
                                }
                                //详细报告不能再点击
                                util.buttonCss($navLi.eq(1), "lightsteelblue", "none");
                                //编辑 选股 以及保存都能点击
                                util.buttonCss($navLi.eq(0), "yellow", "auto");
                                //选股
                                util.buttonCss($navLi.eq(2), "yellow", "auto");
                                //保存
                                util.buttonCss($navLi.eq(3), "yellow", "auto");
                                $navLi.eq(1).click();
                            }else{
                                alert("空闲超时，请重新登录！");
                            }
                            //控制运行后的页面
                            //    生成折线图
                        }
                    });


                } else {
                    $(".f-five").last().append("<p>请先选择指标！</p>");
                }
                // $("#index").hide();

            });
        },
        exportExcel: function () {
            $("#detail-report").find("button").on("click", function () {
                $("#run-stock-record").find("tr").first().before("<tr><td>买入日期</td><td>详细选股记录</td><td>持有期内总盈利</td></tr>");
                $("#run-stock-record").table2excel({
                    exclude_text: true,
                    exclude: ".noExl",
                    name: "Worksheet Name",
                    filename: "选股记录"
                });
                $("#run-stock-record").find("tr").first().remove();
            })
        }
    };
});