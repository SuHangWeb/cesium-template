(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51dd4be0"],{"3be4":function(n,e,t){},"65d9":function(n,e,t){"use strict";t("3be4")},"68fad":function(n,e,t){var i=t("8c4d"),s=t("7cdd"),r=t("fb63");i({target:"Array",proto:!0},{fill:s}),r("fill")},"7cdd":function(n,e,t){"use strict";var i=t("8c3e"),s=t("b70d"),r=t("0d01");n.exports=function(n){var e=i(this),t=r(e),a=arguments.length,o=s(a>1?arguments[1]:void 0,t),c=a>2?arguments[2]:void 0,l=void 0===c?t:s(c,t);while(l>o)e[o++]=n;return e}},a35b:function(n,e,t){"use strict";function i(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}function s(n,e,t){return e&&i(n.prototype,e),t&&i(n,t),Object.defineProperty(n,"prototype",{writable:!1}),n}t.d(e,"a",(function(){return s}))},c15f:function(n,e,t){"use strict";t.d(e,"a",(function(){return i}));t("f4cf");function i(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}},d94c:function(n,e,t){"use strict";t.r(e);var i=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"container"},[t("div",{attrs:{id:"cesiumContainer"}}),t("div",{staticClass:"tip-view"},[t("div",{staticClass:"tip"},[n._v("鼠标右键点击 停止绘制")]),t("el-button",{staticClass:"button",attrs:{type:"primary",plain:""},on:{click:n.start}},[n._v("开始绘制")]),t("el-button",{staticClass:"button",attrs:{type:"primary",plain:""},on:{click:n.testBold}},[n._v("测试加粗")])],1)])},s=[],r=(t("840d"),t("9e48")),a=[{codeLanguage:"VUE",relyOn:[{label:"Entity.js",url:"cesium/Entity.js"}],code:[{codeLanguage:"html",content:'<div class="container">\n                    <div id="cesiumContainer"></div>\n                    <div class="tip-view">\n                      <div class="tip">鼠标右键点击 停止绘制</div>\n                      <el-button class="button" type="primary" @click="start" plain\n                        >开始绘制</el-button\n                      >\n                      <el-button class="button" type="primary" @click="testBold" plain\n                        >测试加粗</el-button\n                      >\n                    </div>\n                  </div>'},{codeLanguage:"js",content:'import Entity from "@/common/cesium/Entity.js";\n                  export default {\n                    name: "drawLine",\n                    data() {\n                      return {\n                        viewer: null,\n                        _Entity: null,\n                        handler: null,\n                        cesiumContainer: null,\n                        EntityData: [],\n                      };\n                    },\n                    mounted() {\n                      this.init();\n                    },\n                    methods: {\n                      init() {\n                        const Cesium = this.cesium;\n                        Cesium.Ion.defaultAccessToken = process.env.VUE_APP_TOKEN;\n                        this.viewer = new Cesium.Viewer("cesiumContainer", {\n                          imageryProvider: new Cesium.ArcGisMapServerImageryProvider({\n                            url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",\n                          }),\n                          terrainProvider: new Cesium.CesiumTerrainProvider({\n                            //加载火星在线地形\n                            url: "http://data.marsgis.cn/terrain",\n                          }),\n                          shouldAnimate: true,\n                          infoBox: false,\n                          selectionIndicator: false,\n                        });\n                        //设置贴地效果\n                        this.viewer.scene.globe.depthTestAgainstTerrain = false;\n                        this._Entity = new Entity(Cesium, this.viewer);\n                        this.cesiumContainer = document.getElementById("cesiumContainer");\n                        // this.start();\n                  \n                        //相机\n                        this.viewer.camera.flyTo({\n                          //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧\n                          destination: Cesium.Cartesian3.fromDegrees(\n                            -75.59742934002912,\n                            40.03824624260394,\n                            5000\n                          ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)\n                          orientation: {\n                            heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向\n                            pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉\n                            roll: 0.0, // default value\n                          },\n                          duration: 3, //3秒到达战场\n                        });\n                      },\n                      /**\n                       * 开始\n                       */\n                      start() {\n                        const Cesium = this.cesium;\n                        this.handler = new Cesium.ScreenSpaceEventHandler(\n                          this.viewer.scene.canvas\n                        );\n                        this.cesiumContainer.style.cursor = "crosshair";\n                  \n                        let lineEntity = null; //线实体\n                        let positions = []; //位置\n                  \n                        /**\n                         * 选择了椭球或地图，返回世界上椭球或地图表面上的点坐标。如果未选择椭球或地图，则返回undefined\n                         * @return  Cartesian3\n                         */\n                        const pickEllipsoid = (eventPosition) => {\n                          return this.viewer.scene.camera.pickEllipsoid(\n                            eventPosition,\n                            this.viewer.scene.globe.ellipsoid\n                          );\n                        };\n                  \n                        //鼠标左键点击\n                        this.handler.setInputAction((event) => {\n                          const cartesian = pickEllipsoid(event.position);\n                          if (positions.length == 0) {\n                            //复制此实例\n                            positions.push(cartesian.clone());\n                          }\n                          positions.push(cartesian);\n                        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);\n                  \n                        //鼠标移动\n                        this.handler.setInputAction((event) => {\n                          const cartesian = pickEllipsoid(event.endPosition);\n                          if (positions.length >= 2) {\n                            if (!Cesium.defined(lineEntity)) {\n                              //值由回调函数延迟计算\n                              const _positions = new Cesium.CallbackProperty(() => {\n                                return positions;\n                              }, false);\n                  \n                              lineEntity = this._Entity.createPolyline({\n                                positions: _positions,\n                                material: Cesium.Color.RED,\n                                width: 5,\n                              });\n                            } else {\n                              if (cartesian != undefined) {\n                                positions.pop();\n                                cartesian.y += 1 + Math.random();\n                                positions.push(cartesian);\n                              }\n                            }\n                          }\n                        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);\n                  \n                        //鼠标右键点击\n                        this.handler.setInputAction((event) => {\n                          this.handler.destroy();\n                          console.log(lineEntity);\n                          this.EntityData.push(lineEntity);\n                          console.log(this.EntityData);\n                          this.cesiumContainer.style.cursor = "unset";\n                        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);\n                      },\n                      /**\n                       * 测试加粗\n                       */\n                      testBold() {\n                        this.EntityData.map((item) => {\n                          item.polyline.width = 30;\n                        });\n                      },\n                    },\n                  };'},{codeLanguage:"css",content:".container {\n                    width: 100%;\n                    height: 100%;\n                    #cesiumContainer {\n                      width: 100%;\n                      height: 100%;\n                    }\n                    .tip-view {\n                      position: fixed;\n                      bottom: 0;\n                      right: 0;\n                      background-color: rgba(255, 255, 255, 1);\n                      z-index: 2;\n                      padding: 20px;\n                      border-radius: 10px 0 0 0;\n                      .tip {\n                        color: #e6a23c;\n                      }\n                      .button {\n                        margin-top: 10px;\n                      }\n                    }\n                  }"}]}],o={name:"drawLine",data:function(){return{viewer:null,_Entity:null,handler:null,cesiumContainer:null,EntityData:[]}},created:function(){this.$store.dispatch("highlight/set_code",a)},mounted:function(){this.init()},methods:{init:function(){var n=this.cesium;n.Ion.defaultAccessToken=Object({NODE_ENV:"production",VUE_APP_BASE_API:"/prod-api",VUE_APP_GAODE_KEY_WEB_SERVICE:"181ced609de9d446207b55e549bafcb6",VUE_APP_GAODE_KEY_WEB_TERMINAL:"cb250acd7ee0e7b2049cb93747ae3d44",VUE_APP_PUBLIC_URL:"/cesium-template",VUE_APP_SECURITY_JS_CODE:"2a0ce2005352672661417093c485a056",BASE_URL:""}).VUE_APP_TOKEN,this.viewer=new n.Viewer("cesiumContainer",{imageryProvider:new n.ArcGisMapServerImageryProvider({url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"}),terrainProvider:new n.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),shouldAnimate:!0,infoBox:!1,selectionIndicator:!1}),this.viewer.scene.globe.depthTestAgainstTerrain=!1,this._Entity=new r["a"](n,this.viewer),this.cesiumContainer=document.getElementById("cesiumContainer"),this.viewer.camera.flyTo({destination:n.Cartesian3.fromDegrees(-75.59742934002912,40.03824624260394,5e3),orientation:{heading:n.Math.toRadians(0),pitch:n.Math.toRadians(-90),roll:0},duration:3})},start:function(){var n=this,e=this.cesium;this.handler=new e.ScreenSpaceEventHandler(this.viewer.scene.canvas),this.cesiumContainer.style.cursor="crosshair";var t=null,i=[],s=function(e){return n.viewer.scene.camera.pickEllipsoid(e,n.viewer.scene.globe.ellipsoid)};this.handler.setInputAction((function(n){var e=s(n.position);0==i.length&&i.push(e.clone()),i.push(e)}),e.ScreenSpaceEventType.LEFT_CLICK),this.handler.setInputAction((function(r){var a=s(r.endPosition);if(i.length>=2)if(e.defined(t))void 0!=a&&(i.pop(),a.y+=1+Math.random(),i.push(a));else{var o=new e.CallbackProperty((function(){return i}),!1);t=n._Entity.createPolyline({positions:o,material:e.Color.RED,width:5})}}),e.ScreenSpaceEventType.MOUSE_MOVE),this.handler.setInputAction((function(e){n.handler.destroy(),console.log(t),n.EntityData.push(t),console.log(n.EntityData),n.cesiumContainer.style.cursor="unset"}),e.ScreenSpaceEventType.RIGHT_CLICK)},testBold:function(){this.EntityData.map((function(n){n.polyline.width=30}))}}},c=o,l=(t("65d9"),t("cba8")),u=Object(l["a"])(c,i,s,!1,null,"63846143",null);e["default"]=u.exports}}]);