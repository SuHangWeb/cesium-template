<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div class></div>
  </div>
</template>
 
<script>
// 参考：http://mars3d.cn/editor-vue.html?id=graphic/entity/model-moveTo 
// ~~: https://blog.csdn.net/qq_27816785/article/details/122768709
//源码：https://blog.csdn.net/wokao253615105/article/details/124908042?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-124908042-blog-122768709.pc_relevant_multi_platform_whitelistv1&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-124908042-blog-122768709.pc_relevant_multi_platform_whitelistv1&utm_relevant_index=1
import Entity from "@/common/cesium/Entity.js";
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      viewer: null,
      _Entity: null,
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
      });
      //是否开启抗锯齿
      this.viewer.scene.fxaa = true;
      this.viewer.scene.postProcessStages.fxaa.enabled = true;
      this._Entity = new Entity(Cesium, this.viewer);
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;
      const _this = this

      function floorInit(len, height) {
        let EntityModelArr = []
        let _height = 0
        // 加载楼层 start
        for (let i = 0; i < len; i++) {
          _height = i * height
          const EntityModel = _this._Entity.createModel({
            id: uuidv4(),
            position: Cesium.Cartesian3.fromDegrees(
              123.42949456471793, 41.81741540043599, _height
            ),
            uri: process.env.VUE_APP_PUBLIC_URL + "/Vue/Models/gLTF/storey/floor.glb",
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
          })
          EntityModelArr.push(EntityModel)
        }
        // 加载楼层 end
        // 加载楼顶 start
        const EntityModelTop = _this._Entity.createModel({
          id: uuidv4(),
          position: Cesium.Cartesian3.fromDegrees(
            123.42949456471793, 41.81741540043599, len * height
          ),
          uri: process.env.VUE_APP_PUBLIC_URL + "/Vue/Models/gLTF/storey/top.glb",
          heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        })
        // 加载楼顶 end
        return [...EntityModelArr, EntityModelTop]
      }

      this.viewer.flyTo(floorInit(9, 3));
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