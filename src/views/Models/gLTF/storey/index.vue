<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <el-card class="operation-panel">
      <div slot="header" class="operation-header clearfix">
        <span>楼层分解</span>
      </div>
      <div class="operation-content">
        <el-form ref="form" :model="form" label-width="80px" size="mini">
          <el-form-item label="整体控制">
            <el-radio-group v-model="form.whole" @change="wholeChange">
              <el-radio-button :label="item.value" v-for="(item, index) in wholeArr" :key="index">{{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="显示指定">
            <el-radio-group v-model="form.appoint" @change="appointChange">
              <el-radio class="appoint-radio" border :label="item.value" v-for="(item, index) in appointArr"
                :key="index">{{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
 
<script>
// 参考：http://mars3d.cn/editor-vue.html?id=graphic/entity/model-moveTo 
// ~~: https://blog.csdn.net/qq_27816785/article/details/122768709
//源码：https://blog.csdn.net/wokao253615105/article/details/124908042?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-124908042-blog-122768709.pc_relevant_multi_platform_whitelistv1&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-124908042-blog-122768709.pc_relevant_multi_platform_whitelistv1&utm_relevant_index=1
//https://blog.csdn.net/ltsg_/article/details/113092461  向量
import Entity from "@/common/cesium/Entity.js";
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      viewer: null,
      _Entity: null,
      wholeArr: [
        {
          value: 1,
          label: "展开"
        },
        {
          value: 2,
          label: "合并"
        },
        {
          value: 3,
          label: "还原"
        }
      ],
      appointArr: [
        {
          value: 1,
          label: "一楼"
        },
        {
          value: 2,
          label: "二楼"
        },
        {
          value: 3,
          label: "三楼"
        },
        {
          value: 4,
          label: "四楼"
        },
        {
          value: 5,
          label: "五楼"
        },
        {
          value: 6,
          label: "六楼"
        },
        {
          value: 7,
          label: "七楼"
        },
        {
          value: 8,
          label: "八楼"
        },
        {
          value: 9,
          label: "九楼"
        },
        {
          value: 0,
          label: "顶楼"
        },
      ],
      form: {
        whole: "",
        appoint: ""
      },
      EntityArr: []
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
        infoBox: false,
        selectionIndicator: false,
        navigation: false,
        animation: false,
        timeline: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        shouldAnimate: false,
      });
      //是否开启抗锯齿
      this.viewer.scene.fxaa = true;
      this.viewer.scene.postProcessStages.fxaa.enabled = true;
      this._Entity = new Entity(Cesium, this.viewer);
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;
      const _this = this
      /**
       * 初始化模型
       */
      function floorInit(len, height) {
        let EntityModelArr = []
        let _height = 0
        // 加载楼层 start
        for (let i = 0; i < len; i++) {
          _height = i * height
          const EntityModel = _this._Entity.createModel({
            id: uuidv4(),
            position: Cesium.Cartesian3.fromDegrees(
              123.42949456471793, 41.81741540043599, _height
            ),
            uri: process.env.VUE_APP_PUBLIC_URL + "/Vue/Models/gLTF/storey/floor.glb",
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
          })
          EntityModelArr.push(EntityModel)
        }
        // 加载楼层 end
        // 加载楼顶 start
        const EntityModelTop = _this._Entity.createModel({
          id: uuidv4(),
          position: Cesium.Cartesian3.fromDegrees(
            123.42949456471793, 41.81741540043599, len * height
          ),
          uri: process.env.VUE_APP_PUBLIC_URL + "/Vue/Models/gLTF/storey/top.glb",
          heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        })
        // 加载楼顶 end
        return [...EntityModelArr, EntityModelTop]
      }

      this.EntityArr = floorInit(9, 3)

      this.viewer.flyTo(this.EntityArr);
    },
    /**
     * @description 将笛卡尔坐标系转成经纬度高程
     * @param {Object} cartesian 笛卡尔坐标系对象 {x, y, z}
     * @returns 返回经纬度高程对象
     */
    cartesian3TolngLatAlt(cartesian) {
      const Cesium = this.cesium;
      if (!cartesian || Object.keys(cartesian).length !== 3) {
        throw new Error('请传入合法的cartesian对象 {x, y, z}')
      }
      const cartesian3 = new Cesium.Cartesian3(cartesian.x, cartesian.y, cartesian.z);
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
      const lat = Cesium.Math.toDegrees(cartographic.latitude);
      const lng = Cesium.Math.toDegrees(cartographic.longitude);
      const height = Math.round(cartographic.height)
      return [lng, lat, height]
    },
    /**
     * 整体控制
     */
    wholeChange(e) {
      const Cesium = this.cesium;
      const _this = this

      function updates(i) {
        console.log("update")
        // _this.EntityArr[i].position = Cesium.Cartesian3.fromDegrees(
        //   position[0], position[1], position[2] + 0.1
        // )
      }

      for (let i = 0; i < this.EntityArr.length; i++) {
        const item = this.EntityArr[i]
        if (e === 1) {
          const position = this.cartesian3TolngLatAlt(item.position._value)
          // item._position._value = Cesium.Cartesian3.fromDegrees(
          //   position[0], position[1], position[2] * 2
          // )

          setInterval(() => {
            updates(i)
          }, 100);


          item.position = new Cesium.CallbackProperty((time, result) => {
            // console.log(time)
            // const _height = position[2] + 0.1
            // console.log(_height)
            return Cesium.Cartesian3.fromDegrees(
              position[0], position[1], position[2]
            );
          }, false)



          // item._position = new Cesium.CallbackProperty((time) => {
          //   if (position[2] >= position[2] * 2) {
          //     return Cesium.Cartesian3.fromDegrees(
          //       position[0], position[1], position[2]
          //     )
          //   } else {
          //     return Cesium.Cartesian3.fromDegrees(
          //       position[0], position[1], position[2] * 2
          //     )
          //   }
          // }, false);
        }
        if (e === 2 || e === 3) {
          const position = this.cartesian3TolngLatAlt(item.position._value)
          item.position._value = Cesium.Cartesian3.fromDegrees(
            position[0], position[1], 3 * i
          )
          // item.position._value = new Cesium.CallbackProperty((time) => {
          //   return Cesium.Cartesian3.fromDegrees(
          //     position[0], position[1], 3 * i
          //   )
          // }, false);
        }
      }
    },
    /**
     * 显示指定
     */
    appointChange(e) {
      for (let i = 0; i < this.EntityArr.length; i++) {
        const item = this.EntityArr[i]
        if (e === 0) {
          item.show = true
        } else {
          if (i < e) {
            item.show = true
          } else {
            item.show = false
          }
        }
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

  .operation-panel {
    width: 360px;
    position: fixed;
    top: 60px;
    right: 10px;
    z-index: 9;

    .appoint-radio {
      margin: 0 5px 5px 0;
    }
  }
}
</style>