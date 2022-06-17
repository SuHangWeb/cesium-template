<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div class="poi-view-panel">
      <el-input
        placeholder="地点搜索......"
        id="searchInput"
        class="input-with-select"
        @change="initGaode"
        v-model="searchKeyword"
      >
      </el-input>
    </div>
  </div>
</template>
 
<script>
// import "@/common/importJs.js";
import loadJs from "@/common/loadJs.js";
export default {
  name: "PoiQuery",
  data() {
    return {
      viewer: null,
      _Map: null,

      searchKeyword: "",
    };
  },
  mounted() {
    /**
     * 加载高德api
     */
    loadJs(
      "https://webapi.amap.com/maps?v=1.4.15&key=439ce156ded2dbce828cde9504fdd59e&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.DistrictSearch"
    ).then(() => {
      // 加载成功，进行后续操作
      this.initGaode();
    });
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
    },
    /**
     * 高德api方法初始化
     */
    initGaode() {
      const _this = this;
      // const Keyword = new AMap.Autocomplete({
      //   input: "searchInput",
      // });
      // // this.$nextTick(() => {
      // //   AMap.event.addListener(Keyword, "select", (res) => {
      // //     console.log(res);
      // //     const { address, district, location, name, id } = res.poi;
      // //     _this.startCamera({
      // //       address,
      // //       district,
      // //       location,
      // //       name,
      // //       id,
      // //     });
      // //   }); //注册监听，当选中某条记录时会触发
      // // });

      AMap.plugin("AMap.PlaceSearch", function () {
        var autoOptions = {
          city: "全国",
        };
        var placeSearch = new AMap.PlaceSearch(autoOptions);
        placeSearch.search(_this.searchKeyword, (status, result) => {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          // var node = new PrettyJSON.view.Node({
          //     el: document.querySelector("#input-info"),
          //     data: result
          // });
        });
      });
    },
    /**
     * 相机视角调整到选中地址
     * @param {Object} data 地址数据
     */
    startCamera(data) {
      // AMap.plugin("AMap.PlaceSearch", function () {
      //   const placeSearchOptions = {
      //     city: "全国", // 兴趣点城市
      //     pageSize: 10, // 单页显示结果条数
      //     children: 0, //不展示子节点数据
      //     pageIndex: 1, //页码
      //     extensions: "base", //返回基本地址信息
      //   };
      //   let placeSearch = new AMap.PlaceSearch(placeSearchOptions);
      //   // 实例化Autocomplete
      //   // let districtSearch = new AMap.DistrictSearch(districtOptions);
      //   //详情查询
      //   placeSearch.getDetails(data.id, function (status, result) {
      //     console.log(status, result);
      //     if (status === "complete" && result.info === "OK") {
      //       // console.log(result.poiList.pois[0]);
      //       let pois = result.poiList.pois[0];
      //       // _this.viewerflyToLonLat(pois);
      //     }
      //   });
      // });

      // AMap.plugin("AMap.PlaceSearch", function () {
      //   var placeSearch = new AMap.PlaceSearch();
      //   // 中国国家博物馆对应的POI ID
      //   var poiid = data.id;

      //   placeSearch.getDetails(poiid, function (status, result) {
      //     // 查询成功时，result即为对应的POI详情
      //     console.log(result);
      //   });
      // });

      // AMap.plugin(["AMap.PlaceSearch"], function () {
      //   var placeSearch = new AMap.PlaceSearch({
      //     //构造地点查询类
      //     pageSize: 5, // 单页显示结果条数
      //     pageIndex: 1, // 页码
      //     // city: "010", // 兴趣点城市
      //     // citylimit: true, //是否强制限制在设置的城市内搜索
      //     map: map, // 展现结果的地图实例
      //     panel: "panel", // 结果列表将在此容器中进行展示。
      //     autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      //   });
      //   //关键字查询
      //   placeSearch.search(data.name);
      // });

      const Cesium = this.cesium;
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          data.location.lng,
          data.location.lat,
          3000
        ),
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
.poi-view-panel {
  width: 400px;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #fff;
  border-radius: 6px 0 0 0;
  box-sizing: border-box;
  padding: 20px;
}
</style>