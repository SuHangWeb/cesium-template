<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import Entity from "@/common/cesium/Entity.js";
import Canvas from "@/common/cesium/Canvas.js";
import positionData from "./module/data";
export default {
  name: "canvasImageSpot",
  data() {
    return {
      viewer: null,
      _Entity: null,
      _Canvas: null,
      positionData: positionData,
      //广告牌数据
      billboardArr: [],
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
      this._Canvas = new Canvas(Cesium, this.viewer);
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;

      this.positionData.map((item) => {
        const imageReq = this._Canvas.drawImageText({
          ...item,
          height: 140,
          width: 300,
          src: "/image/textPnl.png",
        });
        imageReq.then((image) => {
          const _createBillboard = this._Entity.createBillboard({
            position: Cesium.Cartesian3.fromDegrees(item.lon, item.lat, 0),
            image,
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2),
            translucencyByDistance: new Cesium.NearFarScalar(
              1.5e2,
              1.0,
              1.5e7,
              0.2
            ),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            width: 150,
            height: 70,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          });
          this.billboardArr.push(_createBillboard);
        });
      });

      //相机(定位到了 沈河区惠工广场)
      this.viewer.camera.flyTo({
        //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
        destination: Cesium.Cartesian3.fromDegrees(
          123.43382736814452,
          41.811201240193164,
          5000
        ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)
        orientation: {
          heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向
          pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
          roll: 0.0, // default value
        },
        duration: 3, //3秒到达战场
      });

      setTimeout(() => {
        this.updateBillboard();
      }, 8000);
    },
    /**
     * 开始更新广告牌
     */
    updateBillboard() {
      setInterval(() => {
        this.billboardArr.map((item) => {
          const imageReq = this._Canvas.drawImageText({
            ...item,
            height: 140,
            width: 300,
            src: "/image/textPnl.png",
            data: {
              num: Math.round(Math.random() * (0 - 1000) + 1000),
            },
          });
          imageReq.then((image) => {
            item._billboard._image._value = image;
          });
        });
      }, 3000);
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