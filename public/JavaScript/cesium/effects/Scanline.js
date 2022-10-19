/*
 * 线圈发光扩散效果
 */
// import Effect from './Effect'
// import ScanlineMaterialProperty from "./Materials/ScanlineMaterialProperty"
class Scanline extends Effect {
  constructor(Cesium, viewer, id) {
    super(Cesium, viewer, id)
    this._ScanlineMaterialProperty = new ScanlineMaterialProperty(Cesium, viewer)
  }
  change_duration(d) {
    super.change_duration(d)
    const curEntity = this.viewer.entities.getById(this.id)
    curEntity._ellipse._material.speed = d
  }
  add(position, color, maxRadius, speed, isedit = false) {
    const Cesium = this.Cesium
    super.add(position, color, maxRadius, speed, isedit)
    const _this = this



    this._ScanlineMaterialProperty.create({
      cesiumName: "ScanlineMaterialProperty",
      color: new Cesium.Color.fromCssColorString(color),
      speed
    })


    this.viewer.entities.add({
      id: _this.id,
      position: Cesium.Cartesian3.fromDegrees(
        position[0],
        position[1],
        position[2]
      ),
      ellipse: {
        semiMinorAxis: new Cesium.CallbackProperty(function (n) {
          return _this.maxRadius
        }, false),
        semiMajorAxis: new Cesium.CallbackProperty(function (n) {
          return _this.maxRadius
        }, false),
        material: new Cesium.ScanlineMaterialProperty(),
        classificationType: Cesium.ClassificationType.BOTH,
      },
    })
  }
}
// export default Scanline
