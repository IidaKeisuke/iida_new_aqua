/*!
 * @file        debug.js
 * @brief       デバッグ
 *
 * @author      n.morita
 * @copyright   ORATTA.inc
 */

var debug = debug || {};

debug.opensocial_app_id = app.APP_ID;
debug.opensocial_viewer_id = 1;
debug.oauth_nonce = "debug";

debug.slack_url = "https://hooks.slack.com/services/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";

app.initDebugSetting = function () {
    if (cc.sys.isNative) return;

    $_GET = function ($get) {
        var result = {};
        if ($get !== undefined) {
            for (var i = 0, length = $get.length; i < length; i++) {
                var param = $get[i].split('=');
                switch (param.length) {
                    case 1:
                        if (param[0] !== '') {
                            result[param[0]] = true;
                        }
                        break;
                    case 2:
                        result[param[0]] = param[1];
                        break;
                    default:
                        console.log('不正なパラメータ：' + param);
                        break;
                }
            }
        }
        return result;
    }(location.search.replace(/^\?(.*)$/, '$1').split('&'));
};

app.logList = [];

app.log = function ($message) {
    var time = ora.formatDate(new Date());
    var message = time+" "+ora.getClassName(app.log.caller)
    cc.log($message);
};

app.warn = function ($message) {
    cc.warn($message);
};

app.error = function ($message) {
    cc.error($message);
};

app.assert = function ($message) {
    cc.assert($message);
};

app.postMessageForSlack = function ($playerId, $log, $title, $message) {
    var obj = {
        "username": app.NAME,
        "attachments": [
            {
                "color": "good",
                "pretext": $log,
                "author_name": "Player ID: "+$playerId,
                "fields": [
                    {
                        "title": $title,
                        "value": $message,
                        "short": true
                    }
                ],
                "footer": "ORATTA Predator",
                "footer_icon": "http://www.oratta.net/wp-content/themes/oratta/img/products/favicon.ico",
                "ts": parseInt(Date.now()/1000)
            }
        ]
    };

    predator.requestAPI("POST",debug.slack_url, {payload:JSON.stringify(obj)});
};

app.postAPIErrorForSlack = function ($playerId, $url, $api, $param, $code, $response) {
    var obj = {
        "username": app.NAME,
        "attachments": [
            {
                "color": "danger",
                "pretext": "API通信時にエラーが発生しました",
                "author_name": "Player ID: "+$playerId,
                "title": "APIリンク",
                "title_link": $url+"&outputJSONP=1",
                "text": "",
                "fields": [
                    {
                        "title": "API",
                        "value": $api,
                        "short": true
                    },
                    {
                        "title": "Param",
                        "value": $param,
                        "short": true
                    },
                    {
                        "title": "code",
                        "value": ($response && $response.code) || 9999,
                        "short": false
                    },
                    {
                        "title": "Response",
                        "value": JSON.stringify($response),
                        "short": false
                    }
                ],
                "footer": "ORATTA Predator",
                "footer_icon": "http://www.oratta.net/wp-content/themes/oratta/img/products/favicon.ico",
                "ts": parseInt(Date.now()/1000)
            }
        ]
    };

    predator.requestAPI("POST",debug.slack_url, {payload:JSON.stringify(obj)});
};