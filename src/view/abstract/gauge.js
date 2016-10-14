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
 * @name app.Gauge
 * @extends predator.ViewTemplate
 */
app.Gauge = predator.ViewTemplate.extend(/** @lends app.Gauge# */{
    _className: "Gauge",

    _minValue: 0,
    _maxValue: 0,
    _currentValue: 0,

    _limitOff: false,

    /*
     *  Getter / Setter
     */

    /**
     * 最大/最小値での制限解除フラグの設定
     * @param $flag
     */
    setLimitOff: function ($flag) {
        this._limitOff = $flag;
    },

    /**
     * 最大/最小値での制限解除フラグの取得
     * @returns {boolean}
     */
    isLimitOff: function () {
        return this._limitOff;
    },

    /**
     * 現在地の設定
     * @param $value
     */
    setCurrentValue: function ($value) {
        var value = (this._limitOff)? $value: ora.clamp($value,this._minValue,this._maxValue);
        if (this._currentValue == value) return;

        this._currentValue = value;
        this.setDirty(true);

        this.didChangeValue(this);
    },

    /**
     * 現在地の取得
     * @returns {number}
     */
    getCurrentValue: function () {
        return this._currentValue;
    },

    /**
     * 現在値をパーセントで取得
     */
    getPercent: function () {
        if (this._maxValue-this._minValue == 0) return 0;
        return (this._currentValue-this._minValue)/(this._maxValue-this._minValue);
    },

    /**
     * 現在値をパーセントで設定
     * @param $percent
     */
    setPercent: function ($percent) {
        this.setCurrentValue((this._maxValue-this._minValue)*($percent/100)+this._minValue);
    },

    /**
     * 最小値の設定
     * @param $value
     */
    setMinValue: function ($value) {
        this._minValue = $value;
        this.setCurrentValue(this._currentValue);
        this.setDirty(true);
    },

    /**
     * 最大値の取得
     * @returns {number}
     */
    getMinValue: function () {
        return this._minValue;
    },

    /**
     * 最大値の設定
     * @param $value
     */
    setMaxValue: function ($value) {
        this._maxValue = $value;
        this.setCurrentValue(this._currentValue);
        this.setDirty(true);
    },

    /**
     * 最大値の取得
     * @returns {number}
     */
    getMaxValue: function () {
        return this._maxValue;
    },

    /*
     *  イベント処理
     */

    /**
     * 値が変更された時の挙動
     * @param $obj
     */
    didChangeValue: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Gauge);
        if (!view || view.isLocked()) return;

        view.lock();
        view.didChangeValue_();
        if (view.delegate && view.delegate.didChangeValue) view.delegate.didChangeValue(view);
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * 値が変更された時の挙動（インナー）
     * @protected
     */
    didChangeValue_: function () {}
});