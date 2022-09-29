(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2fa55f44"],{"19bc":function(e,t,n){var r=n("46a7"),i=n("d2b9"),o=n("e136").f,a=i((function(){return!Object.getOwnPropertyNames(1)}));r({target:"Object",stat:!0,forced:a},{getOwnPropertyNames:o})},"1baa":function(e,t,n){},"7e36":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{attrs:{id:"cesiumContainer"}})])}],o=(n("eb3b"),n("b1f6"),n("19bc"),n("d060"),n("c407"),{data:function(){return{viewer:null,_Utils:null}},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNTIzZTZiYi05OWQxLTQ0OTUtYTUzNC1mYjYxNWI4OTZiZTYiLCJpZCI6OTA3MDUsImlhdCI6MTY1MDUzNDAzMn0.0f1DG8NlExZnbrueMn_AgO6GX_g_RASavpxAWcVymPs",this.viewer=new e.Viewer("cesiumContainer",{infoBox:!1,shouldAnimate:!0,vrButton:!0,geocoder:!1,homeButton:!1,sceneModePicker:!1,baseLayerPicker:!0,navigationHelpButton:!1,animation:!1,timeline:!1,fullscreenButton:!1}),this.start()},start:function(){var e=this.cesium,t=this.viewer;e.TILE_EFFECT_STATE=!0,e.TILE_FS_BODY=" float stc_pl = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;\n                float stc_sd = v_stcVertex.z / 320.0 + sin(stc_pl) * 0.1;\n                gl_FragColor *= vec4(stc_sd, stc_sd, stc_sd, 1.0);\n                float stc_a13 = fract(czm_frameNumber / 360.0);\n                float stc_h = clamp(v_stcVertex.z / 450.0, 0.0, 1.0);\n                stc_a13 = abs(stc_a13 - 0.5) * 2.0;\n                float stc_diff = step(0.005, abs(stc_h - stc_a13));\n                gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - stc_diff);";var n=t.scene.primitives.add(new e.Cesium3DTileset({url:"https://lab.earthsdk.com/model/702aa950d03c11e99f7ddd77cbe22fea/tileset.json"}));n.tileVisible.addEventListener((function(e){for(var t,n=e.content,r=n.featuresLength,i=function(){t=n.getFeature(o);var e=t.content._model;e._shouldRegenerateShaders=!0,Object.getOwnPropertyNames(e._sourcePrograms).forEach((function(t){var n=e._sourcePrograms[0];e._rendererResources.sourceShaders[n.fragmentShader]="\n     varying vec3 v_positionEC;\n     void main(void){\n       vec4 position = czm_inverseModelView * vec4(v_positionEC,1); // 位置\n       float glowRange = 100.0; // 光环的移动范围(高度)\n       gl_FragColor = vec4(0.0, 0.3, 0.8, 0.8); // 颜色\n       \n       // 小于20米的低楼都不再变暗\n       if(position.y > 20.0) {\n         gl_FragColor *= vec4(vec3(position.y / 20.0), 0.8); // 渐变\n       }\n       \n       // 动态光环\n       float time = fract(czm_frameNumber / 360.0);\n       time = abs(time - 0.5) * 3.0;\n       float diff = step(0.005, abs( clamp(position.y / glowRange, 0.0, 1.0) - time));\n       gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - diff);\n     }\n     "})),e._shouldRegenerateShaders=!0},o=0;o<r;o+=2)i()})),n.readyPromise.then((function(n){n.style=new e.Cesium3DTileStyle({color:{conditions:[["true","color('cyan')"]]}}),t.flyTo(n)}))}}}),a=o,s=(n("9e73"),n("cba8")),c=Object(s["a"])(a,r,i,!1,null,"9639ba90",null);t["default"]=c.exports},"9e73":function(e,t,n){"use strict";n("1baa")},d060:function(e,t){"undefined"!==typeof Cesium&&function(e){function t(){e.ModelUtility.updateForwardAxis=function(t){this._model=t;var n=t.gltf.extras.sourceVersion;(e.defined(n)&&"2.0"!==n||"2.0"!==e.ModelUtility.getAssetVersion(t.gltf))&&(t._gltfForwardAxis=e.Axis.X)},e.ModelUtility.modifyFragmentShaderForLogDepth=function(t){var n=!1;return e.TILE_EFFECT_STATE&&this._model&&-1!==this._model._resource._url.indexOf("b3dm")&&(n=!0),t=e.ShaderSource.replaceMain(t,"czm_depth_main"),t+=n?"\n                varying vec3 v_stcVertex;\n                void main(){\n                    czm_depth_main();\n                    "+e.TILE_FS_BODY+"\n                    czm_writeLogDepth();\n                }\n                ":"\n                    varying vec3 v_stcVertex;\n                    void main(){\n                        czm_depth_main();\n                        czm_writeLogDepth();\n                    }\n                    ",t},e.ModelUtility.modifyVertexShaderForLogDepth=function(t,n){return t=e.ShaderSource.replaceMain(t,"czm_depth_main"),t+="\nvarying vec3 v_stcVertex;\nvoid main() \n{ \n    czm_depth_main(); \n    v_stcVertex = a_position;\n    czm_vertexLogDepth("+n+"); \n} \n",t}}e.TILE_EFFECT_STATE=!0,e.TILE_FS_BODY=" float stc_pl = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;\n                float stc_sd = v_stcVertex.z / 60.0 + sin(stc_pl) * 0.1;\n                gl_FragColor *= vec4(stc_sd, stc_sd, stc_sd, 1.0);\n                float stc_a13 = fract(czm_frameNumber / 360.0);\n                float stc_h = clamp(v_stcVertex.z / 450.0, 0.0, 1.0);\n                stc_a13 = abs(stc_a13 - 0.5) * 2.0;\n                float stc_diff = step(0.005, abs(stc_h - stc_a13));\n                gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - stc_diff);",t()}(Cesium)}}]);