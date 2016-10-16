/*!
 * @file        button.js
 * @brief       ボタンUI
 * @date        2016/10/10
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * Buttonクラス
 * setData: {}
 * @class
 * @abstract
 * @name app.Button
 * @extends predator.ViewTemplate
 */
app.Button = predator.ViewTemplate.extend(/** @lends app.Button# */{
    _className: "Button",

    _json: "blank.json",

    /**
     * 実行処理
     */
    execute: function () {
        this.onTapButton(this);
    },

    /*
     *  イベント処理
     */

    /**
     * ボタンがタップされた時の挙動
     * @event TapButton
     * @param $obj
     */
    onTapButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Button);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            view.onTapButton_();
            var callback = view.getEventCallback("TapButton");
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
    onTapButton_: function () {}
});