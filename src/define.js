/*!
 * @file        define.js
 * @brief       定数・定義
 *
 * @author      n.morita
 * @copyright   ORATTA.inc
 */
var app = app || {};

/* 画面位置のテンプレ */
app.winPos = {};
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


/* タグ・リスト */
app.TAG = {
    DEFAULT: 0,
    ANIMATION: 1
};

/* ヒエラルキー・リスト */
app.ZORDER = {
    DEFAULT: 0,
    MIN: -100,
    MAX: 100
};