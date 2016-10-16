/*!
 * @file        adventure.js
 * @brief       アドベンチャー制御
 * @date        2016/10/14
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * Adventureクラス
 * setData: {}
 * @class
 * @abstract
 * @name app.Adventure
 * @extends predator.ViewTemplate
 */
app.Adventure = predator.ViewTemplate.extend(/** @lends app.Adventure# */{
    _className: "Adventure",

    _json: "blank.json",

    _messageBox: null,
    _script: "",

    _messageWindow: "mess_window.json",
    _messageObject: "mess_object.json",
    _messageWindowAlias: "frm_message",
    _messageWindowPadding: {
        "x": 80,
        "y": 50
    },
    _messageLineSpace: 2,
    _messageAuto: false,
    _messageSpeed: 0.1,
    _pageFeedType: "CLEAR",
    _pageFeedSpeed: 0.2,
    _pageFeedArrowAlias: "spr_arrow",

    _onActionEnded: "app.Adventure.onActionEnded",
    _onInitializeEnded: "app.Adventure.onActionEnded",
    _onDisposeEnded: "app.Adventure.onActionEnded",
    _onTapMessageWindow: "app.Adventure.onTapMessageWindow",

    /**
     * 初期化処理
     * @param {Object|null} attr
     * @param {Object} model
     */
    initialize: function (attr, model) {
        this._super(attr, model);

        this._messageBox = new predator.MessageBox(
            {
                message:"",
                viewLayer: "ADV",
                messageWindow: this._messageWindow,
                messageObject: this._messageObject,
                messageWindowAlias: this._messageWindowAlias,
                messageWindowPadding: this._messageWindowPadding,
                messageLineSpace: this._messageLineSpace,
                messageAuto: this._messageAuto,
                messageSpeed: this._messageSpeed,
                pageFeedType: this._pageFeedType,
                pageFeedSpeed: this._pageFeedSpeed,
                pageFeedArrowAlias: this._pageFeedArrowAlias,
                onActionEnded: this._pageFeedArrowAlias,
                onInitializeEnded: this._pageFeedArrowAlias,
                onDisposeEnded: this._pageFeedArrowAlias,
                onTapMessageWindow: this._pageFeedArrowAlias
            }
        );

        if (this._queueRunScript) {
            this.runScript();
            delete this._queueRunScript;
        }
    },

    /**
     * 破棄処理
     */
    dispose: function () {
        this.exitScript();
        if (this._messageBox) this._messageBox.dispose();
        this._super();
    },

    /**
     * スクリプトの実行
     */
    runScript: function () {
        if (this._script == "") return;

        if (!this._messageBox) {
            this._queueRunScript = true;
            return;
        }

        this._isRunning = true;
        this._messageBox.setMessage(this._script);
    },

    /**
     * スクリプトの一時停止
     */
    pauseScript: function () {
        if (!this._messageBox || this._messageBox.isPause()) return;
        this._messageBox.pauseMessage();
    },

    /**
     * スクリプトの再開
     */
    resumeScript: function () {
        if (!this._messageBox || !this._messageBox.isPause()) return;
        this._messageBox.resumeMessage();
    },

    /**
     * スクリプトの停止
     */
    exitScript: function () {
        if (!this._messageBox) return;
        this._isRunning = false;
        this._script = "";
        this._messageBox.deleteMessage();
    },

    /*
     *  Getter / Setter
     */

    /**
     * スクリプトの設定
     * @param $script
     */
    setScript: function ($script) {
        this._script = $script;
    },

    /**
     * 実行中フラグの確認
     * @returns {boolean}
     */
    isRunning: function () {
        return this._isRunning;
    },

    /**
     * 自動メッセージ送りの設定
     * @param $flag
     */
    setMessageAuto: function ($flag) {
        this._messageBox.messageAuto = $flag;
    },

    /**
     * 自動メッセージ送りの取得
     * @returns {boolean|*}
     */
    getMessageAuto: function () {
        return this._messageBox.messageAuto;
    },

    /**
     * メッセージスキップの設定
     * @param $flag
     */
    setMessageSkip: function ($flag) {
        this._messageBox.messageSkip = $flag;
    },

    /**
     * メッセージスキップの取得
     * @returns {boolean|*}
     */
    getMessageSkip: function () {
        return this._messageBox.messageSkip;
    },

    /**
     * メッセージログの取得
     * @returns {*|String}
     */
    getMessageLog: function () {
        return this._messageBox.getMessage();
    },

    /**
     * メッセージログの行数取得
     * @returns {*}
     */
    getMessageLineCount: function () {
        return this._messageBox.getMessageLineCount();
    },

    /**
     * ページ送り待ちフラグの確認
     * @returns {*}
     */
    isPageFeedWait: function () {
        return this._messageBox.isPageFeedWait();
    },

    /**
     * ページ送り領域の設定
     * @param x
     * @param y
     * @param width
     * @param height
     */
    setPageFeed: function (x,y,width,height) {
        this._messageBox.setPageFeed(x,y,width,height);
    },

    /*
     *  イベント処理
     */

    /**
     * メッセージウィンドウをタップした時の処理
     * @event TapMessageWindow
     * @param $obj
     */
    onTapMessageWindow: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Adventure);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            view.onTapMessageWindow_();
            var callback = view.getEventCallback("TapMessageWindow");
            if (callback) callback.func.call(callback.target, view);
        }
        view.unlock();
    },

    /**
     * コマンド行動終了時の処理
     * @event ActionEnded
     * @param $obj
     */
    onActionEnded: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Adventure);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            view.onActionEnded_();
            var callback = view.getEventCallback("ActionEnded");
            if (callback) callback.func.call(callback.target, view);
        }
        view.unlock();
    },

    /**
     * スキップボタンタップ時の処理
     * @event TapSkipButton
     * @param $obj
     */
    onTapSkipButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Adventure);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            view.setMessageSkip(!view.getMessageSkip());
            view.onTapSkipButton_();
            var callback = view.getEventCallback("TapSkipButton");
            if (callback) callback.func.call(callback.target, view);
        }
        view.unlock();
    },

    /**
     * オートボタンタップ時の処理
     * @event TapAutoButton
     * @param $obj
     */
    onTapAutoButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Adventure);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            view.setMessageAuto(!view.getMessageAuto());
            view.onTapAutoButton_();
            var callback = view.getEventCallback("TapAutoButton");
            if (callback) callback.func.call(callback.target, view);
        }
        view.unlock();
    },

    /**
     * ログボタンタップ時の処理
     * @event TapLogButton
     * @param $obj
     */
    onTapLogButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Adventure);
        if (!view || !view.checkEventCondition({locked:false, enabled:true, visible:true})) return;

        view.lock();
        {
            var line = view.getMessageLineCount();
            var message = view.getMessageLog();
            view.onTapLogButton_(line,message);
            var callback = view.getEventCallback("TapLogButton");
            if (callback) callback.func.call(callback.target, view, line, message);
        }
        view.unlock();
    },

    /*
     *  オーバーライド用関数
     */

    /**
     * メッセージウィンドウをタップした時の処理
     * @protected
     */
    onTapMessageWindow_: function () {},

    /**
     * コマンド行動終了時の処理
     * @protected
     */
    onActionEnded_: function () {},

    /**
     * スキップボタンタップ時の処理
     * @protected
     */
    onTapSkipButton_: function () {},

    /**
     * オートボタンタップ時の処理
     * @protected
     */
    onTapAutoButton_: function () {},

    /**
     * ログボタンタップ時の処理
     * @protected
     */
    onTapLogButton_: function ($lineCount, $messageArray) {}
});