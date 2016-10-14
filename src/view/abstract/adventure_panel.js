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