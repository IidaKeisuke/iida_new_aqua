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
 * @name app.Pager
 * @extends predator.ViewTemplate
 */
app.Pager = predator.ViewTemplate.extend(/** @lends app.Pager# */{
    _className: "Pager",

    _currentValue: 1,
    _maxValue: 1,

    /**
     * 前へ
     */
    prev: function () {
        this.setCurrentValue(this._currentValue-1);
    },

    /**
     * 次へ
     */
    next: function () {
        this.setCurrentValue(this._currentValue+1);
    },

    /**
     * 最大値の設定
     * @param $value
     */
    setMaxValue: function ($value) {
        this._maxValue = $value;
        this._currentValue = ora.clamp(this._currentValue,0,this._maxValue);
        this.setDirty(true);
    },

    /**
     * 最大値の取得
     * @returns {number}
     */
    getMaxValue: function () {
        return this._maxValue;
    },

    /**
     * 現在値の設定
     * @param $value
     */
    setCurrentValue: function ($value) {
        this._currentValue = ora.clamp($value,0,this._maxValue);
        this.setDirty(true);
    },

    /**
     * 現在値の取得
     * @returns {number}
     */
    getCurrentValue: function () {
        return this._currentValue;
    }

});