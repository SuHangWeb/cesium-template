<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import HaloLine from "./HaloLine";
import code from "./module/highlight";
export default {
  name: "HaloLine",
  data() {
    return {
      viewer: null,
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
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
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
      const _HaloLine = new HaloLine(
        Cesium,
        this.viewer,
        "/file/HaloLine/geojson/wuhan-line1.json",
        "#ffa500"
      );
      _HaloLine.init();
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