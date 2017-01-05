/**
 * Created by Hu_2015 on 2016/12/23.
 */
require.config({
    paths: {
        "jquery": "../../js/jquery",
        "echarts": "../../js/echarts"
    }
})
define(["jquery", "echarts"], function () {
//    获取userid
    var userId = '';
//报告折线图
    var fundLine = function (myChart, dateTime, ModelProfit, HS300Profit) {
        var option = {
            //折线图标题
            title: {
                text: '模型资金净值曲线',
                textStyle: {
                    color: "black"
                }
            },
            backgroundColor: "rgba(255,255,255,0.7)",
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                // backgroundColor: "white",
                data: ['模型资金净值', "沪深300指数"],
                textStyle: {
                    color: "black",
                    fontSize: 16
                }
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    name: "日期",
                    nameLocation: "end",
                    type: 'category',
                    boundaryGap: false,
                    data: dateTime,
                    axisLabel: {
                        textStyle: {
                            color: "black"
                        },
                        lineStyle: {
                            color: "black"
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: "black"
                        }
                    }

                }
            ],
            yAxis: [
                {
                    name: "资金净值",
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: "black"
                        }
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "black"
                        }
                    }
                }
            ],
            dataZoom: [
                {
                    type: "slider",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    // filterColor:"black"
                },

            ],
            series: [
                {
                    lineStyle: {
                        normal: {
                            color: "red",
                            type: "solid"
                        }

                    },
                    name: '模型资金净值',
                    type: 'line',
                    data: ModelProfit,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    }
                },
                {
                    lineStyle: {
                        normal: {
                            color: "blue",
                            type: "solid"
                        }
                    },
                    name: '沪深300指数',
                    type: 'line',
                    data: HS300Profit,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    }
                }
            ]
        };
        myChart.setOption(option);

        // 为echarts对象加载数据

    }
    //报告表格
    var reportTable = function ($td, infoNotTooMuch) {
        $td.eq(0).text((infoNotTooMuch[0] * 100).toFixed(2) + "%");
        $td.eq(1).text((infoNotTooMuch[1] * 100).toFixed(2) + "%");
        $td.eq(2).text((infoNotTooMuch[2] * 100).toFixed(2) + "%");
        $td.eq(3).text(infoNotTooMuch[3]);
        $td.eq(4).text(infoNotTooMuch[4]);
        $td.eq(5).text((infoNotTooMuch[5] * 100).toFixed(2) + "%");
        $td.eq(6).text((infoNotTooMuch[6] * 100).toFixed(2) + "%");
    }
    //详细报告年份月份表格

    var detailReportYearMonth = function ($table, dataYear, dataMonth) {

        var month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        var monthTemp;
        //    清空之前的表格数据
        $table.find("*").remove();
        //    根据dataYear填写年份和年盈利率
        var yearDataTime = dataYear["datetime"];
        var monthDateTime = dataMonth["datetime"];
        var monthProfit = dataMonth["profit"];
        var yearProfit = dataYear["profit"];
        for (var i = 0; i < dataYear["datetime"].length; i++) {

            $table.append("<tr><td>" + yearDataTime[i] + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>" +
                "<td></td><td></td><td></td><td>" + ((yearProfit[i] * 100).toFixed(2) + "%") + "</td></tr>")
        }
        //    解析年月字符串，分出年份和月份,并向根据月盈利率填写数据
        var $tr = $table.find("tr");
        //把月盈利率取出来，每一个都进行比较
        for (var j = 0; j < dataMonth["datetime"].length; j++) {
            monthTemp = monthDateTime[j];
            //取得每一行的第一个与月利率的前几个字符进行比较
            for (var y = 0; y < $tr.length; y++) {
                var $td = $tr.eq(y).children("td");
                if (monthTemp.substring(0, 4) === $td.eq(0).text()) {
                    //取得每一月份与月利率月份比较，确定最后填充数据的位置
                    for (var m = 0; m < month.length; m++) {
                        if (monthTemp === ($td.eq(0).text() + "-" + month[m])) {
                            $td.eq(m + 1).text((monthProfit[j] * 100).toFixed(2) + "%");
                        }
                    }
                }
            }

        }


    }
    //详细报告选股表格
    var detailReportStock = function ($table, dataTime, stocks, ModelProfit) {
        $table.find("*").remove();
        for (var i = 0; i < dataTime.length; i++) {
            $table.append("<tr><td>" + dataTime[i] + "</td><td>" + stocks[i] + "</td><td>" + ((ModelProfit[i] * 100).toFixed(2) + "%") + "</td></tr>");
        }
    }

    return {
        //返回用户的模型表
        userModelList: function () {
            //用户点击 我的模型  显示用户的模型列表
            $("header").children("h2").on("click", function () {
                var $select = $("#edit-model").find("select");
                $.post({
                    url: "http://192.168.11.8:8080/stock/mymodels",
                    withCredentials: true,
                    success: function (data) {
                        var myModels = data["mymodels"];
                        var myModelsLen = data["mymodels"].length;
                        if (myModelsLen !== 0) {
                            userId = myModels[0]["userid"];
                            for (var i = 0; i < myModelsLen; i++) {
                                var modelId = myModels[i]["modelid"];
                                var modelName = myModels[i]["modelname"];
                                $select.append("<option value=" + modelId + ">" + modelName + "</option>");
                            }
                            $("#edit-model").show();
                            $("#edit-model").find("*").show();
                        }
                    },
                    error: function () {
                        alert("连接服务器失败！");
                    }
                })

            })
        },
//    编辑模型
        editModel: function () {
            //    通过下拉框选择模型  查看模型信息
            $("#edit-model").find("select").change(function () {
                //获取下拉框的值，也就是模型的id
                var modelId = $(this).val();
                $.post({
                    url: "http://192.168.11.8:8080/stock/modeldetail",
                    data: {
                        userId: userId,
                        modelId: modelId
                    },
                    success: function (data) {
                        var report = eval("(" + data["report"]["reportdata"] + ")");
                        if (report["state"] === "YES") {
                            $("#edit-model").parent().find("p").remove();
                            //返回数据不是太多的情况下
                            var dataReportNormal = report["data"]["dataReportNormol"];
                            var ifTooMuch = dataReportNormal["ifTooMuch"];
                            var infoTooMuch = dataReportNormal["infoTooMuch"];
                            var infoNotTooMuch = dataReportNormal["infoNotTooMuch"];
                            if (ifTooMuch === 0) {

                                if (infoTooMuch[0] === 0) {
                                    var tooMuch = "<p>在回测期内，共选中 " + infoTooMuch[0] + " 个股票。</p>"
                                    //之前存在的数据全部清空
                                    //重新显示
                                    $("#report-echarts").parent().append(tooMuch);
                                } else {
                                    var dataDetailed = report["data"]["dataDetailed"];
                                    var dataYear = report["data"]["dataYear"];
                                    var dataMonth = report["data"]["dataMonth"];
                                    //绘制报告折线图
                                    var myChart = echarts.init(document.getElementById("edit-model-chart"));
                                    fundLine(myChart, dataDetailed["datetime"], dataDetailed["profit"]["MondelConsumProfit"], dataDetailed["profit"]["HS300ConsumProfit"]);
                                    //填充报告表格
                                    var $td = $("#edit-model").find("table.report-table").eq(0).find("tbody").find("td");
                                    reportTable($td, infoNotTooMuch);
                                    //    填充详细报告年份月份表格
                                    var $table = $("#edit-model").find(".report-table").eq(1);
                                    detailReportYearMonth($table, dataYear, dataMonth);

                                    //    填充详细报告选股表格
                                    var $detailTable = $("#edit-model").find(".report-table").eq(2);
                                    detailReportStock($detailTable, dataDetailed["datetime"], dataDetailed["stocks"], dataDetailed["profit"]["MondelProfit"]);
                                }
                            } else {
                                var tooMuch = "<p>在回测期内，共选中 " + infoTooMuch[0] + " 个股票。股票数量过大，系统给出摘要信息供您参考：所有选中的股票，" + "<br>" +
                                    "在随后1个交易日的平均涨跌幅为 " + infoTooMuch[1] + "，" + "<br>" + "在随后1个交易日的平均涨跌幅为 " + infoTooMuch[2] + "，" + "<br>" +
                                    "在随后1个交易日的平均涨跌幅为 " + infoTooMuch[3] + "<p>";
                                $("#edit-model").append(tooMuch);
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
        }

    };
});