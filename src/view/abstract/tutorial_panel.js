/*!
 * @file        tutorial_panel.js
 * @brief       チュートリアルパネル
 * @date        2016/10/13
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * TutorialPanelクラス
 * setData: {}
 * @class
 * @name app.TutorialPanel
 * @extends predator.ViewTemplate
 */
app.TutorialPanel = predator.ViewTemplate.extend(/** @lends app.TutorialPanel# */{
    _className: "TutorialPanel",

    _json: "blank.json",

    _messageBox: null,
    _isRunning: false,

    /**
     * 初期化処理
     * @param {Object|null} attr
     * @param {Object} model
     */
    initialize: function (attr, model) {
        this._super(attr, model);

        this.messageBoxObject = new predator.MessageBox(
            {
                message:"",
                viewLayer: "ADV",
                messageWindow: "mess_window.json",
                messageObject: "mess_object.json",
                messageWindowAlias: "frm_message",
                messageWindowPadding: {
                    "x": 80,
                    "y": 50
                },
                messageLineSpace: 2,
                messageAuto: false,
                messageSpeed: 0.1,
                pageFeedType: "CLEAR",
                pageFeedSpeed: 0.2,
                pageFeedArrowAlias: "spr_arrow",
                onActionEnded: "aqua.AdventurePanel.onActionEnded",
                onInitializeEnded: "aqua.AdventurePanel.onActionEnded",
                onDisposeEnded: "aqua.AdventurePanel.onActionEnded",
                onTapMessageWindow: "aqua.AdventurePanel.onTapMessageWindow"
            }
        );
    },

    /**
     * 破棄処理
     */
    dispose: function () {

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
        this._isRunning = true;
        this._messageBox.setMessage(this._script);
    },

    pauseScript: function () {
        if (this._messageBox.isPause()) return;
        this._messageBox.pauseMessage();
    },

    resumeScript: function () {
        if (!this._messageBox.isPause()) return;
        this._messageBox.resumeMessage();
    },

    exitScript: function () {
        this._isRunning = false;
        this._script = "";
        this._messageBox.deleteMessage();
    },

    setPageFeed: function (x,y,width,height) {
        this._messageBox.setPageFeed(x,y,width,height);
    }
});

/**
 * TutorialPanelの生成
 * @returns {*}
 */
app.createTutorialPanel = function ($script) {
    var view = new app.TutorialPanel();
    view.setMessage($script);
    return view;
};