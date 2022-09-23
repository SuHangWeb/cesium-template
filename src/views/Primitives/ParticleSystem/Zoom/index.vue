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
      this._Entity = new Entity(Cesium, this.viewer);
      //深度监听
      this.viewer.scene.globe.depthTestAgainstTerrain = false;
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;
      var position = Cesium.Cartesian3.fromDegrees(119.9015668093, 31.4943207228, 0);
      // 创建模型 start
      const createModel = this._Entity.createModel({
        position,
        uri:
          process.env.VUE_APP_PUBLIC_URL +
          "/Vue/Entity/dynamicPosition/qiche.gltf",
        maximumScale: 100,
        minimumPixelSize: 30,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      });
      this.viewer.flyTo(createModel);

      //定义
      var viewModel = {         //对象
        emissionRate: 3.0, //发射频率
        gravity: 0.0, //地球引力
        minimumParticleLife: 1,  // 生命周期在5秒和10秒之间
        maximumParticleLife: 5,
        minimumSpeed: 20,   //运行速度Speed发射器控制了粒子的位置和方向，速度通过speed参数或者minimumSpeed和maximumSpeed    让粒子每秒运行20~50米:
        maximumSpeed: 50,
        startScale: 1.0,      //例子发射开始范围
        endScale: 10,        //粒子发射结束范围
        particleSize: 25.0      //颗粒大小
      };
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