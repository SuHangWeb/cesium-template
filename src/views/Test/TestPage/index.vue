<template>
  <div class="container" id="echarts">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
export default {
  name: "TextPage",
  data() {
    return {
      viewer: null,
      cbd1: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Tree@%E6%96%B0CBD/config',//CBD 树SCP
      cbd2: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Ground_1@%E6%96%B0CBD/config',//CBD 地面1 SCP
      cbd3: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Ground_2@%E6%96%B0CBD/config',//CBD 地面2 SCP
      cbd4: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Building@%E6%96%B0CBD/config',//CBD 建筑物 SCP
      sceneUrl: "http://www.supermapol.com/realspace/services/3D-CQmodel_wireframe_2000/rest/realspace"
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
        // terrainProvider: new Cesium.CesiumTerrainProvider({
        //   //加载火星在线地形
        //   url: "http://data.marsgis.cn/terrain",
        // }),
        infoBox: false,
        shouldAnimate: true,
        vrButton: true,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: true,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
      });
      //设置贴地效果
      this.viewer.scene.globe.depthTestAgainstTerrain = true;
      this.loadScene();
    },
    /**
     * 加载场景
     */
    loadScene() {
      const Cesium = this.cesium;
      //建筑
      // this.viewer.imageryLayers.addImageryProvider(this.cbd1);
      // const groundPromise = this.viewer.scene.addS3MTilesLayerByScp(this.cbd1, {
      //   name: 'ground'
      // })
      // const buildPromise = this.viewer.scene.addS3MTilesLayerByScp(this.cbd2, {
      //   name: 'build'
      // })
      // const lakePromise = this.viewer.scene.addS3MTilesLayerByScp(this.cbd3, {
      //   name: 'lake'
      // })
      // const treePromise = this.viewer.scene.addS3MTilesLayerByScp(this.cbd4, {
      //   name: 'tree'
      // })

      // Cesium.when.all([groundPromise, buildPromise, lakePromise, treePromise], (layers) => {

      // })
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