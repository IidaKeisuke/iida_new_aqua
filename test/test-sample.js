describe('対象：cc.Node', function() {
    // テストが始まる前の処理
    before(function(done) {
        done();
    });

    // テストが終わった後の処理
    after(function(done) {
        done();
    });

    // 各項目ごとの開始処理
    beforeEach(function(done) {
        done();
    });

    // 各項目ごとの終了処理
    afterEach(function(done) {
        done();
    });

    it('Class load check', function() {
        assert.isDefined(cc.Node, "cc.Nodeは定義されていません。");
    });

    it('Create instance', function() {
        var demo = new cc.Node();
        assert.isNotNull(demo, "cc.Nodeのインスタンス生成に失敗しました");
        demo.setPosition(cc.p(10,20));
        assert.equal(demo.getPositionX(), 10, "X座標が一致しません");
        assert.equal(demo.getPositionY(), 20, "Y座標が一致しません");
    });
});
