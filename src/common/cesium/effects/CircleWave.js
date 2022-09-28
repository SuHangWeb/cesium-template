/*
 * @Author: xcl
 * @Date: 2022-09-22 10:26:48
 * @LastEditors: 
 * @LastEditTime: 2022-09-22 10:27:53
 * @Description: 水波纹
 */
import Effect from './Effect'
class CircleWave extends Effect {
  count
  constructor(viewer, id) {
    super(viewer, id)
  }
  change_duration(d) {
    super.change_duration(d)
    const curEntity = this.viewer.entities.getById(this.id)
    curEntity._ellipse._material.duration = d
  }
  change_waveCount(d) {
    const curEntity = this.viewer.entities.getById(this.id)
    curEntity._ellipse._material.count = d
  }
  add(position, color, maxRadius, duration, isedit = false, count = 3) {
    super.add(position, color, maxRadius, duration, isedit)
    const _this = this
    this.count = count
    this.viewer.entities.add({
      id: _this.id,
      position: Cesium.Cartesian3.fromDegrees(
        position[0],
        position[1],
        position[2]
      ),
      ellipse: {
        // height: position[2],
        semiMinorAxis: new Cesium.CallbackProperty(function(n) {
          return _this.maxRadius
        }, false),
        semiMajorAxis: new Cesium.CallbackProperty(function(n) {
          return _this.maxRadius
        }, false),
        material: new Cesium.CircleWaveMaterialProperty({
          duration: duration,
          gradient: 0,
          color: new Cesium.Color.fromCssColorString(color),
          count: count,
        }),
      },
    })
  }
}
export default CircleWave
