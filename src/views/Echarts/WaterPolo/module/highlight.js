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
        content: `<div class="container" id="echarts">
                    <div id="cesiumContainer"></div>
                  </div>`
      },
      {
        codeLanguage: "js",
        content: `import Entity from "@/common/cesium/Entity.js";
                  import Echarts3D from "@/common/cesium/Echarts.js";
                  import echartsData from "./module/data";
                  export default {
                    name: "echartsWaterPolo",
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
                        this._Echarts3D.createWaterPolo({
                          nodeId: "echarts",
                          data: echartsData,
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
                  
                  
                  /*水球*/
                  @keyframes water-waves {
                    0% {
                      transform: rotate(0deg);
                    }

                    100% {
                      transform: rotate(360deg);
                    }
                  }

                  .ball {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    z-index: 2;

                    width: 200px;
                    height: 200px;
                    border: 1px solid #ccc;
                    border-radius: 50%;
                    margin: auto;
                    overflow: hidden;

                    .water {
                      position: absolute;
                      width: 200%;
                      height: 200%;
                      animation: water-waves linear infinite;

                      &.water1 {
                        background-color: #33cfff;
                        top: 40%;
                        left: -25%;
                        opacity: 0.7;
                        border-radius: 40%;
                        animation-duration: 5s;
                      }

                      &.water2 {
                        background-color: #0eaffe;
                        top: 45%;
                        left: -35%;
                        border-radius: 35%;
                        opacity: 0.5;
                        animation-duration: 7s;
                      }

                      &.water3 {
                        top: 50%;
                        left: -35%;
                        opacity: 0.3;
                        background-color: #0f7ae4;
                        border-radius: 33%;
                        animation-duration: 11s;
                      }
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
        content: `function openWaterPolo() {
                    const _Echarts3D = new Echarts3D(Cesium, viewer);
                    const echartsData = [
                        {
                            name: "惠工广场",
                            position: [123.43382736814452, 41.811201240193164, 0],
                            data: 50,
                            // color: "red"
                        },
                        {
                            name: "沈阳北站",
                            position: [123.4297225289727, 41.816902281612464, 0],
                            data: 10,
                        },
                        {
                            name: "市府广场",
                            position: [123.42781540061213, 41.802398394932275, 0],
                            data: 80,
                        },
                    ]
                
                    _Echarts3D.createWaterPolo({
                        nodeId: "MainCenter",
                        data: echartsData,
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
                }`
      }
    ]
  },
]