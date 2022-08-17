<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
export default {
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
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;

      // let tileSet = new Cesium.Cesium3DTileset({
      //   url: Cesium.IonResource.fromAssetId(75343),
      //   maximumScreenSpaceError: 2,        //最大的屏幕空间误差
      //   maximumNumberOfLoadedTiles: 1000,  //最大加载瓦片个数
      // });
      let tileSet =new Cesium.Cesium3DTileset({
          url: Cesium.IonResource.fromAssetId(96188),
        })
      const tileset3DTile = this.viewer.scene.primitives.add(tileSet);
      // tileset3DTile.readyPromise.then(
      //   () => {
      //     tileset3DTile.style = new Cesium.Cesium3DTileStyle({
      //       color: {
      //         conditions: [
      //           ['${Height} >= 300', 'rgba(67,241,30,0.8)'],
      //           ['${Height} >= 200', 'rgba(17,131,255,0.8)'],
      //           ['${Height} >= 100', 'rgba(241,103,32,0.8)'],
      //           ['${Height} >= 50', 'rgba(241,160,101,0.8)'],
      //           ['${Height} >= 0', 'rgba(240,255,0,0.8)'],
      //         ]
      //       }
      //     });
      //   }
      // )
      this.viewer.flyTo(tileset3DTile);







      // var tileset = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      //   url: process.env.VUE_APP_PUBLIC_URL + "/Vue/Models/b3dm/shenyang-building/tileset.json", //数据地址
      //   // maximumScreenSpaceError: 2,  //最大的屏幕空间误差
      //   // maximumNumberOfLoadedTiles: 1000, //最大加载瓦片个数
      //   // // modelMatrix: m,//形状矩阵
      //   skipLevelOfDetail: true,
      //   baseScreenSpaceError: 1024,
      //   skipScreenSpaceErrorFactor: 16,
      //   skipLevels: 1,
      //   immediatelyLoadDesiredLevelOfDetail: false,
      //   loadSiblings: false,
      //   cullWithChildrenBounds: true
      // }));
      // this.viewer.flyTo(tileset);
    },
    pickTileProperty() {
                const _this = this;
                let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
                let oldFeature=null;
                let oldColor =null;
                handler.setInputAction(function (movement) {
                    if (oldFeature!=null){
                        oldFeature.color=oldColor;
                    }
                    let feature = viewer.scene.pick(movement.position);
                    oldFeature = feature;
                    oldColor = feature.color;
                    feature.color= Cesium.Color.GHOSTWHITE;
                    const pos = movement.position;
                    if (Cesium.defined(feature) && feature instanceof Cesium.Cesium3DTileFeature) {
                        _this.infoText = [];
                        _this.posX = pos.x;
                        _this.posY = pos.y;
                        let propertyNames = feature.getPropertyNames();
                        // console.log(propertyNames);
                        let length = propertyNames.length;
                        for (let i = 0; i < length; ++i) {
                            let propertyName = propertyNames[i];
                            // console.log(propertyName + ": " + feature.getProperty(propertyName));
                            _this.infoText.push([propertyName, feature.getProperty(propertyName)]);
                        }
                        // console.log(_this.infoText);
                        _this.infoShow = true;
                    }
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
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