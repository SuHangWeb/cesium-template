<template>
  <div class="container" id="echarts">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import Entity from "@/common/cesium/Entity.js";
import Transform from "@/common/cesium/Transform.js";
export default {
  name: "TextPage",
  data() {
    return {
      viewer: null,
      _Entity: null,
      _Transform: null,
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
      this._Entity = new Entity(Cesium, this.viewer);
      this._Transform = new Transform(Cesium, this.viewer);
      this.handler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      this.loadScene();
    },
    /**
     * 加载场景
     */
    loadScene() {
      const Cesium = this.cesium;
      
      const tileset = this.addTileset('http://192.168.0.222:8082/city/66/tileset.json')
      this.viewer.flyTo(tileset);

    
      this.handler.setInputAction((event) => {
        // 添加点
        this._Entity.createPoint({
          position: this.viewer.scene.camera.pickEllipsoid(event.position),
          color: Cesium.Color.RED,
          pixelSize: 30,
        });
        // 获取点击位置
        const getPosition = this._Transform.getPosition(event);
        const Alert = `${JSON.stringify(getPosition)}\n经度：${getPosition.longitude
          }、纬度：${getPosition.latitude}、相机高度：${getPosition.cameraHeight
          }`;
        console.log(Alert);
        this.$copyText(`${getPosition.longitude},${getPosition.latitude}`).then(
          (e) => {
            this.$notify({
              title: "成功",
              message: "位置信息已拷贝到粘贴板",
              type: "success",
            });
          },
          (e) => {
            this.$notify.error({
              title: "错误",
              message: "位置信息拷贝失败",
            });
          }
        );
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    /**
     * 加载Tileset数据
     * @param {*} url  数据地址
     * @returns 
     */
    addTileset(url) {
      const Cesium = this.cesium;
      return this.viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url
        })
      );
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