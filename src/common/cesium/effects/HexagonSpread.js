/*
 * @Author: xcl
 * @Date: 2022-09-22 10:26:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-22 10:58:35
 * @Description: 六边形扩散效果
 */
import Effect from './Effect'
class HexagonSpread extends Effect {
  constructor(viewer, id) {
    super(viewer, id)
  }
  add(position, color, maxRadius, duration, isedit = false) {
    super.add(position, color, maxRadius, duration, isedit)
    const _this = this
    let currentRadius = 1
    this.viewer.entities.add({
      id: _this.id,
      position: Cesium.Cartesian3.fromDegrees(
        position[0],
        position[1],
        position[2]
      ),
      ellipse: {
        semiMajorAxis: new Cesium.CallbackProperty(function(n) {
          currentRadius += (1000 / _this.duration) * 50
          if (currentRadius > _this.maxRadius) {
            currentRadius = 1
          }
          return currentRadius
        }, false),
        semiMinorAxis: new Cesium.CallbackProperty(function(n) {
          return currentRadius
        }, false),
        material: new Cesium.HexagonSpreadMaterialProperty(
          new Cesium.Color.fromCssColorString(color)
        ),
      },
    })
  }
}
export default HexagonSpread
