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
 * @name app.RadioBox
 * @extends predator.ViewTemplate
 */
app.RadioBox = predator.ViewTemplate.extend(/** @lends app.RadioBox# */{
    _className: "RadioBox",

    /*
     *  イベント処理
     */

    /**
     * ボタンがタップされた時の挙動
     * @param $obj
     */
    onTapRadioBox: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.CheckBox);
        if (!view || view.isLocked() || !view.isEnabled()) return;

        view.lock();
        view.toggle();
        view.onTapRadioBox_();
        if (view.delegate && view.delegate.onTapRadioBox) view.delegate.onTapRadioBox(view);
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * フラグが変更された時の挙動（インナー）
     * @protected
     */
    onTapRadioBox_: function () {}

});