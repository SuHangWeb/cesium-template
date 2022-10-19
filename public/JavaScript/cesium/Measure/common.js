
/**
 * 通用
 */
// import Utils from "../Utils"

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
class MeasureCommon {
    constructor(Cesium, viewer, config) {
        this.Cesium = Cesium
        this.viewer = viewer
        this.config = __assign({}, config);

        this.initEvents()
    }

    //初始化事件
    initEvents() {
        const Cesium = this.Cesium
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        this.MeasureStartEvent = new Cesium.Event(); //开始事件
        this.MeasureEndEvent = new Cesium.Event(); //结束事件       
    }
    /**
     * 计算两点之间的距离
     * @param {*} from 
     * @param {*} to 
     */
    get_distance(from, to) {
        const _Utils = new Utils(this.Cesium, this.viewer)
        return _Utils.getDistance(from, to).toFixed(2)
    }
    /**
     * 多边形面积
     * @param {*} arr 
     */
    get_countArea(arr) {
        const _Utils = new Utils(this.Cesium, this.viewer)
        return _Utils.countArea(arr).toFixed(2)
    }
}
// export default MeasureCommon