<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import Entity from "@/common/cesium/Entity.js";
import { v4 as uuidv4 } from "uuid";
import Material from "@/common/cesium/Materials/index.js";
import PolylineVolume from "@/common/cesium/EntityUtils/PolylineVolume"
import material_polylineVolume_flow from "./module/material/flow";
// https://blog.csdn.net/qq_35105689/article/details/122583842 空心
//http://www.pangbo15.cn/gis/560.html 流动
//Primitive 方式加载： https://blog.csdn.net/qq_35105689/article/details/122583842?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-3-122583842-null-null.pc_agg_new_rank&utm_term=cesium%20%E7%AE%A1%E7%BA%BF&spm=1000.2123.3001.4430
export default {
  data() {
    return {
      viewer: null,
      _Entity: null,
      _Material: null,
      _PolylineVolume: null,
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
      positions4: [
        123.42789261245287, 41.82051143038075, 0, 123.4164759118099,
        41.820510612023114, 0,
      ],
      positions5: [
        123.43070199312513, 41.81703908368588, 0,
        123.4051747588459, 41.81622044764279, 0,
        123.38493312851678, 41.81643212219792, 0
      ],
      positions6: [
        123.43535570637746, 41.820275683959025, 0, 123.44053746255399, 41.822321387648586, 0, 123.44879030603606, 41.82314643874702, 0
      ],
      positions7: [
        123.43673883218169, 41.81511974663461, 0, 123.43980749191105,
        41.814743307305456, 0,
      ],
      positions8: [
        123.44247395262316, 41.81323100140572, 0, 123.44166813844917, 41.817612126910596, 0, 123.44849194333796, 41.81749127684859, 0
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
      this._Material = new Material(Cesium, this.viewer);
      this._PolylineVolume = new PolylineVolume(Cesium, this.viewer);
      this.start();
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
        shape: this._PolylineVolume.circleShape(40),
        cornerType: Cesium.CornerType.ROUNDED, //拐角的样式
        material: Cesium.Color.DEEPSKYBLUE.withAlpha(0.5),
        shadows: Cesium.ShadowMode.DISABLED,
      });
      EntityArr.push(_EntityData_1);
      //透明管道 End

      //方形管道 Start
      const _EntityData_2 = this._Entity.createPolylineVolume({
        id: uuidv4(),
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions2),
        shape: this._PolylineVolume.circleRectangle(35),
        cornerType: Cesium.CornerType.BEVELED, //拐角的样式
        material: Cesium.Color.AQUA.withAlpha(0.5),
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
        shape: this._PolylineVolume.circleStar(50, 35, 8),
        cornerType: Cesium.CornerType.MITERED,
        material: Cesium.Color.AQUAMARINE,
        shadows: Cesium.ShadowMode.DISABLED,
      });
      EntityArr.push(_EntityData_3);
      //星形管道 End

      //三角形 Start
      const _EntityData_4 = this._Entity.createPolylineVolume({
        id: uuidv4(),
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions4),
        shape: this._PolylineVolume.circleTriangle(50),
        cornerType: Cesium.CornerType.MITERED,
        material: Cesium.Color.BLUEVIOLET.withAlpha(0.5),
      });
      EntityArr.push(_EntityData_4);
      //三角形 End

      //流动管道 Start
      this._Material.create(material_polylineVolume_flow(Cesium));
      let material = new Cesium.material_polylineVolume_flow();
      const _EntityData_5 = this._Entity.createPolylineVolume({
        id: uuidv4(),
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions5),
        shape: this._PolylineVolume.circleShape(40),
        cornerType: Cesium.CornerType.ROUNDED, //拐角的样式
        material,
        shadows: Cesium.ShadowMode.DISABLED,
      });
      EntityArr.push(_EntityData_5);
      //流动管道 End

      //五角 Start
      const _EntityData_6 = this._Entity.createPolylineVolume({
        id: uuidv4(),
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions6),
        shape: this._PolylineVolume.circlePentagonal(35),
        material: Cesium.Color.CORAL,
        fill: true,
        outline: true,
        outlineColor: Cesium.Color.YELLOW,
        outlineWidth: 10
      });
      EntityArr.push(_EntityData_6);
      //五角 End

      //空心管道 Start
      const _EntityData_7 = this._Entity.createPolylineVolume({
        id: uuidv4(),
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions7),
        shape: this._PolylineVolume.circleShape(50, 5, 30),
        cornerType: Cesium.CornerType.ROUNDED,
        material: Cesium.Color.RED,
        shadows: Cesium.ShadowMode.DISABLED,
      });
      EntityArr.push(_EntityData_7);

      const _EntityData_8 = this._Entity.createPolylineVolume({
        id: uuidv4(),
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions8),
        shape: this._PolylineVolume.circleShape(50, 5, 30),
        cornerType: Cesium.CornerType.ROUNDED,
        material: Cesium.Color.BROWN.withAlpha(0.5),
        shadows: Cesium.ShadowMode.DISABLED,
      });
      EntityArr.push(_EntityData_8);
      //空心管道 End

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