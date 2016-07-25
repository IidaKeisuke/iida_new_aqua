/*!
 * @file        native_binding.js
 * @brief       ネイティブコードとのバインド関数
 *
 * @author      n.morita
 * @copyright   ORATTA.inc
 */

// 名前空間
var native = native || {};

// 例）
// native.hoge = function () {};
// sample.native.hoge = function () { native.hoge(); };
//
// JSコード上からは sample.native.hoge() を呼ぶ
// native_bindingが有効の場合、ネイティブ側で記述した native.hoge コードが実行される。
// native_bindingが無効の場合、native.hoge = function () {}; が呼ばれる