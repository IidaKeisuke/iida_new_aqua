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
 * @abstract
 * @name app.CheckBox
 * @extends predator.ViewTemplate
 */
app.CheckBox = predator.ViewTemplate.extend(/** @lends app.CheckBox# */{
    _className: "CheckBox",

    _json: "blank.json",

    /**
     * 実行処理
     */
    execute: function () {
        this.onTapCheckbox(this);
    },

    /*
     *  イベント処理
     */

    /**
     * チェックボックスがタップされた時の挙動
     * @event TapCheckbox
     * @param $obj
     */
    onTapCheckbox: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.CheckBox);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            view.toggle();
            view.onTapCheckbox_();
            var callback = view.getEventCallback("TapCheckbox");
            if (callback) callback.func.call(callback.target, view);
        }
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