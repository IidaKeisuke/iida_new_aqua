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

    /**
     * ステップの設定
     * @param $value
     */
    setStep: function ($value) {
        this._step = $value;
    },

    /**
     * ステップの取得
     */
    getStep: function () {
        return this._step;
    },

    /**
     * カウントアップ
     */
    countUp: function () {
        this.setCurrentValue(this._currentValue+this._step);
    },

    /**
     * カウントダウン
     */
    countDown: function () {
        this.setCurrentValue(this._currentValue-this._step);
    },

    /*
     *  イベント処理
     */

    /**
     * 値が変更された時の挙動
     * @param $obj
     */
    didChangeValue: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.CountUp);
        if (!view || view.isLocked()) return;

        view.lock();
        view.didChangeValue_();
        if (view.delegate && view.delegate.didChangeValue) view.delegate.didChangeValue(view);
        view.unlock();
    },

    /**
     * ボタンがタップされた時の挙動
     * @param $obj
     */
    onTapUpButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.CountUp);
        if (!view || view.isLocked() || !view.isEnabled()) return;

        view.lock();
        view.countUp();
        view.onTapUpButton_();
        if (view.delegate && view.delegate.onTapUpButton) view.delegate.onTapUpButton(view);
        view.unlock();
    },

    /**
     * ボタンがタップされた時の挙動
     * @param $obj
     */
    onTapDownButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.CountUp);
        if (!view || view.isLocked() || !view.isEnabled()) return;

        view.lock();
        view.countDown();
        view.onTapDownButton_();
        if (view.delegate && view.delegate.onTapDownButton) view.delegate.onTapDownButton(view);
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * 値が変更された時の挙動（インナー）
     * @protected
     */
    didChangeValue_: function () {},

    /**
     * ボタンがタップされた時の挙動（インナー）
     * @param $obj
     */
    onTapUpButton_: function () {},

    /**
     * ボタンがタップされた時の挙動（インナー）
     * @param $obj
     */
    onTapDownButton_: function () {}
});