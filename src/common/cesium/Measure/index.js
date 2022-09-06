import Entity from "../Entity"
import Turf from "../Turf"
/**
 * 测量
 */
class Measure {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
        this.handler = null
        this._Entity = new Entity(Cesium, viewer)//实体对象
        this._Turf = new Turf(Cesium, viewer)
        this.polylineEntity = null;
        this.vertexEntities = [];
        this.initEvents(); //初始化事件
    }
    /**
     * 初始化事件
     */
    initEvents() {
        const Cesium = this.Cesium
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    }


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

    //创建起点
    createStartEntity(position) {
        const Cesium = this.Cesium
        let vertexEntity = this.viewer.entities.add({
            position,
            type: "MeasureDistanceVertex",
            billboard: {
                image: process.env.VUE_APP_PUBLIC_URL + "/image/start.png",
                scaleByDistance: new Cesium.NearFarScalar(300, 1, 1200, 0.4), //设置随图缩放距离和比例
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000), //设置可见距离 10000米可见
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            point: {
                color: Cesium.Color.FUCHSIA,
                pixelSize: 6,
            },
        });
        this.vertexEntities.push(vertexEntity);
    }
    //创建线节点
    createVertex(positions) {
        console.log(positions)
        const Cesium = this.Cesium
        console.log(this._Turf.distance(positions[0],positions[1]))
        let vertexEntity = this.viewer.entities.add({
            position: positions[positions.length - 1],
            id: "MeasureDistanceVertex" + positions[positions.length - 1],
            type: "MeasureDistanceVertex",
            label: {
                // text: spaceDistance(this.positions) + "米",
                text: "米",
                scale: 0.5,
                font: 'normal 24px MicroSoft YaHei',
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
                scaleByDistance: new Cesium.NearFarScalar(1000, 1, 3000, 0.4),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                pixelOffset: new Cesium.Cartesian2(0, -30),
                outlineWidth: 9,
                outlineColor: Cesium.Color.WHITE
            },
            point: {
                color: Cesium.Color.FUCHSIA,
                pixelSize: 8,
                disableDepthTestDistance: 500,
            },
        });
        this.vertexEntities.push(vertexEntity);
    }

    // /**
    //  * 激活
    //  * @param {*} type 测量类型
    //  */
    // activate(type) {
    //     this.registerEvents(); //注册鼠标事件  
    // }

    // /**
    //  * 注册鼠标事件
    //  */
    // registerEvents() {
    //     this.leftClickEvent();
    //     this.rightClickEvent();
    //     this.mouseMoveEvent();
    // }
    // /**
    //  * 左键点击事件
    //  */
    // leftClickEvent() { }
    // /**
    //  * 右键点击事件
    //  */
    // rightClickEvent() { }
    // /**
    //  * 鼠标移动事件
    //  */
    // mouseMoveEvent() { }

}
export default Measure