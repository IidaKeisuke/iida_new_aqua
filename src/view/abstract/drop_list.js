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
 * @name app.DropList
 * @extends predator.ViewTemplate
 */
app.DropList = predator.ViewTemplate.extend(/** @lends app.DropList# */{
    _className: "DropList",

    _cellList: null,
    _currentIndex: 0,

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
     * セルの追加
     * @param $cell
     */
    addListCell: function ($cell) {
        $cell.setTag(this._cellList.length);
        $cell.retain();
        this._cellList.push($cell);
        this.didAddListCell(this);
    },

    /**
     * セルの削除
     * @param $index
     */
    removeListCells: function ($index) {
        if (ora.checkArrayRange(this._cellList, $index)) return;
        var cell = this._cellList[$index];
        cell.release();
        this._cellList.splice($index,1);
        this._updateListCellTag();
        this.didRemoveListCell(this, cell);
        if (this._cellList.length == 0) this.didClearCellList(this);
    },

    /**
     * セルの全削除
     */
    removeAllCell: function () {
        for (var i = 0, len = array.length; i < len; i=(i+1)|0) {
            this._cellList[i].release();
        }
        this._cellList = [];
        this.didClearCellList(this);
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
     *  イベント処理
     */

    /**
     * セルが追加された時の呼び出し
     * @param $obj
     */
    didAddListCell: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.DropList);
        if (!view || view.isLocked() || !view.isEnabled()) return;

        view.lock();
        view.didAddListCell_();
        if (view.delegate && view.delegate.didAddListCell) view.delegate.didAddListCell(view);
        view.unlock();
    },

    /**
     * セルが削除された時の呼び出し
     * @param $obj
     */
    didRemoveListCell: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.DropList);
        if (!view || view.isLocked() || !view.isEnabled()) return;

        view.lock();
        view.didRemoveListCell_();
        if (view.delegate && view.delegate.didRemoveListCell) view.delegate.didRemoveListCell(view);
        view.unlock();
    },

    /**
     * リストが空になった時の呼び出し
     * @param $obj
     */
    didClearCellList: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.DropList);
        if (!view || view.isLocked() || !view.isEnabled()) return;

        view.lock();
        view.didClearCellList_();
        if (view.delegate && view.delegate.didClearCellList) view.delegate.didClearCellList(view);
        view.unlock();
    },

    /**
     * リストパネルをタップした時の挙動
     * @param $obj
     */
    onTapListPanel: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.DropList);
        if (!view || view.isLocked() || !view.isEnabled()) return;

        view.lock();
        view.onTapListPanel_();
        if (view.delegate && view.delegate.onTapListPanel) view.delegate.onTapListPanel(view);
        view.unlock();
    },

    /**
     * リストセルをタップした時の挙動
     * @param $obj
     */
    onTapListCell: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.DropList);
        if (!view || view.isLocked() || !view.isEnabled()) return;

        view.lock();
        view.setCurrentIndex($obj.getTag());
        view.onTapListCell_();
        if (view.delegate && view.delegate.onTapListCell) view.delegate.onTapListCell(view);
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */
    
    /**
     * セルが追加された時の呼び出し（インナー）
     * @protected
     */
    didAddListCell_: function () {},

    /**
     * セルが削除された時の呼び出し（インナー）
     * @protected
     */
    didRemoveListCell_: function () {},

    /**
     * リストが空になった時の呼び出し（インナー）
     * @protected
     */
    didClearCellList_: function () {},
    
    /**
     * リストパネルをタップした時の挙動（インナー）
     * @protected
     */
    onTapListPanel_: function () {},

    /**
     * リストセルをタップした時の挙動（インナー）
     * @protected
     */
    onTapListCell_: function () {}

});