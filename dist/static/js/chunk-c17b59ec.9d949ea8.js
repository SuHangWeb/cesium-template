(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c17b59ec"],{2237:function(e,t,n){"use strict";var r=n("46a7"),a=n("4162"),o=n("d2cf"),i=n("4488"),s=n("7f99"),c=n("d2b9"),u=RangeError,l=String,d=Math.floor,f=a(s),h=a("".slice),v=a(1..toFixed),p=function(e,t,n){return 0===t?n:t%2===1?p(e,t-1,n*e):p(e*e,t/2,n)},y=function(e){var t=0,n=e;while(n>=4096)t+=12,n/=4096;while(n>=2)t+=1,n/=2;return t},g=function(e,t,n){var r=-1,a=n;while(++r<6)a+=t*e[r],e[r]=a%1e7,a=d(a/1e7)},m=function(e,t){var n=6,r=0;while(--n>=0)r+=e[n],e[n]=d(r/t),r=r%t*1e7},w=function(e){var t=6,n="";while(--t>=0)if(""!==n||0===t||0!==e[t]){var r=l(e[t]);n=""===n?r:n+f("0",7-r.length)+r}return n},x=c((function(){return"0.000"!==v(8e-5,3)||"1"!==v(.9,0)||"1.25"!==v(1.255,2)||"1000000000000000128"!==v(0xde0b6b3a7640080,0)}))||!c((function(){v({})}));r({target:"Number",proto:!0,forced:x},{toFixed:function(e){var t,n,r,a,s=i(this),c=o(e),d=[0,0,0,0,0,0],v="",x="0";if(c<0||c>20)throw u("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return l(s);if(s<0&&(v="-",s=-s),s>1e-21)if(t=y(s*p(2,69,1))-69,n=t<0?s*p(2,-t,1):s/p(2,t,1),n*=4503599627370496,t=52-t,t>0){g(d,0,n),r=c;while(r>=7)g(d,1e7,0),r-=7;g(d,p(10,r,1),0),r=t-1;while(r>=23)m(d,1<<23),r-=23;m(d,1<<r),g(d,1,1),m(d,2),x=w(d)}else g(d,0,n),g(d,1<<-t,0),x=w(d)+f("0",c);return c>0?(a=x.length,x=v+(a<=c?"0."+f("0",c-a)+x:h(x,0,a-c)+"."+h(x,a-c))):x=v+x,x}})},4488:function(e,t,n){var r=n("4162");e.exports=r(1..valueOf)},"4bb1":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n("a567");function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},"5f85":function(e,t,n){"use strict";var r=n("9192"),a=n("4bb1"),o=n("e143"),i=(n("e72f"),n("decf"),n("eb3b"),n("5f01"),n("2afa"),n("9e48")),s=n("c407"),c=(n("e9d3"),n("896e")),u=function(){function e(t,n){Object(a["a"])(this,e),this.Cesium=t,this.viewer=n}return Object(o["a"])(e,[{key:"createBar",value:function(e){for(var t=this,n=this.Cesium,a=new i["a"](n,this.viewer),o=new s["a"],u=null!==e&&void 0!==e&&e.nodeId?e.nodeId:"",l=null!==e&&void 0!==e&&e.radius?e.radius:25,d=null!==e&&void 0!==e&&e.color?e.color:["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#9a60b4","#ea7ccc"],f=[],h=0;h<e.data.length;h++){for(var v=e.data[h],p=[],y=0,g=0;g<v.data.length;g++){var m=v.data[g];0==p.length?y=0:y+=v.data[g-1].value;var w=a.createCylinder({id:null!==m&&void 0!==m&&m.id?m.id:Object(c["a"])(),name:m.label,position:n.Cartesian3.fromDegrees(v.position[0],v.position[1],y),heightReference:n.HeightReference.RELATIVE_TO_GROUND,topRadius:l,bottomRadius:l,length:m.value,shadows:n.ShadowMode.ENABLED,material:new n.Color.fromCssColorString(d[g])});p.push(w)}f.push({entity:p,name:v.name})}var x=!(null===e||void 0===e||!e.tooltip)&&e.tooltip;if(x){var b=new n.ScreenSpaceEventHandler(this.viewer.scene.canvas),z=function(e){for(var t=0;t<f.length;t++){var n=f[t],r=n.entity.filter((function(t){return t.id==e}));if(0!=r.length)return t}},C=function(e){var t=window.document.createElement("div");t.id="echarts3D-Bar-Info-Window",t.className="echarts3D-Bar-Info-Window";for(var n="",r="",a=e.data.reverse(),o=0;o<a.length;o++){var i=a[o];r+='<div class="echarts3D-Bar-Info-Window-Item">\n                                <div class="echarts3D-Bar-Info-Window-Item-Label">\n                                    <div class="echarts3D-Bar-Info-Window-Item-Spot" style="background-color:'.concat(i.color,'"></div>\n                                    <div class="echarts3D-Bar-Info-Window-Item-Text">').concat(i.label,'</div>\n                                </div>\n                                <div class="echarts3D-Bar-Info-Window-Item-Value">').concat(i.value,"</div>\n                            </div>")}return n='\n                <div class="echarts3D-Bar-Info-Window-Title">'.concat(e.name,'</div>\n                <div class="echarts3D-Bar-Info-Window-Box">').concat(r,'</div>\n                <div class="echarts3D-Bar-Info-Window-triangle"></div>\n                '),t.innerHTML=n,t},M=function(e,t){var n=document.getElementById(e);n.style.top=t.y-n.offsetHeight+"px",n.style.left=t.x+n.offsetWidth+"px"},I=function(t,r){var a=!(null===e||void 0===e||!e.hover)&&e.hover;if(a)if(t)for(var o=0;o<f[r].entity.length;o++){var i=n.Color.fromCssColorString(d[o]).withAlpha(.9);f[r].entity[o].cylinder.material=i}else for(var s=0;s<f.length;s++)for(var c=0;c<f[s].entity.length;c++){var u=n.Color.fromCssColorString(d[c]);f[s].entity[c].cylinder.material=u}},k=function(t,n){var a=z(t),i={name:e.data[a].name||"",data:e.data[a].data.map((function(e,t){return Object(r["a"])(Object(r["a"])({},e),{},{color:d[t]})}))},s=C(i);o.operationDom("has","echarts3D-Bar-Info-Window")||o.operationDom("append",u,s),M("echarts3D-Bar-Info-Window",n),I(!0,a)};b.setInputAction((function(e){var n=t.viewer.scene.pick(e.endPosition),r=document.getElementById(u);if(!n)return o.operationDom("has","echarts3D-Bar-Info-Window")&&o.operationDom("remove","echarts3D-Bar-Info-Window"),r.style.cursor="default",void I(!1);r.style.cursor="pointer",o.debounce(k(n.id.id,e.endPosition))}),n.ScreenSpaceEventType.MOUSE_MOVE)}return f}},{key:"createWaterPolo",value:function(e){var t,n,a,o,i,u=this;if(0!=e.data.length){var l=new s["a"],d=this.Cesium,f=null!==e&&void 0!==e&&e.nodeId?e.nodeId:"",h=null!==e&&void 0!==e&&e.color?e.color:["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#9a60b4","#ea7ccc"],v=null!==e&&void 0!==e&&e.size?e.size:100,p=null!==e&&void 0!==e&&e.padding?e.padding:0,y=null!==e&&void 0!==e&&e.zIndex?e.zIndex:2,g={width:null!==(t=e.border)&&void 0!==t&&t.width?e.border.width:0,color:null!==(n=e.border)&&void 0!==n&&n.color?e.border.color:"#000"},m={color:null!==(a=e.background)&&void 0!==a&&a.color?e.background.color:"#fff"},w={size:null!==(o=e.font)&&void 0!==o&&o.size?e.font.size:v/4,color:null!==(i=e.font)&&void 0!==i&&i.color?e.font.color:"#000"},x={zIndex:y,size:v,padding:p,border:g,background:m,font:w},b=e.data.map((function(e){return Object(r["a"])(Object(r["a"])({},e),{},{id:null!==e&&void 0!==e&&e.id?e.id:Object(c["a"])(),size:v})})),z=function(e,t){var n=window.document.createElement("div");n.id="echarts3D-Water-Polo-Wrap",n.className="echarts3D-Water-Polo-Wrap";for(var r="\n                <style>\n                @keyframes water-waves {\n                    0% {\n                    transform: rotate(0deg);\n                    }\n                    100% {\n                    transform: rotate(360deg);\n                    }\n                }\n                </style>\n            ",a="",o=0;o<e.length;o++){var i=e[o],s={zIndex:null!==i&&void 0!==i&&i.zIndex?i.zIndex:y,color:null!==i&&void 0!==i&&i.color?i.color:h.length>o?h[o]:l.getRandomColor,data:i.data,size:t.size,padding:t.padding,border:t.border,background:t.background,font:t.font},c="\n                    padding: ".concat(s.padding,"px;\n                    width: ").concat(s.size,"px;\n                    height: ").concat(s.size,"px;\n                    border-radius: 50%;\n                    position: fixed;\n                    z-index: 2;\n                    border:").concat(s.color," ").concat(s.border.width,"px solid;\n                    box-sizing: border-box;\n                    overflow: hidden;\n                    left:50%;\n                    top:50%;\n                    background:").concat(s.background.color,";\n                    padding:").concat(s.padding,"px;\n                "),u="\n                    width:100%;\n                    height:100%;\n                    border-radius: 50%;\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;  \n                    z-index:2;\n                    box-sizing: border-box;\n                    overflow: hidden;\n                    position: relative;\n                ",d="\n                    font-size:".concat(s.font.size,"px;\n                    color:").concat(s.font.color,";\n                    position: relative;\n                    user-select:none;\n                "),f="\n                    position: absolute;\n                    width: 200%;\n                    height: 200%;\n                    animation: water-waves linear infinite;\n                    background-color: ".concat(s.color,";\n                "),v=100-i.data+100,p="\n                    bottom: -".concat(v-10,"%;\n                    left: -25%;\n                    opacity: 0.7;\n                    border-radius: 40%;\n                    animation-duration: 5s;\n                "),g="\n                    bottom: -".concat(v-5,"%;\n                    left: -35%;\n                    border-radius: 35%;\n                    opacity: 0.5;\n                    animation-duration: 7s;\n                "),m="\n                    bottom: -".concat(v,"%;\n                    left: -35%;\n                    opacity: 0.3;\n                    border-radius: 33%;\n                    animation-duration: 11s;\n                ");a+='\n                    <div id="'.concat(i.id,'" style="').concat(c,'" class="echarts3D-Water-Polo">\n                        <div style="').concat(u,'">\n                            <div class="water water1" style="').concat(f).concat(p,'"></div>\n                            <div class="water water2" style="').concat(f).concat(g,'"></div>\n                            <div class="water water3" style="').concat(f).concat(m,'"></div>\n                            <div class="text" style="').concat(d,'">').concat(i.data,"%</div>\n                        </div>\n                    </div>\n                ")}return n.innerHTML="".concat(r).concat(a),n},C=z(b,x);l.operationDom("append",f,C);for(var M=function(e){var t=b[e],n=document.getElementById(t.id);u.viewer.scene.preRender.addEventListener((function(){var e=d.Cartesian3.fromDegrees(t.position[0],t.position[1],t.position[2]||0),r=u.viewer.scene.cartesianToCanvasCoordinates(e,new d.Cartesian2);d.defined(r)&&(n.style.top=r.y+"px",n.style.left=r.x+"px")}))},I=0;I<b.length;I++)M(I)}}}]),e}();t["a"]=u},6410:function(e,t,n){"use strict";var r=n("46a7"),a=n("4162"),o=n("923b"),i=n("c68c"),s=n("f27a"),c=a([].join),u=o!=Object,l=s("join",",");r({target:"Array",proto:!0,forced:u||!l},{join:function(e){return c(i(this),void 0===e?",":e)}})},7502:function(e,t,n){"use strict";var r=n("5fa3"),a=n("eaa4"),o=n("4162"),i=n("d12a"),s=n("05b4"),c=n("a220"),u=n("555a"),l=n("736f"),d=n("7d68"),f=n("d957"),h=n("d2b9"),v=n("d0a3").f,p=n("6311").f,y=n("c4d4").f,g=n("4488"),m=n("942b").trim,w="Number",x=a[w],b=x.prototype,z=a.TypeError,C=o("".slice),M=o("".charCodeAt),I=function(e){var t=f(e,"number");return"bigint"==typeof t?t:k(t)},k=function(e){var t,n,r,a,o,i,s,c,u=f(e,"number");if(d(u))throw z("Cannot convert a Symbol value to a number");if("string"==typeof u&&u.length>2)if(u=m(u),t=M(u,0),43===t||45===t){if(n=M(u,2),88===n||120===n)return NaN}else if(48===t){switch(M(u,1)){case 66:case 98:r=2,a=49;break;case 79:case 111:r=8,a=55;break;default:return+u}for(o=C(u,2),i=o.length,s=0;s<i;s++)if(c=M(o,s),c<48||c>a)return NaN;return parseInt(o,r)}return+u};if(i(w,!x(" 0o1")||!x("0b1")||x("+0x1"))){for(var D,E=function(e){var t=arguments.length<1?0:x(I(e)),n=this;return l(b,n)&&h((function(){g(n)}))?u(Object(t),n,E):t},P=r?v(x):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),O=0;P.length>O;O++)c(x,D=P[O])&&!c(E,D)&&y(E,D,p(x,D));E.prototype=b,b.constructor=E,s(a,w,E,{constructor:!0})}},"78be":function(e,t,n){var r=n("46a7"),a=n("bc35"),o=n("5386");r({target:"Array",proto:!0},{fill:a}),o("fill")},"896e":function(e,t,n){"use strict";var r,a=new Uint8Array(16);function o(){if(!r&&(r="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),!r))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(a)}var i=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function s(e){return"string"===typeof e&&i.test(e)}for(var c=s,u=[],l=0;l<256;++l)u.push((l+256).toString(16).substr(1));function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(u[e[t+0]]+u[e[t+1]]+u[e[t+2]]+u[e[t+3]]+"-"+u[e[t+4]]+u[e[t+5]]+"-"+u[e[t+6]]+u[e[t+7]]+"-"+u[e[t+8]]+u[e[t+9]]+"-"+u[e[t+10]]+u[e[t+11]]+u[e[t+12]]+u[e[t+13]]+u[e[t+14]]+u[e[t+15]]).toLowerCase();if(!c(n))throw TypeError("Stringified UUID is invalid");return n}var f=d;function h(e,t,n){e=e||{};var r=e.random||(e.rng||o)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){n=n||0;for(var a=0;a<16;++a)t[n+a]=r[a];return t}return f(r)}t["a"]=h},bc35:function(e,t,n){"use strict";var r=n("735b"),a=n("32da"),o=n("1c60");e.exports=function(e){var t=r(this),n=o(t),i=arguments.length,s=a(i>1?arguments[1]:void 0,n),c=i>2?arguments[2]:void 0,u=void 0===c?n:a(c,n);while(u>s)t[s++]=e;return t}},c407:function(e,t,n){"use strict";var r=n("4bb1"),a=n("e143"),o=(n("6410"),n("eb3b"),n("b1f6"),n("2237"),n("a567"),function(){function e(t,n){Object(r["a"])(this,e),this.Cesium=t,this.viewer=n}return Object(a["a"])(e,[{key:"getRandomColor",get:function(){for(var e="#",t=["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"],n=0;n<6;n++){var r=Math.floor(Math.random()*t.length+1)-1;e+=t[r]}return e}},{key:"operationDom",value:function(e,t,n){if("append"===e&&document.getElementById(t).appendChild(n),"remove"===e&&document.getElementById(t).remove(),"has"===e)return document.getElementById(t)}},{key:"crecteIframe",value:function(e,t){var n=document.createElement("iframe");return n.src=e,n.setAttribute("frameBorder",0),null!==t&&void 0!==t&&t.width&&(n.width=t.width),null!==t&&void 0!==t&&t.height&&(n.height=t.height),n}},{key:"queryParams",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"brackets",r=t?"?":"",a=[];-1==["indices","brackets","repeat","comma"].indexOf(n)&&(n="brackets");var o=function(t){var r=e[t];if(["",void 0,null].indexOf(r)>=0)return"continue";if(r.constructor===Array)switch(n){case"indices":for(var o=0;o<r.length;o++)a.push(t+"["+o+"]="+r[o]);break;case"brackets":r.forEach((function(e){a.push(t+"[]="+e)}));break;case"repeat":r.forEach((function(e){a.push(t+"="+e)}));break;case"comma":var i="";r.forEach((function(e){i+=(i?",":"")+e})),a.push(t+"="+i);break;default:r.forEach((function(e){a.push(t+"[]="+e)}))}else a.push(t+"="+r)};for(var i in e)o(i);return a.length?r+a.join("&"):""}},{key:"debounce",value:function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(){var a=this,o=arguments;if(t&&clearTimeout(t),r){var i=!t;t=setTimeout((function(){t=null}),n),i&&e.apply(a,o)}else t=setTimeout((function(){e.apply}),n)}}},{key:"throttle",value:function(e,t,n){var r,a=0;return function(){var o=this,i=arguments;if(1===n){var s=Date.now();s-a>t&&(e.apply(o,i),a=s)}else 2===n&&(r||(r=setTimeout((function(){r=null,e.apply(o,i)}),t)))}}},{key:"createScript",value:function(e){var t=document.createElement("script");t.setAttribute("type","text/javascript"),t.setAttribute("src",e),document.getElementsByTagName("head")[0].appendChild(t)}},{key:"loadJs",value:function(e,t){return new Promise((function(n,r){var a=document.createElement("script");a.type="text/javascript",null!==t&&void 0!==t&&t.async&&t.async&&(a.async="async"),null!==t&&void 0!==t&&t.defer&&t.defer&&(a.defer="defer");var o="body";null!==t&&void 0!==t&&t.append&&t.append&&("body"==t.append||"head"==t.append)&&(o=t.append),a.src=e,document[o].appendChild(a),a.onload=function(){n()},a.onerror=function(){r()}}))}},{key:"randomPoint",value:function(e){var t=e.start,n=e.end,r=e.range||1e3,a=e.height||0,o=e.type||"cartesian3",i=this.Cesium;function s(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var c=s(t[0]*r,n[0]*r)/r,u=s(t[1]*r,n[1]*r)/r;return"cartesian3"==o?i.Cartesian3.fromDegrees(c,u,a):"jwd"==o?[c,u,a]:void 0}},{key:"getEntityPosition",value:function(e){var t=this.Cesium;return e.position?e.position._value||t.Property.getValueOrUndefined(e.position,this.viewer.clock.currentTime||t.JulianDate.now(),new t.Cartesian3):void 0}},{key:"toDegrees",value:function(e){var t=this.Cesium;if(this.isDegreesOrCartesian(e)){var n=function(e){var n=new t.Cartesian3(e.x,e.y,e.z),r=t.Cartographic.fromCartesian(n);return{lng:parseFloat(t.Math.toDegrees(r.longitude).toFixed(8)),lat:parseFloat(t.Math.toDegrees(r.latitude).toFixed(8)),alt:parseFloat(r.height.toFixed(8))}};return e.x&&(e=n(e)),e}}},{key:"getCameraInfo",value:function(){var e=this.viewer;if(e&&e.camera&&e.camera.position&&e.camera.heading){var t=this.toDegrees(e.camera.position),n=Cesium.Math.toDegrees(e.camera.heading),r=Cesium.Math.toDegrees(e.camera.pitch),a=Cesium.Math.toDegrees(e.camera.roll);return{heading:parseFloat(n).toFixed(5),pitch:parseFloat(r).toFixed(5),roll:parseFloat(a).toFixed(5),lng:parseFloat(t.lng).toFixed(7),lat:parseFloat(t.lat).toFixed(7),alt:parseFloat(t.alt).toFixed(2)}}throw new Error("Error in Parameter!")}},{key:"isDegreesOrCartesian",value:function(e){if(!e)throw new Error("Error in Parameter!");return"number"===typeof e.x&&"number"===typeof e.y&&"number"===typeof e.z||"number"===typeof e.lng&&"number"===typeof e.lat}},{key:"toCartesian",value:function(e){var t=this.Cesium;if(this.isDegreesOrCartesian(e)){var n=function(e){return t.Cartesian3.fromDegrees(e.lng,e.lat,e.alt||0)};return e.lng&&(e=n(e)),e}}},{key:"point2LineDistance",value:function(e,t,n){e=this.toCartesian(e),t=this.toCartesian(t),n=this.toCartesian(n);var r=Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2)),a=Math.sqrt(Math.pow(e.x-n.x,2)+Math.pow(e.y-n.y,2)+Math.pow(e.z-n.z,2)),o=Math.sqrt(Math.pow(n.x-t.x,2)+Math.pow(n.y-t.y,2)+Math.pow(n.z-t.z,2)),i=(Math.pow(a,2)+Math.pow(r,2)-Math.pow(o,2))/(2*r*a),s=Math.sqrt(1-Math.pow(i,2)),c=((e.x-n.x)*(e.x-t.x)+(e.y-n.y)*(e.y-t.y)+(e.z-n.z)*(e.z-t.z))/(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2));return c<0?a:c<=1&&c>=0?a*s:c>1?o:void 0}},{key:"countArea",value:function(e){if(!e||e.length<3)throw new Error("Error in Parameter!");for(var t=0,n=0;n<e.length;n++){var r=(n+1)%e.length,a=e[n],o=e[r];a=this.toCartesian(a),o=this.toCartesian(o),t+=a.x*o.y,t-=a.y*o.x}return t/=2,Math.abs(t)}},{key:"countAreaByThreePoints",value:function(e,t,n){e=this.toCartesian(e),t=this.toCartesian(t),n=this.toCartesian(n);var r=-1,a=[];if(a[0]=Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2)),a[1]=Math.sqrt(Math.pow(e.x-n.x,2)+Math.pow(e.y-n.y,2)+Math.pow(e.z-n.z,2)),a[2]=Math.sqrt(Math.pow(n.x-t.x,2)+Math.pow(n.y-t.y,2)+Math.pow(n.z-t.z,2)),a[0]+a[1]<=a[2]||a[0]+a[2]<=a[1]||a[1]+a[2]<=a[0])return r;var o=(a[0]+a[1]+a[2])/2;return r=Math.sqrt(o*(o-a[0])*(o-a[1])*(o-a[2])),r}},{key:"getDistance",value:function(e,t){if(!e||!t)throw new Error("Error in Parameter!");return e=this.toCartesian(e),t=this.toCartesian(t),Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)+Math.pow(e.z-t.z,2))}},{key:"getNormal",value:function(e,t,n){e=this.toCartesian(e),t=this.toCartesian(t),n=this.toCartesian(n);var r=(t.y-e.y)*(n.z-e.z)-(t.z-e.z)*(n.y-e.y),a=(t.z-e.z)*(n.x-e.x)-(t.x-e.x)*(n.z-e.z),o=(t.x-e.x)*(n.y-e.y)-(t.y-e.y)*(n.x-e.x);return{x:r,y:a,z:o}}},{key:"countIntersectionOfLineAndPlane",value:function(e,t,n,r){var a,o,i,s,c,u,l,d,f,h,v,p,y,g;a=e.x,o=e.y,i=e.z,s=t.x,c=t.y,u=t.z,l=n.x,d=n.y,f=n.z,h=r.x,v=r.y,p=r.z,g=l*a+d*o+f*i;var m={};if(0!==g)return y=((s-h)*a+(c-v)*o+(u-p)*i)/g,m.x=h+l*y,m.y=v+d*y,m.z=p+f*y,m}},{key:"getPointInPolygon",value:function(){var e=this.getNormal(polygon[0],polygon[1],polygon[2]),t=line[0].x-line[1].x,n=line[0].y-line[1].y,r=line[0].z-line[1].z,a={x:t,y:n,z:r},o=this.countIntersectionOfLineAndPlane(e,polygon[1],a,line[0]);return o||!1}},{key:"isPointInQuadrilateral",value:function(){var e,t,n,r,a,o,i,s,c,u,l;i=this.getDistance(quadrilateral[0],quadrilateral[1]),s=this.getDistance(quadrilateral[1],quadrilateral[2]),c=this.getDistance(quadrilateral[0],quadrilateral[2]),u=this.getDistance(quadrilateral[2],quadrilateral[3]),l=this.getDistance(quadrilateral[3],quadrilateral[4]);var d,f,h,v,p=(i+s+c)/2,y=(c+u+l)/2;e=Math.sqrt(p*(p-i)*(p-s)*(p-c)),t=Math.sqrt(y*(y-c)*(y-u)*(y-l)),d=this.getDistance(point,quadrilateral[0]),f=this.getDistance(point,quadrilateral[1]),h=this.getDistance(point,quadrilateral[2]),v=this.getDistance(point,quadrilateral[3]);var g=(i+d+f)/2,m=(s+f+h)/2,w=(u+h+v)/2,x=(l+v+d)/2;return n=Math.sqrt(g*(g-i)*(g-d)*(g-f)),r=Math.sqrt(m*(m-s)*(m-f)*(m-h)),a=Math.sqrt(w*(w-u)*(w-h)*(w-v)),o=Math.sqrt(x*(x-l)*(x-v)*(x-d)),!(Math.abs(n+r+a+o-(e+t))>1e-4)}},{key:"JudgePointInPolygon",value:function(e,t){var n,r,a,o,i,s,c,u,l=function(e,t){return e.y*t.z-t.y*e.z+(e.z*t.x-e.x*t.z)+(e.x*t.y-e.y*t.x)},d=t[0],f=t[1],h=t[2],v=t[3];return n={x:f.x-d.x,y:f.y-d.y,z:f.z-d.z},r={x:e.x-d.x,y:e.y-d.y,z:e.z-d.z},a={x:v.x-h.x,y:v.y-h.y,z:v.z-h.z},o={x:e.x-h.x,y:e.y-h.y,z:e.z-h.z},i={x:h.x-f.x,y:h.y-f.y,z:h.z-f.z},s={x:e.x-f.x,y:e.y-f.y,z:e.z-f.z},c={x:v.x-d.x,y:v.y-d.y,z:v.z-d.z},u={x:e.x-v.x,y:e.y-v.y,z:e.z-v.z},!(l(n,r)*l(a,o)>=0&&l(i,s)*l(c,u)>=0)}},{key:"JudgePointInPolyline",value:function(e,t){var n=Math.sqrt(Math.pow(t[0].x-t[1].x,2)+Math.pow(t[0].y-t[1].y,2)+Math.pow(t[0].z-t[1].z,2)),r=Math.sqrt(Math.pow(e.x-t[1].x,2)+Math.pow(e.y-t[1].y,2)+Math.pow(e.z-t[1].z,2)),a=Math.sqrt(Math.pow(e.x-t[0].x,2)+Math.pow(e.y-t[0].y,2)+Math.pow(e.z-t[0].z,2)),o=r+a-n;return 1e4*o<1}},{key:"GetPanelEquation",value:function(e){var t,n,r,a;if(!(e.length<3))return t=e[0].y*(e[1].z-e[2].z)+e[1].y*(e[2].z-e[0].z)+e[2].y*(e[0].z-e[1].z),n=e[0].z*(e[1].x-e[2].x)+e[1].z*(e[2].x-e[0].x)+e[2].z*(e[0].x-e[1].x),r=e[0].x*(e[1].y-e[2].y)+e[1].x*(e[2].y-e[0].y)+e[2].x*(e[0].y-e[1].y),a=-e[0].x*(e[1].y*e[2].z-e[2].y*e[1].z)-e[1].x*(e[2].y*e[0].z-e[0].y*e[2].z)-e[2].x*(e[0].y*e[1].z-e[1].y*e[0].z),{A:t,B:n,C:r,D:a}}}]),e}());t["a"]=o},e143:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}n.d(t,"a",(function(){return a}))},e9d3:function(e,t,n){"use strict";var r=n("4bb1"),a=n("e143"),o=(n("7502"),n("2237"),n("eb3b"),n("a567"),function(){function e(t,n){Object(r["a"])(this,e),this.Cesium=t,this.viewer=n}return Object(a["a"])(e,[{key:"formCssColorString",value:function(e){var t=this.Cesium;return t.Color.fromCssColorString(e)}},{key:"getPosition",value:function(e){var t=this.Cesium,n=this.viewer,r=n.scene.camera.pickEllipsoid(e.position),a=t.Cartographic.fromCartesian(r),o=t.Math.toDegrees(a.longitude),i=t.Math.toDegrees(a.latitude),s=Number(n.camera.positionCartographic.height.toFixed(0));return{longitude:o,latitude:i,cameraHeight:s}}},{key:"terrainProviderHeight",value:function(e){var t=this.Cesium,n=t.createWorldTerrain(),r=t.sampleTerrainMostDetailed(n,e);return Promise.resolve(r)}},{key:"getSeibelCurve",value:function(e,t,n,r){var a=this.Cesium,o=[],i=a.Cartographic.fromCartesian(e),s=a.Cartographic.fromCartesian(t),c=180*i.longitude/Math.PI,u=180*i.latitude/Math.PI,l=180*s.longitude/Math.PI,d=180*s.latitude/Math.PI,f=Math.sqrt((c-l)*(c-l)+(u-d)*(u-d)),h=f*n,v=a.Cartesian3.clone(e),p=a.Cartesian3.clone(t),y=a.Cartesian3.distance(v,a.Cartesian3.ZERO),g=a.Cartesian3.distance(p,a.Cartesian3.ZERO);if(a.Cartesian3.normalize(v,v),a.Cartesian3.normalize(p,p),0===a.Cartesian3.distance(v,p))return o;var m=a.Cartesian3.angleBetween(v,p);o.push(e);for(var w=1;w<r-1;w++){var x=1*w/(r-1),b=1-x,z=Math.sin(b*m)/Math.sin(m),C=Math.sin(x*m)/Math.sin(m),M=a.Cartesian3.multiplyByScalar(v,z,new a.Cartesian3),I=a.Cartesian3.multiplyByScalar(p,C,new a.Cartesian3),k=a.Cartesian3.add(M,I,new a.Cartesian3),D=x*Math.PI,E=y*b+g*x+Math.sin(D)*h,P=a.Cartesian3.multiplyByScalar(k,E,k);o.push(P)}return o.push(t),o}},{key:"getCatesian3FromPX",value:function(e){var t=this.viewer.camera.getPickRay(e);return t?this.viewer.scene.globe.pick(t,this.viewer.scene):null}},{key:"meter2Lat",value:function(e){var t=Math.PI,n=12742*t/360;return e/n/1e3}},{key:"meter2Lng",value:function(e,t){var n=Math.PI,r=6371*Math.cos(t*n/180)*2*n/360;return e/r/1e3}},{key:"isDegreesOrCartesian",value:function(e){if(!e)throw new Error("Error in Parameter!");return"number"===typeof e.x&&"number"===typeof e.y&&"number"===typeof e.z||"number"===typeof e.lng&&"number"===typeof e.lat}},{key:"toDegrees",value:function(e){var t=this.Cesium;if(this.isDegreesOrCartesian(e)){var n=function(e){var n=new t.Cartesian3(e.x,e.y,e.z),r=t.Cartographic.fromCartesian(n);return{lng:parseFloat(t.Math.toDegrees(r.longitude).toFixed(8)),lat:parseFloat(t.Math.toDegrees(r.latitude).toFixed(8)),alt:parseFloat(r.height.toFixed(8))}};return e.x&&(e=n(e)),e}}},{key:"toCartesian",value:function(e){var t=this.Cesium;if(this.isDegreesOrCartesian(e)){var n=function(e){return t.Cartesian3.fromDegrees(e.lng,e.lat,e.alt||0)};return e.lng&&(e=n(e)),e}}},{key:"toWindowCoordinates",value:function(e){var t=this.Cesium,n=this.viewer;if(n&&e&&e.x&&e.y&&e.z)return t.SceneTransforms.wgs84ToWindowCoordinates(n.scene,e);if(n&&e.lng&&e.lat&&e.alt)return t.SceneTransforms.wgs84ToWindowCoordinates(n.scene,toCartesianFromDegrees(e));throw new Error("Error in Parameter!")}}]),e}());t["a"]=o}}]);