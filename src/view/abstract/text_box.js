/*!
 * @file        textbox.js
 * @brief       テキストボックス
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * Textboxクラス
 * setData: {}
 * @class
 * @name app.TextBox
 * @extends predator.ViewTemplate
 */
app.TextBox = predator.ViewTemplate.extend(/** @lends app.TextBox# */{
    _className: "TextBox",

    _text: "",
    _placeholder: "",

    /*
     *  Getter / Setter
     */

    /**
     * 文字列の設定
     * @param $text
     */
    setString: function ($text) {
        this._text = $text;

        this.didChangeString(this);
    },

    /**
     * 文字列の取得
     * @returns {string}
     */
    getString: function () {
        return this._text;
    },

    /**
     * 初期表示文字列の設定
     * @param $placeholder
     */
    setPlaceholder: function ($placeholder) {
        this._placeholder = $placeholder;
    },

    /**
     * 初期表示文字列の取得
     * @returns {string}
     */
    getPlaceholder: function () {
        return this._placeholder;
    },

    /*
     *  イベント処理
     */

    /**
     * テキストボックスがアクティブになった時の処理
     * @param $obj
     */
    onAttachTextbox: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.TextBox);
        if (!view || view.isLocked() || view.isEnabled()) return;

        view.lock();
        view.onAttachTextbox_();
        if (view.delegate && view.delegate.onAttachTextbox) view.delegate.onAttachTextbox(view);
        view.unlock();
    },

    /**
     * テキストボックスが非アクティブになった時の処理
     * @param $obj
     */
    onDetachTextbox: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.TextBox);
        if (!view || view.isLocked() || view.isEnabled()) return;

        view.lock();
        view.onDetachTextbox_();
        if (view.delegate && view.delegate.onDetachTextbox) view.delegate.onDetachTextbox(view);
        view.unlock();
    },

    /**
     * 値が変更された時の挙動
     * @param $obj
     */
    didChangeString: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.TextBox);
        if (!view || view.isLocked() || view.isEnabled()) return;

        view.lock();
        view.didChangeString_();
        if (view.delegate && view.delegate.didChangeString) view.delegate.didChangeString(view);
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * テキストボックスがアクティブになった時の処理（インナー）
     * @protected
     */
    onAttachTextbox_: function () {},

    /**
     * テキストボックスが非アクティブになった時の処理（インナー）
     * @protected
     */
    onDetachTextbox_: function () {},

    /**
     * 値が変更された時の挙動（インナー）
     * @protected
     */
    didChangeString_: function () {}
});