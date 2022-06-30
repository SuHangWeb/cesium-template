<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
// https://blog.csdn.net/weixin_42776111/article/details/122981291
import Entity from "@/common/cesium/Entity.js";
import Utils from "@/common/cesium/Utils.js";
import { v4 as uuidv4 } from "uuid";
import code from "./module/highlight";
export default {
  name: "dynamicPosition",
  data() {
    return {
      viewer: null,
      _Entity: null,
      _Utils: null,
      ModelEntityArr: [],
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
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        }),
        terrainProvider: new Cesium.CesiumTerrainProvider({
          url: "http://data.marsgis.cn/terrain",
        }),
        shouldAnimate: true,
        timeline: true,
        infoBox: false,
        selectionIndicator: false,
        // sceneMode: 2,
        // scale: 0.1,
        animation: false, //隐藏动画小组件（左下角圆的控件）
      });
      //隐藏底部时间线
      this.viewer.timeline.container.style.display = "none";
      //启用使用场景的光源为地球照明
      this.viewer.scene.globe.enableLighting = true;
      //深度监听
      this.viewer.scene.globe.depthTestAgainstTerrain = true;
      //Set the random number seed for consistent results.
      Cesium.Math.setRandomNumberSeed(3);

      this._Entity = new Entity(Cesium, this.viewer);
      this._Utils = new Utils(Cesium, this.viewer);
      this.start();

      //相机
      this.viewer.camera.setView({
        //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
        destination: Cesium.Cartesian3.fromDegrees(
          123.43382736814452,
          41.811201240193164,
          3000
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
      let ModelEntity = [];
      for (let i = 0; i < 20; i++) {
        // 创建模型 start
        const createModel = this._Entity.createModel({
          id: uuidv4(),
          uri:
            process.env.VUE_APP_PUBLIC_URL +
            "/Vue/Entity/dynamicPosition/qiche.gltf",
          maximumScale: 100,
          minimumPixelSize: 30,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        });
        // 创建模型 end
        ModelEntity.push(createModel);
      }
      this.ModelEntityArr = ModelEntity;
      this.setPosition();
      setInterval(() => {
        this.setPosition();
      }, 20000);
    },
    /**
     * 获取随机位置
     */
    getRandomPoint() {
      const randomPoint = this._Utils.randomPoint({
        start: [123.43408676397446, 41.81120812753955],
        end: [123.45099649125092, 41.81138896519967],
        range: 100,
      });
      return randomPoint;
    },
    getCallbackProperty(startPosition, endPosition) {
      const Cesium = this.cesium;
      let factor = 0;
      const position = new Cesium.CallbackProperty(function (time) {
        if (factor > 5000) {
          factor = 0;
        }
        factor++;
        // 动态更新位置
        return Cesium.Cartesian3.lerp(
          startPosition,
          endPosition,
          factor / 500.0,
          new Cesium.Cartesian3()
        );
      }, false);
      return position;
    },
    setPosition() {
      const Cesium = this.cesium;
      // console.log(this.ModelEntityArr);
      for (let i = 0; i < this.ModelEntityArr.length; i++) {
        const item = this.ModelEntityArr[i];
        // console.log(getEntityPosition);
        //获取随机位置
        let startPosition = "";
        //判断实体位置
        const getEntityPosition = this._Utils.getEntityPosition(item);
        if (getEntityPosition) {
          startPosition = getEntityPosition;
        } else {
          startPosition = this.getRandomPoint();
        }
        let endPosition = this.getRandomPoint();

        const position = this.getCallbackProperty(startPosition, endPosition);
        item.position = position;
        item.orientation = new Cesium.VelocityOrientationProperty(position);
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