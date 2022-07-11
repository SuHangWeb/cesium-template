
/**
 * 转换操作
 * 使用方法如下 
   const _Transform = new Transform(cenium上下文,场景viewer)
    _Transform.方法函数(根据当前方法所需参数进行传递)
    
    方法目录如下：

    方法名称 | 概要
    --- | ---
    formCssColorString | 十六进制颜色 转换成 cesium所需要的颜色
    getPosition | 位置拾取器 （经度、纬度、相机高度）
    terrainProviderHeight | 坐标位置获取地形高度
    getSeibelCurve | 流动曲线/赛贝尔曲线
    getCatesian3FromPX | 屏幕坐标转笛卡尔 地形坐标 
    meter2Lat | 距离（米）转换为纬度  一米对应的纬度为定值
    meter2Lng | 距离（米）转换为经度  不同纬度下一米对应的经度不同
    isDegreesOrCartesian | 判断该点是否是经纬度或者笛卡尔坐标
    toDegrees | 转化成经纬度
    toCartesian | 转化成笛卡尔坐标
    toWindowCoordinates | 转屏幕坐标
 */
class Transform {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }
    /**
     * 十六进制颜色 转换成 cesium所需要的颜色
     * @param {*} color 
     */
    formCssColorString(color) {
        const Cesium = this.Cesium
        return Cesium.Color.fromCssColorString(color)
    }
    /**
     * 位置拾取器 （经度、纬度、相机高度）
     * @param {*} event 点击事件参数
     * @returns 位置信息对象
     */
    getPosition(event) {
        const Cesium = this.Cesium
        const viewer = this.viewer
        // 转换为不包含地形的笛卡尔坐标
        const clickPosition = viewer.scene.camera.pickEllipsoid(
            event.position
        );

        // 转经纬度（弧度）坐标
        const radiansPos = Cesium.Cartographic.fromCartesian(clickPosition);

        //经度：
        const longitude = Cesium.Math.toDegrees(radiansPos.longitude);
        //纬度：
        const latitude = Cesium.Math.toDegrees(radiansPos.latitude);
        //相机高度：
        const cameraHeight = Number(viewer.camera.positionCartographic.height.toFixed(0));

        // console.log(
        //     `经度：${longitude}\n纬度：${latitude}\n相机高度：${cameraHeight}`
        // );
        return { longitude, latitude, cameraHeight }
    }
    /**
     * 坐标位置获取地形高度
     * @param {Array} positions 
     * @returns {Cartographic} 地形高度数据
     */
    terrainProviderHeight(positions) {
        const Cesium = this.Cesium
        //地形
        const terrainProvider = Cesium.createWorldTerrain();
        const promise = Cesium.sampleTerrainMostDetailed(
            terrainProvider,
            positions
        );
        return Promise.resolve(promise)

        // return new Promise((resolve, reject) => {

        // })

        // // Query the terrain height of two Cartographic positions
        // const terrainProvider = Cesium.createWorldTerrain();
        // const positions = [
        //     Cesium.Cartographic.fromDegrees(86.925145, 27.988257),
        //     Cesium.Cartographic.fromDegrees(87.0, 28.0)
        // ];
        // const promise = Cesium.sampleTerrain(terrainProvider, 11, positions);
        // Promise.resolve(promise).then(function (updatedPositions) {
        //     // positions[0].height and positions[1].height have been updated.
        //     // updatedPositions is just a reference to positions.
        // });
    }
    /**
     * 流动曲线/赛贝尔曲线
     * @param {*} e 
     * @param {*} t 
     * @param {*} i 
     * @param {*} r 
     * @returns 
     */
    getSeibelCurve(e, t, i, r) {
        const Cesium = this.Cesium
        const n = [];
        const o = Cesium.Cartographic.fromCartesian(e);
        const a = Cesium.Cartographic.fromCartesian(t);
        const s = (180 * o.longitude) / Math.PI;
        const l = (180 * o.latitude) / Math.PI;
        const u = (180 * a.longitude) / Math.PI;
        const c = (180 * a.latitude) / Math.PI;
        const h = Math.sqrt((s - u) * (s - u) + (l - c) * (l - c));
        const d = h * i;
        const f = Cesium.Cartesian3.clone(e);
        const p = Cesium.Cartesian3.clone(t);
        const m = Cesium.Cartesian3.distance(f, Cesium.Cartesian3.ZERO);
        const g = Cesium.Cartesian3.distance(p, Cesium.Cartesian3.ZERO);
        Cesium.Cartesian3.normalize(f, f);
        Cesium.Cartesian3.normalize(p, p);
        if (Cesium.Cartesian3.distance(f, p) === 0) return n;
        const v = Cesium.Cartesian3.angleBetween(f, p);
        n.push(e);
        for (let y = 1; y < r - 1; y++) {
            const _ = (1 * y) / (r - 1);
            const w = 1 - _;
            const b = Math.sin(w * v) / Math.sin(v);
            const C = Math.sin(_ * v) / Math.sin(v);
            const x = Cesium.Cartesian3.multiplyByScalar(
                f,
                b,
                new Cesium.Cartesian3()
            );
            const P = Cesium.Cartesian3.multiplyByScalar(
                p,
                C,
                new Cesium.Cartesian3()
            );
            const E = Cesium.Cartesian3.add(x, P, new Cesium.Cartesian3());
            const M = _ * Math.PI;
            const T = m * w + g * _ + Math.sin(M) * d;
            const F = Cesium.Cartesian3.multiplyByScalar(E, T, E);
            n.push(F);
        }
        n.push(t);
        return n;
    }

    /**
     * 屏幕坐标转笛卡尔 地形坐标
     * @param {*} ScreenCoordinates   屏幕坐标
     */
    getCatesian3FromPX(ScreenCoordinates) {
        const ray = this.viewer.camera.getPickRay(ScreenCoordinates);
        if (!ray) return null;
        return this.viewer.scene.globe.pick(ray, this.viewer.scene);
    }

    /**
      * 距离（米）转换为纬度  一米对应的纬度为定值
      * @param meter 距离多少米
      * @returns {number}
      */
    meter2Lat(meter) {
        if (!meter) {
            throw new Error("Error in Parameter!");
        }
        let pi = Math.PI;
        let lngInMeter = (6371 * 2 * pi) / 360;
        return (meter / lngInMeter) / 1000;
    }

    /**
     * 距离（米）转换为经度  不同纬度下一米对应的经度不同
     * @param meter 距离
     * @param lat 所在纬度
     * @returns {number}
     */
    meter2Lng(meter, lat) {
        if ((!meter) || (!lat)) {
            throw new Error("Error in Parameter!");
        }
        let pi = Math.PI;
        let latInMeter = (Math.cos(lat * pi / 180) * 6371 * 2 * pi) / 360;
        return (meter / latInMeter) / 1000;
    }


    /**
     * 判断该点是否是经纬度或者笛卡尔坐标
     * @param point
     * 当前依赖函数：
     * toDegrees
     * 
     */
    isDegreesOrCartesian(point) {
        if (!point) {
            throw new Error("Error in Parameter!");
        }
        if (('number' === typeof point.x) && ('number' === typeof point.y) && ('number' === typeof point.z)) {
            return true
        }
        if (('number' === typeof point.lng) && ('number' === typeof point.lat)) {
            return true
        }
        return false;
    }

    /**
     * 转化成经纬度
     * @param point
     */
    toDegrees(point) {
        const Cesium = this.Cesium
        if (this.isDegreesOrCartesian(point)) {
            /**
             * 笛卡尔坐标转地理坐标
             * @param point
             */
            let toDegreesFromCartesian = (point) => {
                let cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
                let cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
                return {
                    lng: parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(8)),
                    lat: parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(8)),
                    alt: parseFloat(cartographic.height.toFixed(8))
                };

            };
            if (point.x) {
                point = toDegreesFromCartesian(point);
            }
            return point;
        }
    }

    /**
     * 转化成笛卡尔坐标
     * @param point
     */
    toCartesian(point) {
        const Cesium = this.Cesium
        if (this.isDegreesOrCartesian(point)) {
            /**
             * 地理坐标转笛卡尔坐标
             * @param point
             */
            let toCartesianFromDegrees = (point) => {
                return Cesium.Cartesian3.fromDegrees(point.lng, point.lat, point.alt || 0);
            };
            if (point.lng) {
                point = toCartesianFromDegrees(point);
            }
            return point;
        }
    }

    /**
     * 转屏幕坐标
     * @param point
     */
    toWindowCoordinates(point) {
        const Cesium = this.Cesium
        const viewer = this.viewer
        if (viewer && point && point.x && point.y && point.z) {
            return Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, point);
        } else if (viewer && point.lng && point.lat && point.alt) {
            return Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, toCartesianFromDegrees(point));
        } else {
            throw new Error("Error in Parameter!");
        }
    }
}

export default Transform