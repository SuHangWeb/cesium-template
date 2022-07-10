(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a5fa211"],{"4cef":function(t,e,a){"use strict";var r=a("4bb1"),n=a("e143"),i=function(){function t(e,a){Object(r["a"])(this,t),this.Cesium=e,this.viewer=a}return Object(n["a"])(t,[{key:"create",value:function(t){var e=this.Cesium,a=this.viewer,r=null!==t&&void 0!==t&&t.cesiumName?t.cesiumName:"",n=null!==t&&void 0!==t&&t.source?t.source:"",i=null!==t&&void 0!==t&&t.uniforms?t.uniforms:"";function o(){this._definitionChanged=new e.Event,this._color=void 0,this._colorSubscription=void 0,this.color=null!==t&&void 0!==t&&t.color?t.color:e.Color.BLUE,this.duration=null!==t&&void 0!==t&&t.duration?t.duration:1e3,this.image=null!==t&&void 0!==t&&t.image?t.image:"",this._time=(new Date).getTime()}Object.defineProperties(o.prototype,{isConstant:{get:function(){return!1}},definitionChanged:{get:function(){return this._definitionChanged}},color:e.createPropertyDescriptor("color")});var s="Material".concat(parseInt(1e3*Math.random()));return o.prototype.getType=function(t){return s},o.prototype.getValue=function(t,r){return e.defined(r)||(r={}),r.color=e.Property.getValueOrClonedDefault(this._color,t,e.Color.WHITE,r.color),r.image=this.image,this.duration&&(r.time=((new Date).getTime()-this._time)%this.duration/this.duration),a.scene.requestRender(),r},o.prototype.equals=function(t){return this===t||t instanceof o&&e.Property.equals(this._color,t._color)},e.Material._materialCache.addMaterial(s,{fabric:{type:s,uniforms:i,source:n},translucent:function(t){return!0}}),e[r]=o,o}}]),t}();e["a"]=i},c407:function(t,e,a){"use strict";var r=a("4bb1"),n=a("e143"),i=(a("6410"),a("eb3b"),a("b1f6"),a("2237"),a("a567"),function(){function t(e,a){Object(r["a"])(this,t),this.Cesium=e,this.viewer=a}return Object(n["a"])(t,[{key:"getRandomColor",get:function(){for(var t="#",e=["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"],a=0;a<6;a++){var r=Math.floor(Math.random()*e.length+1)-1;t+=e[r]}return t}},{key:"operationDom",value:function(t,e,a){if("append"===t&&document.getElementById(e).appendChild(a),"remove"===t&&document.getElementById(e).remove(),"has"===t)return document.getElementById(e)}},{key:"crecteIframe",value:function(t,e){var a=document.createElement("iframe");return a.src=t,a.setAttribute("frameBorder",0),null!==e&&void 0!==e&&e.width&&(a.width=e.width),null!==e&&void 0!==e&&e.height&&(a.height=e.height),a}},{key:"queryParams",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"brackets",r=e?"?":"",n=[];-1==["indices","brackets","repeat","comma"].indexOf(a)&&(a="brackets");var i=function(e){var r=t[e];if(["",void 0,null].indexOf(r)>=0)return"continue";if(r.constructor===Array)switch(a){case"indices":for(var i=0;i<r.length;i++)n.push(e+"["+i+"]="+r[i]);break;case"brackets":r.forEach((function(t){n.push(e+"[]="+t)}));break;case"repeat":r.forEach((function(t){n.push(e+"="+t)}));break;case"comma":var o="";r.forEach((function(t){o+=(o?",":"")+t})),n.push(e+"="+o);break;default:r.forEach((function(t){n.push(e+"[]="+t)}))}else n.push(e+"="+r)};for(var o in t)i(o);return n.length?r+n.join("&"):""}},{key:"debounce",value:function(t){var e,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(){var n=this,i=arguments;if(e&&clearTimeout(e),r){var o=!e;e=setTimeout((function(){e=null}),a),o&&t.apply(n,i)}else e=setTimeout((function(){t.apply}),a)}}},{key:"throttle",value:function(t,e,a){var r,n=0;return function(){var i=this,o=arguments;if(1===a){var s=Date.now();s-n>e&&(t.apply(i,o),n=s)}else 2===a&&(r||(r=setTimeout((function(){r=null,t.apply(i,o)}),e)))}}},{key:"createScript",value:function(t){var e=document.createElement("script");e.setAttribute("type","text/javascript"),e.setAttribute("src",t),document.getElementsByTagName("head")[0].appendChild(e)}},{key:"loadJs",value:function(t,e){return new Promise((function(a,r){var n=document.createElement("script");n.type="text/javascript",null!==e&&void 0!==e&&e.async&&e.async&&(n.async="async"),null!==e&&void 0!==e&&e.defer&&e.defer&&(n.defer="defer");var i="body";null!==e&&void 0!==e&&e.append&&e.append&&("body"==e.append||"head"==e.append)&&(i=e.append),n.src=t,document[i].appendChild(n),n.onload=function(){a()},n.onerror=function(){r()}}))}},{key:"randomPoint",value:function(t){var e=t.start,a=t.end,r=t.range||1e3,n=t.height||0,i=t.type||"cartesian3",o=this.Cesium;function s(t,e){return Math.floor(Math.random()*(e-t+1)+t)}var u=s(e[0]*r,a[0]*r)/r,l=s(e[1]*r,a[1]*r)/r;return"cartesian3"==i?o.Cartesian3.fromDegrees(u,l,n):"jwd"==i?[u,l,n]:void 0}},{key:"getEntityPosition",value:function(t){var e=this.Cesium;return t.position?t.position._value||e.Property.getValueOrUndefined(t.position,this.viewer.clock.currentTime||e.JulianDate.now(),new e.Cartesian3):void 0}},{key:"toDegrees",value:function(t){var e=this.Cesium;if(this.isDegreesOrCartesian(t)){var a=function(t){var a=new e.Cartesian3(t.x,t.y,t.z),r=e.Cartographic.fromCartesian(a);return{lng:parseFloat(e.Math.toDegrees(r.longitude).toFixed(8)),lat:parseFloat(e.Math.toDegrees(r.latitude).toFixed(8)),alt:parseFloat(r.height.toFixed(8))}};return t.x&&(t=a(t)),t}}},{key:"getCameraInfo",value:function(){var t=this.viewer;if(t&&t.camera&&t.camera.position&&t.camera.heading){var e=this.toDegrees(t.camera.position),a=Cesium.Math.toDegrees(t.camera.heading),r=Cesium.Math.toDegrees(t.camera.pitch),n=Cesium.Math.toDegrees(t.camera.roll);return{heading:parseFloat(a).toFixed(5),pitch:parseFloat(r).toFixed(5),roll:parseFloat(n).toFixed(5),lng:parseFloat(e.lng).toFixed(7),lat:parseFloat(e.lat).toFixed(7),alt:parseFloat(e.alt).toFixed(2)}}throw new Error("Error in Parameter!")}},{key:"isDegreesOrCartesian",value:function(t){if(!t)throw new Error("Error in Parameter!");return"number"===typeof t.x&&"number"===typeof t.y&&"number"===typeof t.z||"number"===typeof t.lng&&"number"===typeof t.lat}},{key:"toCartesian",value:function(t){var e=this.Cesium;if(this.isDegreesOrCartesian(t)){var a=function(t){return e.Cartesian3.fromDegrees(t.lng,t.lat,t.alt||0)};return t.lng&&(t=a(t)),t}}},{key:"point2LineDistance",value:function(t,e,a){t=this.toCartesian(t),e=this.toCartesian(e),a=this.toCartesian(a);var r=Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)+Math.pow(t.z-e.z,2)),n=Math.sqrt(Math.pow(t.x-a.x,2)+Math.pow(t.y-a.y,2)+Math.pow(t.z-a.z,2)),i=Math.sqrt(Math.pow(a.x-e.x,2)+Math.pow(a.y-e.y,2)+Math.pow(a.z-e.z,2)),o=(Math.pow(n,2)+Math.pow(r,2)-Math.pow(i,2))/(2*r*n),s=Math.sqrt(1-Math.pow(o,2)),u=((t.x-a.x)*(t.x-e.x)+(t.y-a.y)*(t.y-e.y)+(t.z-a.z)*(t.z-e.z))/(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)+Math.pow(t.z-e.z,2));return u<0?n:u<=1&&u>=0?n*s:u>1?i:void 0}},{key:"countArea",value:function(t){if(!t||t.length<3)throw new Error("Error in Parameter!");for(var e=0,a=0;a<t.length;a++){var r=(a+1)%t.length,n=t[a],i=t[r];n=this.toCartesian(n),i=this.toCartesian(i),e+=n.x*i.y,e-=n.y*i.x}return e/=2,Math.abs(e)}},{key:"countAreaByThreePoints",value:function(t,e,a){t=this.toCartesian(t),e=this.toCartesian(e),a=this.toCartesian(a);var r=-1,n=[];if(n[0]=Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)+Math.pow(t.z-e.z,2)),n[1]=Math.sqrt(Math.pow(t.x-a.x,2)+Math.pow(t.y-a.y,2)+Math.pow(t.z-a.z,2)),n[2]=Math.sqrt(Math.pow(a.x-e.x,2)+Math.pow(a.y-e.y,2)+Math.pow(a.z-e.z,2)),n[0]+n[1]<=n[2]||n[0]+n[2]<=n[1]||n[1]+n[2]<=n[0])return r;var i=(n[0]+n[1]+n[2])/2;return r=Math.sqrt(i*(i-n[0])*(i-n[1])*(i-n[2])),r}},{key:"getDistance",value:function(t,e){if(!t||!e)throw new Error("Error in Parameter!");return t=this.toCartesian(t),e=this.toCartesian(e),Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)+Math.pow(t.z-e.z,2))}},{key:"getNormal",value:function(t,e,a){t=this.toCartesian(t),e=this.toCartesian(e),a=this.toCartesian(a);var r=(e.y-t.y)*(a.z-t.z)-(e.z-t.z)*(a.y-t.y),n=(e.z-t.z)*(a.x-t.x)-(e.x-t.x)*(a.z-t.z),i=(e.x-t.x)*(a.y-t.y)-(e.y-t.y)*(a.x-t.x);return{x:r,y:n,z:i}}},{key:"countIntersectionOfLineAndPlane",value:function(t,e,a,r){var n,i,o,s,u,l,h,c,y,p,d,f,v,x;n=t.x,i=t.y,o=t.z,s=e.x,u=e.y,l=e.z,h=a.x,c=a.y,y=a.z,p=r.x,d=r.y,f=r.z,x=h*n+c*i+y*o;var m={};if(0!==x)return v=((s-p)*n+(u-d)*i+(l-f)*o)/x,m.x=p+h*v,m.y=d+c*v,m.z=f+y*v,m}},{key:"getPointInPolygon",value:function(){var t=this.getNormal(polygon[0],polygon[1],polygon[2]),e=line[0].x-line[1].x,a=line[0].y-line[1].y,r=line[0].z-line[1].z,n={x:e,y:a,z:r},i=this.countIntersectionOfLineAndPlane(t,polygon[1],n,line[0]);return i||!1}},{key:"isPointInQuadrilateral",value:function(){var t,e,a,r,n,i,o,s,u,l,h;o=this.getDistance(quadrilateral[0],quadrilateral[1]),s=this.getDistance(quadrilateral[1],quadrilateral[2]),u=this.getDistance(quadrilateral[0],quadrilateral[2]),l=this.getDistance(quadrilateral[2],quadrilateral[3]),h=this.getDistance(quadrilateral[3],quadrilateral[4]);var c,y,p,d,f=(o+s+u)/2,v=(u+l+h)/2;t=Math.sqrt(f*(f-o)*(f-s)*(f-u)),e=Math.sqrt(v*(v-u)*(v-l)*(v-h)),c=this.getDistance(point,quadrilateral[0]),y=this.getDistance(point,quadrilateral[1]),p=this.getDistance(point,quadrilateral[2]),d=this.getDistance(point,quadrilateral[3]);var x=(o+c+y)/2,m=(s+y+p)/2,z=(l+p+d)/2,g=(h+d+c)/2;return a=Math.sqrt(x*(x-o)*(x-c)*(x-y)),r=Math.sqrt(m*(m-s)*(m-y)*(m-p)),n=Math.sqrt(z*(z-l)*(z-p)*(z-d)),i=Math.sqrt(g*(g-h)*(g-d)*(g-c)),!(Math.abs(a+r+n+i-(t+e))>1e-4)}},{key:"JudgePointInPolygon",value:function(t,e){var a,r,n,i,o,s,u,l,h=function(t,e){return t.y*e.z-e.y*t.z+(t.z*e.x-t.x*e.z)+(t.x*e.y-t.y*e.x)},c=e[0],y=e[1],p=e[2],d=e[3];return a={x:y.x-c.x,y:y.y-c.y,z:y.z-c.z},r={x:t.x-c.x,y:t.y-c.y,z:t.z-c.z},n={x:d.x-p.x,y:d.y-p.y,z:d.z-p.z},i={x:t.x-p.x,y:t.y-p.y,z:t.z-p.z},o={x:p.x-y.x,y:p.y-y.y,z:p.z-y.z},s={x:t.x-y.x,y:t.y-y.y,z:t.z-y.z},u={x:d.x-c.x,y:d.y-c.y,z:d.z-c.z},l={x:t.x-d.x,y:t.y-d.y,z:t.z-d.z},!(h(a,r)*h(n,i)>=0&&h(o,s)*h(u,l)>=0)}},{key:"JudgePointInPolyline",value:function(t,e){var a=Math.sqrt(Math.pow(e[0].x-e[1].x,2)+Math.pow(e[0].y-e[1].y,2)+Math.pow(e[0].z-e[1].z,2)),r=Math.sqrt(Math.pow(t.x-e[1].x,2)+Math.pow(t.y-e[1].y,2)+Math.pow(t.z-e[1].z,2)),n=Math.sqrt(Math.pow(t.x-e[0].x,2)+Math.pow(t.y-e[0].y,2)+Math.pow(t.z-e[0].z,2)),i=r+n-a;return 1e4*i<1}},{key:"GetPanelEquation",value:function(t){var e,a,r,n;if(!(t.length<3))return e=t[0].y*(t[1].z-t[2].z)+t[1].y*(t[2].z-t[0].z)+t[2].y*(t[0].z-t[1].z),a=t[0].z*(t[1].x-t[2].x)+t[1].z*(t[2].x-t[0].x)+t[2].z*(t[0].x-t[1].x),r=t[0].x*(t[1].y-t[2].y)+t[1].x*(t[2].y-t[0].y)+t[2].x*(t[0].y-t[1].y),n=-t[0].x*(t[1].y*t[2].z-t[2].y*t[1].z)-t[1].x*(t[2].y*t[0].z-t[0].y*t[2].z)-t[2].x*(t[0].y*t[1].z-t[1].y*t[0].z),{A:e,B:a,C:r,D:n}}}]),t}());e["a"]=i}}]);