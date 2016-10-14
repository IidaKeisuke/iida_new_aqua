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
                onActionEnded: "app.AdventurePanel.onActionEnded",
                onInitializeEnded: "app.AdventurePanel.onActionEnded",
                onDisposeEnded: "app.AdventurePanel.onActionEnded",
                onTapMessageWindow: "app.AdventurePanel.onTapMessageWindow"
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

    setScript: function ($script) {
        this._script = $script;
    },

    isRunning: function () {
        return this._isRunning;
    },

    runScript: function () {
        if (this._script == "") return;

        if (!this._messageBox) {
            this._queueRunScript = true;
            return;
        }

        this._isRunning = true;
        this._messageBox.setMessage(this._script);
    },

    pauseScript: function () {
        if (!this._messageBox || this._messageBox.isPause()) return;
        this._messageBox.pauseMessage();
    },

    resumeScript: function () {
        if (!this._messageBox || !this._messageBox.isPause()) return;
        this._messageBox.resumeMessage();
    },

    exitScript: function () {
        if (!this._messageBox) return;
        this._isRunning = false;
        this._script = "";
        this._messageBox.deleteMessage();
    },

    setPageFeed: function (x,y,width,height) {
        this._messageBox.setPageFeed(x,y,width,height);
    },

    onTapMessageWindow: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Adventure);
        if (!view || view.isLocked() || !view.isEnable()) return;

        view.lock();
        view.onTapMessageWindow_();
        if (view.delegate && view.delegate.onTapMessageWindow) view.delegate.onTapMessageWindow(view);
        view.unlock();
    },

    onActionEnded: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Adventure);
        if (!view || view.isLocked() || !view.isEnable()) return;

        view.lock();
        view.onActionEnded_();
        if (view.delegate && view.delegate.onActionEnded) view.delegate.onActionEnded(view);
        view.unlock();
    },

    onTapSkipButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Adventure);
        if (!view || view.isLocked() || !view.isEnable()) return;

        view.lock();
        view.onTapSkipButton_();
        if (view.delegate && view.delegate.onTapSkipButton) view.delegate.onTapSkipButton(view);
        view.unlock();
    },

    onTapAutoButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Adventure);
        if (!view || view.isLocked() || !view.isEnable()) return;

        view.lock();
        view.onTapAutoButton_();
        if (view.delegate && view.delegate.onTapAutoButton) view.delegate.onTapAutoButton(view);
        view.unlock();
    },

    onTapLogButton: function ($obj) {
        var view = predator.getViewObjectByNode($obj, app.Adventure);
        if (!view || view.isLocked() || !view.isEnable()) return;

        view.lock();
        view.onTapLogButton_();
        if (view.delegate && view.delegate.onTapLogButton) view.delegate.onTapLogButton(view);
        view.unlock();
    },

    onTapMessageWindow_: function () {},
    onActionEnded_: function () {},
    onTapSkipButton_: function () {},
    onTapAutoButton_: function () {},
    onTapLogButton_: function () {}
});