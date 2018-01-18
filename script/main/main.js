/**
 * Created by Hu_2015 on 2016/12/10.
 */
require.config({
    paths: {
        "jquery": "../../js/jquery"
    }
    // shim: {
    //     'amui': ['$']
    // }
});
require(["elementCtrl","run","check","model","newmodel","editmodel","savemodel","detailreport","deletemodel","jquery"], function (elementCtrl,run,check,model,newModel,editModel,saveModel,detailReport,deleteModel) {
    //回退

    // elementCtrl.myModel();
    //加载用户名
    elementCtrl.receiveUserName();
    //注销
    elementCtrl.logout();
    //选择指标
    run.chooseIndex();
//    运行并生成详细报告
    run.runResult();
//    重置

    //
    elementCtrl.indexChange();
    //校验
    check.check();
//    编辑
    elementCtrl.edit();
//    创建新模型
    newModel.newModel();
//用户模型表
    model.userModelList();
//    每一个模型的报告
    model.displayModelReport();
//    模型回测详细结果
    model.detailReport();
//    导出excel表格
    model.exportExcel();
//    编辑模型
    editModel.editModel();
//    保存模型

    saveModel.saveModel();
//    详细报告
    detailReport.detailReport();
//    删除模型
    deleteModel.deleteModel();
    elementCtrl.resetPage();
//    禁止回退
    elementCtrl.forbidBack();
//    换肤
    elementCtrl.replaceSkin();
})