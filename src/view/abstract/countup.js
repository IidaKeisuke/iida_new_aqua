/*!
 * @file        countup.js
 * @brief       カウントアップ
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * CountUpクラス
 * setData: {}
 * @class
 * @name app.CountUp
 * @extends predator.ViewTemplate
 */
app.CountUp = predator.ViewTemplate.extend(/** @lends app.CountUp# */{
    _className: "CountUp",

    _currentValue: 0,
    _minValue: 0,
    _maxValue: 1,
    _step: 1,

    /*
     *  Getter / Setter
     */

    /**
     * 現在地の設定
     * @param $value
     */
    setCurrentValue: function ($value) {
        this._currentValue = ora.clamp($value,this._minValue,this._maxValue);
        this.setDirty(true);
    },

    /**
     * 現在地の取得
     * @returns {number}
     */
    getCurrentValue: function () {
        return this._currentValue;
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
     * ボタンがタップされた時の挙動
     * @param $obj
     */
    onTapUpButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Button);
        if (!view || view.isLocked() || !view.isEnable()) return;

        view.lock();
        view.onTapUpButton_();
        if (view.delegate && view.delegate.onTapUpButton) view.delegate.onTapUpButton(view);
        view.unlock();
    },

    /**
     * ボタンがタップされた時の挙動
     * @param $obj
     */
    onTapDownButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Button);
        if (!view || view.isLocked() || !view.isEnable()) return;

        view.lock();
        view.onTapDownButton_();
        if (view.delegate && view.delegate.onTapDownButton) view.delegate.onTapDownButton(view);
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */
    onTapUpButton_: function () {},

    onTapDownButton_: function () {}
});