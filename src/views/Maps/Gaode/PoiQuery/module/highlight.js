export default [
  {
    codeLanguage: "VUE",
    relyOn: [
      {
        label: "Utils.js",
        url: "cesium/Utils.js"
      },
      {
        label: "Entity.js",
        url: "cesium/Entity.js"
      },
      {
        label: "Gaode.js",
        url: "VUE/Maps/Gaode/PoiQuery/index.js"
      }
    ],
    code: [
      {
        codeLanguage: "html",
        content: `<template>
                      <div class="container">
                        <div id="cesiumContainer"></div>
                        <div
                          id="marker-detailed-view"
                          class="marker-detailed-view"
                          v-show="is_detailed"
                        >
                          <div class="marker-detailed-title">{{ detailed.name }}</div>
                          <div class="marker-detailed-box">
                            <div class="marker-detailed-image" v-if="detailed.photos.length != 0">
                              <img :src="detailed.photos[0].url" alt="" />
                            </div>
                            <div class="marker-detailed-text">
                              <div class="marker-detailed-item">
                                <span>评分：</span>{{ detailed.rating }}
                              </div>
                              <div class="marker-detailed-item">
                                <span>电话：</span>{{ detailed.tel }}
                              </div>
                              <div class="marker-detailed-item">
                                <span>类目：</span>{{ detailed.type }}
                              </div>
                              <div class="marker-detailed-item">
                                <span>地址：</span>{{ detailed.pname }}/{{ detailed.cityname }}/{{
                                  detailed.adname
                                }}/{{ detailed.address }}
                              </div>
                            </div>
                          </div>
                          <!-- <div class="marker-detailed-triangle"></div> -->
                        </div>
                        <div class="poi-view-panel">
                          <el-form ref="form" label-width="80px">
                            <el-form-item label="范围">
                              <el-radio-group v-model="cityRadio">
                                <el-radio :label="1">全国</el-radio>
                                <el-radio :label="2">城市</el-radio>
                              </el-radio-group>
                            </el-form-item>
                            <transition name="slide-fade">
                              <el-form-item label="城市" v-if="cityRadio === 2">
                                <el-cascader
                                  v-model="city"
                                  :props="{
                                    children: 'districtList',
                                    label: 'name',
                                    value: 'adcode',
                                  }"
                                  style="width: 100%"
                                  placeholder="城市选择..."
                                  :options="cityOptions"
                                ></el-cascader>
                              </el-form-item>
                            </transition>
                          </el-form>
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
                              v-model="searchKeyword"
                            >
                            </el-input>
                          </div>
                          <div class="button-view">
                            <el-button type="primary" @click="searchKeywordChange" plain
                              >搜索</el-button
                            >
                            <el-button type="warning" @click="clearData" plain>清空</el-button>
                          </div>
                        </div>
                      </div>
                    </template>`
      },
      {
        codeLanguage: "js",
        content: `import Utils from "@/common/cesium/Utils.js";
                  import Entity from "@/common/cesium/Entity.js";
                  import GaodeMap from "@/common/cesium/Map/Gaode";
                  export default {
                    name: "PoiQuery",
                    data() {
                      return {
                        viewer: null,
                        _Entity: null,
                        _GaodeMap: null,
                        _Utils: null,
                  
                        searchKeyword: "", //搜索关键词
                        searchList: [], //搜索结果表格数据
                        pageIndex: 1, //页码
                        pageSize: 10, //页数量
                        count: 0, //总数
                        cityRadio: 1, //搜索类型 1=全国 2=选择城市
                        city: [], //城市选择的code数据
                        cityOptions: [], //城市联动数据
                        EntityArr: [], //实体位置数据
                        detailed: {
                          name: "",
                          photos: [],
                          rating: "",
                          tel: "",
                          type: "",
                          pname: "",
                          cityname: "",
                          adname: "",
                          address: "",
                        },
                        is_detailed: false,
                        markerDetailedDom: null,
                      };
                    },
                    mounted() {
                      /**
                       * 设置秘钥 必须在脚本加载之前设置
                       */
                      window._AMapSecurityConfig = {
                        securityJsCode: "2a0ce2005352672661417093c485a056",
                      };
                      this._Utils = new Utils();
                      /**
                       * 加载高德api
                       */
                       this._Utils.loadJs(
                        "https://webapi.amap.com/maps?v=2.0&key="+process.env.VUE_APP_GAODE_KEY_WEB_TERMINAL+"&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.DistrictSearch",
                        true
                      ).then(() => {
                        this._GaodeMap = new GaodeMap(AMap);
                        this._GaodeMap.districtList({ subdistrict: 2 }).then((res) => {
                          this.cityOptions = res;
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
                  
                        this._Entity = new Entity(Cesium, this.viewer);
                  
                        this.markerDetailedDom = document.getElementById("marker-detailed-view");
                  
                        //事件操作
                        this.eventOperation();
                      },
                      /**
                       * 事件操作
                       */
                      eventOperation() {
                        const Cesium = this.cesium;
                        //创建事件
                        const handler = new Cesium.ScreenSpaceEventHandler(
                          this.viewer.scene.canvas
                        );
                        handler.setInputAction((event) => {
                          const pickInfo = this.viewer.scene.pick(event.position);
                          // console.log(pickInfo.id.id);
                          if (pickInfo) {
                            const filter_f = this.searchList.filter(
                              (item) => item.id == pickInfo.id.id
                            );
                            if (filter_f.length != 0) {
                              this.startCamera(filter_f[0]);
                            }
                          }
                        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                      },
                      /**
                       * 清空数据
                       */
                      clearData() {
                        this.searchKeyword = "";
                        this.searchList = [];
                        this.city = [];
                        this.viewer.entities.removeAll();
                        this.is_detailed = false
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
                        const Cesium = this.cesium;
                        if (this.searchKeyword == "") {
                          this.searchList = [];
                          return;
                        }
                        if (this.cityRadio == 2) {
                          if (this.city.length == 0) {
                            this.$message({
                              message: "请选择城市",
                              type: "warning",
                            });
                            return;
                          }
                        }
                  
                        if (this.searchKeyword == "") {
                          this.$message({
                            message: "请输入搜索关键词",
                            type: "warning",
                          });
                          return;
                        }
                        const placeSearchData = {
                          pageSize: this.pageSize,
                          pageIndex: this.pageIndex,
                          searchKeyword: this.searchKeyword,
                        };
                        if (this.cityRadio == 2) {
                          placeSearchData.city = this.city[1] || "";
                        }
                  
                        const setPointPosition = async (arr) => {
                          this.viewer.entities.removeAll();
                          const EntityArr = [];
                          for (let i = 0; i < arr.length; i++) {
                            const item = this.searchList[i];
                            const _Entity_ = this._Entity.createBillboard({
                              id: item.id,
                              name: item.name,
                              position: Cesium.Cartesian3.fromDegrees(
                                item.location.lng,
                                item.location.lat
                              ),
                              common: {
                                label: {
                                  //⽂字标签
                                  text: item.name,
                                  font: "500 30px Helvetica", // 15pt monospace
                                  scale: 0.5,
                                  style: Cesium.LabelStyle.FILL,
                                  fillColor: Cesium.Color.WHITE,
                                  pixelOffset: new Cesium.Cartesian2(-8, -50), //偏移量
                                  showBackground: true,
                                  heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                },
                              },
                              image:
                                process.env.VUE_APP_PUBLIC_URL +
                                "/Vue/Maps/Gaode/PoiQuery/position.png",
                              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                              width: 40,
                              height: 40,
                            });
                            EntityArr.push(_Entity_);
                          }
                          return await EntityArr;
                        };
                  
                        this._GaodeMap
                          .placeSearch(placeSearchData)
                          .then((res) => {
                            this.searchList = res.pois;
                            this.count = res.count;
                            setPointPosition(res.pois).then((entityRes) => {
                              this.EntityArr = entityRes;
                            });
                          })
                          .catch((err) => {
                            this.$notify.error({
                              title: "错误",
                              message: "请重新搜索",
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
                       * 设置详细窗口
                       */
                      setDetails(location) {
                        const Cesium = this.cesium;
                        const dom = this.markerDetailedDom;
                  
                        this.viewer.scene.preRender.addEventListener(() => {
                          const position = Cesium.Cartesian3.fromDegrees(
                            location.lng,
                            location.lat,
                            0
                          );
                          var canvasPosition = this.viewer.scene.cartesianToCanvasCoordinates(
                            position,
                            new Cesium.Cartesian2()
                          );
                          if (Cesium.defined(canvasPosition)) {
                            dom.style.top = canvasPosition.y - dom.offsetHeight - 20 + "px";
                            dom.style.left = canvasPosition.x + dom.offsetWidth / 2 + "px";
                          }
                        });
                        this.is_detailed = true;
                      },
                      /**
                       * 相机视角调整到选中地址
                       * @param {Object} data 地址数据
                       */
                      startCamera(data) {
                        const Cesium = this.cesium;
                        for (let i = 0; i < this.EntityArr.length; i++) {
                          const item = this.EntityArr[i];
                          if (item.id == data.id) {
                            item.billboard.image =
                              process.env.VUE_APP_PUBLIC_URL +
                              "/Vue/Maps/Gaode/PoiQuery/position-active.png";
                          } else {
                            setTimeout(() => {
                              item.billboard.image =
                                process.env.VUE_APP_PUBLIC_URL +
                                "/Vue/Maps/Gaode/PoiQuery/position.png";
                            }, 1000);
                          }
                        }
                  
                        this._GaodeMap.getDetails(data.id).then((res) => {
                          if (res.poiList.pois.length != 0) {
                            this.detailed = res.poiList.pois[0];
                            this.setDetails({
                              lat: data.location.lat,
                              lng: data.location.lng,
                            });
                          }
                        });
                  
                        this.viewer.camera.flyTo({
                          destination: Cesium.Cartesian3.fromDegrees(
                            data.location.lng,
                            data.location.lat,
                            3000
                          ),
                        });
                      },
                    },
                  };`
      },
      {
        codeLanguage: "css",
        content: `.container {
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
                      z-index: 3;
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
                      .button-view {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding-top: 20px;
                        > * {
                          margin: 0 10px;
                        }
                      }
                    }
                    //城市选择表单过度动画
                    .slide-fade-enter-active,
                    .slide-fade-leave-active {
                      transition: all 0.3s ease;
                    }
                    .slide-fade-enter,
                    .slide-fade-leave-to {
                      transform: translateY(10px);
                      opacity: 0;
                    }
                    //详细窗口样式
                    .marker-detailed-view {
                      width: 300px;
                      position: fixed;
                      top: 50%;
                      left: 50%;
                      z-index: 2;
                      background-color: #fff;
                      padding: 10px;
                      box-sizing: border-box;
                      border-radius: 6px;
                      .marker-detailed-title {
                        font-size: 16px;
                        color: #333;
                        font-weight: bold;
                        text-align: center;
                        line-height: 1.3;
                        padding: 10px 0 15px;
                      }
                      .marker-detailed-box {
                        display: flex;
                        .marker-detailed-image {
                          width: 90px;
                          margin-right: 10px;
                          img {
                            width: 100%;
                            display: block;
                          }
                        }
                        .marker-detailed-text {
                          width: calc(100% - 100px);
                          .marker-detailed-item {
                            font-size: 12px;
                            color: #666;
                            margin-bottom: 5px;
                            line-height: 1.3;
                            span {
                              color: #333;
                            }
                          }
                        }
                      }
                      .marker-detailed-triangle {
                        position: absolute;
                        bottom: 0;
                        left: 30px;
                        border: 16px solid transparent;
                        border-top-color: #fff;
                        border-bottom: 0;
                        margin: 0 0 -16px -16px;
                        border-left: 0;
                      }
                    }`
      }
    ]
  },
  // {
  //   codeLanguage: "JS",
  //   relyOn: [

  //   ],
  //   code: [
  //     {
  //       codeLanguage: "js",
  //       content: ``
  //     }
  //   ]
  // }
]