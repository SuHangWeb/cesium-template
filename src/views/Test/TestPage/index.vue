<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
export default {
  name: "TextPage",
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
    // https://blog.csdn.net/u010358183/article/details/122055553
    start() {
      const Cesium = this.cesium;
      const viewer = this.viewer;

      // 声明变量，以下代码可能会多次用到
      let scene = viewer.scene;
      let canvas = viewer.canvas; // 此处用viewer.canvas或viewer.scene.canvas都可以，是同一个canvas对象
      let camera = viewer.camera;
      let ellipsoid = viewer.scene.globe.ellipsoid;
      // 声明相机漫游标记
      let flags = null;
      // 声明handler
      let handler = null;

      /**
       * 进入键盘鼠标漫游模式
       */
      function enterKeyBoardMouseRoamingMode() {
        console.log("进入漫游模式");
        // 1.禁用默认相机操作模式
        scene.screenSpaceCameraController.enableRotate = false;
        scene.screenSpaceCameraController.enableTranslate = false;
        scene.screenSpaceCameraController.enableZoom = false;
        scene.screenSpaceCameraController.enableTilt = false;
        scene.screenSpaceCameraController.enableLook = false;

        // 2.初始化相机漫游的标记
        flags = {
          looking: false, // 是否正在用鼠标调整视角
          startPosition: null, // 鼠标指针开始移动位置
          endPosition: null, // 鼠标指针停止移动位置
          moveForward: false, // 是否向前移动
          moveBackward: false, // 是否向后移动
          moveLeft: false, // 是否向左移动
          moveRight: false, // 是否向右移动
          moveUp: false, // 是否向上移动
          moveDown: false, // 是否向下移动
        }; // 相机漫游标记

        // 3.添加鼠标监听事件
        handler = new Cesium.ScreenSpaceEventHandler(canvas);
        // 左键按下
        handler.setInputAction((movement) => {
          flags.looking = true;
          flags.startPosition = Cesium.Cartesian3.clone(movement.position);
          flags.endPosition = Cesium.Cartesian3.clone(movement.position);
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
        // 鼠标移动
        handler.setInputAction((movement) => {
          flags.endPosition = movement.endPosition;
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        // 左键弹起
        handler.setInputAction(() => {
          flags.looking = false;
        }, Cesium.ScreenSpaceEventType.LEFT_UP);

        // 4.添加键盘监听事件
        // 键盘按下事件
        document.addEventListener("keydown", keyDown, false);
        // 键盘弹起事件
        document.addEventListener("keyup", keyUp, false);

        // 5.添加渲染事件
        viewer.clock.onTick.addEventListener(renderEvent);
      }

      // DOM添加一个开启键盘鼠标漫游模式的按钮，使用绝对定位放在屏幕左上角，用于测试
      let enterButton = document.createElement("button");
      enterButton.innerText = "开启";
      enterButton.style.position = "absolute";
      enterButton.style.left = "20px";
      enterButton.style.top = "20px";
      enterButton.onclick = enterKeyBoardMouseRoamingMode;
      document.body.appendChild(enterButton);

      /**
       * 退出键盘鼠标漫游模式
       */
      function exitKeyBoardMouseRoamingMode() {
        console.log("退出漫游");
        // 1.移除鼠标监听事件
        if (handler) {
          handler.destroy();
          handler = null;
        }

        // 2.移除键盘监听事件
        document.removeEventListener("keydown", keyDown, false);
        document.removeEventListener("keyup", keyUp, false);

        // 3.移除渲染事件
        viewer.clock.onTick.removeEventListener(renderEvent);

        // 4.启用默认相机操作模式
        scene.screenSpaceCameraController.enableRotate = true;
        scene.screenSpaceCameraController.enableTranslate = true;
        scene.screenSpaceCameraController.enableZoom = true;
        scene.screenSpaceCameraController.enableTilt = true;
        scene.screenSpaceCameraController.enableLook = true;
      }

      // DOM添加一个关闭键盘鼠标漫游模式的按钮，使用绝对定位放在屏幕左上角，用于测试
      let exitButton = document.createElement("button");
      exitButton.innerText = "关闭";
      exitButton.style.position = "absolute";
      exitButton.style.left = "70px";
      exitButton.style.top = "20px";
      exitButton.onclick = exitKeyBoardMouseRoamingMode;
      document.body.appendChild(exitButton);

      /**
       * 键盘按下
       */
      function keyDown(event) {
        let flagName = getFlagFromKeyCode(event.keyCode);
        if (typeof flagName !== "undefined") {
          flags[flagName] = true;
        }
      }

      /**
       * 键盘弹起
       */
      function keyUp(event) {
        let flagName = getFlagFromKeyCode(event.keyCode);
        if (typeof flagName !== "undefined") {
          flags[flagName] = false;
        }
      }

      /**
       * 渲染函数
       */
      function renderEvent() {
        // 镜头转向
        if (flags.looking) {
          let width = viewer.canvas.clientWidth;
          let height = viewer.canvas.clientHeight;
          let lookFactor = 0.05; // 镜头转向系数，系数越大约灵敏，此处取0.05比较适中
          let x = (flags.endPosition.x - flags.startPosition.x) / width;
          let y = -(flags.endPosition.y - flags.startPosition.y) / height;
          // 计算出x,y之后，有两种方式实现镜头，经过测试感觉方式 1更流畅
          // 方式 1
          camera.lookRight(x * lookFactor);
          camera.lookUp(y * lookFactor);
          // 方式 2
          // camera.setView({
          //   orientation: {
          //     heading: camera.heading + x * lookFactor,
          //     pitch: camera.pitch + y * lookFactor,
          //     roll: 0.0,
          //   },
          // });
        }
        // 根据高度来决定镜头移动的速度
        let cameraHeight = ellipsoid.cartesianToCartographic(
          camera.position
        ).height;
        let moveRate = cameraHeight / 100.0;
        if (flags.moveForward) {
          camera.moveForward(moveRate);
        }
        if (flags.moveBackward) {
          camera.moveBackward(moveRate);
        }
        if (flags.moveUp) {
          camera.moveUp(moveRate);
        }
        if (flags.moveDown) {
          camera.moveDown(moveRate);
        }
        if (flags.moveLeft) {
          camera.moveLeft(moveRate);
        }
        if (flags.moveRight) {
          camera.moveRight(moveRate);
        }
      }

      /**
       * 从键盘码获取flag标记
       */
      function getFlagFromKeyCode(keyCode) {
        switch (keyCode) {
          case "W".charCodeAt(0):
            return "moveForward";
          case "S".charCodeAt(0):
            return "moveBackward";
          case "Q".charCodeAt(0):
            return "moveUp";
          case "E".charCodeAt(0):
            return "moveDown";
          case "D".charCodeAt(0):
            return "moveRight";
          case "A".charCodeAt(0):
            return "moveLeft";
          default:
            return undefined;
        }
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