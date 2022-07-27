(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-487886b7"],{9521:function(e,n,t){},e9d3:function(e,n,t){"use strict";var i=t("4bb1"),r=t("e143"),o=(t("7502"),t("2237"),t("eb3b"),t("a567"),function(){function e(n,t){Object(i["a"])(this,e),this.Cesium=n,this.viewer=t}return Object(r["a"])(e,[{key:"formCssColorString",value:function(e){var n=this.Cesium;return n.Color.fromCssColorString(e)}},{key:"getPosition",value:function(e){var n=this.Cesium,t=this.viewer,i=t.scene.camera.pickEllipsoid(e.position),r=n.Cartographic.fromCartesian(i),o=n.Math.toDegrees(r.longitude),a=n.Math.toDegrees(r.latitude),s=Number(t.camera.positionCartographic.height.toFixed(0));return{longitude:o,latitude:a,cameraHeight:s}}},{key:"terrainProviderHeight",value:function(e){var n=this.Cesium,t=n.createWorldTerrain(),i=n.sampleTerrainMostDetailed(t,e);return Promise.resolve(i)}},{key:"getSeibelCurve",value:function(e,n,t,i){var r=this.Cesium,o=[],a=r.Cartographic.fromCartesian(e),s=r.Cartographic.fromCartesian(n),l=180*a.longitude/Math.PI,u=180*a.latitude/Math.PI,c=180*s.longitude/Math.PI,h=180*s.latitude/Math.PI,m=Math.sqrt((l-c)*(l-c)+(u-h)*(u-h)),f=m*t,d=r.Cartesian3.clone(e),p=r.Cartesian3.clone(n),g=r.Cartesian3.distance(d,r.Cartesian3.ZERO),v=r.Cartesian3.distance(p,r.Cartesian3.ZERO);if(r.Cartesian3.normalize(d,d),r.Cartesian3.normalize(p,p),0===r.Cartesian3.distance(d,p))return o;var C=r.Cartesian3.angleBetween(d,p);o.push(e);for(var y=1;y<i-1;y++){var b=1*y/(i-1),w=1-b,_=Math.sin(w*C)/Math.sin(C),E=Math.sin(b*C)/Math.sin(C),P=r.Cartesian3.multiplyByScalar(d,_,new r.Cartesian3),A=r.Cartesian3.multiplyByScalar(p,E,new r.Cartesian3),k=r.Cartesian3.add(P,A,new r.Cartesian3),M=b*Math.PI,L=g*w+v*b+Math.sin(M)*f,T=r.Cartesian3.multiplyByScalar(k,L,k);o.push(T)}return o.push(n),o}},{key:"getCatesian3FromPX",value:function(e){var n=this.viewer.camera.getPickRay(e);return n?this.viewer.scene.globe.pick(n,this.viewer.scene):null}},{key:"meter2Lat",value:function(e){var n=Math.PI,t=12742*n/360;return e/t/1e3}},{key:"meter2Lng",value:function(e,n){var t=Math.PI,i=6371*Math.cos(n*t/180)*2*t/360;return e/i/1e3}},{key:"isDegreesOrCartesian",value:function(e){if(!e)throw new Error("Error in Parameter!");return"number"===typeof e.x&&"number"===typeof e.y&&"number"===typeof e.z||"number"===typeof e.lng&&"number"===typeof e.lat}},{key:"toDegrees",value:function(e){var n=this.Cesium;if(this.isDegreesOrCartesian(e)){var t=function(e){var t=new n.Cartesian3(e.x,e.y,e.z),i=n.Cartographic.fromCartesian(t);return{lng:parseFloat(n.Math.toDegrees(i.longitude).toFixed(8)),lat:parseFloat(n.Math.toDegrees(i.latitude).toFixed(8)),alt:parseFloat(i.height.toFixed(8))}};return e.x&&(e=t(e)),e}}},{key:"toCartesian",value:function(e){var n=this.Cesium;if(this.isDegreesOrCartesian(e)){var t=function(e){return n.Cartesian3.fromDegrees(e.lng,e.lat,e.alt||0)};return e.lng&&(e=t(e)),e}}},{key:"toWindowCoordinates",value:function(e){var n=this.Cesium,t=this.viewer;if(t&&e&&e.x&&e.y&&e.z)return n.SceneTransforms.wgs84ToWindowCoordinates(t.scene,e);if(t&&e.lng&&e.lat&&e.alt)return n.SceneTransforms.wgs84ToWindowCoordinates(t.scene,toCartesianFromDegrees(e));throw new Error("Error in Parameter!")}}]),e}());n["a"]=o},f698:function(e,n,t){"use strict";t("9521")},fbea:function(e,n,t){"use strict";t.r(n);var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"container"},[t("div",{attrs:{id:"cesiumContainer"}}),t("el-card",{staticClass:"operation-panel"},[t("div",{staticClass:"operation-header clearfix",attrs:{slot:"header"},slot:"header"},[t("span",[e._v("楼层分解")])]),t("div",{staticClass:"operation-content"},[t("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px",size:"mini"}},[t("el-form-item",{attrs:{label:"整体控制"}},[t("el-radio-group",{on:{change:e.wholeChange},model:{value:e.form.whole,callback:function(n){e.$set(e.form,"whole",n)},expression:"form.whole"}},e._l(e.wholeArr,(function(n,i){return t("el-radio-button",{key:i,attrs:{label:n.value}},[e._v(e._s(n.label)+" ")])})),1)],1),t("el-form-item",{attrs:{label:"显示指定"}},[t("el-radio-group",{on:{change:e.appointChange},model:{value:e.form.appoint,callback:function(n){e.$set(e.form,"appoint",n)},expression:"form.appoint"}},e._l(e.appointArr,(function(n,i){return t("el-radio",{key:i,staticClass:"appoint-radio",attrs:{border:"",label:n.value}},[e._v(e._s(n.label)+" ")])})),1)],1)],1)],1)])],1)},r=[],o=(t("5f01"),t("7502"),t("df64"),t("a567"),t("9e48")),a=t("e9d3"),s=t("3c88"),l=t.n(s),u=t("896e"),c=[{codeLanguage:"VUE",relyOn:[{label:"uuid（npm）",url:"https://www.npmjs.com/package/uuid",externalLinks:!0},{label:"bignumber.js（npm）",url:"https://www.npmjs.com/package/bignumber.js",externalLinks:!0},{label:"Entity.js",url:"cesium/Transform.js"},{label:"floor.glb",url:"Vue/Models/gLTF/storey/floor.glb"},{label:"top.glb",url:"Vue/Models/gLTF/storey/top.glb"}],code:[{codeLanguage:"html",content:'<template>\n                      <div class="container">\n                        <div id="cesiumContainer"></div>\n                        <el-card class="operation-panel">\n                          <div slot="header" class="operation-header clearfix">\n                            <span>楼层分解</span>\n                          </div>\n                          <div class="operation-content">\n                            <el-form ref="form" :model="form" label-width="80px" size="mini">\n                              <el-form-item label="整体控制">\n                                <el-radio-group v-model="form.whole" @change="wholeChange">\n                                  <el-radio-button :label="item.value" v-for="(item, index) in wholeArr" :key="index">{{ item.label }}\n                                  </el-radio-button>\n                                </el-radio-group>\n                              </el-form-item>\n                              <el-form-item label="显示指定">\n                                <el-radio-group v-model="form.appoint" @change="appointChange">\n                                  <el-radio class="appoint-radio" border :label="item.value" v-for="(item, index) in appointArr"\n                                    :key="index">{{ item.label }}\n                                  </el-radio>\n                                </el-radio-group>\n                              </el-form-item>\n                            </el-form>\n                          </div>\n                        </el-card>\n                      </div>\n                    </template>'},{codeLanguage:"js",content:'import Entity from "@/common/cesium/Entity.js";\n                    import Transform from "@/common/cesium/Transform.js";\n                    import BigNumber from "bignumber.js";\n                    import { v4 as uuidv4 } from "uuid";\n                    export default {\n                      data() {\n                        return {\n                          viewer: null,\n                          handler: null,\n                          _Entity: null,\n                          _Transform: null,\n                          cesiumContainerDom: null,\n                          wholeArr: [\n                            {\n                              value: 1,\n                              label: "展开"\n                            },\n                            {\n                              value: 2,\n                              label: "合并"\n                            },\n                            {\n                              value: 3,\n                              label: "还原"\n                            }\n                          ],\n                          appointArr: [\n                            {\n                              value: 1,\n                              label: "一楼"\n                            },\n                            {\n                              value: 2,\n                              label: "二楼"\n                            },\n                            {\n                              value: 3,\n                              label: "三楼"\n                            },\n                            {\n                              value: 4,\n                              label: "四楼"\n                            },\n                            {\n                              value: 5,\n                              label: "五楼"\n                            },\n                            {\n                              value: 6,\n                              label: "六楼"\n                            },\n                            {\n                              value: 7,\n                              label: "七楼"\n                            },\n                            {\n                              value: 8,\n                              label: "八楼"\n                            },\n                            {\n                              value: 9,\n                              label: "九楼"\n                            },\n                            {\n                              value: 0,\n                              label: "顶楼"\n                            },\n                          ],\n                          form: {\n                            whole: "",\n                            appoint: ""\n                          },\n                          EntityArr: [],\n                          defaultPosition: {\n                            lat: 41.81741540043599,\n                            lng: 123.42949456471793,\n                          },\n                          offsetLng: "",\n                          offsetMeter: ""\n                        };\n                      },\n                      mounted() {\n                        this.init();\n                      },\n                      methods: {\n                        init() {\n                          const Cesium = this.cesium;\n                          Cesium.Ion.defaultAccessToken = process.env.VUE_APP_TOKEN;\n                          this.viewer = new Cesium.Viewer("cesiumContainer", {\n                            imageryProvider: new Cesium.ArcGisMapServerImageryProvider({\n                              url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",\n                            }),\n                            terrainProvider: new Cesium.CesiumTerrainProvider({\n                              //加载火星在线地形\n                              url: "http://data.marsgis.cn/terrain",\n                            }),\n                            infoBox: false,\n                            selectionIndicator: false,\n                            navigation: false,\n                            animation: false,\n                            timeline: false,\n                            baseLayerPicker: false,\n                            geocoder: false,\n                            homeButton: false,\n                            sceneModePicker: false,\n                            navigationHelpButton: false,\n                            shouldAnimate: false,\n                          });\n                          //是否开启抗锯齿\n                          this.viewer.scene.fxaa = true;\n                          this.viewer.scene.postProcessStages.fxaa.enabled = true;\n                          this._Entity = new Entity(Cesium, this.viewer);\n                          this._Transform = new Transform(Cesium, this.viewer);\n                          this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);\n                          this.cesiumContainerDom = document.getElementById(\'cesiumContainer\')\n                          this.viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});//移除地形\n                          this.start();\n                        },\n                        /**\n                         * 开始\n                         */\n                        start() {\n                          const Cesium = this.cesium;\n                          const _this = this\n                          /**\n                           * 初始化模型\n                           */\n                          function floorInit(len, height) {\n                            let EntityModelArr = []\n                            let _height = 0\n                            // 加载楼层 start\n                            for (let i = 0; i < len; i++) {\n                              _height = i * height\n                              const EntityModel = _this._Entity.createModel({\n                                id: uuidv4(),\n                                position: Cesium.Cartesian3.fromDegrees(\n                                  _this.defaultPosition.lng, _this.defaultPosition.lat, _height\n                                ),\n                                uri: process.env.VUE_APP_PUBLIC_URL + "/Vue/Models/gLTF/storey/floor.glb",\n                                heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,\n                              })\n                              EntityModelArr.push(EntityModel)\n                            }\n                            // 加载楼层 end\n                            // 加载楼顶 start\n                            const EntityModelTop = _this._Entity.createModel({\n                              id: uuidv4(),\n                              position: Cesium.Cartesian3.fromDegrees(\n                                _this.defaultPosition.lng, _this.defaultPosition.lat, len * height\n                              ),\n                              uri: process.env.VUE_APP_PUBLIC_URL + "/Vue/Models/gLTF/storey/top.glb",\n                              heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,\n                            })\n                            // 加载楼顶 end\n                            return [...EntityModelArr, EntityModelTop]\n                          }\n                    \n                          this.EntityArr = floorInit(9, 3)\n                    \n                          this.viewer.flyTo(this.EntityArr);\n                    \n                    \n                          // 计算移位的位置\n                          this.offsetMeter = Math.abs(Number(this._Transform.meter2Lng(15, this.defaultPosition.lng)))\n                          this.offsetLng = Number(new BigNumber(this.defaultPosition.lng).plus(this.offsetMeter))\n                    \n                          /**\n                           * 鼠标接触模型 产生高亮\n                           */\n                          function modelHover($entity, type) {\n                            if (type) {\n                              $entity.model.color = Cesium.Color.RED.withAlpha(0.5)\n                              $entity.model.colorBlendMode = Cesium.ColorBlendMode.MIX\n                              $entity.model.colorBlendAmount = 0.5\n                              $entity.model.silhouetteColor = "Red"\n                              $entity.model.silhouetteSize = 2.0\n                            } else {\n                              $entity.model.color = undefined\n                              $entity.model.colorBlendMode = undefined\n                              $entity.model.colorBlendAmount = undefined\n                              $entity.model.silhouetteColor = undefined\n                              $entity.model.silhouetteSize = undefined\n                            }\n                          }\n                    \n                          // 鼠标移动 start\n                          this.handler.setInputAction((event) => {\n                            const pick = this.viewer.scene.pick(event.endPosition);\n                            // const dpick = this.viewer.scene.drillPick(movement.position, 1000, 1000)\n                            // console.log("cesium点击", movement, pick, dpick);\n                            if (!Cesium.defined(pick)) {\n                              this.cesiumContainerDom.style.cursor = "default";\n                              for (let i = 0; i < this.EntityArr.length; i++) {\n                                const item = this.EntityArr[i]\n                                modelHover(item, false)\n                              }\n                            } else {\n                              this.cesiumContainerDom.style.cursor = "pointer";\n                              const _Entity = pick.id\n                              for (let i = 0; i < this.EntityArr.length; i++) {\n                                const item = this.EntityArr[i]\n                                modelHover(item, false)\n                                if (item._id == _Entity._id) {\n                                  modelHover(_Entity, true)\n                                }\n                              }\n                            }\n                    \n                            // const ray = this.viewer.camera.getPickRay(event.endPosition);\n                            // const cartesian = this.viewer.scene.globe.pick(\n                            //   ray,\n                            //   this.viewer.scene\n                            // );\n                            // console.log(cartesian)\n                          }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);\n                          // 鼠标移动 end\n                          //鼠标左键点击 Start\n                          this.handler.setInputAction((event) => {\n                            const pick = this.viewer.scene.pick(event.position);\n                            if (pick) {\n                              const $entity = pick.id\n                              // $entity.model.heightReference = Cesium.HeightReference.NONE\n                              // $entity.position = this.getCallbackProperty(position, \'offset\')\n                              for (let i = 0; i < this.EntityArr.length; i++) {\n                                const _Entity_ = this.EntityArr[i]\n                                let position\n                                if (_Entity_.position?._value) {\n                                  position = this.cartesian3TolngLatAlt(_Entity_.position._value)\n                                } else {\n                                  position = this.cartesian3TolngLatAlt(_Entity_.position.getValue())\n                                }\n                    \n                                if (_Entity_._id == $entity._id) {\n                                  if (position[0] == this.defaultPosition.lng) {\n                                    _Entity_.position = this.getCallbackProperty(position, \'offset\')\n                                  } else {\n                                    _Entity_.position = this.getCallbackProperty(position, \'noOffset\')\n                                  }\n                    \n                                } else {\n                                  _Entity_.position = this.getCallbackProperty(position, \'noOffset\')\n                                }\n                              }\n                            }\n                          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);\n                          //鼠标左键点击 End\n                        },\n                        /**\n                         * @description 将笛卡尔坐标系转成经纬度高程\n                         * @param {Object} cartesian 笛卡尔坐标系对象 {x, y, z}\n                         * @returns 返回经纬度高程对象\n                         */\n                        cartesian3TolngLatAlt(cartesian) {\n                          const Cesium = this.cesium;\n                          if (!cartesian || Object.keys(cartesian).length !== 3) {\n                            throw new Error(\'请传入合法的cartesian对象 {x, y, z}\')\n                          }\n                          const cartesian3 = new Cesium.Cartesian3(cartesian.x, cartesian.y, cartesian.z);\n                          const cartographic = Cesium.Cartographic.fromCartesian(cartesian3);\n                          const lat = Cesium.Math.toDegrees(cartographic.latitude);\n                          const lng = Cesium.Math.toDegrees(cartographic.longitude);\n                          const height = Math.round(cartographic.height)\n                          return [lng, lat, height]\n                        },\n                    \n                        /**\n                         * 延迟操作\n                         */\n                        getCallbackProperty(position, type, height) {\n                          const Cesium = this.cesium;\n                          const _this = this\n                          if (type == "open") {\n                            let factor = position[2];\n                            return new Cesium.CallbackProperty((time) => {\n                              if (factor >= height) {\n                                factor = height\n                              } else {\n                                factor++\n                              }\n                              // 动态更新位置\n                              return Cesium.Cartesian3.fromDegrees(\n                                position[0], position[1], factor\n                              )\n                            }, false);\n                          }\n                          if (type == "merge") {\n                            let factor = position[2];\n                            return new Cesium.CallbackProperty((time) => {\n                              if (factor <= height) {\n                                factor = height\n                              } else {\n                                factor--\n                              }\n                              // 动态更新位置\n                              return Cesium.Cartesian3.fromDegrees(\n                                position[0], position[1], factor\n                              )\n                            }, false);\n                          }\n                          if (type == "recovery") {\n                            return Cesium.Cartesian3.fromDegrees(\n                              this.defaultPosition.lng, position[1], height\n                            )\n                          }\n                          if (type == "offset") {\n                            let originalLng = position[0]\n                            return new Cesium.CallbackProperty((time) => {\n                              if (originalLng >= this.offsetLng) {\n                                originalLng = this.offsetLng\n                              } else {\n                                originalLng += this.offsetMeter / 30\n                              }\n                              // 动态更新位置\n                              return Cesium.Cartesian3.fromDegrees(\n                                originalLng, position[1], position[2]\n                              )\n                            }, false);\n                          }\n                          if (type == "noOffset") {\n                            let originalLng = position[0]\n                            return new Cesium.CallbackProperty((time) => {\n                              if (originalLng <= this.defaultPosition.lng) {\n                                originalLng = this.defaultPosition.lng\n                              } else {\n                                originalLng -= this.offsetMeter / 30\n                              }\n                              // 动态更新位置\n                              return Cesium.Cartesian3.fromDegrees(\n                                originalLng, position[1], position[2]\n                              )\n                            }, false);\n                          }\n                        },\n                        /**\n                         * 整体控制\n                         */\n                        wholeChange(e) {\n                          const Cesium = this.cesium;\n                          this.form.appoint = ""\n                          for (let i = 0; i < this.EntityArr.length; i++) {\n                            const item = this.EntityArr[i]\n                            let position\n                            if (item.position?._value) {\n                              position = this.cartesian3TolngLatAlt(item.position._value)\n                            } else {\n                              position = this.cartesian3TolngLatAlt(item.position.getValue())\n                            }\n                    \n                            if (e === 1) {\n                              item.show = true\n                              item.position = this.getCallbackProperty(position, \'open\', 3 * i * 2)\n                            }\n                            if (e === 2) {\n                              item.show = true\n                              item.position = this.getCallbackProperty(position, \'merge\', 3 * i)\n                            }\n                            if (e === 3) {\n                              item.show = true\n                              item.position = this.getCallbackProperty(position, \'recovery\', 3 * i)\n                            }\n                          }\n                        },\n                        /**\n                         * 显示指定\n                         */\n                        appointChange(e) {\n                          this.form.whole = ""\n                          for (let i = 0; i < this.EntityArr.length; i++) {\n                            const item = this.EntityArr[i]\n                            let position\n                            if (item.position?._value) {\n                              position = this.cartesian3TolngLatAlt(item.position._value)\n                            } else {\n                              position = this.cartesian3TolngLatAlt(item.position.getValue())\n                            }\n                            item.position = this.getCallbackProperty(position, \'merge\', 3 * i)\n                            if (e === 0) {\n                              item.show = true\n                            } else {\n                              if (i < e) {\n                                item.show = true\n                              } else {\n                                item.show = false\n                              }\n                            }\n                          }\n                        }\n                      },\n                    };'},{codeLanguage:"css",content:".container {\n                        width: 100%;\n                        height: 100%;\n                      \n                        #cesiumContainer {\n                          width: 100%;\n                          height: 100%;\n                        }\n                      \n                        .operation-panel {\n                          width: 360px;\n                          position: fixed;\n                          top: 60px;\n                          right: 10px;\n                          z-index: 9;\n                      \n                          .appoint-radio {\n                            margin: 0 5px 5px 0;\n                          }\n                        }\n                      }"}]}],h={data:function(){return{viewer:null,handler:null,_Entity:null,_Transform:null,cesiumContainerDom:null,wholeArr:[{value:1,label:"展开"},{value:2,label:"合并"},{value:3,label:"还原"}],appointArr:[{value:1,label:"一楼"},{value:2,label:"二楼"},{value:3,label:"三楼"},{value:4,label:"四楼"},{value:5,label:"五楼"},{value:6,label:"六楼"},{value:7,label:"七楼"},{value:8,label:"八楼"},{value:9,label:"九楼"},{value:0,label:"顶楼"}],form:{whole:"",appoint:""},EntityArr:[],defaultPosition:{lat:41.81741540043599,lng:123.42949456471793},offsetLng:"",offsetMeter:""}},created:function(){this.$store.dispatch("highlight/set_code",c)},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken=Object({NODE_ENV:"production",VUE_APP_BASE_API:"/prod-api",VUE_APP_GAODE_KEY_WEB_SERVICE:"181ced609de9d446207b55e549bafcb6",VUE_APP_GAODE_KEY_WEB_TERMINAL:"cb250acd7ee0e7b2049cb93747ae3d44",VUE_APP_PUBLIC_URL:"/cesium-template",VUE_APP_QINIU_URL:"http://re8r7gk9l.hb-bkt.clouddn.com",VUE_APP_SECURITY_JS_CODE:"2a0ce2005352672661417093c485a056",BASE_URL:"/cesium-template/"}).VUE_APP_TOKEN,this.viewer=new e.Viewer("cesiumContainer",{imageryProvider:new e.ArcGisMapServerImageryProvider({url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"}),terrainProvider:new e.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),infoBox:!1,selectionIndicator:!1,navigation:!1,animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,shouldAnimate:!1}),this.viewer.scene.fxaa=!0,this.viewer.scene.postProcessStages.fxaa.enabled=!0,this._Entity=new o["a"](e,this.viewer),this._Transform=new a["a"](e,this.viewer),this.handler=new e.ScreenSpaceEventHandler(this.viewer.scene.canvas),this.cesiumContainerDom=document.getElementById("cesiumContainer"),this.viewer.scene.terrainProvider=new e.EllipsoidTerrainProvider({}),this.start()},start:function(){var e=this,n=this.cesium,t=this;function i(e,i){for(var r=[],o=0,a=0;a<e;a++){o=a*i;var s=t._Entity.createModel({id:Object(u["a"])(),position:n.Cartesian3.fromDegrees(t.defaultPosition.lng,t.defaultPosition.lat,o),uri:"/cesium-template/Vue/Models/gLTF/storey/floor.glb",heightReference:n.HeightReference.RELATIVE_TO_GROUND});r.push(s)}var l=t._Entity.createModel({id:Object(u["a"])(),position:n.Cartesian3.fromDegrees(t.defaultPosition.lng,t.defaultPosition.lat,e*i),uri:"/cesium-template/Vue/Models/gLTF/storey/top.glb",heightReference:n.HeightReference.RELATIVE_TO_GROUND});return[].concat(r,[l])}function r(e,t){t?(e.model.color=n.Color.RED.withAlpha(.5),e.model.colorBlendMode=n.ColorBlendMode.MIX,e.model.colorBlendAmount=.5,e.model.silhouetteColor="Red",e.model.silhouetteSize=2):(e.model.color=void 0,e.model.colorBlendMode=void 0,e.model.colorBlendAmount=void 0,e.model.silhouetteColor=void 0,e.model.silhouetteSize=void 0)}this.EntityArr=i(9,3),this.viewer.flyTo(this.EntityArr),this.offsetMeter=Math.abs(Number(this._Transform.meter2Lng(15,this.defaultPosition.lng))),this.offsetLng=Number(new l.a(this.defaultPosition.lng).plus(this.offsetMeter)),this.handler.setInputAction((function(t){var i=e.viewer.scene.pick(t.endPosition);if(n.defined(i)){e.cesiumContainerDom.style.cursor="pointer";for(var o=i.id,a=0;a<e.EntityArr.length;a++){var s=e.EntityArr[a];r(s,!1),s._id==o._id&&r(o,!0)}}else{e.cesiumContainerDom.style.cursor="default";for(var l=0;l<e.EntityArr.length;l++){var u=e.EntityArr[l];r(u,!1)}}}),n.ScreenSpaceEventType.MOUSE_MOVE),this.handler.setInputAction((function(n){var t=e.viewer.scene.pick(n.position);if(t)for(var i=t.id,r=0;r<e.EntityArr.length;r++){var o,a=e.EntityArr[r],s=void 0;s=null!==(o=a.position)&&void 0!==o&&o._value?e.cartesian3TolngLatAlt(a.position._value):e.cartesian3TolngLatAlt(a.position.getValue()),a._id==i._id&&s[0]==e.defaultPosition.lng?a.position=e.getCallbackProperty(s,"offset"):a.position=e.getCallbackProperty(s,"noOffset")}}),n.ScreenSpaceEventType.LEFT_CLICK)},cartesian3TolngLatAlt:function(e){var n=this.cesium;if(!e||3!==Object.keys(e).length)throw new Error("请传入合法的cartesian对象 {x, y, z}");var t=new n.Cartesian3(e.x,e.y,e.z),i=n.Cartographic.fromCartesian(t),r=n.Math.toDegrees(i.latitude),o=n.Math.toDegrees(i.longitude),a=Math.round(i.height);return[o,r,a]},getCallbackProperty:function(e,n,t){var i=this,r=this.cesium;if("open"==n){var o=e[2];return new r.CallbackProperty((function(n){return o>=t?o=t:o++,r.Cartesian3.fromDegrees(e[0],e[1],o)}),!1)}if("merge"==n){var a=e[2];return new r.CallbackProperty((function(n){return a<=t?a=t:a--,r.Cartesian3.fromDegrees(e[0],e[1],a)}),!1)}if("recovery"==n)return r.Cartesian3.fromDegrees(this.defaultPosition.lng,e[1],t);if("offset"==n){var s=e[0];return new r.CallbackProperty((function(n){return s>=i.offsetLng?s=i.offsetLng:s+=i.offsetMeter/30,r.Cartesian3.fromDegrees(s,e[1],e[2])}),!1)}if("noOffset"==n){var l=e[0];return new r.CallbackProperty((function(n){return l<=i.defaultPosition.lng?l=i.defaultPosition.lng:l-=i.offsetMeter/30,r.Cartesian3.fromDegrees(l,e[1],e[2])}),!1)}},wholeChange:function(e){this.cesium;this.form.appoint="";for(var n=0;n<this.EntityArr.length;n++){var t,i=this.EntityArr[n],r=void 0;r=null!==(t=i.position)&&void 0!==t&&t._value?this.cartesian3TolngLatAlt(i.position._value):this.cartesian3TolngLatAlt(i.position.getValue()),1===e&&(i.show=!0,i.position=this.getCallbackProperty(r,"open",3*n*2)),2===e&&(i.show=!0,i.position=this.getCallbackProperty(r,"merge",3*n)),3===e&&(i.show=!0,i.position=this.getCallbackProperty(r,"recovery",3*n))}},appointChange:function(e){this.form.whole="";for(var n=0;n<this.EntityArr.length;n++){var t,i=this.EntityArr[n],r=void 0;r=null!==(t=i.position)&&void 0!==t&&t._value?this.cartesian3TolngLatAlt(i.position._value):this.cartesian3TolngLatAlt(i.position.getValue()),i.position=this.getCallbackProperty(r,"merge",3*n),i.show=0===e||n<e}}}},m=h,f=(t("f698"),t("cba8")),d=Object(f["a"])(m,i,r,!1,null,"5fa40708",null);n["default"]=d.exports}}]);