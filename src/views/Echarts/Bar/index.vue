<template>
  <div class="container" id="echarts">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import Entity from "@/common/cesium/Entity.js";
import Echarts3D from "@/common/cesium/Echarts.js";
import echartsData from "./module/data";
export default {
  name: "echartsBar",
  data() {
    return {
      viewer: null,
      _Entity: null,
      _Echarts3D: null,
      echartsData: echartsData,
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
      //设置贴地效果
      this.viewer.scene.globe.depthTestAgainstTerrain = false;
      this._Entity = new Entity(Cesium, this.viewer);
      this._Echarts3D = new Echarts3D(Cesium, this.viewer);
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;
      this._Echarts3D.createBar({
        data: this.echartsData,
        tooltip: true,
        nodeId: "echarts",
        radius: 50,
      });

      //相机(定位到了 沈河区惠工广场)
      this.viewer.camera.flyTo({
        //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
        destination: Cesium.Cartesian3.fromDegrees(
          123.43382736814452,
          41.811201240193164,
          5000
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