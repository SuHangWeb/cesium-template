(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-125ab58c"],{"4bb1":function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));r("a567");function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},5733:function(e,t,r){"use strict";r("7d0b")},"78be":function(e,t,r){var n=r("46a7"),i=r("bc35"),o=r("5386");n({target:"Array",proto:!0},{fill:i}),o("fill")},"7d0b":function(e,t,r){},"896e":function(e,t,r){"use strict";var n,i=new Uint8Array(16);function o(){if(!n&&(n="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),!n))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(i)}var a=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function c(e){return"string"===typeof e&&a.test(e)}for(var s=c,u=[],f=0;f<256;++f)u.push((f+256).toString(16).substr(1));function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=(u[e[t+0]]+u[e[t+1]]+u[e[t+2]]+u[e[t+3]]+"-"+u[e[t+4]]+u[e[t+5]]+"-"+u[e[t+6]]+u[e[t+7]]+"-"+u[e[t+8]]+u[e[t+9]]+"-"+u[e[t+10]]+u[e[t+11]]+u[e[t+12]]+u[e[t+13]]+u[e[t+14]]+u[e[t+15]]).toLowerCase();if(!s(r))throw TypeError("Stringified UUID is invalid");return r}var l=d;function p(e,t,r){e=e||{};var n=e.random||(e.rng||o)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){r=r||0;for(var i=0;i<16;++i)t[r+i]=n[i];return t}return l(n)}t["a"]=p},bc35:function(e,t,r){"use strict";var n=r("735b"),i=r("32da"),o=r("1c60");e.exports=function(e){var t=n(this),r=o(t),a=arguments.length,c=i(a>1?arguments[1]:void 0,r),s=a>2?arguments[2]:void 0,u=void 0===s?r:i(s,r);while(u>c)t[c++]=e;return t}},e143:function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}r.d(t,"a",(function(){return i}))},fbea:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},i=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("div",{attrs:{id:"cesiumContainer"}}),r("div",{})])}],o=(r("5f01"),r("9e48")),a=r("896e"),c={data:function(){return{viewer:null,_Entity:null}},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken=Object({NODE_ENV:"production",VUE_APP_BASE_API:"/prod-api",VUE_APP_GAODE_KEY_WEB_SERVICE:"181ced609de9d446207b55e549bafcb6",VUE_APP_GAODE_KEY_WEB_TERMINAL:"cb250acd7ee0e7b2049cb93747ae3d44",VUE_APP_PUBLIC_URL:"/cesium-template",VUE_APP_QINIU_URL:"http://re8r7gk9l.hb-bkt.clouddn.com",VUE_APP_SECURITY_JS_CODE:"2a0ce2005352672661417093c485a056",BASE_URL:"/cesium-template/"}).VUE_APP_TOKEN,this.viewer=new e.Viewer("cesiumContainer",{imageryProvider:new e.ArcGisMapServerImageryProvider({url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"}),terrainProvider:new e.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),infoBox:!1,selectionIndicator:!1,navigation:!1,animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,shouldAnimate:!1}),this.viewer.scene.fxaa=!0,this.viewer.scene.postProcessStages.fxaa.enabled=!0,this._Entity=new o["a"](e,this.viewer),this.start()},start:function(){var e=this.cesium,t=this;function r(r,n){for(var i=[],o=0,c=0;c<r;c++){o=c*n;var s=t._Entity.createModel({id:Object(a["a"])(),position:e.Cartesian3.fromDegrees(123.42949456471793,41.81741540043599,o),uri:"/cesium-template/Vue/Models/gLTF/storey/floor.glb",heightReference:e.HeightReference.RELATIVE_TO_GROUND});i.push(s)}var u=t._Entity.createModel({id:Object(a["a"])(),position:e.Cartesian3.fromDegrees(123.42949456471793,41.81741540043599,r*n),uri:"/cesium-template/Vue/Models/gLTF/storey/top.glb",heightReference:e.HeightReference.RELATIVE_TO_GROUND});return[].concat(i,[u])}this.viewer.flyTo(r(9,3))}}},s=c,u=(r("5733"),r("cba8")),f=Object(u["a"])(s,n,i,!1,null,"00ac334b",null);t["default"]=f.exports}}]);