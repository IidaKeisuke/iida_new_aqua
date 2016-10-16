/*!
 * @file        dialog.js
 * @brief       ダイアログUI
 * @date        2016/10/10
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * ダイアログタイプ
 */
app.DialogType = {
    OK: 0,
    OK_NG: 1,
    ERROR: 2,
    INTERRUPT: 3
};

/**
 * Dialogクラス
 * setData: {}
 * @class
 * @abstract
 * @name app.Dialog
 * @extends predator.ViewTemplate
 */
app.Dialog = predator.ViewTemplate.extend(/** @lends app.Dialog# */{
    _className: "Dialog",

    _json: "blank.json",

    _type: app.DialogType.OK,

    /*
     *  イベント処理
     */

    /**
     * OKボタンがタップされた時の挙動
     * @event TapOKButton
     * @param $obj
     */
    onTapOKButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Dialog);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            view.onTapOKButton_();
            var callback = view.getEventCallback("TapOKButton");
            if (callback) callback.func.call(callback.target, view);
        }
        view.unlock();
    },

    /**
     * NGボタンがタップされた時の挙動
     * @event TapNGButton
     * @param $obj
     */
    onTapNGButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Dialog);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            view.onTapNGButton_();
            var callback = view.getEventCallback("TapNGButton");
            if (callback) callback.func.call(callback.target, view);
        }
        view.unlock();
    },

    /**
     * 閉じるボタンがタップされた時の挙動
     * @event TapCloseButton
     * @param $obj
     */
    onTapCloseButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Dialog);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            view.onTapCloseButton_();
            var callback = view.getEventCallback("TapCloseButton");
            if (callback) callback.func.call(callback.target, view);
        }
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * OKボタンがタップされた時の挙動（インナー）
     * @protected
     */
    onTapOKButton_: function () {},

    /**
     * NGボタンがタップされた時の挙動（インナー）
     * @protected
     */
    onTapNGButton_: function () {},

    /**
     * 閉じるボタンがタップされた時の挙動（インナー）
     * @protected
     */
    onTapCloseButton_: function () {}
});