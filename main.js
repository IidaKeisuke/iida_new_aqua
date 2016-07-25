if (typeof TEST_RUN == "undefined") {
    cc.game.onStart = function(){
        cc.log("Start " + app.NAME + " (" + app.VERSION + ") " +
            ((app.isDebug)?"DEBUG":"RELEASE") + "-MODE" + " Rendering:" +
            ((cc._renderType == cc.game.RENDER_TYPE_CANVAS)?"Canvas":"GL") +
            " FPS:" + cc.game.config[cc.game.CONFIG_KEY.frameRate]
        );

        cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);
        var size = cc.size(app.WIDTH,app.HEIGHT);
        self_screenmanager.setConfiguration(self_controller.ScreenMode.SIZE_PUBLIC,size);

        cc.director.runScene(new self_scenemanager.Entry("res/json/scene/boot_scene.json"));
    };
    cc.game.run();
}