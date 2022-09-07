import * as turf from '@turf/turf'

class Turf {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }
    /**
     * 笛卡尔坐标系转WGS84坐标系
     * @param point
     * @return {{lat: *, lng: *, alt: *}}
     * @constructor
     */
    Cartesian3_to_WGS84(point) {
        const Cesium = this.Cesium
        var cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        var lng = Cesium.Math.toDegrees(cartographic.longitude);
        var alt = cartographic.height;
        // return { lng: lng, lat: lat, alt: alt };
        return [lng, lat]
    }
    /**
     * 计算两点之间的距离
     * @param {*} from 
     * @param {*} to 
     * @param {*} units {units：degrees, radians, miles,  kilometers} 度、弧度、英里、公里 为单位计算两点之间的距离。
     */
    distance(from, to, units = "kilometers") {
        const _result = turf.distance(turf.point(this.Cartesian3_to_WGS84(from)), turf.point(this.Cartesian3_to_WGS84(to)), { units });
        return (_result * 1000).toFixed(2)
    }
}

export default Turf
