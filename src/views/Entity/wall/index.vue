<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div class="operation-panel">
      <el-select size="mini" v-model="wallType" placeholder="请选择墙体类型">
        <el-option
          v-for="item in wallTypeArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        size="mini"
        :disabled="wallType == ''"
        @click="startDraw"
        class="startButton"
        type="primary"
        plain
        >开始绘制</el-button
      >
    </div>
  </div>
</template>
 
<script>
import Material from "@/common/cesium/Materials/index.js";
import Entity from "@/common/cesium/Entity.js";
import wallData from "./module/data";
import Utils from "@/common/cesium/Utils.js";
export default {
  name: "wall",
  data() {
    return {
      viewer: null,
      _Entity: null,
      _Utils: null,
      _Material: null,
      wallTypeArr: wallData,
      wallType: "",
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
      this._Utils = new Utils();
      this._Material = new Material(Cesium, this.viewer);
    },
    /**
     * 开始绘制
     */
    startDraw() {
      const Cesium = this.cesium;
      const path = "/Vue/Entity/wall/material/";
      //过滤出来需要的数据对象
      const filter_data = this.wallTypeArr.filter(
        (item) => item.value == this.wallType
      );
      if (filter_data.length == 0) return;
      const obj = filter_data[0];
      /**
       * 带方向的墙体
       * @param {*} options.get:true/false
       * @param {*} options.count:数量
       * @param {*} options.freely:vertical/standard
       * @param {*} options.direction:+/-
       */
      const get_source = (options) => {
        if (options && options.get) {
          var materail =
            "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
        {\n\
            czm_material material = czm_getDefaultMaterial(materialInput);\n\
            vec2 st = materialInput.st;";
          if (options.freely == "vertical") {
            //（由下到上）
            materail +=
              "vec4 colorImage = texture2D(image, vec2(fract(st.s), fract(float(" +
              options.count +
              ")*st.t" +
              options.direction +
              " time)));\n ";
          } else {
            //（逆时针）
            materail +=
              "vec4 colorImage = texture2D(image, vec2(fract(float(" +
              options.count +
              ")*st.s " +
              options.direction +
              " time), fract(st.t)));\n ";
          }
          //泛光
          materail +=
            "vec4 fragColor;\n\
            fragColor.rgb = (colorImage.rgb+color.rgb) / 1.0;\n\
            fragColor = czm_gammaCorrect(fragColor);\n\
            material.diffuse = colorImage.rgb;\n\
            material.alpha = colorImage.a;\n\
            material.emission = fragColor.rgb;\n\
            return material;\n\
        }";
          return materail;
        }
      };

      const DynamicWallMaterialPropertys = this._Material.create({
        cesiumName: "DynamicWallMaterialPropertys",
        image: "/Vue/Entity/wall/wl.png",
        color: Cesium.Color.CYAN,
        duration: 1500,
        uniforms: {
          color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
          image: Cesium.Material.DefaultImageId,
          time: -20,
        },
        source: get_source({
          get: true,
          count: 3.0,
          freely: "vertical",
          direction: "-",
        }),
      });

      console.log(new Cesium.DynamicWallMaterialPropertys())

      const positions = Cesium.Cartesian3.fromDegreesArray(obj.position);
      setTimeout(() => {
        const wallEntity = this._Entity.createWall({
          positions,
          material: new Cesium.DynamicWallMaterialPropertys(),
          // 设置高度
          maximumHeights: new Array(positions.length).fill(50), //一个属性，它指定要用于墙顶的高度数组，而不是每个位置的高度
          minimunHeights: new Array(positions.length).fill(0), //一个属性，它指定要用于墙底而不是地球表面的高度数组。
          outline: true,
          outlineWidth: Math.min(
            4.0,
            this.viewer.scene.maximumAliasedLineWidth
          ),
        });
        this.viewer.flyTo(wallEntity);
      }, 1000);

      // this._Utils
      //   .loadJs(`${path}${obj.material}`, { append: "body", defer: true })
      //   .then(() => {
      //     const positions = Cesium.Cartesian3.fromDegreesArrayHeights(
      //       obj.position
      //     );
      //     const wallEntity = this._Entity.createWall({
      //       positions,
      //       // material,
      //       // 设置高度
      //       maximumHeights: new Array(positions.length).fill(50), //一个属性，它指定要用于墙顶的高度数组，而不是每个位置的高度
      //       minimunHeights: new Array(positions.length).fill(0), //一个属性，它指定要用于墙底而不是地球表面的高度数组。
      //       outline: true,
      //       outlineWidth: Math.min(
      //         4.0,
      //         this.viewer.scene.maximumAliasedLineWidth
      //       ),
      //     });
      //     this.viewer.flyTo(wallEntity);
      //   });
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
  .operation-panel {
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: #fff;
    border-radius: 6px 0 0 0;
    padding: 20px;
    .startButton {
      margin-left: 10px;
    }
  }
}
</style>