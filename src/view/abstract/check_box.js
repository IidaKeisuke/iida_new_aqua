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
     * ボタンがタップされた時の挙動
     * @param $obj
     */
    onActive: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.CheckBox);
        if (!view || view.isLocked() || !view.isEnable()) return;

        view.lock();
        view.onChangeStatus_();
        if (view.delegate && view.delegate.onChangeStatus) view.delegate.onChangeStatus(view);
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * フラグが変更された時の挙動（インナー）
     * @protected
     */
    onChangeStatus_: function () {}
});