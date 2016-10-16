/*!
 * @file        scroll_view.js
 * @brief       スクロールビュー
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * ScrollViewクラス
 * setData: {}
 * @class
 * @abstract
 * @name app.ScrollView
 * @extends predator.ViewTemplate
 */
app.ScrollView = predator.ViewTemplate.extend(/** @lends app.ScrollView# */{
    _className: "ScrollView",

    _json: "blank.json",

});

/**
 * ScrollViewの生成
 * @returns {*}
 */
app.createScrollView = function () {
    var view = new app.ScrollView();

    return view;
};