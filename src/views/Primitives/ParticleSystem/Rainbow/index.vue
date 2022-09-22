<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import Rainbow from "@/common/cesium/Scene/Rainbow"
export default {
  data() {
    return {
      viewer: null,
      _Rainbow: null
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
        terrainProvider: new Cesium.CesiumTerrainProvider({
          //加载火星在线地形
          url: "http://data.marsgis.cn/terrain",
        }),
        shouldAnimate: true,
        infoBox: false,
        selectionIndicator: false,
      });
      this._Rainbow = new Rainbow(Cesium, this.viewer)
      //深度监听
      this.viewer.scene.globe.depthTestAgainstTerrain = false;
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;

      this.viewer.camera.setView({
        destination: new Cesium.Cartesian3(-2402869.5473937024, 5500792.323090967, 2301364.3012694074),
        orientation: {
          heading: 0.1307560686539233,
          pitch: -0.2370424491699914,
          roll: 6.283172143952305,
        },
      });
      this._Rainbow.create([113.3698, 22.6139], [114.2135, 22.6127])
      // this.viewer.flyTo();
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