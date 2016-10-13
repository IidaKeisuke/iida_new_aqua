if (typeof TEST_RUN == "undefined") {
    cc.game.onStart = function(){
        // 起動ログ
        cc.log("Start " + app.NAME + " (" + app.VERSION + ") " +
            ((app.isDebug)?"DEBUG":"RELEASE") + "-MODE" + " Rendering:" +
            ((cc._renderType == cc.game.RENDER_TYPE_CANVAS)?"Canvas":"GL") +
            " FPS:" + cc.game.config[cc.game.CONFIG_KEY.frameRate]
        );

        // デバッグの初期化
        if (app.isDebug && app.initDebugSetting) app.initDebugSetting();

        // 画面サイズの設定
        cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);
        var size = cc.size(app.WIDTH,app.HEIGHT);
        predator.ScreenManager.setConfiguration(predator.ScreenMode.SIZE_PUBLIC,size);

        // デフォルトサイズの設定
        app.initWinPos();

        // デフォルトシーンの呼び出し
        var entryPoint = "res/json/scene/boot_scene.json";
        cc.loader.load(entryPoint, function () {
            cc.director.runScene(new predator.SceneManager.Entry(entryPoint));
        });
    };

    cc.game.run();
}