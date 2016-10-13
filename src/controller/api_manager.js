/*!
 * @file        api_manager.js
 * @brief       APIマネージャー
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};
app.API = app.API || {};

/**
 * API送信
 * @param{string} $url
 * @param {*} $param
 * @param {function} $apiParser function(code, body, info, time)
 * @param {function=} $callback function(code, package)
 */
app.sendAPI = function ($url, $param, $apiParser, $callback) {
    var type = "POST";

    var url = app.API_URL+"/"+app.SERVER_NAME+"/"+app.FRONT_PHP+$url;
    var param = predator.createParamString($param);
    app.log("");
    app.log("--- API通信開始 ---");
    app.log("  URL: "+url);
    app.log("  Type: "+type);
    app.log("  Param: "+param);
    app.log("");

    if (app.isDebug) {
        type = "GET";
        if (!$param) $param = {};
        $param.opensocial_app_id = debug.opensocial_app_id;
        $param.opensocial_viewer_id = debug.opensocial_viewer_id;
        $param.oauth_nonce = debug.oauth_nonce;
    }

    predator.requestAPI(type, url, $param, function (error, obj) {
        var result;
        if (error) {
            app.log("--- 通信エラー ---");
            result = {
                code: 9999,
                body: null,
                info: ""+error.status+" "+error.errorMessage,
                time: Date.now()
            };
        } else if (!cc.isObject(obj) || cc.isUndefined(obj.result)) {
            app.log("--- 通信エラー ---");
            result = {
                code: 9998,
                body: null,
                info:"レスポンスデータが壊れています",
                time: Date.now()
            };
            app.log("  response: "+obj);
        } else {
            app.log("--- 受信完了 ---");
            result = obj.result;
        }
        app.log("  code: "+result.code);
        app.log("  body: "+result.body);
        app.log("  info: "+result.info);
        app.log("  time: "+result.time);
        app.log("");
        app.log("--- API通信終了 ---");
        app.log("");

        var body = {};
        if (result.code == 9998) {
            ora.postNotice("MessagePack Error", {code: result.code, info: result.info});
        } else if (result.code == 9999) {
            ora.postNotice("HTTP Response Error", {code: result.code, info: result.info});
        } else {
            var parser = (cc.isFunction($apiParser))? $apiParser: app.API.defaultParser;
            body = parser.call(result.code, result.body, result.info, result.time);
        }
        body.timestamp = result.time;

        if (cc.isFunction($callback)) $callback(result.code, body);
    }.bind(this), true);
};

app.API.defaultParser = function ($code, $body, $info, $time) {
    return ($code == 0)? $body: {};
};