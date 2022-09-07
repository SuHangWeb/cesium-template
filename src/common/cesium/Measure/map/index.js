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
        this.tempPositions = [];
        this.initEvents(); //初始化事件
    }
    /**
     * 初始化事件
     */
    initEvents() {
        const Cesium = this.Cesium
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        this.MeasureStartEvent = new Cesium.Event(); //开始事件
        this.MeasureEndEvent = new Cesium.Event(); //结束事件   
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

    //创建终点节点
    createEndEntity(positions) {
        const Cesium = this.Cesium
        //结束时删除最后一个节点的距离标识
        let lastLabel = this.viewer.entities.getById("MeasureDistanceVertex" + positions[positions.length - 1]);
        this.viewer.entities.remove(lastLabel);
        this.viewer.entities.remove(this.moveVertexEntity);

        let vertexEntity = this.viewer.entities.add({
            position: positions[positions.length - 1],
            type: "MeasureDistanceVertex",
            label: {
                text: "总距离：" + this.totalSpaceDistance(positions) + "米",
                scale: 0.5,
                font: 'normal 26px MicroSoft YaHei',
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
                scaleByDistance: new Cesium.NearFarScalar(1000, 1, 3000, 0.4),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                pixelOffset: new Cesium.Cartesian2(0, -50),
                outlineWidth: 9,
                outlineColor: Cesium.Color.WHITE,
                eyeOffset: new Cesium.Cartesian3(0, 0, -10)
            },
            billboard: {
                image: process.env.VUE_APP_PUBLIC_URL + "/image/end.png",
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

    /**
     * 换算空间距离
     * @param {*} positions 
     */
    spaceDistance(positions) {
        const _len = positions.length
        return this._Turf.distance(positions[_len - 2], positions[_len - 1])
    }
    /**
     * 总距离
     * @param {*} positions 
     */
    totalSpaceDistance(positions) {
        const _len = positions.length
        let jl = 0
        for (let i = 1; i < _len; i++) {
            jl += Number(this._Turf.distance(positions[i - 1], positions[i]))
        }
        return jl
    }
    //创建线节点
    createVertex(positions) {
        const Cesium = this.Cesium
        let vertexEntity = this.viewer.entities.add({
            position: positions[positions.length - 1],
            id: "MeasureDistanceVertex" + positions[positions.length - 1],
            type: "MeasureDistanceVertex",
            label: {
                text: this.spaceDistance(this.positions) + "米",
                // text: "米",
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