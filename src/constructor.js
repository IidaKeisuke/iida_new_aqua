/*!
 * @file        constructer.js
 * @brief       構造体定義
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * Function構造体
 * @param {Object} $target
 * @param {Function} $func
 * @param {Array=} $param
 * @constructor
 */
app.Function = function ($target, $func, $param) {
    this.target = $target;
    this.func = $func;
    this.param = $param || null;
};

/**
 * Function実行
 */
app.Function.prototype.execute = function () {
    if (!cc.isFunction(this.func) || !cc.isObject(this.target)) return;
    if (cc.isArray(this.param)) {
        this.func.apply(this.target, this.param);
    } else {
        this.func.call(this.target);
    }
};