/*!
 * @file        tutorial.js
 * @brief       チュートリアル用ADV
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * Tutorialクラス
 * setData: {}
 * @class
 * @name app.Tutorial
 * @extends predator.ViewTemplate
 */
app.Tutorial = predator.ViewTemplate.extend(/** @lends app.Tutorial# */{
    _className: "Tutorial",

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
    }
});

/**
 * Tutorialの生成
 * @param $script
 * @returns {*}
 */
app.createTutorial = function ($script) {
    var view = new app.Tutorial();
    view.setData({script:$script});
    return view;
};