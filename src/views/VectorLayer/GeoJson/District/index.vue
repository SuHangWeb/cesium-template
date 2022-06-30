<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
// https://blog.csdn.net/qq_32341603/article/details/117707277
export default {
  name: "District",
  data() {
    return {
      viewer: null,
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
        imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
          url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=1a7ec240fc2783062616cc53caac5514",
          layer: "tdtBasicLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible",
          maximumLevel: 18,
          show: false,
        }),
        terrainProvider: new Cesium.CesiumTerrainProvider({
          //加载火星在线地形
          url: "http://data.marsgis.cn/terrain",
        }),
        shouldAnimate: true,
        infoBox: false,
        selectionIndicator: false,
      });
      //设置贴地效果
      this.viewer.scene.globe.depthTestAgainstTerrain = false;
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
        // console.log(entities);
        for (let i = 0; i < entities.length; i++) {
          let entity = entities[i];
          //将随机产生的颜色赋予多边形
          //对南山和宝安进行特殊处理，让多个区块颜色保持一致
          if (entity._name == "宝安区") {
            entity.polygon.material = Cesium.Color.ORANGE.withAlpha(0.5);
          } else if (entity._name == "南山区") {
            entity.polygon.material = Cesium.Color.RED.withAlpha(0.5);
          } else {
            entity.polygon.material = Cesium.Color.fromRandom({ alpha: 0.5 });
          }
          let polyCenter = Cesium.Cartesian3.fromDegrees(
            entity._properties.centroid._value[0],
            entity._properties.centroid._value[1],
            100
          );
          this.viewer.entities.add({
            position: polyCenter,
            label: {
              font: "25px 楷体",
              text: entity._name,
              showBackground: false,
              scale: 0.8,
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                0.0,
                2000000.0
              ),
            },
          });
        }
        this.viewer.flyTo(this.entitiesArr, {
          duration: 3,
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