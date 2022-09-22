<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import Entity from "@/common/cesium/Entity.js";
export default {
  data() {
    return {
      viewer: null,
      _Entity: null
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
      this._Entity = new Entity(Cesium, this.viewer);
      //深度监听
      this.viewer.scene.globe.depthTestAgainstTerrain = false;
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;
      var position = Cesium.Cartesian3.fromDegrees(119.9015668093, 31.4943207228, 0);
      // 创建模型 start
      const createModel = this._Entity.createModel({
        position,
        uri:
          process.env.VUE_APP_PUBLIC_URL +
          "/Vue/Entity/dynamicPosition/qiche.gltf",
        maximumScale: 100,
        minimumPixelSize: 30,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      });
      this.viewer.flyTo(createModel);
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