<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <el-button type="primary" plain class="start" @click="start">绘制</el-button>
  </div>
</template>

<script>
import code from "./module/highlight";
export default {
  data() {
    return {
      viewer: null,
      handler: null,//事件
      centerPoint: null,//中心点
      ellipsoidGather: null,//采集的球对象
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
    },
    /**
     * 开始
     *  */
    start() {
      const Cesium = this.cesium;
      const viewer = this.viewer;

      this.ellipsoidGather = null;
      //鼠标变成加号
      document.getElementById("cesiumContainer").style.cursor = "crosshair";

      //进制地图移动
      viewer.scene.screenSpaceCameraController.enableRotate = false;
      viewer.scene.screenSpaceCameraController.enableZoom = false;
      this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      //鼠标点击事件
      this.handler.setInputAction((event) => {
        //获取加载地形后对应的经纬度和高程：地标坐标
        var ray = viewer.camera.getPickRay(event.position);
        var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
        //console.log("cartesian:", cartesian);
        if (!Cesium.defined(cartesian)) {
          return;
        }
        this.centerPoint = viewer.entities.add({
          name: 'centerPoint',
          position: cartesian,
          point: {
            color: Cesium.Color.CHARTREUSE.withAlpha(1),
            pixelSize: 10,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 1
          }
        });
        // 轨迹球体
        this.ellipsoidGather = viewer.entities.add({
          position: cartesian,
          name: '轨迹球体',
          ellipsoid: {
            maximumCone: Cesium.Math.PI_OVER_TWO,
            radii: new Cesium.Cartesian3(0.1, 0.1, 0.1),
            material: Cesium.Color.GREENYELLOW.withAlpha(0.5)
          }
        })

      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);


      // 对鼠标移动事件的监听
      this.handler.setInputAction((event) => {
        if (this.centerPoint == null || this.ellipsoidGather == null) {
          return;
        }
        //获取加载地形后对应的经纬度和高程：地标坐标
        var ray = viewer.camera.getPickRay(event.endPosition);
        var radiusCartesian = viewer.scene.globe.pick(ray, viewer.scene);
        if (!radiusCartesian) {
          return;
        }
        var centerCartesian = this.centerPoint.position.getValue(Cesium.JulianDate.now());
        //计算移动点与中心点的距离（单位米）
        var centerTemp = viewer.scene.globe.ellipsoid.cartesianToCartographic(centerCartesian);
        var radiusTemp = viewer.scene.globe.ellipsoid.cartesianToCartographic(radiusCartesian);
        var geodesic = new Cesium.EllipsoidGeodesic();
        geodesic.setEndPoints(centerTemp, radiusTemp);
        var radius = geodesic.surfaceDistance;
        //console.log("radius",radius);
        //如果半径小于0,则不更新圆信息
        if (radius <= 0) {
          return;
        }
        this.ellipsoidGather.ellipsoid.radii = new Cesium.CallbackProperty(function (time, result) {
          return new Cesium.Cartesian3(radius, radius, radius);
        }, false);
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


      // 对鼠标抬起事件的监听(结束点采集)
      this.handler.setInputAction((event) => {
        //鼠标变成默认
        document.getElementById("cesiumContainer").style.cursor = "default";
        //开始鼠标操作地图
        viewer.scene.screenSpaceCameraController.enableRotate = true;
        viewer.scene.screenSpaceCameraController.enableZoom = true;
        //移除地图鼠标点击事件
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN)
        //移除地图鼠标移动事件
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
        //移除地图鼠标抬起事件
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP)
        var ellipsoid = viewer.scene.globe.ellipsoid;
        var cartographic = ellipsoid.cartesianToCartographic(this.centerPoint.position.getValue(Cesium.JulianDate.now()));
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        var lng = Cesium.Math.toDegrees(cartographic.longitude);
        var height = cartographic.height;
        console.log("圆中心点：经度", lng + ",纬度：" + lat + ",高度：" + height);
        console.log("圆半径：", this.ellipsoidGather.ellipsoid.radii.getValue().x + "米");
        //如果圆半径小于0.5米则删除，防止出现默认为0.1米的被采集。该种情况则是用户取消圆采集
        if (this.ellipsoidGather.ellipsoid.radii.getValue().x < 0.5) {
          viewer.entities.remove(this.ellipsoidGather);
          this.ellipsoidGather = null;
        }
        //清除圆中心点和半径点
        viewer.entities.remove(this.centerPoint);
        this.centerPoint = null;
      }, Cesium.ScreenSpaceEventType.LEFT_UP);

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

  .start {
    width: 100px;
    height: 40px;
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
}
</style>
