<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import Entity from "@/common/cesium/Entity.js";
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      viewer: null,
      _Entity: null,
      positions1: [
        123.43371186710091, 41.81115948321154, 0, 123.43079986055396,
        41.808903787007004, 0, 123.42367362339716, 41.80900573889269, 0,
      ],
      positions2: [
        123.4327182112119, 41.812953683405226, 0, 123.4288125263957,
        41.81123617998219, 0, 123.4232276943245, 41.81174834479025, 0,
      ],
      positions3: [
        123.43169021038872, 41.81497857173556, 0, 123.42709904225134,
        41.8140555836194, 0, 123.42271311560773, 41.81464474650719, 0,
      ],
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
        infoBox: false,
        selectionIndicator: false,
        navigation: false,
        animation: false,
        timeline: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        shouldAnimate: false,
        // imageryProvider: new Cesium.UrlTemplateImageryProvider({
        //     url: "https://t7.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=tdtTk"
        // })
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        }),
      });
      //是否开启抗锯齿
      this.viewer.scene.fxaa = true;
      this.viewer.scene.postProcessStages.fxaa.enabled = true;
      this._Entity = new Entity(Cesium, this.viewer);
      this.start();
    },
    computeCircle(radius) {
      const Cesium = this.cesium;
      let positions = [];
      for (let i = 0; i < 360; i += 1) {
        const radians = Cesium.Math.toRadians(i);
        positions.push(
          new Cesium.Cartesian2(
            radius * Math.cos(radians),
            radius * Math.sin(radians)
          )
        );
      }
      return positions;
    },
    computeStar(arms, rOuter, rInner) {
      const Cesium = this.cesium;
      const angle = Math.PI / arms;
      const length = 2 * arms;
      const positions = new Array(length);
      for (let i = 0; i < length; i++) {
        const r = i % 2 === 0 ? rOuter : rInner;
        positions[i] = new Cesium.Cartesian2(
          Math.cos(i * angle) * r,
          Math.sin(i * angle) * r
        );
      }
      return positions;
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;
      let EntityArr = [];

      //透明管道 Start
      const _EntityData_1 = this._Entity.createPolylineVolume({
        id: uuidv4(),
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions1),
        shape: this.computeCircle(40),
        cornerType: Cesium.CornerType.ROUNDED, //拐角的样式
        material: Cesium.Color.RED.withAlpha(0.5),
        shadows: Cesium.ShadowMode.DISABLED,
      });
      EntityArr.push(_EntityData_1);
      //透明管道 End

      //方形管道 Start
      const _EntityData_2 = this._Entity.createPolylineVolume({
        id: uuidv4(),
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions2),
        shape: [
          new Cesium.Cartesian2(-35, -35),
          new Cesium.Cartesian2(35, -35),
          new Cesium.Cartesian2(35, 35),
          new Cesium.Cartesian2(-35, 35),
        ],
        cornerType: Cesium.CornerType.BEVELED, //拐角的样式
        material: Cesium.Color.RED.withAlpha(0.5),
        shadows: Cesium.ShadowMode.DISABLED,
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      });
      EntityArr.push(_EntityData_2);
      //方形管道 End

      //星形管道 Start
      const _EntityData_3 = this._Entity.createPolylineVolume({
        id: uuidv4(),
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions3),
        shape: this.computeStar(10, 50, 35),
        cornerType: Cesium.CornerType.MITERED,
        material: Cesium.Color.RED,
        shadows: Cesium.ShadowMode.DISABLED,
      });
      EntityArr.push(_EntityData_3);
      //星形管道 End

      this.viewer.flyTo(EntityArr);
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