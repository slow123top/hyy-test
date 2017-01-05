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
require(["elementCtrl","run","check","model"], function (elementCtrl,run,check,model) {
    //选择指标
    run.chooseIndex();
//    运行并生成详细报告
    run.runResult();
//    重置
    elementCtrl.resetPage();
    //校验
    check.check();
    //报告
    elementCtrl.report();
    //详细报告
    elementCtrl.detailReport();

    //保存模型
    elementCtrl.saveModel();
//    编辑
    elementCtrl.edit();
//    创建新模型
    elementCtrl.newModel();
//用户模型表
    model.userModelList();
//    每一个模型的报告
    model.displayModelReport();
//    模型回测详细结果
    model.detailReport();
//    导出excel表格
    model.exportExcel();
})