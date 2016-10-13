/*!
 * @file        config.js
 * @brief       アプリ別設定
 *
 * @author      n.morita
 * @copyright   ORATTA.inc
 */

/**
 * アプリケーション用名前空間
 * @namespace
 * @name app
 */
var app = app || {};

/**
 * アプリ設定
 */
app.NAME        = "AppTemplate";
app.BUNDLE_ID   = "net.oratta.AppTemplate";
app.APP_ID      = "0";

app.BUILD_NO    = "0.0.0.0";
app.VERSION     = "0.0";

app.WIDTH       = 1136;
app.HEIGHT      = 640;

app.isDebug     = true;

app.API_URL     = "https://tech.oratta.net/hoge";
app.SERVER_NAME = "develop";
app.FRONT_PHP   = "dmm_pc_dev.php";

app.defaultFont     = "Arial";
app.defaultFontSize = 20;
