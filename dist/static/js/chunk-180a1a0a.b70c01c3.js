(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-180a1a0a"],{"047c":function(e,t,r){"use strict";r("11ad")},"11ad":function(e,t,r){},"4bb1":function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));r("a567");function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},"78be":function(e,t,r){var n=r("46a7"),i=r("bc35"),o=r("5386");n({target:"Array",proto:!0},{fill:i}),o("fill")},"896e":function(e,t,r){"use strict";var n,i=new Uint8Array(16);function o(){if(!n&&(n="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),!n))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(i)}var a=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function c(e){return"string"===typeof e&&a.test(e)}for(var l=c,s=[],u=0;u<256;++u)s.push((u+256).toString(16).substr(1));function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase();if(!l(r))throw TypeError("Stringified UUID is invalid");return r}var d=f;function p(e,t,r){e=e||{};var n=e.random||(e.rng||o)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){r=r||0;for(var i=0;i<16;++i)t[r+i]=n[i];return t}return d(n)}t["a"]=p},b704:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},i=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("div",{attrs:{id:"cesiumContainer"}})])}],o=(r("eb3b"),r("34b1"),r("e72f"),r("9e48")),a=r("896e"),c=r("4bb1"),l=r("e143"),s=function(){function e(t,r){Object(c["a"])(this,e),this.Cesium=t,this.viewer=r}return Object(l["a"])(e,[{key:"create",value:function(e){var t=this.Cesium,r=this.viewer,n=null!==e&&void 0!==e&&e.cesiumName?e.cesiumName:"",i=null!==e&&void 0!==e&&e.source?e.source:"",o=null!==e&&void 0!==e&&e.uniforms?e.uniforms:"";function a(){this._definitionChanged=new t.Event,this._color=void 0,this.color=null!==e&&void 0!==e&&e.color?e.color:t.Color.BLUE}Object.defineProperties(a.prototype,{isConstant:{get:function(){return!1}},definitionChanged:{get:function(){return this._definitionChanged}},color:t.createPropertyDescriptor("color")});var c="colorMaterial".concat(parseInt(1e3*Math.random()));return a.prototype.getType=function(e){return c},a.prototype.getValue=function(e,n){return t.defined(n)||(n={}),n.color=t.Property.getValueOrClonedDefault(this._color,e,t.Color.WHITE,n.color),r.scene.requestRender(),n},a.prototype.equals=function(e){return this===e||e instanceof a&&t.Property.equals(this._color,e._color)},t.Material._materialCache.addMaterial(c,{fabric:{type:c,uniforms:o,source:i},translucent:function(e){return!0}}),t[n]=a,a}}]),e}(),u=s,f=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return{cesiumName:"Material_color",color:t||e.Color.fromRandom({alpha:.8}),uniforms:{color:t||e.Color.fromRandom({alpha:.8}),diffusePower:1.6,alphaPower:1.5},source:"uniform vec4 color;\n                uniform float diffusePower;\n                uniform float alphaPower;\n                czm_material czm_getMaterial(czm_materialInput materialInput)\n                    {\n                    czm_material material = czm_getDefaultMaterial(materialInput);\n                    vec2 st = materialInput.st;\n                    float alpha = distance(st,vec2(0.5, 0.5));\n                    material.alpha = color.a  * alpha  * alphaPower;\n                    material.diffuse = color.rgb * diffusePower;\n                    return material;\n                }"}},d={name:"District",data:function(){return{viewer:null,_Entity:null,_Material:null,entitiesArr:[]}},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken=Object({NODE_ENV:"production",VUE_APP_BASE_API:"/prod-api",VUE_APP_GAODE_KEY_WEB_SERVICE:"181ced609de9d446207b55e549bafcb6",VUE_APP_GAODE_KEY_WEB_TERMINAL:"cb250acd7ee0e7b2049cb93747ae3d44",VUE_APP_PUBLIC_URL:"/cesium-template",VUE_APP_QINIU_URL:"http://re8r7gk9l.hb-bkt.clouddn.com",VUE_APP_SECURITY_JS_CODE:"2a0ce2005352672661417093c485a056",BASE_URL:"/cesium-template/"}).VUE_APP_TOKEN,this.viewer=new e.Viewer("cesiumContainer",{imageryProvider:new e.UrlTemplateImageryProvider({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"}),terrainProvider:new e.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),shouldAnimate:!0,infoBox:!1,selectionIndicator:!1}),this.viewer.scene.globe.depthTestAgainstTerrain=!1,this.viewer.animation.container.style.visibility="hidden",this.viewer.scene.fxaa=!0,this.viewer.scene.postProcessStages.fxaa.enabled=!0,this._Entity=new o["a"](e,this.viewer),this._Material=new u(e,this.viewer),this.start()},start:function(){var e=this,t=this.cesium,r="/cesium-template/Vue/VectorLayer/GeoJson/District/anhui.json";t.GeoJsonDataSource.load(r,{stroke:t.Color.WHITE,strokeWidth:20,clamToGround:!0}).then((function(r){e.viewer.dataSources.add(r);var n=r.entities.values;e.entitiesArr=n;for(var i=0;i<n.length;i++){var o=n[i];o.polygon.height=0,o.polygon.extrudedHeight=5e3,o.polygon.outline=!1,e._Material.create(f(t)),"宝安区"==o.name?o.polygon.material=t.Color.ORANGE.withAlpha(.8):"南山区"==o.name?o.polygon.material=t.Color.RED.withAlpha(.8):o.polygon.material=new t.Material_color(t.Color.fromRandom({alpha:.8}));var c=t.Cartesian3.fromDegrees(o._properties.centroid._value[0],o._properties.centroid._value[1],100);e._Entity.createLabel({id:Object(a["a"])(),position:c,font:"25px 楷体",text:o.name,showBackground:!1,scale:.8,horizontalOrigin:t.HorizontalOrigin.CENTER,verticalOrigin:t.VerticalOrigin.BOTTOM,distanceDisplayCondition:new t.DistanceDisplayCondition(0,2e6)})}e.$nextTick((function(){e.viewer.flyTo(e.entitiesArr)}))}))}}},p=d,m=(r("047c"),r("cba8")),h=Object(m["a"])(p,n,i,!1,null,"33d5b331",null);t["default"]=h.exports},bc35:function(e,t,r){"use strict";var n=r("735b"),i=r("32da"),o=r("1c60");e.exports=function(e){var t=n(this),r=o(t),a=arguments.length,c=i(a>1?arguments[1]:void 0,r),l=a>2?arguments[2]:void 0,s=void 0===l?r:i(l,r);while(s>c)t[c++]=e;return t}},e143:function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}r.d(t,"a",(function(){return i}))}}]);