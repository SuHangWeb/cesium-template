<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
// https://blog.csdn.net/weixin_42776111/article/details/122981291

import Entity from "@/common/cesium/Entity.js";
import Utils from "@/common/cesium/Utils.js";
export default {
  name: "dynamicPosition",
  data() {
    return {
      viewer: null,
      _Entity: null,
      _Utils: null,
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
        // terrainProvider: Cesium.createWorldTerrain({
        //   requestWaterMask: true, // required for water effects
        //   requestVertexNormals: true, // required for terrain lighting
        // }),
        shouldAnimate: true,
        timeline: true,
        infoBox: false,
        selectionIndicator: false,
        // sceneMode: 2,
        // scale: 0.1,
        animation: false, //隐藏动画小组件（左下角圆的控件）
      });
      //隐藏底部时间线
      this.viewer.timeline.container.style.display = "none";
      //启用使用场景的光源为地球照明
      this.viewer.scene.globe.enableLighting = true;
      //深度监听
      this.viewer.scene.globe.depthTestAgainstTerrain = true;
      //Set the random number seed for consistent results.
      Cesium.Math.setRandomNumberSeed(3);

      let start = Cesium.JulianDate.fromDate(new Date()); // 设置时间轴当前时间为开始时间
      start = Cesium.JulianDate.addHours(start, 8, new Cesium.JulianDate()); // 开始时间加8小时改为北京时间
      let stop = Cesium.JulianDate.addSeconds(
        start,
        400,
        new Cesium.JulianDate()
      ); // 设置结束时间为开始时间加400秒
      // 设置时钟开始时间
      this.viewer.clock.startTime = start.clone();
      // 设置时钟当前时间
      this.viewer.clock.currentTime = start.clone();
      // 设置时钟结束时间
      this.viewer.clock.stopTime = stop.clone();
      // 时间速率，数字越大时间过的越快，设置1好像是和实际时间一样
      this.viewer.clock.multiplier = 1;
      // 时间轴绑定到viewer上去
      this.viewer.timeline.zoomTo(start, stop);
      // 循环执行，到达终止时间，重新从起点时间开始
      this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;

      this._Entity = new Entity(Cesium, this.viewer);
      this._Utils = new Utils(Cesium, this.viewer);
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
     * 时间轴与位置绑定
     */
    computeFlight(source) {
      const Cesium = this.cesium;
      let property = new Cesium.SampledPositionProperty();
      for (let i = 0; i < source.length; i++) {
        let time = Cesium.JulianDate.addSeconds(
          start,
          source[i].time,
          new Cesium.JulianDate()
        );
        let position = Cesium.Cartesian3.fromDegrees(
          source[i].longitude,
          source[i].dimension,
          source[i].height
        );
        // 添加位置，和时间对应
        property.addSample(time, position);
      }
      return property;
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;

      
      // let property = this.computeFlight(data)



      let startPosition = new Cesium.Cartesian3.fromDegrees(
        123.43414668444673,
        41.811367093937214
      );
      let endPosition = new Cesium.Cartesian3.fromDegrees(
        123.41625747004427,
        41.830387309925065
      );
      let factor = 0;
      const position = new Cesium.CallbackProperty(function (time) {
        if (factor > 5000) {
          factor = 0;
        }
        factor++;
        // 动态更新位置
        return Cesium.Cartesian3.lerp(
          startPosition,
          endPosition,
          factor / 5000.0,
          new Cesium.Cartesian3()
        );
      }, false);
      // 创建模型 start
      const createModel = this._Entity.createModel({
        // position: new Cesium.Cartesian3.fromDegrees(
        //   123.43382736814452,
        //   41.811201240193164,
        //   3000
        // ),
        common: {
          //模型姿态
          orientation: new Cesium.VelocityOrientationProperty(position),
        },
        position,
        //控制位偏移
        uri: process.env.VUE_APP_PUBLIC_URL + "/Vue/Entity/dynamicPosition/qiche.gltf",
        maximumScale: 100,
        minimumPixelSize: 30,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      });
      // 创建模型 end
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