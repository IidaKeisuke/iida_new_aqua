/*!
 * @file        gauge.js
 * @brief       ゲージ
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * Gaugeクラス
 * setData: {}
 * @class
 * @abstract
 * @name app.Gauge
 * @extends predator.ViewTemplate
 */
app.Gauge = predator.ViewTemplate.extend(/** @lends app.Gauge# */{
    _className: "Gauge",

    _json: "blank.json",

    _minValue: 0,

    _limit: 100,
    _isLimitOffMode: false,

    /*
     *  Getter / Setter
     */

    /**
     * 最大/最小値での制限解除フラグの設定
     * @param $flag
     */
    setLimitOff: function ($flag) {
        if (this._isLimitOffMode == $flag) return;

        if ($flag) {
            this.setMaxValue(app.MAX_VALUE);
        } else {
            this.setMaxValue(this._limit);
        }
    },

    /**
     * 最大/最小値での制限解除フラグの取得
     * @returns {boolean}
     */
    isLimitOff: function () {
        return this._isLimitOffMode;
    },

    /**
     * 制限値の設定
     * @param $value
     */
    setLimit: function ($value) {
        if (this._limit == $value) return;

        this._limit = $value;
        if (!this._isLimitOffMode) this.setMaxValue(this._limit);
        this.setDirty(true);

        this.reloadValue();
    },

    /**
     * 制限値の取得
     * @returns {number}
     */
    getLimit: function () {
        return this._limit;
    }

});