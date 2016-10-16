/*!
 * @file        pager.js
 * @brief       ページャー
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * Pagerクラス
 * setData: {}
 * @class
 * @abstract
 * @name app.Pager
 * @extends predator.ViewTemplate
 */
app.Pager = predator.ViewTemplate.extend(/** @lends app.Pager# */{
    _className: "Pager",

    _json: "blank.json",

    /*
     *  制御処理
     */

    /**
     * 前へ
     */
    prev: function () {
        this.setValue(this.getValue()-1);
    },

    /**
     * 次へ
     */
    next: function () {
        this.setValue(this.getValue()+1);
    }
});