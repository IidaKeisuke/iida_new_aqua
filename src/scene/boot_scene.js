/*!
 * @file        boot_scene.js
 * @brief       起動画面
 * @date        2016/07/13
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * BootSceneクラス
 * @class
 * @name app.BootScene
 * @extends app.Scene
 */
app.BootScene = app.Scene.extend(/** @lends app.BootScene# */{
    _className: "BootScene",
    
    // コンストラクター
    ctor: function (attr) {
        if(!this._super(attr)) return false;

        return true;
    },
    
    // 初期化処理
    initialize: function () {
        if (!this._super()) return false;
        cc.log("BootSceneの初期化");

        var k = Date.now();

        return true;
    },

    // デストラクター
    dispose: function () {
        cc.log("BootSceneの破棄");
        this._super();
    },

    // ゲームループ
    update: function (delta) {
        try {
            if (!this._super(delta)) return;
        } catch (e) {
            cc.warn("exception(BootScene.update):" + e);
        }
    },

});