import Entity from "./../Entity"
/**
 * 绘制
 */
class Draw extends Entity {
    // constructor(Cesium, viewer) {
    //     this.Cesium = Cesium
    //     this.viewer = viewer
    // }

    /**
     * 绘制点
     * @param {*} params 
     * @returns 
     */
    createPoint(params) {
        const _Entity = new Entity(this.Cesium, this.viewer)
        return _Entity.createPoint(params)
    }
    /**
     * 绘制线
     * @param {*} params 
     * @returns 
     */
    createPolyline(params) {
        const _Entity = new Entity(this.Cesium, this.viewer)
        return _Entity.createPolyline(params)
    }
}
export default Draw