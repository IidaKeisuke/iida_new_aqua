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

    _messageWindow: "mess_window.json",
    _messageObject: "mess_object.json",
    _messageWindowAlias: "frm_message",
    _messageWindowPadding: {
        "x": 80,
        "y": 50
    },
    _messageLineSpace: 2,
    _messageAuto: false,
    _messageSpeed: 0.1,
    _pageFeedType: "CLEAR",
    _pageFeedSpeed: 0.2,
    _pageFeedArrowAlias: "spr_arrow",

    _onActionEnded: "app.Adventure.onActionEnded",
    _onInitializeEnded: "app.Adventure.onActionEnded",
    _onDisposeEnded: "app.Adventure.onActionEnded",
    _onTapMessageWindow: "app.Adventure.onTapMessageWindow",
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