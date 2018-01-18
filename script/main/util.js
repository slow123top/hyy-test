/**
 * Created by Hu_2015 on 2017/1/4.
 * 定义所有的函数，供其它模块调用
 */
define(function () {
    return {
        //定义几个全局变量
        currentModelId: "",
        currentModelName: "",
        currentModelInfo: "",
        currentReportData: "",
        goBack: "",
        saveFlag: 0,
        //详细报告显示指标
        appendIndexToDetail: function ($div) {
            $div.find("ul").remove();
            $div.prepend("<ul>模型指标:</ul>");
            var $leftIndex = $("#left").children("div").find("ul").find("li");
            var leftIndexLen = $("#left").children("div").find("ul").find("li").length;
            var $input = $("#left").children("div").eq(2).find("input[type='text']");
            var $inputChecked = $("#left").children("div").eq(2).find("input[type='radio']:checked");
            for (var i = 0; i < leftIndexLen; i++) {
                var className = $leftIndex.eq(i).attr("class");
                var $val = $leftIndex.eq(i).find("input");
                var $select = $leftIndex.eq(i).find("select");
                switch (className) {
                    case "A0001":
                        $div.find("ul").append("<li><span>" + $val.eq(0).val() + "</span>日涨跌幅在<span>" + $val.eq(1).val() + "</span>到<span>" + $val.eq(2).val() + "</span></li>");
                        break;
                    case "A0002":
                        $div.find("ul").append("<li><span>" + $val.eq(0).val() + "</span>日平均换手率在<span>" + $val.eq(1).val() + "</span>-<span>" + $val.eq(2).val() + "</span>之间</li>");
                        break;
                    case "A0004":
                        $div.find("ul").append("<li><span>" + $val.eq(0).val() + "</span>日均线上穿<span>" + $val.eq(1).val() + "</span>日均线</li>");
                        break;
                    case "A0005":
                        $div.find("ul").append("<li><span>" + $val.eq(0).val() + "</span>日内每日涨跌幅的绝对值的平均值在<span>" + $val.eq(1).val() + "</span>-<span>" + $val.eq(2).val() + "</span>内</li>");
                        break;
                    case "A0006":
                        $div.find("ul").append("<li>连续下跌<span>" + $val.eq(0).val() + "</span>天后又连续上涨<span>" + $val.eq(1).val() + "</span>天</li>");
                        break;
                    case "A0007":
                        $div.find("ul").append("<li><span></span>日平均换手率在<span></span><span>-</span>之间</li>");
                        break;
                    case "A0008":
                        var m1 = $val.eq(0).val() * $select.eq(0).val();
                        var m2 = $val.eq(1).val() * $select.eq(1).val();
                        $div.find("ul").append("<li>总市值在<span>" + m1 + "</span>-<span>" + m2 + "</span>内</li>");
                        break;
                    case "A0009":
                        var m1 = $val.eq(0).val() * $select.eq(0).val();
                        var m2 = $val.eq(1).val() * $select.eq(1).val();
                        $div.find("ul").append("<li>流通市值介于<span>" + m1 + "</span>-<span>" + m2 + "</span>内</li>");
                        break;
                    case "A0010":
                        $div.find("ul").append("<li>倒数第<span>" + $val.eq(1).val() + "</span>个交易日的成交量是过去<span>" + $val.eq(0).val() + "</span>天内的最低量</li>");
                        break;
                    case "A0011":
                        $div.find("ul").append("<li>倒数第<span>" + $val.eq(1).val() + "</span>个交易日的成交量是过去<span>" + $val.eq(0).val() + "</span>天内的最高量</li>");
                        break;
                }

            }
            //    加入持有期 跌幅达到百分之M1止损 涨幅达到百分之M2止盈 回测时间 模型名称
            $div.find("ul").append("<li>持有期是<span>" + $input.eq(0).val() + "</span>日</li>");
            $div.find("ul").append("<li>跌幅达到<span>" + $input.eq(1).val() + "</span>%止损</li>");
            $div.find("ul").append("<li>涨幅达到<span>" + $input.eq(2).val() + "</span>%止盈</li>");
            $div.find("ul").append("<li>回测时间是<span>" + $inputChecked.val() + "</span>年</li>");
        },
        //输入校验的提示非弹框
        warn: function ($this, warnInfo) {
            var $parent = $this.parent().parent().parent();
            $parent.append("<p>" + warnInfo + "</p>");
        },
        //控制按钮样式变化的函数
        buttonCss: function ($li, color, pointerEvents) {
            $li.css({
                "border": "1px solid " + color,
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
                } else if (className === "A0001" || className === "A0002" || className === "A0005") {
                    var $input = $li.eq(i).find("input");
                    modelInfo += $input.eq(0).val() + "_";
                    for (var j = 1; j < $input.length; j++) {
                        //给指标填空
                        modelInfo += Number($input.eq(j).val()) / 100 + "_";
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
                ModelProfit[i] = Number(ModelProfit[i]).toFixed(2);
            }
            for (var j = 0; j < HS300Profit.length; j++) {
                HS300Profit[j] = Number(HS300Profit[j]).toFixed(2);
            }
            var option = {
                //折线图标题
                title: {
                    text: '模型资金净值曲线',
                    textStyle: {
                        color: "#FFFFFF"
                    },
                    left:"10%"
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
                    top:"10%"

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
                dataZoom: [{
                    start: 0,
                    end: 100
                },
                    {
                        type: 'inside',
                    }
                ],
                series: [
                    {
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
        reportTable: function ($span, infoNotTooMuch, infoTooMuch) {
            if (infoNotTooMuch.length === 0) {
                $span.eq(1).text("0.00%");
                $span.eq(2).text("0.00%");
                $span.eq(4).text("0.00%");
                $span.eq(5).text(0);
                $span.eq(6).text(0);
                $span.eq(7).text("0.00%");
                $span.eq(8).text("0.00%");
            } else {
                $span.eq(1).text((Number(infoNotTooMuch[0]) * 100).toFixed(2) + "%");
                $span.eq(2).text((Number(infoNotTooMuch[1]) * 100).toFixed(2) + "%");
                $span.eq(4).text((Number(infoNotTooMuch[2]) * 100).toFixed(2) + "%");
                $span.eq(5).text(Number(infoNotTooMuch[3]));
                $span.eq(6).text(Number(infoNotTooMuch[4]));
                $span.eq(7).text((Number(infoNotTooMuch[5]) * 100).toFixed(2) + "%");
                $span.eq(8).text((Number(infoNotTooMuch[6]) * 100).toFixed(2) + "%");
            }
            $span.eq(3).text(Number(infoTooMuch[0]));
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
                //先把时间和盈利率加上
                $table.append("<tr><td>" + dataTime[i] + "</td><td></td><td>" + ((ModelProfit[i] * 100).toFixed(2) + "%") + "</td></tr>");
                var tdVal = "";
                for (var j = 0; j < stocks[i].length; j++) {
                    //    再把选股记录逐条加上
                    tdVal = $table.find("tr").last().find("td").eq(1).text();
                    // if ((j + 1) === stocks[i].length) {
                    //     $table.find("tr").last().find("td").eq(1).text(tdVal + stocks[i][j]);
                    // } else {
                    $table.find("tr").last().find("td").eq(1).text(tdVal + stocks[i][j] + "，");
                    // }
                }
            }
        }


    };
});