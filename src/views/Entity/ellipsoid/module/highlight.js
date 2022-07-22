export default [
  {
    codeLanguage: "VUE",
    relyOn: [
      {
        label: "uuid（npm）",
        url: "https://www.npmjs.com/package/uuid",
        externalLinks: true
      },
    ],
    code: [
      {
        codeLanguage: "html",
        content: `<template>
                      <div class="container">
                        <div id="cesiumContainer"></div>
                        <div class="button-view">
                          <el-button type="primary" plain class="start" @click="start">绘制</el-button>
                          <el-button type="primary" plain class="start" @click="edit">编辑</el-button>
                          <el-button type="primary" plain class="start" @click="clear">清空</el-button>
                        </div>
                      </div>
                    </template>`
      },
      {
        codeLanguage: "js",
        content: `import { v4 as uuidv4 } from "uuid";
                    export default {
                      data() {
                        return {
                          viewer: null,
                          handler: null,//事件
                          centerPoint: null,//中心点
                          ellipsoidGather: null,//采集的球对象
                          ellipsoidGatherArr: [],//采集球体的实体数组
                          ellipsoidGatherIndex: null,//当前编辑的球体
                        };
                      },
                      mounted() {
                        this.init();
                      },
                      methods: {
                        init() {
                          const Cesium = this.cesium;
                          Cesium.Ion.defaultAccessToken = process.env.VUE_APP_TOKEN;
                          this.viewer = new Cesium.Viewer("cesiumContainer", {
                            imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                              url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
                            }),
                            terrainProvider: new Cesium.CesiumTerrainProvider({
                              //加载火星在线地形
                              url: "http://data.marsgis.cn/terrain",
                            }),
                            shouldAnimate: true,
                            infoBox: false,
                            selectionIndicator: false,
                          });
                          //设置贴地效果
                          this.viewer.scene.globe.depthTestAgainstTerrain = false;
                          //去掉双击事件
                          this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
                            Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
                          );
                        },
                        /**
                         * 开始
                         *  */
                        start() {
                          const Cesium = this.cesium;
                          const viewer = this.viewer;
                    
                          this.ellipsoidGather = null;
                          //鼠标变成加号
                          document.getElementById("cesiumContainer").style.cursor = "crosshair";
                    
                          //进制地图移动
                          viewer.scene.screenSpaceCameraController.enableRotate = false;
                          viewer.scene.screenSpaceCameraController.enableZoom = false;
                          this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                          //鼠标点击事件
                          this.handler.setInputAction((event) => {
                            //获取加载地形后对应的经纬度和高程：地标坐标
                            var ray = viewer.camera.getPickRay(event.position);
                            var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
                            //console.log("cartesian:", cartesian);
                            if (!Cesium.defined(cartesian)) {
                              return;
                            }
                            this.centerPoint = viewer.entities.add({
                              id: uuidv4(),
                              name: 'centerPoint',
                              position: cartesian,
                              point: {
                                color: Cesium.Color.CHARTREUSE.withAlpha(1),
                                pixelSize: 10,
                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                outlineColor: Cesium.Color.WHITE,
                                outlineWidth: 1
                              }
                            });
                            // 轨迹球体
                            this.ellipsoidGather = viewer.entities.add({
                              id: uuidv4(),
                              position: cartesian,
                              name: 'ellipsoid',
                              ellipsoid: {
                                maximumCone: Cesium.Math.PI_OVER_TWO,
                                radii: new Cesium.Cartesian3(0.1, 0.1, 0.1),
                                material: Cesium.Color.GREENYELLOW.withAlpha(0.5)
                              }
                            })
                            this.ellipsoidGatherArr.push(this.ellipsoidGather)
                    
                          }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
                    
                    
                          // 对鼠标移动事件的监听
                          this.handler.setInputAction((event) => {
                            if (this.centerPoint == null || this.ellipsoidGather == null) {
                              return;
                            }
                            //获取加载地形后对应的经纬度和高程：地标坐标
                            var ray = viewer.camera.getPickRay(event.endPosition);
                            var radiusCartesian = viewer.scene.globe.pick(ray, viewer.scene);
                            if (!radiusCartesian) {
                              return;
                            }
                            var centerCartesian = this.centerPoint.position.getValue(Cesium.JulianDate.now());
                            //计算移动点与中心点的距离（单位米）
                            var centerTemp = viewer.scene.globe.ellipsoid.cartesianToCartographic(centerCartesian);
                            var radiusTemp = viewer.scene.globe.ellipsoid.cartesianToCartographic(radiusCartesian);
                            var geodesic = new Cesium.EllipsoidGeodesic();
                            geodesic.setEndPoints(centerTemp, radiusTemp);
                            var radius = geodesic.surfaceDistance;
                            //console.log("radius",radius);
                            //如果半径小于0,则不更新圆信息
                            if (radius <= 0) {
                              return;
                            }
                            this.ellipsoidGather.ellipsoid.radii = new Cesium.CallbackProperty(function (time, result) {
                              return new Cesium.Cartesian3(radius, radius, radius);
                            }, false);
                          }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                    
                    
                          // 对鼠标抬起事件的监听(结束点采集)
                          this.handler.setInputAction((event) => {
                            //鼠标变成默认
                            document.getElementById("cesiumContainer").style.cursor = "default";
                            //开始鼠标操作地图
                            viewer.scene.screenSpaceCameraController.enableRotate = true;
                            viewer.scene.screenSpaceCameraController.enableZoom = true;
                            //移除地图鼠标点击事件
                            this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN)
                            //移除地图鼠标移动事件
                            this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                            //移除地图鼠标抬起事件
                            this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP)
                            var ellipsoid = viewer.scene.globe.ellipsoid;
                            var cartographic = ellipsoid.cartesianToCartographic(this.centerPoint.position.getValue(Cesium.JulianDate.now()));
                            var lat = Cesium.Math.toDegrees(cartographic.latitude);
                            var lng = Cesium.Math.toDegrees(cartographic.longitude);
                            var height = cartographic.height;
                            console.log("圆中心点：经度", lng + ",纬度：" + lat + ",高度：" + height);
                            console.log("圆半径：", this.ellipsoidGather.ellipsoid.radii.getValue().x + "米");
                            //如果圆半径小于0.5米则删除，防止出现默认为0.1米的被采集。该种情况则是用户取消圆采集
                            if (this.ellipsoidGather.ellipsoid.radii.getValue().x < 0.5) {
                              viewer.entities.remove(this.ellipsoidGather);
                              this.ellipsoidGather = null;
                              this.handler = null
                            }
                            //清除圆中心点和半径点
                            viewer.entities.remove(this.centerPoint);
                            this.centerPoint = null;
                          }, Cesium.ScreenSpaceEventType.LEFT_UP);
                    
                        },
                        /**
                         * 获取半径（米）/以及经纬度
                         */
                        getRadius(_entity) {
                          const Cesium = this.cesium;
                          const cartographic = Cesium.Cartographic.fromCartesian(_entity._position._value);
                          const lat = Cesium.Math.toDegrees(cartographic.latitude);
                          const lng = Cesium.Math.toDegrees(cartographic.longitude);
                          const height = _entity._ellipsoid.radii.getValue().x
                          return {
                            lat,
                            lng,
                            height,
                            _cartesian3: _entity._position._value
                          }
                        },
                        /**
                         * 编辑
                         */
                        edit() {
                          const Cesium = this.cesium;
                          const viewer = this.viewer;
                          let edit_centerPoint, edit_boundaryPoint, edit_ellipsoidGatherId
                          let left_click = false
                          let Point_type = ""
                    
                          //进制地图移动
                          viewer.scene.screenSpaceCameraController.enableRotate = false;
                          viewer.scene.screenSpaceCameraController.enableZoom = false;
                          this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                          //鼠标点击事件
                          this.handler.setInputAction((event) => {
                            left_click = true
                            const pick = viewer.scene.pick(event.position);
                            if (pick) {
                              const _Entity_ = pick.id
                              //当前逻辑内 点击了球体
                              if (_Entity_._name != "centerPoint" && _Entity_._name != "boundaryPoint") {
                                viewer.entities.remove(edit_centerPoint);
                                viewer.entities.remove(edit_boundaryPoint);
                                const _filter_Entity = this.ellipsoidGatherArr.filter(item => item._id == _Entity_._id)
                                if (_filter_Entity.length == 0) return
                                //编辑的实体球
                                const edit_Entity = _filter_Entity[0]
                    
                                //先拿到当前实体球的id
                                edit_ellipsoidGatherId = edit_Entity._id
                                //开始遍历 拿到球在数组中的索引位置  便于之后的移动球体
                                for (let i = 0; i < this.ellipsoidGatherArr.length; i++) {
                                  if (this.ellipsoidGatherArr[i]._id == edit_ellipsoidGatherId) {
                                    this.ellipsoidGatherIndex = i
                                  }
                                }
                    
                                viewer.scene.screenSpaceCameraController.enableRotate = false;
                                viewer.scene.screenSpaceCameraController.enableZoom = false;
                    
                                //球体位置信息获取/半径/高度/笛卡尔
                                const { lng, lat, height, _cartesian3 } = this.getRadius(edit_Entity)
                                //绘制中心点 start
                                edit_centerPoint = viewer.entities.add({
                                  id: uuidv4(),
                                  name: 'centerPoint',
                                  position: Cesium.Cartesian3.fromDegrees(lng, lat, height),
                                  point: {
                                    color: Cesium.Color.RED.withAlpha(1),
                                    pixelSize: 10,
                                    outlineColor: Cesium.Color.WHITE,
                                    outlineWidth: 1
                                  }
                                });
                                //绘制中心点 end
                                //绘制边界点 start
                                const _cartesian3_ = {
                                  ..._cartesian3,
                                  x: _cartesian3.x - height
                                }
                                edit_boundaryPoint = viewer.entities.add({
                                  id: uuidv4(),
                                  name: 'boundaryPoint',
                                  position: _cartesian3_,
                                  point: {
                                    color: Cesium.Color.GREEN.withAlpha(1),
                                    pixelSize: 10,
                                    outlineColor: Cesium.Color.WHITE,
                                    outlineWidth: 1
                                  }
                                });
                                //绘制边界点 end
                              } else {
                                Point_type = _Entity_._name
                              }
                            }
                          }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
                    
                    
                          //对鼠标移动事件的监听 Start
                          this.handler.setInputAction((event) => {
                            if (left_click && Point_type == "centerPoint") {
                              console.log("挪动位置")
                              const ellipsoid = viewer.scene.globe.ellipsoid;
                              const cartesian = viewer.camera.pickEllipsoid(event.endPosition, ellipsoid);
                              this.ellipsoidGatherArr[this.ellipsoidGatherIndex].position = cartesian
                    
                              //球体位置信息获取/半径/高度/笛卡尔
                              const { lng, lat, height, _cartesian3 } = this.getRadius(this.ellipsoidGatherArr[this.ellipsoidGatherIndex])
                              edit_centerPoint.position = Cesium.Cartesian3.fromDegrees(lng, lat, height)
                              const _cartesian3_ = {
                                ..._cartesian3,
                                x: _cartesian3.x - height
                              }
                              edit_boundaryPoint.position = _cartesian3_
                            }
                            if (left_click && Point_type == "boundaryPoint") {
                              console.log("准备改变半径")
                              // const ellipsoid = viewer.scene.globe.ellipsoid;
                              // const cartesian = viewer.camera.pickEllipsoid(event.endPosition, ellipsoid);
                    
                    
                              //获取加载地形后对应的经纬度和高程：地标坐标
                              var ray = viewer.camera.getPickRay(event.endPosition);
                              var radiusCartesian = viewer.scene.globe.pick(ray, viewer.scene);
                              if (!radiusCartesian) {
                                return;
                              }
                              var centerCartesian = edit_centerPoint.position.getValue(Cesium.JulianDate.now());
                              //计算移动点与中心点的距离（单位米）
                              var centerTemp = viewer.scene.globe.ellipsoid.cartesianToCartographic(centerCartesian);
                              var radiusTemp = viewer.scene.globe.ellipsoid.cartesianToCartographic(radiusCartesian);
                              var geodesic = new Cesium.EllipsoidGeodesic();
                              geodesic.setEndPoints(centerTemp, radiusTemp);
                              var radius = geodesic.surfaceDistance;
                              //console.log("radius",radius);
                              //如果半径小于0,则不更新圆信息
                              if (radius <= 0) {
                                return;
                              }
                              this.ellipsoidGatherArr[this.ellipsoidGatherIndex].ellipsoid.radii = new Cesium.CallbackProperty(function (time, result) {
                                return new Cesium.Cartesian3(radius, radius, radius);
                              }, false);
                              const ellipsoid = viewer.scene.globe.ellipsoid;
                              const cartesian = viewer.camera.pickEllipsoid(event.endPosition, ellipsoid);
                              edit_boundaryPoint.position = cartesian
                            }
                          }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                          //对鼠标移动事件的监听 End
                    
                          //对鼠标抬起事件的监听 Start
                          this.handler.setInputAction((event) => {
                            left_click = false
                            Point_type = ""
                          }, Cesium.ScreenSpaceEventType.LEFT_UP);
                          //对鼠标抬起事件的监听 End
                          //鼠标右键点击 Start
                          this.handler.setInputAction((event) => {
                            viewer.scene.screenSpaceCameraController.enableRotate = true;
                            viewer.scene.screenSpaceCameraController.enableZoom = true;
                            left_click = false
                            Point_type = ""
                            viewer.entities.remove(edit_centerPoint);
                            viewer.entities.remove(edit_boundaryPoint);
                          }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
                          //鼠标右键点击 End
                        },
                        /**
                         * 清空
                         */
                        clear() {
                          this.viewer.entities.removeAll()
                          this.centerPoint = null
                          this.ellipsoidGather = null
                          this.ellipsoidGatherArr = []
                          this.ellipsoidGatherIndex = null
                        }
                      },
                    };`
      },
      {
        codeLanguage: "css",
        content: `.container {
                        width: 100%;
                        height: 100%;
                      
                        #cesiumContainer {
                          width: 100%;
                          height: 100%;
                        }
                      
                        .button-view {
                          position: fixed;
                          bottom: 10px;
                          right: 10px;
                          display: flex;
                      
                          .start {
                            width: 100px;
                            height: 40px;
                            margin-left: 10px;
                          }
                        }
                      }`
      }
    ]
  },
]