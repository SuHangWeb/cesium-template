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
        this._Draw.createPoint({
          color: Cesium.Color.SKYBLUE,
          pixelSize: 10,
          outlineColor: Cesium.Color.YELLOW,
          outlineWidth: 3,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        }, this.handler, (e) => {
          console.log(e)
          if (e.code == 200) {
            //绘制成功 e.entity = 返回实体
          }
          if (e.code == 201) {
            this.handler.destroy();
            this.handler = null
          }
        })
      }

      //线
      if (name == "Polyline") {
        this._Draw.createPolyline({
          material: Cesium.Color.RED,
          width: 5,
        }, this.handler, (e) => {
          console.log(e)
          if (e.code == 200) {
            //绘制成功 e.entity = 返回实体
          }
          if (e.code == 201) {
            this.handler.destroy();
            this.handler = null
          }
        })
      }

      //面
      if (name == "polygon") {
        this._Draw.createPolygon({
        }, this.handler, (e) => {
          console.log(e)
        })
        
        // //鼠标移动事件
        // handler.setInputAction(function (movement) {
        // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        // //左键点击操作
        // handler.setInputAction(function (click) {
        //   //调用获取位置信息的接口
        //   let ray = viewer.camera.getPickRay(click.position);
        //   position = viewer.scene.globe.pick(ray, viewer.scene);
        //   tempPoints.push(position);
        //   let tempLength = tempPoints.length;
        //   //调用绘制点的接口
        //   let point = that.drawPoint(position);
        //   tempEntities.push(point);
        //   if (tempLength > 1) {
        //     let pointline = that.drawPolyline([tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1]]);
        //     tempEntities.push(pointline);
        //   } else {
        //     // tooltip.innerHTML = "请绘制下一个点，右键结束";
        //   }
        // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        // //右键点击操作
        // handler.setInputAction(function (click) {
        //   let cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe.ellipsoid);

        //   if (cartesian) {
        //     let tempLength = tempPoints.length;
        //     if (tempLength < 3) {
        //       alert('请选择3个以上的点再执行闭合操作命令');
        //     } else {
        //       //闭合最后一条线
        //       let pointline = that.drawPolyline([tempPoints[tempPoints.length - 1], tempPoints[0]]);
        //       tempEntities.push(pointline);
        //       that.drawPolygon(tempPoints);
        //       tempEntities.push(tempPoints);
        //       handler.destroy();//关闭事件句柄
        //       handler = null;
        //     }
        //   }
        // }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
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