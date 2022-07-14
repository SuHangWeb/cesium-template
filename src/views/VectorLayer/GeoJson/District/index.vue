<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
// https://blog.csdn.net/qq_32341603/article/details/117707277
//https://www.giserdqy.com/gis/opengis/3d/cesium/junior/7446/ 渐变  http://qa.supermap.com/95360
// https://www.freesion.com/article/4713678917/ 着色器
//https://blog.csdn.net/weixin_39150852/article/details/124126031?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-4-124126031-null-null.pc_agg_new_rank&utm_term=cesium%20%E9%9D%A2%E6%B8%90%E5%8F%98%E5%A1%AB%E5%85%85&spm=1000.2123.3001.4430
import Entity from "@/common/cesium/Entity.js";
import { v4 as uuidv4 } from "uuid";
import Material from "@/common/cesium/Materials/color.js";
import MaterialColor from "./module/material/color";
import code from "./module/highlight";
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
  created() {
    this.$store.dispatch("highlight/set_code", code);
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