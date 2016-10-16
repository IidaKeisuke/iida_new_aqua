/*!
 * @file        item_list.js
 * @brief       リストビュー
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * ItemListクラス
 * setData: {}
 * @class
 * @abstract
 * @name app.ItemList
 * @extends predator.ViewTemplate
 */
app.ItemList = predator.ViewTemplate.extend(/** @lends app.ItemList# */{
    _className: "ItemList",

    _json: "blank.json",

    _itemList: null,

    _itemWidth: 1,
    _itemHeight: 5,

    /*
     *  制御処理
     */

    /**
     * アイテムの追加
     * @param $item
     */
    addItem: function ($item) {
        $item.setTag(this._itemList.length);
        $item.retain();
        this._itemList.push($item);
    },

    /**
     * アイテムの削除
     * @param $index
     */
    removeItem: function ($index) {
        if (ora.checkArrayRange(this._itemList, $index)) return;
        this._itemList[$index].release();
        this._itemList.splice($index,1);
        this._updateItemTag();
    },

    /**
     * アイテムの全削除
     */
    removeAllItems: function () {
        for (var i = 0, len = array.length; i < len; i=(i+1)|0) {
            this._itemList[i].release();
        }
        this._itemList = [];
    },

    /*
     *  Getter / Setter
     */

    /**
     * 指定インデックスのアイテムの取得
     * @param $index
     * @returns {*}
     */
    getItem: function ($index) {
        if (ora.checkArrayRange(this._itemList, $index)) return null;
        return this._itemList[$index];
    },

    /**
     * アイテムのタグ更新
     * @private
     */
    _updateItemTag: function () {
        for (var i = 0, len = this._itemList.length; i < len; i=(i+1)|0) {
            var item = this._itemList[i];
            item.setTag(i);
        }
    },
    
    /*
     *  イベント処理
     */

    /**
     * リストアイテムをタップした時の挙動
     * @event TapItem
     * @param $obj
     */
    onTapItem: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.ItemList);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            var index = $obj.getTag();
            view.setCurrentIndex(index);
            view.onTapItem_(index);
            var callback = view.getEventCallback("TapItem");
            if (callback) callback.func.call(callback.target, view, index);
        }
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * リストアイテムをタップした時の挙動（インナー）
     * @protected
     */
    onTapItem_: function ($index) {}

});