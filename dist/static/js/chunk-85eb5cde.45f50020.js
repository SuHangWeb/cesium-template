(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-85eb5cde"],{2237:function(t,e,n){"use strict";var i=n("46a7"),r=n("4162"),a=n("d2cf"),o=n("4488"),s=n("7f99"),l=n("d2b9"),u=RangeError,c=String,d=Math.floor,h=r(s),y=r("".slice),m=r(1..toFixed),f=function(t,e,n){return 0===e?n:e%2===1?f(t,e-1,n*t):f(t*t,e/2,n)},p=function(t){var e=0,n=t;while(n>=4096)e+=12,n/=4096;while(n>=2)e+=1,n/=2;return e},g=function(t,e,n){var i=-1,r=n;while(++i<6)r+=e*t[i],t[i]=r%1e7,r=d(r/1e7)},v=function(t,e){var n=6,i=0;while(--n>=0)i+=t[n],t[n]=d(i/e),i=i%e*1e7},P=function(t){var e=6,n="";while(--e>=0)if(""!==n||0===e||0!==t[e]){var i=c(t[e]);n=""===n?i:n+h("0",7-i.length)+i}return n},w=l((function(){return"0.000"!==m(8e-5,3)||"1"!==m(.9,0)||"1.25"!==m(1.255,2)||"1000000000000000128"!==m(0xde0b6b3a7640080,0)}))||!l((function(){m({})}));i({target:"Number",proto:!0,forced:w},{toFixed:function(t){var e,n,i,r,s=o(this),l=a(t),d=[0,0,0,0,0,0],m="",w="0";if(l<0||l>20)throw u("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return c(s);if(s<0&&(m="-",s=-s),s>1e-21)if(e=p(s*f(2,69,1))-69,n=e<0?s*f(2,-e,1):s/f(2,e,1),n*=4503599627370496,e=52-e,e>0){g(d,0,n),i=l;while(i>=7)g(d,1e7,0),i-=7;g(d,f(10,i,1),0),i=e-1;while(i>=23)v(d,1<<23),i-=23;v(d,1<<i),g(d,1,1),v(d,2),w=P(d)}else g(d,0,n),g(d,1<<-e,0),w=P(d)+h("0",l);return l>0?(r=w.length,w=m+(r<=l?"0."+h("0",l-r)+w:y(w,0,r-l)+"."+y(w,r-l))):w=m+w,w}})},"3c14":function(t,e,n){"use strict";n("e9ff")},4488:function(t,e,n){var i=n("4162");t.exports=i(1..valueOf)},"4bb1":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));n("a567");function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},"78be":function(t,e,n){var i=n("46a7"),r=n("bc35"),a=n("5386");i({target:"Array",proto:!0},{fill:r}),a("fill")},"83f3":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{attrs:{id:"cesiumContainer"}})])}],a=n("9e48"),o=n("c407"),s=n("896e"),l=[{codeLanguage:"VUE",relyOn:[{label:"uuid（npm）",url:"https://www.npmjs.com/package/uuid",externalLinks:!0},{label:"Entity.js",url:"cesium/Entity.js"},{label:"Utils.js",url:"cesium/Utils.js"},{label:"qiche.gltf",url:"Vue/Entity/dynamicPosition/qiche.gltf"}],code:[{codeLanguage:"html",content:'<template>\n                    <div class="container">\n                      <div id="cesiumContainer"></div>\n                    </div>\n                  </template>'},{codeLanguage:"js",content:'import Entity from "@/common/cesium/Entity.js";\n                  import Utils from "@/common/cesium/Utils.js";\n                  import { v4 as uuidv4 } from "uuid";\n                  export default {\n                    name: "dynamicPosition",\n                    data() {\n                      return {\n                        viewer: null,\n                        _Entity: null,\n                        _Utils: null,\n                        ModelEntityArr: [],\n                      };\n                    },\n                    mounted() {\n                      this.init();\n                    },\n                    methods: {\n                      init() {\n                        const Cesium = this.cesium;\n                        Cesium.Ion.defaultAccessToken = process.env.VUE_APP_TOKEN;\n                        this.viewer = new Cesium.Viewer("cesiumContainer", {\n                          imageryProvider: new Cesium.UrlTemplateImageryProvider({\n                            url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",\n                          }),\n                          terrainProvider: new Cesium.CesiumTerrainProvider({\n                            url: "http://data.marsgis.cn/terrain",\n                          }),\n                          shouldAnimate: true,\n                          timeline: true,\n                          infoBox: false,\n                          selectionIndicator: false,\n                          // sceneMode: 2,\n                          // scale: 0.1,\n                          animation: false, //隐藏动画小组件（左下角圆的控件）\n                        });\n                        //隐藏底部时间线\n                        this.viewer.timeline.container.style.display = "none";\n                        //启用使用场景的光源为地球照明\n                        this.viewer.scene.globe.enableLighting = true;\n                        //深度监听\n                        this.viewer.scene.globe.depthTestAgainstTerrain = true;\n                        //Set the random number seed for consistent results.\n                        Cesium.Math.setRandomNumberSeed(3);\n                  \n                        this._Entity = new Entity(Cesium, this.viewer);\n                        this._Utils = new Utils(Cesium, this.viewer);\n                        this.start();\n                  \n                        //相机\n                        this.viewer.camera.setView({\n                          //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧\n                          destination: Cesium.Cartesian3.fromDegrees(\n                            123.43382736814452,\n                            41.811201240193164,\n                            3000\n                          ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)\n                          orientation: {\n                            heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向\n                            pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉\n                            roll: 0.0, // default value\n                          },\n                          duration: 3, //3秒到达战场\n                        });\n                      },\n                      /**\n                       * 开始\n                       */\n                      start() {\n                        const Cesium = this.cesium;\n                        let ModelEntity = [];\n                        for (let i = 0; i < 20; i++) {\n                          // 创建模型 start\n                          const createModel = this._Entity.createModel({\n                            id: uuidv4(),\n                            uri:\n                              process.env.VUE_APP_PUBLIC_URL +\n                              "/Vue/Entity/dynamicPosition/qiche.gltf",\n                            maximumScale: 100,\n                            minimumPixelSize: 30,\n                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,\n                          });\n                          // 创建模型 end\n                          ModelEntity.push(createModel);\n                        }\n                        this.ModelEntityArr = ModelEntity;\n                        this.setPosition();\n                        setInterval(() => {\n                          this.setPosition();\n                        }, 20000);\n                      },\n                      /**\n                       * 获取随机位置\n                       */\n                      getRandomPoint() {\n                        const randomPoint = this._Utils.randomPoint({\n                          start: [123.43408676397446, 41.81120812753955],\n                          end: [123.45099649125092, 41.81138896519967],\n                          range: 100,\n                        });\n                        return randomPoint;\n                      },\n                      getCallbackProperty(startPosition, endPosition) {\n                        const Cesium = this.cesium;\n                        let factor = 0;\n                        const position = new Cesium.CallbackProperty(function (time) {\n                          if (factor > 5000) {\n                            factor = 0;\n                          }\n                          factor++;\n                          // 动态更新位置\n                          return Cesium.Cartesian3.lerp(\n                            startPosition,\n                            endPosition,\n                            factor / 500.0,\n                            new Cesium.Cartesian3()\n                          );\n                        }, false);\n                        return position;\n                      },\n                      setPosition() {\n                        const Cesium = this.cesium;\n                        // console.log(this.ModelEntityArr);\n                        for (let i = 0; i < this.ModelEntityArr.length; i++) {\n                          const item = this.ModelEntityArr[i];\n                          // console.log(getEntityPosition);\n                          //获取随机位置\n                          let startPosition = "";\n                          //判断实体位置\n                          const getEntityPosition = this._Utils.getEntityPosition(item);\n                          if (getEntityPosition) {\n                            startPosition = getEntityPosition;\n                          } else {\n                            startPosition = this.getRandomPoint();\n                          }\n                          let endPosition = this.getRandomPoint();\n                  \n                          const position = this.getCallbackProperty(startPosition, endPosition);\n                          item.position = position;\n                          item.orientation = new Cesium.VelocityOrientationProperty(position);\n                        }\n                      },\n                    },\n                  };'},{codeLanguage:"css",content:".container {\n                      width: 100%;\n                      height: 100%;\n                      #cesiumContainer {\n                        width: 100%;\n                        height: 100%;\n                      }\n                    }"}]},{codeLanguage:"JS",relyOn:[{label:"uuid.min.js",url:"JavaScript/cesium/Tripartite/uuid-js/uuid.min.js"},{label:"Entity.js",url:"JavaScript/cesium/Entity.js"},{label:"Utils.js",url:"JavaScript/cesium/Utils.js"},{label:"qiche.gltf",url:"JavaScript/Entity/dynamicPosition/qiche.gltf"}],code:[{codeLanguage:"js",content:'\n                    function dynamicPosition() {\n                      const _Utils = new Utils(Cesium,viewer)\n                      const _Entity = new Entity(Cesium, viewer);\n                      let ModelEntityArr = []\n                      //相机\n                      viewer.camera.setView({\n                          //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧\n                          destination: Cesium.Cartesian3.fromDegrees(\n                              123.43382736814452,\n                              41.811201240193164,\n                              3000\n                          ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)\n                          orientation: {\n                              heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向\n                              pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉\n                              roll: 0.0, // default value\n                          },\n                          duration: 3, //3秒到达战场\n                      });\n                  \n                  \n                      let ModelEntity = [];\n                      for (let i = 0; i < 20; i++) {\n                          // 创建模型 start\n                          const createModel = _Entity.createModel({\n                              id: uuid4(),\n                              uri: "http://re8r7gk9l.hb-bkt.clouddn.com/files/qiche.gltf",\n                              maximumScale: 100,\n                              minimumPixelSize: 30,\n                              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,\n                          });\n                          // 创建模型 end\n                          ModelEntity.push(createModel);\n                      }\n                      ModelEntityArr = ModelEntity;\n                  \n                      //开始设置位置\n                      setPosition();\n                      setInterval(() => {\n                          setPosition();\n                      }, 20000);\n                  \n                      /**\n                       * 获取随机位置\n                       */\n                      function getRandomPoint() {\n                          const randomPoint = _Utils.randomPoint({\n                              start: [123.43408676397446, 41.81120812753955],\n                              end: [123.45099649125092, 41.81138896519967],\n                              range: 100,\n                          });\n                          return randomPoint;\n                      }\n                      /**\n                       * 计算移动位置\n                       */\n                      function getCallbackProperty(startPosition, endPosition) {\n                          let factor = 0;\n                          const position = new Cesium.CallbackProperty(function (time) {\n                              if (factor > 5000) {\n                                  factor = 0;\n                              }\n                              factor++;\n                              // 动态更新位置\n                              return Cesium.Cartesian3.lerp(\n                                  startPosition,\n                                  endPosition,\n                                  factor / 500.0,\n                                  new Cesium.Cartesian3()\n                              );\n                          }, false);\n                          return position;\n                      }\n                      /**\n                       * 设置位置\n                       */\n                      function setPosition() {\n                          for (let i = 0; i < ModelEntityArr.length; i++) {\n                              const item = ModelEntityArr[i];\n                              //获取随机位置\n                              let startPosition = "";\n                              //判断实体位置\n                              const getEntityPosition = _Utils.getEntityPosition(item);\n                              if (getEntityPosition) {\n                                  startPosition = getEntityPosition;\n                              } else {\n                                  startPosition = getRandomPoint();\n                              }\n                              let endPosition = getRandomPoint();\n                  \n                              const position = getCallbackProperty(startPosition, endPosition);\n                              item.position = position;\n                              item.orientation = new Cesium.VelocityOrientationProperty(position);\n                          }\n                      }\n                  }\n                  dynamicPosition()\n                  '}]}],u={name:"dynamicPosition",data:function(){return{viewer:null,_Entity:null,_Utils:null,ModelEntityArr:[]}},created:function(){this.$store.dispatch("highlight/set_code",l)},mounted:function(){this.init()},methods:{init:function(){var t=this.cesium;t.Ion.defaultAccessToken=Object({NODE_ENV:"production",VUE_APP_BASE_API:"/prod-api",VUE_APP_GAODE_KEY_WEB_SERVICE:"181ced609de9d446207b55e549bafcb6",VUE_APP_GAODE_KEY_WEB_TERMINAL:"cb250acd7ee0e7b2049cb93747ae3d44",VUE_APP_PUBLIC_URL:"/cesium-template",VUE_APP_QINIU_URL:"http://re8r7gk9l.hb-bkt.clouddn.com",VUE_APP_SECURITY_JS_CODE:"2a0ce2005352672661417093c485a056",BASE_URL:"/cesium-template/"}).VUE_APP_TOKEN,this.viewer=new t.Viewer("cesiumContainer",{imageryProvider:new t.UrlTemplateImageryProvider({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"}),terrainProvider:new t.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),shouldAnimate:!0,timeline:!0,infoBox:!1,selectionIndicator:!1,animation:!1}),this.viewer.timeline.container.style.display="none",this.viewer.scene.globe.enableLighting=!0,this.viewer.scene.globe.depthTestAgainstTerrain=!0,t.Math.setRandomNumberSeed(3),this._Entity=new a["a"](t,this.viewer),this._Utils=new o["a"](t,this.viewer),this.start(),this.viewer.camera.setView({destination:t.Cartesian3.fromDegrees(123.43382736814452,41.811201240193164,3e3),orientation:{heading:t.Math.toRadians(0),pitch:t.Math.toRadians(-90),roll:0},duration:3})},start:function(){for(var t=this,e=this.cesium,n=[],i=0;i<20;i++){var r=this._Entity.createModel({id:Object(s["a"])(),uri:"/cesium-template/Vue/Entity/dynamicPosition/qiche.gltf",maximumScale:100,minimumPixelSize:30,heightReference:e.HeightReference.CLAMP_TO_GROUND});n.push(r)}this.ModelEntityArr=n,this.setPosition(),setInterval((function(){t.setPosition()}),2e4)},getRandomPoint:function(){var t=this._Utils.randomPoint({start:[123.43408676397446,41.81120812753955],end:[123.45099649125092,41.81138896519967],range:100});return t},getCallbackProperty:function(t,e){var n=this.cesium,i=0,r=new n.CallbackProperty((function(r){return i>5e3&&(i=0),i++,n.Cartesian3.lerp(t,e,i/500,new n.Cartesian3)}),!1);return r},setPosition:function(){for(var t=this.cesium,e=0;e<this.ModelEntityArr.length;e++){var n=this.ModelEntityArr[e],i="",r=this._Utils.getEntityPosition(n);i=r||this.getRandomPoint();var a=this.getRandomPoint(),o=this.getCallbackProperty(i,a);n.position=o,n.orientation=new t.VelocityOrientationProperty(o)}}}},c=u,d=(n("3c14"),n("cba8")),h=Object(d["a"])(c,i,r,!1,null,"8c10d43c",null);e["default"]=h.exports},"896e":function(t,e,n){"use strict";var i,r=new Uint8Array(16);function a(){if(!i&&(i="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),!i))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return i(r)}var o=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function s(t){return"string"===typeof t&&o.test(t)}for(var l=s,u=[],c=0;c<256;++c)u.push((c+256).toString(16).substr(1));function d(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(u[t[e+0]]+u[t[e+1]]+u[t[e+2]]+u[t[e+3]]+"-"+u[t[e+4]]+u[t[e+5]]+"-"+u[t[e+6]]+u[t[e+7]]+"-"+u[t[e+8]]+u[t[e+9]]+"-"+u[t[e+10]]+u[t[e+11]]+u[t[e+12]]+u[t[e+13]]+u[t[e+14]]+u[t[e+15]]).toLowerCase();if(!l(n))throw TypeError("Stringified UUID is invalid");return n}var h=d;function y(t,e,n){t=t||{};var i=t.random||(t.rng||a)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,e){n=n||0;for(var r=0;r<16;++r)e[n+r]=i[r];return e}return h(i)}e["a"]=y},bc35:function(t,e,n){"use strict";var i=n("735b"),r=n("32da"),a=n("1c60");t.exports=function(t){var e=i(this),n=a(e),o=arguments.length,s=r(o>1?arguments[1]:void 0,n),l=o>2?arguments[2]:void 0,u=void 0===l?n:r(l,n);while(u>s)e[s++]=t;return e}},c407:function(t,e,n){"use strict";var i=n("4bb1"),r=n("e143"),a=(n("eb3b"),n("2237"),n("a567"),function(){function t(e,n){Object(i["a"])(this,t),this.Cesium=e,this.viewer=n}return Object(r["a"])(t,[{key:"getRandomColor",get:function(){for(var t="#",e=["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"],n=0;n<6;n++){var i=Math.floor(Math.random()*e.length+1)-1;t+=e[i]}return t}},{key:"operationDom",value:function(t,e,n){if("append"===t&&document.getElementById(e).appendChild(n),"remove"===t&&document.getElementById(e).remove(),"has"===t)return document.getElementById(e)}},{key:"debounce",value:function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(){var r=this,a=arguments;if(e&&clearTimeout(e),i){var o=!e;e=setTimeout((function(){e=null}),n),o&&t.apply(r,a)}else e=setTimeout((function(){t.apply}),n)}}},{key:"throttle",value:function(t,e,n){var i,r=0;return function(){var a=this,o=arguments;if(1===n){var s=Date.now();s-r>e&&(t.apply(a,o),r=s)}else 2===n&&(i||(i=setTimeout((function(){i=null,t.apply(a,o)}),e)))}}},{key:"createScript",value:function(t){var e=document.createElement("script");e.setAttribute("type","text/javascript"),e.setAttribute("src",t),document.getElementsByTagName("head")[0].appendChild(e)}},{key:"loadJs",value:function(t,e){return new Promise((function(n,i){var r=document.createElement("script");r.type="text/javascript",null!==e&&void 0!==e&&e.async&&e.async&&(r.async="async"),null!==e&&void 0!==e&&e.defer&&e.defer&&(r.defer="defer");var a="body";null!==e&&void 0!==e&&e.append&&e.append&&("body"==e.append||"head"==e.append)&&(a=e.append),r.src=t,document[a].appendChild(r),r.onload=function(){n()},r.onerror=function(){i()}}))}},{key:"randomPoint",value:function(t){var e=t.start,n=t.end,i=t.range||1e3,r=t.height||0,a=t.type||"cartesian3",o=this.Cesium;function s(t,e){return Math.floor(Math.random()*(e-t+1)+t)}var l=s(e[0]*i,n[0]*i)/i,u=s(e[1]*i,n[1]*i)/i;return"cartesian3"==a?o.Cartesian3.fromDegrees(l,u,r):"jwd"==a?[l,u,r]:void 0}},{key:"getEntityPosition",value:function(t){var e=this.Cesium;return t.position?t.position._value||e.Property.getValueOrUndefined(t.position,this.viewer.clock.currentTime||e.JulianDate.now(),new e.Cartesian3):void 0}},{key:"toDegrees",value:function(t){var e=this.Cesium;if(this.isDegreesOrCartesian(t)){var n=function(t){var n=new e.Cartesian3(t.x,t.y,t.z),i=e.Cartographic.fromCartesian(n);return{lng:parseFloat(e.Math.toDegrees(i.longitude).toFixed(8)),lat:parseFloat(e.Math.toDegrees(i.latitude).toFixed(8)),alt:parseFloat(i.height.toFixed(8))}};return t.x&&(t=n(t)),t}}},{key:"getCameraInfo",value:function(){var t=this.viewer;if(t&&t.camera&&t.camera.position&&t.camera.heading){var e=this.toDegrees(t.camera.position),n=Cesium.Math.toDegrees(t.camera.heading),i=Cesium.Math.toDegrees(t.camera.pitch),r=Cesium.Math.toDegrees(t.camera.roll);return{heading:parseFloat(n).toFixed(5),pitch:parseFloat(i).toFixed(5),roll:parseFloat(r).toFixed(5),lng:parseFloat(e.lng).toFixed(7),lat:parseFloat(e.lat).toFixed(7),alt:parseFloat(e.alt).toFixed(2)}}throw new Error("Error in Parameter!")}},{key:"isDegreesOrCartesian",value:function(t){if(!t)throw new Error("Error in Parameter!");return"number"===typeof t.x&&"number"===typeof t.y&&"number"===typeof t.z||"number"===typeof t.lng&&"number"===typeof t.lat}},{key:"toCartesian",value:function(t){var e=this.Cesium;if(this.isDegreesOrCartesian(t)){var n=function(t){return e.Cartesian3.fromDegrees(t.lng,t.lat,t.alt||0)};return t.lng&&(t=n(t)),t}}},{key:"point2LineDistance",value:function(t,e,n){t=this.toCartesian(t),e=this.toCartesian(e),n=this.toCartesian(n);var i=Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)+Math.pow(t.z-e.z,2)),r=Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2)+Math.pow(t.z-n.z,2)),a=Math.sqrt(Math.pow(n.x-e.x,2)+Math.pow(n.y-e.y,2)+Math.pow(n.z-e.z,2)),o=(Math.pow(r,2)+Math.pow(i,2)-Math.pow(a,2))/(2*i*r),s=Math.sqrt(1-Math.pow(o,2)),l=((t.x-n.x)*(t.x-e.x)+(t.y-n.y)*(t.y-e.y)+(t.z-n.z)*(t.z-e.z))/(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)+Math.pow(t.z-e.z,2));return l<0?r:l<=1&&l>=0?r*s:l>1?a:void 0}},{key:"countArea",value:function(t){if(!t||t.length<3)throw new Error("Error in Parameter!");for(var e=0,n=0;n<t.length;n++){var i=(n+1)%t.length,r=t[n],a=t[i];r=this.toCartesian(r),a=this.toCartesian(a),e+=r.x*a.y,e-=r.y*a.x}return e/=2,Math.abs(e)}},{key:"countAreaByThreePoints",value:function(t,e,n){t=this.toCartesian(t),e=this.toCartesian(e),n=this.toCartesian(n);var i=-1,r=[];if(r[0]=Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)+Math.pow(t.z-e.z,2)),r[1]=Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2)+Math.pow(t.z-n.z,2)),r[2]=Math.sqrt(Math.pow(n.x-e.x,2)+Math.pow(n.y-e.y,2)+Math.pow(n.z-e.z,2)),r[0]+r[1]<=r[2]||r[0]+r[2]<=r[1]||r[1]+r[2]<=r[0])return i;var a=(r[0]+r[1]+r[2])/2;return i=Math.sqrt(a*(a-r[0])*(a-r[1])*(a-r[2])),i}},{key:"getDistance",value:function(t,e){if(!t||!e)throw new Error("Error in Parameter!");return t=this.toCartesian(t),e=this.toCartesian(e),Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)+Math.pow(t.z-e.z,2))}},{key:"getNormal",value:function(t,e,n){t=this.toCartesian(t),e=this.toCartesian(e),n=this.toCartesian(n);var i=(e.y-t.y)*(n.z-t.z)-(e.z-t.z)*(n.y-t.y),r=(e.z-t.z)*(n.x-t.x)-(e.x-t.x)*(n.z-t.z),a=(e.x-t.x)*(n.y-t.y)-(e.y-t.y)*(n.x-t.x);return{x:i,y:r,z:a}}},{key:"countIntersectionOfLineAndPlane",value:function(t,e,n,i){var r,a,o,s,l,u,c,d,h,y,m,f,p,g;r=t.x,a=t.y,o=t.z,s=e.x,l=e.y,u=e.z,c=n.x,d=n.y,h=n.z,y=i.x,m=i.y,f=i.z,g=c*r+d*a+h*o;var v={};if(0!==g)return p=((s-y)*r+(l-m)*a+(u-f)*o)/g,v.x=y+c*p,v.y=m+d*p,v.z=f+h*p,v}},{key:"getPointInPolygon",value:function(){var t=this.getNormal(polygon[0],polygon[1],polygon[2]),e=line[0].x-line[1].x,n=line[0].y-line[1].y,i=line[0].z-line[1].z,r={x:e,y:n,z:i},a=this.countIntersectionOfLineAndPlane(t,polygon[1],r,line[0]);return a||!1}},{key:"isPointInQuadrilateral",value:function(){var t,e,n,i,r,a,o,s,l,u,c;o=this.getDistance(quadrilateral[0],quadrilateral[1]),s=this.getDistance(quadrilateral[1],quadrilateral[2]),l=this.getDistance(quadrilateral[0],quadrilateral[2]),u=this.getDistance(quadrilateral[2],quadrilateral[3]),c=this.getDistance(quadrilateral[3],quadrilateral[4]);var d,h,y,m,f=(o+s+l)/2,p=(l+u+c)/2;t=Math.sqrt(f*(f-o)*(f-s)*(f-l)),e=Math.sqrt(p*(p-l)*(p-u)*(p-c)),d=this.getDistance(point,quadrilateral[0]),h=this.getDistance(point,quadrilateral[1]),y=this.getDistance(point,quadrilateral[2]),m=this.getDistance(point,quadrilateral[3]);var g=(o+d+h)/2,v=(s+h+y)/2,P=(u+y+m)/2,w=(c+m+d)/2;return n=Math.sqrt(g*(g-o)*(g-d)*(g-h)),i=Math.sqrt(v*(v-s)*(v-h)*(v-y)),r=Math.sqrt(P*(P-u)*(P-y)*(P-m)),a=Math.sqrt(w*(w-c)*(w-m)*(w-d)),!(Math.abs(n+i+r+a-(t+e))>1e-4)}},{key:"JudgePointInPolygon",value:function(t,e){var n,i,r,a,o,s,l,u,c=function(t,e){return t.y*e.z-e.y*t.z+(t.z*e.x-t.x*e.z)+(t.x*e.y-t.y*e.x)},d=e[0],h=e[1],y=e[2],m=e[3];return n={x:h.x-d.x,y:h.y-d.y,z:h.z-d.z},i={x:t.x-d.x,y:t.y-d.y,z:t.z-d.z},r={x:m.x-y.x,y:m.y-y.y,z:m.z-y.z},a={x:t.x-y.x,y:t.y-y.y,z:t.z-y.z},o={x:y.x-h.x,y:y.y-h.y,z:y.z-h.z},s={x:t.x-h.x,y:t.y-h.y,z:t.z-h.z},l={x:m.x-d.x,y:m.y-d.y,z:m.z-d.z},u={x:t.x-m.x,y:t.y-m.y,z:t.z-m.z},!(c(n,i)*c(r,a)>=0&&c(o,s)*c(l,u)>=0)}},{key:"JudgePointInPolyline",value:function(t,e){var n=Math.sqrt(Math.pow(e[0].x-e[1].x,2)+Math.pow(e[0].y-e[1].y,2)+Math.pow(e[0].z-e[1].z,2)),i=Math.sqrt(Math.pow(t.x-e[1].x,2)+Math.pow(t.y-e[1].y,2)+Math.pow(t.z-e[1].z,2)),r=Math.sqrt(Math.pow(t.x-e[0].x,2)+Math.pow(t.y-e[0].y,2)+Math.pow(t.z-e[0].z,2)),a=i+r-n;return 1e4*a<1}},{key:"GetPanelEquation",value:function(t){var e,n,i,r;if(!(t.length<3))return e=t[0].y*(t[1].z-t[2].z)+t[1].y*(t[2].z-t[0].z)+t[2].y*(t[0].z-t[1].z),n=t[0].z*(t[1].x-t[2].x)+t[1].z*(t[2].x-t[0].x)+t[2].z*(t[0].x-t[1].x),i=t[0].x*(t[1].y-t[2].y)+t[1].x*(t[2].y-t[0].y)+t[2].x*(t[0].y-t[1].y),r=-t[0].x*(t[1].y*t[2].z-t[2].y*t[1].z)-t[1].x*(t[2].y*t[0].z-t[0].y*t[2].z)-t[2].x*(t[0].y*t[1].z-t[1].y*t[0].z),{A:e,B:n,C:i,D:r}}}]),t}());e["a"]=a},e143:function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function r(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}n.d(e,"a",(function(){return r}))},e9ff:function(t,e,n){}}]);