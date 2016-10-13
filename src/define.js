/*!
 * @file        define.js
 * @brief       定数・定義
 *
 * @author      n.morita
 * @copyright   ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * ウィンドウ位置
 */
app.winPos = {};

app.initWinPos = function () {
    app.winPos.leftTop = cc.p(0,cc.winSize.height);
    app.winPos.leftMiddle = cc.p(0,cc.winSize.height/2);
    app.winPos.leftBottom = cc.p(0,0);
    app.winPos.centerTop = cc.p(cc.winSize.width/2,cc.winSize.height);
    app.winPos.centerMiddle = cc.p(cc.winSize.width/2,cc.winSize.height/2);
    app.winPos.centerBottom = cc.p(cc.winSize.width/2,0);
    app.winPos.rightTop = cc.p(cc.winSize.width,cc.winSize.height);
    app.winPos.rightMiddle = cc.p(cc.winSize.width,cc.winSize.height/2);
    app.winPos.rightBottom = cc.p(cc.winSize.width,0);
    app.winPos.center = app.winPos.centerMiddle;
};

/**
 * タグ一覧
 */
app.TAG = {
    DEFAULT: 0,
    ANIMATION: 1
};

/**
 * Zオーダー一覧
 */
app.ZORDER = {
    DEFAULT: 0,

    MIN: -100,
    MAX: 100,

    PANEL: 50,
    KILL: 999,
    DIALOG: 1000
};

app.LAYER_ORDER = {
    PANEL: 21,
    ADV: 22
};

app.PlayerData = function () {
    this.id = 0;
    this.name = "";
};