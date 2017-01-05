/**
 * Created by Hu_2015 on 2017/1/4.
 * 校验模块
 */
// require.config({
//     paths: {
//         "jquery": "../../js/jquery",
//
//     }
// })
define(["jquery", "util"], function () {
    var $leftUl = $("#left").children("div").eq(1).find("ul");
    var $input = $("#left").children("div").eq(2).find("input[type='text']");
    return {
        check: function () {
            //校验输入都是日期的输入框
            $("#left").on("keyup", "input.date", function () {
                $("#left").children("div").eq(1).find("p").remove();
                var warnInfo = "";
                var $this = $(this);
                var inputVal = $this.val();
                var numInputVal = Number(inputVal);
                var liClassName = $this.parent().parent().parent().attr("class");
                var max = Number($this.attr("max"));
                var min = Number($this.attr("min"));
                //判断输入是否是正整数/^\+?[1-9]\d*$/
                if (inputVal.replace(/^\+?[1-9]\d*$/g, '').length !== 0) {
                    $this.val(inputVal.substring(0, inputVal.length - 1));
                    warnInfo = "输入格式不正确!N必须是正整数，且N的范围是" + min + "到" + max;
                    util.warn($this, warnInfo);
                }
                //判断是否超出范围
                if ((numInputVal > max || numInputVal < min) && (inputVal !== "")) {
                    $this.val("");
                    warnInfo = "输入范围不正确!N的范围是" + min + "到" + max + ",请重新输入!";
                    util.warn($this, warnInfo);
                }
                if (liClassName === "A0006") {
                    var $brother = $this.parent().children("input[type='text']").not($this);
                    if ($brother.val() !== "") {
                        if (numInputVal + Number($brother.val()) > 30) {
                            $this.val("");
                            warnInfo = "N1 + N2不能超过30!";
                            util.warn($this, warnInfo);
                        }
                    }
                } else if (liClassName === "A0010" || liClassName === "A0011") {
                    var $prev = $this.parent().children("input[type='text']").eq(0);
                    var $next = $this.parent().children("input[type='text']").eq(1);
                    var prevVal = Number($prev.val());
                    var nextVal = Number($next.val());
                    if (prevVal !== 0 && nextVal !== 0) {
                        if (prevVal <= nextVal) {
                            $this.val("");
                            warnInfo = "N必须大于M,请重新输入!";
                            util.warn($this, warnInfo);
                        }

                    }
                }


            });
            //校验输入框是百分数的
            $("#left").on("blur", "input.percentage", function () {
                $("#left").children("div").eq(1).find("p").remove();
                var warnInfo = "";
                var $this = $(this);
                var inputVal = $this.val();
                var numInputVal = Number(inputVal);
                var liClassName = $this.parent().parent().parent().attr("class");
                var max = Number($this.attr("max"));
                var min = Number($this.attr("min"));
                //判断输入是否是正整数
                if (liClassName === "A0001") {
                    if (inputVal.replace(/^(-|\+)?\d+$/g, '').length !== 0) {
                        $this.val("");
                        warnInfo = "输入格式不正确，请输入数字!";
                        util.warn($this, warnInfo);
                    }

                    if ((numInputVal > max || numInputVal < min) && (inputVal !== "")) {
                        $this.val("");
                        warnInfo = "输入范围不正确!M1或M2的范围是" + min + "到" + max + ",请重新输入!";
                        util.warn($this, warnInfo);
                    }
                    var $pre = $this.parent().children("input[type='text']").eq(1);
                    var $next = $this.parent().children("input[type='text']").eq(2);
                    var preVal = Number($pre.val());
                    var nextVal = Number($next.val());
                    if (preVal !== 0 && nextVal !== 0) {
                        if (preVal >= nextVal) {
                            $this.val("");
                            warnInfo = "M1必须小于M2";
                            util.warn($this, warnInfo);
                        }
                    }
                } else if (liClassName === "A0002" || liClassName === "A0005") {
                    if (inputVal.replace(/^[0-9]+$/g, '').length !== 0) {
                        $this.val("");
                        warnInfo = "输入格式不正确，请输入正整数或者0!";
                        util.warn($this, warnInfo);
                    }
                    if ((numInputVal > max || numInputVal < min) && (inputVal !== "")) {
                        $this.val("");
                        warnInfo = "输入范围不正确!M1或M2的范围是" + min + "到" + max + ",请重新输入!";
                        util.warn($this, warnInfo);
                    }
                    var $pre = $this.parent().children("input[type='text']").eq(1);
                    var $next = $this.parent().children("input[type='text']").eq(2);
                    var preVal = Number($pre.val());
                    var nextVal = Number($next.val());
                    if (preVal !== 0 && nextVal !== 0) {
                        if (preVal >= nextVal) {
                            $this.val("");
                            warnInfo = "M1必须小于M2";
                            util.warn($this, warnInfo);
                        }
                    }


                } else if (liClassName === "A0008" || liClassName === "A0009") {
                    if (inputVal.replace(/^[0-9]+(.[0-9]{1,2})?$/g, '').length !== 0) {
                        alert("输入格式不正确,请输入小数,并保留小数点后两位！");
                        $this.val("");
                    }
                    var $pre = $this.parent().children("input[type='text']").eq(0);
                    var $last = $this.parent().children("input[type='text']").eq(1);
                    var preVal = Number($pre.val());
                    var preUnitVal = Number($pre.next().val());
                    var lastVal = Number($last.val());
                    var lastNextVal = Number($last.next().val());
                    if (preVal !== 0 && lastVal !== 0) {
                        if (preVal * preUnitVal >= lastVal * lastNextVal) {
                            $this.val("");
                            warnInfo = "市值M1必须小于M2!";
                            util.warn($this, warnInfo);
                        }
                    }
                }

            })
            // 当所选指标的input获得焦点时，slider开始出现,使用slider时进行的校验 首先校验百分比的
            $leftUl.on("focus", "input.percentage", function () {
                $("#left").children("div").eq(0).find("p").remove();

                var warnInfo = "";
                //滑块进度条显示
                $("#left").children("div").first().show();
                $("#left").children("div").first().find("*").show();
                // $("#left").children("div").first()
                var $this = $(this);
                var liClassName = $this.parent().parent().parent().attr("class");
                var min = Number($this.attr("min"));
                var max = Number($this.attr("max"));
                var step = Number($this.attr("step"));
                $("#slider").prev().text("指标范围：" + min);
                $("#slider").next().text(max);
                // alert(liClasName);
                //完成数据大小判别的校验
                if (liClassName === "A0001" || liClassName === "A0002" || liClassName === "A0005") {
                    $("#slider").slider({
                        range: "min",
                        min: min,
                        max: max,
                        value: (max - min) / 2,
                        step: step,
                        animate: true,
                        slide: function (event, ui) {
                            $this.val(ui.value);
                        },
                        stop: function () {
                            $("#left").children("div").eq(1).find("p").remove();
                            var $pre = $this.parent().children("input[type='text']").eq(1);
                            var $next = $this.parent().children("input[type='text']").eq(2);
                            var preVal = Number($pre.val());
                            var nextVal = Number($next.val());
                            if (preVal !== 0 && nextVal !== 0) {
                                if (preVal > nextVal) {
                                    $this.val("");
                                    warnInfo = "M1必须小于M2";
                                    util.warn($this, warnInfo);
                                }
                            }
                        }
                    });
                } else if (liClassName === "A0008" || liClassName === "A0009") {

                    $("#slider").slider({
                        range: "min",
                        min: min,
                        max: max,
                        value: (max - min) / 2,
                        step: step,
                        animate: true,
                        slide: function (event, ui) {
                            $this.val(ui.value);
                        },
                        stop: function () {
                            $("#left").children("div").eq(1).find("p").remove();
                            var $pre = $this.parent().children("input[type='text']").eq(1);
                            var $next = $this.parent().children("input[type='text']").eq(2);
                            var preVal = Number($pre.val());
                            var nextVal = Number($next.val());
                            if (preVal !== 0 && nextVal !== 0) {
                                if (preVal > nextVal) {
                                    $this.val("");
                                    warnInfo = "市值M1必须小于市值M2";
                                    util.warn($this, warnInfo);
                                }
                            }
                        }
                    });

                }

            })
            //其次校验日期的
            $leftUl.on("focus", "input.date", function () {
                //
                // $("#left").children("div").eq(0).find("p").remove();

                //
                var warnInfo = "";
                $("#left").children("div").first().show();
                $("#left").children("div").first().find("*").show();
                // $("#left").children("div").first()
                var $this = $(this);
                var liClassName = $this.parent().parent().parent().attr("class");
                var min = Number($this.attr("min"));
                var max = Number($this.attr("max"));
                var step = Number($this.attr("step"));
                $("#slider").prev().text("指标范围：" + min);
                $("#slider").next().text(max);
                if (liClassName === "A0006") {
                    $("#slider").slider({
                        range: "min",
                        min: min,
                        max: max,
                        value: (max - min) / 2,
                        step: step,
                        animate: true,
                        slide: function (event, ui) {
                            $this.val(ui.value);
                        },
                        stop: function () {
                            $("#left").children("div").eq(1).find("p").remove();

                            var numInputVal = Number($this.val());
                            var $brother = $this.parent().children("input[type='text']").not($this);
                            if ($brother.val() !== "") {
                                if (numInputVal + Number($brother.val()) > 30) {
                                    $this.val("");
                                    warnInfo = "N1 + N2不能超过30!";
                                    util.warn($this, warnInfo);
                                }
                            }
                        }
                    });

                } else if (liClassName === "A0010" || liClassName === "A0011") {
                    $("#slider").slider({
                        range: "min",
                        min: min,
                        max: max,
                        value: (max - min) / 2,
                        step: step,
                        animate: true,
                        slide: function (event, ui) {
                            $this.val(ui.value);
                        },
                        stop: function () {
                            $("#left").children("div").eq(1).find("p").remove();

                            var $prev = $this.parent().children("input[type='text']").eq(0);
                            var $next = $this.parent().children("input[type='text']").eq(1);
                            var prevVal = Number($prev.val());
                            var nextVal = Number($next.val());
                            if (prevVal !== 0 && nextVal !== 0) {
                                if (prevVal <= nextVal) {
                                    $this.val("");
                                    warnInfo = "N必须大于M,请重新输入!";
                                    util.warn($this, warnInfo);
                                }

                            }
                        }
                    });

                } else if (liClassName === "A0001" || liClassName === "A0002" || liClassName === "A0004" || liClassName === "A0005") {
                    $("#slider").slider({
                        range: "min",
                        min: min,
                        max: max,
                        value: (max - min) / 2,
                        step: step,
                        animate: true,
                        slide: function (event, ui) {
                            $this.val(ui.value);
                        }
                    });
                }
            })


            //    校验止损止盈持有期的输入
            //校验持有期
            $input.eq(0).on("keyup", function () {
                $("#left").children("div").eq(2).find("p").remove();
                var inputVal = $(this).val();
                var max = $(this).attr("max");
                var min = $(this).attr("min");
                var numInputVal = Number($(this).val());
                //必须是大于0的正整数
                if (inputVal.replace(/^\+?[1-9]\d*$/g, '').length !== 0) {
                    $(this).val(inputVal.substring(0, inputVal.length - 1));
                    $(this).parent().parent().append("<p>输入格式不正确!请输入大于0的正整数!</p>")
                }
                //判断是否超出范围，不能超出60
                if ((numInputVal > max || numInputVal < min) && (inputVal !== "")) {
                    $(this).val("");
                    $(this).parent().parent().append("<p>输入范围不正确!持有期的范围是" + min + "到" + max + ",请重新输入!</p>");
                }
            })
            //    校验止损
            $input.eq(1).on("keyup", function () {
                $("#left").children("div").eq(2).find("p").remove();
                var inputVal = $(this).val();
                if (inputVal.replace(/^[0-9]+$/g, '').length !== 0) {
                    $(this).val("");
                    $(this).parent().parent().append("<p>输入格式不正确!请输入正整数或者0!</p>")
                }
            })
            //    校验止盈
            $input.eq(2).on("keyup", function () {
                $("#left").children("div").eq(2).find("p").remove();
                var inputVal = $(this).val();
                if (inputVal.replace(/^[0-9]+$/g, '').length !== 0) {
                    $(this).val("");
                    $(this).parent().parent().append("<p>输入格式不正确!请输入正整数或者0!</p>")
                }
            })

        }
    };
});