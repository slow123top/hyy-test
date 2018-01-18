/**
 * Created by Hu_2015 on 2017/1/7.
 */
define(["jquery","util"],function ($,util) {
    var $navLi = $("nav").find("ul").find("li");
    return {
        //    删除模型
        deleteModel: function () {
            $navLi.last().on("click", function () {
                var $ul = $("#my-model").find("ul");
                var modelId = util.currentModelId;

                $.post({
                    url: "/stock/deletemodel",
                    data: {
                        modelId: modelId
                    },
                    success: function (data) {
                        if (data["status"] === "SUCCESS") {
                            $ul.find("li#"+util.currentModelId).remove();
                        }else{
                            alert("空闲超时，请重新登录！");
                        }
                    }
                })
            })

        },
    };
});