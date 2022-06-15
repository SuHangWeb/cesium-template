(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69f69431"],{"03fa":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{attrs:{id:"cesiumContainer"}}),n("operation-panel",{attrs:{edit:0!=e.rectArr.length},on:{draw:e.drawStart,edit:e.editRect}})],1)},i=[],a=(n("9f90"),n("efe6"),n("13b6"),n("8c9d"),n("d8e0"),n("30d8"),n("d3f5"),n("696f"));function o(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=Object(a["a"])(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){l=!0,o=e},f:function(){try{s||null==n["return"]||n["return"]()}finally{if(l)throw o}}}}n("13a9"),n("4390"),n("31a7"),n("67ad");var s=n("dd8c"),l=n("9e48"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"operationPanel"},[e._m(0),n("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"颜色"}},[n("el-color-picker",{attrs:{size:"mini"},model:{value:e.form.color,callback:function(t){e.$set(e.form,"color",t)},expression:"form.color"}})],1),n("el-form-item",{attrs:{label:"动画"}},[n("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.form.is_animation,callback:function(t){e.$set(e.form,"is_animation",t)},expression:"form.is_animation"}})],1),n("el-form-item",{attrs:{label:"地形"}},[n("el-select",{staticClass:"value",attrs:{size:"mini",placeholder:"请选择地形"},model:{value:e.form.terrainValue,callback:function(t){e.$set(e.form,"terrainValue",t)},expression:"form.terrainValue"}},e._l(e.terrain,(function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),n("el-form-item",{attrs:{label:"文字"}},[n("el-input",{staticClass:"value",attrs:{size:"mini",placeholder:"请输入要创建的文字",clearable:""},model:{value:e.form.text,callback:function(t){e.$set(e.form,"text",t)},expression:"form.text"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:e.drawStart}},[e._v("绘制")]),e.edit?n("el-button",{attrs:{type:"warning"},on:{click:e.editRect}},[e._v("编辑")]):e._e()],1)],1)],1)},u=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"tip-view"},[n("div",{staticClass:"tip-item"},[n("div",{staticClass:"tip-title"},[e._v("绘制：")]),n("div",{staticClass:"tip-step"},[e._v(" 输入文字=》点击绘制按钮 开始绘制 =》按住鼠标左键拖动=》抬起鼠标左键结束绘制 ")])]),n("div",{staticClass:"tip-item"},[n("div",{staticClass:"tip-title"},[e._v("编辑：")]),n("div",{staticClass:"tip-step"},[e._v(" 点击编辑按钮=》选中要编辑的图形 =》拖动点位=》鼠标右键结束编辑 ")])])])}],f={props:{edit:{type:Boolean,default:function(){return!1}}},data:function(){return{terrain:[{label:"位置绝对",value:"NONE"},{label:"位置固定在地形上",value:"CLAMP_TO_GROUND"},{label:"位置高度是指地形上方的高度",value:"RELATIVE_TO_GROUND"}],form:{fontSize:100,color:"#409EFF",is_animation:!1,terrainValue:"CLAMP_TO_GROUND",text:"到此一游"}}},methods:{drawStart:function(){""!=this.form.fontColor?""!=this.form.text?this.$emit("draw",this.form):this.$notify({title:"警告",message:"请输入要创建的文字",type:"warning"}):this.$notify({title:"警告",message:"请选择颜色",type:"warning"})},editRect:function(){this.$emit("edit")}}},h=f,d=(n("fe41"),n("cba8")),p=Object(d["a"])(h,c,u,!1,null,"79445f80",null),v=p.exports,g={name:"textMapRectangle",components:{operationPanel:v},data:function(){return{viewer:null,_Entity:null,handler:null,_Canvas:null,cesiumContainer:null,rect:null,startPoint:null,rectArr:[],gon:null,pointsId:[],centerPoint:null,currentPoint:null}},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken=Object({VUE_APP_BASE_API:"/prod-api",NODE_ENV:"production",BASE_URL:""}).VUE_APP_TOKEN,this.viewer=new e.Viewer("cesiumContainer",{imageryProvider:new e.ArcGisMapServerImageryProvider({url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"}),terrainProvider:new e.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),shouldAnimate:!0,infoBox:!1,selectionIndicator:!1}),this.viewer.scene.globe.depthTestAgainstTerrain=!1,this._Entity=new l["a"](e,this.viewer),this._Canvas=new s["a"](e,this.viewer),this.cesiumContainer=document.getElementById("cesiumContainer"),this.viewer.camera.flyTo({destination:e.Cartesian3.fromDegrees(-75.59742934002912,40.03824624260394,5e3),orientation:{heading:e.Math.toRadians(0),pitch:e.Math.toRadians(-90),roll:0},duration:3})},drawStart:function(e){var t=this,n=e.color,r=e.fontSize,i=e.is_animation,a=(e.terrainValue,e.text),o=this.cesium;this.handler=new o.ScreenSpaceEventHandler(this.viewer.scene.canvas),this.cesiumContainer.style.cursor="crosshair",this.rect=null,this.viewer.scene.screenSpaceCameraController.enableRotate=!1,this.viewer.scene.screenSpaceCameraController.enableZoom=!1,this.handler.setInputAction((function(e){var n=t.viewer.camera.getPickRay(e.position),r=t.viewer.scene.globe.pick(n,t.viewer.scene);o.defined(r)&&(t.startPoint=t._Entity.createPoint({position:r,color:o.Color.CHARTREUSE.withAlpha(1),pixelSize:10,heightReference:o.HeightReference[t.terrainValue],outlineColor:o.Color.WHITE,outlineWidth:1}),t.rect=t._Entity.createRectangle({coordinates:o.Rectangle.fromCartesianArray([r,r]),material:o.Color.GREENYELLOW.withAlpha(.5),outline:!0,outlineColor:o.Color.WHITE,outlineWidth:3,heightReference:o.HeightReference[t.terrainValue]}))}),o.ScreenSpaceEventType.LEFT_DOWN),this.handler.setInputAction((function(e){if(null!=t.startPoint&&null!=t.rect){var n=t.viewer.camera.getPickRay(e.endPosition),r=t.viewer.scene.globe.pick(n,t.viewer.scene);if(r){var i=t.startPoint.position.getValue(o.JulianDate.now());t.rect.rectangle.coordinates=new o.CallbackProperty((function(e,t){return o.Rectangle.fromCartesianArray([i,r])}),!1)}}}),o.ScreenSpaceEventType.MOUSE_MOVE),this.handler.setInputAction((function(e){t.cesiumContainer.style.cursor="default",t.viewer.scene.screenSpaceCameraController.enableRotate=!0,t.viewer.scene.screenSpaceCameraController.enableZoom=!0,t.viewer.entities.remove(t.startPoint),t.handler.removeInputAction(o.ScreenSpaceEventType.LEFT_DOWN),t.handler.removeInputAction(o.ScreenSpaceEventType.MOUSE_MOVE),t.handler.removeInputAction(o.ScreenSpaceEventType.LEFT_UP),t.rect.rectangle.outline=!1;var s=t._Canvas.drawText({text:a,color:n,fontSize:r});if(t.rect.rectangle.material=new o.ImageMaterialProperty({image:s,repeat:new o.Cartesian2(1,1),transparent:!0,color:o.Color.WHITE}),i){var l=function(){return c+=.005};t.viewer.scene.globe.depthTestAgainstTerrain=!1;var c=o.Math.toRadians(30);t.rect.rectangle.rotation=new o.CallbackProperty(l,!1),t.rect.rectangle.stRotation=new o.CallbackProperty(l,!1)}t.rectArr.push(t.rect);var u=t.rect.rectangle.coordinates.getValue();console.log("修改后的面坐标(笛卡尔)：",u);var f=o.Math.toDegrees(u.east),h=o.Math.toDegrees(u.west),d=o.Math.toDegrees(u.north),p=o.Math.toDegrees(u.south);console.log("矩形西南东北坐标:",h,p,f,d)}),o.ScreenSpaceEventType.LEFT_UP)},editRect:function(){var e=this,t=this.cesium,n=!1;this.cesiumContainer.style.cursor="pointer",this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(t.ScreenSpaceEventType.LEFT_DOUBLE_CLICK),this.handler.setInputAction((function(r){var i=r.position,a=e.viewer.scene.pick(i);if(t.defined(a)){var o=a.id,s=e.rectArr.filter((function(e){return e.id==o.id}));if(0==s.length||n)"rect_point"===o.name&&(e.currentPoint=o);else{e.gon=o;var l=e.gon.rectangle.coordinates.getValue(),c=[],u=t.Cartesian3.fromRadians(l.west,l.north);u.flag="westNorth",c.push(u);var f=t.Cartesian3.fromRadians(l.east,l.north);f.flag="eastNorth",c.push(f);var h=t.Cartesian3.fromRadians(l.east,l.south);h.flag="eastSouth",c.push(h);var d=t.Cartesian3.fromRadians(l.west,l.south);d.flag="westSouth",c.push(d),c.map((function(n,r){var i=e._Entity.createPoint({id:"Point-".concat((new Date).getTime(),"-index-").concat(r),name:"rect_point",position:n,color:t.Color.CHARTREUSE.withAlpha(1),pixelSize:10,heightReference:t.HeightReference.CLAMP_TO_GROUND,outlineColor:t.Color.WHITE,outlineWidth:1});i.flag=n.flag,e.pointsId.push(i.id)}));var p=(l.west+l.east)/2,v=(l.north+l.south)/2,g=t.Cartesian3.fromRadians(p,v),m=e._Entity.createPoint({id:"centerPoint-".concat((new Date).getTime()),name:"rect_point",position:g,color:t.Color.RED,pixelSize:10,outlineColor:t.Color.BLACK,outlineWidth:1,heightReference:t.HeightReference.CLAMP_TO_GROUND});m.flag="centerPoint",e.pointsId.push(m.id),n=!0,e.viewer.scene.screenSpaceCameraController.enableRotate=!1,e.viewer.scene.screenSpaceCameraController.enableZoom=!1}}}),t.ScreenSpaceEventType.LEFT_DOWN),this.handler.setInputAction((function(r){if(n&&e.currentPoint&&"rect_point"==e.currentPoint.name){var i=e.viewer.camera.getPickRay(r.endPosition),a=e.viewer.scene.globe.pick(i,e.viewer.scene),o=[];if(!a)return;e.currentPoint.position=a;for(var s=0;s<e.pointsId.length;s++)if(e.currentPoint.id==e.pointsId[s]){var l=e.currentPoint.position._value;l.flag=e.currentPoint.flag,o.push(l)}else{var c=e.pointsId[s];l=e.viewer.entities.getById(c).position._value;l.flag=e.viewer.entities.getById(c).flag,o.push(l)}if("undefined"==typeof e.currentPoint){var u=t.Rectangle.fromDegrees(O,k,M,x);return u}var f=e.viewer.scene.globe.ellipsoid,h=[],d=[];if("westNorth"==e.currentPoint.flag||"eastSouth"==e.currentPoint.flag){for(var p=0;p<o.length;p++)if("westNorth"==o[p].flag||"eastSouth"==o[p].flag){var v=f.cartesianToCartographic(o[p]),g=t.Math.toDegrees(v.longitude),m=t.Math.toDegrees(v.latitude);h.push(g),d.push(m)}}else if("eastNorth"==e.currentPoint.flag||"westSouth"==e.currentPoint.flag){for(s=0;s<o.length;s++)if("eastNorth"==o[s].flag||"westSouth"==o[s].flag){var w=f.cartesianToCartographic(o[s]),C=t.Math.toDegrees(w.longitude),y=t.Math.toDegrees(w.latitude);h.push(C),d.push(y)}}else if("centerPoint"==e.currentPoint.flag){var S=f.cartesianToCartographic(e.currentPoint.position._value),b=t.Math.toDegrees(S.longitude),_=t.Math.toDegrees(S.latitude),E=e.gon.rectangle.coordinates.getValue(),P=t.Math.toDegrees(E.east)-t.Math.toDegrees(E.west),T=t.Math.toDegrees(E.north)-t.Math.toDegrees(E.south),R=b+P/2;h.push(R);var I=b-P/2;h.push(I);var A=_+T/2;d.push(A);var D=_-T/2;d.push(D)}for(var M=Math.max.apply(null,h),O=Math.min.apply(null,h),x=Math.max.apply(null,d),k=Math.min.apply(null,d),N=0;N<e.pointsId.length;N++){var V=e.pointsId[N],L=e.viewer.entities.getById(V);if("undefined"!=typeof L&&"undefined"!=typeof e.currentPoint&&L.flag!=e.currentPoint.flag)if("westNorth"==L.flag)L.position=t.Cartesian3.fromDegrees(O,x);else if("eastNorth"==L.flag)L.position=t.Cartesian3.fromDegrees(M,x);else if("eastSouth"==L.flag)L.position=t.Cartesian3.fromDegrees(M,k);else if("westSouth"==L.flag)L.position=t.Cartesian3.fromDegrees(O,k);else if("centerPoint"==L.flag){var U=(O+M)/2,j=(x+k)/2;L.position=t.Cartesian3.fromDegrees(U,j)}}if(O>=M||k>=x)return void(e.currentPoint=void 0);u=t.Rectangle.fromDegrees(O,k,M,x);e.gon.rectangle.coordinates=new t.CallbackProperty((function(e,t){return u}),!1)}}),t.ScreenSpaceEventType.MOUSE_MOVE),this.handler.setInputAction((function(t){e.currentPoint=void 0}),t.ScreenSpaceEventType.LEFT_UP),this.handler.setInputAction((function(n){e.viewer.scene.screenSpaceCameraController.enableRotate=!0,e.viewer.scene.screenSpaceCameraController.enableZoom=!0;var r,i=o(e.pointsId);try{for(i.s();!(r=i.n()).done;){var a=r.value;e.viewer.entities.removeById(a)}}catch(h){i.e(h)}finally{i.f()}e.pointsId=[],e.centerPoint=null,e.currentPoint=null;var s=e.gon.rectangle.coordinates.getValue();console.log("修改后的面坐标(笛卡尔)：",s);var l=t.Math.toDegrees(s.east),c=t.Math.toDegrees(s.west),u=t.Math.toDegrees(s.north),f=t.Math.toDegrees(s.south);console.log("矩形西南东北坐标:",c,f,l,u),e.gon=null,e.cesiumContainer.style.cursor="default"}),t.ScreenSpaceEventType.RIGHT_CLICK)}}},m=g,w=(n("2efc"),Object(d["a"])(m,r,i,!1,null,"257d9e99",null));t["default"]=w.exports},"2efc":function(e,t,n){"use strict";n("deae")},"696f":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n("8b89"),n("13b6"),n("67ad"),n("cca2"),n("d8e0"),n("f4d8"),n("9c52");var r=n("9680");function i(e,t){if(e){if("string"===typeof e)return Object(r["a"])(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r["a"])(e,t):void 0}}},"88fb":function(e,t,n){},9680:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},dd8c:function(e,t,n){"use strict";var r=n("d941"),i=n("c3ae"),a=n("c15f"),o=n("a35b"),s=(n("13b6"),function(){function e(t,n){Object(a["a"])(this,e),this.Cesium=t,this.viewer=n}return Object(o["a"])(e,[{key:"drawText",value:function(e){var t=e.text,n=document.createElement("canvas"),r=(t+"").length*e.fontSize;n.width=r,n.height=e.fontSize;var i=n.getContext("2d");return i.fillStyle=e.color,i.font="bold "+e.fontSize+"px 微软雅黑",i.textBaseline="hanging",i.fillText(t,0,0),n}},{key:"drawImageText",value:function(){var e=Object(i["a"])(Object(r["a"])().mark((function e(t){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e,n){var r,i=document.createElement("img");i.src=t.src,i.onload=function(){r=document.createElement("canvas"),r.height=t.height,r.width=t.width;var n=r.getContext("2d");n.clearRect(0,0,r.width,r.height),n.drawImage(i,0,0),n.font="30px bold 楷体",n.fillStyle="#fff";var a="阳性："+t.data.num;n.fillText(a,(r.width-30*a.length)/2,(r.height+30)/2),e(r)}}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}]),e}());t["a"]=s},deae:function(e,t,n){},fe41:function(e,t,n){"use strict";n("88fb")}}]);