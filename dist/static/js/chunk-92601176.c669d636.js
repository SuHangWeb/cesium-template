(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-92601176"],{"095e":function(e,n,t){"use strict";var i=t("a27a"),a=t("696d"),s=t("8dc7"),r=t("cd24"),o=t("5a12"),l=t("494e"),c=t("c1cc"),d=t("ebfd");a("search",(function(e,n,t){return[function(n){var t=r(this),a=void 0==n?void 0:c(n,e);return a?i(a,n,t):new RegExp(n)[e](l(t))},function(e){var i=s(this),a=l(e),r=t(n,i,a);if(r.done)return r.value;var c=i.lastIndex;o(c,0)||(i.lastIndex=0);var p=d(i,a);return o(i.lastIndex,c)||(i.lastIndex=c),null===p?-1:p.index}]}))},"1c9b":function(e,n,t){"use strict";t("ffe0")},"5a12":function(e,n){e.exports=Object.is||function(e,n){return e===n?0!==e||1/e===1/n:e!=e&&n!=n}},8968:function(e,n,t){"use strict";t.r(n);var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"container"},[t("div",{attrs:{id:"cesiumContainer"}}),t("div",{directives:[{name:"show",rawName:"v-show",value:e.is_detailed,expression:"is_detailed"}],staticClass:"marker-detailed-view",attrs:{id:"marker-detailed-view"}},[t("div",{staticClass:"marker-detailed-title"},[e._v(e._s(e.detailed.name))]),t("div",{staticClass:"marker-detailed-box"},[0!=e.detailed.photos.length?t("div",{staticClass:"marker-detailed-image"},[t("img",{attrs:{src:e.detailed.photos[0].url,alt:""}})]):e._e(),t("div",{staticClass:"marker-detailed-text"},[t("div",{staticClass:"marker-detailed-item"},[t("span",[e._v("评分：")]),e._v(e._s(e.detailed.rating)+" ")]),t("div",{staticClass:"marker-detailed-item"},[t("span",[e._v("电话：")]),e._v(e._s(e.detailed.tel)+" ")]),t("div",{staticClass:"marker-detailed-item"},[t("span",[e._v("类目：")]),e._v(e._s(e.detailed.type)+" ")]),t("div",{staticClass:"marker-detailed-item"},[t("span",[e._v("地址：")]),e._v(e._s(e.detailed.pname)+"/"+e._s(e.detailed.cityname)+"/"+e._s(e.detailed.adname)+"/"+e._s(e.detailed.address)+" ")])])])]),t("div",{staticClass:"poi-view-panel"},[t("el-form",{ref:"form",attrs:{"label-width":"80px"}},[t("el-form-item",{attrs:{label:"范围"}},[t("el-radio-group",{model:{value:e.cityRadio,callback:function(n){e.cityRadio=n},expression:"cityRadio"}},[t("el-radio",{attrs:{label:1}},[e._v("全国")]),t("el-radio",{attrs:{label:2}},[e._v("城市")])],1)],1),t("transition",{attrs:{name:"slide-fade"}},[2===e.cityRadio?t("el-form-item",{attrs:{label:"城市"}},[t("el-cascader",{staticStyle:{width:"100%"},attrs:{props:{children:"districtList",label:"name",value:"adcode"},placeholder:"城市选择...",options:e.cityOptions},model:{value:e.city,callback:function(n){e.city=n},expression:"city"}})],1):e._e()],1)],1),0!=e.searchList.length?[t("div",{staticClass:"tabel-wrap"},[t("el-table",{staticStyle:{width:"100%"},attrs:{height:"300px",data:e.searchList,border:""},on:{"row-click":e.rowClick}},[t("el-table-column",{attrs:{label:"序列号",width:"80px"},scopedSlots:e._u([{key:"default",fn:function(n){return[e._v(" "+e._s((e.pageIndex-1)*e.pageSize+(n.$index+1))+" ")]}}],null,!1,1283495999)}),t("el-table-column",{attrs:{prop:"name",label:"名称"}}),t("el-table-column",{attrs:{prop:"type",label:"类型"}}),t("el-table-column",{attrs:{prop:"address",label:"地址"}})],1),t("div",{staticClass:"pagination"},[t("el-pagination",{attrs:{layout:"prev, pager, next",total:e.count,"page-size":e.pageSize,"current-page":e.pageIndex},on:{"current-change":e.currentPaginationChange}})],1)],1),t("el-divider")]:e._e(),t("div",{staticClass:"search-view"},[t("el-input",{staticClass:"input-with-select",attrs:{placeholder:"地点搜索......",id:"searchInput"},model:{value:e.searchKeyword,callback:function(n){e.searchKeyword=n},expression:"searchKeyword"}})],1),t("div",{staticClass:"button-view"},[t("el-button",{attrs:{type:"primary",plain:""},on:{click:e.searchKeywordChange}},[e._v("搜索")]),t("el-button",{attrs:{type:"warning",plain:""},on:{click:e.clearData}},[e._v("清空")])],1)],2)])},a=[],s=t("d941"),r=t("c3ae"),o=(t("f8d4"),t("a256"),t("209b"),t("c407")),l=t("9e48"),c=t("c15f"),d=t("a35b"),p=(t("9afd"),t("095e"),t("840d"),function(){function e(n){Object(c["a"])(this,e),this.AMap=n}return Object(d["a"])(e,[{key:"districtList",value:function(e){var n=this.AMap,t={level:null!==e&&void 0!==e&&e.level?e.level:"country",subdistrict:null!==e&&void 0!==e&&e.subdistrict?e.subdistrict:1,showbiz:null===e||void 0===e||!e.showbiz||e.showbiz,extensions:null!==e&&void 0!==e&&e.extensions?e.extensions:"base"},i=null!==e&&void 0!==e&&e.keyword?e.keyword:"中国";return new Promise((function(e,a){n.plugin("AMap.DistrictSearch",(function(){var s=new n.DistrictSearch(t);s.search(i,(function(n,t){"complete"==n?e(t.districtList[0]["districtList"]):a("Error")}))}))}))}},{key:"placeSearch",value:function(e){var n=this.AMap,t={city:null!==e&&void 0!==e&&e.city&&""!=e.city?e.city:"全国",citylimit:!(null===e||void 0===e||!e.citylimit)&&e.citylimit,children:null!==e&&void 0!==e&&e.children?e.children:0,type:null!==e&&void 0!==e&&e.type?e.type:"餐饮服务|商务住宅|生活服务",lang:null!==e&&void 0!==e&&e.lang?e.lang:"zh_cn",pageSize:null!==e&&void 0!==e&&e.pageSize?e.pageSize:10,pageIndex:null!==e&&void 0!==e&&e.pageIndex?e.pageIndex:1,extensions:null!==e&&void 0!==e&&e.extensions?e.extensions:"base",map:null!==e&&void 0!==e&&e.map?e.map:void 0,panel:null!==e&&void 0!==e&&e.panel?e.panel:"",showCover:null===e||void 0===e||!e.showCover||e.showCover,renderStyle:null!==e&&void 0!==e&&e.renderStyle?e.renderStyle:"default",autoFitView:null===e||void 0===e||!e.autoFitView||e.autoFitView},i=null!==e&&void 0!==e&&e.searchKeyword?e.searchKeyword:"",a=new n.PlaceSearch(t);return new Promise((function(e,t){n.plugin("AMap.PlaceSearch",(function(){a.search(i,(function(n,i){"complete"==n?e(i.poiList):t("Error")}))}))}))}},{key:"getDetails",value:function(e){var n=this.AMap,t=new n.PlaceSearch({extensions:"all"});return new Promise((function(n,i){t.getDetails(e,(function(e,t){"complete"===e&&"OK"===t.info?n(t):i("Error")}))}))}}]),e}()),u=p,h=[{codeLanguage:"VUE",relyOn:[{label:"Utils.js",url:"cesium/Utils.js"},{label:"Entity.js",url:"cesium/Entity.js"},{label:"Gaode.js",url:"VUE/Maps/Gaode/PoiQuery/index.js"}],code:[{codeLanguage:"html",content:'<template>\n                      <div class="container">\n                        <div id="cesiumContainer"></div>\n                        <div\n                          id="marker-detailed-view"\n                          class="marker-detailed-view"\n                          v-show="is_detailed"\n                        >\n                          <div class="marker-detailed-title">{{ detailed.name }}</div>\n                          <div class="marker-detailed-box">\n                            <div class="marker-detailed-image" v-if="detailed.photos.length != 0">\n                              <img :src="detailed.photos[0].url" alt="" />\n                            </div>\n                            <div class="marker-detailed-text">\n                              <div class="marker-detailed-item">\n                                <span>评分：</span>{{ detailed.rating }}\n                              </div>\n                              <div class="marker-detailed-item">\n                                <span>电话：</span>{{ detailed.tel }}\n                              </div>\n                              <div class="marker-detailed-item">\n                                <span>类目：</span>{{ detailed.type }}\n                              </div>\n                              <div class="marker-detailed-item">\n                                <span>地址：</span>{{ detailed.pname }}/{{ detailed.cityname }}/{{\n                                  detailed.adname\n                                }}/{{ detailed.address }}\n                              </div>\n                            </div>\n                          </div>\n                          \x3c!-- <div class="marker-detailed-triangle"></div> --\x3e\n                        </div>\n                        <div class="poi-view-panel">\n                          <el-form ref="form" label-width="80px">\n                            <el-form-item label="范围">\n                              <el-radio-group v-model="cityRadio">\n                                <el-radio :label="1">全国</el-radio>\n                                <el-radio :label="2">城市</el-radio>\n                              </el-radio-group>\n                            </el-form-item>\n                            <transition name="slide-fade">\n                              <el-form-item label="城市" v-if="cityRadio === 2">\n                                <el-cascader\n                                  v-model="city"\n                                  :props="{\n                                    children: \'districtList\',\n                                    label: \'name\',\n                                    value: \'adcode\',\n                                  }"\n                                  style="width: 100%"\n                                  placeholder="城市选择..."\n                                  :options="cityOptions"\n                                ></el-cascader>\n                              </el-form-item>\n                            </transition>\n                          </el-form>\n                          <template v-if="searchList.length != 0">\n                            <div class="tabel-wrap">\n                              <el-table\n                                height="300px"\n                                :data="searchList"\n                                border\n                                style="width: 100%"\n                                @row-click="rowClick"\n                              >\n                                <el-table-column label="序列号" width="80px">\n                                  <template slot-scope="scope">\n                                    {{ (pageIndex - 1) * pageSize + (scope.$index + 1) }}\n                                  </template>\n                                </el-table-column>\n                                <el-table-column prop="name" label="名称"> </el-table-column>\n                                <el-table-column prop="type" label="类型"> </el-table-column>\n                                <el-table-column prop="address" label="地址"></el-table-column>\n                              </el-table>\n                              <div class="pagination">\n                                <el-pagination\n                                  layout="prev, pager, next"\n                                  @current-change="currentPaginationChange"\n                                  :total="count"\n                                  :page-size="pageSize"\n                                  :current-page="pageIndex"\n                                />\n                              </div>\n                            </div>\n                            <el-divider></el-divider>\n                          </template>\n                          <div class="search-view">\n                            <el-input\n                              placeholder="地点搜索......"\n                              id="searchInput"\n                              class="input-with-select"\n                              v-model="searchKeyword"\n                            >\n                            </el-input>\n                          </div>\n                          <div class="button-view">\n                            <el-button type="primary" @click="searchKeywordChange" plain\n                              >搜索</el-button\n                            >\n                            <el-button type="warning" @click="clearData" plain>清空</el-button>\n                          </div>\n                        </div>\n                      </div>\n                    </template>'},{codeLanguage:"js",content:'import Utils from "@/common/cesium/Utils.js";\n                  import Entity from "@/common/cesium/Entity.js";\n                  import GaodeMap from "@/common/cesium/Map/Gaode";\n                  export default {\n                    name: "PoiQuery",\n                    data() {\n                      return {\n                        viewer: null,\n                        _Entity: null,\n                        _GaodeMap: null,\n                        _Utils: null,\n                  \n                        searchKeyword: "", //搜索关键词\n                        searchList: [], //搜索结果表格数据\n                        pageIndex: 1, //页码\n                        pageSize: 10, //页数量\n                        count: 0, //总数\n                        cityRadio: 1, //搜索类型 1=全国 2=选择城市\n                        city: [], //城市选择的code数据\n                        cityOptions: [], //城市联动数据\n                        EntityArr: [], //实体位置数据\n                        detailed: {\n                          name: "",\n                          photos: [],\n                          rating: "",\n                          tel: "",\n                          type: "",\n                          pname: "",\n                          cityname: "",\n                          adname: "",\n                          address: "",\n                        },\n                        is_detailed: false,\n                        markerDetailedDom: null,\n                      };\n                    },\n                    mounted() {\n                      /**\n                       * 设置秘钥 必须在脚本加载之前设置\n                       */\n                      window._AMapSecurityConfig = {\n                        securityJsCode: "2a0ce2005352672661417093c485a056",\n                      };\n                      this._Utils = new Utils();\n                      /**\n                       * 加载高德api\n                       */\n                       this._Utils.loadJs(\n                        "https://webapi.amap.com/maps?v=2.0&key="+process.env.VUE_APP_GAODE_KEY_WEB_TERMINAL+"&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.DistrictSearch",\n                        true\n                      ).then(() => {\n                        this._GaodeMap = new GaodeMap(AMap);\n                        this._GaodeMap.districtList({ subdistrict: 2 }).then((res) => {\n                          this.cityOptions = res;\n                        });\n                      });\n                      this.init();\n                    },\n                    methods: {\n                      init() {\n                        const Cesium = this.cesium;\n                        Cesium.Ion.defaultAccessToken = process.env.VUE_APP_TOKEN;\n                        this.viewer = new Cesium.Viewer("cesiumContainer", {\n                          imageryProvider: new Cesium.ArcGisMapServerImageryProvider({\n                            url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",\n                          }),\n                          terrainProvider: new Cesium.CesiumTerrainProvider({\n                            //加载火星在线地形\n                            url: "http://data.marsgis.cn/terrain",\n                          }),\n                          shouldAnimate: true,\n                          infoBox: false,\n                          selectionIndicator: false,\n                        });\n                        //设置贴地效果\n                        this.viewer.scene.globe.depthTestAgainstTerrain = false;\n                  \n                        this._Entity = new Entity(Cesium, this.viewer);\n                  \n                        this.markerDetailedDom = document.getElementById("marker-detailed-view");\n                  \n                        //事件操作\n                        this.eventOperation();\n                      },\n                      /**\n                       * 事件操作\n                       */\n                      eventOperation() {\n                        const Cesium = this.cesium;\n                        //创建事件\n                        const handler = new Cesium.ScreenSpaceEventHandler(\n                          this.viewer.scene.canvas\n                        );\n                        handler.setInputAction((event) => {\n                          const pickInfo = this.viewer.scene.pick(event.position);\n                          // console.log(pickInfo.id.id);\n                          if (pickInfo) {\n                            const filter_f = this.searchList.filter(\n                              (item) => item.id == pickInfo.id.id\n                            );\n                            if (filter_f.length != 0) {\n                              this.startCamera(filter_f[0]);\n                            }\n                          }\n                        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);\n                      },\n                      /**\n                       * 清空数据\n                       */\n                      clearData() {\n                        this.searchKeyword = "";\n                        this.searchList = [];\n                        this.city = [];\n                        this.viewer.entities.removeAll();\n                        this.is_detailed = false\n                      },\n                      /**\n                       * 分页\n                       * @param {*} e\n                       */\n                      currentPaginationChange(e) {\n                        this.pageIndex = e;\n                        this.searchKeywordChange();\n                      },\n                      /**\n                       * 高德POI 搜索\n                       */\n                      searchKeywordChange() {\n                        const Cesium = this.cesium;\n                        if (this.searchKeyword == "") {\n                          this.searchList = [];\n                          return;\n                        }\n                        if (this.cityRadio == 2) {\n                          if (this.city.length == 0) {\n                            this.$message({\n                              message: "请选择城市",\n                              type: "warning",\n                            });\n                            return;\n                          }\n                        }\n                  \n                        if (this.searchKeyword == "") {\n                          this.$message({\n                            message: "请输入搜索关键词",\n                            type: "warning",\n                          });\n                          return;\n                        }\n                        const placeSearchData = {\n                          pageSize: this.pageSize,\n                          pageIndex: this.pageIndex,\n                          searchKeyword: this.searchKeyword,\n                        };\n                        if (this.cityRadio == 2) {\n                          placeSearchData.city = this.city[1] || "";\n                        }\n                  \n                        const setPointPosition = async (arr) => {\n                          this.viewer.entities.removeAll();\n                          const EntityArr = [];\n                          for (let i = 0; i < arr.length; i++) {\n                            const item = this.searchList[i];\n                            const _Entity_ = this._Entity.createBillboard({\n                              id: item.id,\n                              name: item.name,\n                              position: Cesium.Cartesian3.fromDegrees(\n                                item.location.lng,\n                                item.location.lat\n                              ),\n                              common: {\n                                label: {\n                                  //⽂字标签\n                                  text: item.name,\n                                  font: "500 30px Helvetica", // 15pt monospace\n                                  scale: 0.5,\n                                  style: Cesium.LabelStyle.FILL,\n                                  fillColor: Cesium.Color.WHITE,\n                                  pixelOffset: new Cesium.Cartesian2(-8, -50), //偏移量\n                                  showBackground: true,\n                                  heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,\n                                },\n                              },\n                              image:\n                                process.env.VUE_APP_PUBLIC_URL +\n                                "/Vue/Maps/Gaode/PoiQuery/position.png",\n                              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,\n                              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,\n                              width: 40,\n                              height: 40,\n                            });\n                            EntityArr.push(_Entity_);\n                          }\n                          return await EntityArr;\n                        };\n                  \n                        this._GaodeMap\n                          .placeSearch(placeSearchData)\n                          .then((res) => {\n                            this.searchList = res.pois;\n                            this.count = res.count;\n                            setPointPosition(res.pois).then((entityRes) => {\n                              this.EntityArr = entityRes;\n                            });\n                          })\n                          .catch((err) => {\n                            this.$notify.error({\n                              title: "错误",\n                              message: "请重新搜索",\n                            });\n                          });\n                      },\n                      /**\n                       * 表格行点击\n                       * @param {*} e\n                       */\n                      rowClick(e) {\n                        this.startCamera(e);\n                      },\n                      /**\n                       * 设置详细窗口\n                       */\n                      setDetails(location) {\n                        const Cesium = this.cesium;\n                        const dom = this.markerDetailedDom;\n                  \n                        this.viewer.scene.preRender.addEventListener(() => {\n                          const position = Cesium.Cartesian3.fromDegrees(\n                            location.lng,\n                            location.lat,\n                            0\n                          );\n                          var canvasPosition = this.viewer.scene.cartesianToCanvasCoordinates(\n                            position,\n                            new Cesium.Cartesian2()\n                          );\n                          if (Cesium.defined(canvasPosition)) {\n                            dom.style.top = canvasPosition.y - dom.offsetHeight - 20 + "px";\n                            dom.style.left = canvasPosition.x + dom.offsetWidth / 2 + "px";\n                          }\n                        });\n                        this.is_detailed = true;\n                      },\n                      /**\n                       * 相机视角调整到选中地址\n                       * @param {Object} data 地址数据\n                       */\n                      startCamera(data) {\n                        const Cesium = this.cesium;\n                        for (let i = 0; i < this.EntityArr.length; i++) {\n                          const item = this.EntityArr[i];\n                          if (item.id == data.id) {\n                            item.billboard.image =\n                              process.env.VUE_APP_PUBLIC_URL +\n                              "/Vue/Maps/Gaode/PoiQuery/position-active.png";\n                          } else {\n                            setTimeout(() => {\n                              item.billboard.image =\n                                process.env.VUE_APP_PUBLIC_URL +\n                                "/Vue/Maps/Gaode/PoiQuery/position.png";\n                            }, 1000);\n                          }\n                        }\n                  \n                        this._GaodeMap.getDetails(data.id).then((res) => {\n                          if (res.poiList.pois.length != 0) {\n                            this.detailed = res.poiList.pois[0];\n                            this.setDetails({\n                              lat: data.location.lat,\n                              lng: data.location.lng,\n                            });\n                          }\n                        });\n                  \n                        this.viewer.camera.flyTo({\n                          destination: Cesium.Cartesian3.fromDegrees(\n                            data.location.lng,\n                            data.location.lat,\n                            3000\n                          ),\n                        });\n                      },\n                    },\n                  };'},{codeLanguage:"css",content:".container {\n                      width: 100%;\n                      height: 100%;\n                      #cesiumContainer {\n                        width: 100%;\n                        height: 100%;\n                      }\n                    }\n                    .poi-view-panel {\n                      width: 500px;\n                      position: fixed;\n                      bottom: 0;\n                      right: 0;\n                      z-index: 3;\n                      background-color: #fff;\n                      border-radius: 6px 0 0 0;\n                      box-sizing: border-box;\n                      padding: 20px;\n                      .tabel-wrap {\n                        .pagination {\n                          padding: 10px 0;\n                          display: flex;\n                          justify-content: flex-end;\n                        }\n                      }\n                      .button-view {\n                        display: flex;\n                        align-items: center;\n                        justify-content: center;\n                        padding-top: 20px;\n                        > * {\n                          margin: 0 10px;\n                        }\n                      }\n                    }\n                    //城市选择表单过度动画\n                    .slide-fade-enter-active,\n                    .slide-fade-leave-active {\n                      transition: all 0.3s ease;\n                    }\n                    .slide-fade-enter,\n                    .slide-fade-leave-to {\n                      transform: translateY(10px);\n                      opacity: 0;\n                    }\n                    //详细窗口样式\n                    .marker-detailed-view {\n                      width: 300px;\n                      position: fixed;\n                      top: 50%;\n                      left: 50%;\n                      z-index: 2;\n                      background-color: #fff;\n                      padding: 10px;\n                      box-sizing: border-box;\n                      border-radius: 6px;\n                      .marker-detailed-title {\n                        font-size: 16px;\n                        color: #333;\n                        font-weight: bold;\n                        text-align: center;\n                        line-height: 1.3;\n                        padding: 10px 0 15px;\n                      }\n                      .marker-detailed-box {\n                        display: flex;\n                        .marker-detailed-image {\n                          width: 90px;\n                          margin-right: 10px;\n                          img {\n                            width: 100%;\n                            display: block;\n                          }\n                        }\n                        .marker-detailed-text {\n                          width: calc(100% - 100px);\n                          .marker-detailed-item {\n                            font-size: 12px;\n                            color: #666;\n                            margin-bottom: 5px;\n                            line-height: 1.3;\n                            span {\n                              color: #333;\n                            }\n                          }\n                        }\n                      }\n                      .marker-detailed-triangle {\n                        position: absolute;\n                        bottom: 0;\n                        left: 30px;\n                        border: 16px solid transparent;\n                        border-top-color: #fff;\n                        border-bottom: 0;\n                        margin: 0 0 -16px -16px;\n                        border-left: 0;\n                      }\n                    }"}]}],m={name:"PoiQuery",data:function(){return{viewer:null,_Entity:null,_GaodeMap:null,_Utils:null,searchKeyword:"",searchList:[],pageIndex:1,pageSize:10,count:0,cityRadio:1,city:[],cityOptions:[],EntityArr:[],detailed:{name:"",photos:[],rating:"",tel:"",type:"",pname:"",cityname:"",adname:"",address:""},is_detailed:!1,markerDetailedDom:null}},created:function(){this.$store.dispatch("highlight/set_code",h)},mounted:function(){var e=this;window._AMapSecurityConfig={securityJsCode:"2a0ce2005352672661417093c485a056"},this._Utils=new o["a"],this._Utils.loadJs("https://webapi.amap.com/maps?v=2.0&key=".concat("cb250acd7ee0e7b2049cb93747ae3d44","&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.DistrictSearch"),!0).then((function(){e._GaodeMap=new u(AMap),e._GaodeMap.districtList({subdistrict:2}).then((function(n){e.cityOptions=n}))})),this.init()},methods:{init:function(){var e=this.cesium;e.Ion.defaultAccessToken=Object({NODE_ENV:"production",VUE_APP_BASE_API:"/prod-api",VUE_APP_GAODE_KEY_WEB_SERVICE:"181ced609de9d446207b55e549bafcb6",VUE_APP_GAODE_KEY_WEB_TERMINAL:"cb250acd7ee0e7b2049cb93747ae3d44",VUE_APP_PUBLIC_URL:"/cesium-template",BASE_URL:""}).VUE_APP_TOKEN,this.viewer=new e.Viewer("cesiumContainer",{imageryProvider:new e.ArcGisMapServerImageryProvider({url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"}),terrainProvider:new e.CesiumTerrainProvider({url:"http://data.marsgis.cn/terrain"}),shouldAnimate:!0,infoBox:!1,selectionIndicator:!1}),this.viewer.scene.globe.depthTestAgainstTerrain=!1,this._Entity=new l["a"](e,this.viewer),this.markerDetailedDom=document.getElementById("marker-detailed-view"),this.eventOperation()},eventOperation:function(){var e=this,n=this.cesium,t=new n.ScreenSpaceEventHandler(this.viewer.scene.canvas);t.setInputAction((function(n){var t=e.viewer.scene.pick(n.position);if(t){var i=e.searchList.filter((function(e){return e.id==t.id.id}));0!=i.length&&e.startCamera(i[0])}}),n.ScreenSpaceEventType.LEFT_CLICK)},clearData:function(){this.searchKeyword="",this.searchList=[],this.city=[],this.viewer.entities.removeAll(),this.is_detailed=!1},currentPaginationChange:function(e){this.pageIndex=e,this.searchKeywordChange()},searchKeywordChange:function(){var e=this,n=this.cesium;if(""!=this.searchKeyword)if(2!=this.cityRadio||0!=this.city.length)if(""!=this.searchKeyword){var t={pageSize:this.pageSize,pageIndex:this.pageIndex,searchKeyword:this.searchKeyword};2==this.cityRadio&&(t.city=this.city[1]||"");var i=function(){var t=Object(r["a"])(Object(s["a"])().mark((function t(i){var a,r,o,l;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(e.viewer.entities.removeAll(),a=[],r=0;r<i.length;r++)o=e.searchList[r],l=e._Entity.createBillboard({id:o.id,name:o.name,position:n.Cartesian3.fromDegrees(o.location.lng,o.location.lat),common:{label:{text:o.name,font:"500 30px Helvetica",scale:.5,style:n.LabelStyle.FILL,fillColor:n.Color.WHITE,pixelOffset:new n.Cartesian2(-8,-50),showBackground:!0,heightReference:n.HeightReference.CLAMP_TO_GROUND}},image:"/cesium-template/Vue/Maps/Gaode/PoiQuery/position.png",verticalOrigin:n.VerticalOrigin.BOTTOM,heightReference:n.HeightReference.CLAMP_TO_GROUND,width:40,height:40}),a.push(l);return t.next=5,a;case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();this._GaodeMap.placeSearch(t).then((function(n){e.searchList=n.pois,e.count=n.count,i(n.pois).then((function(n){e.EntityArr=n}))})).catch((function(n){e.$notify.error({title:"错误",message:"请重新搜索"})}))}else this.$message({message:"请输入搜索关键词",type:"warning"});else this.$message({message:"请选择城市",type:"warning"});else this.searchList=[]},rowClick:function(e){this.startCamera(e)},setDetails:function(e){var n=this,t=this.cesium,i=this.markerDetailedDom;this.viewer.scene.preRender.addEventListener((function(){var a=t.Cartesian3.fromDegrees(e.lng,e.lat,0),s=n.viewer.scene.cartesianToCanvasCoordinates(a,new t.Cartesian2);t.defined(s)&&(i.style.top=s.y-i.offsetHeight-20+"px",i.style.left=s.x+i.offsetWidth/2+"px")})),this.is_detailed=!0},startCamera:function(e){for(var n=this,t=this.cesium,i=function(t){var i=n.EntityArr[t];i.id==e.id?i.billboard.image="/cesium-template/Vue/Maps/Gaode/PoiQuery/position-active.png":setTimeout((function(){i.billboard.image="/cesium-template/Vue/Maps/Gaode/PoiQuery/position.png"}),1e3)},a=0;a<this.EntityArr.length;a++)i(a);this._GaodeMap.getDetails(e.id).then((function(t){0!=t.poiList.pois.length&&(n.detailed=t.poiList.pois[0],n.setDetails({lat:e.location.lat,lng:e.location.lng}))})),this.viewer.camera.flyTo({destination:t.Cartesian3.fromDegrees(e.location.lng,e.location.lat,3e3)})}}},v=m,f=(t("1c9b"),t("cba8")),g=Object(f["a"])(v,i,a,!1,null,"62eb1e1a",null);n["default"]=g.exports},c407:function(e,n,t){"use strict";var i=t("c15f"),a=t("a35b"),s=(t("a256"),function(){function e(n,t){Object(i["a"])(this,e),this.Cesium=n,this.viewer=t}return Object(a["a"])(e,[{key:"getRandomColor",get:function(){for(var e="#",n=["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"],t=0;t<6;t++){var i=Math.floor(Math.random()*n.length+1)-1;e+=n[i]}return e}},{key:"operationDom",value:function(e,n,t){if("append"===e&&document.getElementById(n).appendChild(t),"remove"===e&&document.getElementById(n).remove(),"has"===e)return document.getElementById(n)}},{key:"debounce",value:function(e){var n,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(){var a=this,s=arguments;if(n&&clearTimeout(n),i){var r=!n;n=setTimeout((function(){n=null}),t),r&&e.apply(a,s)}else n=setTimeout((function(){e.apply}),t)}}},{key:"throttle",value:function(e,n,t){var i,a=0;return function(){var s=this,r=arguments;if(1===t){var o=Date.now();o-a>n&&(e.apply(s,r),a=o)}else 2===t&&(i||(i=setTimeout((function(){i=null,e.apply(s,r)}),n)))}}},{key:"createScript",value:function(e){var n=document.createElement("script");n.setAttribute("type","text/javascript"),n.setAttribute("src",e),document.getElementsByTagName("head")[0].appendChild(n)}},{key:"loadJs",value:function(e,n){return new Promise((function(t,i){var a=document.createElement("script");a.type="text/javascript",n&&(a.async="async"),a.src=e,document.body.appendChild(a),a.onload=function(){t()},a.onerror=function(){i()}}))}}]),e}());n["a"]=s},ffe0:function(e,n,t){}}]);