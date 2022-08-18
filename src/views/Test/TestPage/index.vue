<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
export default {
  name: "TextPage",
  data() {
    return {
      viewer: null,
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
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        }),
        // terrainProvider: new Cesium.CesiumTerrainProvider({
        //   //加载火星在线地形
        //   url: "http://data.marsgis.cn/terrain",
        // }),
        shouldAnimate: true,
        infoBox: false,
        selectionIndicator: false,
      });
      //设置贴地效果
      this.viewer.scene.globe.depthTestAgainstTerrain = false;
      this.start();
    },
    start() {
      const Cesium = this.cesium;
      const viewer = this.viewer;
      var tileset = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        // url: process.env.VUE_APP_PUBLIC_URL + "/Vue/Models/b3dm/aomen-building/tileset.json", //数据地址
        
        url: '//data.mars3d.cn/3dtiles/jzw-hefei/tileset.json',
        maximumScreenSpaceError: 2,  //最大的屏幕空间误差
        maximumNumberOfLoadedTiles: 1000, //最大加载瓦片个数
        // modelMatrix: m,//形状矩阵
      }));
      this.viewer.flyTo(tileset);
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