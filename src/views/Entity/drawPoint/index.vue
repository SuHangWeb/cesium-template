<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div class="tip-view">
      <div class="tip">鼠标右键点击 停止绘制</div>
      <el-button class="button" type="primary" @click="start" plain
        >开始绘制</el-button
      >
    </div>
  </div>
</template>
 
<script>
import Entity from "@/common/cesium/Entity.js";
export default {
  name: "drawPoint",
  data() {
    return {
      viewer: null,
      _Entity: null,
      handler: null,
      cesiumContainer: null,
      EntityData: [],
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
      //设置贴地效果
      this.viewer.scene.globe.depthTestAgainstTerrain = false;
      this._Entity = new Entity(Cesium, this.viewer);
      this.cesiumContainer = document.getElementById("cesiumContainer");
      // this.start();

      //相机
      this.viewer.camera.flyTo({
        //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
        destination: Cesium.Cartesian3.fromDegrees(
          -75.59742934002912,
          40.03824624260394,
          5000
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
      this.handler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      this.cesiumContainer.style.cursor = "crosshair";
      //鼠标左键点击
      this.handler.setInputAction((event) => {
        const ray = this.viewer.camera.getPickRay(event.position);
        if (!ray) return null;
        const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
        const _EntityData = this._Entity.createPoint({
          position,
          color: Cesium.Color.SKYBLUE,
          pixelSize: 10,
          outlineColor: Cesium.Color.YELLOW,
          outlineWidth: 3,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        });
        this.EntityData.push(_EntityData);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      //鼠标右键点击
      this.handler.setInputAction((event) => {
        this.handler.destroy(); //关闭事件句柄
        this.handler = null;
        this.cesiumContainer.style.cursor = "unset";
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
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
  .tip-view {
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 1);
    z-index: 2;
    padding: 20px;
    border-radius: 10px 0 0 0;
    .tip {
      color: #e6a23c;
    }
    .button {
      margin-top: 10px;
    }
  }
}
</style>