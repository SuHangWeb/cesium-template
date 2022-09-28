/*
 * @Author: xcl
 * @Date: 2022-09-22 10:26:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-22 10:31:52
 * @Description: 线圈发光扩散效果
 */
import Effect from './Effect'
class Scanline extends Effect {
  constructor(viewer, id) {
    super(viewer, id)
  }
  change_duration(d) {
    super.change_duration(d)
    const curEntity = this.viewer.entities.getById(this.id)
    curEntity._ellipse._material.speed = d
  }
  add(position, color, maxRadius, speed, isedit = false) {
    super.add(position, color, maxRadius, speed, isedit)
    const _this = this
    this.viewer.entities.add({
      id: _this.id,
      position: Cesium.Cartesian3.fromDegrees(
        position[0],
        position[1],
        position[2]
      ),
      ellipse: {
        semiMinorAxis: new Cesium.CallbackProperty(function(n) {
          return _this.maxRadius
        }, false),
        semiMajorAxis: new Cesium.CallbackProperty(function(n) {
          return _this.maxRadius
        }, false),
        material: new Cesium.ScanlineMaterialProperty(
          new Cesium.Color.fromCssColorString(color),
          speed
        ),
        classificationType: Cesium.ClassificationType.BOTH,
      },
    })
  }
}
export default Scanline
