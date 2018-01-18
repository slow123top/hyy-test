/**
 * Created by Hu_2015 on 2017/1/7.
 */
define(["jquery", "util", "model"], function ($, util, model) {
    var $navLi = $("nav").find("ul").find("li");
    return {
        //    保存模型
        saveModel: function () {
            $navLi.eq(3).on("click", function () {
                var $li = $("#left").find("ul").find("li");
                var liLen = $("#left").find("ul").find("li").length;
                if (liLen !== 0) {
                    //获得模型名称和模型信息
                    var model = util.getModelName_Info($li);
                    var modelName = $("#my-detail-report").find("input").eq(0).val();
                    $.post({
                        url: "/stock/savemodel",
                        data: {
                            modelId: util.currentModelId,
                            modelName: modelName,
                            modelInfo: model.modelInfo,
                            reportData: util.currentReportData
                        },
                        success: function (data) {
                            //设置保存的标记变为1
                            // util.saveFlag = 1;
                            //需要接受返回的模型id
                            if(data["status"] === "ERROR"){
                                alert(data["message"]);
                            }else{
                                alert(data["message"]);
                                util.currentModelId = data["model"]["modelid"];

                            }

                        }
                    })
                } else {
                    alert("没有选择指标，无法保存");
                }
            })
        },
    };
});