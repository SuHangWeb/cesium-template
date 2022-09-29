(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-627c776e"],{"3e9f":function(e,n,t){"use strict";var a=t("4bb1"),r=t("e143"),i=(t("eb3b"),t("b1f6"),function(){function e(n,t){Object(a["a"])(this,e),this.Cesium=n,this.viewer=t,this.lastStageList=[]}return Object(r["a"])(e,[{key:"add",value:function(e,n,t,a){this.lastStageList.push(this.showRadarScan(e,n,t,a))}},{key:"clear",value:function(){var e=this;this.lastStageList.forEach((function(n){e.clearScanEffects(n)})),this.lastStageList=[]}},{key:"showRadarScan",value:function(e,n,t,a){var r=this.Cesium,i=new r.Cartographic(r.Math.toRadians(e[0]),r.Math.toRadians(e[1]),e[2]);n=new r.Color.fromCssColorString(n);var o=this._addRadarScanPostStage(i,t,n,a);return o}},{key:"_addRadarScanPostStage",value:function(e,n,t,a){var r=this.Cesium,i=r.Cartographic.toCartesian(e),o=new r.Cartesian4(i.x,i.y,i.z,1),s=new r.Cartographic(e.longitude,e.latitude,e.height+500),c=r.Cartographic.toCartesian(s),u=new r.Cartesian4(c.x,c.y,c.z,1),l=new r.Cartographic(e.longitude+r.Math.toRadians(.001),e.latitude,e.height),v=r.Cartographic.toCartesian(l),f=new r.Cartesian4(v.x,v.y,v.z,1),d=new r.Quaternion,m=new r.Matrix3,h=(new Date).getTime(),p=new r.Cartesian4,C=new r.Cartesian4,_=new r.Cartesian4,g=new r.Cartesian3,w=new r.Cartesian3,y=this,x=new r.PostProcessStage({fragmentShader:this._getRadarScanShader(),uniforms:{u_scanCenterEC:function(){return r.Matrix4.multiplyByVector(y.viewer.camera._viewMatrix,o,p)},u_scanPlaneNormalEC:function(){var e=r.Matrix4.multiplyByVector(y.viewer.camera._viewMatrix,o,p),n=r.Matrix4.multiplyByVector(y.viewer.camera._viewMatrix,u,C);return g.x=n.x-e.x,g.y=n.y-e.y,g.z=n.z-e.z,r.Cartesian3.normalize(g,g),g},u_radius:n,u_scanLineNormalEC:function(){var e=r.Matrix4.multiplyByVector(y.viewer.camera._viewMatrix,o,p),n=r.Matrix4.multiplyByVector(y.viewer.camera._viewMatrix,u,C),t=r.Matrix4.multiplyByVector(y.viewer.camera._viewMatrix,f,_);g.x=n.x-e.x,g.y=n.y-e.y,g.z=n.z-e.z,r.Cartesian3.normalize(g,g),w.x=t.x-e.x,w.y=t.y-e.y,w.z=t.z-e.z;var i=((new Date).getTime()-h)%a/a;return r.Quaternion.fromAxisAngle(g,i*r.Math.PI*2,d),r.Matrix3.fromQuaternion(d,m),r.Matrix3.multiplyByVector(m,w,w),r.Cartesian3.normalize(w,w),w},u_scanColor:t}});return this.viewer.scene.postProcessStages.add(x),x}},{key:"_getRadarScanShader",value:function(){var e="uniform sampler2D colorTexture;\nuniform sampler2D depthTexture;\nvarying vec2 v_textureCoordinates;\nuniform vec4 u_scanCenterEC;\nuniform vec3 u_scanPlaneNormalEC;\nuniform vec3 u_scanLineNormalEC;\nuniform float u_radius;\nuniform vec4 u_scanColor;\nvec4 toEye(in vec2 uv, in float depth)\n {\n vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\n vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);\n posInCamera =posInCamera / posInCamera.w;\n return posInCamera;\n }\nbool isPointOnLineRight(in vec3 ptOnLine, in vec3 lineNormal, in vec3 testPt)\n{\nvec3 v01 = testPt - ptOnLine;\nnormalize(v01);\nvec3 temp = cross(v01, lineNormal);\nfloat d = dot(temp, u_scanPlaneNormalEC);\nreturn d > 0.5;\n}\nvec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point)\n{\nvec3 v01 = point -planeOrigin;\nfloat d = dot(planeNormal, v01) ;\nreturn (point - planeNormal * d);\n}\nfloat distancePointToLine(in vec3 ptOnLine, in vec3 lineNormal, in vec3 testPt)\n{\nvec3 tempPt = pointProjectOnPlane(lineNormal, ptOnLine, testPt);\nreturn length(tempPt - ptOnLine);\n}\nfloat getDepth(in vec4 depth)\n{\nfloat z_window = czm_unpackDepth(depth);\nz_window = czm_reverseLogDepth(z_window);\nfloat n_range = czm_depthRange.near;\nfloat f_range = czm_depthRange.far;\nreturn (2.0 * z_window - n_range - f_range) / (f_range - n_range);\n}\nvoid main()\n{\ngl_FragColor = texture2D(colorTexture, v_textureCoordinates);\nfloat depth = getDepth( texture2D(depthTexture, v_textureCoordinates));\nvec4 viewPos = toEye(v_textureCoordinates, depth);\nvec3 prjOnPlane = pointProjectOnPlane(u_scanPlaneNormalEC.xyz, u_scanCenterEC.xyz, viewPos.xyz);\nfloat dis = length(prjOnPlane.xyz - u_scanCenterEC.xyz);\nfloat twou_radius = u_radius * 2.0;\nif(dis < u_radius)\n{\nfloat f0 = 1.0 -abs(u_radius - dis) / u_radius;\nf0 = pow(f0, 64.0);\nvec3 lineEndPt = vec3(u_scanCenterEC.xyz) + u_scanLineNormalEC * u_radius;\nfloat f = 0.0;\nif(isPointOnLineRight(u_scanCenterEC.xyz, u_scanLineNormalEC.xyz, prjOnPlane.xyz))\n{\nfloat dis1= length(prjOnPlane.xyz - lineEndPt);\nf = abs(twou_radius -dis1) / twou_radius;\nf = pow(f, 3.0);\n}\ngl_FragColor = mix(gl_FragColor, u_scanColor, f + f0);\n}\n}\n";return e}},{key:"clearScanEffects",value:function(e){this.viewer.scene.postProcessStages.remove(e)}}]),e}());n["a"]=i},"4bb1":function(e,n,t){"use strict";t.d(n,"a",(function(){return a}));t("a567");function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}},"73bc":function(e,n,t){},"750d":function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},r=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"container",attrs:{id:"echarts"}},[t("div",{attrs:{id:"cesiumContainer"}})])}],i=t("3e9f"),o=t("c78a"),s={name:"TextPage",data:function(){return{viewer:null,_CircleScan:null,_CircleDiffusion:null}},mounted:function(){this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNTIzZTZiYi05OWQxLTQ0OTUtYTUzNC1mYjYxNWI4OTZiZTYiLCJpZCI6OTA3MDUsImlhdCI6MTY1MDUzNDAzMn0.0f1DG8NlExZnbrueMn_AgO6GX_g_RASavpxAWcVymPs",this.viewer=new e.Viewer("cesiumContainer",{imageryProvider:new e.ArcGisMapServerImageryProvider({url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"}),infoBox:!1,shouldAnimate:!0,vrButton:!0,geocoder:!1,homeButton:!1,sceneModePicker:!1,baseLayerPicker:!0,navigationHelpButton:!1,animation:!1,timeline:!1,fullscreenButton:!1}),this._CircleScan=new i["a"](e,this.viewer),this._CircleDiffusion=new o["a"](e,this.viewer),this.viewer.scene.globe.depthTestAgainstTerrain=!0,this.start()},start:function(){var e=this.cesium;this._CircleScan.add([123.46787863792646,41.83241486807863,0],"rgba(0, 255, 0, 1)",500,3e3),this._CircleDiffusion.add([123.45362700404472,41.81860631952072,0],"rgba(0, 255, 0, 1)",500,3e3),this.viewer.camera.flyTo({destination:e.Cartesian3.fromDegrees(123.46787863792646,41.83241486807863,1e4),orientation:{heading:e.Math.toRadians(0),pitch:e.Math.toRadians(-90),roll:0},duration:3})}}},c=s,u=(t("cfd7"),t("cba8")),l=Object(u["a"])(c,a,r,!1,null,"0003b7dc",null);n["default"]=l.exports},c78a:function(e,n,t){"use strict";var a=t("4bb1"),r=t("e143"),i=(t("eb3b"),t("b1f6"),function(){function e(n,t){Object(a["a"])(this,e),this.Cesium=n,this.viewer=t,this.lastStageList=[]}return Object(r["a"])(e,[{key:"add",value:function(e,n,t,a){this.lastStageList.push(this.showCircleScan(e,n,t,a))}},{key:"clear",value:function(){var e=this;this.lastStageList.forEach((function(n){e.clearScanEffects(n)})),this.lastStageList=[]}},{key:"showCircleScan",value:function(e,n,t,a){var r=this.Cesium,i=new r.Cartographic(r.Math.toRadians(e[0]),r.Math.toRadians(e[1]),e[2]);n=new r.Color.fromCssColorString(n);var o=this._addCircleScanPostStage(i,t,n,a);return o}},{key:"_addCircleScanPostStage",value:function(e,n,t,a){var r=this.Cesium,i=r.Cartographic.toCartesian(e),o=new r.Cartesian4(i.x,i.y,i.z,1),s=new r.Cartographic(e.longitude,e.latitude,e.height+500),c=r.Cartographic.toCartesian(s),u=new r.Cartesian4(c.x,c.y,c.z,1),l=(new Date).getTime(),v=new r.Cartesian4,f=new r.Cartesian4,d=new r.Cartesian3,m=this,h=new r.PostProcessStage({fragmentShader:m._getScanSegmentShader(),uniforms:{u_scanCenterEC:function(){var e=r.Matrix4.multiplyByVector(m.viewer.camera._viewMatrix,o,v);return e},u_scanPlaneNormalEC:function(){var e=r.Matrix4.multiplyByVector(m.viewer.camera._viewMatrix,o,v),n=r.Matrix4.multiplyByVector(m.viewer.camera._viewMatrix,u,f);return d.x=n.x-e.x,d.y=n.y-e.y,d.z=n.z-e.z,r.Cartesian3.normalize(d,d),d},u_radius:function(){return n*(((new Date).getTime()-l)%a)/a},u_scanColor:t}});return this.viewer.scene.postProcessStages.add(h),h}},{key:"_getScanSegmentShader",value:function(){var e=18,n=" uniform sampler2D colorTexture;\n        uniform sampler2D depthTexture;\n        varying vec2 v_textureCoordinates;\n        uniform vec4 u_scanCenterEC;\n        uniform vec3 u_scanPlaneNormalEC;\n        uniform float u_radius;\n        uniform vec4 u_scanColor;\n        vec4 toEye(in vec2 uv, in float depth){\n          vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\n          vec4 posInCamera = czm_inverseProjection * vec4(xy, depth, 1.0);\n          posInCamera =posInCamera / posInCamera.w;\n          return posInCamera;\n        }\n        vec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point){\n            vec3 v01 = point - planeOrigin;\n            float d = dot(planeNormal, v01) ;\n            return (point - planeNormal * d);\n        }\n        float getDepth(in vec4 depth){\n            float z_window = czm_unpackDepth(depth);\n            z_window = czm_reverseLogDepth(z_window);\n            float n_range = czm_depthRange.near;\n            float f_range = czm_depthRange.far;\n            return (2.0 * z_window - n_range - f_range) / (f_range - n_range);\n        }\n        void main(){\n            gl_FragColor = texture2D(colorTexture, v_textureCoordinates);\n            float depth = getDepth(texture2D(depthTexture, v_textureCoordinates));\n            vec4 viewPos = toEye(v_textureCoordinates, depth);\n            vec3 prjOnPlane = pointProjectOnPlane(u_scanPlaneNormalEC.xyz, u_scanCenterEC.xyz, viewPos.xyz);\n            float dis = length(prjOnPlane.xyz - u_scanCenterEC.xyz);\n            if(dis < u_radius){\n              float f = 1.0 - abs(u_radius - dis) / u_radius;\n              f = pow(f, float("+e+"));\n              gl_FragColor = mix(gl_FragColor,u_scanColor,f);\n            }\n            gl_FragColor.a = gl_FragColor.a / 2.0;\n        }\n      ";return n}},{key:"clearScanEffects",value:function(e){this.viewer.scene.postProcessStages.remove(e)}}]),e}());n["a"]=i},cfd7:function(e,n,t){"use strict";t("73bc")},e143:function(e,n,t){"use strict";function a(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function r(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}t.d(n,"a",(function(){return r}))}}]);