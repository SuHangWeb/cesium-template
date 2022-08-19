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

      this.start();
    },
    start() {
      const Cesium = this.cesium;
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
      }))
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