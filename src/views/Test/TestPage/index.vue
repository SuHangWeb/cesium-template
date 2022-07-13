<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <button class="button" id="colorClick">改变颜色</button>
  </div>
</template>
 
<script>
export default {
  name: "TextPage",
  data() {
    return {
      viewer: null,
      _clouds: null,
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
    getRandomNumberInRange(minValue, maxValue) {
      const Cesium = this.cesium;
      return minValue + Cesium.Math.nextRandomNumber() * (maxValue - minValue);
    },
    /**
     * 开始
     */
    start() {
      const _this = this;
      const Cesium = this.cesium;
      const scene = this.viewer.scene;
      scene.primitives.add(Cesium.createOsmBuildings());

      let clouds = new Cesium.CloudCollection();
      function createBackLayerClouds() {
        clouds.add({
          position: Cesium.Cartesian3.fromDegrees(-122.6908, 45.496, 300),
          scale: new Cesium.Cartesian2(1500, 250),
          maximumSize: new Cesium.Cartesian3(50, 15, 13),
          color: Cesium.Color.RED,
          slice: 0.3,
        });

        clouds.add({
          position: Cesium.Cartesian3.fromDegrees(-122.72, 45.5, 335),
          scale: new Cesium.Cartesian2(1500, 300),
          maximumSize: new Cesium.Cartesian3(50, 12, 15),
          slice: 0.36,
        });

        clouds.add({
          position: Cesium.Cartesian3.fromDegrees(-122.72, 45.51, 260),
          scale: new Cesium.Cartesian2(2000, 300),
          maximumSize: new Cesium.Cartesian3(50, 12, 15),
          slice: 0.49,
        });
      }

      createBackLayerClouds();
      console.log(clouds.length);
      document.getElementById("colorClick").onclick = function () {
        // console.log(scene.primitives._primitives[1])
        for (let i = 0; i < clouds.length; i++) {
          const c = clouds.get(i);
          console.log(c);
          c.color = Cesium.Color.RED;
          // clouds._clouds[i]._color = Cesium.Color.RED;
        }
      };
      scene.primitives.add(clouds);
      //相机
      this.viewer.camera.flyTo({
        //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
        destination: Cesium.Cartesian3.fromDegrees(-122.6908, 45.496, 300), //经纬度坐标转换为 笛卡尔坐标(世界坐标)
        orientation: {
          heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向
          pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
          roll: 0.0, // default value
        },
        duration: 3, //3秒到达战场
      });
    },
    colorClick() {
      const Cesium = this.cesium;
      console.log(this._clouds._clouds);
      for (let i = 0; i < this._clouds._clouds.length; i++) {
        this._clouds._clouds[i]._color = this.getColor("red");
      }
    },
    getColor(colorName) {
      const Cesium = this.cesium;
      return Cesium.Color[colorName.toUpperCase()];
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
.button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 2;
}
</style>