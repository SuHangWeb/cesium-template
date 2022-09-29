<template>
  <div class="container" id="echarts">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import CircleScan from "@/common/cesium/effects/CircleScan.js";
import CircleDiffusion from "@/common/cesium/effects/CircleDiffusion.js";
import CircleWave from "@/common/cesium/effects/CircleWave.js";
import HexagonSpread from "@/common/cesium/effects/HexagonSpread.js";
export default {
  data() {
    return {
      viewer: null,
      _CircleScan: null,
      _CircleDiffusion: null,
      _CircleWave: null,
      _HexagonSpread: null
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
      this._CircleScan = new CircleScan(Cesium, this.viewer)
      this._CircleDiffusion = new CircleDiffusion(Cesium, this.viewer)
      this._CircleWave = new CircleWave(Cesium, this.viewer)
      this._HexagonSpread = new HexagonSpread(Cesium, this.viewer)
      //设置贴地效果
      this.viewer.scene.globe.depthTestAgainstTerrain = true;
      this.start();
    },
    start() {
      const Cesium = this.cesium;
      this._CircleScan.add([123.46787863792646, 41.83241486807863, 0], '#f5222d', 500, 3000)
      this._CircleDiffusion.add([123.45362700404472, 41.81860631952072, 0], '#1890ff', 500, 3000)
      this._CircleWave.add([123.4227202687658, 41.817036701780346, 0], 'rgba(0, 255, 0, 1)', 500, 3000)
      this._HexagonSpread.add([123.41743639592823,41.83039278462179, 0], '#722ed1', 500, 3000)


      //相机
      this.viewer.camera.flyTo({
        //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
        destination: Cesium.Cartesian3.fromDegrees(
          123.46787863792646, 41.83241486807863, 10000
        ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)
        orientation: {
          heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向
          pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
          roll: 0.0, // default value
        },
        duration: 3, //3秒到达战场
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