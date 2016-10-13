/*!
 * @file        global.js
 * @brief       共通設定
 *
 * @author      n.morita
 * @copyright   ORATTA.inc
 */

/**
 * グローバルオブジェクト
 */
var global = function () {
    return this;
}();

/**
 * ORATTA名前空間
 * @namespace
 * @name ora
 */
var ora = ora || {};

/**
 * GETパラメータ（debug用）
 */
var $_GET = {};

if (cc.sys.isNative) {
    var navigator = null;
    var location = null;
}

/**
 * debug専用function
 */
app.log = app.log || function () {};
app.warn = app.warn || function () {};
app.error = app.error || function () {};
app.assert = app.assert || function () {};
app.postMessageForSlack = app.postMessageForSlack || function () {};
app.postAPIErrorForSlack = app.postAPIErrorForSlack || function () {};