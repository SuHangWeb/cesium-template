<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
// https://www.csdn.net/tags/MtTaEg2sNjE4OTc2LWJsb2cO0O0O.html
// https://www.freesion.com/article/1179473126/
// http://t.zoukankan.com/airduce-p-10417538.html
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

      const start = Cesium.JulianDate.fromDate(new Date());
      // console.log(start);
      const stop = Cesium.JulianDate.addSeconds(
        start,
        360,
        new Cesium.JulianDate()
      );
      // console.log(stop);
      /**
       * clock / 时钟
       */
      this.viewer.clock.startTime = start.clone(); //开始时间
      this.viewer.clock.stopTime = stop.clone(); //停止时间
      this.viewer.clock.currentTime = start.clone(); //当前时间
      this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //末端循环
      this.viewer.clock.multiplier = 10; //经过的时间 负值允许向后前进

      //将视图设置为提供的时间。
      this.viewer.timeline.zoomTo(start, stop);

      const computeCirclularFlight = () => {
        var polyLinePositions = [
          [123.4339643124376, 41.81140372072612, 0],
          [123.38490962816378, 41.88254440941469, 0],
        ];
        var property = new Cesium.SampledPositionProperty();
        for (var i = 0; i < polyLinePositions.length; i++) {
          var time = Cesium.JulianDate.addSeconds(
            start,
            i * 10,
            new Cesium.JulianDate()
          );
          // 将经纬度坐标转换为三维空间坐标
          var position = Cesium.Cartesian3.fromDegrees(
            polyLinePositions[i][0],
            polyLinePositions[i][1],
            polyLinePositions[i][2]
          );
          // Property最大的特点是和时间相互关联，在不同的时间可以动态地返回不同的属性值;
          // Entity则可以感知这些Property的变化，在不同的时间驱动物体进行动态展示;
          property.addSample(time, position);
        }
        return property;
      };

      const position = computeCirclularFlight(start);

      // 创建模型 start
      const createModel = this._Entity.createModel({
        common: {
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: start,
              stop: stop,
            }),
          ]),
          orientation: new Cesium.VelocityOrientationProperty(position),
        },
        position,
        //控制位偏移
        // viewFrom: new Cesium.Cartesian3(-100.0, 0.0, 100.0),
        uri: "/Vue/Entity/dynamicPosition/qiche.gltf",
        maximumScale: 100,
        minimumPixelSize: 30,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      });
      // 创建模型 end
      // console.log(createModel.position._value)
      // setTimeout(() => {
      //   createModel.position = Cesium.Cartesian3.fromDegrees(
      //     123.42972095948645,
      //     41.81734719374503,
      //     0
      //   );
      // }, 3000);
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