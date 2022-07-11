<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
// https://blog.csdn.net/qq_32341603/article/details/117707277
//https://www.giserdqy.com/gis/opengis/3d/cesium/junior/7446/ 渐变  http://qa.supermap.com/95360
// https://www.freesion.com/article/4713678917/ 着色器
import Entity from "@/common/cesium/Entity.js";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "District",
  data() {
    return {
      viewer: null,
      _Entity: null,
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
      this.start();
    },
    /**
     * 纹理图绘制
     */
    getColorRamp(elevationRamp) {
      var ramp = document.createElement("canvas");
      ramp.width = 400;
      ramp.height = 400;
      var ctx = ramp.getContext("2d");
      // var values = elevationRamp;
      // var grd = ctx.createLinearGradient(0, 0, 0, 100);
      // grd.addColorStop(values[0], "#000000"); //black
      // grd.addColorStop(values[1], "#2747E0"); //blue
      // grd.addColorStop(values[2], "#D33B7D"); //pink
      // grd.addColorStop(values[3], "#D33038"); //red
      // grd.addColorStop(values[4], "#FF9742"); //orange
      // grd.addColorStop(values[5], "#ffd700"); //yellow
      // grd.addColorStop(values[6], "#ffffff"); //white

      var grad = ctx.createRadialGradient(200, 200, 50, 200, 200, 200); //创建一个渐变色线性对象
      grad.addColorStop(0, "yellow"); //定义渐变色颜色
      grad.addColorStop(1, "green");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 400, 400);
      return ramp;
    },
    /**
     * 开始
     */
    start() {
      console.log(this.getColorRamp())
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
          entity.polygon.extrudedHeight = 10000;
          entity.polygon.outline = false;

          //将随机产生的颜色赋予多边形
          //对南山和宝安进行特殊处理，让多个区块颜色保持一致
          if (entity.name == "宝安区") {
            entity.polygon.material = Cesium.Color.ORANGE.withAlpha(0.8);
          } else if (entity.name == "南山区") {
            entity.polygon.material = Cesium.Color.RED.withAlpha(0.8);
          } else {
            entity.polygon.material = Cesium.Color.fromRandom({ alpha: 0.8 });
            // entity.polygon.material = this.getColorRamp();
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
};
</script>
  
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  #cesiumContainer {
    width: 100%;
    height: 100%;
  }
}
</style>