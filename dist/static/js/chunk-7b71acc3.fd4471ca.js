(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b71acc3"],{2237:function(e,t,a){"use strict";var n=a("46a7"),r=a("4162"),i=a("d2cf"),o=a("4488"),s=a("7f99"),u=a("d2b9"),l=RangeError,c=String,h=Math.floor,y=r(s),d=r("".slice),p=r(1..toFixed),f=function(e,t,a){return 0===t?a:t%2===1?f(e,t-1,a*e):f(e*e,t/2,a)},v=function(e){var t=0,a=e;while(a>=4096)t+=12,a/=4096;while(a>=2)t+=1,a/=2;return t},m=function(e,t,a){var n=-1,r=a;while(++n<6)r+=t*e[n],e[n]=r%1e7,r=h(r/1e7)},x=function(e,t){var a=6,n=0;while(--a>=0)n+=e[a],e[a]=h(n/t),n=n%t*1e7},w=function(e){var t=6,a="";while(--t>=0)if(""!==a||0===t||0!==e[t]){var n=c(e[t]);a=""===a?n:a+y("0",7-n.length)+n}return a},g=u((function(){return"0.000"!==p(8e-5,3)||"1"!==p(.9,0)||"1.25"!==p(1.255,2)||"1000000000000000128"!==p(0xde0b6b3a7640080,0)}))||!u((function(){p({})}));n({target:"Number",proto:!0,forced:g},{toFixed:function(e){var t,a,n,r,s=o(this),u=i(e),h=[0,0,0,0,0,0],p="",g="0";if(u<0||u>20)throw l("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return c(s);if(s<0&&(p="-",s=-s),s>1e-21)if(t=v(s*f(2,69,1))-69,a=t<0?s*f(2,-t,1):s/f(2,t,1),a*=4503599627370496,t=52-t,t>0){m(h,0,a),n=u;while(n>=7)m(h,1e7,0),n-=7;m(h,f(10,n,1),0),n=t-1;while(n>=23)x(h,1<<23),n-=23;x(h,1<<n),m(h,1,1),x(h,2),g=w(h)}else m(h,0,a),m(h,1<<-t,0),g=w(h)+y("0",u);return u>0?(r=g.length,g=p+(r<=u?"0."+y("0",u-r)+g:d(g,0,r-u)+"."+d(g,r-u))):g=p+g,g}})},4488:function(e,t,a){var n=a("4162");e.exports=n(1..valueOf)},"4bb1":function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a("a567");function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},"692a":function(e,t,a){"use strict";a("e2e6")},"78be":function(e,t,a){var n=a("46a7"),r=a("bc35"),i=a("5386");n({target:"Array",proto:!0},{fill:r}),i("fill")},"83f3":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{attrs:{id:"cesiumContainer"}})])}],i=a("9e48"),o=a("c407"),s={name:"dynamicPosition",data:function(){return{viewer:null,_Entity:null,_Utils:null}},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken=Object({NODE_ENV:"production",VUE_APP_BASE_API:"/prod-api",VUE_APP_GAODE_KEY_WEB_SERVICE:"181ced609de9d446207b55e549bafcb6",VUE_APP_GAODE_KEY_WEB_TERMINAL:"cb250acd7ee0e7b2049cb93747ae3d44",VUE_APP_PUBLIC_URL:"/cesium-template",VUE_APP_SECURITY_JS_CODE:"2a0ce2005352672661417093c485a056",BASE_URL:""}).VUE_APP_TOKEN,this.viewer=new e.Viewer("cesiumContainer",{imageryProvider:new e.UrlTemplateImageryProvider({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"}),terrainProvider:new e.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),shouldAnimate:!0,timeline:!0,infoBox:!1,selectionIndicator:!1,animation:!1}),this.viewer.timeline.container.style.display="none",this.viewer.scene.globe.enableLighting=!0,this.viewer.scene.globe.depthTestAgainstTerrain=!0,e.Math.setRandomNumberSeed(3);var t=e.JulianDate.fromDate(new Date);t=e.JulianDate.addHours(t,8,new e.JulianDate);var a=e.JulianDate.addSeconds(t,400,new e.JulianDate);this.viewer.clock.startTime=t.clone(),this.viewer.clock.currentTime=t.clone(),this.viewer.clock.stopTime=a.clone(),this.viewer.clock.multiplier=1,this.viewer.timeline.zoomTo(t,a),this.viewer.clock.clockRange=e.ClockRange.LOOP_STOP,this._Entity=new i["a"](e,this.viewer),this._Utils=new o["a"](e,this.viewer),this.start(),this.viewer.camera.setView({destination:e.Cartesian3.fromDegrees(123.43382736814452,41.811201240193164,3e3),orientation:{heading:e.Math.toRadians(0),pitch:e.Math.toRadians(-90),roll:0},duration:3})},computeFlight:function(e){for(var t=this.cesium,a=new t.SampledPositionProperty,n=0;n<e.length;n++){var r=t.JulianDate.addSeconds(start,e[n].time,new t.JulianDate),i=t.Cartesian3.fromDegrees(e[n].longitude,e[n].dimension,e[n].height);a.addSample(r,i)}return a},start:function(){var e=this.cesium,t=new e.Cartesian3.fromDegrees(123.43414668444673,41.811367093937214),a=new e.Cartesian3.fromDegrees(123.41625747004427,41.830387309925065),n=0,r=new e.CallbackProperty((function(r){return n>5e3&&(n=0),n++,e.Cartesian3.lerp(t,a,n/5e3,new e.Cartesian3)}),!1);this._Entity.createModel({common:{orientation:new e.VelocityOrientationProperty(r)},position:r,uri:"/Vue/Entity/dynamicPosition/qiche.gltf",maximumScale:100,minimumPixelSize:30,heightReference:e.HeightReference.CLAMP_TO_GROUND})}}},u=s,l=(a("692a"),a("cba8")),c=Object(l["a"])(u,n,r,!1,null,"f4bd4c6e",null);t["default"]=c.exports},bc35:function(e,t,a){"use strict";var n=a("735b"),r=a("32da"),i=a("1c60");e.exports=function(e){var t=n(this),a=i(t),o=arguments.length,s=r(o>1?arguments[1]:void 0,a),u=o>2?arguments[2]:void 0,l=void 0===u?a:r(u,a);while(l>s)t[s++]=e;return t}},c407:function(e,t,a){"use strict";var n=a("4bb1"),r=a("e143"),i=(a("eb3b"),a("2237"),a("a567"),function(){function e(t,a){Object(n["a"])(this,e),this.Cesium=t,this.viewer=a}return Object(r["a"])(e,[{key:"getRandomColor",get:function(){for(var e="#",t=["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"],a=0;a<6;a++){var n=Math.floor(Math.random()*t.length+1)-1;e+=t[n]}return e}},{key:"operationDom",value:function(e,t,a){if("append"===e&&document.getElementById(t).appendChild(a),"remove"===e&&document.getElementById(t).remove(),"has"===e)return document.getElementById(t)}},{key:"debounce",value:function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(){var r=this,i=arguments;if(t&&clearTimeout(t),n){var o=!t;t=setTimeout((function(){t=null}),a),o&&e.apply(r,i)}else t=setTimeout((function(){e.apply}),a)}}},{key:"throttle",value:function(e,t,a){var n,r=0;return function(){var i=this,o=arguments;if(1===a){var s=Date.now();s-r>t&&(e.apply(i,o),r=s)}else 2===a&&(n||(n=setTimeout((function(){n=null,e.apply(i,o)}),t)))}}},{key:"createScript",value:function(e){var t=document.createElement("script");t.setAttribute("type","text/javascript"),t.setAttribute("src",e),document.getElementsByTagName("head")[0].appendChild(t)}},{key:"loadJs",value:function(e,t){return new Promise((function(a,n){var r=document.createElement("script");r.type="text/javascript",null!==t&&void 0!==t&&t.async&&t.async&&(r.async="async"),null!==t&&void 0!==t&&t.defer&&t.defer&&(r.defer="defer");var i="body";null!==t&&void 0!==t&&t.append&&t.append&&("body"==t.append||"head"==t.append)&&(i=t.append),r.src=e,document[i].appendChild(r),r.onload=function(){a()},r.onerror=function(){n()}}))}},{key:"randomPoint",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3,n=this.Cesium;function r(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var i=r(e[0]*a,t[0]*a)/a,o=r(e[1]*a,t[1]*a)/a;return n.Cartesian3.fromDegrees(i,o,30)}},{key:"getEntityPosition",value:function(e){var t=this.Cesium;return e.position._value||t.Property.getValueOrUndefined(e.position,this.viewer.clock.currentTime||t.JulianDate.now(),new t.Cartesian3)}},{key:"toDegrees",value:function(e){var t=this.Cesium;if(this.isDegreesOrCartesian(e)){var a=function(e){var a=new t.Cartesian3(e.x,e.y,e.z),n=t.Cartographic.fromCartesian(a);return{lng:parseFloat(t.Math.toDegrees(n.longitude).toFixed(8)),lat:parseFloat(t.Math.toDegrees(n.latitude).toFixed(8)),alt:parseFloat(n.height.toFixed(8))}};return e.x&&(e=a(e)),e}}},{key:"getCameraInfo",value:function(){var e=this.viewer;if(e&&e.camera&&e.camera.position&&e.camera.heading){var t=this.toDegrees(e.camera.position),a=Cesium.Math.toDegrees(e.camera.heading),n=Cesium.Math.toDegrees(e.camera.pitch),r=Cesium.Math.toDegrees(e.camera.roll);return{heading:parseFloat(a).toFixed(5),pitch:parseFloat(n).toFixed(5),roll:parseFloat(r).toFixed(5),lng:parseFloat(t.lng).toFixed(7),lat:parseFloat(t.lat).toFixed(7),alt:parseFloat(t.alt).toFixed(2)}}throw new Error("Error in Parameter!")}},{key:"isDegreesOrCartesian",value:function(e){if(!e)throw new Error("Error in Parameter!");return"number"===typeof e.x&&"number"===typeof e.y&&"number"===typeof e.z||"number"===typeof e.lng&&"number"===typeof e.lat}},{key:"toCartesian",value:function(e){var t=this.Cesium;if(this.isDegreesOrCartesian(e)){var a=function(e){return t.Cartesian3.fromDegrees(e.lng,e.lat,e.alt||0)};return e.lng&&(e=a(e)),e}}},{key:"point2LineDistance",value:function(e,t,a){e=this.toCartesian(e),t=this.toCartesian(t),a=this.toCartesian(a);var n=Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2)),r=Math.sqrt(Math.pow(e.x-a.x,2)+Math.pow(e.y-a.y,2)+Math.pow(e.z-a.z,2)),i=Math.sqrt(Math.pow(a.x-t.x,2)+Math.pow(a.y-t.y,2)+Math.pow(a.z-t.z,2)),o=(Math.pow(r,2)+Math.pow(n,2)-Math.pow(i,2))/(2*n*r),s=Math.sqrt(1-Math.pow(o,2)),u=((e.x-a.x)*(e.x-t.x)+(e.y-a.y)*(e.y-t.y)+(e.z-a.z)*(e.z-t.z))/(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2));return u<0?r:u<=1&&u>=0?r*s:u>1?i:void 0}},{key:"countArea",value:function(e){if(!e||e.length<3)throw new Error("Error in Parameter!");for(var t=0,a=0;a<e.length;a++){var n=(a+1)%e.length,r=e[a],i=e[n];r=this.toCartesian(r),i=this.toCartesian(i),t+=r.x*i.y,t-=r.y*i.x}return t/=2,Math.abs(t)}},{key:"countAreaByThreePoints",value:function(e,t,a){e=this.toCartesian(e),t=this.toCartesian(t),a=this.toCartesian(a);var n=-1,r=[];if(r[0]=Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2)),r[1]=Math.sqrt(Math.pow(e.x-a.x,2)+Math.pow(e.y-a.y,2)+Math.pow(e.z-a.z,2)),r[2]=Math.sqrt(Math.pow(a.x-t.x,2)+Math.pow(a.y-t.y,2)+Math.pow(a.z-t.z,2)),r[0]+r[1]<=r[2]||r[0]+r[2]<=r[1]||r[1]+r[2]<=r[0])return n;var i=(r[0]+r[1]+r[2])/2;return n=Math.sqrt(i*(i-r[0])*(i-r[1])*(i-r[2])),n}},{key:"getDistance",value:function(e,t){if(!e||!t)throw new Error("Error in Parameter!");return e=this.toCartesian(e),t=this.toCartesian(t),Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2))}},{key:"getNormal",value:function(e,t,a){e=this.toCartesian(e),t=this.toCartesian(t),a=this.toCartesian(a);var n=(t.y-e.y)*(a.z-e.z)-(t.z-e.z)*(a.y-e.y),r=(t.z-e.z)*(a.x-e.x)-(t.x-e.x)*(a.z-e.z),i=(t.x-e.x)*(a.y-e.y)-(t.y-e.y)*(a.x-e.x);return{x:n,y:r,z:i}}},{key:"countIntersectionOfLineAndPlane",value:function(e,t,a,n){var r,i,o,s,u,l,c,h,y,d,p,f,v,m;r=e.x,i=e.y,o=e.z,s=t.x,u=t.y,l=t.z,c=a.x,h=a.y,y=a.z,d=n.x,p=n.y,f=n.z,m=c*r+h*i+y*o;var x={};if(0!==m)return v=((s-d)*r+(u-p)*i+(l-f)*o)/m,x.x=d+c*v,x.y=p+h*v,x.z=f+y*v,x}},{key:"getPointInPolygon",value:function(){var e=this.getNormal(polygon[0],polygon[1],polygon[2]),t=line[0].x-line[1].x,a=line[0].y-line[1].y,n=line[0].z-line[1].z,r={x:t,y:a,z:n},i=this.countIntersectionOfLineAndPlane(e,polygon[1],r,line[0]);return i||!1}},{key:"isPointInQuadrilateral",value:function(){var e,t,a,n,r,i,o,s,u,l,c;o=this.getDistance(quadrilateral[0],quadrilateral[1]),s=this.getDistance(quadrilateral[1],quadrilateral[2]),u=this.getDistance(quadrilateral[0],quadrilateral[2]),l=this.getDistance(quadrilateral[2],quadrilateral[3]),c=this.getDistance(quadrilateral[3],quadrilateral[4]);var h,y,d,p,f=(o+s+u)/2,v=(u+l+c)/2;e=Math.sqrt(f*(f-o)*(f-s)*(f-u)),t=Math.sqrt(v*(v-u)*(v-l)*(v-c)),h=this.getDistance(point,quadrilateral[0]),y=this.getDistance(point,quadrilateral[1]),d=this.getDistance(point,quadrilateral[2]),p=this.getDistance(point,quadrilateral[3]);var m=(o+h+y)/2,x=(s+y+d)/2,w=(l+d+p)/2,g=(c+p+h)/2;return a=Math.sqrt(m*(m-o)*(m-h)*(m-y)),n=Math.sqrt(x*(x-s)*(x-y)*(x-d)),r=Math.sqrt(w*(w-l)*(w-d)*(w-p)),i=Math.sqrt(g*(g-c)*(g-p)*(g-h)),!(Math.abs(a+n+r+i-(e+t))>1e-4)}},{key:"JudgePointInPolygon",value:function(e,t){var a,n,r,i,o,s,u,l,c=function(e,t){return e.y*t.z-t.y*e.z+(e.z*t.x-e.x*t.z)+(e.x*t.y-e.y*t.x)},h=t[0],y=t[1],d=t[2],p=t[3];return a={x:y.x-h.x,y:y.y-h.y,z:y.z-h.z},n={x:e.x-h.x,y:e.y-h.y,z:e.z-h.z},r={x:p.x-d.x,y:p.y-d.y,z:p.z-d.z},i={x:e.x-d.x,y:e.y-d.y,z:e.z-d.z},o={x:d.x-y.x,y:d.y-y.y,z:d.z-y.z},s={x:e.x-y.x,y:e.y-y.y,z:e.z-y.z},u={x:p.x-h.x,y:p.y-h.y,z:p.z-h.z},l={x:e.x-p.x,y:e.y-p.y,z:e.z-p.z},!(c(a,n)*c(r,i)>=0&&c(o,s)*c(u,l)>=0)}},{key:"JudgePointInPolyline",value:function(e,t){var a=Math.sqrt(Math.pow(t[0].x-t[1].x,2)+Math.pow(t[0].y-t[1].y,2)+Math.pow(t[0].z-t[1].z,2)),n=Math.sqrt(Math.pow(e.x-t[1].x,2)+Math.pow(e.y-t[1].y,2)+Math.pow(e.z-t[1].z,2)),r=Math.sqrt(Math.pow(e.x-t[0].x,2)+Math.pow(e.y-t[0].y,2)+Math.pow(e.z-t[0].z,2)),i=n+r-a;return 1e4*i<1}},{key:"GetPanelEquation",value:function(e){var t,a,n,r;if(!(e.length<3))return t=e[0].y*(e[1].z-e[2].z)+e[1].y*(e[2].z-e[0].z)+e[2].y*(e[0].z-e[1].z),a=e[0].z*(e[1].x-e[2].x)+e[1].z*(e[2].x-e[0].x)+e[2].z*(e[0].x-e[1].x),n=e[0].x*(e[1].y-e[2].y)+e[1].x*(e[2].y-e[0].y)+e[2].x*(e[0].y-e[1].y),r=-e[0].x*(e[1].y*e[2].z-e[2].y*e[1].z)-e[1].x*(e[2].y*e[0].z-e[0].y*e[2].z)-e[2].x*(e[0].y*e[1].z-e[1].y*e[0].z),{A:t,B:a,C:n,D:r}}}]),e}());t["a"]=i},e143:function(e,t,a){"use strict";function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),Object.defineProperty(e,"prototype",{writable:!1}),e}a.d(t,"a",(function(){return r}))},e2e6:function(e,t,a){}}]);