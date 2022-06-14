<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import Primitives from "@/common/cesium/Primitives.js";
import Entity from "@/common/cesium/Entity.js";
export default {
  name: "AircraftTailFlame",
  data() {
    return {
      viewer: null,
      _Primitives: null,
      _Entity: null,
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
      //设置贴地效果 是否开启深度检测
      // this.viewer.scene.globe.depthTestAgainstTerrain = false;
      this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //循环结束
      this.viewer.clock.multiplier = 1;
      // this.viewer.clock.shouldAnimate = true;
      this._Entity = new Entity(Cesium, this.viewer);
      this._Primitives = new Primitives(Cesium, this.viewer);
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;
      // 创建模型 start
      const createModel = this._Entity.createModel({
        position: Cesium.Cartesian3.fromDegrees(
          123.42083739746174,
          41.814722258554795,
          1000.0
        ),
        //控制位偏移
        // viewFrom: new Cesium.Cartesian3(-100.0, 0.0, 100.0),
        uri: "/glb/Cesium_Air.glb",
        minimumPixelSize: 100,
      });
      // 创建模型 end

      //相机当前正在跟踪的Entity实例
      this.viewer.trackedEntity = createModel;

      //相机操作
      // this.viewer.flyTo(createModel, {
      //   duration: 3,
      // });
      this.viewer.camera.setView({
        //setView是直接跳到 flyTo// 是镜头飞行到  网速不好或者电脑配置不高 还是不要fly了吧
        destination: Cesium.Cartesian3.fromDegrees(
          123.42083739746174,
          41.814722258554795,
          1200.0
        ), //经纬度坐标转换为 笛卡尔坐标(世界坐标)
        //欧拉角
        orientation: {
          heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //东西南北朝向
          pitch: Cesium.Math.toRadians(-90.0), // default value (looking down)  //俯视仰视视觉
          roll: 0.0, // default value
        },
        duration: 3, //3秒到达战场
      });

      // computeEmitterModelMatrix 方法使用 start
      var emitterModelMatrix = new Cesium.Matrix4();
      var translation = new Cesium.Cartesian3();
      var rotation = new Cesium.Quaternion();
      var hpr = new Cesium.HeadingPitchRoll();
      var trs = new Cesium.TranslationRotationScale();
      // computeEmitterModelMatrix 方法使用 end
      var gravityScratch = new Cesium.Cartesian3();

      const methodsRight = {
        /**
         * 计算当前时间点飞机模型的位置矩阵
         * @param {*} entity 模型
         * @param {*} time
         */
        computeModelMatrix: (entity, time) => {
          return entity.computeModelMatrix(time, new Cesium.Matrix4());
        },
        /**
         * 计算引擎(粒子发射器)位置矩阵
         * 控制粒子发射的方向
         */
        computeEmitterModelMatrix: () => {
          /**
           * Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0, hpr)
           * 旋转表示为航向，俯仰和横滚。标题是围绕负Z轴。节距是绕负y轴的旋转。滚动是关于正x轴。
           * 参数：
           * heading/弧度的航向分量。
           * pitch/弧度的螺距分量
           * Number/滚动分量（以弧度为单位）
           */
          hpr = Cesium.HeadingPitchRoll.fromDegrees(90.0, 0.0, 90.0, hpr);
          /**
           *  Cesium.Cartesian3.fromElements (x, y, z, result )
           * 根据x，y和z坐标创建Cartesian3实例。
           * x/x坐标。
           * y/y坐标。
           * z/z坐标。
           * result/将结果存储到的对象。
           */
          trs.translation = Cesium.Cartesian3.fromElements(
            -3,
            -3.5,
            0.5,
            translation
          );
          /**
           *  Cesium.Quaternion.fromHeadingPitchRoll (headingPitchRoll, result )
           * 根据给定的航向，俯仰和横滚角计算旋转角度。标题是围绕负Z轴。节距是绕负y轴的旋转。滚动是关于正x轴。
           * headingPitchRoll/旋转表示为航向，俯仰和横滚
           * result/将结果存储到的对象。
           */
          trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);
          /**
           * 一个4x4矩阵，可索引为列主序数组。构造函数参数按行顺序排列，以提高代码的可读性。
           */
          return Cesium.Matrix4.fromTranslationRotationScale(
            trs,
            emitterModelMatrix
          );
        },
      };
      const methodsLeft = {
        /**
         * 计算当前时间点飞机模型的位置矩阵
         * @param {*} entity 模型
         * @param {*} time
         */
        computeModelMatrix: (entity, time) => {
          return entity.computeModelMatrix(time, new Cesium.Matrix4());
        },
        /**
         * 计算引擎(粒子发射器)位置矩阵
         * 控制粒子发射的方向
         */
        computeEmitterModelMatrix: () => {
          /**
           * Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0, hpr)
           * 旋转表示为航向，俯仰和横滚。标题是围绕负Z轴。节距是绕负y轴的旋转。滚动是关于正x轴。
           * 参数：
           * heading/弧度的航向分量。
           * pitch/弧度的螺距分量
           * Number/滚动分量（以弧度为单位）
           */
          hpr = Cesium.HeadingPitchRoll.fromDegrees(90.0, 0.0, 90.0, hpr);
          /**
           *  Cesium.Cartesian3.fromElements (x, y, z, result )
           * 根据x，y和z坐标创建Cartesian3实例。
           * x/x坐标。
           * y/y坐标。
           * z/z坐标。
           * result/将结果存储到的对象。
           */
          trs.translation = Cesium.Cartesian3.fromElements(
            -3,
            3.5,
            0.5,
            translation
          );
          /**
           *  Cesium.Quaternion.fromHeadingPitchRoll (headingPitchRoll, result )
           * 根据给定的航向，俯仰和横滚角计算旋转角度。标题是围绕负Z轴。节距是绕负y轴的旋转。滚动是关于正x轴。
           * headingPitchRoll/旋转表示为航向，俯仰和横滚
           * result/将结果存储到的对象。
           */
          trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);
          /**
           * 一个4x4矩阵，可索引为列主序数组。构造函数参数按行顺序排列，以提高代码的可读性。
           */
          return Cesium.Matrix4.fromTranslationRotationScale(
            trs,
            emitterModelMatrix
          );
        },
      };
      //创建粒子 start
      //通用的配置
      const CommonConfig = {
        image: "/image/fire.png",
        /**
         * 每帧都要调用一次回调函数以更新粒子。
         * @param {*} particle 正在更新粒子。
         * @param {*} dt 自上次更新以来的时间（秒）
         * 重力
         */
        updateCallback: (particle, dt) => {
          var position = particle.position;
          Cesium.Cartesian3.normalize(position, gravityScratch);
          Cesium.Cartesian3.multiplyByScalar(
            gravityScratch,
            0 * dt,
            gravityScratch
          );
          particle.velocity = Cesium.Cartesian3.add(
            particle.velocity,
            gravityScratch,
            particle.velocity
          );
        },
        //模型
        entity: createModel,
        startColor: Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
        endColor: Cesium.Color.WHITE.withAlpha(0.0),
        startScale: 1,
        endScale: 10,
        particleLife: 1,
        minimumParticleLife: 0.1,
        maximumParticleLife: 0.2,
        minimumSpeed: 3,
        maximumSpeed: 2,
        imageSize: new Cesium.Cartesian2(3, 3),
        emissionRate: 30,
        bursts: [
          new Cesium.ParticleBurst({
            time: 0.1,
            minimum: 10,
            maximum: 50,
          }),
          new Cesium.ParticleBurst({
            time: 0.2,
            minimum: 20,
            maximum: 50,
          }),
          new Cesium.ParticleBurst({
            time: 0.3,
            minimum: 50,
            maximum: 100,
          }),
        ],
        lifetime: 0.4,
        emitter: new Cesium.CircleEmitter(0.5),
        modelMatrix: () => {
          return createModel.computeModelMatrix(
            Cesium.JulianDate.now(),
            new Cesium.Matrix4()
          );
        },
      };
      const createParticleSystemRight = this._Primitives.createParticleSystem({
        emitterModelMatrix: methodsRight.computeEmitterModelMatrix(),
        ...CommonConfig,
      });
      const createParticleSystemLeft = this._Primitives.createParticleSystem({
        emitterModelMatrix: methodsLeft.computeEmitterModelMatrix(),
        ...CommonConfig,
      });
      //创建粒子 end

      //获取在更新或渲染场景之前将引发的事件。活动订阅者将Scene实例作为第一个参数，将当前时间作为第二个参数。
      this.viewer.scene.preUpdate.addEventListener((scene, time) => {
        createParticleSystemRight.modelMatrix = methodsRight.computeModelMatrix(
          createModel,
          time
        );
        // 说明对发射器模型矩阵的任何更改
        createParticleSystemRight.emitterModelMatrix =
          methodsRight.computeEmitterModelMatrix();
        /////////////////
        createParticleSystemLeft.modelMatrix = methodsLeft.computeModelMatrix(
          createModel,
          time
        );
        // 说明对发射器模型矩阵的任何更改
        createParticleSystemLeft.emitterModelMatrix =
          methodsLeft.computeEmitterModelMatrix();
      });
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