/*!
 * @file        debug.js
 * @brief       デバッグ
 *
 * @author      n.morita
 * @copyright   ORATTA.inc
 */
if (!cc.sys.isNative && app.isDebug) {
    // GETパラメータの格納
    if (app.isDebug) {
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
    }
}