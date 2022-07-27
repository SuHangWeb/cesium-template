(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-77ada6c9"],{"1e71":function(e,t,r){},"3bde":function(e,t,r){"use strict";r("1e71")},e9d3:function(e,t,r){"use strict";var i=r("4bb1"),a=r("e143"),n=(r("7502"),r("2237"),r("eb3b"),r("a567"),function(){function e(t,r){Object(i["a"])(this,e),this.Cesium=t,this.viewer=r}return Object(a["a"])(e,[{key:"formCssColorString",value:function(e){var t=this.Cesium;return t.Color.fromCssColorString(e)}},{key:"getPosition",value:function(e){var t=this.Cesium,r=this.viewer,i=r.scene.camera.pickEllipsoid(e.position),a=t.Cartographic.fromCartesian(i),n=t.Math.toDegrees(a.longitude),o=t.Math.toDegrees(a.latitude),s=Number(r.camera.positionCartographic.height.toFixed(0));return{longitude:n,latitude:o,cameraHeight:s}}},{key:"terrainProviderHeight",value:function(e){var t=this.Cesium,r=t.createWorldTerrain(),i=t.sampleTerrainMostDetailed(r,e);return Promise.resolve(i)}},{key:"getSeibelCurve",value:function(e,t,r,i){var a=this.Cesium,n=[],o=a.Cartographic.fromCartesian(e),s=a.Cartographic.fromCartesian(t),l=180*o.longitude/Math.PI,u=180*o.latitude/Math.PI,c=180*s.longitude/Math.PI,h=180*s.latitude/Math.PI,f=Math.sqrt((l-c)*(l-c)+(u-h)*(u-h)),d=f*r,v=a.Cartesian3.clone(e),m=a.Cartesian3.clone(t),p=a.Cartesian3.distance(v,a.Cartesian3.ZERO),g=a.Cartesian3.distance(m,a.Cartesian3.ZERO);if(a.Cartesian3.normalize(v,v),a.Cartesian3.normalize(m,m),0===a.Cartesian3.distance(v,m))return n;var C=a.Cartesian3.angleBetween(v,m);n.push(e);for(var b=1;b<i-1;b++){var y=1*b/(i-1),w=1-y,E=Math.sin(w*C)/Math.sin(C),P=Math.sin(y*C)/Math.sin(C),_=a.Cartesian3.multiplyByScalar(v,E,new a.Cartesian3),A=a.Cartesian3.multiplyByScalar(m,P,new a.Cartesian3),M=a.Cartesian3.add(_,A,new a.Cartesian3),k=y*Math.PI,T=p*w+g*y+Math.sin(k)*d,D=a.Cartesian3.multiplyByScalar(M,T,M);n.push(D)}return n.push(t),n}},{key:"getCatesian3FromPX",value:function(e){var t=this.viewer.camera.getPickRay(e);return t?this.viewer.scene.globe.pick(t,this.viewer.scene):null}},{key:"meter2Lat",value:function(e){var t=Math.PI,r=12742*t/360;return e/r/1e3}},{key:"meter2Lng",value:function(e,t){var r=Math.PI,i=6371*Math.cos(t*r/180)*2*r/360;return e/i/1e3}},{key:"isDegreesOrCartesian",value:function(e){if(!e)throw new Error("Error in Parameter!");return"number"===typeof e.x&&"number"===typeof e.y&&"number"===typeof e.z||"number"===typeof e.lng&&"number"===typeof e.lat}},{key:"toDegrees",value:function(e){var t=this.Cesium;if(this.isDegreesOrCartesian(e)){var r=function(e){var r=new t.Cartesian3(e.x,e.y,e.z),i=t.Cartographic.fromCartesian(r);return{lng:parseFloat(t.Math.toDegrees(i.longitude).toFixed(8)),lat:parseFloat(t.Math.toDegrees(i.latitude).toFixed(8)),alt:parseFloat(i.height.toFixed(8))}};return e.x&&(e=r(e)),e}}},{key:"toCartesian",value:function(e){var t=this.Cesium;if(this.isDegreesOrCartesian(e)){var r=function(e){return t.Cartesian3.fromDegrees(e.lng,e.lat,e.alt||0)};return e.lng&&(e=r(e)),e}}},{key:"toWindowCoordinates",value:function(e){var t=this.Cesium,r=this.viewer;if(r&&e&&e.x&&e.y&&e.z)return t.SceneTransforms.wgs84ToWindowCoordinates(r.scene,e);if(r&&e.lng&&e.lat&&e.alt)return t.SceneTransforms.wgs84ToWindowCoordinates(r.scene,toCartesianFromDegrees(e));throw new Error("Error in Parameter!")}}]),e}());t["a"]=n},fbea:function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("div",{attrs:{id:"cesiumContainer"}}),r("el-card",{staticClass:"operation-panel"},[r("div",{staticClass:"operation-header clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("楼层分解")])]),r("div",{staticClass:"operation-content"},[r("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px",size:"mini"}},[r("el-form-item",{attrs:{label:"整体控制"}},[r("el-radio-group",{on:{change:e.wholeChange},model:{value:e.form.whole,callback:function(t){e.$set(e.form,"whole",t)},expression:"form.whole"}},e._l(e.wholeArr,(function(t,i){return r("el-radio-button",{key:i,attrs:{label:t.value}},[e._v(e._s(t.label)+" ")])})),1)],1),r("el-form-item",{attrs:{label:"显示指定"}},[r("el-radio-group",{on:{change:e.appointChange},model:{value:e.form.appoint,callback:function(t){e.$set(e.form,"appoint",t)},expression:"form.appoint"}},e._l(e.appointArr,(function(t,i){return r("el-radio",{key:i,staticClass:"appoint-radio",attrs:{border:"",label:t.value}},[e._v(e._s(t.label)+" ")])})),1)],1)],1)],1)])],1)},a=[],n=(r("5f01"),r("7502"),r("df64"),r("a567"),r("9e48")),o=r("e9d3"),s=r("3c88"),l=r.n(s),u=r("896e"),c={data:function(){return{viewer:null,handler:null,_Entity:null,_Transform:null,cesiumContainerDom:null,wholeArr:[{value:1,label:"展开"},{value:2,label:"合并"},{value:3,label:"还原"}],appointArr:[{value:1,label:"一楼"},{value:2,label:"二楼"},{value:3,label:"三楼"},{value:4,label:"四楼"},{value:5,label:"五楼"},{value:6,label:"六楼"},{value:7,label:"七楼"},{value:8,label:"八楼"},{value:9,label:"九楼"},{value:0,label:"顶楼"}],form:{whole:"",appoint:""},EntityArr:[],defaultPosition:{lat:41.81741540043599,lng:123.42949456471793},offsetLng:"",offsetMeter:""}},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken=Object({NODE_ENV:"production",VUE_APP_BASE_API:"/prod-api",VUE_APP_GAODE_KEY_WEB_SERVICE:"181ced609de9d446207b55e549bafcb6",VUE_APP_GAODE_KEY_WEB_TERMINAL:"cb250acd7ee0e7b2049cb93747ae3d44",VUE_APP_PUBLIC_URL:"/cesium-template",VUE_APP_QINIU_URL:"http://re8r7gk9l.hb-bkt.clouddn.com",VUE_APP_SECURITY_JS_CODE:"2a0ce2005352672661417093c485a056",BASE_URL:"/cesium-template/"}).VUE_APP_TOKEN,this.viewer=new e.Viewer("cesiumContainer",{imageryProvider:new e.ArcGisMapServerImageryProvider({url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"}),terrainProvider:new e.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),infoBox:!1,selectionIndicator:!1,navigation:!1,animation:!1,timeline:!1,baseLayerPicker:!1,geocoder:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,shouldAnimate:!1}),this.viewer.scene.fxaa=!0,this.viewer.scene.postProcessStages.fxaa.enabled=!0,this._Entity=new n["a"](e,this.viewer),this._Transform=new o["a"](e,this.viewer),this.handler=new e.ScreenSpaceEventHandler(this.viewer.scene.canvas),this.cesiumContainerDom=document.getElementById("cesiumContainer"),this.viewer.scene.terrainProvider=new e.EllipsoidTerrainProvider({}),this.start()},start:function(){var e=this,t=this.cesium,r=this;function i(e,i){for(var a=[],n=0,o=0;o<e;o++){n=o*i;var s=r._Entity.createModel({id:Object(u["a"])(),position:t.Cartesian3.fromDegrees(r.defaultPosition.lng,r.defaultPosition.lat,n),uri:"/cesium-template/Vue/Models/gLTF/storey/floor.glb",heightReference:t.HeightReference.RELATIVE_TO_GROUND});a.push(s)}var l=r._Entity.createModel({id:Object(u["a"])(),position:t.Cartesian3.fromDegrees(r.defaultPosition.lng,r.defaultPosition.lat,e*i),uri:"/cesium-template/Vue/Models/gLTF/storey/top.glb",heightReference:t.HeightReference.RELATIVE_TO_GROUND});return[].concat(a,[l])}function a(e,r){r?(e.model.color=t.Color.RED.withAlpha(.5),e.model.colorBlendMode=t.ColorBlendMode.MIX,e.model.colorBlendAmount=.5,e.model.silhouetteColor="Red",e.model.silhouetteSize=2):(e.model.color=void 0,e.model.colorBlendMode=void 0,e.model.colorBlendAmount=void 0,e.model.silhouetteColor=void 0,e.model.silhouetteSize=void 0)}this.EntityArr=i(9,3),this.viewer.flyTo(this.EntityArr),this.offsetMeter=Math.abs(Number(this._Transform.meter2Lng(15,this.defaultPosition.lng))),this.offsetLng=Number(new l.a(this.defaultPosition.lng).plus(this.offsetMeter)),this.handler.setInputAction((function(r){var i=e.viewer.scene.pick(r.endPosition);if(t.defined(i)){e.cesiumContainerDom.style.cursor="pointer";for(var n=i.id,o=0;o<e.EntityArr.length;o++){var s=e.EntityArr[o];a(s,!1),s._id==n._id&&a(n,!0)}}else{e.cesiumContainerDom.style.cursor="default";for(var l=0;l<e.EntityArr.length;l++){var u=e.EntityArr[l];a(u,!1)}}}),t.ScreenSpaceEventType.MOUSE_MOVE),this.handler.setInputAction((function(t){var r=e.viewer.scene.pick(t.position);if(r)for(var i=r.id,a=0;a<e.EntityArr.length;a++){var n,o=e.EntityArr[a],s=void 0;s=null!==(n=o.position)&&void 0!==n&&n._value?e.cartesian3TolngLatAlt(o.position._value):e.cartesian3TolngLatAlt(o.position.getValue()),o._id==i._id&&s[0]==e.defaultPosition.lng?o.position=e.getCallbackProperty(s,"offset"):o.position=e.getCallbackProperty(s,"noOffset")}}),t.ScreenSpaceEventType.LEFT_CLICK)},cartesian3TolngLatAlt:function(e){var t=this.cesium;if(!e||3!==Object.keys(e).length)throw new Error("请传入合法的cartesian对象 {x, y, z}");var r=new t.Cartesian3(e.x,e.y,e.z),i=t.Cartographic.fromCartesian(r),a=t.Math.toDegrees(i.latitude),n=t.Math.toDegrees(i.longitude),o=Math.round(i.height);return[n,a,o]},getCallbackProperty:function(e,t,r){var i=this,a=this.cesium;if("open"==t){var n=e[2];return new a.CallbackProperty((function(t){return n>=r?n=r:n++,a.Cartesian3.fromDegrees(e[0],e[1],n)}),!1)}if("merge"==t){var o=e[2];return new a.CallbackProperty((function(t){return o<=r?o=r:o--,a.Cartesian3.fromDegrees(e[0],e[1],o)}),!1)}if("recovery"==t)return a.Cartesian3.fromDegrees(this.defaultPosition.lng,e[1],r);if("offset"==t){var s=e[0];return new a.CallbackProperty((function(t){return s>=i.offsetLng?s=i.offsetLng:s+=i.offsetMeter/30,a.Cartesian3.fromDegrees(s,e[1],e[2])}),!1)}if("noOffset"==t){var l=e[0];return new a.CallbackProperty((function(t){return l<=i.defaultPosition.lng?l=i.defaultPosition.lng:l-=i.offsetMeter/30,a.Cartesian3.fromDegrees(l,e[1],e[2])}),!1)}},wholeChange:function(e){this.cesium;this.form.appoint="";for(var t=0;t<this.EntityArr.length;t++){var r,i=this.EntityArr[t],a=void 0;a=null!==(r=i.position)&&void 0!==r&&r._value?this.cartesian3TolngLatAlt(i.position._value):this.cartesian3TolngLatAlt(i.position.getValue()),1===e&&(i.show=!0,i.position=this.getCallbackProperty(a,"open",3*t*2)),2===e&&(i.show=!0,i.position=this.getCallbackProperty(a,"merge",3*t)),3===e&&(i.show=!0,i.position=this.getCallbackProperty(a,"recovery",3*t))}},appointChange:function(e){this.form.whole="";for(var t=0;t<this.EntityArr.length;t++){var r,i=this.EntityArr[t],a=void 0;a=null!==(r=i.position)&&void 0!==r&&r._value?this.cartesian3TolngLatAlt(i.position._value):this.cartesian3TolngLatAlt(i.position.getValue()),i.position=this.getCallbackProperty(a,"merge",3*t),i.show=0===e||t<e}}}},h=c,f=(r("3bde"),r("cba8")),d=Object(f["a"])(h,i,a,!1,null,"19c0e5de",null);t["default"]=d.exports}}]);