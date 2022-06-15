export default [
  {
    codeLanguage: "VUE",
    relyOn: [
      {
        label: "Entity.js",
        url: "cesium/Entity.js"
      },
    ],
    code: [
      {
        codeLanguage: "html",
        content: `<div class="container">
                    <div id="cesiumContainer"></div>
                    <div class="tip-view">
                      <div class="tip">鼠标右键点击 停止绘制</div>
                      <el-button class="button" type="primary" @click="start" plain
                        >开始绘制</el-button
                      >
                      <el-button class="button" type="primary" @click="testBold" plain
                        >测试加粗</el-button
                      >
                    </div>
                  </div>`
      },
      {
        codeLanguage: "js",
        content: `import Entity from "@/common/cesium/Entity.js";
                  export default {
                    name: "drawLine",
                    data() {
                      return {
                        viewer: null,
                        _Entity: null,
                        handler: null,
                        cesiumContainer: null,
                        EntityData: [],
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
                        this._Entity = new Entity(Cesium, this.viewer);
                        this.cesiumContainer = document.getElementById("cesiumContainer");
                        // this.start();
                  
                        //相机
                        this.viewer.camera.flyTo({
                          //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
                          destination: Cesium.Cartesian3.fromDegrees(
                            -75.59742934002912,
                            40.03824624260394,
                            5000
                          ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)
                          orientation: {
                            heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向
                            pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
                            roll: 0.0, // default value
                          },
                          duration: 3, //3秒到达战场
                        });
                      },
                      /**
                       * 开始
                       */
                      start() {
                        const Cesium = this.cesium;
                        this.handler = new Cesium.ScreenSpaceEventHandler(
                          this.viewer.scene.canvas
                        );
                        this.cesiumContainer.style.cursor = "crosshair";
                  
                        let lineEntity = null; //线实体
                        let positions = []; //位置
                  
                        /**
                         * 选择了椭球或地图，返回世界上椭球或地图表面上的点坐标。如果未选择椭球或地图，则返回undefined
                         * @return  Cartesian3
                         */
                        const pickEllipsoid = (eventPosition) => {
                          return this.viewer.scene.camera.pickEllipsoid(
                            eventPosition,
                            this.viewer.scene.globe.ellipsoid
                          );
                        };
                  
                        //鼠标左键点击
                        this.handler.setInputAction((event) => {
                          const cartesian = pickEllipsoid(event.position);
                          if (positions.length == 0) {
                            //复制此实例
                            positions.push(cartesian.clone());
                          }
                          positions.push(cartesian);
                        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                  
                        //鼠标移动
                        this.handler.setInputAction((event) => {
                          const cartesian = pickEllipsoid(event.endPosition);
                          if (positions.length >= 2) {
                            if (!Cesium.defined(lineEntity)) {
                              //值由回调函数延迟计算
                              const _positions = new Cesium.CallbackProperty(() => {
                                return positions;
                              }, false);
                  
                              lineEntity = this._Entity.createPolyline({
                                positions: _positions,
                                material: Cesium.Color.RED,
                                width: 5,
                              });
                            } else {
                              if (cartesian != undefined) {
                                positions.pop();
                                cartesian.y += 1 + Math.random();
                                positions.push(cartesian);
                              }
                            }
                          }
                        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                  
                        //鼠标右键点击
                        this.handler.setInputAction((event) => {
                          this.handler.destroy();
                          console.log(lineEntity);
                          this.EntityData.push(lineEntity);
                          console.log(this.EntityData);
                          this.cesiumContainer.style.cursor = "unset";
                        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
                      },
                      /**
                       * 测试加粗
                       */
                      testBold() {
                        this.EntityData.map((item) => {
                          item.polyline.width = 30;
                        });
                      },
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
                    .tip-view {
                      position: fixed;
                      bottom: 0;
                      right: 0;
                      background-color: rgba(255, 255, 255, 1);
                      z-index: 2;
                      padding: 20px;
                      border-radius: 10px 0 0 0;
                      .tip {
                        color: #e6a23c;
                      }
                      .button {
                        margin-top: 10px;
                      }
                    }
                  }`
      }
    ]
  },
]