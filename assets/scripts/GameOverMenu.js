var GameOverMenu = cc.Class({
    extends: cc.Component,
    properties: {
        btn_play: cc.Button,
        score: cc.Label
    },
    restart: function () {
        cc.director.loadScene('Game');
    },
});
