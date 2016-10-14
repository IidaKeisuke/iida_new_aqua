/*!
 * @file        pager.js
 * @brief       ページャー
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * Pagerクラス
 * setData: {}
 * @class
 * @name app.Pager
 * @extends predator.ViewTemplate
 */
app.Pager = predator.ViewTemplate.extend(/** @lends app.Pager# */{
    _className: "Pager",

    _currentIndex: 1,
    _maxIndex: 1,

    /*
     *  制御処理
     */

    /**
     * 前へ
     */
    prev: function () {
        this.setCurrentIndex(this._currentIndex-1);
    },

    /**
     * 次へ
     */
    next: function () {
        this.setCurrentIndex(this._currentIndex+1);
    },

    /*
     *  Getter / Setter
     */

    /**
     * 最大値の設定
     * @param $value
     */
    setMaxIndex: function ($value) {
        this._maxIndex = $value;
        this._currentIndex = ora.clamp(this._currentIndex,0,this._maxIndex);
        this.setDirty(true);
    },

    /**
     * 最大値の取得
     * @returns {number}
     */
    getMaxIndex: function () {
        return this._maxIndex;
    },

    /**
     * 現在値の設定
     * @param $value
     */
    setCurrentIndex: function ($value) {
        if (this._currentIndex == $value) return;

        this._currentIndex = ora.clamp($value,0,this._maxIndex);
        this.setDirty(true);
        this.onChangeIndex(this);
    },

    /**
     * 現在値の取得
     * @returns {number}
     */
    getCurrentIndex: function () {
        return this._currentIndex;
    },

    /*
     *  イベント処理
     */

    /**
     * 現在値が変更された時の挙動
     * @param $obj
     */
    onChangeIndex: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.CountUp);
        if (!view || view.isLocked()) return;

        view.lock();
        view.onChangeIndex_();
        if (view.delegate && view.delegate.onChangeIndex) view.delegate.onChangeIndex(view);
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * 現在値が変更された時の挙動（インナー）
     * @protected
     */
    onChangeIndex_: function () {}

});