(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30bbf294"],{"19bc":function(e,t,n){var r=n("46a7"),i=n("d2b9"),o=n("e136").f,a=i((function(){return!Object.getOwnPropertyNames(1)}));r({target:"Object",stat:!0,forced:a},{getOwnPropertyNames:o})},"1baa":function(e,t,n){},2237:function(e,t,n){"use strict";var r=n("46a7"),i=n("4162"),o=n("d2cf"),a=n("4488"),c=n("7f99"),s=n("d2b9"),f=RangeError,l=String,u=Math.floor,_=i(c),d=i("".slice),m=i(1..toFixed),g=function(e,t,n){return 0===t?n:t%2===1?g(e,t-1,n*e):g(e*e,t/2,n)},v=function(e){var t=0,n=e;while(n>=4096)t+=12,n/=4096;while(n>=2)t+=1,n/=2;return t},h=function(e,t,n){var r=-1,i=n;while(++r<6)i+=t*e[r],e[r]=i%1e7,i=u(i/1e7)},b=function(e,t){var n=6,r=0;while(--n>=0)r+=e[n],e[n]=u(r/t),r=r%t*1e7},p=function(e){var t=6,n="";while(--t>=0)if(""!==n||0===t||0!==e[t]){var r=l(e[t]);n=""===n?r:n+_("0",7-r.length)+r}return n},w=s((function(){return"0.000"!==m(8e-5,3)||"1"!==m(.9,0)||"1.25"!==m(1.255,2)||"1000000000000000128"!==m(0xde0b6b3a7640080,0)}))||!s((function(){m({})}));r({target:"Number",proto:!0,forced:w},{toFixed:function(e){var t,n,r,i,c=a(this),s=o(e),u=[0,0,0,0,0,0],m="",w="0";if(s<0||s>20)throw f("Incorrect fraction digits");if(c!=c)return"NaN";if(c<=-1e21||c>=1e21)return l(c);if(c<0&&(m="-",c=-c),c>1e-21)if(t=v(c*g(2,69,1))-69,n=t<0?c*g(2,-t,1):c/g(2,t,1),n*=4503599627370496,t=52-t,t>0){h(u,0,n),r=s;while(r>=7)h(u,1e7,0),r-=7;h(u,g(10,r,1),0),r=t-1;while(r>=23)b(u,1<<23),r-=23;b(u,1<<r),h(u,1,1),b(u,2),w=p(u)}else h(u,0,n),h(u,1<<-t,0),w=p(u)+_("0",s);return s>0?(i=w.length,w=m+(i<=s?"0."+_("0",s-i)+w:d(w,0,i-s)+"."+d(w,i-s))):w=m+w,w}})},4488:function(e,t,n){var r=n("4162");e.exports=r(1..valueOf)},"4bb1":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n("a567");function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},6410:function(e,t,n){"use strict";var r=n("46a7"),i=n("4162"),o=n("923b"),a=n("c68c"),c=n("f27a"),s=i([].join),f=o!=Object,l=c("join",",");r({target:"Array",proto:!0,forced:f||!l},{join:function(e){return s(a(this),void 0===e?",":e)}})},"7e36":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{attrs:{id:"cesiumContainer"}})])}],o=(n("eb3b"),n("b1f6"),n("19bc"),n("d060"),n("c407"),{data:function(){return{viewer:null,_Utils:null}},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNTIzZTZiYi05OWQxLTQ0OTUtYTUzNC1mYjYxNWI4OTZiZTYiLCJpZCI6OTA3MDUsImlhdCI6MTY1MDUzNDAzMn0.0f1DG8NlExZnbrueMn_AgO6GX_g_RASavpxAWcVymPs",this.viewer=new e.Viewer("cesiumContainer",{infoBox:!1,shouldAnimate:!0,vrButton:!0,geocoder:!1,homeButton:!1,sceneModePicker:!1,baseLayerPicker:!0,navigationHelpButton:!1,animation:!1,timeline:!1,fullscreenButton:!1}),this.start()},start:function(){var e=this.cesium,t=this.viewer;e.TILE_EFFECT_STATE=!0,e.TILE_FS_BODY=" float stc_pl = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;\n                float stc_sd = v_stcVertex.z / 320.0 + sin(stc_pl) * 0.1;\n                gl_FragColor *= vec4(stc_sd, stc_sd, stc_sd, 1.0);\n                float stc_a13 = fract(czm_frameNumber / 360.0);\n                float stc_h = clamp(v_stcVertex.z / 450.0, 0.0, 1.0);\n                stc_a13 = abs(stc_a13 - 0.5) * 2.0;\n                float stc_diff = step(0.005, abs(stc_h - stc_a13));\n                gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - stc_diff);";var n=t.scene.primitives.add(new e.Cesium3DTileset({url:"https://lab.earthsdk.com/model/702aa950d03c11e99f7ddd77cbe22fea/tileset.json"}));n.tileVisible.addEventListener((function(e){for(var t,n=e.content,r=n.featuresLength,i=function(){t=n.getFeature(o);var e=t.content._model;e._shouldRegenerateShaders=!0,Object.getOwnPropertyNames(e._sourcePrograms).forEach((function(t){var n=e._sourcePrograms[0];e._rendererResources.sourceShaders[n.fragmentShader]="\n     varying vec3 v_positionEC;\n     void main(void){\n       vec4 position = czm_inverseModelView * vec4(v_positionEC,1); // 位置\n       float glowRange = 100.0; // 光环的移动范围(高度)\n       gl_FragColor = vec4(0.0, 0.3, 0.8, 0.8); // 颜色\n       \n       // 小于20米的低楼都不再变暗\n       if(position.y > 20.0) {\n         gl_FragColor *= vec4(vec3(position.y / 20.0), 0.8); // 渐变\n       }\n       \n       // 动态光环\n       float time = fract(czm_frameNumber / 360.0);\n       time = abs(time - 0.5) * 3.0;\n       float diff = step(0.005, abs( clamp(position.y / glowRange, 0.0, 1.0) - time));\n       gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - diff);\n     }\n     "})),e._shouldRegenerateShaders=!0},o=0;o<r;o+=2)i()})),n.readyPromise.then((function(n){n.style=new e.Cesium3DTileStyle({color:{conditions:[["true","color('cyan')"]]}}),t.flyTo(n)}))}}}),a=o,c=(n("9e73"),n("cba8")),s=Object(c["a"])(a,r,i,!1,null,"9639ba90",null);t["default"]=s.exports},"9e73":function(e,t,n){"use strict";n("1baa")},d060:function(e,t){"undefined"!==typeof Cesium&&function(e){function t(){e.ModelUtility.updateForwardAxis=function(t){this._model=t;var n=t.gltf.extras.sourceVersion;(e.defined(n)&&"2.0"!==n||"2.0"!==e.ModelUtility.getAssetVersion(t.gltf))&&(t._gltfForwardAxis=e.Axis.X)},e.ModelUtility.modifyFragmentShaderForLogDepth=function(t){var n=!1;return e.TILE_EFFECT_STATE&&this._model&&-1!==this._model._resource._url.indexOf("b3dm")&&(n=!0),t=e.ShaderSource.replaceMain(t,"czm_depth_main"),t+=n?"\n                varying vec3 v_stcVertex;\n                void main(){\n                    czm_depth_main();\n                    "+e.TILE_FS_BODY+"\n                    czm_writeLogDepth();\n                }\n                ":"\n                    varying vec3 v_stcVertex;\n                    void main(){\n                        czm_depth_main();\n                        czm_writeLogDepth();\n                    }\n                    ",t},e.ModelUtility.modifyVertexShaderForLogDepth=function(t,n){return t=e.ShaderSource.replaceMain(t,"czm_depth_main"),t+="\nvarying vec3 v_stcVertex;\nvoid main() \n{ \n    czm_depth_main(); \n    v_stcVertex = a_position;\n    czm_vertexLogDepth("+n+"); \n} \n",t}}e.TILE_EFFECT_STATE=!0,e.TILE_FS_BODY=" float stc_pl = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;\n                float stc_sd = v_stcVertex.z / 60.0 + sin(stc_pl) * 0.1;\n                gl_FragColor *= vec4(stc_sd, stc_sd, stc_sd, 1.0);\n                float stc_a13 = fract(czm_frameNumber / 360.0);\n                float stc_h = clamp(v_stcVertex.z / 450.0, 0.0, 1.0);\n                stc_a13 = abs(stc_a13 - 0.5) * 2.0;\n                float stc_diff = step(0.005, abs(stc_h - stc_a13));\n                gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - stc_diff);",t()}(Cesium)},e143:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}n.d(t,"a",(function(){return i}))}}]);