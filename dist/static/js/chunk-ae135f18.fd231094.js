(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ae135f18"],{"097a":function(e,t,n){"use strict";n("6a5e")},"6a5e":function(e,t,n){},"7d2b":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{attrs:{id:"cesiumContainer"}})])}],o=n("c15f"),a=n("a35b"),s=(n("13b6"),n("30d8"),n("4390"),function(){function e(t,n,i,r){Object(o["a"])(this,e),this.Cesium=t,this.viewer=n,this.geojson=i,this.color=r}return Object(a["a"])(e,[{key:"init",value:function(){var e=this,t=this,n=this.Cesium;this.viewer.scene.globe.depthTestAgainstTerrain=!1;var i=this.Cesium.GeoJsonDataSource.load(this.geojson,{clampToGround:!0});i.then((function(i){e.viewer.dataSources.add(i);var r=i.entities.values;r.map((function(e,i){return e.nameID=i,e.polyline.width=50,e.polyline.material=new n.PolylineGlowMaterialProperty({glowPower:.1,color:n.Color.fromCssColorString(t.color)}),e}))})),this.viewer.flyTo(i)}}]),e}()),c=s,u={name:"HaloLine",data:function(){return{viewer:null}},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken=Object({VUE_APP_BASE_API:"/prod-api",NODE_ENV:"production",BASE_URL:""}).VUE_APP_TOKEN,this.viewer=new e.Viewer("cesiumContainer",{imageryProvider:new e.ArcGisMapServerImageryProvider({url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"}),terrainProvider:new e.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),shouldAnimate:!0,infoBox:!1,selectionIndicator:!1}),this.viewer.scene.globe.depthTestAgainstTerrain=!1,this.start()},start:function(){var e=this.cesium,t=new c(e,this.viewer,"/file/HaloLine/geojson/wuhan-line1.json","#ffa500");t.init()}}},l=u,f=(n("097a"),n("cba8")),d=Object(f["a"])(l,i,r,!1,null,"7788162b",null);t["default"]=d.exports},a35b:function(e,t,n){"use strict";function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function r(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}n.d(t,"a",(function(){return r}))},c15f:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n("d3f5");function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}}}]);