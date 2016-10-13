/*!
 * @file        drop_list.js
 * @brief       ドロップリスト
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * DropListクラス
 * setData: {}
 * @class
 * @name app.DropList
 * @extends predator.ViewTemplate
 */
app.DropList = predator.ViewTemplate.extend(/** @lends app.DropList# */{
    _className: "DropList",

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