<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <panel-view @draws="draws" @clears="clears" />
  </div>
</template>
 
<script>
import panelView from "./module/panel.vue"
import Draw from "@/common/cesium/Draw"
export default {
  components: {
    panelView
  },
  data() {
    return {
      viewer: null,
      handler: null,
      _Draw: null,
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
        animation: false,
        timeline: false,
        shouldAnimate: true,
        infoBox: false,
        selectionIndicator: false,
      });
      //去掉双击事件
      this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );

      this._Draw = new Draw(Cesium, this.viewer)
    },
    /**
     * 清楚
     */
    clears() {
      const Cesium = this.cesium;
      if (this.handler) {
        //移除地图鼠标点击事件
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN)
        //移除地图鼠标移动事件
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
        //移除地图鼠标抬起事件
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP)
        this.handler.destroy();
        this.handler = null
      }
      this.viewer.entities.removeAll();

      this.viewer.scene.postProcessStages.removeAll()
    },
    /**
     * 绘制
     * @param {*} name 
     */
    draws(name) {
      const Cesium = this.cesium;
      const viewer = this.viewer;

      this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

      //点
      if (name == "Point") {
        //鼠标点击事件
        this.handler.setInputAction((event) => {
          //获取加载地形后对应的经纬度和高程：地标坐标
          var ray = viewer.camera.getPickRay(event.position);
          var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
          if (!Cesium.defined(cartesian)) {
            return;
          }
          const _Point = this._Draw.createPoint({
            position: cartesian,
            color: Cesium.Color.SKYBLUE,
            pixelSize: 10,
            outlineColor: Cesium.Color.YELLOW,
            outlineWidth: 3,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
          })
          console.log(`绘制点：=>`, _Point)
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
        //鼠标右键点击
        this.handler.setInputAction((event) => {
          this.handler.destroy();
          this.handler = null
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        return
      }

      //线
      if (name == "Polyline") {
        let lineEntity = null; //线实体
        let positions = []; //位置
        /**
       * 选择了椭球或地图，返回世界上椭球或地图表面上的点坐标。如果未选择椭球或地图，则返回undefined
       * @return  Cartesian3
       */
        const pickEllipsoid = (eventPosition) => {
          return this.viewer.scene.camera.pickEllipsoid(
            eventPosition,
            this.viewer.scene.globe.ellipsoid
          );
        };

        //鼠标左键点击
        this.handler.setInputAction((event) => {
          const cartesian = pickEllipsoid(event.position);
          if (positions.length == 0) {
            //复制此实例
            positions.push(cartesian.clone());
          }
          positions.push(cartesian);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        //鼠标移动
        this.handler.setInputAction((event) => {
          const cartesian = pickEllipsoid(event.endPosition);
          if (positions.length >= 2) {
            if (!Cesium.defined(lineEntity)) {
              //值由回调函数延迟计算
              const _positions = new Cesium.CallbackProperty(() => {
                return positions;
              }, false);

              lineEntity = this._Draw.createPolyline({
                positions: _positions,
                material: Cesium.Color.RED,
                width: 5,
              });
            } else {
              if (cartesian != undefined) {
                positions.pop();
                cartesian.y += 1 + Math.random();
                positions.push(cartesian);
              }
            }
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        //鼠标右键点击
        this.handler.setInputAction((event) => {
          this.handler.destroy();
          this.handler = null
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        return
      }

      //面
      if (name == "polygonGather") {

      }

    }
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