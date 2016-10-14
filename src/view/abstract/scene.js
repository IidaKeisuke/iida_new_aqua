/*!
 * @file        scene.js
 * @brief       シーン
 * @date        2016/10/10
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * Sceneクラス
 * @class
 * @name app.Scene
 * @extends predator.SceneTemplate
 */
app.Scene = predator.SceneTemplate.extend(/** @lends app.Scene# */{
    _className: "Scene",

    _phase: 0,

    _lock: 0,
    _adv: null,

    _panel: null,

    _selectedView: null,
    _view: null,

    /**
     * コンストラクター
     * @param {*} attr
     */
    ctor: function (attr) {
        if (!this._super(attr)) return false;

        this._panel = [];

        return true;
    },

    /**
     * 初期化処理
     */
    initialize: function () {
        if (!this._super()) return false;
        if (this._isAlreadyDispose) return false;
        cc.log("Sceneの初期化");

        predator.addViewLayer("PANEL", app.LAYER_ORDER["PANEL"]);
        predator.addViewLayer("ADV", app.LAYER_ORDER["ADV"]);

        if (app.isDebug) {
            var sceneNameLabel = new cc.LabelTTF(this._className, "Arial", 30,cc.size(0,0),cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            predator.registerNode(sceneNameLabel,"DEVELOP_UI");
            sceneNameLabel.setFontFillColor(cc.color(0xC0,0xC0,0xC0));
            sceneNameLabel.setOpacity(0x80);
            sceneNameLabel.setPosition(app.winPos.centerTop.x,app.winPos.centerTop.y-30);
        }

        return true;
    },

    /**
     * 破棄処理
     */
    dispose: function () {
        cc.log("Sceneの破棄");

        this._isAlreadyDispose = true;

        this.endScenario();
        this.removeAllPanel();

        predator.removeViewLayer("PANEL");
        predator.removeViewLayer("ADV");

        this._super();
    },

    /**
     * 更新処理
     * @param delta
     */
    update: function (delta) {
        try {
            if (!this._super(delta)) return;
        } catch (e) {
            cc.warn("exception(Scene.update):" + e);
        }
    },

    /**
     * ロック処理
     */
    lock: function () {
        this._lock ++;
    },

    /**
     * アンロック処理
     */
    unlock: function () {
        this._lock --;
        if (this._lock < 0) this._lock = 0;
    },

    /**
     * ロック状態の取得
     * @returns {boolean}
     */
    isLocked: function () {
        return (this._lock > 0);
    },

    /**
     * 強制タッチ有効/無効
     * @param $flag
     */
    setTouchEnabled: function ($flag) {
        if (this._touchFlag == $flag) return;

        var flag = $flag;
        this._touchFlag = flag;

        var root = predator.getCurrentScene();

        ora.executeFunctionForAllChildren(root, function (node) {
            if (flag) {
                if (node.kill) {
                    node.kill = false;
                    predator.resumeTouchEvent(node);
                }
            } else {
                if (predator.isTouchEnabled(node)) {
                    node.kill = true;
                    predator.stopTouchEvent(node);
                }
            }
        });
    },

    /**
     * スナップショット
     */
    snapshot: function () {
        var render = new cc.RenderTexture(app.WIDTH, app.HEIGHT);
        var layer = predator.getRootLayer();
        render.beginWithClear(0,0,0);
        layer.visit();
        render.end();
        return render.getSprite();
    },

    /**
     * パネルタグの使用状態判定
     * @param $tag
     * @returns {*}
     */
    existPanelTag: function ($tag) {
        for (var i = 0, len = this._panel.length; i < len; i=(i+1)|0) {
            var panel = this._panel[i];
            var tag = panel.getTag();
            if ($tag == tag) return panel;
        }
        return null;
    },

    /**
     * パネルの追加
     * @param {number} $tag タグ
     * @param {function} $class
     * @param {object} $data
     * @param {function=} $appearCallback
     * @param {cc.Point=} $pos
     * @param {cc.Action=} $action
     */
    pushPanel: function ($tag, $class, $data, $appearCallback, $pos, $action) {
        if (this.existPanelTag($tag)) {
            app.warn("Scene: "+$tag+"のパネルIDは既に使用されています");
            return;
        }

        this.lock();
        var startPos = $pos || app.winPos.center;

        var panel = new $class();
        panel.setData($data);
        panel.setTag($tag);
        panel.setPosition(startPos);
        panel.setZOrder(app.ZORDER.PANEL+this._panel.length);
        this._panel.push(panel);

        var panelLayer = predator.getViewLayer("PANEL");
        panelLayer.addChild(panel);

        if (!cc.isUndefined($action)) {
            panel.runAction(cc.sequence($action, cc.callFunc(function () {
                if (cc.isFunction($appearCallback)) $appearCallback();
                this.unlock();
            }, this)));
        } else {
            if (cc.isFunction($appearCallback)) $appearCallback();
            this.unlock();
        }
        app.log("Scene: "+panel._className+"を追加 パネルID:"+this._panel.length-1);
    },

    /**
     * パネルの除去
     * @param {number} $tag
     * @param {function=} $disappearCallback
     * @param {cc.Action=} $action
     */
    popPanel: function ($tag, $disappearCallback, $action) {
        for (var i = 0, len = this._panel.length; i < len; i=(i+1)|0) {
            var panel = this._panel[i];
            var tag = panel.getTag();
            if ($tag == tag) {
                this.lock();
                this._panel.splice(i,1);
                if (!cc.isUndefined($action)) {
                    panel.runAction(cc.sequence($action, cc.callFunc(function () {
                        panel.removeFromParent(true);
                        if (cc.isFunction($disappearCallback)) $disappearCallback();
                        this.unlock();
                    }, this)));
                } else {
                    panel.removeFromParent(true);
                    if (cc.isFunction($disappearCallback)) $disappearCallback();
                    this.unlock();
                }
                app.log("Scene: "+panel._className+"を削除 パネルID:"+i);
                return;
            }
        }
        app.warn("Scene: "+$tag+"のパネルIDは存在しません");
    },

    /**
     * 全てのパネルを削除
     */
    removeAllPanel: function () {
        for (var i = this._panel.length-1; i >= 0; i=(i-1)|0) {
            var panel = this._panel[i];
            panel.removeFromParent(true);
        }
        this._panel = [];
    },

    /**
     * シナリオの開始
     * @param {string} $script
     * @param {boolean} $isTutorial
     */
    startScenario: function ($script, $isTutorial) {
        if (this._adv) return;
        this.lock();

        this.setTouchEnabled(false);
        this._adv = ($isTutorial)? app.createTutorialPanel($script): app.createAdventurePanel($script);
        var frontLayer = predator.getViewLayer("ADV");
        frontLayer.addChild(this._adv);
        this._adv.runScript();
    },

    /**
     * シナリオの終了
     */
    endScenario: function () {
        if (!this._adv) return;
        this._adv.exitScript();
        this._adv.removeFromParent(true);
        this._adv = null;

        this.setTouchEnabled(true);
        this.unlock();
    }
});