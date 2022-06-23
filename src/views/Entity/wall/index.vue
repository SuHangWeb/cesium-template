<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div class="operation-panel">
      <el-select size="mini" v-model="wallType" placeholder="请选择墙体类型">
        <el-option
          v-for="item in wallTypeArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        size="mini"
        :disabled="wallType == ''"
        @click="startDraw"
        class="startButton"
        type="primary"
        plain
        >开始绘制</el-button
      >
    </div>
  </div>
</template>
 
<script>
import Material from "@/common/cesium/Materials/index.js";
import Entity from "@/common/cesium/Entity.js";
import wallData from "./module/data";
import Utils from "@/common/cesium/Utils.js";
import DynamicWallMaterialPropertys from "./module/material/DynamicWallMaterialPropertys";
export default {
  name: "wall",
  data() {
    return {
      viewer: null,
      _Entity: null,
      _Utils: null,
      _Material: null,
      wallTypeArr: wallData,
      wallType: "",
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
      //深度监听  在当前效果里可以设置贴地效果
      this.viewer.scene.globe.depthTestAgainstTerrain = true;
      this._Entity = new Entity(Cesium, this.viewer);
      this._Utils = new Utils();
      this._Material = new Material(Cesium, this.viewer);
    },
    /**
     * 开始绘制
     */
    startDraw() {
      const Cesium = this.cesium;
      //删除所有实体
      this._Entity.removeEntity({ type: "all" });
      //过滤出来需要的数据对象
      const filter_data = this.wallTypeArr.filter(
        (item) => item.value == this.wallType
      );
      if (filter_data.length == 0) return;
      const obj = filter_data[0];
      let material = null;

      //波纹墙
      if (obj.value == "2") {
        this._Material.create(DynamicWallMaterialPropertys(Cesium));
        material = new Cesium.Material_DynamicWallMaterialPropertys();
      }

      const positions = Cesium.Cartesian3.fromDegreesArray(obj.position);
      const wallEntity = this._Entity.createWall({
        id: "DynamicWallMaterialPropertys",
        positions,
        material,
        // 设置高度
        maximumHeights: new Array(positions.length).fill(200), //一个属性，它指定要用于墙顶的高度数组，而不是每个位置的高度
        minimunHeights: new Array(positions.length).fill(0), //一个属性，它指定要用于墙底而不是地球表面的高度数组。
      });
      this.viewer.flyTo(wallEntity);
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
  .operation-panel {
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: #fff;
    border-radius: 6px 0 0 0;
    padding: 20px;
    .startButton {
      margin-left: 10px;
    }
  }
}
</style>