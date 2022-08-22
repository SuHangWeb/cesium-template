<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
import "@/common/cesium/Materials/tilesetEffect"
import Utils from "@/common/cesium/Utils.js";
export default {
  data() {
    return {
      viewer: null,
      _Utils: null
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
        // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        //   url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        // }),
        // terrainProvider: new Cesium.CesiumTerrainProvider({
        //   //加载火星在线地形
        //   url: "http://data.marsgis.cn/terrain",
        // }),
        // shouldAnimate: true,
        // infoBox: false,
        // selectionIndicator: false,

        infoBox: false,
        shouldAnimate: true,
        vrButton: true,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: true,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
      });
      //设置贴地效果
      // this.viewer.scene.globe.depthTestAgainstTerrain = false;
      // Cesium.ExperimentalFeatures.enableModelExperimental = true
      // this._Utils = new Utils()
      // this._Utils.loadJs("/Vue/tilesetEffect.js").then(() => {
      //   this.start();
      // });
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;
      // let tileSet =new Cesium.Cesium3DTileset({
      //     url: Cesium.IonResource.fromAssetId(75343),
      //   })
      // const tileset3DTile = this.viewer.scene.primitives.add(tileSet);
      // this.viewer.flyTo(tileset3DTile);
      const viewer = this.viewer;
      // 特效 默认为开启
      Cesium.TILE_EFFECT_STATE = true;
      // 自定义着色器  默认有片元着色器
      Cesium.TILE_FS_BODY = ` float stc_pl = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
                float stc_sd = v_stcVertex.z / 320.0 + sin(stc_pl) * 0.1;
                gl_FragColor *= vec4(stc_sd, stc_sd, stc_sd, 1.0);
                float stc_a13 = fract(czm_frameNumber / 360.0);
                float stc_h = clamp(v_stcVertex.z / 450.0, 0.0, 1.0);
                stc_a13 = abs(stc_a13 - 0.5) * 2.0;
                float stc_diff = step(0.005, abs(stc_h - stc_a13));
                gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - stc_diff);`;

      let tilesets = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: 'https://lab.earthsdk.com/model/702aa950d03c11e99f7ddd77cbe22fea/tileset.json' //切片url
        // url: "http://192.168.0.45/shanghai/tileset.json" //本地化 数据加载  需要自定部署本地数据
      }))
      tilesets.tileVisible.addEventListener(function (tile) {
        let content = tile.content;
        let featuresLength = content.featuresLength;
        let feature;
        for (var i = 0; i < featuresLength; i += 2) {
          feature = content.getFeature(i);
          let _model = feature.content._model;
          _model._shouldRegenerateShaders = true;
          // getOwnPropertyNames:返回指定对象的所有自身属性的属性名组成的数组
          // forEach：对数组里的所有元素都执行一遍
          // Object.keys：返回
          Object.getOwnPropertyNames(_model._sourcePrograms).forEach(function (j) {
            const _modelSourceP = _model._sourcePrograms[0];
            _model._rendererResources.sourceShaders[_modelSourceP.fragmentShader] = `
     varying vec3 v_positionEC;
     void main(void){
       vec4 position = czm_inverseModelView * vec4(v_positionEC,1); // 位置
       float glowRange = 100.0; // 光环的移动范围(高度)
       gl_FragColor = vec4(0.0, 0.3, 0.8, 0.8); // 颜色
       
       // 小于20米的低楼都不再变暗
       if(position.y > 20.0) {
         gl_FragColor *= vec4(vec3(position.y / 20.0), 0.8); // 渐变
       }
       
       // 动态光环
       float time = fract(czm_frameNumber / 360.0);
       time = abs(time - 0.5) * 3.0;
       float diff = step(0.005, abs( clamp(position.y / glowRange, 0.0, 1.0) - time));
       gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - diff);
     }
     `
          })
          _model._shouldRegenerateShaders = true;
        }
      })
      tilesets.readyPromise.then(function (tileset) {
        tileset.style = new Cesium.Cesium3DTileStyle({
          color: {
            conditions: [
              ["true", "color('cyan')"]
            ]
          }
        });
        viewer.flyTo(tileset)
      })

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