import Measure from "./index"
/**
 * 距离
 */
class Distance extends Measure {
    positions = []
    measureDistance = 0 //测量结果
    /**
     * 激活
     * @param {*} type 测量类型
     */
    activate(type) {
        this.registerEvents(); //注册鼠标事件  
        this.isMeasure = true;
    }

    /**
     * 注册鼠标事件
     */
    registerEvents() {
        this.leftClickEvent();
        this.rightClickEvent();
        this.mouseMoveEvent();
    }
    //解除鼠标事件
    unRegisterEvents() {
        const Cesium = this.Cesium
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }

    //禁用
    deactivate() {
        if (!this.isMeasure) return;
        this.unRegisterEvents();
        this.viewer._element.style.cursor = 'pointer';
        this.viewer.enableCursorStyle = true;
        this.isMeasure = false;
        this.tempPositions = [];
        this.positions = [];
    }
    //清空绘制
    clear() {
        //清除线对象
        this.viewer.entities.remove(this.lineEntity);
        this.lineEntity = undefined;

        //清除节点
        this.vertexEntities.forEach(item => {
            this.viewer.entities.remove(item);
        });
        this.vertexEntities = [];
    }

    //测量结束
    measureEnd() {
        this.deactivate();
        this.MeasureEndEvent.raiseEvent(this.measureDistance); //触发结束事件 传入结果
    }

    /**
     * 左键点击事件
     */
    leftClickEvent() {
        const Cesium = this.Cesium
        //单击鼠标左键画点点击事件
        this.handler.setInputAction(e => {
            this.viewer._element.style.cursor = 'default';
            let position = this.viewer.scene.pickPosition(e.position);
            if (!position) {
                const ellipsoid = this.viewer.scene.globe.ellipsoid;
                position = this.viewer.scene.camera.pickEllipsoid(e.position, ellipsoid);
            }
            if (!position) return;
            this.positions.push(position);
            if (this.positions.length == 1) { //首次点击  
                this.createPolylineEntity() //创建线对象
                this.createStartEntity(this.positions[0]);//创建起点
                return;
            }
            this.createVertex(this.positions);//创建线节点
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
    /**
     * 右键点击事件
     */
    rightClickEvent() {
        const Cesium = this.Cesium
        this.handler.setInputAction(e => {
            if (!this.isMeasure || this.positions.length < 1) {
                this.deactivate();
                this.clear();
            } else {
                this.createEndEntity(this.positions);
                this.polylineEntity.polyline = {
                    positions: this.positions,
                    width: 2,
                    material: Cesium.Color.YELLOW,
                    depthFailMaterial: Cesium.Color.YELLOW
                };
                this.measureEnd();
            }

        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
    /**
     * 鼠标移动事件
     */
    mouseMoveEvent() {
        const Cesium = this.Cesium
        this.handler.setInputAction(e => {
            if (!this.isMeasure) return;
            this.viewer._element.style.cursor = 'default';
            let position = this.viewer.scene.pickPosition(e.endPosition);
            if (!position) {
                position = this.viewer.scene.camera.pickEllipsoid(e.startPosition, this.viewer.scene.globe.ellipsoid);
            }
            if (!position) return;
            this.handleMoveEvent(position);
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }

    //处理鼠标移动
    handleMoveEvent(position) {
        if (this.positions.length < 1) return;
        this.tempPositions = this.positions.concat(position);
    }
}
export default Distance