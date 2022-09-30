<template>
  <div class="container" id="echarts">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import Layer from "@/common/cesium/Layer";
export default {
  data() {
    return {
      viewer: null,
      _Layer: null,
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
      this._Layer = new Layer(Cesium, this.viewer)

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

      //设置贴地效果
      this.viewer.scene.globe.depthTestAgainstTerrain = true;

      this.start();
    },
    start() {
      const Cesium = this.Cesium
      const clippingPlanes = new Cesium.ClippingPlaneCollection({
        planes: [
          new Cesium.ClippingPlane(
            new Cesium.Cartesian3(0.0, 0.0, -1.0), // 相对于模型中心的点位，决定了剖切方向
            5.0 // 离法线距离
          ),
        ],
        edgeColor: Cesium.Color.WHITE,
        edgeWidth: 1,
      });

      let tileset = new Cesium.Cesium3DTileset({
        url: "//lab.earthsdk.com/model/d16c1ce0ac2d11e99dbd8fd044883638/tileset.json",
        modelMatrix: Cesium.Matrix4.fromArray([
          1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
        ]),
        show: true,
        clippingPlanes,
      });

      // 剖切面
      this.viewer.entities.add({
        // position: model.position.getValue(),
        position: Cesium.Cartesian3.fromDegrees(
          116.39146722726551,
          39.906950862690075,
          9.5
        ),
        plane: {
          dimensions: new Cesium.Cartesian2(80, 80),
          material: Cesium.Color.WHITE.withAlpha(0.1),
          plane: new Cesium.CallbackProperty(
            this.createPlaneUpdateFunction(clippingPlanes.get(0)),
            false
          ),
          outline: true,
          outlineColor: Cesium.Color.WHITE,
        },
      });
      this.viewer.scene.primitives.add(tileset);
      this.viewer.flyTo(tileset);
    },
    createPlaneUpdateFunction(plane) {
      let self = this;
      return function () {
        plane.distance = self.distance; // 修改距离法线距离
        return plane;
      };
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