<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <panel-view @draws="draws" @clears="clears" />
  </div>
</template>
 
<script>
import panelView from "./module/panel.vue"
import Rain from "@/common/cesium/Draw/Rain"
import Draw from "@/common/cesium/Draw"
export default {
  components: {
    panelView
  },
  data() {
    return {
      viewer: null,
      handler: null,
      _Rain: null,
      _Draw: null
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
      //去掉双击事件
      this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );

      this._Rain = new Rain(Cesium, this.viewer)
      this._Draw = new Draw(Cesium, this.viewer)
    },
    /**
     * 清楚
     */
    clears() {
      const Cesium = this.cesium;
      //移除地图鼠标点击事件
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN)
      //移除地图鼠标移动事件
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
      //移除地图鼠标抬起事件
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP)
      this.handler = null
      this.viewer.entities.removeAll();
    },
    /**
     * 绘制
     * @param {*} name 
     */
    draws(name) {
      const Cesium = this.cesium;
      const viewer = this.viewer;
      this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      //雨
      if (name == "Rain") {
        this._Rain.createRain()
        return
      }
      //点
      if (name == "Point") {
        //鼠标点击事件
        this.handler.setInputAction((event) => {
          //获取加载地形后对应的经纬度和高程：地标坐标
          var ray = viewer.camera.getPickRay(event.position);
          var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
          if (!Cesium.defined(cartesian)) {
            return;
          }
          const _Point = this._Draw.createPoint({
            position: cartesian,
          })
          console.log(`绘制点：=>`, _Point)
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
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