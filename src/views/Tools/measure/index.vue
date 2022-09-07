<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <panel-view @measure="measure" />
  </div>
</template>
 
<script>
import panelView from "./module/panel.vue";
// import Distance from "@/common/cesium/Measure/distance"
import Measure from "@/common/cesium/Measure"
export default {
  components: {
    panelView
  },
  data() {
    return {
      viewer: null,
      handler: null,
      _Distance :null
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
        animation: false,
        timeline: false,
        shouldAnimate: true,
        infoBox: false,
        selectionIndicator: false,
      });
      // 开启深度检测
      // this.viewer.scene.globe.depthTestAgainstTerrain = true;
      //去掉双击事件
      this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );


      this._Measure = new Measure(Cesium,this.viewer)

      //相机
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
    /**
     * 测量
     * @param {*} type 
     */
    measure(type) {
      if(type == "distance"){
        this._Measure.createDistance()
      }
     }
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