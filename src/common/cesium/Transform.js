
/**
 * 转换操作
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
}

export default Transform