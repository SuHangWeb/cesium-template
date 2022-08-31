<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import rightClickMenu from "./module/rightClickMenu"
export default {
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
        animation: false,
        timeline: false,
        shouldAnimate: true,
        infoBox: false,
        selectionIndicator: false,
      });
      const _rightClickMenu = new rightClickMenu(Cesium, this.viewer, [
        {
          label: "查看此处坐标",
          icon: "",
          method: ""
        },
        {
          label: "查看当前视角",
          icon: "",
          method: ""
        }
      ])
      _rightClickMenu.create()
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
    position: relative;
  }
}
</style>