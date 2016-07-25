// テストモード
var RUN_TEST = true;

// テストファイルの判別とパス造成
var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;
Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    }
});

// ブラウザの準備
/**
 * <canvas id="gameCanvas" width="480" height="720"></canvas>
 * <script src="frameworks/cocos2d-html5/CCBoot.js"></script>
 * <script cocos src="main.js"></script>
 **/
// キャンパスの生成
var canvas=document.createElement("canvas");
canvas.id = 'gameCanvas';
canvas.width = 160;
canvas.height = 240;
document.body.appendChild(canvas);

// Cocosの読み込み
var ccboot = document.createElement('script');
ccboot.src = 'frameworks/cocos2d-html5/CCBoot.js';
document.body.appendChild(ccboot);
ccboot.onload = function () {

  // テストユーティリティの読み込み
  // Cocosにはcocos属性を持つscriptタグを参照してproject.jsonのパスを生成している。その迂回としての処理も併せて行っている
  var testjs = document.createElement('script');
  testjs.src = 'dummy.js';
  testjs.setAttribute('cocos', '');
  document.body.appendChild(testjs);
  testjs.onload = function () {


    cc.game.onStart = function(){
    };

    cc.game.run(function () {
      // テスト用のゲームエンジン初期化コード記述


      // テストの読み込み設定
      require.config({
        baseUrl: '/base',
        deps: allTestFiles,
        callback: window.__karma__.start
      });
    });
  }
};
