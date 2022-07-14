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
        label: "Material/color.js",
        url: "cesium/Materials/color.js"
      },
      {
        label: "MaterialColor.js",
        url: "Vue/VectorLayer/GeoJson/District/color.js"
      },
      {
        label: "anhui.json",
        url: "Vue/VectorLayer/GeoJson/District/anhui.json"
      }
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
                  import Material from "@/common/cesium/Materials/color.js";
                  import MaterialColor from "./module/material/color";
                  export default {
                    name: "District",
                    data() {
                      return {
                        viewer: null,
                        _Entity: null,
                        _Material: null,
                        entitiesArr: [],
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
                          imageryProvider: new Cesium.UrlTemplateImageryProvider({
                            url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                          }),
                          terrainProvider: new Cesium.CesiumTerrainProvider({
                            url: "http://data.marsgis.cn/terrain",
                          }),
                          shouldAnimate: true,
                          infoBox: false,
                          selectionIndicator: false,
                        });
                        // 相对于地形表面绘制
                        // this.viewer.scene.globe.depthTestAgainstTerrain = true;
                        // 始终在顶部绘制（默认）
                        this.viewer.scene.globe.depthTestAgainstTerrain = false;
                        this.viewer.animation.container.style.visibility = "hidden"; // 不显示动画控件
                        //是否开启抗锯齿
                        this.viewer.scene.fxaa = true;
                        this.viewer.scene.postProcessStages.fxaa.enabled = true;
                        this._Entity = new Entity(Cesium, this.viewer);
                        this._Material = new Material(Cesium, this.viewer);
                        this.start();
                      },
                      /**
                       * 开始
                       */
                      start() {
                        const Cesium = this.cesium;
                        const JsonUrl =
                          process.env.VUE_APP_PUBLIC_URL +
                          "/Vue/VectorLayer/GeoJson/District/anhui.json";
                        Cesium.GeoJsonDataSource.load(JsonUrl, {
                          stroke: Cesium.Color.WHITE, //设置多边形轮廓的默认颜色
                          strokeWidth: 20, //轮廓的宽度
                          clamToGround: true, //让地图贴地
                        }).then((dataSource) => {
                          this.viewer.dataSources.add(dataSource);
                          let entities = dataSource.entities.values;
                          this.entitiesArr = entities;
                  
                          for (let i = 0; i < entities.length; i++) {
                            let entity = entities[i];
                            entity.polygon.height = 0;
                            entity.polygon.extrudedHeight = 5000;
                            entity.polygon.outline = false;
                  
                            this._Material.create(MaterialColor(Cesium));
                  
                            //将随机产生的颜色赋予多边形
                            //对南山和宝安进行特殊处理，让多个区块颜色保持一致
                            if (entity.name == "宝安区") {
                              entity.polygon.material = Cesium.Color.ORANGE.withAlpha(0.8);
                            } else if (entity.name == "南山区") {
                              entity.polygon.material = Cesium.Color.RED.withAlpha(0.8);
                            } else {
                              entity.polygon.material = new Cesium.Material_color(
                                Cesium.Color.fromRandom({ alpha: 0.8 })
                              );
                            }
                  
                            //添加标签
                            let polyCenter = Cesium.Cartesian3.fromDegrees(
                              entity._properties.centroid._value[0],
                              entity._properties.centroid._value[1],
                              100
                            );
                            this._Entity.createLabel({
                              id: uuidv4(),
                              position: polyCenter,
                              font: "25px 楷体",
                              text: entity.name,
                              showBackground: false,
                              scale: 0.8,
                              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                                0.0,
                                2000000.0
                              ),
                            });
                          }
                          this.$nextTick(() => {
                            this.viewer.flyTo(this.entitiesArr);
                          });
                        });
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
        label: "Material/color.js",
        url: "JavaScript/cesium/Materials/color.js"
      },
      {
        label: "anhui.json",
        url: "JavaScript/VectorLayer/GeoJson/District/anhui.json"
      }
    ],
    code: [
      {
        codeLanguage: "js",
        content: `function districtGradient() {
                      const _Entity = new Entity(Cesium, viewer);
                      const _Material = new colorMaterial(Cesium, viewer);
                      /**
                       * 创建着色器及参数
                       * @param {*} color 
                       * @returns 
                       */
                      const MaterialColor = (color = "") => {
                          let source = 'uniform vec4 color;\n uniform float diffusePower;\n uniform float alphaPower;\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nvec2 st = materialInput.st;\nfloat alpha = distance(st,vec2(0.5, 0.5));\nmaterial.alpha = color.a  * alpha  * alphaPower;\material.diffuse = color.rgb * diffusePower;\return material;\n}'                 
                          return {
                              cesiumName: "Material_color",
                              color: color || Cesium.Color.fromRandom({ alpha: 0.8 }),
                              uniforms: {
                                  color: color || Cesium.Color.fromRandom({ alpha: 0.8 }),
                                  diffusePower: 1.6,
                                  alphaPower: 1.5,
                              },
                              source,
                          }
                      }
                  
                      Cesium.GeoJsonDataSource.load("/test/VectorLayer/GeoJson/District/anhui.json", {
                          stroke: Cesium.Color.WHITE, //设置多边形轮廓的默认颜色
                          strokeWidth: 20, //轮廓的宽度
                          clamToGround: true, //让地图贴地
                      }).then((dataSource) => {
                          viewer.dataSources.add(dataSource);
                          let entities = dataSource.entities.values;
                  
                          for (let i = 0; i < entities.length; i++) {
                              let entity = entities[i];
                              entity.polygon.height = 0;
                              entity.polygon.extrudedHeight = 5000;
                              entity.polygon.outline = false;
                  
                              _Material.create(MaterialColor());
                  
                              //将随机产生的颜色赋予多边形
                              //对南山和宝安进行特殊处理，让多个区块颜色保持一致
                              if (entity.name == "宝安区") {
                                  entity.polygon.material = Cesium.Color.ORANGE.withAlpha(0.8);
                              } else if (entity.name == "南山区") {
                                  entity.polygon.material = Cesium.Color.RED.withAlpha(0.8);
                              } else {
                                  entity.polygon.material = new Cesium.Material_color(
                                      Cesium.Color.fromRandom({ alpha: 0.8 })
                                  );
                              }
                  
                              //添加标签
                              let polyCenter = Cesium.Cartesian3.fromDegrees(
                                  entity._properties.centroid._value[0],
                                  entity._properties.centroid._value[1],
                                  100
                              );
                              _Entity.createLabel({
                                  id: uuid4(),
                                  position: polyCenter,
                                  font: "25px 楷体",
                                  text: entity.name,
                                  showBackground: false,
                                  scale: 0.8,
                                  horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                                      0.0,
                                      2000000.0
                                  ),
                              });
                          }
                          setTimeout(() => { viewer.flyTo(entities); }, 0)
                      });
                  }`
      }
    ]
  }
]