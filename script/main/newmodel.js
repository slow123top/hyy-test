/**
 * Created by Hu_2015 on 2017/1/6.
 */
define(["jquery","util"],function ($,util) {
    var $navLi = $("nav").find("ul").find("li");
    return {
//    创建新模型
        newModel: function () {
            $navLi.eq(5).on("click", function () {
                //应该有模型id清零
                util.currentModelId = "";
                $("header").children("h2").next().text("创建新模型");
                var $this = $(this);
                //展示创建新模型之前的所有按钮
                $this.prevAll().each(function () {
                    $(this).show();
                    $(this).css({
                        "display": "inline-block"
                    });
                });
                $navLi.eq(4).prevAll().each(function () {
                    //只有重置按钮可用
                    util.buttonCss($(this),"lightsteelblue", "none");
                });
                util.buttonCss($navLi.eq(4),"yellow", "auto");
                //隐藏创建新模型后面的所有按钮
                $navLi.eq(4).nextAll().hide();
                //相当于重置模型
                $navLi.eq(4).click();
            })
        },
    };
});