import Measure from "./index"
/**
 * 距离
 */
class Distance extends Measure {
    positions = []
    /**
     * 激活
     * @param {*} type 测量类型
     */
    activate(type) {
        this.registerEvents(); //注册鼠标事件  
    }

    /**
     * 注册鼠标事件
     */
    registerEvents() {
        this.leftClickEvent();
        // this.rightClickEvent();
        // this.mouseMoveEvent();
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
    rightClickEvent() { }
    /**
     * 鼠标移动事件
     */
    mouseMoveEvent() { }

    //创建线对象
    createPolylineEntity() {
        const Cesium = this.Cesium
        this.polylineEntity = this._Entity.createPolyline({
            positions: new Cesium.CallbackProperty(e => {
                return this.tempPositions;
            }, false),
            width: 2,
            material: Cesium.Color.YELLOW,
            depthFailMaterial: Cesium.Color.YELLOW
        })
    }
}
export default Distance