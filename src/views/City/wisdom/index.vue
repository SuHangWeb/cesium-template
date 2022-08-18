<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      viewer: null,
      scene: null,
      cbd1: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Tree@%E6%96%B0CBD/config',//CBD 树SCP
      cbd2: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Ground_1@%E6%96%B0CBD/config',//CBD 地面1 SCP
      cbd3: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Ground_2@%E6%96%B0CBD/config',//CBD 地面2 SCP
      cbd4: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Building@%E6%96%B0CBD/config',//CBD 建筑物 SCP
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
        shouldAnimate: true,
        useDefaultRenderLoop: true,
        infoBox: false,
        contextOptions: {
          webgl: {
            alpha: false,
            antialias: true,
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: false,
            depth: true,
            stencil: false,
            anialias: false
          },
        }
      });

      // console.log(new Cesium.Utils(this.viewer))
      this.viewer.imageryLayers.addImageryProvider(new Cesium.BingMapsImageryProvider({
        url: 'https://dev.virtualearth.net',
        mapStyle: Cesium.BingMapsStyle.AERIAL,
        key: "AqYgyS1gIIDGsxmOlncqrgA83cHnhClLwZmIJXbYXX36pfxKYtUGk12Q3splaf4Y"
      }))

      this.scene = this.viewer.scene
      this.sceneConfig()//场景配置
      this.loadScene() //加载场景
    },
    /**
     * 场景配置
     */
    sceneConfig() {
      const Cesium = this.cesium;
      const scene = this.scene
      //设置第二重烘焙纹理的效果（明暗程度）
      scene.shadowMap.darkness = 1.275;
      //设置环境光
      // scene.lightSource.ambientLightColor = new Cesium.Color(0.7, 0.7, 0.7, 1);
      //深度检测
      scene.globe.depthTestAgainstTerrain = true;

      //地面调节
      scene.globe.baseColor = Cesium.Color.BLACK;
      scene.globe.globeAlpha = 0.5;
      scene.undergroundMode = true;
      scene.terrainProvider.isCreateSkirt = false;

      //调节场景环境
      scene.sun.show = false;
      scene.moon.show = false;
      // this._scene.skyBox.show = false;
      scene.skyAtmosphere.show = false;
      scene.fxaa = true;

      //开启颜色校正
      // scene.colorCorrection.show = false;
      // scene.colorCorrection.saturation = 3.1;
      // scene.colorCorrection.brightness = 1.8;
      // scene.colorCorrection.contrast = 1.2;
      // scene.colorCorrection.hue = 0;

      //开启泛光和HDR
      // scene.bloomEffect.show = false;
      // scene.hdrEnabled = true;
      // scene.bloomEffect.threshold = 1;
      // scene.bloomEffect.bloomIntensity = 2;

      //最大距离
      scene.screenSpaceCameraController.maximumZoomDistance = 5000.0
    },
    /**
     * 加载场景
     */
    loadScene() {
      const Cesium = this.cesium;
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