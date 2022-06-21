<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <el-button
      type="primary"
      class="tools"
      icon="el-icon-s-tools"
      circle
      @click="poiPanelShow = !poiPanelShow"
    ></el-button>
    <poi-Panel
      :show="poiPanelShow"
      @close="poiPanelShow = false"
      @load="load"
      @poisClick="poisClick"
    />
  </div>
</template>
 
<script>
import poiPanel from "./module/POI-panel.vue";
import Utils from "@/common/cesium/Utils.js";
import Entity from "@/common/cesium/Entity.js";
import GaodeMap from "@/common/cesium/Map/Gaode";
import gcoord from "gcoord";
export default {
  name: "PoiQuery",
  components: { poiPanel },
  data() {
    return {
      poiPanelShow: false,

      viewer: null,
      _Entity: null,
      _GaodeMap: null,
      _Utils: null,

      EntityArr: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // https://blog.csdn.net/weixin_38676065/article/details/123776236 坐标系转换
    // https://blog.csdn.net/weixin_52469620/article/details/124397586 坐标系转换
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
    },
    /**
     * 兴趣点触发
     * @param {*} e
     */
    poisClick(e) {
      //坐标系转换
      const result = gcoord.transform(
        [e.location.lng, e.location.lat], // 经纬度坐标
        gcoord.AMap, // 当前坐标系
        gcoord.WGS84 // 目标坐标系
      );
      this.setCamera({
        location: result,
      });
    },
    /**
     * 设置相机位置
     * @param {*} e
     */
    setCamera(e) {
      const Cesium = this.cesium;
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          e.location[0],
          e.location[1],
          3000
        ),
      });
    },
    /**
     * 操作面板加载回调
     */
    load(e) {
      this.setPointPosition(e).then((res) => {
        this.EntityArr = res;
        this.viewer.flyTo(res);
      });
    },
    /**
     * 设置标点
     */
    async setPointPosition(arr) {
      const Cesium = this.cesium;
      this.viewer.entities.removeAll();
      const EntityArr = [];
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        //坐标系转换
        const result = gcoord.transform(
          [item.location.lng, item.location.lat], // 经纬度坐标
          gcoord.AMap, // 当前坐标系
          gcoord.WGS84 // 目标坐标系
        );
        const _Entity_ = this._Entity.createBillboard({
          id: item.id,
          name: item.name,
          position: Cesium.Cartesian3.fromDegrees(result[0], result[1]),
          common: {
            label: {
              //⽂字标签
              text: item.name,
              font: "500 30px Helvetica", // 15pt monospace
              scale: 0.5,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              fillColor: Cesium.Color.WHITE,
              pixelOffset: new Cesium.Cartesian2(-8, -50), //偏移量
              showBackground: false,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                0.0,
                20000.0
              ),
            },
          },
          image:
            process.env.VUE_APP_PUBLIC_URL +
            "/Vue/Maps/Gaode/PoiQuery/position.png",
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          width: 16,
          height: 22,
        });
        EntityArr.push(_Entity_);
      }
      return await EntityArr;
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
  .tools {
    position: fixed;
    bottom: 40px;
    right: 20px;
  }
}
</style>