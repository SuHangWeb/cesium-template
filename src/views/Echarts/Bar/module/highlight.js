export default [
  {
    codeLanguage: "VUE",
    relyOn: [
      {
        label: "uuid（npm）",
        url: "https://www.npmjs.com/package/uuid",
        externalLinks: true
      },
      {
        label: "Entity.js",
        url: "cesium/Entity.js"
      },
      {
        label: "Utils.js",
        url: "cesium/Utils.js"
      },
      {
        label: "Transform.js",
        url: "cesium/Transform.js"
      },
      {
        label: "Echarts.js",
        url: "cesium/Echarts.js"
      },
      {
        label: "data.js",
        url: "Vue/Echarts/Bar/data.js"
      },
    ],
    code: [
      {
        codeLanguage: "html",
        content: ` <div class="container" id="echarts">
                    <div id="cesiumContainer"></div>
                  </div>`
      },
      {
        codeLanguage: "js",
        content: `import Entity from "@/common/cesium/Entity.js";
                  import Echarts3D from "@/common/cesium/Echarts.js";
                  import echartsData from "./module/data";
                  export default {
                    name: "echartsBar",
                    data() {
                      return {
                        viewer: null,
                        _Entity: null,
                        _Echarts3D: null,
                        echartsData: echartsData,
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
                        this._Echarts3D = new Echarts3D(Cesium, this.viewer);
                        this.start();
                      },
                      /**
                       * 开始
                       */
                      start() {
                        const Cesium = this.cesium;
                        this._Echarts3D.createBar({
                          data: this.echartsData,
                          tooltip: true,
                          nodeId: "echarts",
                          radius: 50,
                        });
                  
                        //相机(定位到了 沈河区惠工广场)
                        this.viewer.camera.flyTo({
                          //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
                          destination: Cesium.Cartesian3.fromDegrees(
                            123.43382736814452,
                            41.811201240193164,
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
                  }


                  /*图表*/
                    .echarts3D-Bar-Info-Window {
                      width: 200px;
                      background-color: #fff;
                      z-index: 2;
                      position: fixed;
                      // top: 100px;
                      // right: 10px;
                      padding: 10px;
                      box-sizing: border-box;
                      border-radius: 6px;

                      .echarts3D-Bar-Info-Window-Title {
                        font-size: 16px;
                        color: #333;
                        padding-bottom: 5px;
                      }

                      .echarts3D-Bar-Info-Window-Box {
                        .echarts3D-Bar-Info-Window-Item {
                          display: flex;
                          align-items: center;
                          justify-content: space-between;
                          margin: 5px 0;

                          .echarts3D-Bar-Info-Window-Item-Label {
                            display: flex;
                            align-items: center;

                            .echarts3D-Bar-Info-Window-Item-Spot {
                              width: 8px;
                              height: 8px;
                              border-radius: 50%;
                              margin-right: 5px;
                            }

                            .echarts3D-Bar-Info-Window-Item-Text {
                              font-size: 14px;
                              color: #666;
                            }
                          }

                          .echarts3D-Bar-Info-Window-Item-Value {
                            font-size: 14px;
                            font-weight: bold;
                            color: #333;
                          }
                        }
                      }

                      .echarts3D-Bar-Info-Window-triangle {
                        // // 下三角
                        // position: absolute;
                        // bottom: 0;
                        // left: 50%;
                        // border: 8px solid transparent;
                        // border-top-color: #fff;
                        // border-bottom: 0;
                        // margin: 0 0 -8px -8px;

                        // 左下三角
                        position: absolute;
                        bottom: 0;
                        left: 30px;
                        border: 16px solid transparent;
                        border-top-color: #fff;
                        border-bottom: 0;
                        margin: 0 0 -16px -16px;
                        border-left: 0;
                        // //右下三角
                        // position: absolute;
                        // bottom: 0;
                        // left: 50%;
                        // border: 34px solid transparent;
                        // border-top-color: #0094ff;
                        // border-bottom: 0;
                        // margin: 0 0 -34px -34px;
                        // border-right: 0;
                      }
                    }
                    `
      }
    ]
  },
  {
    codeLanguage: "JS",
    relyOn: [
      {
        label: "uuid.min.js",
        url: "JavaScript/cesium/Tripartite/uuid-js/uuid.min.js"
      },
      {
        label: "Entity.js",
        url: "JavaScript/cesium/Entity.js"
      },
      {
        label: "Utils.js",
        url: "JavaScript/cesium/Utils.js"
      },
      {
        label: "Transform.js",
        url: "JavaScript/cesium/Transform.js"
      },
      {
        label: "Echarts.js",
        url: "JavaScript/cesium/Echarts.js"
      },
    ],
    code: [
      {
        codeLanguage: "js",
        content: `function columnar_statistical_chart() {
                      const _Echarts3D = new Echarts3D(Cesium, viewer);
                      const data = [
                          {
                              name: "惠工广场",
                              position: [123.43382736814452, 41.811201240193164, 0],
                              data: [
                                  {
                                      label: "疑似病例",
                                      value: 200,
                                  },
                                  {
                                      label: "确诊病例",
                                      value: 100,
                                  },
                                  {
                                      label: "治疗病例",
                                      value: 100,
                                  },
                              ],
                          },
                          {
                              name: "沈阳北站",
                              position: [123.4297225289727, 41.816902281612464, 0],
                              data: [
                                  {
                                      label: "疑似病例",
                                      value: 50,
                                  },
                                  {
                                      label: "确诊病例",
                                      value: 120,
                                  },
                                  {
                                      label: "治疗病例",
                                      value: 240,
                                  },
                              ],
                          },
                      ]
                      _Echarts3D.createBar({
                          data,
                          tooltip: true,
                          nodeId: "MainCenter",
                      });
                      //相机(定位到了 沈河区惠工广场)
                      viewer.camera.flyTo({
                          //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
                          destination: Cesium.Cartesian3.fromDegrees(
                              123.43382736814452,
                              41.811201240193164,
                              5000
                          ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)
                          orientation: {
                              heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向
                              pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
                              roll: 0.0, // default value
                          },
                          duration: 3, //3秒到达战场
                      });
                  }
                  // 开始
                  columnar_statistical_chart()
                  `
      },
      {
        codeLanguage: "css",
        content: `
                  .echarts3D-Bar-Info-Window {
                      width: 200px;
                      background-color: #fff;
                      z-index: 2;
                      position: fixed;
                      
                      padding: 10px;
                      box-sizing: border-box;
                      border-radius: 6px;
                    
                      .echarts3D-Bar-Info-Window-Title {
                        font-size: 16px;
                        color: #333;
                        padding-bottom: 5px;
                      }
                    
                      .echarts3D-Bar-Info-Window-Box {
                        .echarts3D-Bar-Info-Window-Item {
                          display: flex;
                          align-items: center;
                          justify-content: space-between;
                          margin: 5px 0;
                    
                          .echarts3D-Bar-Info-Window-Item-Label {
                            display: flex;
                            align-items: center;
                    
                            .echarts3D-Bar-Info-Window-Item-Spot {
                              width: 8px;
                              height: 8px;
                              border-radius: 50%;
                              margin-right: 5px;
                            }
                    
                            .echarts3D-Bar-Info-Window-Item-Text {
                              font-size: 14px;
                              color: #666;
                            }
                          }
                    
                          .echarts3D-Bar-Info-Window-Item-Value {
                            font-size: 14px;
                            font-weight: bold;
                            color: #333;
                          }
                        }
                      }
                    
                      .echarts3D-Bar-Info-Window-triangle {
                        position: absolute;
                        bottom: 0;
                        left: 30px;
                        border: 16px solid transparent;
                        border-top-color: #fff;
                        border-bottom: 0;
                        margin: 0 0 -16px -16px;
                        border-left: 0;
                      }
                    }`
      }
    ]
  },
]