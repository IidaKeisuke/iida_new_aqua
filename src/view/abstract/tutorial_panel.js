/*!
 * @file        tutorial_panel.js
 * @brief       チュートリアルパネル
 * @date        2016/10/13
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * TutorialPanelクラス
 * setData: {}
 * @class
 * @name app.TutorialPanel
 * @extends app.Adventure
 */
app.TutorialPanel = app.Adventure.extend(/** @lends app.TutorialPanel# */{
    _className: "TutorialPanel",

});

/**
 * TutorialPanelの生成
 * @returns {*}
 */
app.createTutorialPanel = function ($script) {
    var view = new app.TutorialPanel();
    if (cc.isString($script)) view.setScript($script);
    return view;
};