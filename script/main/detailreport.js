/**
 * Created by Hu_2015 on 2017/1/7.
 */
define(["jquery", "util", "model"], function ($, util, model) {
    var $navLi = $("nav").find("ul").find("li");
    var $divRoot = $("body").children("div");
    return {
        //详细报告
        detailReport: function () {
            $navLi.eq(1).click(function () {
                //详细报告不能再点击
                util.buttonCss($(this), "lightsteelblue", "none");
                //编辑 选股 以及保存都能点击
                util.buttonCss($navLi.eq(0), "yellow", "auto");
                //选股
                util.buttonCss($navLi.eq(2), "yellow", "auto");
                //保存
                util.buttonCss($navLi.eq(3), "yellow", "auto");
                //重置不能点击
                util.buttonCss($navLi.eq(4), "lightsteelblue", "none");
                $divRoot.children("div").not($("#edit-model")).each(function () {
                    $(this).hide();
                    $(this).find("*").hide();
                });
                $("#edit-model").show();
                $("#edit-model").find("*").show();

                //模拟模型中的详细报告
                $navLi.eq(7).click();
                //加入指标
                util.appendIndexToDetail($("#my-detail-report"));
                $("div#my-detail-report").children("p").remove();

                //选股数量较多时
                if ($("div#too-much p").length !== 0) {
                    $("#my-detail-report").find("ul").after($("#too-much p").show().clone());
                    $("#my-detail-report").find("p").find("input").show();
                    $("#my-detail-report").find("p").find("br").show();
                    $("#my-detail-report").find("strong").show();
                    $("#my-detail-report").children("div").each(function () {
                        $(this).hide();
                        $(this).find("*").hide();
                    });

                }


            });
        },
    };
});