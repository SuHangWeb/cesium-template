<template>
  <div class="container" id="echarts">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import Entity from "@/common/cesium/Entity.js";
import Echarts3D from "@/common/cesium/Echarts.js";
import code from "./module/highlight";
export default {
  name: "echartsWaterPolo",
  data() {
    return {
      viewer: null,
      _Entity: null,
      _Echarts3D: null,
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
        // terrainProvider: new Cesium.CesiumTerrainProvider({
        //   //加载火星在线地形
        //   url: "http://data.marsgis.cn/terrain",
        // }),
        infoBox: false,
        shouldAnimate: true,
        vrButton: true,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: true,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
      });
      this._Entity = new Entity(Cesium, this.viewer);
      this._Echarts3D = new Echarts3D(Cesium, this.viewer);
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;
      const EntityModel = this._Entity.createModel({
        position: Cesium.Cartesian3.fromDegrees(
          123.64968897708842, 41.905545890053986,
          0
        ),
        uri: process.env.VUE_APP_PUBLIC_URL + "/glb/gongchang.glb",
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      })
      this._Echarts3D.createWaterPolo({
        nodeId: "echarts",
        size: 40,
        data: [
          {
            name: "惠工广场",
            position: [123.64753799005176, 41.90693164850206, 0],
            data: 50,
            // color: "red"
          },
          {
            name: "沈阳北站",
            position: [123.64968245766008, 41.90631359871417, 0],
            data: 10,
          },
          {
            name: "市府广场",
            position: [123.64917223733927, 41.90348119308158, 0],
            data: 80,
          },
        ],
      });
      this.viewer.flyTo(EntityModel);
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