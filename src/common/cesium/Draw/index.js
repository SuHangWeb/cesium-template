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
     */
    createPoint(params) {
        const _Entity = new Entity(this.Cesium, this.viewer)
        return _Entity.createPoint(params)
    }
}
export default Draw