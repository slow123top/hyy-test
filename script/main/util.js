/**
 * Created by Hu_2015 on 2017/1/4.
 * 定义所有的函数，供其它模块调用
 */
define(function () {
    return {
        //输入校验的提示非弹框
        warn: function ($this, warnInfo) {
            var $parent = $this.parent().parent().parent();
            $parent.append("<p>" + warnInfo + "</p>");
        },
        //控制按钮样式变化的函数
        buttonCss: function ($li, color, pointerEvents) {
            $li.css({
                "border": "2px solid " + color,
                "color": color,
                "pointer-events": pointerEvents
            })
        },
        //设置用于传输后端的模型名称和模型信息
        getModelName_Info: function ($li) {
            var model = {
                modelName: '',
                modelInfo: ''
            };
            var modelInfo = "";
            for (var i = 0; i < $li.length; i++) {

                //连接头A0001加一横杠 A0001-
                var className = $li.eq(i).attr("class");
                modelInfo += className + "-";

                if (className === "A0007") {

                    modelInfo += $li.eq(i).find("input[type='radio']:checked").val() + "_";

                } else if (className === "A0008" || className === "A0009") {
                    var $input = $li.eq(i).find("input");
                    for (var j = 0; j < $input.length; j++) {
                        //给指标填空
                        var selectVal = Number($input.eq(j).next().val());
                        modelInfo += Number($input.eq(j).val()) * selectVal + "_";
                    }
                } else {
                    var $input = $li.eq(i).find("input");
                    for (var j = 0; j < $input.length; j++) {
                        //给指标填空
                        modelInfo += $input.eq(j).val() + "_";
                    }
                }

                modelInfo = modelInfo.substring(0, modelInfo.length - 1) + "&";
            }
            //连接control
            var $formInput = $("#left").find("form").find("input");
            //持有期
            var duration = $formInput.eq(0).val();
            //止损
            var loss = $formInput.eq(1).val();
            //    止盈
            var profit = $formInput.eq(2).val();
            var time = $("#left").find("form").find("input[type='radio']:checked").val();
            //模型名称
            var modelName = $formInput.eq(3).val();
            //全局变量保存模型名称
            // currentModelName = modelName;
            //模型信息 modelInfo
            modelInfo += "CONTROL-" + duration + "_" + loss + "_" + profit + "_" + time;
            //    模型信息构造
            model.modelName = modelName;
            model.modelInfo = modelInfo;
            return model;
        },
        //生成折线图
        fundLine: function (myChart, dateTime, ModelProfit, HS300Profit) {
            for (var i = 0; i < ModelProfit.length; i++) {
                ModelProfit[i] = ModelProfit[i].toFixed(2);
            }
            for (var j = 0; j < HS300Profit.length; j++) {
                HS300Profit[j] = HS300Profit[j].toFixed(2);
            }
            var option = {
                //折线图标题
                title: {
                    text: '模型资金净值曲线',
                    textStyle: {
                        color: "#FFFFFF"
                    }
                },
                // backgroundColor: "rgba(255,255,255,0.7)",
                tooltip: {
                    trigger: 'axis',
                    // backgroundColor:"red",
                    color: "yellow"
                },
                legend: {
                    data: ['模型资金净值', "沪深300指数"],
                    textStyle: {
                        color: "#FFFFFF",
                        fontSize: 16
                    },

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
                                color: "#FFFFFF"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#FFFFFF"
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
                                color: "#FFFFFF"
                            }
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: "#FFFFFF"
                            }
                        }
                    }
                ],
                // dataZoom: [
                //     {
                //         type: "slider",
                //         backgroundColor: "rgba(255,255,255,0.2)",
                //         // filterColor:"black"
                //     },
                //
                // ],
                dataZoom: [{
                    start: 30,
                    end: 80
                },
                    {
                        type: 'inside',
                    }
                ],
                series: [
                    {
                        // lineStyle: {
                        //     normal: {
                        //         color: "red",
                        //         type: "solid"
                        //     }
                        //
                        // },
                        symbol: "circle",
                        name: '模型资金净值',
                        type: 'line',
                        data: ModelProfit,
                    },
                    {
                        itemStyle: {
                            normal: {
                                color: "yellow"
                            }

                        },
                        lineStyle: {
                            normal: {
                                color: "yellow",
                                type: "solid"
                            }
                        },
                        symbol: "circle",
                        name: '沪深300指数',
                        type: 'line',
                        data: HS300Profit
                    }
                ]
            };
            // 为echarts对象加载数据
            myChart.setOption(option);


        },
        //生成报告
        reportTable: function ($span, infoNotTooMuch) {
            $span.eq(0).text((infoNotTooMuch[0] * 100).toFixed(2) + "%");
            $span.eq(1).text((infoNotTooMuch[1] * 100).toFixed(2) + "%");
            $span.eq(2).text((infoNotTooMuch[2] * 100).toFixed(2) + "%");
            $span.eq(3).text(infoNotTooMuch[3]);
            $span.eq(4).text(infoNotTooMuch[4]);
            $span.eq(5).text((infoNotTooMuch[5] * 100).toFixed(2) + "%");
            $span.eq(6).text((infoNotTooMuch[6] * 100).toFixed(2) + "%");
        },
        //    生成详细报告年份月份表格
        detailReportYearMonth: function ($table, dataYear, dataMonth) {

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


        },
        //详细报告选股表格
        detailReportStock: function ($table, dataTime, stocks, ModelProfit) {
            $table.find("*").remove();
            for (var i = 0; i < dataTime.length; i++) {
                $table.append("<tr><td>" + dataTime[i] + "</td><td>" + stocks[i] + "</td><td>" + ((ModelProfit[i] * 100).toFixed(2) + "%") + "</td></tr>");
            }
        }


    };
});