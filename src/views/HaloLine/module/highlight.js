export default [
  {
    codeLanguage: "VUE",
    relyOn: [
      {
        label: "wuhan-line1.json",
        url: "file/HaloLine/geojson/wuhan-line1.json"
      },
      {
        label: "HaloLine.js",
        url: "file/HaloLine/HaloLine.js"
      }
    ],
    code: [
      {
        codeLanguage: "html",
        content: ` <div class="container">
                      <div id="cesiumContainer"></div>
                    </div>`
      },
      {
        codeLanguage: "js",
        content: `import HaloLine from "./HaloLine";
                  export default {
                    name: "HaloLine",
                    data() {
                      return {
                        viewer: null,
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
                  
                        this.start();
                      },
                      /**
                       * 开始
                       */
                      start() {
                        const Cesium = this.cesium;
                        const _HaloLine = new HaloLine(
                          Cesium,
                          this.viewer,
                          "/file/HaloLine/geojson/wuhan-line1.json",
                          "#ffa500"
                        );
                        _HaloLine.init();
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
                }`
      }
    ]
  },
  {
    codeLanguage: "JS",
    relyOn: [
      {
        label: "wuhan-line1.json",
        url: "JavaScript/file/HaloLine/geojson/wuhan-line1.json"
      },
    ],
    code: [
      {
        codeLanguage: "js",
        content: `/**
                    * 封装光晕线
                    */
                  class HaloLineClass {
                      /**
                        * 
                        * @param {*} Cesium 
                        * @param {*} viewer 
                        * @param {*} geojson 数据
                        * @param {*} color 线条颜色 （当前只是全局单色  可以在次根据 数据进行二次开发修改颜色）
                        * 也可以新增线条 粗细值  目前暂未传递  可能后期 进行动态数据来读取
                        */
                      constructor(Cesium, viewer, geojson, color) {
                          this.Cesium = Cesium
                          this.viewer = viewer
                          this.geojson = geojson
                          this.color = color
                      }
                  
                      init() {
                          const _this = this;
                          const Cesium = this.Cesium
                          //设置贴地效果
                          this.viewer.scene.globe.depthTestAgainstTerrain = false
                          //clampToGround 贴地需要
                          const promise = this.Cesium.GeoJsonDataSource.load(this.geojson, { clampToGround: true });
                          promise.then((dataSource) => {
                              this.viewer.dataSources.add(dataSource);
                              const entities = dataSource.entities.values;
                              entities.map((item, index) => {
                                  item.nameID = index
                                  item.polyline.width = 50
                                  item.polyline.material = new Cesium.PolylineGlowMaterialProperty({
                                      glowPower: 0.1,
                                      // color: Cesium.Color.ORANGERED.withAlpha(0.9),
                                      color: Cesium.Color.fromCssColorString(_this.color),
                                  })
                                  return item
                              })
                          });
                          this.viewer.flyTo(promise);
                      }
                  }
              /**
               * 调用光晕线
               */
              function HaloLine() {
                  const _HaloLine = new HaloLineClass(
                      Cesium,
                      viewer,
                      "/test/HaloLine/geojson/wuhan-line1.json",
                      "#ffa500"
                  );
                  _HaloLine.init();
              }
              //开始调用
              HaloLine()
        `
      }
    ]
  }
]