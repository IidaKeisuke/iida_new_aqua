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

ora.model = ora.model || {};
ora.view = ora.view || {};
ora.ctrl = ora.ctrl || {};
ora.ui = ora.ui || {};

ora.lib = ora.lib || {};
ora.util = ora.util || {};

ora.scene = ora.scene || {};
ora.window = ora.window || {};

ora.shader = ora.shader || {};

/**
 * GETパラメータ（debug用）
 */
var $_GET = {};
