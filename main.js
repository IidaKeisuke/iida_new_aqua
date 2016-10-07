if (typeof TEST_RUN == "undefined") {
    cc.game.onStart = function(){
        cc.log("Start " + app.NAME + " (" + app.VERSION + ") " +
            ((app.isDebug)?"DEBUG":"RELEASE") + "-MODE" + " Rendering:" +
            ((cc._renderType == cc.game.RENDER_TYPE_CANVAS)?"Canvas":"GL") +
            " FPS:" + cc.game.config[cc.game.CONFIG_KEY.frameRate]
        );

        // 画面サイズの設定
        cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);
        var size = cc.size(app.WIDTH,app.HEIGHT);
        self_screenmanager.setConfiguration(self_controller.ScreenMode.SIZE_PUBLIC,size);

        // デフォルトサイズの設定
        app.winPos.leftTop = cc.p(0,cc.winSize.height);
        app.winPos.leftMiddle = cc.p(0,cc.winSize.height/2);
        app.winPos.leftBottom = cc.p(0,0);
        app.winPos.centerTop = cc.p(cc.winSize.width/2,cc.winSize.height);
        app.winPos.centerMiddle = cc.p(cc.winSize.width/2,cc.winSize.height/2);
        app.winPos.centerBottom = cc.p(cc.winSize.width/2,0);
        app.winPos.rightTop = cc.p(cc.winSize.width,cc.winSize.height);
        app.winPos.rightMiddle = cc.p(cc.winSize.width,cc.winSize.height/2);
        app.winPos.rightBottom = cc.p(cc.winSize.width,0);
        app.winPos.center = app.winPos.centerMiddle;

        var entryPoint = "res/json/scene/boot_scene.json";
        cc.loader.load(entryPoint, function () {
            cc.director.runScene(new self_scenemanager.Entry(entryPoint));
        });
    };
    cc.game.run();
}