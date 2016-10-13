/*!
 * @file        slider.js
 * @brief       スライダーUI
 * @date        2016/10/10
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * Sliderクラス
 * setData: {}
 * @class
 * @name app.Slider
 * @extends predator.ViewTemplate
 */
app.Slider = predator.ViewTemplate.extend(/** @lends app.Slider# */{
    _className: "Slider",

    _value: 0,

    /*
     *  Getter / Setter
     */

    /**
     * 値の設定
     * @param $value
     */
    setValue: function ($value) {
        this._value = ora.clamp($value,0,100);
        this.setDirty(true);
    },

    /**
     * 値の取得
     * @returns {number}
     */
    getValue: function () {
        return this._value;
    },

    /*
     *  イベント処理
     */

    /**
     * 値が変更された時の挙動
     * @param $obj
     */
    onChangeValue: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Slider);
        if (!view || view.isLocked()) return;

        view.lock();
        view.onChangeValue_();
        if (view.delegate && view.delegate.onChangeValue) view.delegate.onChangeValue(view);
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * 値が変更された時の挙動（インナー）
     * @protected
     */
    onChangeValue_: function () {}
});