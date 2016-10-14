/*!
 * @file        checkbox.js
 * @brief       チェックボックス
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * CheckBoxクラス
 * setData: {}
 * @class
 * @name app.CheckBox
 * @extends predator.ViewTemplate
 */
app.CheckBox = predator.ViewTemplate.extend(/** @lends app.CheckBox# */{
    _className: "CheckBox",

    /*
     *  イベント処理
     */

    /**
     * チェックボックスがタップされた時の挙動
     * @param $obj
     */
    onTapCheckbox: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.CheckBox);
        if (!view || view.isLocked() || !view.isEnabled()) return;

        view.lock();
        view.toggle();
        view.onTapCheckbox_();
        if (view.delegate && view.delegate.onTapCheckbox) view.delegate.onTapCheckbox(view);
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * チェックボックスがタップされた時の挙動（インナー）
     * @protected
     */
    onTapCheckbox_: function () {}
});