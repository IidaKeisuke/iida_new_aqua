/*!
 * @file        font_setting.js
 * @brief       フォント設定
 * @date        2016/10/11
 *
 * @author      n.morita
 * @copyright   2016 ORATTA.inc
 */

// 名前空間
var app = app || {};

/**
 * フォントタイプ
 */
app.FontType = {
    DEFAULT: 0,
};

/**
 * 色設定の破棄
 * @param $node
 */
app.clearColor = function ($node) {
    $node.setColor(color.White);
    $node.setOpacity(0xFF);
};

/**
 * 強制中心揃え
 * @param $node
 */
app.forceAlignCenterAnchorAndPos = function ($node) {
    var bounding = $node.getBoundingBoxToWorld();
    $node.setContentSize(bounding.width,bounding.height);
    $node.setAnchorPoint(0.5,0.5);
    $node.setPosition(0,0);
};

/**
 * フォント設定
 * @param {cc.LabelTTF} $label
 * @param {app.FontType} $type
 * @constructor
 */
app.fontSetting = function ($label, $type) {
    if (!($label instanceof cc.LabelTTF)) return;

    app.clearColor($label);

    var isSystemFont = ($label.getFontName() == "Arial");

    var type = $type || app.FontType.DEFAULT;
    switch (type) {

        case app.FontType.DEFAULT:
        default:
            $label.setFontName(app.defaultFont);
            $label.setFontSize(app.defaultFontSize);
            $label.setFontFillColor(color.Black);
            break;
    }

    if (isSystemFont && ($label.getFontName() != "Arial")) {
        var pos = $label.getPosition();
        var fontSize = $label.getFontSize();
        $label.setPosition(pos.x,pos.y-fontSize/2);
    }
};
