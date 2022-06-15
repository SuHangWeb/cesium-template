export default [
  {
    codeLanguage: "VUE",
    relyOn: [
      {
        label: "Canvas.js",
        url: "cesium/Canvas.js"
      },
      {
        label: "Entity.js",
        url: "cesium/Entity.js"
      },
      {
        label: "operationPanel.vue",
        url: "Vue/Entity/textMap/rectangle/operationPanel.vue"
      },
    ],
    code: [
      {
        codeLanguage: "html",
        content: `<div class="container">
                    <div id="cesiumContainer"></div>
                    <operation-panel
                      @draw="drawStart"
                      @edit="editRect"
                      :edit="rectArr.length != 0"
                    />
                  </div>`
      },
      {
        codeLanguage: "js",
        content: `import Canvas from "@/common/cesium/Canvas";
                  import Entity from "@/common/cesium/Entity";
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
                                  id: 'Point-'+ new Date().getTime() +'-index-'+index,
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
                                id: 'centerPoint-'+ new Date().getTime()',
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
                  };`
      },
      {
        codeLanguage: "css",
        content: `.container {
                    width: 100%;
                    height: 100%;
                    #cesiumContainer {
                      width: 100%;
                      height: 100%;
                    }
                  }`
      }
    ]
  },
  {
    codeLanguage: "JS",
    relyOn: [
      {
        label: "Utils.js",
        url: "JavaScript/cesium/Utils.js"
      },
      {
        label: "Entity.js",
        url: "JavaScript/cesium/Entity.js"
      },
      {
        label: "openTextMapCreateElement.js",
        url: "JavaScript/Html/htmlPopup/rectangle/openTextMapCreateElement.js"
      },
    ],
    code: [
      {
        codeLanguage: "js",
        content: `
                  //贴图变量
                  var textMapvariable = {
                      rect: null,
                      canvasDom: null,
                      handler: null,
                      _Entity: null,
                      startPoint: null,
                      rectArr: [],
                      //当前编辑事件
                      gon: null,
                      //编辑点集合
                      pointsId: [],
                      //中心点
                      centerPoint: null,
                      //当前编辑点
                      currentPoint: null,
                  }
        
                  //添加操作面板
                  function openTextMap() {
                      const _Utils = new Utils()
                      _Utils.operationDom('append', 'MainCenter', openTextMapCreateElement('textMap-'+new Date().getTime()))


                      //设置贴地效果
                      viewer.scene.globe.depthTestAgainstTerrain = false;
                      //创建事件载体
                      textMapvariable.handler = new Cesium.ScreenSpaceEventHandler(
                          viewer.scene.canvas
                      );
                      textMapvariable._Entity = new Entity(Cesium, viewer)
                      textMapvariable.canvasDom = document.getElementById('sceneView')

                      //相机(定位到了 沈河区惠工广场)
                      viewer.camera.flyTo({
                          //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
                          destination: Cesium.Cartesian3.fromDegrees(
                              123.4338589341694,
                              41.811889939097895,
                              2000
                          ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)
                          orientation: {
                              heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向
                              pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
                              roll: 0.0, // default value
                          },
                          duration: 3, //3秒到达战场
                      });
                  }
                  //启动 先添加操作面板 剩余操作全部都在操作面板上执行操作
                  openTextMap()


                  /**
                   * 开始绘制
                   */
                  function TextMapDrawStart() {
                      const formData = {
                          fontSize: 200,
                          color: document.getElementById("textMap-color").value,
                          is_animation: document.getElementById("textMap-switch").checked,
                          terrainValue: document.getElementById("textMap-select").value,
                          text: document.getElementById("textMap-text").value,
                      }
                      if (formData.color == "") {
                          layer.msg('请选择颜色', { icon: 5 });
                          return
                      }
                      if (formData.terrainValue == "") {
                          layer.msg('请选择地形', { icon: 5 });
                          return
                      }
                      if (formData.text == "") {
                          layer.msg('请输入文字', { icon: 5 });
                          return
                      }

                      textMapvariable.rect = null;

                      //鼠标变成加号
                      textMapvariable.canvasDom.style.cursor = "crosshair";
                      //进制地图移动
                      viewer.scene.screenSpaceCameraController.enableRotate = false;
                      viewer.scene.screenSpaceCameraController.enableZoom = false;

                      //鼠标点击事件 Start
                      textMapvariable.handler.setInputAction((event) => {
                          //获取加载地形后对应的经纬度和高程：地标坐标
                          var ray = viewer.camera.getPickRay(event.position);
                          var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
                          // console.log("cartesian:", cartesian);
                          if (!Cesium.defined(cartesian)) {
                              return;
                          }

                          //绘制初始点位
                          textMapvariable.startPoint = textMapvariable._Entity.createPoint({
                              position: cartesian,
                              color: Cesium.Color.CHARTREUSE.withAlpha(1),
                              pixelSize: 10,
                              heightReference: Cesium.HeightReference[formData.terrainValue],
                              outlineColor: Cesium.Color.WHITE,
                              outlineWidth: 1,
                          });

                          //绘制矩形
                          textMapvariable.rect = textMapvariable._Entity.createRectangle({
                              coordinates: Cesium.Rectangle.fromCartesianArray([
                                  cartesian,
                                  cartesian,
                              ]),
                              material: Cesium.Color.GREENYELLOW.withAlpha(0.5),
                              outline: true,
                              outlineColor: Cesium.Color.WHITE,
                              outlineWidth: 3,
                              heightReference: Cesium.HeightReference[formData.terrainValue],
                          });
                      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
                      //鼠标点击事件 End

                      // 对鼠标移动事件的监听 Start
                      textMapvariable.handler.setInputAction((event) => {
                          //判断已经存在初始位置
                          if (textMapvariable.startPoint == null || textMapvariable.rect == null) {
                              return;
                          }

                          //获取加载地形后对应的经纬度和高程：地标坐标
                          var ray = viewer.camera.getPickRay(event.endPosition);
                          var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
                          if (!cartesian) {
                              return;
                          }

                          //在固定的帧中在指定的时间获取属性的值。
                          var startCartesian = textMapvariable.startPoint.position.getValue(
                              Cesium.JulianDate.now()
                          );

                          textMapvariable.rect.rectangle.coordinates = new Cesium.CallbackProperty(
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
                      textMapvariable.handler.setInputAction((event) => {
                          //鼠标变成默认
                          textMapvariable.canvasDom.style.cursor = "default";
                          //恢复试图缩放功能
                          viewer.scene.screenSpaceCameraController.enableRotate = true;
                          viewer.scene.screenSpaceCameraController.enableZoom = true;
                          //移除点位
                          viewer.entities.remove(textMapvariable.startPoint);
                          //移除地图鼠标点击事件
                          textMapvariable.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
                          //移除地图鼠标移动事件
                          textMapvariable.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                          //移除地图鼠标抬起事件
                          textMapvariable.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP);

                          //赋值材质
                          textMapvariable.rect.rectangle.outline = false;
                          const _Canvas = new Canvas(Cesium, viewer);
                          const image = _Canvas.drawText({
                              text: formData.text,
                              color: formData.color,
                              fontSize: formData.fontSize,
                          });

                          textMapvariable.rect.rectangle.material = new Cesium.ImageMaterialProperty({
                              //image 定要使用的图像，URL，画布或视频的属性。
                              image,
                              repeat: new Cesium.Cartesian2(1, 1), //获取或设置 Cartesian2 属性，该属性指定图像在每个方向上重复的次数。
                              transparent: true, //图像是否具有透明度
                              color: Cesium.Color.WHITE, //图像的所需颜色。
                          });

                          // 动画 start
                          if (formData.is_animation) {
                              //如果应对广告牌，折线，标签等图元进行深度测试，则为true抵靠地形表面 否则反之
                              viewer.scene.globe.depthTestAgainstTerrain = false;
                              let rotation = Cesium.Math.toRadians(30);
                              function getRotationValue() {
                                  return (rotation += 0.005);
                              }
                              textMapvariable.rect.rectangle.rotation = new Cesium.CallbackProperty(
                                  getRotationValue,
                                  false
                              );
                              textMapvariable.rect.rectangle.stRotation = new Cesium.CallbackProperty(
                                  getRotationValue,
                                  false
                              );
                          }
                          // 动画 end

                          //数据赋值
                          textMapvariable.rectArr.push(textMapvariable.rect);

                          var dke = textMapvariable.rect.rectangle.coordinates.getValue();
                          console.log("修改后的面坐标(笛卡尔)：", dke);
                          var east = Cesium.Math.toDegrees(dke.east);
                          var west = Cesium.Math.toDegrees(dke.west);
                          var north = Cesium.Math.toDegrees(dke.north);
                          var south = Cesium.Math.toDegrees(dke.south);
                          console.log("矩形西南东北坐标:", west, south, east, north);
                      }, Cesium.ScreenSpaceEventType.LEFT_UP);
                      // 对鼠标抬起事件的监听(结束点采集) End
                  }


                  /**
                   * 编辑矩形
                   */
                  function TextMapDrawEdit() {
                      if (textMapvariable.rectArr.length == 0) {
                          layer.msg('好像并没有绘制的矩形哦，先去画一个吧', { icon: 5 });
                          return
                      }
                      //是否进入编辑
                      var isEditting = false;
                      textMapvariable.canvasDom.style.cursor = "pointer";
                      //去掉双击事件
                      viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
                          Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
                      );

                      //鼠标点击事件 Start
                      textMapvariable.handler.setInputAction((event) => {
                          const windowPosition = event.position;
                          const pickedObject = viewer.scene.pick(windowPosition);
                          // console.log(pickedObject);
                          if (Cesium.defined(pickedObject)) {
                              const entity = pickedObject.id;
                              // console.log(entity)
                              const rectArr = textMapvariable.rectArr.filter((item) => item.id == entity.id);
                              if (rectArr.length != 0 && !isEditting) {
                                  textMapvariable.gon = entity;
                                  // 生成边界编辑点
                                  const degrees = textMapvariable.gon.rectangle.coordinates.getValue();
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
                                      let point = textMapvariable._Entity.createPoint({
                                          id: 'Point-' + new Date().getTime() + '-index-' + index,
                                          name: "rect_point",
                                          position: item,
                                          color: Cesium.Color.CHARTREUSE.withAlpha(1),
                                          pixelSize: 10,
                                          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //贴地
                                          outlineColor: Cesium.Color.WHITE,
                                          outlineWidth: 1,
                                      });
                                      point.flag = item.flag;
                                      textMapvariable.pointsId.push(point.id);
                                  });
                                  // 生成中心编辑点
                                  const centerLng = (degrees.west + degrees.east) / 2;
                                  const centerLat = (degrees.north + degrees.south) / 2;
                                  const rect_center_cartesian = Cesium.Cartesian3.fromRadians(
                                      centerLng,
                                      centerLat
                                  );
                                  let centerPoint = textMapvariable._Entity.createPoint({
                                      id: 'centerPoint-' + new Date().getTime(),
                                      name: "rect_point",
                                      position: rect_center_cartesian,
                                      color: Cesium.Color.RED,
                                      pixelSize: 10,
                                      outlineColor: Cesium.Color.BLACK,
                                      outlineWidth: 1,
                                      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //贴地
                                  });
                                  centerPoint.flag = "centerPoint";
                                  textMapvariable.pointsId.push(centerPoint.id);

                                  isEditting = true;
                                  viewer.scene.screenSpaceCameraController.enableRotate = false;
                                  viewer.scene.screenSpaceCameraController.enableZoom = false;
                              } else if (entity.name === "rect_point") {
                                  textMapvariable.currentPoint = entity;
                              }
                          }
                      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
                      //鼠标点击事件 End

                      // 对鼠标移动事件的监听 Start
                      textMapvariable.handler.setInputAction((event) => {
                          if (
                              isEditting &&
                              textMapvariable.currentPoint &&
                              textMapvariable.currentPoint.name == "rect_point"
                          ) {
                              //获取加载地形后对应的经纬度和高程：地标坐标
                              const ray = viewer.camera.getPickRay(event.endPosition);
                              const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
                              let points = [];
                              if (!cartesian) {
                                  return;
                              }
                              //更新当前点的位置
                              textMapvariable.currentPoint.position = cartesian;
                              for (var i = 0; i < textMapvariable.pointsId.length; i++) {
                                  if (textMapvariable.currentPoint.id == textMapvariable.pointsId[i]) {
                                      var objTemp = textMapvariable.currentPoint.position._value;
                                      objTemp.flag = textMapvariable.currentPoint.flag;
                                      points.push(objTemp);
                                  } else {
                                      var id = textMapvariable.pointsId[i];
                                      var objTemp = viewer.entities.getById(id).position._value;
                                      objTemp.flag = viewer.entities.getById(id).flag;
                                      points.push(objTemp);
                                  }
                              }
                              if (typeof textMapvariable.currentPoint == "undefined") {
                                  var radians = Cesium.Rectangle.fromDegrees(
                                      west,
                                      south,
                                      east,
                                      north
                                  );
                                  return radians;
                              }

                              //当前移动是哪个点，获取新的矩形边界
                              const ellipsoid = viewer.scene.globe.ellipsoid;
                              let lngArr = [];
                              let latArr = [];
                              if (
                                  textMapvariable.currentPoint.flag == "westNorth" ||
                                  textMapvariable.currentPoint.flag == "eastSouth"
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
                                  textMapvariable.currentPoint.flag == "eastNorth" ||
                                  textMapvariable.currentPoint.flag == "westSouth"
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
                              } else if (textMapvariable.currentPoint.flag == "centerPoint") {
                                  const cartographic = ellipsoid.cartesianToCartographic(
                                      textMapvariable.currentPoint.position._value
                                  );
                                  const centerLng = Cesium.Math.toDegrees(cartographic.longitude);
                                  const centerLat = Cesium.Math.toDegrees(cartographic.latitude);
                                  //console.log("centerLng",centerLng);
                                  const rectInfo = textMapvariable.gon.rectangle.coordinates.getValue();
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
                              for (let i = 0; i < textMapvariable.pointsId.length; i++) {
                                  let id = textMapvariable.pointsId[i];
                                  let entityTemp = viewer.entities.getById(id);
                                  if (
                                      typeof entityTemp != "undefined" &&
                                      typeof textMapvariable.currentPoint != "undefined"
                                  ) {
                                      if (entityTemp.flag != textMapvariable.currentPoint.flag) {
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
                                  textMapvariable.currentPoint = undefined;
                                  return;
                              }

                              var radians = Cesium.Rectangle.fromDegrees(west, south, east, north);
                              //更新矩形位置
                              textMapvariable.gon.rectangle.coordinates = new Cesium.CallbackProperty(
                                  function (time, result) {
                                      return radians;
                                  },
                                  false
                              );
                          }
                      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                      // 对鼠标移动事件的监听 End

                      // 对鼠标抬起事件的监听 Start
                      textMapvariable.handler.setInputAction((event) => {
                          // isEditting = false;
                          textMapvariable.currentPoint = undefined;
                      }, Cesium.ScreenSpaceEventType.LEFT_UP);
                      // 对鼠标抬起事件的监听 End

                      //鼠标右键点击 Start
                      textMapvariable.handler.setInputAction((event) => {
                          viewer.scene.screenSpaceCameraController.enableRotate = true;
                          viewer.scene.screenSpaceCameraController.enableZoom = true;
                          // if (this.handler !== null && !this.handler.isDestroyed()) {
                          //   this.handler.destroy();
                          // }
                          for (let id of textMapvariable.pointsId) {
                              viewer.entities.removeById(id);
                          }
                          textMapvariable.pointsId = [];
                          textMapvariable.centerPoint = null;
                          textMapvariable.currentPoint = null;

                          var dke = textMapvariable.gon.rectangle.coordinates.getValue();
                          console.log("修改后的面坐标(笛卡尔)：", dke);

                          var east = Cesium.Math.toDegrees(dke.east);
                          var west = Cesium.Math.toDegrees(dke.west);
                          var north = Cesium.Math.toDegrees(dke.north);
                          var south = Cesium.Math.toDegrees(dke.south);
                          console.log("矩形西南东北坐标:", west, south, east, north);

                          textMapvariable.gon = null;
                          //鼠标变成默认
                          textMapvariable.canvasDom.style.cursor = "default";
                      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
                      //鼠标右键点击 End

                  }
                  `
      },
      {
        codeLanguage: "css",
        content: `.textMap-popup {
                      width: 400px;
                      position: fixed;
                      bottom: 0;
                      right: 0;
                      z-index: 9;
                      background-color: rgba(0, 0, 0, 0.5);
                      padding: 20px;
                  
                      .textMap-popup-close-button {
                          position: absolute;
                          top: 10px;
                          right: 10px;
                          color: #fff !important;
                          font-size: 18px;
                          cursor: pointer;
                  
                          &:hover {
                              opacity: 0.8;
                          }
                      }
                  
                      .tip {
                          color: #fff;
                          font-size: 14px;
                      }
                  
                      .form-item {
                          margin-top: 10px;
                          display: flex;
                          align-items: center;
                  
                          .label {
                              width: 60px;
                              color: #fff;
                              font-size: 16px;
                          }
                  
                          .value {
                              margin-left: 10px;
                              flex: 1;
                  
                              .select {
                                  -webkit-appearance: none;
                                  background-color: #fff;
                                  background-image: none;
                                  border-radius: 4px;
                                  border: 1px solid #dcdfe6;
                                  box-sizing: border-box;
                                  color: #606266;
                                  display: inline-block;
                                  font-size: inherit;
                                  height: 40px;
                                  line-height: 40px;
                                  outline: none;
                                  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                                  width: 100%;
                                  padding-left: 10px;
                              }
                  
                              .text {
                                  height: 40px;
                                  width: 100%;
                                  box-sizing: border-box;
                                  padding-left: 10px;
                                  border: 0;
                                  background-color: #fff;
                                  border-radius: 4px;
                                  border: 1px solid #dcdfe6;
                              }
                  
                          }
                  
                          button {
                              display: inline-block;
                              line-height: 1;
                              white-space: nowrap;
                              cursor: pointer;
                              background: #fff;
                              border: 1px solid #dcdfe6;
                              color: #606266;
                              -webkit-appearance: none;
                              text-align: center;
                              box-sizing: border-box;
                              outline: none;
                              margin: 0;
                              transition: .1s;
                              font-weight: 500;
                              -moz-user-select: none;
                              -webkit-user-select: none;
                              -ms-user-select: none;
                              padding: 12px 20px;
                              font-size: 14px;
                              border-radius: 4px;
                              margin-right: 10px;
                  
                              &.primary {
                                  color: #409eff;
                                  background: #ecf5ff;
                                  border-color: #b3d8ff;
                              }
                  
                              &.warning {
                                  color: #e6a23c;
                                  background: #fdf6ec;
                                  border-color: #f5dab1;
                              }
                          }
                      }
                  }`
      }
    ]
  },
]