export default [
  {
    codeLanguage: "VUE",
    relyOn: [
      {
        label: "Map.js",
        url: "cesium/Map/index.js"
      }
    ],
    code: [
      {
        codeLanguage: "html",
        content: `<div class="container">
                            <div id="cesiumContainer"></div>
                            <div class="mapSelectionWindow">
                              <el-select
                                v-model="mapType"
                                @change="mapSelection"
                                placeholder="切换地图类型"
                              >
                                <el-option
                                  v-for="item in mapList"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                >
                                </el-option>
                              </el-select>
                            </div>
                          </div>`
      },
      {
        codeLanguage: "js",
        content: `import Map from "@/common/cesium/Map/index.js";
                          export default {
                            name: "MapsBase",
                            data() {
                              return {
                                viewer: null,
                                _Map: null,
                                mapList: [],
                                mapType: "",
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
                                this._Map = new Map(Cesium, this.viewer);
                                this.mapList = this._Map.list;
                              },
                              /**
                               * 地图切换
                               */
                              mapSelection(e) {
                                this.viewer.scene.imageryLayers.addImageryProvider(this._Map.init(e));
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
                            
                            .mapSelectionWindow {
                              width: 300px;
                              padding: 20px 20px 50px;
                              box-sizing: border-box;
                              background-color: rgba(0, 0, 0, 0.5);
                              position: fixed;
                              bottom: 0;
                              right: 0;
                              z-index: 2;
                              color: #fff;
                            }`
      }
    ]
  },
  {
    codeLanguage: "JS",
    relyOn: [
      {
        label: "BaiDuImageryProvider.js",
        url: "JavaScript/cesium/Map/module/BaiDuImageryProvider.js"
      },
      {
        label: "Map.js",
        url: "JavaScript/cesium/Map/index.js"
      },
      {
        label: "Utils.js",
        url: "JavaScript/cesium/Utils.js"
      },
      {
        label: "openBaseMaps.js",
        url: "JavaScript/Maps/Base/openBaseMaps.js"
      }
    ],
    code: [
      {
        codeLanguage: "js",
        content: `//创建地图选择面板（函数在依赖文件中）
                  openBaseMaps()
                  //删除窗口节点
                  function closeBaseMaps(id) {
                      const _Utils = new Utils()
                      _Utils.operationDom('remove', id)
                  }
                  //切换地图
                  function BaseMapsChange(){
                      const _Map = new Map(Cesium, viewer)
                      const _value = document.getElementById('BaseMaps-Operation-Window-select').value
                      viewer.scene.imageryLayers.addImageryProvider(_Map.init(_value));
                  }`
      }
    ]
  }
]