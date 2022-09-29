/*
 * 道路网络
 */
import * as turf from '@turf/turf'
import PolylineTrailMaterialProperty from "./Materials/PolylineTrailMaterialProperty"
import Spriteline1MaterialProperty from "./Materials/Spriteline1MaterialProperty"
class RoadNetwork {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
        this.FlyLinesEntities = []
        this._PolylineTrailMaterialProperty = new PolylineTrailMaterialProperty(Cesium, viewer)
        this._Spriteline1MaterialProperty = new Spriteline1MaterialProperty(Cesium, viewer)
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

    /**
     * 道路穿梭线
     * @param {*} url 
     * @param {*} Picurl 
     * @param {*} width 宽度
     * @param {*} time 延迟时间
     */
    RoadPic(url, Picurl, width, time) {
        const Cesium = this.Cesium

        this._Spriteline1MaterialProperty.create({
            cesiumName: "Spriteline1MaterialProperty",
            duration: time,
            image: Picurl
        })

        let promise = Cesium.GeoJsonDataSource.load(url)
        promise.then((dataSource) => {
            this.viewer.dataSources.add(dataSource)
            this.RoadPicEntities = dataSource.entities.values
            for (let i = 0; i < this.RoadPicEntities.length; i++) {
                const entity = this.RoadPicEntities[i]
                entity.polyline.width = width
                entity.polyline.material = new Cesium.Spriteline1MaterialProperty()
            }
        })
    }
}
export default RoadNetwork
