<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <operation-panel @draw="drawStart" @edit="editRect" :edit="rectArr.length != 0" />
  </div>
</template>
 
<script>
import Canvas from "@/common/cesium/Canvas";
import Entity from "@/common/cesium/Entity.js";
import operationPanel from "./module/operationPanel.vue";
export default {
  name: "textMapRectangle",
  components: { operationPanel },
  data() {
    return {
      viewer: null,
      _Entity: null,
      handler: null,
      _Canvas: null,
      cesiumContainer: null,

      rect: null, //当前绘制矩形实体
      startPoint: null, //初始点位
      rectArr: [], //绘制矩形实体列表

      //当前编辑事件
      gon: null,
      //编辑点集合
      pointsId: [],
      //中心点
      centerPoint: null,
      //当前编辑点
      currentPoint: null,
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
      this._Entity = new Entity(Cesium, this.viewer);
      this._Canvas = new Canvas(Cesium, this.viewer);
      this.cesiumContainer = document.getElementById("cesiumContainer");
      //相机
      this.viewer.camera.flyTo({
        //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
        destination: Cesium.Cartesian3.fromDegrees(
          -75.59742934002912,
          40.03824624260394,
          5000
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
     * 开始绘制
     */
    drawStart(data) {
      //解构数据
      const { color, fontSize, is_animation, terrainValue, text } = data;
      const Cesium = this.cesium;
      this.handler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      //鼠标变成加号
      this.cesiumContainer.style.cursor = "crosshair";
      this.rect = null;
      //进制地图移动
      this.viewer.scene.screenSpaceCameraController.enableRotate = false;
      this.viewer.scene.screenSpaceCameraController.enableZoom = false;

      //鼠标点击落下事件 Start
      this.handler.setInputAction((event) => {
        //获取加载地形后对应的经纬度和高程：地标坐标
        const ray = this.viewer.camera.getPickRay(event.position);
        const cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
        if (!Cesium.defined(cartesian)) {
          return;
        }

        //绘制初始点位
        this.startPoint = this._Entity.createPoint({
          position: cartesian,
          color: Cesium.Color.CHARTREUSE.withAlpha(1),
          pixelSize: 10,
          heightReference: Cesium.HeightReference[this.terrainValue],
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 1,
        });

        //绘制矩形
        this.rect = this._Entity.createRectangle({
          coordinates: Cesium.Rectangle.fromCartesianArray([
            cartesian,
            cartesian,
          ]),
          material: Cesium.Color.GREENYELLOW.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 3,
          heightReference: Cesium.HeightReference[this.terrainValue],
        });
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      //鼠标点击落下事件 End

      // 对鼠标移动事件的监听 Start
      this.handler.setInputAction((event) => {
        //判断已经存在初始位置
        if (this.startPoint == null || this.rect == null) {
          return;
        }

        //获取加载地形后对应的经纬度和高程：地标坐标
        const ray = this.viewer.camera.getPickRay(event.endPosition);
        const cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
        if (!cartesian) {
          return;
        }

        //在固定的帧中在指定的时间获取属性的值。
        const startCartesian = this.startPoint.position.getValue(
          Cesium.JulianDate.now()
        );

        this.rect.rectangle.coordinates = new Cesium.CallbackProperty(
          (time, result) => {
            return Cesium.Rectangle.fromCartesianArray([
              startCartesian,
              cartesian,
            ]);
          },
          false
        );
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      // 对鼠标移动事件的监听 End

      // 对鼠标抬起事件的监听(结束点采集) Start
      this.handler.setInputAction((event) => {
        //鼠标变成默认
        this.cesiumContainer.style.cursor = "default";
        //恢复试图缩放功能
        this.viewer.scene.screenSpaceCameraController.enableRotate = true;
        this.viewer.scene.screenSpaceCameraController.enableZoom = true;
        //移除点位
        this.viewer.entities.remove(this.startPoint);
        //移除地图鼠标点击事件
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
        //移除地图鼠标移动事件
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        //移除地图鼠标抬起事件
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP);
        //赋值材质
        this.rect.rectangle.outline = false;
        const image = this._Canvas.drawText({
          text,
          color,
          fontSize,
        });
        this.rect.rectangle.material = new Cesium.ImageMaterialProperty({
          //image 定要使用的图像，URL，画布或视频的属性。
          image,
          repeat: new Cesium.Cartesian2(1, 1), //获取或设置 Cartesian2 属性，该属性指定图像在每个方向上重复的次数。
          transparent: true, //图像是否具有透明度
          color: Cesium.Color.WHITE, //图像的所需颜色。
        });
        // 动画 start
        if (is_animation) {
          //如果应对广告牌，折线，标签等图元进行深度测试，则为true抵靠地形表面 否则反之
          this.viewer.scene.globe.depthTestAgainstTerrain = false;
          let rotation = Cesium.Math.toRadians(30);
          function getRotationValue() {
            return (rotation += 0.005);
          }
          this.rect.rectangle.rotation = new Cesium.CallbackProperty(
            getRotationValue,
            false
          );
          this.rect.rectangle.stRotation = new Cesium.CallbackProperty(
            getRotationValue,
            false
          );
        }
        // 动画 end

        //数据赋值
        this.rectArr.push(this.rect);

        let dke = this.rect.rectangle.coordinates.getValue();
        console.log("修改后的面坐标(笛卡尔)：", dke);
        let east = Cesium.Math.toDegrees(dke.east);
        let west = Cesium.Math.toDegrees(dke.west);
        let north = Cesium.Math.toDegrees(dke.north);
        let south = Cesium.Math.toDegrees(dke.south);
        console.log("矩形西南东北坐标:", west, south, east, north);
      }, Cesium.ScreenSpaceEventType.LEFT_UP);
      // 对鼠标抬起事件的监听(结束点采集) End
    },
    /**
     * 编辑
     */
    editRect() {
      const Cesium = this.cesium;
      //是否进入编辑
      let isEditting = false;
      this.cesiumContainer.style.cursor = "pointer";
      //去掉双击事件
      this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
      //鼠标左键点击 Start
      this.handler.setInputAction((event) => {
        const windowPosition = event.position;
        const pickedObject = this.viewer.scene.pick(windowPosition);
        if (Cesium.defined(pickedObject)) {
          const entity = pickedObject.id;
          const rectArr = this.rectArr.filter((item) => item.id == entity.id);
          if (rectArr.length != 0 && !isEditting) {
            this.gon = entity;
            // 生成边界编辑点
            const degrees = this.gon.rectangle.coordinates.getValue();
            let cartesianArr = [];

            let westNorth = Cesium.Cartesian3.fromRadians(
              degrees.west,
              degrees.north
            );
            westNorth.flag = "westNorth";
            cartesianArr.push(westNorth);

            let eastNorth = Cesium.Cartesian3.fromRadians(
              degrees.east,
              degrees.north
            );
            eastNorth.flag = "eastNorth";
            cartesianArr.push(eastNorth);

            let eastSouth = Cesium.Cartesian3.fromRadians(
              degrees.east,
              degrees.south
            );
            eastSouth.flag = "eastSouth";
            cartesianArr.push(eastSouth);

            let westSouth = Cesium.Cartesian3.fromRadians(
              degrees.west,
              degrees.south
            );
            westSouth.flag = "westSouth";
            cartesianArr.push(westSouth);
            // console.log("cartesianArr", cartesianArr);
            cartesianArr.map((item, index) => {
              let point = this._Entity.createPoint({
                id: `Point-${new Date().getTime()}-index-${index}`,
                name: "rect_point",
                position: item,
                color: Cesium.Color.CHARTREUSE.withAlpha(1),
                pixelSize: 10,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //贴地
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 1,
              });
              point.flag = item.flag;
              this.pointsId.push(point.id);
            });
            // 生成中心编辑点
            const centerLng = (degrees.west + degrees.east) / 2;
            const centerLat = (degrees.north + degrees.south) / 2;
            const rect_center_cartesian = Cesium.Cartesian3.fromRadians(
              centerLng,
              centerLat
            );
            let centerPoint = this._Entity.createPoint({
              id: `centerPoint-${new Date().getTime()}`,
              name: "rect_point",
              position: rect_center_cartesian,
              color: Cesium.Color.RED,
              pixelSize: 10,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 1,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //贴地
            });
            centerPoint.flag = "centerPoint";
            this.pointsId.push(centerPoint.id);

            isEditting = true;
            this.viewer.scene.screenSpaceCameraController.enableRotate = false;
            this.viewer.scene.screenSpaceCameraController.enableZoom = false;
          } else if (entity.name === "rect_point") {
            this.currentPoint = entity;
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      //鼠标左键点击 End

      // 对鼠标移动事件的监听 Start
      this.handler.setInputAction((event) => {
        if (
          isEditting &&
          this.currentPoint &&
          this.currentPoint.name == "rect_point"
        ) {
          //获取加载地形后对应的经纬度和高程：地标坐标
          const ray = this.viewer.camera.getPickRay(event.endPosition);
          const cartesian = this.viewer.scene.globe.pick(
            ray,
            this.viewer.scene
          );
          let points = [];
          if (!cartesian) {
            return;
          }
          //更新当前点的位置
          this.currentPoint.position = cartesian;
          for (var i = 0; i < this.pointsId.length; i++) {
            if (this.currentPoint.id == this.pointsId[i]) {
              var objTemp = this.currentPoint.position._value;
              objTemp.flag = this.currentPoint.flag;
              points.push(objTemp);
            } else {
              var id = this.pointsId[i];
              var objTemp = this.viewer.entities.getById(id).position._value;
              objTemp.flag = this.viewer.entities.getById(id).flag;
              points.push(objTemp);
            }
          }
          if (typeof this.currentPoint == "undefined") {
            var radians = Cesium.Rectangle.fromDegrees(
              west,
              south,
              east,
              north
            );
            return radians;
          }

          //当前移动是哪个点，获取新的矩形边界
          const ellipsoid = this.viewer.scene.globe.ellipsoid;
          let lngArr = [];
          let latArr = [];
          if (
            this.currentPoint.flag == "westNorth" ||
            this.currentPoint.flag == "eastSouth"
          ) {
            for (let i = 0; i < points.length; i++) {
              if (
                points[i].flag == "westNorth" ||
                points[i].flag == "eastSouth"
              ) {
                const cartographic = ellipsoid.cartesianToCartographic(
                  points[i]
                );
                const lng = Cesium.Math.toDegrees(cartographic.longitude);
                const lat = Cesium.Math.toDegrees(cartographic.latitude);
                lngArr.push(lng);
                latArr.push(lat);
              }
            }
          } else if (
            this.currentPoint.flag == "eastNorth" ||
            this.currentPoint.flag == "westSouth"
          ) {
            for (var i = 0; i < points.length; i++) {
              if (
                points[i].flag == "eastNorth" ||
                points[i].flag == "westSouth"
              ) {
                const cartographic = ellipsoid.cartesianToCartographic(
                  points[i]
                );
                const lng = Cesium.Math.toDegrees(cartographic.longitude);
                const lat = Cesium.Math.toDegrees(cartographic.latitude);
                lngArr.push(lng);
                latArr.push(lat);
              }
            }
          } else if (this.currentPoint.flag == "centerPoint") {
            const cartographic = ellipsoid.cartesianToCartographic(
              this.currentPoint.position._value
            );
            const centerLng = Cesium.Math.toDegrees(cartographic.longitude);
            const centerLat = Cesium.Math.toDegrees(cartographic.latitude);
            //console.log("centerLng",centerLng);
            const rectInfo = this.gon.rectangle.coordinates.getValue();
            //console.log("currentPoint.position",currentPoint.position._value);
            const rectWidth =
              Cesium.Math.toDegrees(rectInfo.east) -
              Cesium.Math.toDegrees(rectInfo.west);
            const rectHeight =
              Cesium.Math.toDegrees(rectInfo.north) -
              Cesium.Math.toDegrees(rectInfo.south);
            //console.log("rectWidth:",rectWidth);
            const rectInfoEast = centerLng + rectWidth / 2;
            lngArr.push(rectInfoEast);
            const rectInfoWest = centerLng - rectWidth / 2;
            lngArr.push(rectInfoWest);
            const rectInfoNorth = centerLat + rectHeight / 2;
            latArr.push(rectInfoNorth);
            const rectInfoSouth = centerLat - rectHeight / 2;
            latArr.push(rectInfoSouth);
            //console.log("rectInfoEast",rectInfoEast);
            //console.log("经度组：",lngArr);
          }

          const east = Math.max.apply(null, lngArr);
          const west = Math.min.apply(null, lngArr);
          const north = Math.max.apply(null, latArr);
          const south = Math.min.apply(null, latArr);
          //更新所有编辑点的位置
          for (let i = 0; i < this.pointsId.length; i++) {
            let id = this.pointsId[i];
            let entityTemp = this.viewer.entities.getById(id);
            if (
              typeof entityTemp != "undefined" &&
              typeof this.currentPoint != "undefined"
            ) {
              if (entityTemp.flag != this.currentPoint.flag) {
                if (entityTemp.flag == "westNorth") {
                  entityTemp.position = Cesium.Cartesian3.fromDegrees(
                    west,
                    north
                  );
                } else if (entityTemp.flag == "eastNorth") {
                  entityTemp.position = Cesium.Cartesian3.fromDegrees(
                    east,
                    north
                  );
                } else if (entityTemp.flag == "eastSouth") {
                  entityTemp.position = Cesium.Cartesian3.fromDegrees(
                    east,
                    south
                  );
                } else if (entityTemp.flag == "westSouth") {
                  entityTemp.position = Cesium.Cartesian3.fromDegrees(
                    west,
                    south
                  );
                } else if (entityTemp.flag == "centerPoint") {
                  var centerLng = (west + east) / 2;
                  var centerLat = (north + south) / 2;
                  entityTemp.position = Cesium.Cartesian3.fromDegrees(
                    centerLng,
                    centerLat
                  );
                }
              }
            }
          }

          //console.log("坐标：",west, south, east, north);
          if (west >= east || south >= north) {
            this.currentPoint = undefined;
            return;
          }

          var radians = Cesium.Rectangle.fromDegrees(west, south, east, north);
          //更新矩形位置
          this.gon.rectangle.coordinates = new Cesium.CallbackProperty(
            function (time, result) {
              return radians;
            },
            false
          );
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      // 对鼠标移动事件的监听 End

      // 对鼠标抬起事件的监听 Start
      this.handler.setInputAction((event) => {
        // isEditting = false;
        this.currentPoint = undefined;
      }, Cesium.ScreenSpaceEventType.LEFT_UP);
      // 对鼠标抬起事件的监听 End

      //鼠标右键点击 Start
      this.handler.setInputAction((event) => {
        this.viewer.scene.screenSpaceCameraController.enableRotate = true;
        this.viewer.scene.screenSpaceCameraController.enableZoom = true;
        // if (this.handler !== null && !this.handler.isDestroyed()) {
        //   this.handler.destroy();
        // }
        for (let id of this.pointsId) {
          this.viewer.entities.removeById(id);
        }
        this.pointsId = [];
        this.centerPoint = null;
        this.currentPoint = null;

        var dke = this.gon.rectangle.coordinates.getValue();
        console.log("修改后的面坐标(笛卡尔)：", dke);

        var east = Cesium.Math.toDegrees(dke.east);
        var west = Cesium.Math.toDegrees(dke.west);
        var north = Cesium.Math.toDegrees(dke.north);
        var south = Cesium.Math.toDegrees(dke.south);
        console.log("矩形西南东北坐标:", west, south, east, north);

        this.gon = null;
        //鼠标变成默认
        this.cesiumContainer.style.cursor = "default";
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      //鼠标右键点击 End
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