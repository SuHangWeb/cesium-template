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

      //相机
      this.viewer.camera.flyTo({
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
      this.handler.setInputAction((event) => {
        // 添加点
        this._Entity.createPoint({
          position: this.viewer.scene.camera.pickEllipsoid(event.position),
          color: Cesium.Color.RED,
          pixelSize: 30,
        });
        // 获取点击位置
        const getPosition = this._Transform.getPosition(event);
        const Alert = `${JSON.stringify(getPosition)}\n经度：${
          getPosition.longitude
        }、纬度：${getPosition.latitude}、相机高度：${
          getPosition.cameraHeight
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