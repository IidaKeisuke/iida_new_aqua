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
 * @abstract
 * @name app.CountUp
 * @extends predator.ViewTemplate
 */
app.CountUp = predator.ViewTemplate.extend(/** @lends app.CountUp# */{
    _className: "CountUp",

    _json: "blank.json",

    _minValue: 0,
    _step: 1,

    _upButton: null,
    _downButton: null,

    initialize: function (attr, model) {
        this._super(attr, model);

        this._upButton = model["btn_up"];
        this._upButton.setEventCallback("TapButton", this.onTapUpButton, this);
        this._downButton = model["btn_down"];
        this._downButton.setEventCallback("TapButton", this.onTapDownButton, this);
    },

    /*
     *  Getter / Setter
     */

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
        this.setValue(this._currentValue+this._step);
    },

    /**
     * カウントダウン
     */
    countDown: function () {
        this.setValue(this._currentValue-this._step);
    },

    /*
     *  イベント処理
     */

    /**
     * UPボタンがタップされた時の挙動
     * @param $obj
     * @event TapUpButton
     */
    onTapUpButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.CountUp);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            view.countUp();
            view.onTapUpButton_();
            var callback = view.getEventCallback("TapUpButton");
            if (callback) callback.func.call(callback.target, view);
        }
        view.unlock();
    },

    /**
     * DOWNボタンがタップされた時の挙動
     * @event TapDownButton
     * @param $obj
     */
    onTapDownButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.CountUp);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            view.countDown();
            view.onTapDownButton_();
            var callback = view.getEventCallback("TapDownButton");
            if (callback) callback.func.call(callback.target, view);
        }
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * ボタンがタップされた時の挙動（インナー）
     * @protected
     */
    onTapUpButton_: function () {},

    /**
     * ボタンがタップされた時の挙動（インナー）
     * @protected
     */
    onTapDownButton_: function () {}
});