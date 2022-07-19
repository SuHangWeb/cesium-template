<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      viewer: null,
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
      //设置贴地效果
      this.viewer.scene.globe.depthTestAgainstTerrain = false;
      this.start();
    },
    /**
     * 开始
     * https://blog.csdn.net/qq_17627195/article/details/125625468
     * https://blog.51cto.com/u_15127521/4083431
     * https://blog.csdn.net/Apple_Coco/article/details/108793743
     * https://blog.csdn.net/xyk866/article/details/108780077?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1-108780077-blog-125625468.pc_relevant_default&spm=1001.2101.3001.4242.2&utm_relevant_index=3
     */
    start() {
      const Cesium = this.cesium;
      const viewer = this.viewer;
      var handler = null;
      var circle_center_entity = null;  // 池火灾 圆心点 entity
      var temporary_circle_entity = null;  // 临时圆形entity
      var circle_entity = null; // 结果圆形entity
      var circle_end_point = null;  // 结束点
      var circle_center_point = null;  // 圆心点
        click_draw_circle()
      function click_draw_circle(){
        // 再次点击的时候，清除已绘制的中心点，临时圆和结果圆，初始化参数
        if (circle_entity !== null) {
          viewer.entities.remove(circle_center_entity);
          viewer.entities.remove(temporary_circle_entity);
          viewer.entities.remove(circle_entity);
          circle_center_entity = null;
          temporary_circle_entity = null;
          circle_entity = null;
          circle_end_point = null;
          circle_center_point = null;
        }
        
        // 清除所有点击事件
        if (handler) {
          handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
          handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        }
        
        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        
        // 鼠标点击左键
        handler.setInputAction(event => {
          let position = event;
          //根据屏幕坐标获取坐标位置
          const point = GV.GeoPoint.fromScreen(position.position.x, position.position.y, viewer);
          if (!point) {
            alert('请点击地球获取坐标！')
            return;
          }
        
          // 判断圆心是否已经绘制，如果绘制了，再次点击左键的时候，就是绘制最终结果圆形
          if (circle_center_entity) {
            // 设置最终点
            circle_end_point = {
              lon: point.lon.toFixed(10),
              lat: point.lat.toFixed(10),
              height: 0
            }
            // 绘制结果多边形
            draw_circle();
            // 清除事件
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            // 清除 绘制的中心点和临时圆
            viewer.entities.remove(circle_center_entity);
            viewer.entities.remove(temporary_circle_entity);
          } else {
            // 设置中心点坐标和结束点坐标
            circle_end_point = circle_center_point = {
              lon: point.lon.toFixed(10),
              lat: point.lat.toFixed(10),
              height: 0
            }
            // 绘制圆心点
            create_circle_center_point([point.lon.toFixed(10), point.lat.toFixed(10)]);
            // 开始绘制动态圆形
            draw_dynamic_circle(circle_center_point)
          }
        
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
        
        // 鼠标移动--实时绘制圆形
        handler.setInputAction((event) => {
          let position = event;
          //根据屏幕坐标获取坐标位置
          const point = GV.GeoPoint.fromScreen(position.endPosition.x, position.endPosition.y, viewer);
          if (point) {
            if (temporary_circle_entity) {
            // 修改结束点-用于动态绘制圆形
              circle_end_point = {
                lon: point.lon.toFixed(10),
                lat: point.lat.toFixed(10),
                height: 0
              }
            }
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }

      // 创建圆心点
      function create_circle_center_point(point_arr) {
        circle_center_entity = viewer.entities.add({
          // fromDegrees（经度，纬度，高度）以度为单位的经度和纬度值返回Cartesian3位置
          position: Cesium.Cartesian3.fromDegrees(point_arr[0], point_arr[1], 100),
          point: {
            // 点的大小（像素）
            pixelSize: 5,
            // 点位颜色，fromCssColorString 可以直接使用CSS颜色
            color: Cesium.Color.WHITE,
            // 边框颜色
            outlineColor: Cesium.Color.fromCssColorString('#fff'),
            // 边框宽度(像素)
            outlineWidth: 2,
            // 是否显示
            show: true
          }
        });
      }

      // 绘制动态圆
      function draw_dynamic_circle(point) {
        temporary_circle_entity = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat),
          ellipse: {
            // 半短轴（画圆：半短轴和半长轴一致即可）
            semiMinorAxis: new Cesium.CallbackProperty(() => {
              // PolygonHierarchy 定义多边形及其孔的线性环的层次结构（空间坐标数组）
              return two_points_distance(point, circle_end_point);
            }, false),
            // 半长轴
            semiMajorAxis: new Cesium.CallbackProperty(() => {
              // PolygonHierarchy 定义多边形及其孔的线性环的层次结构（空间坐标数组）
              return two_points_distance(point, circle_end_point);
            }, false),
            // 填充色
            material: Cesium.Color.RED.withAlpha(0.5),
            // 是否有边框
            outline: true,
            // 边框颜色
            outlineColor: Cesium.Color.WHITE,
            // 边框宽度
            outlineWidth: 4
          },
        });
      }

      // 绘制结果圆形
      function draw_circle() {
        circle_entity = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(circle_center_point.lon, circle_center_point.lat),
          ellipse: {
            // 半短轴（画圆：半短轴和半长轴一致即可）
            semiMinorAxis: two_points_distance(circle_center_point, circle_end_point),
            // 半长轴
            semiMajorAxis: two_points_distance(circle_center_point, circle_end_point),
            // 填充色
            material: Cesium.Color.RED.withAlpha(0.5),
            // 是否有边框
            outline: true,
            // 边框颜色
            outlineColor: Cesium.Color.WHITE,
            // 边框宽度
            outlineWidth: 4
          },
        });
      }

      // 根据经纬度计算两点之前的直线距离
      function two_points_distance(start_point, end_point) {
        // 经纬度转换为世界坐标
        var start_position = Cesium.Cartesian3.fromDegrees(start_point.lon, start_point.lat, start_point.height);
        var end_position = Cesium.Cartesian3.fromDegrees(end_point.lon, end_point.lat, end_point.height);
        // 返回两个坐标的距离（单位：米）
        return Cesium.Cartesian3.distance(start_position, end_position);
      }

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