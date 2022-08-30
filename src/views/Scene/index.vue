<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <panel-view @draws="draws" @clears="clears" />
  </div>
</template>
 
<script>
import panelView from "./module/panel.vue"
import Rain from "@/common/cesium/Scene/Rain"
import Snow from "@/common/cesium/Scene/Snow"
import Fog from "@/common/cesium/Scene/Fog"
import Skyline from "@/common/cesium/Scene/Skyline"
import Scene from "@/common/cesium/Scene"
export default {
  components: {
    panelView
  },
  data() {
    return {
      viewer: null,
      handler: null,
      _Rain: null,
      _Snow: null,
      _Fog: null,
      _Skyline: null,
      _Scene: null
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
      this._Snow = new Snow(Cesium, this.viewer)
      this._Fog = new Fog(Cesium, this.viewer)
      this._Skyline = new Skyline(Cesium, this.viewer)
      this._Scene = new Scene(Cesium, this.viewer)
    },
    /**
     * 清楚
     */
    clears() {
      const Cesium = this.cesium;
      if (this.handler) {
        //移除地图鼠标点击事件
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN)
        //移除地图鼠标移动事件
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
        //移除地图鼠标抬起事件
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP)
        this.handler.destroy();
        this.handler = null
      }
      this.viewer.entities.removeAll();

      this.viewer.scene.postProcessStages.removeAll()
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
        this._Rain.create()
        return
      }
      //雪
      if (name == "Snow") {
        this._Snow.create()
        return
      }
      //雾
      if (name == "Fog") {
        this._Fog.create()
        return
      }
      //雾（私有）
      if (name == "private-Fog") {
        this._Scene.fog()
        return
      }
      //太阳（私有）
      if (name == "private-Sun") {
        this._Scene.sun()
        return
      }
      //月亮（私有）
      if (name == "private-Moon") {
        this._Scene.moon()
        return
      }
      //黑白
      if (name == "colourless") {
        this._Scene.colourless()
        return
      }
      //高斯模糊
      if (name == "gaussianBlur") {
        this._Scene.gaussianBlur()
        return
      }
      //亮度
      if (name == "brightness") {
        this._Scene.brightness()
        return
      }
      //景深
      if (name == "depthOfField") {
        this._Scene.depthOfField()
        return
      }
      //耀斑
      if (name == "solarFlare") {
        this._Scene.solarFlare()
        return
      }
      //夜视
      if (name == "nightVision") {
        this._Scene.nightVision()
        return
      }
      //环境遮蔽
      if (name == "ambientOcclusion") {
        this._Scene.ambientOcclusion()
        return
      }
      //阴影
      if (name == "shadow") {
        this._Scene.shadow()
        return
      }
      //天际线
      if (name == "Skyline") {
        this._Skyline.create()
        return
      }
      //轮廓（描边）
      if (name == "Stroke") {
        this._Scene.Stroke()
        return
      }
      //泛光
      if (name == "Bloom") {
        this._Scene.Bloom()
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