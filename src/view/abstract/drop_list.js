/*!
 * @file        drop_list.js
 * @brief       ドロップリスト
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * DropListクラス
 * setData: {}
 * @class
 * @abstract
 * @name app.DropList
 * @extends predator.ViewTemplate
 */
app.DropList = predator.ViewTemplate.extend(/** @lends app.DropList# */{
    _className: "DropList",

    _json: "blank.json",

    _cellList: null,
    _currentIndex: 0,

    _isOpenList: false,

    /**
     * 初期化処理
     * @param attr
     */
    ctor: function (attr) {
        this._super(attr);
        this._cellList = [];
    },

    /*
     *  制御処理
     */

    /**
     * 実行処理
     */
    execute: function () {
        this.onTapListPanel(this);
    },

    /**
     * セルの追加
     * @param $cell
     */
    addListCell: function ($cell) {
        $cell.setTag(this._cellList.length);
        $cell.retain();
        this._cellList.push($cell);
        this.didAddListCell($cell);
    },

    /**
     * セルの削除
     * @param $index
     */
    removeListCell: function ($index) {
        if (ora.checkArrayRange(this._cellList, $index)) return;
        var cell = this._cellList[$index];
        cell.release();
        this._cellList.splice($index,1);
        this._updateListCellTag();
        this.didRemoveListCell(cell);
        if (this._cellList.length == 0) this.didClearCellList();
    },

    /**
     * セルの全削除
     */
    removeAllCells: function () {
        for (var i = 0, len = array.length; i < len; i=(i+1)|0) {
            this._cellList[i].release();
        }
        this._cellList = [];
        this.didClearCellList();
    },

    openList: function () {
        if (this._isOpenList) return;
        this._isOpenList = true;

        this.didOpenList();
    },

    closeList: function () {
        if (!this._isOpenList) return;
        this._isOpenList = false;

        this.didCloseList();
    },

    toggleListVisible: function () {
        if (this._isOpenList) {
            this.closeList();
        } else {
            this.openList();
        }
    },

    /*
     *  Getter / Setter
     */

    /**
     * 指定インデックスのセルの取得
     * @param $index
     * @returns {*}
     */
    getListCell: function ($index) {
        if (ora.checkArrayRange(this._cellList, $index)) return null;
        return this._cellList[$index];
    },

    /**
     * セルのタグ更新
     * @private
     */
    _updateListCellTag: function () {
        for (var i = 0, len = this._cellList.length; i < len; i=(i+1)|0) {
            var cell = this._cellList[i];
            cell.setTag(i);
        }
    },

    /**
     * 選択中のセルを取得
     * @returns {*}
     */
    getCurrentListCell: function () {
        return this.getListCell(this._currentIndex);
    },

    /**
     * 選択中のセルのインデックスを設定
     * @param $index
     */
    setCurrentIndex: function ($index) {
        this._currentIndex = $index;
    },

    /**
     * 選択中のセルのインデックスを取得
     */
    getCurrentInder: function () {
        return this._currentIndex;
    },

    /*
     *  デリゲート処理
     */

    /**
     * セルが追加された時の呼び出し
     * @delegate didAddListCell
     */
    didAddListCell: function ($cell) {
        this.didAddListCell_($cell);
        if (this.delegate && this.delegate.didAddListCell) this.delegate.didAddListCell(this, $cell);
    },

    /**
     * セルが削除された時の呼び出し
     * @delegate didRemoveListCell
     */
    didRemoveListCell: function ($cell) {
        this.didRemoveListCell_($cell);
        if (this.delegate && this.delegate.didRemoveListCell) this.delegate.didRemoveListCell(this, $cell);
    },

    /**
     * リストが空になった時の呼び出し
     * @delegate didClearCellList
     */
    didClearCellList: function () {
        this.didClearCellList_();
        if (this.delegate && this.delegate.didClearCellList) this.delegate.didClearCellList(this);
    },

    /**
     * リスト項目を開いた時の呼び出し
     * @delegate didOpenList
     */
    didOpenList: function () {
        this.didOpenList_();
        if (this.delegate && this.delegate.didOpenList) this.delegate.didOpenList(this);
    },

    /**
     * リスト項目を閉じた時の呼び出し
     * @delegate didCloseList
     */
    didCloseList: function () {
        this.didCloseList_();
        if (this.delegate && this.delegate.didCloseList) this.delegate.didCloseList(this);
    },

    /*
     *  イベント処理
     */

    /**
     * リストパネルをタップした時の挙動
     * @event TapListPanel
     * @param $obj
     */
    onTapListPanel: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.DropList);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            view.toggleListVisible();
            view.onTapListPanel_();
            var callback = view.getEventCallback("TapListPanel");
            if (callback) callback.func.call(callback.target, view);
        }
        view.unlock();
    },

    /**
     * リストセルをタップした時の挙動
     * @event TapListCell
     * @param $obj
     */
    onTapListCell: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.DropList);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            var index = $obj.getTag();
            view.setCurrentIndex(index);
            view.onTapListCell_(index);
            var callback = view.getEventCallback("TapListCell");
            if (callback) callback.func.call(callback.target, view, index);
        }
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */
    
    /**
     * セルが追加された時の呼び出し（インナー）
     * @protected
     */
    didAddListCell_: function ($cell) {},

    /**
     * セルが削除された時の呼び出し（インナー）
     * @protected
     */
    didRemoveListCell_: function ($cell) {},

    /**
     * リストが空になった時の呼び出し（インナー）
     * @protected
     */
    didClearCellList_: function () {},

    /**
     * リスト項目を開いた時の呼び出し
     * @protected
     */
    didOpenList_: function () {},

    /**
     * リスト項目を閉じた時の呼び出し
     * @protected
     */
    didCloseList_: function () {},

    /**
     * リストパネルをタップした時の挙動（インナー）
     * @protected
     */
    onTapListPanel_: function () {},

    /**
     * リストセルをタップした時の挙動（インナー）
     * @param {Number} $index
     * @protected
     */
    onTapListCell_: function ($index) {}

});