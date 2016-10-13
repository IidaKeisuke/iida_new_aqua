/*!
 * @file        adventure.js
 * @brief       アドベンチャーUI
 * @date        2016/10/10
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * Adventureクラス
 * setData: {}
 * @class
 * @name app.Adventure
 * @extends predator.ViewTemplate
 */
app.Adventure = predator.ViewTemplate.extend(/** @lends app.Adventure# */{
    _className: "Adventure",

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
 * Adventureの生成
 * @param $script
 * @returns {*}
 */
app.createAdventure = function ($script) {
    var view = new app.Adventure();
    view.setData({script:$script});
    return view;
};