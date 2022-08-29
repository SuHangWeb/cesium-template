<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <panel-view @draws="draws" />
  </div>
</template>
 
<script>
import panelView from "./module/panel.vue"
import Rain from "@/common/cesium/Draw/Rain"
export default {
  components: {
    panelView
  },
  data() {
    return {
      viewer: null,
      _Rain: null
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
        timeline: false
      });
      this._Rain = new Rain(Cesium, this.viewer)
    },
    /**
     * 绘制
     * @param {*} name 
     */
    draws(name) {
      //雨
      if (name == "Rain") {
        this._Rain.createRain()
        return
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