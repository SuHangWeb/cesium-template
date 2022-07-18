<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import Entity from "@/common/cesium/Entity.js";
import { v4 as uuidv4 } from "uuid";
import Material from "@/common/cesium/Materials/index.js";
import material_polylineVolume_flow from "./module/material/flow";
// https://blog.csdn.net/qq_35105689/article/details/122583842 空心
//http://www.pangbo15.cn/gis/560.html 流动
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
      positions4: [
        123.42789261245287, 41.82051143038075, 0, 123.4164759118099,
        41.820510612023114, 0,
      ],
      positions5: [
        123.43070199312513,41.81703908368588,0,
        123.4051747588459,41.81622044764279,0,
        123.38493312851678,41.81643212219792,0
      ],
      positions6: [
       123.43535570637746,41.820275683959025, 0, 123.44053746255399,41.822321387648586, 0,123.44879030603606,41.82314643874702,0
      ],
      positions7: [
        123.43673883218169, 41.81511974663461, 0, 123.43980749191105,
        41.814743307305456, 0,
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
    computePos(type, cut, positions) {
      const Cesium = this.cesium;
      let waterPositions = positions.concat();
      let cartesianPositions;
      if (type == "water") {
        for (let i = 2; i < waterPositions.length; i += 3) {
          waterPositions[i] += 0.4 - 0.25;
        }
        cartesianPositions = new Cesium.Cartesian3.fromDegreesArrayHeights(
          waterPositions
        );
      } else if (type == "pipe") {
        cartesianPositions = new Cesium.Cartesian3.fromDegreesArrayHeights(
          positions
        );
      }
      const start = cartesianPositions[0];
      const second = cartesianPositions[1];
      const end = cartesianPositions[cartesianPositions.length - 1];
      const secondToLast = cartesianPositions[cartesianPositions.length - 2];
      const startLength = Math.sqrt(
        Math.pow(start.x - second.x, 2) +
          Math.pow(start.y - second.y, 2) +
          Math.pow(start.z - second.z, 2)
      );
      const endLength = Math.sqrt(
        Math.pow(secondToLast.x - end.x, 2) +
          Math.pow(secondToLast.y - end.y, 2) +
          Math.pow(secondToLast.z - end.z, 2)
      );
      const startOffsetX = (0.7 / startLength) * (second.x - start.x);
      const startOffsetY = (0.7 / startLength) * (second.y - start.y);
      const startOffsetZ = (0.7 / startLength) * (second.z - start.z);
      const endOffsetX = (0.7 / endLength) * (secondToLast.x - end.x);
      const endOffsetY = (0.7 / endLength) * (secondToLast.y - end.y);
      const endOffsetZ = (0.7 / endLength) * (secondToLast.z - end.z);

      if (cut == "single") {
        start.x += startOffsetX;
        start.y += startOffsetY;
        start.z += startOffsetZ;
      }
      if (cut == "both") {
        start.x += startOffsetX;
        start.y += startOffsetY;
        start.z += startOffsetZ;
        end.x += endOffsetX;
        end.y += endOffsetY;
        end.z += endOffsetZ;
      }

      return cartesianPositions;
    },
    computeCircle2(radius, status) {
      const Cesium = this.cesium;
      var positions = [];
      let startRad, endRad;
      // 水位截面角度
      switch (status) {
        case 1:
          startRad = 225;
          endRad = 315;
          break;
        case 2:
          startRad = 180;
          endRad = 360;
          break;
        case 3:
          startRad = 135;
          endRad = 405;
          break;
        case 4:
          startRad = 0;
          endRad = 360;
          break;
        default:
          for (let i = 360; i >= 0; i--) {
            let radians = Cesium.Math.toRadians(i);
            positions.push(
              new Cesium.Cartesian2(
                insRadius * Math.cos(radians),
                insRadius * Math.sin(radians)
              )
            );
          }
      }

      for (let i = startRad; i <= endRad; i++) {
        let radians = Cesium.Math.toRadians(i);
        positions.push(
          new Cesium.Cartesian2(
            radius * Math.cos(radians),
            radius * Math.sin(radians)
          )
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
        material: Cesium.Color.DEEPSKYBLUE.withAlpha(0.5),
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
        shape: this.computeStar(10, 50, 35),
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
        shape: [
          new Cesium.Cartesian2(-50, -50),
          new Cesium.Cartesian2(50, 50),
          new Cesium.Cartesian2(50, -50),
        ],
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
        shape: this.computeCircle(20),
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
        shape: [
            new Cesium.Cartesian2(-10, 0),
            new Cesium.Cartesian2(10, 0),
            new Cesium.Cartesian2(20, 20),
            new Cesium.Cartesian2(0, 40),
            new Cesium.Cartesian2(-20, 20)
        ],
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
        // positions: Cesium.Cartesian3.fromDegreesArrayHeights(this.positions4),
        positions: this.computePos("pipe", "", this.positions7),
        shape: this.computeCircle2(50, 4),
        cornerType: Cesium.CornerType.MITERED,
        material: Cesium.Color.YELLOWGREEN,
        shadows: Cesium.ShadowMode.DISABLED,
      });
      EntityArr.push(_EntityData_7);
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