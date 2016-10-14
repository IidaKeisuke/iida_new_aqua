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
 * @name app.Dialog
 * @extends predator.ViewTemplate
 */
app.Dialog = predator.ViewTemplate.extend(/** @lends app.Dialog# */{
    _className: "Dialog",

    _type: app.DialogType.OK,

    /*
     *  イベント処理
     */

    /**
     * OKボタンがタップされた時の挙動
     * @param $obj
     */
    onTapOKButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Dialog);
        if (!view || view.isLocked()) return;

        view.lock();
        view.onTapOKButton_();
        if (view.delegate && view.delegate.onTapOKButton) view.delegate.onTapOKButton(view);
        view.unlock();
    },

    /**
     * NGボタンがタップされた時の挙動
     * @param $obj
     */
    onTapNGButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Dialog);
        if (!view || view.isLocked()) return;

        view.lock();
        view.onTapNGButton_();
        if (view.delegate && view.delegate.onTapNGButton) view.delegate.onTapNGButton(view);
        view.unlock();
    },

    /**
     * 閉じるボタンがタップされた時の挙動
     * @param $obj
     */
    onTapCloseButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Dialog);
        if (!view || view.isLocked()) return;

        view.lock();
        view.onTapCloseButton_();
        if (view.delegate && view.delegate.onTapCloseButton) view.delegate.onTapCloseButton(view);
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