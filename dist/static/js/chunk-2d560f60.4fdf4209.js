(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d560f60"],{"5c37":function(e,n,i){"use strict";i("7607")},7607:function(e,n,i){},"7d2b":function(e,n,i){"use strict";i.r(n);var t=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},o=[function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("div",{staticClass:"container"},[i("div",{attrs:{id:"cesiumContainer"}})])}],r=i("c15f"),s=i("a35b"),a=(i("6a08"),i("d75e"),i("8a84"),function(){function e(n,i,t,o){Object(r["a"])(this,e),this.Cesium=n,this.viewer=i,this.geojson=t,this.color=o}return Object(s["a"])(e,[{key:"init",value:function(){var e=this,n=this,i=this.Cesium;this.viewer.scene.globe.depthTestAgainstTerrain=!1;var t=this.Cesium.GeoJsonDataSource.load(this.geojson,{clampToGround:!0});t.then((function(t){e.viewer.dataSources.add(t);var o=t.entities.values;o.map((function(e,t){return e.nameID=t,e.polyline.width=50,e.polyline.material=new i.PolylineGlowMaterialProperty({glowPower:.1,color:i.Color.fromCssColorString(n.color)}),e}))})),this.viewer.flyTo(t)}}]),e}()),l=a,c=[{codeLanguage:"VUE",relyOn:[{label:"wuhan-line1.json",url:"file/HaloLine/geojson/wuhan-line1.json"},{label:"HaloLine.js",url:"file/HaloLine/HaloLine.js"}],code:[{codeLanguage:"html",content:' <div class="container">\n                      <div id="cesiumContainer"></div>\n                    </div>'},{codeLanguage:"js",content:'import HaloLine from "./HaloLine";\n                  export default {\n                    name: "HaloLine",\n                    data() {\n                      return {\n                        viewer: null,\n                      };\n                    },\n                    mounted() {\n                      this.init();\n                    },\n                    methods: {\n                      init() {\n                        const Cesium = this.cesium;\n                        Cesium.Ion.defaultAccessToken = process.env.VUE_APP_TOKEN;\n                        this.viewer = new Cesium.Viewer("cesiumContainer", {\n                          imageryProvider: new Cesium.ArcGisMapServerImageryProvider({\n                            url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",\n                          }),\n                          terrainProvider: new Cesium.CesiumTerrainProvider({\n                            //加载火星在线地形\n                            url: "http://data.marsgis.cn/terrain",\n                          }),\n                          shouldAnimate: true,\n                          infoBox: false,\n                          selectionIndicator: false,\n                        });\n                        //设置贴地效果\n                        this.viewer.scene.globe.depthTestAgainstTerrain = false;\n                  \n                        this.start();\n                      },\n                      /**\n                       * 开始\n                       */\n                      start() {\n                        const Cesium = this.cesium;\n                        const _HaloLine = new HaloLine(\n                          Cesium,\n                          this.viewer,\n                          "/file/HaloLine/geojson/wuhan-line1.json",\n                          "#ffa500"\n                        );\n                        _HaloLine.init();\n                      },\n                    },\n                  };'},{codeLanguage:"css",content:".container {\n                  width: 100%;\n                  height: 100%;\n                  #cesiumContainer {\n                    width: 100%;\n                    height: 100%;\n                  }\n                }"}]},{codeLanguage:"JS",relyOn:[{label:"wuhan-line1.json",url:"JavaScript/file/HaloLine/geojson/wuhan-line1.json"}],code:[{codeLanguage:"js",content:'/**\n                    * 封装光晕线\n                    */\n                  class HaloLineClass {\n                      /**\n                        * \n                        * @param {*} Cesium \n                        * @param {*} viewer \n                        * @param {*} geojson 数据\n                        * @param {*} color 线条颜色 （当前只是全局单色  可以在次根据 数据进行二次开发修改颜色）\n                        * 也可以新增线条 粗细值  目前暂未传递  可能后期 进行动态数据来读取\n                        */\n                      constructor(Cesium, viewer, geojson, color) {\n                          this.Cesium = Cesium\n                          this.viewer = viewer\n                          this.geojson = geojson\n                          this.color = color\n                      }\n                  \n                      init() {\n                          const _this = this;\n                          const Cesium = this.Cesium\n                          //设置贴地效果\n                          this.viewer.scene.globe.depthTestAgainstTerrain = false\n                          //clampToGround 贴地需要\n                          const promise = this.Cesium.GeoJsonDataSource.load(this.geojson, { clampToGround: true });\n                          promise.then((dataSource) => {\n                              this.viewer.dataSources.add(dataSource);\n                              const entities = dataSource.entities.values;\n                              entities.map((item, index) => {\n                                  item.nameID = index\n                                  item.polyline.width = 50\n                                  item.polyline.material = new Cesium.PolylineGlowMaterialProperty({\n                                      glowPower: 0.1,\n                                      // color: Cesium.Color.ORANGERED.withAlpha(0.9),\n                                      color: Cesium.Color.fromCssColorString(_this.color),\n                                  })\n                                  return item\n                              })\n                          });\n                          this.viewer.flyTo(promise);\n                      }\n                  }\n              /**\n               * 调用光晕线\n               */\n              function HaloLine() {\n                  const _HaloLine = new HaloLineClass(\n                      Cesium,\n                      viewer,\n                      "/test/HaloLine/geojson/wuhan-line1.json",\n                      "#ffa500"\n                  );\n                  _HaloLine.init();\n              }\n              //开始调用\n              HaloLine()\n        '}]}],u={name:"HaloLine",data:function(){return{viewer:null}},created:function(){this.$store.dispatch("highlight/set_code",c)},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken=Object({NODE_ENV:"production",VUE_APP_BASE_API:"/prod-api",BASE_URL:""}).VUE_APP_TOKEN,this.viewer=new e.Viewer("cesiumContainer",{imageryProvider:new e.ArcGisMapServerImageryProvider({url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"}),terrainProvider:new e.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),shouldAnimate:!0,infoBox:!1,selectionIndicator:!1}),this.viewer.scene.globe.depthTestAgainstTerrain=!1,this.start()},start:function(){var e=this.cesium,n=new l(e,this.viewer,"/file/HaloLine/geojson/wuhan-line1.json","#ffa500");n.init()}}},h=u,m=(i("5c37"),i("cba8")),d=Object(m["a"])(h,t,o,!1,null,"ce6366e8",null);n["default"]=d.exports},a35b:function(e,n,i){"use strict";function t(e,n){for(var i=0;i<n.length;i++){var t=n[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function o(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}i.d(n,"a",(function(){return o}))},c15f:function(e,n,i){"use strict";i.d(n,"a",(function(){return t}));i("5ce7");function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}}}]);