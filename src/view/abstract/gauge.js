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

    /**
     *
     * @returns {number}
     */
    getValue: function () {
        return this._currentValue;
    },


    setValue: function ($value) {
        this._currentValue = $value;
    },

    /*
     *  イベント処理
     */

    /**
     * 値が変更された時の挙動
     * @param $obj
     */
    onChangeValue: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Slider);
        if (!view || view.isLocked()) return;

        view.lock();
        view.onChangeValue_();
        if (view.delegate && view.delegate.onChangeValue) view.delegate.onChangeValue(view);
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * 値が変更された時の挙動（インナー）
     * @protected
     */
    onChangeValue_: function () {}
});