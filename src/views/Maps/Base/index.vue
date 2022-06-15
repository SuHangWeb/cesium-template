<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div class="mapSelectionWindow">
      <el-select
        v-model="mapType"
        @change="mapSelection"
        placeholder="切换地图类型"
      >
        <el-option
          v-for="item in mapList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>
 
<script>
import Map from "@/common/cesium/Map/index.js";
import code from "./module/highlight";
export default {
  name: "MapsBase",
  data() {
    return {
      viewer: null,
      _Map: null,
      mapList: [],
      mapType: "",
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
      this._Map = new Map(Cesium, this.viewer);
      this.mapList = this._Map.list;
    },
    /**
     * 地图切换
     */
    mapSelection(e) {
      this.viewer.scene.imageryLayers.addImageryProvider(this._Map.init(e));
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

.mapSelectionWindow {
  width: 300px;
  padding: 20px 20px 50px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 2;
  color: #fff;
}
</style>