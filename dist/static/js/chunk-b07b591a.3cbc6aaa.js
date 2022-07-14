(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b07b591a"],{"4bb1":function(e,n,t){"use strict";t.d(n,"a",(function(){return i}));t("a567");function i(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}},"78be":function(e,n,t){var i=t("46a7"),r=t("bc35"),o=t("5386");i({target:"Array",proto:!0},{fill:r}),o("fill")},"896e":function(e,n,t){"use strict";var i,r=new Uint8Array(16);function o(){if(!i&&(i="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),!i))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return i(r)}var a=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function s(e){return"string"===typeof e&&a.test(e)}for(var l=s,u=[],c=0;c<256;++c)u.push((c+256).toString(16).substr(1));function m(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=(u[e[n+0]]+u[e[n+1]]+u[e[n+2]]+u[e[n+3]]+"-"+u[e[n+4]]+u[e[n+5]]+"-"+u[e[n+6]]+u[e[n+7]]+"-"+u[e[n+8]]+u[e[n+9]]+"-"+u[e[n+10]]+u[e[n+11]]+u[e[n+12]]+u[e[n+13]]+u[e[n+14]]+u[e[n+15]]).toLowerCase();if(!l(t))throw TypeError("Stringified UUID is invalid");return t}var d=m;function p(e,n,t){e=e||{};var i=e.random||(e.rng||o)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,n){t=t||0;for(var r=0;r<16;++r)n[t+r]=i[r];return n}return d(i)}n["a"]=p},"8fd8":function(e,n,t){},b704:function(e,n,t){"use strict";t.r(n);var i=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},r=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"container"},[t("div",{attrs:{id:"cesiumContainer"}})])}],o=(t("eb3b"),t("34b1"),t("e72f"),t("9e48")),a=t("896e"),s=t("4bb1"),l=t("e143"),u=function(){function e(n,t){Object(s["a"])(this,e),this.Cesium=n,this.viewer=t}return Object(l["a"])(e,[{key:"create",value:function(e){var n=this.Cesium,t=this.viewer,i=null!==e&&void 0!==e&&e.cesiumName?e.cesiumName:"",r=null!==e&&void 0!==e&&e.source?e.source:"",o=null!==e&&void 0!==e&&e.uniforms?e.uniforms:"";function a(){this._definitionChanged=new n.Event,this._color=void 0,this.color=null!==e&&void 0!==e&&e.color?e.color:n.Color.BLUE}Object.defineProperties(a.prototype,{isConstant:{get:function(){return!1}},definitionChanged:{get:function(){return this._definitionChanged}},color:n.createPropertyDescriptor("color")});var s="colorMaterial".concat(parseInt(1e3*Math.random()));return a.prototype.getType=function(e){return s},a.prototype.getValue=function(e,i){return n.defined(i)||(i={}),i.color=n.Property.getValueOrClonedDefault(this._color,e,n.Color.WHITE,i.color),t.scene.requestRender(),i},a.prototype.equals=function(e){return this===e||e instanceof a&&n.Property.equals(this._color,e._color)},n.Material._materialCache.addMaterial(s,{fabric:{type:s,uniforms:o,source:r},translucent:function(e){return!0}}),n[i]=a,a}}]),e}(),c=u,m=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return{cesiumName:"Material_color",color:n||e.Color.fromRandom({alpha:.8}),uniforms:{color:n||e.Color.fromRandom({alpha:.8}),diffusePower:1.6,alphaPower:1.5},source:"uniform vec4 color;\n                uniform float diffusePower;\n                uniform float alphaPower;\n                czm_material czm_getMaterial(czm_materialInput materialInput)\n                    {\n                    czm_material material = czm_getDefaultMaterial(materialInput);\n                    vec2 st = materialInput.st;\n                    float alpha = distance(st,vec2(0.5, 0.5));\n                    material.alpha = color.a  * alpha  * alphaPower;\n                    material.diffuse = color.rgb * diffusePower;\n                    return material;\n                }"}},d=[{codeLanguage:"VUE",relyOn:[{label:"uuid（npm）",url:"https://www.npmjs.com/package/uuid",externalLinks:!0},{label:"Entity.js",url:"cesium/Entity.js"},{label:"Material/color.js",url:"cesium/Materials/color.js"},{label:"MaterialColor.js",url:"Vue/VectorLayer/GeoJson/District/color.js"},{label:"anhui.json",url:"Vue/VectorLayer/GeoJson/District/anhui.json"}],code:[{codeLanguage:"html",content:'<template>\n                    <div class="container">\n                      <div id="cesiumContainer"></div>\n                    </div>\n                  </template>'},{codeLanguage:"js",content:'import Entity from "@/common/cesium/Entity.js";\n                  import { v4 as uuidv4 } from "uuid";\n                  import Material from "@/common/cesium/Materials/color.js";\n                  import MaterialColor from "./module/material/color";\n                  export default {\n                    name: "District",\n                    data() {\n                      return {\n                        viewer: null,\n                        _Entity: null,\n                        _Material: null,\n                        entitiesArr: [],\n                      };\n                    },\n                    mounted() {\n                      this.init();\n                    },\n                    methods: {\n                      init() {\n                        const Cesium = this.cesium;\n                        Cesium.Ion.defaultAccessToken = process.env.VUE_APP_TOKEN;\n                        this.viewer = new Cesium.Viewer("cesiumContainer", {\n                          imageryProvider: new Cesium.UrlTemplateImageryProvider({\n                            url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",\n                          }),\n                          terrainProvider: new Cesium.CesiumTerrainProvider({\n                            url: "http://data.marsgis.cn/terrain",\n                          }),\n                          shouldAnimate: true,\n                          infoBox: false,\n                          selectionIndicator: false,\n                        });\n                        // 相对于地形表面绘制\n                        // this.viewer.scene.globe.depthTestAgainstTerrain = true;\n                        // 始终在顶部绘制（默认）\n                        this.viewer.scene.globe.depthTestAgainstTerrain = false;\n                        this.viewer.animation.container.style.visibility = "hidden"; // 不显示动画控件\n                        //是否开启抗锯齿\n                        this.viewer.scene.fxaa = true;\n                        this.viewer.scene.postProcessStages.fxaa.enabled = true;\n                        this._Entity = new Entity(Cesium, this.viewer);\n                        this._Material = new Material(Cesium, this.viewer);\n                        this.start();\n                      },\n                      /**\n                       * 开始\n                       */\n                      start() {\n                        const Cesium = this.cesium;\n                        const JsonUrl =\n                          process.env.VUE_APP_PUBLIC_URL +\n                          "/Vue/VectorLayer/GeoJson/District/anhui.json";\n                        Cesium.GeoJsonDataSource.load(JsonUrl, {\n                          stroke: Cesium.Color.WHITE, //设置多边形轮廓的默认颜色\n                          strokeWidth: 20, //轮廓的宽度\n                          clamToGround: true, //让地图贴地\n                        }).then((dataSource) => {\n                          this.viewer.dataSources.add(dataSource);\n                          let entities = dataSource.entities.values;\n                          this.entitiesArr = entities;\n                  \n                          for (let i = 0; i < entities.length; i++) {\n                            let entity = entities[i];\n                            entity.polygon.height = 0;\n                            entity.polygon.extrudedHeight = 5000;\n                            entity.polygon.outline = false;\n                  \n                            this._Material.create(MaterialColor(Cesium));\n                  \n                            //将随机产生的颜色赋予多边形\n                            //对南山和宝安进行特殊处理，让多个区块颜色保持一致\n                            if (entity.name == "宝安区") {\n                              entity.polygon.material = Cesium.Color.ORANGE.withAlpha(0.8);\n                            } else if (entity.name == "南山区") {\n                              entity.polygon.material = Cesium.Color.RED.withAlpha(0.8);\n                            } else {\n                              entity.polygon.material = new Cesium.Material_color(\n                                Cesium.Color.fromRandom({ alpha: 0.8 })\n                              );\n                            }\n                  \n                            //添加标签\n                            let polyCenter = Cesium.Cartesian3.fromDegrees(\n                              entity._properties.centroid._value[0],\n                              entity._properties.centroid._value[1],\n                              100\n                            );\n                            this._Entity.createLabel({\n                              id: uuidv4(),\n                              position: polyCenter,\n                              font: "25px 楷体",\n                              text: entity.name,\n                              showBackground: false,\n                              scale: 0.8,\n                              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,\n                              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,\n                              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(\n                                0.0,\n                                2000000.0\n                              ),\n                            });\n                          }\n                          this.$nextTick(() => {\n                            this.viewer.flyTo(this.entitiesArr);\n                          });\n                        });\n                      },\n                    },\n                  };'},{codeLanguage:"css",content:".container {\n                    width: 100%;\n                    height: 100%;\n                    #cesiumContainer {\n                      width: 100%;\n                      height: 100%;\n                    }\n                  }"}]},{codeLanguage:"JS",relyOn:[{label:"uuid.min.js",url:"JavaScript/cesium/Tripartite/uuid-js/uuid.min.js"},{label:"Entity.js",url:"JavaScript/cesium/Entity.js"},{label:"Material/color.js",url:"JavaScript/cesium/Materials/color.js"},{label:"anhui.json",url:"JavaScript/VectorLayer/GeoJson/District/anhui.json"}],code:[{codeLanguage:"js",content:'function districtGradient() {\n                      const _Entity = new Entity(Cesium, viewer);\n                      const _Material = new colorMaterial(Cesium, viewer);\n                      /**\n                       * 创建着色器及参数\n                       * @param {*} color \n                       * @returns \n                       */\n                      const MaterialColor = (color = "") => {\n                          let source = \'uniform vec4 color;\n uniform float diffusePower;\n uniform float alphaPower;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nvec2 st = materialInput.st;\nfloat alpha = distance(st,vec2(0.5, 0.5));\nmaterial.alpha = color.a  * alpha  * alphaPower;material.diffuse = color.rgb * diffusePower;\return material;\n}\'                 \n                          return {\n                              cesiumName: "Material_color",\n                              color: color || Cesium.Color.fromRandom({ alpha: 0.8 }),\n                              uniforms: {\n                                  color: color || Cesium.Color.fromRandom({ alpha: 0.8 }),\n                                  diffusePower: 1.6,\n                                  alphaPower: 1.5,\n                              },\n                              source,\n                          }\n                      }\n                  \n                      Cesium.GeoJsonDataSource.load("/test/VectorLayer/GeoJson/District/anhui.json", {\n                          stroke: Cesium.Color.WHITE, //设置多边形轮廓的默认颜色\n                          strokeWidth: 20, //轮廓的宽度\n                          clamToGround: true, //让地图贴地\n                      }).then((dataSource) => {\n                          viewer.dataSources.add(dataSource);\n                          let entities = dataSource.entities.values;\n                  \n                          for (let i = 0; i < entities.length; i++) {\n                              let entity = entities[i];\n                              entity.polygon.height = 0;\n                              entity.polygon.extrudedHeight = 5000;\n                              entity.polygon.outline = false;\n                  \n                              _Material.create(MaterialColor());\n                  \n                              //将随机产生的颜色赋予多边形\n                              //对南山和宝安进行特殊处理，让多个区块颜色保持一致\n                              if (entity.name == "宝安区") {\n                                  entity.polygon.material = Cesium.Color.ORANGE.withAlpha(0.8);\n                              } else if (entity.name == "南山区") {\n                                  entity.polygon.material = Cesium.Color.RED.withAlpha(0.8);\n                              } else {\n                                  entity.polygon.material = new Cesium.Material_color(\n                                      Cesium.Color.fromRandom({ alpha: 0.8 })\n                                  );\n                              }\n                  \n                              //添加标签\n                              let polyCenter = Cesium.Cartesian3.fromDegrees(\n                                  entity._properties.centroid._value[0],\n                                  entity._properties.centroid._value[1],\n                                  100\n                              );\n                              _Entity.createLabel({\n                                  id: uuid4(),\n                                  position: polyCenter,\n                                  font: "25px 楷体",\n                                  text: entity.name,\n                                  showBackground: false,\n                                  scale: 0.8,\n                                  horizontalOrigin: Cesium.HorizontalOrigin.CENTER,\n                                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,\n                                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(\n                                      0.0,\n                                      2000000.0\n                                  ),\n                              });\n                          }\n                          setTimeout(() => { viewer.flyTo(entities); }, 0)\n                      });\n                  }'}]}],p={name:"District",data:function(){return{viewer:null,_Entity:null,_Material:null,entitiesArr:[]}},created:function(){this.$store.dispatch("highlight/set_code",d)},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken=Object({NODE_ENV:"production",VUE_APP_BASE_API:"/prod-api",VUE_APP_GAODE_KEY_WEB_SERVICE:"181ced609de9d446207b55e549bafcb6",VUE_APP_GAODE_KEY_WEB_TERMINAL:"cb250acd7ee0e7b2049cb93747ae3d44",VUE_APP_PUBLIC_URL:"/cesium-template",VUE_APP_QINIU_URL:"http://re8r7gk9l.hb-bkt.clouddn.com",VUE_APP_SECURITY_JS_CODE:"2a0ce2005352672661417093c485a056",BASE_URL:"/cesium-template/"}).VUE_APP_TOKEN,this.viewer=new e.Viewer("cesiumContainer",{imageryProvider:new e.UrlTemplateImageryProvider({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"}),terrainProvider:new e.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),shouldAnimate:!0,infoBox:!1,selectionIndicator:!1}),this.viewer.scene.globe.depthTestAgainstTerrain=!1,this.viewer.animation.container.style.visibility="hidden",this.viewer.scene.fxaa=!0,this.viewer.scene.postProcessStages.fxaa.enabled=!0,this._Entity=new o["a"](e,this.viewer),this._Material=new c(e,this.viewer),this.start()},start:function(){var e=this,n=this.cesium,t="/cesium-template/Vue/VectorLayer/GeoJson/District/anhui.json";n.GeoJsonDataSource.load(t,{stroke:n.Color.WHITE,strokeWidth:20,clamToGround:!0}).then((function(t){e.viewer.dataSources.add(t);var i=t.entities.values;e.entitiesArr=i;for(var r=0;r<i.length;r++){var o=i[r];o.polygon.height=0,o.polygon.extrudedHeight=5e3,o.polygon.outline=!1,e._Material.create(m(n)),"宝安区"==o.name?o.polygon.material=n.Color.ORANGE.withAlpha(.8):"南山区"==o.name?o.polygon.material=n.Color.RED.withAlpha(.8):o.polygon.material=new n.Material_color(n.Color.fromRandom({alpha:.8}));var s=n.Cartesian3.fromDegrees(o._properties.centroid._value[0],o._properties.centroid._value[1],100);e._Entity.createLabel({id:Object(a["a"])(),position:s,font:"25px 楷体",text:o.name,showBackground:!1,scale:.8,horizontalOrigin:n.HorizontalOrigin.CENTER,verticalOrigin:n.VerticalOrigin.BOTTOM,distanceDisplayCondition:new n.DistanceDisplayCondition(0,2e6)})}e.$nextTick((function(){e.viewer.flyTo(e.entitiesArr)}))}))}}},h=p,f=(t("d1f2"),t("cba8")),y=Object(f["a"])(h,i,r,!1,null,"5d3455c0",null);n["default"]=y.exports},bc35:function(e,n,t){"use strict";var i=t("735b"),r=t("32da"),o=t("1c60");e.exports=function(e){var n=i(this),t=o(n),a=arguments.length,s=r(a>1?arguments[1]:void 0,t),l=a>2?arguments[2]:void 0,u=void 0===l?t:r(l,t);while(u>s)n[s++]=e;return n}},d1f2:function(e,n,t){"use strict";t("8fd8")},e143:function(e,n,t){"use strict";function i(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function r(e,n,t){return n&&i(e.prototype,n),t&&i(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}t.d(n,"a",(function(){return r}))}}]);