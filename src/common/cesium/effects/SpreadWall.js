/*
 * @Author: xcl
 * @Date: 2022-09-22 10:26:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-22 11:07:38
 * @Description: 推动墙扩散
 */
class SpreadWall {
  viewer
  id
  duration
  maxRadius
  pointDraged
  leftDownFlag
  update_position
  wallHeight
  position
  edgeCount
  constructor(viewer, id) {
    this.viewer = viewer
    this.id = id
    this.duration = 1000
    this.maxRadius = 1000
    this.pointDraged = null
    this.leftDownFlag = false
    this.position = null
    this.edgeCount = 0
  }
  del() {
    this.viewer.entities.removeById(this.id)
  }
  change_position(p) {
    const cartesian3 = Cesium.Cartographic.fromDegrees(
      parseFloat(p[0]),
      parseFloat(p[1]),
      parseFloat(p[2])
    )
    if (cartesian3.height < 0) {
      cartesian3.height = 0
    }
    this.position = cartesian3
  }
  change_color(val) {
    const curEntity = this.viewer.entities.getById(this.id)
    curEntity._wall._material.color = new Cesium.Color.fromCssColorString(
      val
    )
  }
  change_height(d) {
    this.wallHeight = d
  }
  change_duration(d) {
    this.duration = d
  }
  add(
    position,
    color,
    maxRadius,
    duration,
    wallHeight,
    edgeCount = 0,
    isedit = false
  ) {
    position = Cesium.Cartographic.fromDegrees(
      position[0],
      position[1],
      position[2]
    )
    if (position.height < 0) {
      position.height = 0
    }
    this.position = position
    this.wallHeight = wallHeight
    this.duration = duration
    this.maxRadius = maxRadius
    this.edgeCount = edgeCount

    let currentRadius = maxRadius
    let rPositions = this.getrPositions({}, maxRadius, position, edgeCount, currentRadius)
    const _this = this

    // 这里处理鼠标 事件
    if (isedit) {
      this.mouseEvent()
    }
    this.viewer.entities.add({
      id: _this.id,
      wall: {
        positions: new Cesium.CallbackProperty(function(e) {
          const reData = _this.getPositions(
            currentRadius,
            _this.maxRadius,
            _this.getrPositions(rPositions, _this.maxRadius, _this.position, _this.edgeCount, currentRadius),
            _this.getcenterDegrees(_this.position),
            _this.duration,
            _this.edgeCount
          )
          currentRadius = reData.currentRadius
          rPositions = reData.rPositions

          return rPositions[currentRadius]
        }, false),
        minimumHeights: 
        new Cesium.CallbackProperty(function(n) {
          let re = _this.getminimumHeights(rPositions[_this.maxRadius])
          return re
        }, false),
        maximumHeights: new Cesium.CallbackProperty(function(n) {
          let re = _this.getmaximumHeights(rPositions[_this.maxRadius])
          return re
        }, false),
        material: new Cesium.WallGradientsMaterialProperty(
          new Cesium.Color.fromCssColorString(color)
        ),
      },
    })
  }
  mouseEvent() {
    const _this = this
    function leftDownAction(e) {
      _this.pointDraged = _this.viewer.scene.pick(e.position) // 选取当前的entity
      if (
        _this.pointDraged &&
        _this.pointDraged.id &&
        _this.pointDraged.id.id === _this.id
      ) {
        _this.leftDownFlag = true
        _this.viewer.scene.screenSpaceCameraController.enableRotate = false // 锁定相机
      }
    }
    function leftUpAction(e) {
      _this.leftDownFlag = false
      _this.pointDraged = null
      _this.viewer.scene.screenSpaceCameraController.enableRotate = true // 解锁相机
    }
    function mouseMoveAction(e) {
      if (
        _this.leftDownFlag === true &&
        _this.pointDraged !== null &&
        _this.pointDraged !== undefined
      ) {
        const ray = _this.viewer.camera.getPickRay(e.endPosition)
        const cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene)
        // 这里笛卡尔坐标转 经纬度
        const ellipsoid = _this.viewer.scene.globe.ellipsoid
        const cartographic = ellipsoid.cartesianToCartographic(cartesian)
        const lat = Cesium.Math.toDegrees(cartographic.latitude)
        const lng = Cesium.Math.toDegrees(cartographic.longitude)
        let alt = cartographic.height
        alt = alt < 0 ? 0 : alt
        if (_this.update_position) {
          _this.update_position([lng.toFixed(8), lat.toFixed(8), alt])
        }
        _this.change_position([lng.toFixed(8), lat.toFixed(8), alt])
      }
    }
    this.viewer.screenSpaceEventHandler.setInputAction(
      leftDownAction,
      Cesium.ScreenSpaceEventType.LEFT_DOWN
    )
    this.viewer.screenSpaceEventHandler.setInputAction(
      leftUpAction,
      Cesium.ScreenSpaceEventType.LEFT_UP
    )
    this.viewer.screenSpaceEventHandler.setInputAction(
      mouseMoveAction,
      Cesium.ScreenSpaceEventType.MOUSE_MOVE
    )
  }
  getrPositions(rPositions, maxRadius, position, edgeCount, currentRadius) {
    const centerDegrees = this.getcenterDegrees(this.position)
    position = this.generateCirclePoints(
      [centerDegrees[0], centerDegrees[1]],
      currentRadius,
      edgeCount
    )
    position = this.pointsToPositions(position, centerDegrees[2])
    rPositions[maxRadius] = position
    return rPositions
  }
  getcenterDegrees(position) {
    const centerDegrees = [
      Cesium.Math.toDegrees(position.longitude),
      Cesium.Math.toDegrees(position.latitude),
      position.height,
    ]
    return centerDegrees
  }
  getminimumHeights(positions) {
    return new Array(positions.length).fill(this.position.height)
  }
  getmaximumHeights(positions) {
    return new Array(positions.length).fill(
      this.position.height + this.wallHeight
    )
  }
  getPositions(
    currentRadius,
    radius,
    rPositions,
    centerDegrees,
    duration,
    edgeCount
  ) {
    if (
      ((currentRadius += (1000 / duration) * 20),
      currentRadius > radius && (currentRadius = 1)
      )// rPositions[currentRadius]
    ) {
      return { rPositions: rPositions, currentRadius: currentRadius }
    }

    let t = this.generateCirclePoints(
      [centerDegrees[0], centerDegrees[1]],
      currentRadius,
      edgeCount
    )
    t = this.pointsToPositions(t, centerDegrees[2])

    rPositions[currentRadius] = t
    return { rPositions: rPositions, currentRadius: currentRadius }
  }
  pointsToPositions(t, e) {
    const n = []
    return (
      t.map(function(t) {
        n.push(Cesium.Cartesian3.fromDegrees(t[0], t[1], e))
      }),
      n
    )
  }
  generateCirclePoints(t, e, edgeCount) {
    const n = []
    if (edgeCount) {
      for (let i = 360 / edgeCount, r = 0; r <= 360; r += i) {
        n.push(this.getCirclePoint(t[0], t[1], r, e))
      }
    }
    else {
      for (let i = 0; i <= 360; i += 2) {
        n.push(this.getCirclePoint(t[0], t[1], i, e))
      }
    }
    return n
  }
  getCirclePoint(t, e, n, i) {
    const r = i * Math.sin((n * Math.PI) / 180)
    i *= Math.cos((n * Math.PI) / 180)
    return [
      (180 *
        (r /
          ((n = 6356725 + (21412 * (90 - e)) / 90) *
            Math.cos((e * Math.PI) / 180)) +
          (t * Math.PI) / 180)) /
        Math.PI,
      (180 * (i / n + (e * Math.PI) / 180)) / Math.PI,
    ]
  }
}
export default SpreadWall
