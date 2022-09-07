import Distance from "./distance"
/**
 * 测量
 */

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
class Measure {
    constructor(Cesium, viewer, config) {
        this.Cesium = Cesium
        this.viewer = viewer
        this.config = __assign({}, config);
    }
    /**
     * 初始化
     */
    createDistance() {
        const _Distance = new Distance(this.Cesium, this.viewer, this.config)
        _Distance.activate()
    }
}
export default Measure