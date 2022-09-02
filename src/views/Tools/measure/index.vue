<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <panel-view @measure="measure" />
  </div>
</template>
 
<script>
import panelView from "./module/panel.vue";
export default {
  components: {
    panelView
  },
  data() {
    return {
      viewer: null,
      handler: null,
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
    },
    /**
     * 测量
     * @param {*} type 
     */
    measure(type) { }
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