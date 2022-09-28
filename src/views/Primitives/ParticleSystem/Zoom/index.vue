<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import Entity from "@/common/cesium/Entity.js";
export default {
  data() {
    return {
      viewer: null,
      _Entity: null
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
      this._Entity = new Entity(Cesium, this.viewer);
      //深度监听
      this.viewer.scene.globe.depthTestAgainstTerrain = false;
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;
      var position = Cesium.Cartesian3.fromDegrees(119.9015668093, 31.4943207228, 0);
      var buildinghpr = new Cesium.HeadingPitchRoll(0, 0, 0);
      var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, buildinghpr);

      // 创建模型 start
      const createModel = this._Entity.createModel({
        position,
        uri:
          process.env.VUE_APP_PUBLIC_URL +
          "/Vue/Entity/dynamicPosition/qiche.gltf",
        maximumScale: 100,
        minimumPixelSize: 30,
        orientation: orientation,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      });
      this.viewer.flyTo(createModel);

      this.viewer.trackedEntity = createModel;

      //定义
      var viewModel = {         //对象
        emissionRate: 3.0, //发射频率
        gravity: 0.0, //地球引力
        minimumParticleLife: 1,  // 生命周期在5秒和10秒之间
        maximumParticleLife: 5,
        minimumSpeed: 20,   //运行速度Speed发射器控制了粒子的位置和方向，速度通过speed参数或者minimumSpeed和maximumSpeed    让粒子每秒运行20~50米:
        maximumSpeed: 50,
        startScale: 1.0,      //例子发射开始范围
        endScale: 10,        //粒子发射结束范围
        particleSize: 25.0      //颗粒大小
      };


      var emitterModelMatrixScratch = new Cesium.Matrix4();
      var position1 = Cesium.Cartesian3.fromDegrees(119.9015668093, 31.4943207228, 60);
      var emitterModelMatrix = Cesium.Matrix4.fromTranslation(position1, emitterModelMatrixScratch);

      var particleSystem = this.viewer.scene.primitives.add(
        new Cesium.ParticleSystem({   //粒子系统管理粒子集合的更新和显示。
          image: process.env.VUE_APP_PUBLIC_URL + '/image/fire.png',  //原始的
          startColor: Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
          endColor: Cesium.Color.WHITE.withAlpha(0.0),
          startScale: viewModel.startScale,
          endScale: viewModel.endScale,
          minimumParticleLife: viewModel.minimumParticleLife,
          maximumParticleLife: viewModel.maximumParticleLife,
          minimumSpeed: viewModel.minimumSpeed,
          maximumSpeed: viewModel.maximumSpeed,
          imageSize: new Cesium.Cartesian2(viewModel.particleSize, viewModel.particleSize),
          maximumImageSize: new Cesium.Cartesian2(viewModel.particleSize * 2, viewModel.particleSize * 2),
          emissionRate: viewModel.emissionRate,
          bursts: [  //在周期性的时间发射粒子爆发。在给定时刻，这些爆炸效果会产生随机个粒子，在设定最少和最多值之间。
            new Cesium.ParticleBurst({ time: 5.0, minimum: 10, maximum: 100 }),
            new Cesium.ParticleBurst({ time: 10.0, minimum: 50, maximum: 100 }),
          ],
          lifetime: 16.0,     //粒子系统发射粒子的时间（以秒为单位）。
          emitter: new Cesium.CircleEmitter(0.1),//从圆形发射粒子的粒子发射器    半径以米为单位
          emitterModelMatrix: emitterModelMatrix,
        }));


      this.viewer.scene.preRender.addEventListener(() => {
        var distance = this.getSpaceDistance(Cesium.Cartographic.fromCartesian(position1), this.viewer.camera.positionCartographic);
        if (distance < 100) {
          particleSystem.startScale = viewModel.startScale;
          particleSystem.endScale = viewModel.endScale;
        } else {
          particleSystem.startScale = viewModel.startScale * 100 / distance;
          particleSystem.endScale = viewModel.endScale * 100 / distance;
        }
        particleSystem.show = distance < 1000000;
      });
    },
    //空间两点距离计算函数
    getSpaceDistance(pt1, pt2) {
      const Cesium = this.cesium;
      var point1cartographic = pt1;
      var point2cartographic = pt2;
      /**根据经纬度计算出距离**/
      var geodesic = new Cesium.EllipsoidGeodesic();
      geodesic.setEndPoints(point1cartographic, point2cartographic);
      var distance = geodesic.surfaceDistance;
      //返回两点之间的距离
      distance = Math.sqrt(Math.pow(distance, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
      return distance;
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