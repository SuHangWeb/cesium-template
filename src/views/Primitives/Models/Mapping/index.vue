<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div id="sltImg"></div>
    <el-button class="export" @click="exportImg" type="primary">导出图片</el-button>
  </div>
</template>
 
<script>
import gltf from "./module/gltf.js"
import Utils from "@/common/cesium/Utils.js"
export default {
  data() {
    return {
      viewer: null,
      _Utils: null
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
        shouldAnimate: true,
        infoBox: false,
        selectionIndicator: false,
      });
      //设置贴地效果
      this.viewer.scene.globe.depthTestAgainstTerrain = false;
      this._Utils = new Utils(Cesium, this.viewer)
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;

      let position = [116.391402337129, 39.9031909, 0];
      var center = Cesium.Cartesian3.fromDegrees(position[0], position[1], position[2])
      var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);

      var primitive = new Cesium.Model({
        gltf: gltf,
        modelMatrix: modelMatrix,
        scale: 10,
      });
      let model = this.viewer.scene.primitives.add(primitive);


      var imagePath = process.env.VUE_APP_PUBLIC_URL + 'image/test.jpg';

      Promise.resolve(model.readyPromise).then((updatedPositions) => {
        var texture = model._rendererResources.textures[0];
        Cesium.Resource.fetchImage({
          url: imagePath
        }).then(function (image) {
          texture.copyFrom(image);
          texture.generateMipmap(); // Also replaces textures in mipmap
        })

        this.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(position[0], position[1], 300)
        });
      });
    },
    /**
     * 导出图片
     */
    exportImg() {
      this._Utils.sceneSaveToImage()
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

.export {
  position: fixed;
  bottom: 30px;
  right: 10px;
}
</style>