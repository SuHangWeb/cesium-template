<template>
  <div class="container">
    <div id="cesiumContainer"></div>
    <div class="poi-view-panel">
      <template v-if="searchList.length != 0">
        <div class="tabel-wrap">
          <el-table
            height="300px"
            :data="searchList"
            border
            style="width: 100%"
            @row-click="rowClick"
          >
            <el-table-column label="序列号" width="80px">
              <template slot-scope="scope">
                {{ (pageIndex - 1) * pageSize + (scope.$index + 1) }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名称"> </el-table-column>
            <el-table-column prop="type" label="类型"> </el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              layout="prev, pager, next"
              @current-change="currentPaginationChange"
              :total="count"
              :page-size="pageSize"
              :current-page="pageIndex"
            />
          </div>
        </div>
        <el-divider></el-divider>
      </template>
      <div class="search-view">
        <el-input
          placeholder="地点搜索......"
          id="searchInput"
          class="input-with-select"
          @change="searchKeywordChange"
          v-model="searchKeyword"
        >
        </el-input>
      </div>
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
      searchList: [],
      pageIndex: 1,
      pageSize: 10,
      count: 0,
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
      // this.searchKeywordChange();
      AMap.plugin("AMap.DistrictSearch", function () {
        const districtSearch = new AMap.DistrictSearch({
          level: "country",
          subdistrict: 1,
        });
        console.log(districtSearch);
        // https://blog.csdn.net/fwx426328/article/details/81611143
        districtSearch.search("中国", function (status, result) {
          console.log(result)
          var list = result.districtList[0]["districtList"];
          // for (var i = 0; i < list.length; i++) {
          //   _this.provinceList.push(list[i].name);
          // }
        });
      });
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
     * 分页
     * @param {*} e
     */
    currentPaginationChange(e) {
      this.pageIndex = e;
      this.searchKeywordChange();
    },
    /**
     * 高德POI 搜索
     */
    searchKeywordChange() {
      if (this.searchKeyword == "") {
        this.searchList = [];
        return;
      }
      const _this = this;

      AMap.plugin("AMap.PlaceSearch", () => {
        /**
         * 参数地址：https://lbs.amap.com/api/javascript-api/reference/search
         * AMap.PlaceSearch 类目下
         */
        var autoOptions = {
          city: "全国", //可选值：城市名（中文或中文全拼）、citycode、adcode 默认值：“全国”
          pageSize: _this.pageSize, // 单页显示结果条数
          children: 0, //不展示子节点数据
          pageIndex: _this.pageIndex, //页码
          extensions: "base", //返回基本地址信息
        };
        var placeSearch = new AMap.PlaceSearch(autoOptions);
        placeSearch.search(_this.searchKeyword, (status, result) => {
          // console.log(status)
          // 搜索成功时，result即是对应的匹配数据
          // console.log(result);
          if (result.info == "OK") {
            _this.count = result.poiList.count;
            _this.searchList = result.poiList.pois;
          } else {
            this.$notify.error({
              title: "错误",
              message: "请重新搜索",
            });
          }
        });
      });
    },
    /**
     * 表格行点击
     * @param {*} e
     */
    rowClick(e) {
      this.startCamera(e);
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
  width: 500px;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #fff;
  border-radius: 6px 0 0 0;
  box-sizing: border-box;
  padding: 20px;
  .tabel-wrap {
    .pagination {
      padding: 10px 0;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>