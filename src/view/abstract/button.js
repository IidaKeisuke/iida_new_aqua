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
 * @name app.Button
 * @extends predator.ViewTemplate
 */
app.Button = predator.ViewTemplate.extend(/** @lends app.Button# */{
    _className: "Button",

    /*
     *  イベント処理
     */

    /**
     * ボタンがタップされた時の挙動
     * @param $obj
     */
    onTapButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Button);
        if (!view || view.isLocked() || !view.isEnabled()) return;

        view.lock();
        view.onTapButton_();
        if (view.delegate && view.delegate.onTapButton) view.delegate.onTapButton(view);
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