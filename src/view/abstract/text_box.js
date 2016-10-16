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
 * @abstract
 * @name app.TextBox
 * @extends predator.ViewTemplate
 */
app.TextBox = predator.ViewTemplate.extend(/** @lends app.TextBox# */{
    _className: "TextBox",

    _json: "blank.json",

    _text: "",
    _placeholder: "",

    /*
     *  制御処理
     */

    /**
     * 実行処理
     */
    execute: function () {

    },

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
     *  デリゲート処理
     */

    /**
     * テキストボックスがアクティブになった時の処理
     * @delegate didAttachTextbox
     */
    didAttachTextbox: function () {
        this.didAttachTextbox_();
        if (this.delegate && this.delegate.didAttachTextbox) this.delegate.didAttachTextbox(this);
    },

    /**
     * テキストボックスが非アクティブになった時の処理
     * @delegate didDetachTextbox
     */
    didDetachTextbox: function () {
        this.didDetachTextbox_();
        if (this.delegate && this.delegate.didDetachTextbox) this.delegate.didDetachTextbox(this);
    },

    /**
     * 値が変更された時の挙動
     * @delegate didChangeString
     */
    didChangeString: function () {
        this.didChangeString_();
        if (this.delegate && this.delegate.didChangeString) this.delegate.didChangeString(this);
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * テキストボックスがアクティブになった時の処理（インナー）
     * @protected
     */
    didAttachTextbox_: function () {},

    /**
     * テキストボックスが非アクティブになった時の処理（インナー）
     * @protected
     */
    didDetachTextbox_: function () {},

    /**
     * 値が変更された時の挙動（インナー）
     * @protected
     */
    didChangeString_: function () {}
});