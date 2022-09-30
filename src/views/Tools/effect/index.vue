<template>
  <div class="container" id="echarts">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import CircleScan from "@/common/cesium/effects/CircleScan.js";
import CircleDiffusion from "@/common/cesium/effects/CircleDiffusion.js";
import CircleWave from "@/common/cesium/effects/CircleWave.js";
import HexagonSpread from "@/common/cesium/effects/HexagonSpread.js";
import Scanline from "@/common/cesium/effects/Scanline.js";
import SpreadWall from "@/common/cesium/effects/SpreadWall.js";
import EllipsoidFade from "@/common/cesium/effects/EllipsoidFade.js";
import RoadNetwork from "@/common/cesium/effects/RoadNetwork.js";
import Layer from "@/common/cesium/Layer";
export default {
  data() {
    return {
      viewer: null,
      _CircleScan: null,
      _CircleDiffusion: null,
      _CircleWave: null,
      _HexagonSpread: null,
      _Scanline: null,
      _SpreadWall: null,
      _EllipsoidFade: null,
      _RoadNetwork: null,
      _Layer: null
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
      this._CircleScan = new CircleScan(Cesium, this.viewer)
      this._CircleDiffusion = new CircleDiffusion(Cesium, this.viewer)
      this._CircleWave = new CircleWave(Cesium, this.viewer)
      this._HexagonSpread = new HexagonSpread(Cesium, this.viewer)
      this._Scanline = new Scanline(Cesium, this.viewer)
      this._SpreadWall = new SpreadWall(Cesium, this.viewer)
      this._EllipsoidFade = new EllipsoidFade(Cesium, this.viewer)
      this._RoadNetwork = new RoadNetwork(Cesium, this.viewer)
      this._Layer = new Layer(Cesium, this.viewer)

      //设置贴地效果
      this.viewer.scene.globe.depthTestAgainstTerrain = true;
      this.start();
    },
    start() {
      const Cesium = this.cesium;
      this._CircleScan.add([123.46787863792646, 41.83241486807863, 0], '#f5222d', 500, 3000)
      this._CircleDiffusion.add([123.45362700404472, 41.81860631952072, 0], '#1890ff', 800, 3000)
      this._CircleWave.add([123.4227202687658, 41.817036701780346, 0], 'rgba(0, 255, 0, 1)', 500, 3000)
      this._HexagonSpread.add([123.41743639592823, 41.83039278462179, 0], '#c41d7f', 800, 3000)
      this._Layer.setLayer(
        {
          "id": 14,
          "isShow": true,
          "name": "高德地图01",
          "type": "UrlTemplateImageryProvider",
          "classConfig": {
            "url": "http://webst03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&style=7"
          },
          "interfaceConfig": {
            "saturation": 0,// 饱和度
            "brightness": 0.6,// 亮度
            "contrast": 1.8,// 对比度
            "hue": 1,// 色调
            "gamma": 0.3// 伽马校正
          },
          "offset": "0,0",// 偏移量
          "invertswitch": 1,// 是否反色 1 \ 0
          "filterRGB": "#4e70a6",// 滤镜颜色
          "showswitch": 1,
          "weigh": 0,
          "createtime": 1624326728,
          "updatetime": 1646979297
        }
      )
      const WhiteMold = this._Layer.createWhiteMold("https://mapv-data.oss-cn-hangzhou.aliyuncs.com/titleset/sz_ns2/tileset.json")
      this._Layer.Cesium3DTileStyle(WhiteMold, 'rgba(255, 255, 255, 1)')
      this._Layer.update3dtilesMaxtrix(WhiteMold, {
        "offset_x": 0,// 偏移量lon经度
        "offset_y": 0,// 偏移量lat纬度
        "offset_z": 0,// 偏移量height高度(米)
      })
      this._Layer.makeEffect(WhiteMold, {
        "effectswitch": 1,// 是否启用打光效果 0 / 1
        "height": 260,// 光环的移动范围(高度)单位米
        "effect_color": "#df16f1",// 打光效果颜色
      })


      // this._Scanline.add([123.40586284673046,41.82030438186604, 0], '#c41d7f', 800, 3000)
      // this._SpreadWall.add([123.40586284673046, 41.82030438186604, 0], '#c41d7f', 800, 3000, 1000)
      // this._EllipsoidFade.add([123.40586284673046, 41.82030438186604, 0], '#c41d7f', 800, 3000)

      this._RoadNetwork.flyLines([
        113.8918,
        22.4818,
        113.96858,
        22.5692],
        "#A932B4",
        2,
        3000,
        6,
        0.1,
        0.1,
        300)

      this._RoadNetwork.RoadPic(
        process.env.VUE_APP_PUBLIC_URL + '/cesium/effects/Data/nanshan-road1.geojson',
        process.env.VUE_APP_PUBLIC_URL + '/cesium/effects/Materials/spriteline1.png',
        1.7,
        3600
      )
      this._RoadNetwork.RoadPic(
        process.env.VUE_APP_PUBLIC_URL + '/cesium/effects/Data/nanshan-road2.geojson',
        process.env.VUE_APP_PUBLIC_URL + '/cesium/effects/Materials/spriteline2.png',
        2,
        3000
      )
      this._RoadNetwork.RoadPic(
        process.env.VUE_APP_PUBLIC_URL + '/cesium/effects/Data/nanshan-road3.geojson',
        process.env.VUE_APP_PUBLIC_URL + '/cesium/effects/Materials/spriteline3.png',
        1.6,
        600
      )


      this.viewer.flyTo(WhiteMold);
      //相机
      // this.viewer.camera.flyTo({
      //   //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
      //   destination: Cesium.Cartesian3.fromDegrees(
      //     123.46787863792646, 41.83241486807863, 10000
      //   ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)
      //   orientation: {
      //     heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向
      //     pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
      //     roll: 0.0, // default value
      //   },
      //   duration: 3, //3秒到达战场
      // });
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