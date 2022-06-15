<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import Entity from "@/common/cesium/Entity.js";
import Transform from "@/common/cesium/Transform.js";
import code from "./module/highlight";
export default {
  name: "GetCoordinates",

  data() {
    return {
      viewer: null,
      _Entity: null,
      _Transform: null,
      handler: null,
    };
  },
  created() {
    this.$store.dispatch("highlight/set_code", code);
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
      //设置贴地效果
      this.viewer.scene.globe.depthTestAgainstTerrain = false;
      this._Entity = new Entity(Cesium, this.viewer);
      this._Transform = new Transform(Cesium, this.viewer);
      this.handler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;
      this.handler.setInputAction((event) => {
        // 添加点
        this._Entity.createPoint({
          position: this.viewer.scene.camera.pickEllipsoid(event.position),
          color: Cesium.Color.RED,
          pixelSize: 30,
        });
        // 获取点击位置
        const getPosition = this._Transform.getPosition(event);
        // const getPositionAll = JSON.stringify(getPosition);
        // const longitude = getPosition.longitude;
        // const latitude = getPosition.latitude;
        // const cameraHeight = getPosition.cameraHeight;
        // const Alert =
        //   getPositionAll +
        //   "\n经度：" +
        //   longitude +
        //   "、纬度：" +
        //   latitude +
        //   "、相机高度：" +
        //   cameraHeight;
        // const Alert = getPositionAll + '\n' +'经度：' +longitude+'、纬度：'+latitude、相机高度：cameraHeight

        const Alert = `${JSON.stringify(getPosition)}\n经度：${
          getPosition.longitude
        }、纬度：${getPosition.latitude}、相机高度：${
          getPosition.cameraHeight
        }`;
        console.log(Alert);
        alert(Alert);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
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