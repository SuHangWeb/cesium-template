<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
// https://www.csdn.net/tags/MtTaEg2sNjE4OTc2LWJsb2cO0O0O.html
// https://www.freesion.com/article/1179473126/
// http://t.zoukankan.com/airduce-p-10417538.html

// https://blog.csdn.net/ly1074106000/article/details/111220425
import Entity from "@/common/cesium/Entity.js";
export default {
  name: "dynamicPosition",
  data() {
    return {
      viewer: null,
      _Entity: null,
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
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        }),
        terrainProvider: new Cesium.CesiumTerrainProvider({
          url: "http://data.marsgis.cn/terrain",
        }),
        shouldAnimate: true,
        timeline: true,
        infoBox: false,
        selectionIndicator: false,
        sceneMode: 2,
        // scale: 0.1,
      });
      //启用使用场景的光源为地球照明
      this.viewer.scene.globe.enableLighting = true;
      //深度监听
      this.viewer.scene.globe.depthTestAgainstTerrain = true;
      //Set the random number seed for consistent results.
      Cesium.Math.setRandomNumberSeed(3);

      this._Entity = new Entity(Cesium, this.viewer);
      this.start();
      //相机
      this.viewer.camera.setView({
        //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
        destination: Cesium.Cartesian3.fromDegrees(
          123.43382736814452,
          41.811201240193164,
          3000
        ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)
        orientation: {
          heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向
          pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
          roll: 0.0, // default value
        },
        duration: 3, //3秒到达战场
      });
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;
      var p1 = new Cesium.Cartesian3.fromDegrees(123.43382736814452, 41.811201240193164, 3000);
      var p2 = new Cesium.Cartesian3.fromDegrees(123.38490962816378, 41.88254440941469, 3000);

      var current = Cesium.JulianDate.now();
      var endTime = Cesium.JulianDate.addSeconds(
        current,
        30,
        new Cesium.JulianDate()
      ); //5秒
      var property = new Cesium.SampledProperty(Cesium.Cartesian3);
      property.addSample(current, p1); //动点开始
      property.addSample(endTime, p2); //动点结束

      var point = this.viewer.entities.add({
        position: p1,
        point: {
          color: Cesium.Color.WHITE,
          pixelSize: 10,
          //heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
        model: {
          uri: "/Vue/Entity/dynamicPosition/qiche.gltf",
          minimumPixelSize: 16,
          maximumScale: 16,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
      point.position = property;
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