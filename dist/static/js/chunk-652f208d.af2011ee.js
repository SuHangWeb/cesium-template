(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-652f208d"],{"46fd":function(e,t,n){},c8be:function(e,t,n){"use strict";n("46fd")},d94c:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{attrs:{id:"cesiumContainer"}}),n("div",{staticClass:"tip-view"},[n("div",{staticClass:"tip"},[e._v("鼠标右键点击 停止绘制")]),n("el-button",{staticClass:"button",attrs:{type:"primary",plain:""},on:{click:e.start}},[e._v("开始绘制")]),n("el-button",{staticClass:"button",attrs:{type:"primary",plain:""},on:{click:e.testBold}},[e._v("测试加粗")])],1)])},r=[],a=(n("4390"),n("9e48")),s={name:"drawLine",data:function(){return{viewer:null,_Entity:null,handler:null,cesiumContainer:null,EntityData:[]}},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken=Object({VUE_APP_BASE_API:"/prod-api",NODE_ENV:"production",BASE_URL:""}).VUE_APP_TOKEN,this.viewer=new e.Viewer("cesiumContainer",{imageryProvider:new e.ArcGisMapServerImageryProvider({url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"}),terrainProvider:new e.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),shouldAnimate:!0,infoBox:!1,selectionIndicator:!1}),this.viewer.scene.globe.depthTestAgainstTerrain=!1,this._Entity=new a["a"](e,this.viewer),this.cesiumContainer=document.getElementById("cesiumContainer"),this.viewer.camera.flyTo({destination:e.Cartesian3.fromDegrees(-75.59742934002912,40.03824624260394,5e3),orientation:{heading:e.Math.toRadians(0),pitch:e.Math.toRadians(-90),roll:0},duration:3})},start:function(){var e=this,t=this.cesium;this.handler=new t.ScreenSpaceEventHandler(this.viewer.scene.canvas),this.cesiumContainer.style.cursor="crosshair";var n=null,i=[],r=function(t){return e.viewer.scene.camera.pickEllipsoid(t,e.viewer.scene.globe.ellipsoid)};this.handler.setInputAction((function(e){var t=r(e.position);0==i.length&&i.push(t.clone()),i.push(t)}),t.ScreenSpaceEventType.LEFT_CLICK),this.handler.setInputAction((function(a){var s=r(a.endPosition);if(i.length>=2)if(t.defined(n))void 0!=s&&(i.pop(),s.y+=1+Math.random(),i.push(s));else{var o=new t.CallbackProperty((function(){return i}),!1);n=e._Entity.createPolyline({positions:o,material:t.Color.RED,width:5})}}),t.ScreenSpaceEventType.MOUSE_MOVE),this.handler.setInputAction((function(t){e.handler.destroy(),console.log(n),e.EntityData.push(n),console.log(e.EntityData),e.cesiumContainer.style.cursor="unset"}),t.ScreenSpaceEventType.RIGHT_CLICK)},testBold:function(){this.EntityData.map((function(e){e.polyline.width=30}))}}},o=s,c=(n("c8be"),n("cba8")),l=Object(c["a"])(o,i,r,!1,null,"55cd3b9c",null);t["default"]=l.exports}}]);