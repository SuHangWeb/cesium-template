/*
 * 道路网络
 */
import * as turf from '@turf/turf'
import PolylineTrailMaterialProperty from "./Materials/PolylineTrailMaterialProperty"
class RoadNetwork {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
        this.FlyLinesEntities = []
        this._PolylineTrailMaterialProperty = new PolylineTrailMaterialProperty(Cesium, viewer)
    }
    /**
     * 飞线
     * @param {*} bbox [起始lon经度,起始lat纬度,终止lon经度,终止lat纬度]
     * @param {*} color 效果颜色
     * @param {*} width 宽度
     * @param {*} height 最大高度
     * @param {*} speed 速度
     * @param {*} percent 拖尾长
     * @param {*} gradient 变化率
     * @param {*} random 飞线数/条
     */
    flyLines(bbox, color, width, height, speed, percent, gradient, random) {
        const Cesium = this.Cesium
        const _this = this;

        this._PolylineTrailMaterialProperty.create({
            cesiumName: "PolylineTrailMaterialProperty",
            speed: speed * Math.random(),
            color: new Cesium.Color.fromCssColorString(color),
            percent: percent, // 尾巴拖多少长
            gradient: gradient, // 变化率
        })


        // 生成随机点
        let points = turf.randomPoint(random, {
            bbox: bbox,
        })
        let features = points.features
        let point;
        let startPosition;
        let endPosition;
        features.forEach((item) => {
            point = item.geometry.coordinates
            startPosition = Cesium.Cartesian3.fromDegrees(point[0], point[1], 0)
            endPosition = Cesium.Cartesian3.fromDegrees(
                point[0],
                point[1],
                height * Math.random()
            )
            _this.FlyLinesEntities.push(_this.viewer.entities.add({
                polyline: {
                    positions: [startPosition, endPosition],
                    width: width,
                    material: new Cesium.PolylineTrailMaterialProperty(),
                },
            }))
        })
    }
}
export default RoadNetwork
