(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6061ec6e"],{"4df2":function(n,e,t){},b426:function(n,e,t){"use strict";t.r(e);var a=function(){var n=this,e=n.$createElement;n._self._c;return n._m(0)},i=[function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"container",attrs:{id:"echarts"}},[t("div",{attrs:{id:"cesiumContainer"}})])}],r=t("9e48"),o=t("5f85"),s=[{name:"惠工广场",position:[123.43382736814452,41.811201240193164,0],data:[{label:"疑似病例",value:200},{label:"确诊病例",value:100},{label:"治疗病例",value:100}]},{name:"沈阳北站",position:[123.4297225289727,41.816902281612464,0],data:[{label:"疑似病例",value:50},{label:"确诊病例",value:120},{label:"治疗病例",value:240}]},{name:"市府广场",position:[123.42781540061213,41.802398394932275,0],data:[{label:"疑似病例",value:50},{label:"确诊病例",value:120},{label:"治疗病例",value:240}]}],l=[{codeLanguage:"VUE",relyOn:[{label:"uuid（npm）",url:"https://www.npmjs.com/package/uuid",externalLinks:!0},{label:"Entity.js",url:"cesium/Entity.js"},{label:"Utils.js",url:"cesium/Utils.js"},{label:"Transform.js",url:"cesium/Transform.js"},{label:"Echarts.js",url:"cesium/Echarts.js"},{label:"data.js",url:"Vue/Echarts/Bar/data.js"}],code:[{codeLanguage:"html",content:' <div class="container" id="echarts">\n                    <div id="cesiumContainer"></div>\n                  </div>'},{codeLanguage:"js",content:'import Entity from "@/common/cesium/Entity.js";\n                  import Echarts3D from "@/common/cesium/Echarts.js";\n                  import echartsData from "./module/data";\n                  export default {\n                    name: "echartsBar",\n                    data() {\n                      return {\n                        viewer: null,\n                        _Entity: null,\n                        _Echarts3D: null,\n                        echartsData: echartsData,\n                      };\n                    },\n                    mounted() {\n                      this.init();\n                    },\n                    methods: {\n                      init() {\n                        const Cesium = this.cesium;\n                        Cesium.Ion.defaultAccessToken = process.env.VUE_APP_TOKEN;\n                        this.viewer = new Cesium.Viewer("cesiumContainer", {\n                          imageryProvider: new Cesium.ArcGisMapServerImageryProvider({\n                            url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",\n                          }),\n                          terrainProvider: new Cesium.CesiumTerrainProvider({\n                            //加载火星在线地形\n                            url: "http://data.marsgis.cn/terrain",\n                          }),\n                          shouldAnimate: true,\n                          infoBox: false,\n                          selectionIndicator: false,\n                        });\n                        //设置贴地效果\n                        this.viewer.scene.globe.depthTestAgainstTerrain = false;\n                        this._Entity = new Entity(Cesium, this.viewer);\n                        this._Echarts3D = new Echarts3D(Cesium, this.viewer);\n                        this.start();\n                      },\n                      /**\n                       * 开始\n                       */\n                      start() {\n                        const Cesium = this.cesium;\n                        this._Echarts3D.createBar({\n                          data: this.echartsData,\n                          tooltip: true,\n                          nodeId: "echarts",\n                          radius: 50,\n                        });\n                  \n                        //相机(定位到了 沈河区惠工广场)\n                        this.viewer.camera.flyTo({\n                          //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧\n                          destination: Cesium.Cartesian3.fromDegrees(\n                            123.43382736814452,\n                            41.811201240193164,\n                            5000\n                          ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)\n                          orientation: {\n                            heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向\n                            pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉\n                            roll: 0.0, // default value\n                          },\n                          duration: 3, //3秒到达战场\n                        });\n                      },\n                    },\n                  };'},{codeLanguage:"css",content:".container {\n                    width: 100%;\n                    height: 100%;\n                    #cesiumContainer {\n                      width: 100%;\n                      height: 100%;\n                    }\n                  }\n\n\n                  /*图表*/\n                    .echarts3D-Bar-Info-Window {\n                      width: 200px;\n                      background-color: #fff;\n                      z-index: 2;\n                      position: fixed;\n                      // top: 100px;\n                      // right: 10px;\n                      padding: 10px;\n                      box-sizing: border-box;\n                      border-radius: 6px;\n\n                      .echarts3D-Bar-Info-Window-Title {\n                        font-size: 16px;\n                        color: #333;\n                        padding-bottom: 5px;\n                      }\n\n                      .echarts3D-Bar-Info-Window-Box {\n                        .echarts3D-Bar-Info-Window-Item {\n                          display: flex;\n                          align-items: center;\n                          justify-content: space-between;\n                          margin: 5px 0;\n\n                          .echarts3D-Bar-Info-Window-Item-Label {\n                            display: flex;\n                            align-items: center;\n\n                            .echarts3D-Bar-Info-Window-Item-Spot {\n                              width: 8px;\n                              height: 8px;\n                              border-radius: 50%;\n                              margin-right: 5px;\n                            }\n\n                            .echarts3D-Bar-Info-Window-Item-Text {\n                              font-size: 14px;\n                              color: #666;\n                            }\n                          }\n\n                          .echarts3D-Bar-Info-Window-Item-Value {\n                            font-size: 14px;\n                            font-weight: bold;\n                            color: #333;\n                          }\n                        }\n                      }\n\n                      .echarts3D-Bar-Info-Window-triangle {\n                        // // 下三角\n                        // position: absolute;\n                        // bottom: 0;\n                        // left: 50%;\n                        // border: 8px solid transparent;\n                        // border-top-color: #fff;\n                        // border-bottom: 0;\n                        // margin: 0 0 -8px -8px;\n\n                        // 左下三角\n                        position: absolute;\n                        bottom: 0;\n                        left: 30px;\n                        border: 16px solid transparent;\n                        border-top-color: #fff;\n                        border-bottom: 0;\n                        margin: 0 0 -16px -16px;\n                        border-left: 0;\n                        // //右下三角\n                        // position: absolute;\n                        // bottom: 0;\n                        // left: 50%;\n                        // border: 34px solid transparent;\n                        // border-top-color: #0094ff;\n                        // border-bottom: 0;\n                        // margin: 0 0 -34px -34px;\n                        // border-right: 0;\n                      }\n                    }\n                    "}]},{codeLanguage:"JS",relyOn:[{label:"uuid.min.js",url:"JavaScript/cesium/Tripartite/uuid-js/uuid.min.js"},{label:"Entity.js",url:"JavaScript/cesium/Entity.js"},{label:"Utils.js",url:"JavaScript/cesium/Utils.js"},{label:"Transform.js",url:"JavaScript/cesium/Transform.js"},{label:"Echarts.js",url:"JavaScript/cesium/Echarts.js"}],code:[{codeLanguage:"js",content:'function columnar_statistical_chart() {\n                      const _Echarts3D = new Echarts3D(Cesium, viewer);\n                      const data = [\n                          {\n                              name: "惠工广场",\n                              position: [123.43382736814452, 41.811201240193164, 0],\n                              data: [\n                                  {\n                                      label: "疑似病例",\n                                      value: 200,\n                                  },\n                                  {\n                                      label: "确诊病例",\n                                      value: 100,\n                                  },\n                                  {\n                                      label: "治疗病例",\n                                      value: 100,\n                                  },\n                              ],\n                          },\n                          {\n                              name: "沈阳北站",\n                              position: [123.4297225289727, 41.816902281612464, 0],\n                              data: [\n                                  {\n                                      label: "疑似病例",\n                                      value: 50,\n                                  },\n                                  {\n                                      label: "确诊病例",\n                                      value: 120,\n                                  },\n                                  {\n                                      label: "治疗病例",\n                                      value: 240,\n                                  },\n                              ],\n                          },\n                      ]\n                      _Echarts3D.createBar({\n                          data,\n                          tooltip: true,\n                          nodeId: "MainCenter",\n                      });\n                      //相机(定位到了 沈河区惠工广场)\n                      viewer.camera.flyTo({\n                          //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧\n                          destination: Cesium.Cartesian3.fromDegrees(\n                              123.43382736814452,\n                              41.811201240193164,\n                              5000\n                          ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)\n                          orientation: {\n                              heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向\n                              pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉\n                              roll: 0.0, // default value\n                          },\n                          duration: 3, //3秒到达战场\n                      });\n                  }\n                  // 开始\n                  columnar_statistical_chart()\n                  '},{codeLanguage:"css",content:"\n                  .echarts3D-Bar-Info-Window {\n                      width: 200px;\n                      background-color: #fff;\n                      z-index: 2;\n                      position: fixed;\n                      \n                      padding: 10px;\n                      box-sizing: border-box;\n                      border-radius: 6px;\n                    \n                      .echarts3D-Bar-Info-Window-Title {\n                        font-size: 16px;\n                        color: #333;\n                        padding-bottom: 5px;\n                      }\n                    \n                      .echarts3D-Bar-Info-Window-Box {\n                        .echarts3D-Bar-Info-Window-Item {\n                          display: flex;\n                          align-items: center;\n                          justify-content: space-between;\n                          margin: 5px 0;\n                    \n                          .echarts3D-Bar-Info-Window-Item-Label {\n                            display: flex;\n                            align-items: center;\n                    \n                            .echarts3D-Bar-Info-Window-Item-Spot {\n                              width: 8px;\n                              height: 8px;\n                              border-radius: 50%;\n                              margin-right: 5px;\n                            }\n                    \n                            .echarts3D-Bar-Info-Window-Item-Text {\n                              font-size: 14px;\n                              color: #666;\n                            }\n                          }\n                    \n                          .echarts3D-Bar-Info-Window-Item-Value {\n                            font-size: 14px;\n                            font-weight: bold;\n                            color: #333;\n                          }\n                        }\n                      }\n                    \n                      .echarts3D-Bar-Info-Window-triangle {\n                        position: absolute;\n                        bottom: 0;\n                        left: 30px;\n                        border: 16px solid transparent;\n                        border-top-color: #fff;\n                        border-bottom: 0;\n                        margin: 0 0 -16px -16px;\n                        border-left: 0;\n                      }\n                    }"}]}],c={name:"echartsBar",data:function(){return{viewer:null,_Entity:null,_Echarts3D:null,echartsData:s}},created:function(){this.$store.dispatch("highlight/set_code",l)},mounted:function(){this.init()},methods:{init:function(){var n=this.cesium;n.Ion.defaultAccessToken=Object({NODE_ENV:"production",VUE_APP_BASE_API:"/prod-api",BASE_URL:""}).VUE_APP_TOKEN,this.viewer=new n.Viewer("cesiumContainer",{imageryProvider:new n.ArcGisMapServerImageryProvider({url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"}),terrainProvider:new n.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),shouldAnimate:!0,infoBox:!1,selectionIndicator:!1}),this.viewer.scene.globe.depthTestAgainstTerrain=!1,this._Entity=new r["a"](n,this.viewer),this._Echarts3D=new o["a"](n,this.viewer),this.start()},start:function(){var n=this.cesium;this._Echarts3D.createBar({data:this.echartsData,tooltip:!0,nodeId:"echarts",radius:50}),this.viewer.camera.flyTo({destination:n.Cartesian3.fromDegrees(123.43382736814452,41.811201240193164,5e3),orientation:{heading:n.Math.toRadians(0),pitch:n.Math.toRadians(-90),roll:0},duration:3})}}},d=c,u=(t("f8f5"),t("cba8")),h=Object(u["a"])(d,a,i,!1,null,"07e190dd",null);e["default"]=h.exports},f8f5:function(n,e,t){"use strict";t("4df2")}}]);