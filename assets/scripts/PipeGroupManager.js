const PipeGroup = require('PipeGroup');

cc.Class({
    extends: cc.Component,
    properties: {
        pipePrefab: cc.Prefab,
        pipeLayer: cc.Node,
        initPipeX: 0,
        spawnInterval: 0
    },
    onLoad() {
        D.pipeManager = this;
        this.pipePool = new cc.NodePool('PipePool');
    },
    startSpawn() {
        this.spawnPipe();
        this.schedule(this.spawnPipe, this.spawnInterval);
    },
    spawnPipe() {
        let pipeGroup = this.pipePool.get();
        if (!pipeGroup) {
            let myPipe = cc.instantiate(this.pipePrefab);
            this.pipePool.put(myPipe);
            pipeGroup = myPipe;
            this.pipeLayer.addChild(pipeGroup);
        }
        pipeGroup.active = true;
        pipeGroup.x = this.initPipeX;
    },
    despawnPipe(pipe) {
        pipe.node.removeFromParent();
        pipe.node.active = false;
        let myPipe = cc.instantiate(this.pipePrefab);
        this.pipePool.put(myPipe);
    },
    reset() {
        this.unschedule(this.spawnPipe);
    }
});
