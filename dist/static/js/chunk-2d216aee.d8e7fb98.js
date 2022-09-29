(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d216aee"],{c407:function(e,t,a){"use strict";var r=a("4bb1"),n=a("e143"),i=(a("6410"),a("eb3b"),a("b1f6"),a("2237"),a("a567"),a("f8c7"),a("5e94"),a("e279"),a("8aab"),a("ee92"),a("5d78"),a("2605"),a("9401"),a("93e4"),a("7c2a"),a("0ee2"),a("d95a"),a("f4d4"),a("9f3d"),a("377a"),a("0697"),a("a4f7"),a("7990"),a("b1f4"),a("a584"),a("adfe"),a("270e"),a("7fa3"),a("93e3"),a("3df0"),a("7636"),a("e2c2"),a("248d"),a("3d5f"),a("29db"),a("0fad"),a("b692"),a("ffaf"),a("9e66"),a("f755"),a("150a"),a("c508"),a("34b1"),a("98db"),a("a85f"),function(){function e(t,a){Object(r["a"])(this,e),this.Cesium=t,this.viewer=a}return Object(n["a"])(e,[{key:"getRandomColor",get:function(){for(var e="#",t=["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"],a=0;a<6;a++){var r=Math.floor(Math.random()*t.length+1)-1;e+=t[r]}return e}},{key:"operationDom",value:function(e,t,a){if("append"===e&&document.getElementById(t).appendChild(a),"remove"===e&&document.getElementById(t).remove(),"has"===e)return document.getElementById(t)}},{key:"crecteIframe",value:function(e,t){var a=document.createElement("iframe");return a.src=e,a.setAttribute("frameBorder",0),null!==t&&void 0!==t&&t.width&&(a.width=t.width),null!==t&&void 0!==t&&t.height&&(a.height=t.height),a}},{key:"queryParams",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"brackets",r=t?"?":"",n=[];-1==["indices","brackets","repeat","comma"].indexOf(a)&&(a="brackets");var i=function(t){var r=e[t];if(["",void 0,null].indexOf(r)>=0)return"continue";if(r.constructor===Array)switch(a){case"indices":for(var i=0;i<r.length;i++)n.push(t+"["+i+"]="+r[i]);break;case"brackets":r.forEach((function(e){n.push(t+"[]="+e)}));break;case"repeat":r.forEach((function(e){n.push(t+"="+e)}));break;case"comma":var o="";r.forEach((function(e){o+=(o?",":"")+e})),n.push(t+"="+o);break;default:r.forEach((function(e){n.push(t+"[]="+e)}))}else n.push(t+"="+r)};for(var o in e)i(o);return n.length?r+n.join("&"):""}},{key:"debounce",value:function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(){var n=this,i=arguments;if(t&&clearTimeout(t),r){var o=!t;t=setTimeout((function(){t=null}),a),o&&e.apply(n,i)}else t=setTimeout((function(){e.apply}),a)}}},{key:"throttle",value:function(e,t,a){var r,n=0;return function(){var i=this,o=arguments;if(1===a){var s=Date.now();s-n>t&&(e.apply(i,o),n=s)}else 2===a&&(r||(r=setTimeout((function(){r=null,e.apply(i,o)}),t)))}}},{key:"createScript",value:function(e){var t=document.createElement("script");t.setAttribute("type","text/javascript"),t.setAttribute("src",e),document.getElementsByTagName("head")[0].appendChild(t)}},{key:"loadJs",value:function(e,t){return new Promise((function(a,r){var n=document.createElement("script");n.type="text/javascript",null!==t&&void 0!==t&&t.async&&t.async&&(n.async="async"),null!==t&&void 0!==t&&t.defer&&t.defer&&(n.defer="defer");var i="body";null!==t&&void 0!==t&&t.append&&t.append&&("body"==t.append||"head"==t.append)&&(i=t.append),n.src=e,document[i].appendChild(n),n.onload=function(){a()},n.onerror=function(){r()}}))}},{key:"randomPoint",value:function(e){var t=e.start,a=e.end,r=e.range||1e3,n=e.height||0,i=e.type||"cartesian3",o=this.Cesium;function s(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var u=s(t[0]*r,a[0]*r)/r,l=s(t[1]*r,a[1]*r)/r;return"cartesian3"==i?o.Cartesian3.fromDegrees(u,l,n):"jwd"==i?[u,l,n]:void 0}},{key:"getEntityPosition",value:function(e){var t=this.Cesium;return e.position?e.position._value||t.Property.getValueOrUndefined(e.position,this.viewer.clock.currentTime||t.JulianDate.now(),new t.Cartesian3):void 0}},{key:"toDegrees",value:function(e){var t=this.Cesium;if(this.isDegreesOrCartesian(e)){var a=function(e){var a=new t.Cartesian3(e.x,e.y,e.z),r=t.Cartographic.fromCartesian(a);return{lng:parseFloat(t.Math.toDegrees(r.longitude).toFixed(8)),lat:parseFloat(t.Math.toDegrees(r.latitude).toFixed(8)),alt:parseFloat(r.height.toFixed(8))}};return e.x&&(e=a(e)),e}}},{key:"getCameraInfo",value:function(){var e=this.viewer;if(e&&e.camera&&e.camera.position&&e.camera.heading){var t=this.toDegrees(e.camera.position),a=Cesium.Math.toDegrees(e.camera.heading),r=Cesium.Math.toDegrees(e.camera.pitch),n=Cesium.Math.toDegrees(e.camera.roll);return{heading:parseFloat(a).toFixed(5),pitch:parseFloat(r).toFixed(5),roll:parseFloat(n).toFixed(5),lng:parseFloat(t.lng).toFixed(7),lat:parseFloat(t.lat).toFixed(7),alt:parseFloat(t.alt).toFixed(2)}}throw new Error("Error in Parameter!")}},{key:"isDegreesOrCartesian",value:function(e){if(!e)throw new Error("Error in Parameter!");return"number"===typeof e.x&&"number"===typeof e.y&&"number"===typeof e.z||"number"===typeof e.lng&&"number"===typeof e.lat}},{key:"toCartesian",value:function(e){var t=this.Cesium;if(this.isDegreesOrCartesian(e)){var a=function(e){return t.Cartesian3.fromDegrees(e.lng,e.lat,e.alt||0)};return e.lng&&(e=a(e)),e}}},{key:"point2LineDistance",value:function(e,t,a){e=this.toCartesian(e),t=this.toCartesian(t),a=this.toCartesian(a);var r=Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2)),n=Math.sqrt(Math.pow(e.x-a.x,2)+Math.pow(e.y-a.y,2)+Math.pow(e.z-a.z,2)),i=Math.sqrt(Math.pow(a.x-t.x,2)+Math.pow(a.y-t.y,2)+Math.pow(a.z-t.z,2)),o=(Math.pow(n,2)+Math.pow(r,2)-Math.pow(i,2))/(2*r*n),s=Math.sqrt(1-Math.pow(o,2)),u=((e.x-a.x)*(e.x-t.x)+(e.y-a.y)*(e.y-t.y)+(e.z-a.z)*(e.z-t.z))/(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2));return u<0?n:u<=1&&u>=0?n*s:u>1?i:void 0}},{key:"countArea",value:function(e){if(!e||e.length<3)throw new Error("Error in Parameter!");for(var t=0,a=0;a<e.length;a++){var r=(a+1)%e.length,n=e[a],i=e[r];n=this.toCartesian(n),i=this.toCartesian(i),t+=n.x*i.y,t-=n.y*i.x}return t/=2,Math.abs(t)}},{key:"countAreaByThreePoints",value:function(e,t,a){e=this.toCartesian(e),t=this.toCartesian(t),a=this.toCartesian(a);var r=-1,n=[];if(n[0]=Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2)),n[1]=Math.sqrt(Math.pow(e.x-a.x,2)+Math.pow(e.y-a.y,2)+Math.pow(e.z-a.z,2)),n[2]=Math.sqrt(Math.pow(a.x-t.x,2)+Math.pow(a.y-t.y,2)+Math.pow(a.z-t.z,2)),n[0]+n[1]<=n[2]||n[0]+n[2]<=n[1]||n[1]+n[2]<=n[0])return r;var i=(n[0]+n[1]+n[2])/2;return r=Math.sqrt(i*(i-n[0])*(i-n[1])*(i-n[2])),r}},{key:"getDistance",value:function(e,t){if(!e||!t)throw new Error("Error in Parameter!");return e=this.toCartesian(e),t=this.toCartesian(t),Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2))}},{key:"getNormal",value:function(e,t,a){e=this.toCartesian(e),t=this.toCartesian(t),a=this.toCartesian(a);var r=(t.y-e.y)*(a.z-e.z)-(t.z-e.z)*(a.y-e.y),n=(t.z-e.z)*(a.x-e.x)-(t.x-e.x)*(a.z-e.z),i=(t.x-e.x)*(a.y-e.y)-(t.y-e.y)*(a.x-e.x);return{x:r,y:n,z:i}}},{key:"countIntersectionOfLineAndPlane",value:function(e,t,a,r){var n,i,o,s,u,l,h,c,y,d,p,v,f,x;n=e.x,i=e.y,o=e.z,s=t.x,u=t.y,l=t.z,h=a.x,c=a.y,y=a.z,d=r.x,p=r.y,v=r.z,x=h*n+c*i+y*o;var g={};if(0!==x)return f=((s-d)*n+(u-p)*i+(l-v)*o)/x,g.x=d+h*f,g.y=p+c*f,g.z=v+y*f,g}},{key:"getPointInPolygon",value:function(){var e=this.getNormal(polygon[0],polygon[1],polygon[2]),t=line[0].x-line[1].x,a=line[0].y-line[1].y,r=line[0].z-line[1].z,n={x:t,y:a,z:r},i=this.countIntersectionOfLineAndPlane(e,polygon[1],n,line[0]);return i||!1}},{key:"isPointInQuadrilateral",value:function(){var e,t,a,r,n,i,o,s,u,l,h;o=this.getDistance(quadrilateral[0],quadrilateral[1]),s=this.getDistance(quadrilateral[1],quadrilateral[2]),u=this.getDistance(quadrilateral[0],quadrilateral[2]),l=this.getDistance(quadrilateral[2],quadrilateral[3]),h=this.getDistance(quadrilateral[3],quadrilateral[4]);var c,y,d,p,v=(o+s+u)/2,f=(u+l+h)/2;e=Math.sqrt(v*(v-o)*(v-s)*(v-u)),t=Math.sqrt(f*(f-u)*(f-l)*(f-h)),c=this.getDistance(point,quadrilateral[0]),y=this.getDistance(point,quadrilateral[1]),d=this.getDistance(point,quadrilateral[2]),p=this.getDistance(point,quadrilateral[3]);var x=(o+c+y)/2,g=(s+y+d)/2,m=(l+d+p)/2,z=(h+p+c)/2;return a=Math.sqrt(x*(x-o)*(x-c)*(x-y)),r=Math.sqrt(g*(g-s)*(g-y)*(g-d)),n=Math.sqrt(m*(m-l)*(m-d)*(m-p)),i=Math.sqrt(z*(z-h)*(z-p)*(z-c)),!(Math.abs(a+r+n+i-(e+t))>1e-4)}},{key:"JudgePointInPolygon",value:function(e,t){var a,r,n,i,o,s,u,l,h=function(e,t){return e.y*t.z-t.y*e.z+(e.z*t.x-e.x*t.z)+(e.x*t.y-e.y*t.x)},c=t[0],y=t[1],d=t[2],p=t[3];return a={x:y.x-c.x,y:y.y-c.y,z:y.z-c.z},r={x:e.x-c.x,y:e.y-c.y,z:e.z-c.z},n={x:p.x-d.x,y:p.y-d.y,z:p.z-d.z},i={x:e.x-d.x,y:e.y-d.y,z:e.z-d.z},o={x:d.x-y.x,y:d.y-y.y,z:d.z-y.z},s={x:e.x-y.x,y:e.y-y.y,z:e.z-y.z},u={x:p.x-c.x,y:p.y-c.y,z:p.z-c.z},l={x:e.x-p.x,y:e.y-p.y,z:e.z-p.z},!(h(a,r)*h(n,i)>=0&&h(o,s)*h(u,l)>=0)}},{key:"JudgePointInPolyline",value:function(e,t){var a=Math.sqrt(Math.pow(t[0].x-t[1].x,2)+Math.pow(t[0].y-t[1].y,2)+Math.pow(t[0].z-t[1].z,2)),r=Math.sqrt(Math.pow(e.x-t[1].x,2)+Math.pow(e.y-t[1].y,2)+Math.pow(e.z-t[1].z,2)),n=Math.sqrt(Math.pow(e.x-t[0].x,2)+Math.pow(e.y-t[0].y,2)+Math.pow(e.z-t[0].z,2)),i=r+n-a;return 1e4*i<1}},{key:"GetPanelEquation",value:function(e){var t,a,r,n;if(!(e.length<3))return t=e[0].y*(e[1].z-e[2].z)+e[1].y*(e[2].z-e[0].z)+e[2].y*(e[0].z-e[1].z),a=e[0].z*(e[1].x-e[2].x)+e[1].z*(e[2].x-e[0].x)+e[2].z*(e[0].x-e[1].x),r=e[0].x*(e[1].y-e[2].y)+e[1].x*(e[2].y-e[0].y)+e[2].x*(e[0].y-e[1].y),n=-e[0].x*(e[1].y*e[2].z-e[2].y*e[1].z)-e[1].x*(e[2].y*e[0].z-e[0].y*e[2].z)-e[2].x*(e[0].y*e[1].z-e[1].y*e[0].z),{A:t,B:a,C:r,D:n}}},{key:"modelBlock",value:function(e){var t=this.Cesium;e.lightColor=new t.Cartesian3(1e3,1e3,1e3)}},{key:"updateViewModel",value:function(e){if(e.length>0){var t=e.get(0);viewModel.brightness=t.brightness,viewModel.contrast=t.contrast,viewModel.hue=t.hue,viewModel.saturation=t.saturation,viewModel.gamma=t.gamma}}},{key:"blurredPicture",value:function(){var e=this.Cesium;if(this.viewer._cesiumWidget._supportsImageRenderingPixelated=e.FeatureDetection.supportsImageRenderingPixelated(),this.viewer._cesiumWidget._forceResize=!0,e.FeatureDetection.supportsImageRenderingPixelated()){var t=window.devicePixelRatio;while(t>=2)t/=2;this.viewer.resolutionScale=t}}},{key:"antialiasing",value:function(){var e=this.Cesium;e.FeatureDetection.supportsImageRenderingPixelated()&&(this.viewer.resolutionScale=window.devicePixelRatio),this.viewer.scene.fxaa=!0,this.viewer.scene.postProcessStages.fxaa.enabled=!0}},{key:"sceneSaveToImage",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"scene",t=function(e){var t=e.split(","),a=t[0].match(/:(.*?);/)[1],r=atob(t[1]),n=r.length,i=new Uint8Array(n);while(n--)i[n]=r.charCodeAt(n);return new Blob([i],{type:a})};this.viewer.render();var a=this.viewer.scene.canvas,r=a.toDataURL("image/png").replace("image/png","image/octet-stream"),n=document.createElement("a"),i=t(r),o=URL.createObjectURL(i);n.download=e+".png",n.href=o,n.click()}}]),e}());t["a"]=i}}]);