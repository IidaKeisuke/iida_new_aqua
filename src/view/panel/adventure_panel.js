/*!
 * @file        adventure_panel.js
 * @brief       アドベンチャーパネル
 * @date        2016/10/13
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * AdventurePanelクラス
 * setData: {}
 * @class
 * @name app.AdventurePanel
 * @extends app.Adventure
 */
app.AdventurePanel = app.Adventure.extend(/** @lends app.AdventurePanel# */{
    _className: "AdventurePanel",

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
 * AdventurePanelの生成
 * @returns {*}
 */
app.createAdventurePanel = function ($script) {
    var view = new app.AdventurePanel();
    if (cc.isString($script)) view.setScript($script);
    return view;
};