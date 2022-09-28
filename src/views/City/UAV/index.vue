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
        // 默认设置
        baseLayerPicker: false, // 基础影响图层选择器
        navigationHelpButton: false, // 导航帮助按钮
        animation: false, // 动画控件
        timeline: false, // 时间控件
        shadows: false, // 显示阴影
        shouldAnimate: true, // 模型动画效果 大气
        // skyBox: false as unknown as Cesium.SkyBox, // 天空盒
        skyBox: false,
        infoBox: false, // 显示 信息框
        fullscreenButton: false, // 是否显示全屏按钮
        homeButton: true, // 是否显示首页按钮
        geocoder: false, // 默认不显示搜索栏地址
        sceneModePicker: true, // 是否显示视角切换按钮

        // useDefaultRenderLoop: true, // 如果需要控制渲染循环，则设为true
        // targetFrameRate: 60, // 使用默认render loop时的帧率
      });
      // 设置开启深度检测
      this.viewer.scene.globe.depthTestAgainstTerrain = true
      this._Entity = new Entity(Cesium, this.viewer);

      var position = Cesium.Cartesian3.fromDegrees(119.9015668093, 31.4943207228, 0);
      var buildinghpr = new Cesium.HeadingPitchRoll(0, 0, 0);
      var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, buildinghpr);

      // 创建模型 start
      const createModel = this._Entity.createModel({
        position,
        uri:
          process.env.VUE_APP_PUBLIC_URL +
          "/gltf/无人机.gltf",
        maximumScale: 100,
        minimumPixelSize: 30,
        orientation: orientation,
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