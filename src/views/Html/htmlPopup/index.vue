<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div v-for="(item, index) in dataPosition" :key="index">
      <popup-dom
        @close="popupClose"
        v-show="JSON.stringify(show_list).indexOf(item.id) != -1"
        :item="item"
      />
    </div>
  </div>
</template>
 
<script>
import { initPosition, dataPosition } from "./module/data";
import popupDom from "./module/popupDom.vue";
import Entity from "@/common/cesium/Entity.js";
import code from "./module/highlight";
export default {
  name: "htmlPopup",
  components: { popupDom },
  data() {
    return {
      viewer: null,
      _Entity: null,
      handler: null,
      dataPosition: dataPosition,
      show_list: [],
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
      this._Entity = new Entity(Cesium, this.viewer);
      this.handler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      this.start();
      //窗口位置设置
      this.popupPosition();

      //相机
      this.viewer.camera.flyTo({
        //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
        destination: Cesium.Cartesian3.fromDegrees(
          initPosition.lng,
          initPosition.lat,
          initPosition.height
        ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)
        orientation: {
          heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向
          pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
          roll: 0.0, // default value
        },
        duration: 3, //3秒到达战场
      });
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;
      //添加点位
      this.dataPosition.map((item) => {
        this._Entity.createPoint({
          id: item.id,
          name: item.name,
          position: Cesium.Cartesian3.fromDegrees(item.lng, item.lat),
          color: Cesium.Color.CHARTREUSE.withAlpha(1),
          pixelSize: 10,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 1,
        });
      });
      //鼠标左键点击事件
      this.handler.setInputAction((event) => {
        const pick = this.viewer.scene.pick(event.position);
        if (pick) {
          const f = this.dataPosition.filter(
            (item) => item.id == pick.id._id
          )[0];
          this.show_list.push(f.id);
          //数组去重
          this.show_list = [...new Set(this.show_list)];
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    /**
     * 窗口位置设置
     */
    popupPosition() {
      const Cesium = this.cesium;
      for (let i = 0; i < this.dataPosition.length; i++) {
        const item = this.dataPosition[i];
        const dom = document.getElementById(item.id);
        /**
         * scene = 场景
         * preRender = Event 事件订阅
         * addEventListener = 注册一个在事件引发时执行的回调函数
         *
         */
        this.viewer.scene.preRender.addEventListener(() => {
          const position = Cesium.Cartesian3.fromDegrees(item.lng, item.lat);
          /**
           * 转换为画布坐标
           * cartesianToCanvasCoordinates = 将笛卡尔坐标中的位置转换为画布坐标。这通常用于放置与场景中的对象位于同一屏幕位置的HTML元素。
           */
          var canvasPosition = this.viewer.scene.cartesianToCanvasCoordinates(
            position,
            new Cesium.Cartesian2()
          );
          if (Cesium.defined(canvasPosition)) {
            dom.style.top = canvasPosition.y - dom.offsetHeight + 20 + "px";
            dom.style.left = canvasPosition.x + dom.offsetWidth - 40 + "px";
          }
        });
      }
    },
    /**
     * 关闭窗口
     * @param {*} id
     */
    popupClose(id) {
      const index = this.show_list.indexOf(id);
      this.show_list.splice(index, 1);
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