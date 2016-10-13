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
 * @name app.ScrollView
 * @extends predator.ViewTemplate
 */
app.ScrollView = predator.ViewTemplate.extend(/** @lends app.ScrollView# */{
    _className: "ScrollView",

    _json: "",
    _preload: [],

    /**
     * 初期化処理
     * @param {Object|null} attr
     * @param {Object} model
     */
    initialize: function (attr, model) {
        this._super(attr, model);

    },

    /**
     * 破棄処理
     */
    dispose: function () {

        this._super();
    },

    /**
     * ビューの更新
     * @returns {boolean}
     */
    refresh: function () {
        if (!this._super()) return false;

        return true;
    },
});

/**
 * ScrollViewの生成
 * @returns {*}
 */
app.createScrollView = function () {
    var view = new app.ScrollView();

    return view;
};