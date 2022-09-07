import Distance from "./distance"
import Height from "./height"
import Area from "./area"
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
     * 距离
     */
    distance() {
        const _Distance = new Distance(this.Cesium, this.viewer, this.config)
        _Distance.activate()
    }
    /**
     * 高度
     */
    height() {
        const _Height = new Height(this.Cesium, this.viewer, this.config)
        _Height.activate()
    }

    /**
     * 面积
     */
    area() {
        const _Area = new Area(this.Cesium, this.viewer, this.config)
        _Area.activate()
    }
}
export default Measure