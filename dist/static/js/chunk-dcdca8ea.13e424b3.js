(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dcdca8ea"],{"0bff":function(e,i,t){"use strict";t("62dd")},"62dd":function(e,i,t){},"83f3":function(e,i,t){"use strict";t.r(i);var n=function(){var e=this,i=e.$createElement;e._self._c;return e._m(0)},a=[function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"container"},[t("div",{attrs:{id:"cesiumContainer"}})])}],r=t("9e48"),o={name:"dynamicPosition",data:function(){return{viewer:null,_Entity:null}},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken=Object({NODE_ENV:"production",VUE_APP_BASE_API:"/prod-api",VUE_APP_GAODE_KEY_WEB_SERVICE:"181ced609de9d446207b55e549bafcb6",VUE_APP_GAODE_KEY_WEB_TERMINAL:"cb250acd7ee0e7b2049cb93747ae3d44",VUE_APP_PUBLIC_URL:"/cesium-template",BASE_URL:""}).VUE_APP_TOKEN,this.viewer=new e.Viewer("cesiumContainer",{imageryProvider:new e.UrlTemplateImageryProvider({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"}),terrainProvider:new e.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),shouldAnimate:!0,timeline:!0,infoBox:!1,selectionIndicator:!1,sceneMode:2}),this.viewer.scene.globe.enableLighting=!0,this.viewer.scene.globe.depthTestAgainstTerrain=!0,e.Math.setRandomNumberSeed(3),this._Entity=new r["a"](e,this.viewer),this.start(),this.viewer.camera.setView({destination:e.Cartesian3.fromDegrees(123.43382736814452,41.811201240193164,3e3),orientation:{heading:e.Math.toRadians(0),pitch:e.Math.toRadians(-90),roll:0},duration:3})},start:function(){var e=this.cesium,i=e.JulianDate.fromDate(new Date),t=e.JulianDate.addSeconds(i,360,new e.JulianDate);this.viewer.clock.startTime=i.clone(),this.viewer.clock.stopTime=t.clone(),this.viewer.clock.currentTime=i.clone(),this.viewer.clock.clockRange=e.ClockRange.LOOP_STOP,this.viewer.clock.multiplier=10,this.viewer.timeline.zoomTo(i,t);var n=function(){for(var t=[[123.4339643124376,41.81140372072612,0],[123.38490962816378,41.88254440941469,0]],n=new e.SampledPositionProperty,a=0;a<t.length;a++){var r=e.JulianDate.addSeconds(i,10*a,new e.JulianDate),o=e.Cartesian3.fromDegrees(t[a][0],t[a][1],t[a][2]);n.addSample(r,o)}return n},a=n(i);this._Entity.createModel({common:{availability:new e.TimeIntervalCollection([new e.TimeInterval({start:i,stop:t})]),orientation:new e.VelocityOrientationProperty(a)},position:a,uri:"/Vue/Entity/dynamicPosition/qiche.gltf",maximumScale:100,minimumPixelSize:30,heightReference:e.HeightReference.CLAMP_TO_GROUND})}}},c=o,s=(t("0bff"),t("cba8")),l=Object(s["a"])(c,n,a,!1,null,"4fdfa57e",null);i["default"]=l.exports}}]);