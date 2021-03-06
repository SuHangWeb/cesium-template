export default [
  {
    codeLanguage: "VUE",
    relyOn: [
      {
        label: "uuid（npm）",
        url: "https://www.npmjs.com/package/uuid",
        externalLinks: true
      },
      {
        label: "Entity.js",
        url: "cesium/Entity.js"
      },
      {
        label: "Material.js",
        url: "cesium/Materials/index.js"
      },
      {
        label: "PolylineVolume.js",
        url: "cesium/EntityUtils/PolylineVolume.js"
      },
      {
        label: "flow.js",
        url: "Vue/Entity/polylineVolume/flow.js"
      },
      {
        label: "flow-line3.png",
        url: "Vue/Entity/polylineVolume/flow-line3.png"
      },
    ],
    code: [
      {
        codeLanguage: "html",
        content: `<template>
                      <div class="container">
                        <div id="cesiumContainer"></div>
                      </div>
                    </template>`
      },
      {
        codeLanguage: "js",
        content: `import Entity from "@/common/cesium/Entity.js";
                    import { v4 as uuidv4 } from "uuid";
                    import Material from "@/common/cesium/Materials/index.js";
                    import PolylineVolume from "@/common/cesium/EntityUtils/PolylineVolume"
                    import material_polylineVolume_flow from "./module/material/flow";
                    export default {
                      data() {
                        return {
                          viewer: null,
                          _Entity: null,
                          _Material: null,
                          _PolylineVolume: null,
                          positions1: [
                            123.43371186710091, 41.81115948321154, 0, 123.43079986055396,
                            41.808903787007004, 0, 123.42367362339716, 41.80900573889269, 0,
                          ],
                          positions2: [
                            123.4327182112119, 41.812953683405226, 0, 123.4288125263957,
                            41.81123617998219, 0, 123.4232276943245, 41.81174834479025, 0,
                          ],
                          positions3: [
                            123.43169021038872, 41.81497857173556, 0, 123.42709904225134,
                            41.8140555836194, 0, 123.42271311560773, 41.81464474650719, 0,
                          ],
                          positions4: [
                            123.42789261245287, 41.82051143038075, 0, 123.4164759118099,
                            41.820510612023114, 0,
                          ],
                          positions5: [
                            123.43070199312513, 41.81703908368588, 0,
                            123.4051747588459, 41.81622044764279, 0,
                            123.38493312851678, 41.81643212219792, 0
                          ],
                          positions6: [
                            123.43535570637746, 41.820275683959025, 0, 123.44053746255399, 41.822321387648586, 0, 123.44879030603606, 41.82314643874702, 0
                          ],
                          positions7: [
                            123.43673883218169, 41.81511974663461, 0, 123.43980749191105,
                            41.814743307305456, 0,
                          ],
                          positions8: [
                            123.44247395262316, 41.81323100140572, 0, 123.44166813844917, 41.817612126910596, 0, 123.44849194333796, 41.81749127684859, 0
                          ],
                        };
                      },
                      mounted() {
                        this.init();
                      },
                      methods: {
                        init() {
                          const Cesium = this.cesium;
                          Cesium.Ion.defaultAccessToken = process.env.VUE_APP_TOKEN;
                          this.viewer = new Cesium.Viewer("cesiumContainer", {
                            infoBox: false,
                            selectionIndicator: false,
                            navigation: false,
                            animation: false,
                            timeline: false,
                            baseLayerPicker: false,
                            geocoder: false,
                            homeButton: false,
                            sceneModePicker: false,
                            navigationHelpButton: false,
                            shouldAnimate: false,
                            imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                              url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
                            }),
                          });
                          //是否开启抗锯齿
                          this.viewer.scene.fxaa = true;
                          this.viewer.scene.postProcessStages.fxaa.enabled = true;
                          this._Entity = new Entity(Cesium, this.viewer);
                          this._Material = new Material(Cesium, this.viewer);
                          this._PolylineVolume = new PolylineVolume(Cesium, this.viewer);
                          this.start();
                        },
                        /**
                         * 开始
                         */
                        start() {
                          const Cesium = this.cesium;
                          let EntityArr = [];
                    
                          //透明管道 Start
                          const _EntityData_1 = this._Entity.createPolylineVolume({
                            id: uuidv4(),
                            positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions1),
                            shape: this._PolylineVolume.circleShape(40),
                            cornerType: Cesium.CornerType.ROUNDED, //拐角的样式
                            material: Cesium.Color.DEEPSKYBLUE.withAlpha(0.5),
                            shadows: Cesium.ShadowMode.DISABLED,
                          });
                          EntityArr.push(_EntityData_1);
                          //透明管道 End
                    
                          //方形管道 Start
                          const _EntityData_2 = this._Entity.createPolylineVolume({
                            id: uuidv4(),
                            positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions2),
                            shape: this._PolylineVolume.circleRectangle(35),
                            cornerType: Cesium.CornerType.BEVELED, //拐角的样式
                            material: Cesium.Color.AQUA.withAlpha(0.5),
                            shadows: Cesium.ShadowMode.DISABLED,
                            outline: true,
                            outlineColor: Cesium.Color.BLACK,
                          });
                          EntityArr.push(_EntityData_2);
                          //方形管道 End
                    
                          //星形管道 Start
                          const _EntityData_3 = this._Entity.createPolylineVolume({
                            id: uuidv4(),
                            positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions3),
                            shape: this._PolylineVolume.circleStar(50, 35, 8),
                            cornerType: Cesium.CornerType.MITERED,
                            material: Cesium.Color.AQUAMARINE,
                            shadows: Cesium.ShadowMode.DISABLED,
                          });
                          EntityArr.push(_EntityData_3);
                          //星形管道 End
                    
                          //三角形 Start
                          const _EntityData_4 = this._Entity.createPolylineVolume({
                            id: uuidv4(),
                            positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions4),
                            shape: this._PolylineVolume.circleTriangle(50),
                            cornerType: Cesium.CornerType.MITERED,
                            material: Cesium.Color.BLUEVIOLET.withAlpha(0.5),
                          });
                          EntityArr.push(_EntityData_4);
                          //三角形 End
                    
                          //流动管道 Start
                          this._Material.create(material_polylineVolume_flow(Cesium));
                          let material = new Cesium.material_polylineVolume_flow();
                          const _EntityData_5 = this._Entity.createPolylineVolume({
                            id: uuidv4(),
                            positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions5),
                            shape: this._PolylineVolume.circleShape(40),
                            cornerType: Cesium.CornerType.ROUNDED, //拐角的样式
                            material,
                            shadows: Cesium.ShadowMode.DISABLED,
                          });
                          EntityArr.push(_EntityData_5);
                          //流动管道 End
                    
                          //五角 Start
                          const _EntityData_6 = this._Entity.createPolylineVolume({
                            id: uuidv4(),
                            positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions6),
                            shape: this._PolylineVolume.circlePentagonal(35),
                            material: Cesium.Color.CORAL,
                            fill: true,
                            outline: true,
                            outlineColor: Cesium.Color.YELLOW,
                            outlineWidth: 10
                          });
                          EntityArr.push(_EntityData_6);
                          //五角 End
                    
                          //空心管道 Start
                          const _EntityData_7 = this._Entity.createPolylineVolume({
                            id: uuidv4(),
                            positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions7),
                            shape: this._PolylineVolume.circleShape(50, 5, 30),
                            cornerType: Cesium.CornerType.ROUNDED,
                            material: Cesium.Color.RED,
                            shadows: Cesium.ShadowMode.DISABLED,
                          });
                          EntityArr.push(_EntityData_7);
                    
                          const _EntityData_8 = this._Entity.createPolylineVolume({
                            id: uuidv4(),
                            positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions8),
                            shape: this._PolylineVolume.circleShape(50, 5, 30),
                            cornerType: Cesium.CornerType.ROUNDED,
                            material: Cesium.Color.BROWN.withAlpha(0.5),
                            shadows: Cesium.ShadowMode.DISABLED,
                          });
                          EntityArr.push(_EntityData_8);
                          //空心管道 End
                    
                          this.viewer.flyTo(EntityArr);
                        },
                      },
                    };`
      },
      {
        codeLanguage: "css",
        content: `.container {
                      width: 100%;
                      height: 100%;
                    
                      #cesiumContainer {
                        width: 100%;
                        height: 100%;
                      }
                    }`
      }
    ]
  },
  {
    codeLanguage: "JS",
    relyOn: [
      {
        label: "uuid.min.js",
        url: "JavaScript/cesium/Tripartite/uuid-js/uuid.min.js"
      },
      {
        label: "Entity.js",
        url: "JavaScript/cesium/Entity.js"
      },
      {
        label: "Material.js",
        url: "JavaScript/cesium/Materials/index.js"
      },
      {
        label: "PolylineVolume.js",
        url: "JavaScript/cesium/EntityUtils/PolylineVolume.js"
      },
      {
        label: "flow-line3.png",
        url: "JavaScript/Entity/polylineVolume/flow-line3.png"
      },
    ],
    code: [
      {
        codeLanguage: "js",
        content: `function polylineVolumeMultiple() {
                      const _Entity = new Entity(Cesium, viewer);
                      const _Material = new Material(Cesium, viewer);
                      const _PolylineVolume = new PolylineVolume(Cesium, viewer);
                      const positions = {
                          positions1: [
                              123.43371186710091, 41.81115948321154, 0, 123.43079986055396,
                              41.808903787007004, 0, 123.42367362339716, 41.80900573889269, 0,
                          ],
                          positions2: [
                              123.4327182112119, 41.812953683405226, 0, 123.4288125263957,
                              41.81123617998219, 0, 123.4232276943245, 41.81174834479025, 0,
                          ],
                          positions3: [
                              123.43169021038872, 41.81497857173556, 0, 123.42709904225134,
                              41.8140555836194, 0, 123.42271311560773, 41.81464474650719, 0,
                          ],
                          positions4: [
                              123.42789261245287, 41.82051143038075, 0, 123.4164759118099,
                              41.820510612023114, 0,
                          ],
                          positions5: [
                              123.43070199312513, 41.81703908368588, 0,
                              123.4051747588459, 41.81622044764279, 0,
                              123.38493312851678, 41.81643212219792, 0
                          ],
                          positions6: [
                              123.43535570637746, 41.820275683959025, 0, 123.44053746255399, 41.822321387648586, 0, 123.44879030603606, 41.82314643874702, 0
                          ],
                          positions7: [
                              123.43673883218169, 41.81511974663461, 0, 123.43980749191105,
                              41.814743307305456, 0,
                          ],
                          positions8: [
                              123.44247395262316, 41.81323100140572, 0, 123.44166813844917, 41.817612126910596, 0, 123.44849194333796, 41.81749127684859, 0
                          ],
                      }
                      let EntityArr = [];
                      //透明管道 Start
                      const _EntityData_1 = _Entity.createPolylineVolume({
                          id: uuid4(),
                          positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions.positions1),
                          shape: _PolylineVolume.circleShape(40),
                          cornerType: Cesium.CornerType.ROUNDED, //拐角的样式
                          material: Cesium.Color.DEEPSKYBLUE.withAlpha(0.5),
                          shadows: Cesium.ShadowMode.DISABLED,
                      });
                      EntityArr.push(_EntityData_1);
                      //透明管道 End
                  
                      //方形管道 Start
                      const _EntityData_2 = _Entity.createPolylineVolume({
                          id: uuid4(),
                          positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions.positions2),
                          shape: _PolylineVolume.circleRectangle(35),
                          cornerType: Cesium.CornerType.BEVELED, //拐角的样式
                          material: Cesium.Color.AQUA.withAlpha(0.5),
                          shadows: Cesium.ShadowMode.DISABLED,
                          outline: true,
                          outlineColor: Cesium.Color.BLACK,
                      });
                      EntityArr.push(_EntityData_2);
                      //方形管道 End
                  
                      //星形管道 Start
                      const _EntityData_3 = _Entity.createPolylineVolume({
                          id: uuid4(),
                          positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions.positions3),
                          shape: _PolylineVolume.circleStar(50, 35, 8),
                          cornerType: Cesium.CornerType.MITERED,
                          material: Cesium.Color.AQUAMARINE,
                          shadows: Cesium.ShadowMode.DISABLED,
                      });
                      EntityArr.push(_EntityData_3);
                      //星形管道 End
                  
                      //三角形 Start
                      const _EntityData_4 = _Entity.createPolylineVolume({
                          id: uuid4(),
                          positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions.positions4),
                          shape: _PolylineVolume.circleTriangle(50),
                          cornerType: Cesium.CornerType.MITERED,
                          material: Cesium.Color.BLUEVIOLET.withAlpha(0.5),
                      });
                      EntityArr.push(_EntityData_4);
                      //三角形 End
                  
                      //流动管道 Start
                      function material_polylineVolume_flow() {
                          return {
                              cesiumName: "material_polylineVolume_flow",
                              image: "/test/Entity/polylineVolume/flow-line3.png",
                              // image: process.env.VUE_APP_PUBLIC_URL + "/Vue/Entity/polylineVolume/line3.png",
                              color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
                              duration: 2000,
                              uniforms: {
                                  color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
                                  image: Cesium.Material.DefaultImageId,
                                  // time: 0,
                                  constantSpeed: 500,
                                  depthFailMaterial: true,
                                  'repeat': new Cesium.Cartesian2(1, 1),//重复
                                  'axisY': ![],
                                  'speed': 10,
                                  'time': -1,
                                  'hasImage2': ![],
                              },
                              source: "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                              {\n\
                                  czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                  vec2 st = materialInput.st;\n\
                                  \n\
                                  if(texture2D(image, vec2(0.0, 0.0)).a == 1.0){\n\
                                      discard;\n\
                                  }else{\n\
                                      material.alpha = texture2D(image, vec2(1.0 - fract(time - st.s), st.t)).a * color.a;\n\
                                  }\n\
                                  \n\
                                  material.diffuse = max(color.rgb * material.alpha * 3.0, color.rgb);\n\
                                  \n\
                                  return material;\n\
                              }\n\
                              ",
                          }
                      }
                      _Material.create(material_polylineVolume_flow());
                      let material = new Cesium.material_polylineVolume_flow();
                      const _EntityData_5 = _Entity.createPolylineVolume({
                          id: uuid4(),
                          positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions.positions5),
                          shape: _PolylineVolume.circleShape(40),
                          cornerType: Cesium.CornerType.ROUNDED, //拐角的样式
                          material,
                          shadows: Cesium.ShadowMode.DISABLED,
                      });
                      EntityArr.push(_EntityData_5);
                      //流动管道 End
                  
                      //五角 Start
                      const _EntityData_6 = _Entity.createPolylineVolume({
                          id: uuid4(),
                          positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions.positions6),
                          shape: _PolylineVolume.circlePentagonal(35),
                          material: Cesium.Color.CORAL,
                          fill: true,
                          outline: true,
                          outlineColor: Cesium.Color.YELLOW,
                          outlineWidth: 10
                      });
                      EntityArr.push(_EntityData_6);
                      //五角 End
                  
                      //空心管道 Start
                      const _EntityData_7 = _Entity.createPolylineVolume({
                          id: uuid4(),
                          positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions.positions7),
                          shape: _PolylineVolume.circleShape(50, 5, 30),
                          cornerType: Cesium.CornerType.ROUNDED,
                          material: Cesium.Color.RED,
                          shadows: Cesium.ShadowMode.DISABLED,
                      });
                      EntityArr.push(_EntityData_7);
                  
                      const _EntityData_8 = _Entity.createPolylineVolume({
                          id: uuid4(),
                          positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions.positions8),
                          shape: _PolylineVolume.circleShape(50, 5, 30),
                          cornerType: Cesium.CornerType.ROUNDED,
                          material: Cesium.Color.BROWN.withAlpha(0.5),
                          shadows: Cesium.ShadowMode.DISABLED,
                      });
                      EntityArr.push(_EntityData_8);
                      //空心管道 End
                  
                      this.viewer.flyTo(EntityArr);
                  }`
      },
    ]
  },
]