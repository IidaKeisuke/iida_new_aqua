/*!
 * @file        radiobox.js
 * @brief       ラジオボックス
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * RadioBoxクラス
 * setData: {}
 * @class
 * @abstract
 * @name app.RadioBox
 * @extends predator.ViewTemplate
 */
app.RadioBox = predator.ViewTemplate.extend(/** @lends app.RadioBox# */{
    _className: "RadioBox",

    _json: "blank.json",

    /**
     * 実行処理
     */
    execute: function () {
        this.onTapRadioBox(this);
    },

    /*
     *  イベント処理
     */

    /**
     * ラジオボックスがタップされた時の挙動
     * @event TapRadioBox
     * @param $obj
     */
    onTapRadioBox: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.RadioBox);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            view.toggle();
            view.onTapRadioBox_();
            var callback = view.getEventCallback("TapRadioBox");
            if (callback) callback.func.call(callback.target, view);
        }
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * ラジオボックスがタップされた時の挙動（インナー）
     * @protected
     */
    onTapRadioBox_: function () {}

});