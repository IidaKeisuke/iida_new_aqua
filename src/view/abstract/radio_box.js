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

    _flag: false,

    /*
     *  イベント処理
     */

    /**
     * ボタンがタップされた時の挙動
     * @param $obj
     */
    onChangeFlag: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.CheckBox);
        if (!view || view.isLocked() || !view.isEnable()) return;

        view.lock();
        view.onChangeFlag_();
        if (view.delegate && view.delegate.onChangeFlag) view.delegate.onChangeFlag(view);
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * フラグが変更された時の挙動（インナー）
     * @protected
     */
    onChangeFlag_: function () {}
});