export default [
  {
    codeLanguage: "VUE",
    relyOn: [
      
    ],
    code: [
      {
        codeLanguage: "html",
        content: `<div class="container">
                    <div id="cesiumContainer"></div>
                  </div>`
      },
      {
        codeLanguage: "js",
        content: `export default {
                      name: "Start",
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
                        },`
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
]