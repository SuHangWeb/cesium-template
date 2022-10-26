/*
 * 六边形扩散效果
 */
// import Effect from './Effect'
// import HexagonSpreadMaterialProperty from "./Materials/HexagonSpreadMaterialProperty"
class HexagonSpread extends Effect {
  constructor(Cesium, viewer, id) {
    super(Cesium, viewer, id)
    this._HexagonSpreadMaterialProperty = new HexagonSpreadMaterialProperty(Cesium, viewer)
  }
  add(position, color, maxRadius, duration, isedit = false) {
    const Cesium = this.Cesium
    super.add(position, color, maxRadius, duration, isedit)
    const _this = this
    let currentRadius = 1

    this._HexagonSpreadMaterialProperty.create({
      cesiumName: "HexagonSpreadMaterialProperty",
      color: new Cesium.Color.fromCssColorString(color),
    })

    this.viewer.entities.add({
      id: _this.id,
      position: Cesium.Cartesian3.fromDegrees(
        position[0],
        position[1],
        position[2]
      ),
      ellipse: {
        semiMajorAxis: new Cesium.CallbackProperty(function (n) {
          currentRadius += (1000 / _this.duration) * 50
          if (currentRadius > _this.maxRadius) {
            currentRadius = 1
          }
          return currentRadius
        }, false),
        semiMinorAxis: new Cesium.CallbackProperty(function (n) {
          return currentRadius
        }, false),
        material: new Cesium.HexagonSpreadMaterialProperty(),
      },
    })
  }
}
// export default HexagonSpread
