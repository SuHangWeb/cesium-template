export default [
  {
    codeLanguage: "VUE",
    relyOn: [
      {
        label: "gcoord（npm）",
        url: "https://www.npmjs.com/package/gcoord",
        externalLinks: true
      },
      {
        label: "geojson（npm）",
        url: "https://www.npmjs.com/package/geojson",
        externalLinks: true
      },
      {
        label: "Utils.js",
        url: "cesium/Utils.js"
      },
      {
        label: "Entity.js",
        url: "cesium/Entity.js"
      },
      {
        label: "Canvas.js",
        url: "cesium/Canvas.js"
      },
      {
        label: "Gaode/index.js",
        url: "cesium/Map/Gaode/index.js"
      },
      {
        label: "Materials/index.js",
        url: "cesium/Materials/index.js"
      },
      {
        label: "TrailLineMaterialProperty.js",
        url: "Vue/Maps/Gaode/PoiQuery/material/TrailLineMaterialProperty.js"
      },
      {
        label: "POI-panel.scss",
        url: "Vue/Maps/Gaode/PoiQuery/POI-panel.scss"
      },
      {
        label: "POI-panel.vue",
        url: "Vue/Maps/Gaode/PoiQuery/POI-panel.vue"
      },
      {
        label: "position.png",
        url: "Vue/Maps/Gaode/PoiQuery/position.png"
      },
      {
        label: "position-active.png",
        url: "Vue/Maps/Gaode/PoiQuery/position-active.png"
      },
      {
        label: "cluster_1.png",
        url: "Vue/Maps/Gaode/PoiQuery/cluster_1.png"
      },
      {
        label: "cluster_2.png",
        url: "Vue/Maps/Gaode/PoiQuery/cluster_2.png"
      },
      {
        label: "cluster_3.png",
        url: "Vue/Maps/Gaode/PoiQuery/cluster_3.png"
      },
      {
        label: "cluster_4.png",
        url: "Vue/Maps/Gaode/PoiQuery/cluster_4.png"
      },
    ],
    code: [
      {
        codeLanguage: "html",
        content: `<template>
                    <div class="container">
                      <div id="cesiumContainer"></div>
                      <el-button
                        type="primary"
                        class="tools"
                        icon="el-icon-s-tools"
                        circle
                        @click="poiPanelShow = !poiPanelShow"
                      ></el-button>
                      <poi-Panel
                        :show="poiPanelShow"
                        @close="poiPanelShow = false"
                        @load="load"
                        @poisClick="poisClick"
                      />
                    </div>
                  </template>`
      },
      {
        codeLanguage: "js",
        content: `import poiPanel from "./module/POI-panel.vue";
                  import Canvas from "@/common/cesium/Canvas.js";
                  import Entity from "@/common/cesium/Entity.js";
                  import gcoord from "gcoord";
                  import TrailLineMaterialProperty from "./module/material/TrailLineMaterialProperty"; //流动
                  import Material from "@/common/cesium/Materials/index.js";
                  import GeoJSON from "geojson";
                  export default {
                    name: "PoiQuery",
                    components: { poiPanel },
                    data() {
                      return {
                        poiPanelShow: false,
                  
                        viewer: null,
                        _Entity: null,
                        _Canvas: null,
                  
                        EntityArr: [],
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
                        //地形侦测
                        this.viewer.scene.globe.depthTestAgainstTerrain = false;
                  
                        this._Entity = new Entity(Cesium, this.viewer);
                        this._Material = new Material(Cesium, this.viewer);
                        this._Canvas = new Canvas(Cesium, this.viewer);
                      },
                      /**
                       * 兴趣点触发
                       * @param {*} e
                       */
                      poisClick(e) {
                        //坐标系转换
                        const result = gcoord.transform(
                          [e.location.lng, e.location.lat], // 经纬度坐标
                          gcoord.AMap, // 当前坐标系
                          gcoord.WGS84 // 目标坐标系
                        );
                        this.setCamera({
                          location: result,
                        });
                      },
                      /**
                       * 设置相机位置
                       * @param {*} e
                       */
                      setCamera(e) {
                        const Cesium = this.cesium;
                        this.viewer.camera.flyTo({
                          destination: Cesium.Cartesian3.fromDegrees(
                            e.location[0],
                            e.location[1],
                            3000
                          ),
                        });
                      },
                      /**
                       * 操作面板加载回调
                       */
                      load(e) {
                        this.viewer.entities.removeAll();
                        if (e.type == "pois") {
                          this.setPointPosition(e).then((res) => {
                            this.EntityArr = res;
                            this.viewer.flyTo(res);
                          });
                        }
                        if (e.type == "navigation") {
                          this.setDrawRoute(e.data, e.style);
                        }
                      },
                      /**
                       * 绘制路线
                       * @param {*} arr
                       */
                      setDrawRoute(arr, style) {
                        const Cesium = this.cesium;
                        let color = "";
                        if (style == "driving") {
                          color = "#409EFF";
                        }
                        if (style == "riding") {
                          color = "#67C23A";
                        }
                        if (style == "walking") {
                          color = "#E6A23C";
                        }
                  
                        const arrData = [];
                        arr.map((item) => {
                          const result = gcoord.transform(
                            [item[0], item[1]], // 经纬度坐标
                            gcoord.AMap, // 当前坐标系
                            gcoord.WGS84 // 目标坐标系
                          );
                          arrData.push(result[0], result[1]);
                        });
                  
                        this._Material.create(TrailLineMaterialProperty(Cesium));
                  
                        const Route = this._Entity.createPolyline({
                          positions: Cesium.Cartesian3.fromDegreesArray(arrData),
                          // clampToGround: true,
                          // material: new Cesium.Color.fromCssColorString(color),
                          material: new Cesium.Material_TrailLineMaterialProperty(),
                          arcType: Cesium.ArcType.GEODESIC,
                          width: 10,
                        });
                        this.viewer.flyTo(Route);
                      },
                      /**
                       * 设置标点
                       */
                      async setPointPosition(data) {
                        const Cesium = this.cesium;
                        
                        //实体数据
                        const EntityArr = [];
                        //是否聚合
                        const polymerization = data.polymerization;
                        //json数据
                        const arr = data.data;
                        //geojson 数据
                        return await new Promise((resolve, reject) => {
                          if (polymerization) {
                            const _getJson = GeoJSON.parse(arr, {
                              Point: ["location.lat", "location.lng"],
                            });
                            new Cesium.GeoJsonDataSource().load(_getJson).then((dataSource) => {
                              this.viewer.dataSources.add(dataSource);
                              // 设置聚合参数
                              dataSource.clustering.enabled = true;
                              dataSource.clustering.pixelRange = 60;
                              dataSource.clustering.minimumClusterSize = 2;
                  
                              // foreach用于调用数组的每个元素，并将元素传递给回调函数。
                              for (let i = 0; i < dataSource.entities.values.length; i++) {
                                const entity = dataSource.entities.values[i];
                                // 将点拉伸一定高度，防止被地形压盖
                                entity.position._value.z += 50.0;
                                // 使用大小为64*64的icon，缩小展示poi
                                entity.billboard = {
                                  image:
                                    process.env.VUE_APP_PUBLIC_URL +
                                    "/Vue/Maps/Gaode/PoiQuery/position.png",
                                  width: 16,
                                  height: 22,
                                };
                                //⽂字标签
                                entity.label = {
                                  text: entity.properties.name._value,
                                  font: "500 30px Helvetica", // 15pt monospace
                                  scale: 0.5,
                                  style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                  fillColor: Cesium.Color.WHITE,
                                  pixelOffset: new Cesium.Cartesian2(-8, -50), //偏移量
                                  showBackground: false,
                                  heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                  distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                                    0.0,
                                    20000.0
                                  ),
                                };
                                EntityArr.push(entity);
                              }
                  
                              // 添加监听函数
                              dataSource.clustering.clusterEvent.addEventListener(
                                (clusteredEntities, cluster) => {
                                  // 关闭自带的显示聚合数量的标签
                                  cluster.label.show = false;
                                  cluster.billboard.show = true;
                                  cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
                  
                                  // 根据聚合数量的多少设置不同层级的图片以及大小
                                  if (clusteredEntities.length >= 20) {
                                    cluster.billboard.image = this._Canvas.combineIconAndLabel({
                                      url:
                                        process.env.VUE_APP_PUBLIC_URL +
                                        "/Vue/Maps/Gaode/PoiQuery/cluster_4.png",
                                      label: clusteredEntities.length,
                                      size: 72,
                                    });
                                    cluster.billboard.width = 72;
                                    cluster.billboard.height = 72;
                                  } else if (clusteredEntities.length >= 12) {
                                    cluster.billboard.image = this._Canvas.combineIconAndLabel({
                                      url:
                                        process.env.VUE_APP_PUBLIC_URL +
                                        "/Vue/Maps/Gaode/PoiQuery/cluster_3.png",
                                      label: clusteredEntities.length,
                                      size: 56,
                                    });
                                    cluster.billboard.width = 56;
                                    cluster.billboard.height = 56;
                                  } else if (clusteredEntities.length >= 8) {
                                    cluster.billboard.image = this._Canvas.combineIconAndLabel({
                                      url:
                                        process.env.VUE_APP_PUBLIC_URL +
                                        "/Vue/Maps/Gaode/PoiQuery/cluster_2.png",
                                      label: clusteredEntities.length,
                                      size: 48,
                                    });
                                    cluster.billboard.width = 48;
                                    cluster.billboard.height = 48;
                                  } else {
                                    cluster.billboard.image = this._Canvas.combineIconAndLabel({
                                      url:
                                        process.env.VUE_APP_PUBLIC_URL +
                                        "/Vue/Maps/Gaode/PoiQuery/cluster_1.png",
                                      label: clusteredEntities.length,
                                      size: 40,
                                    });
                                    cluster.billboard.width = 40;
                                    cluster.billboard.height = 40;
                                  }
                                }
                              );
                            });
                            setTimeout(()=>{
                              resolve(EntityArr)
                            },1000)
                            // return await EntityArr;
                          } else {
                            for (let i = 0; i < arr.length; i++) {
                              const item = arr[i];
                              //坐标系转换
                              const result = gcoord.transform(
                                [item.location.lng, item.location.lat], // 经纬度坐标
                                gcoord.AMap, // 当前坐标系
                                gcoord.WGS84 // 目标坐标系
                              );
                              const _Entity_ = this._Entity.createBillboard({
                                id: item.id,
                                name: item.name,
                                position: Cesium.Cartesian3.fromDegrees(result[0], result[1]),
                                common: {
                                  label: {
                                    //⽂字标签
                                    text: item.name,
                                    font: "500 30px Helvetica", // 15pt monospace
                                    scale: 0.5,
                                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                    fillColor: Cesium.Color.WHITE,
                                    pixelOffset: new Cesium.Cartesian2(-8, -50), //偏移量
                                    showBackground: false,
                                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                                      0.0,
                                      20000.0
                                    ),
                                  },
                                },
                                image:
                                  process.env.VUE_APP_PUBLIC_URL +
                                  "/Vue/Maps/Gaode/PoiQuery/position.png",
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                width: 16,
                                height: 22,
                              });
                              EntityArr.push(_Entity_);
                            }
                            setTimeout(()=>{
                              resolve(EntityArr)
                            },1000)
                            // return await EntityArr;
                          }
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
                    .tools {
                      position: fixed;
                      bottom: 40px;
                      right: 20px;
                    }
                  }`
      }
    ]
  },
  {
    codeLanguage: "JS",
    relyOn: [
      {
        label: "gcoord",
        url: "JavaScript/cesium/Tripartite/gcoord/dist/gcoord.js",
      },
      {
        label: "geojson",
        url: "JavaScript/cesium/Tripartite/geojson/geojson.min.js",
      },
      {
        label: "layer",
        url: "JavaScript/cesium/Tripartite/layer/layer.zip",
      },
      {
        label: "layui",
        url: "JavaScript/cesium/Tripartite/layui/layui.zip",
      },
      {
        label: "Utils.js",
        url: "JavaScript/cesium/Utils.js"
      },
      {
        label: "Entity.js",
        url: "JavaScript/cesium/Entity.js"
      },
      {
        label: "Canvas.js",
        url: "JavaScript/cesium/Canvas.js"
      },
      {
        label: "Gaode/index.js",
        url: "JavaScript/cesium/Map/Gaode/index.js"
      },
      {
        label: "position.png",
        url: "JavaScript/Maps/Gaode/PoiQuery/position.png"
      },
      {
        label: "position-active.png",
        url: "JavaScript/Maps/Gaode/PoiQuery/position-active.png"
      },
      {
        label: "cluster_1.png",
        url: "JavaScript/Maps/Gaode/PoiQuery/cluster_1.png"
      },
      {
        label: "cluster_2.png",
        url: "JavaScript/Maps/Gaode/PoiQuery/cluster_2.png"
      },
      {
        label: "cluster_3.png",
        url: "JavaScript/Maps/Gaode/PoiQuery/cluster_3.png"
      },
      {
        label: "cluster_4.png",
        url: "JavaScript/Maps/Gaode/PoiQuery/cluster_4.png"
      },
    ],
    code: [
      {
        codeLanguage: "js",
        content: `function gaodePoi() {
                      window.gaodePoiVar = {
                          tabIndex: 0,
                          securityJsCode: "2a0ce2005352672661417093c485a056",//高德code  测试不久之后会失效 需要自行注册
                          key: "cb250acd7ee0e7b2049cb93747ae3d44",//高德key 测试不久之后会失效 需要自行注册
                          openSetUpDomId: "openSetUp",//打开操作面板元素id
                          openPOIPanelDomId: "POIPanel",//操作面板元素id
                          filePath: "/test/Maps/Gaode/PoiQuery",//通用路径
                          _Utils: null,
                          _GaodeMap: null,
                          _Entity: null,//初始化实体函数
                          _Canvas: null,
                          linkageAddressProvinceDom: null,//存放 初始化 城市联动dom元素（省）
                          linkageAddressCityDom: null,//存放 初始化 城市联动dom元素（市）
                          cityCode: "",//选择的市code （只存了市级的code 因为目前检索需要 而省则暂时不需要）
                          placeSearchType: [],//搜索的兴趣点类别数据
                          placeSearchTypeCheckboxDom: null,//暂存 兴趣点类别 复选数据
                          districtList: [],//行政列表数据
                          polymerization: false,//是否聚合
                  
                          pageSize: 10,
                          pageIndex: 1,
                          total: 0,
                          poisList: [],//检索点数据
                  
                          poisEntityArr: [],//存入点位实体
                  
                  
                          startPosition: "", //起始输入位置数据
                          endPosition: "", //终点输入位置数据
                          startPositionResult: {}, //起始结果位置数据
                          endPositionResult: {}, //终点结果位置数据
                  
                  
                  
                          //初始化
                          init() {
                              window._AMapSecurityConfig = {
                                  securityJsCode: this.securityJsCode,
                              };
                              this._Utils = new Utils()
                              this._Canvas = new Canvas(Cesium)
                              this._Entity = new Entity(Cesium, viewer);
                              const url = "https://webapi.amap.com/maps?v=2.0&key="+this.key+"&plugin="+new GaodeMap().plugin"
                              this._Utils.loadJs(url,{ append: "body", defer: true }).then(() => {
                                      this._GaodeMap = new GaodeMap(AMap);
                                      //行政列表
                                      this._GaodeMap.districtList({ subdistrict: 2 }).then((res) => {
                                          // console.log(res)
                                          this.districtList = res
                  
                                          //创建 省 dom元素 start
                                          let province = window.document.createElement("div");
                                          province.id = "linkageAddress-province"
                                          province.className = "linkageAddress-province linkageAddress-input"
                                          let province_find_html = ""
                                          for (let province_i = 0; province_i < res.length; province_i++) {
                                              const province_item = res[province_i]
                                              province_find_html += '<li onclick="gaodePoiVar.linkageAddressTrigger(event,'+'province'+')" data-value="'+province_item.adcode+'" data-label="'+province_item.name+'">'+province_item.name+'</li>'
                                          }
                                          let provinceHtml = "<p>请选择省<span>&or;</span></p><input><ul>+"province_find_html"+</ul>"
                                          province.innerHTML = provinceHtml
                                          this.linkageAddressProvinceDom = province
                                          //创建 省 dom元素 end

                                          // 创建 市 dom元素 start
                                          let city = window.document.createElement("div");
                                          city.id = "linkageAddress-city"
                                          city.className = "linkageAddress-city linkageAddress-input disabled"
                                          let cityHtml = "<p>请选择市<span>&or;</span></p><input><ul></ul>"
                                          city.innerHTML = cityHtml
                                          this.linkageAddressCityDom = city
                                          // 创建 市 dom元素 end
                  
                                          //调用创建 面板打开关闭按钮
                                          this.createOpenSetUpButton()
                                          //创建操作面板
                                          this.createPOIPanel({
                                              linkageAddress: {
                                                  province,
                                                  city
                                              }
                                          })
                                          //创建导航搜索组件
                                          this.initAutoComplete()
                                      });
                                      //搜索数据的兴趣点类别
                                      this.placeSearchType = this._GaodeMap.placeSearchType
                                      let placeSearchType = window.document.createElement("div");
                                      placeSearchType.id = "placeSearchType"
                                      placeSearchType.className = "placeSearchType"
                                      let placeSearchType_html = ""
                                      for (let placeSearchType_i = 0; placeSearchType_i < this._GaodeMap.placeSearchType.length; placeSearchType_i++) {
                                          const placeSearchType_item = this._GaodeMap.placeSearchType[placeSearchType_i]
                                          placeSearchType_html += '<label><input type="checkbox" value="'+placeSearchType_item+'" name="placeSearchType">'+placeSearchType_item+'</label>'
                                      }
                                      placeSearchType.innerHTML = placeSearchType_html
                                      this.placeSearchTypeCheckboxDom = placeSearchType
                                  });
                          },
                          /**
                          * 创建初始化 点击显示面板按钮
                          */
                          createOpenSetUpButton() {
                              const createOpenSetUpDom = (id) => {
                                  let _div = window.document.createElement("div");
                                  _div.id = id
                                  _div.className = id
                                  let html = '<div class="icon-view" onclick="gaodePoiVar.openPOIPanel()"><img src="'+this.filePath'+/icon-setup.png" alt="" /></div>'
                                  _div.innerHTML = html
                                  return _div
                              }
                  
                              if (!this._Utils.operationDom('has', this.openSetUpDomId)) {
                                  this._Utils.operationDom("append", 'MainCenter', createOpenSetUpDom(this.openSetUpDomId))
                              }
                          },
                          /**
                          * 关闭操作面板
                          */
                          closePOIPanel() {
                              document.getElementById(this.openPOIPanelDomId).className = "POIPanel";
                          },
                          /**
                          * 打开操作面板
                          */
                          openPOIPanel() {
                              document.getElementById(this.openPOIPanelDomId).className = "POIPanel active";
                          },
                          /**
                          * 创建操作面板
                          */
                          createPOIPanel({ linkageAddress }) {
                              /**
                              * 创建操作面板dom
                              * @param {*} id 
                              * @returns html
                              */
                              const createPOIPanelDom = (id) => {
                                  let _div = window.document.createElement("div");
                                  _div.id = id
                                  _div.className = id
                                  let html = '<div class="poiHead"><div class="poiHead-title">操作面板</div><div class="poiHead-close" onclick="gaodePoiVar.closePOIPanel()">×</div></div>'
                                  html+= '<div class="poi-operation"><div class="poi-tab"><div class="poi-tab-item active" onclick="gaodePoiVar.poiTabClick(0)">兴趣点</div><div class="poi-tab-item" onclick="gaodePoiVar.poiTabClick(1)">路线规划与导航</div></div>'
                                  html+='<div class="poi-tab-box active">'
                                  html+='<div class="poi-tab-box-item">'
                                  html+='<div class="poi-form">'
                                  html+='<div class="poi-form-item">'
                                  html+='<div class="poi-form-item-label">范围：</div>'
                                  html+='<div class="poi-form-item-value"><label><input onclick="gaodePoiVar.rangeClick(event)" class="radio" type="radio" name="range" value="city" checked="checked" />城市</label><label><input onclick="gaodePoiVar.rangeClick(event)" class="radio" type="radio" name="range" value="all"/>全国</label></div>'
                                  html+='</div>'
                                  html+='<div class="poi-form-item" id="city-poi-form-item">'
                                  html+='<div class="poi-form-item-label">城市：</div>'
                                  html+='<div class="poi-form-item-value"><div id="cityAddress" class="linkageAddress"></div></div>'
                                  html+='</div>'
                                  html+='<div class="poi-form-item">'
                                  html+='<div class="poi-form-item-label">兴趣点类别：</div>'
                                  html+='<div class="poi-form-item-value" id="placeSearchTypeWrap"></div>'
                                  html+='</div>'
                                  html+='<div class="poi-form-item">'
                                  html+='<div class="poi-form-item-label">是否聚合：</div>'
                                  html+='<div class="poi-form-item-value"><div class="polymerization"><label><input type="radio" name="polymerization" value="0" checked />否</label><label><input type="radio" name="polymerization" value="1" />是</label></div></div>'
                                  html+='</div>'
                                  html+='<div class="text-search">'
                                  html+='<input type="text" class="search-text" id="search-text" autocomplete="off" placeholder="请输入搜索关键词"/>'
                                  html+='<button class="text-search-button" onclick="gaodePoiVar.get_form_data()">搜索</button>'
                                  html+='</div>'
                                  html+='</div></div></div>'
                                  html+='<div class="poi-tab-box"><div class="poi-tab-box-item"><div class="poi-form">'
                                  html+='<div class="poi-form-item">'
                                  html+='<div class="poi-form-item-label">起始位置：</div>'
                                  html+='<div class="poi-form-item-value"><input type="text" class="poiInput" id="startPosition" autocomplete="off" placeholder="搜索起始位置"/></div>'
                                  html+='</div>'
                                  html+='<div class="poi-form-item">'
                                  html+='<div class="poi-form-item-label">终点位置：</div>'
                                  html+='<div class="poi-form-item-value"><input type="text" class="poiInput" id="endPosition" autocomplete="off" placeholder="搜索终点位置"/></div>'
                                  html+='</div>'
                                  html+='<div class="poi-form-item">'
                                  html+='<div class="poi-form-item-label">类型：</div>'
                                  html+='<div class="poi-form-item-value"><div class="navigationType"><label><input type="radio" name="navigationType" value="1"  />驾车</label><label><input type="radio" name="navigationType" value="2" />公交</label><label><input type="radio" name="navigationType" value="3"  />骑行</label><label><input type="radio" name="navigationType" value="4" />步行</label><button class="search-button" onclick="gaodePoiVar.get_form_data()">搜索</button></div></div>'
                                  html+='</div>'
                                  html+='</div></div></div></div>'
                                  html+='<div class="poi-main active"><div class="data-view" id="data-view"></div><div id="pagination-view" class="pagination-view"></div></div>'
                                  html+='<div class="poi-main" id="panel"></div>'
                                  _div.innerHTML = html
                                  return _div
                              }
                              if (!this._Utils.operationDom('has', this.openPOIPanelDomId)) {
                                  this._Utils.operationDom("append", 'MainCenter', createPOIPanelDom(this.openPOIPanelDomId))
                              }
                              const cityAddress = document.getElementById("cityAddress")
                              cityAddress.appendChild(linkageAddress.province)
                              cityAddress.appendChild(linkageAddress.city)
                              document.getElementById("placeSearchTypeWrap").appendChild(this.placeSearchTypeCheckboxDom)
                  
                          },
                  
                          /**
                          * 操作面板切换操作功能
                          * @param {*} index
                          */
                          poiTabClick(index) {
                              this.tabIndex = Number(index)
                              const POIPanel = document.querySelector('#POIPanel')
                              const poiHeadTabItem = POIPanel.querySelectorAll('.poi-tab-item');
                              const poiTabBox = POIPanel.querySelectorAll('.poi-tab-box');
                              const poiMain = POIPanel.querySelectorAll('.poi-main');
                              for (let i = 0; i < poiHeadTabItem.length; i++) {
                                  poiHeadTabItem[i].className = "poi-tab-item"
                                  poiTabBox[i].className = "poi-tab-box"
                                  poiMain[i].className = "poi-main"
                              }
                              poiHeadTabItem[index].className = "poi-tab-item active"
                              poiTabBox[index].className = "poi-tab-box active"
                              poiMain[index].className = "poi-main active " + "poi-main" + index
                          },
                          /**
                          * 联动菜单组件触发
                          * @param {*} event 
                          * @param {*} type province/省 city/市
                          */
                          linkageAddressTrigger(event, type) {
                              const e = {
                                  label: event.target.dataset.label,
                                  value: event.target.dataset.value
                              }
                              //省触发
                              if (type == "province") {
                                  const province = document.getElementById("linkageAddress-province")
                                  const p = province.getElementsByTagName("p")
                                  p[0].innerHTML = e.label + '<span>&or;</span>'
                  
                                  const city = document.getElementById("linkageAddress-city")
                                  city.className = "linkageAddress-city linkageAddress-input"
                                  const ul = city.getElementsByTagName("ul")[0]
                                  ul.innerHTML = ""
                                  this.cityCode = ""
                                  const city_p = city.getElementsByTagName("p")
                                  city_p[0].innerHTML = "请选择市<span>&or;</span>"
                                  const f_data = this.districtList.filter(item => item.adcode == e.value)
                                  if (f_data.length == 0) return
                  
                                  let city_li_html = ""
                                  for (let city_i = 0; city_i < f_data[0].districtList.length; city_i++) {
                                      const city_item = f_data[0].districtList[city_i]
                                      city_li_html += '<li onclick="gaodePoiVar.linkageAddressTrigger(event,'city')" data-value="'+city_item.adcode+'" data-label="'+city_item.name+'">'+city_item.name+'</li>'
                                  }
                                  ul.innerHTML = city_li_html
                              }
                  
                              //市触发
                              if (type == "city") {
                                  const city = document.getElementById("linkageAddress-city")
                                  const p = city.getElementsByTagName("p")
                                  p[0].innerHTML = e.label + "<span>&or;</span>"
                                  this.cityCode = e.value
                              }
                          },
                  
                          /**
                          * 范围触发
                          * @param {*} event 
                          */
                          rangeClick(event) {
                              const cityForm = document.getElementById("city-poi-form-item")
                              if (event.target.defaultValue == "all") {
                                  cityForm.style.display = "none"
                              }
                              if (event.target.defaultValue == "city") {
                                  cityForm.style.display = "flex"
                              }
                          },
                  
                          /**
                          * 操作分页
                          */
                          setPagination() {
                              layui.use('laypage', () => {
                                  var laypage = layui.laypage;
                                  //执行一个laypage实例
                                  laypage.render({
                                      elem: 'pagination-view',
                                      count: this.total,//数据总数，从服务端得到
                                      limit: this.pageSize,
                                      curr: this.pageIndex,
                                      jump: (obj, first) => {
                                          //obj包含了当前分页的所有参数，比如：
                                          // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                                          // console.log(obj.limit); //得到每页显示的条数
                                          //首次不执行
                                          if (!first) {
                                              this.pageIndex = obj.curr
                                              this.get_form_data()
                                          }
                                      }
                                  });
                              });
                          },
                  
                          /**
                          * 渲染视图
                          */
                          setView() {
                              const dataView = document.getElementById("data-view")
                              dataView.innerHTML = ""
                              let _div = window.document.createElement("div");
                              _div.className = "data-view-box"
                              let html = ""
                              let image = ""
                              for (let i = 0; i < this.poisList.length; i++) {
                                  const item = this.poisList[i]
                                  if (item.photos.length != 0) {
                                      image = '<img src="'+item.photos[0].url+'"/>'
                                  } else {
                                      image = '<div class="imageError">error</div>'
                                  }

                                  html += '<div class="data-view-item" onclick='gaodePoiVar.setFlyTo(\"'+item.id+'\")'>'
                                  html += '<div class="data-view-item-image">'+image+'</div>'
                                  html += '<div class="data-view-item-text">'
                                  html += '<h3>'+item.name+'</h3>'
                                  html += '<p>电话：'+item.tel+'</p>'
                                  html += '<p>类目：'+item.type+'</p>'
                                  html += '<p> 地址：'+item.pname+item.cityname+item.adname+item.address+'</p>'
                                  html += '</div>'
                                  html += '</div>'
                              }
                              _div.innerHTML = html
                  
                              dataView.appendChild(_div)
                  
                          },
                  
                          /**
                          * 渲染点位
                          */
                          setPoint() {
                              const _this = this
                              async function setPointPosition(data) {
                                  viewer.entities.removeAll();
                                  //实体数据
                                  const EntityArr = [];
                                  //是否聚合
                                  const polymerization = data.polymerization;
                                  //json数据
                                  const arr = data.data;
                                  //geojson 数据
                                  return await new Promise((resolve, reject) => {
                                      if (polymerization) {
                                          const _getJson = GeoJSON.parse(arr, {
                                              Point: ["location.lat", "location.lng"],
                                          });
                                          new Cesium.GeoJsonDataSource().load(_getJson).then((dataSource) => {
                                              viewer.dataSources.add(dataSource);
                                              // 设置聚合参数
                                              dataSource.clustering.enabled = true;
                                              dataSource.clustering.pixelRange = 60;
                                              dataSource.clustering.minimumClusterSize = 2;
                  
                                              // foreach用于调用数组的每个元素，并将元素传递给回调函数。
                                              for (let i = 0; i < dataSource.entities.values.length; i++) {
                                                  const entity = dataSource.entities.values[i];
                                                  // 将点拉伸一定高度，防止被地形压盖
                                                  entity.position._value.z += 50.0;
                                                  // 使用大小为64*64的icon，缩小展示poi
                                                  entity.billboard = {
                                                      image:
                                                          _this.filePath + "/position.png",
                                                      width: 16,
                                                      height: 22,
                                                  };
                                                  //⽂字标签
                                                  entity.label = {
                                                      text: entity.properties.name._value,
                                                      font: "500 30px Helvetica", // 15pt monospace
                                                      scale: 0.5,
                                                      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                                      fillColor: Cesium.Color.WHITE,
                                                      pixelOffset: new Cesium.Cartesian2(-8, -50), //偏移量
                                                      showBackground: false,
                                                      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                                                          0.0,
                                                          20000.0
                                                      ),
                                                  };
                                                  EntityArr.push(entity);
                                              }
                  
                                              // 添加监听函数
                                              dataSource.clustering.clusterEvent.addEventListener(
                                                  (clusteredEntities, cluster) => {
                                                      // 关闭自带的显示聚合数量的标签
                                                      cluster.label.show = false;
                                                      cluster.billboard.show = true;
                                                      cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
                  
                                                      // 根据聚合数量的多少设置不同层级的图片以及大小
                                                      if (clusteredEntities.length >= 20) {
                                                          cluster.billboard.image = _this._Canvas.combineIconAndLabel({
                                                              url:
                                                                  _this.filePath + "/cluster_4.png",
                                                              label: clusteredEntities.length,
                                                              size: 72,
                                                          });
                                                          cluster.billboard.width = 72;
                                                          cluster.billboard.height = 72;
                                                      } else if (clusteredEntities.length >= 12) {
                                                          cluster.billboard.image = _this._Canvas.combineIconAndLabel({
                                                              url:
                                                                  _this.filePath + "/cluster_3.png",
                                                              label: clusteredEntities.length,
                                                              size: 56,
                                                          });
                                                          cluster.billboard.width = 56;
                                                          cluster.billboard.height = 56;
                                                      } else if (clusteredEntities.length >= 8) {
                                                          cluster.billboard.image = _this._Canvas.combineIconAndLabel({
                                                              url:
                                                                  _this.filePath + "/cluster_2.png",
                                                              label: clusteredEntities.length,
                                                              size: 48,
                                                          });
                                                          cluster.billboard.width = 48;
                                                          cluster.billboard.height = 48;
                                                      } else {
                                                          cluster.billboard.image = _this._Canvas.combineIconAndLabel({
                                                              url:
                                                                  _this.filePath + "/cluster_1.png",
                                                              label: clusteredEntities.length,
                                                              size: 40,
                                                          });
                                                          cluster.billboard.width = 40;
                                                          cluster.billboard.height = 40;
                                                      }
                                                  }
                                              );
                                          });
                                          setTimeout(() => {
                                              resolve(EntityArr)
                                          }, 1000)
                                          // return await EntityArr;
                                      } else {
                                          for (let i = 0; i < arr.length; i++) {
                                              const item = arr[i];
                                              //坐标系转换
                                              const result = gcoord.transform(
                                                  [item.location.lng, item.location.lat], // 经纬度坐标
                                                  gcoord.AMap, // 当前坐标系
                                                  gcoord.WGS84 // 目标坐标系
                                              );
                                              const _Entity_ = _this._Entity.createBillboard({
                                                  id: item.id,
                                                  name: item.name,
                                                  position: Cesium.Cartesian3.fromDegrees(result[0], result[1]),
                                                  common: {
                                                      label: {
                                                          //⽂字标签
                                                          text: item.name,
                                                          font: "500 30px Helvetica", // 15pt monospace
                                                          scale: 0.5,
                                                          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                                          fillColor: Cesium.Color.WHITE,
                                                          pixelOffset: new Cesium.Cartesian2(-8, -50), //偏移量
                                                          showBackground: false,
                                                          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                                                              0.0,
                                                              20000.0
                                                          ),
                                                      },
                                                  },
                                                  image:
                                                      _this.filePath + "/position.png",
                                                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                  heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                  width: 16,
                                                  height: 22,
                                              });
                                              EntityArr.push(_Entity_);
                                          }
                                          setTimeout(() => {
                                              resolve(EntityArr)
                                          }, 1000)
                                          // return await EntityArr;
                                      }
                                  });
                              }
                  
                              setPointPosition({
                                  polymerization: this.getPolymerization(),
                                  data: this.poisList,
                              }).then((res) => {
                                  this.poisEntityArr = res;
                                  viewer.flyTo(res);
                              });
                          },
                          /**
                          * 触发单条 视图定位
                          * @param {*} id 
                          */
                          setFlyTo(id) {
                              this.poisEntityArr.map(item => {
                                  if (item.id == id) {
                                      viewer.flyTo(item);
                                  }
                              })
                          },
                          /**
                          * 是否聚合
                          */
                          getPolymerization() {
                              const arr = [...document.querySelectorAll('input[type=radio][name=polymerization]')]
                              let data = false
                              arr.map(item => {
                                  if (item.checked) {
                                      if (item.defaultValue === "0") {
                                          data = false
                                      } else {
                                          data = true
                                      }
                                  }
                              })
                              return data
                          },
                  
                          /**
                          * 初始化路线规划和导航的表单筛选
                          */
                          initAutoComplete() {
                              //搜素组件
                              this._GaodeMap
                                  .AutoComplete({
                                      input: "startPosition",
                                  })
                                  .then((res) => {
                                      res.on("select", (result) => {
                                          if (!result.poi.location) {
                                              layer.msg('输入的地址有误，请重新输入', { icon: 5 });
                                              return;
                                          }
                                          this.startPositionResult = result;
                                      });
                                  });
                  
                              this._GaodeMap
                                  .AutoComplete({
                                      input: "endPosition",
                                  })
                                  .then((res) => {
                                      res.on("select", (result) => {
                                          if (!result.poi.location) {
                                              layer.msg('输入的地址有误，请重新输入', { icon: 5 });
                                              return;
                                          }
                                          this.endPositionResult = result;
                                      });
                                  });
                          },
                          /**
                          * 绘制路线
                          * @param {*} arr 
                          * @param {*} style 
                          */
                          setDrawRoute(arr, style) {
                              let color = "";
                              if (style == "driving") {
                                  color = "#409EFF";
                              }
                              if (style == "riding") {
                                  color = "#67C23A";
                              }
                              if (style == "walking") {
                                  color = "#E6A23C";
                              }
                  
                              const arrData = [];
                              arr.map((item) => {
                                  const result = gcoord.transform(
                                      [item[0], item[1]], // 经纬度坐标
                                      gcoord.AMap, // 当前坐标系
                                      gcoord.WGS84 // 目标坐标系
                                  );
                                  arrData.push(result[0], result[1]);
                              });
                  
                              const Route = this._Entity.createPolyline({
                                  positions: Cesium.Cartesian3.fromDegreesArray(arrData),
                                  material: new Cesium.Color.fromCssColorString(color),
                                  arcType: Cesium.ArcType.GEODESIC,
                                  width: 10,
                              });
                              viewer.flyTo(Route);
                          },
                          /**
                          * 获取表单数据
                          */
                          get_form_data() {
                              //获取复选框
                              function getAllCheckbox() {
                                  const arr = [...document.querySelectorAll('input[type=checkbox][name=placeSearchType]')]
                                  let arrData = []
                                  arr.map(item => {
                                      if (item.checked) {
                                          arrData.push(item.defaultValue)
                                      }
                                  })
                                  return arrData.join("|")
                              }
                  
                              //全国/城市
                              function getRange() {
                                  const arr = [...document.querySelectorAll('input[type=radio][name=range]')]
                                  let data = ""
                                  arr.map(item => {
                                      if (item.checked) {
                                          data = item.defaultValue
                                      }
                                  })
                                  return data
                              }
                              //0=兴趣点 
                              if (this.tabIndex == 0) {
                                  const data = {
                                      range: getRange(),//范围 all=全国 city=城市
                                      cityCode: this.cityCode, //选择的城市code
                                      placeSearchType: getAllCheckbox(),//兴趣点复选
                                      polymerization: this.getPolymerization(),//是否启动聚合
                                      searchText: document.getElementById("search-text").value//检索关键词
                                  }
                  
                                  if (data.range == "city") {
                                      if (data.cityCode == "") {
                                          layer.msg('请选择城市', { icon: 5 });
                                          return
                                      }
                                  }
                                  if (data.placeSearchType == "") {
                                      layer.msg('请选择兴趣点', { icon: 5 });
                                      return
                                  }
                                  if (data.searchText == "") {
                                      layer.msg('请输入搜索关键词', { icon: 5 });
                                      return
                                  }
                                  let placeSearchData = {
                                      pageSize: this.pageSize,
                                      pageIndex: this.pageIndex,
                                      searchKeyword: data.searchText,
                                      extensions: "all",
                                  };
                                  if (data.range == "city") {
                                      placeSearchData.city = data.cityCode || "";
                                  }
                                  if (data.searchType != "") {
                                      placeSearchData.type = data.placeSearchType;
                                  }
                                  // console.log(placeSearchData)
                                  this._GaodeMap
                                      .placeSearch(placeSearchData)
                                      .then((res) => {
                                          console.log(res)
                                          this.total = res.count;
                                          this.poisList = res.pois;
                                          document.getElementById("data-view").scrollTop = 0
                                          //操作分页
                                          this.setPagination()
                                          //渲染视图
                                          this.setView()
                                          //渲染散点
                                          this.setPoint()
                                      })
                              }
                              // 1=路线规划与导航
                              if (this.tabIndex == 1) {
                                  document.getElementById("panel").innerHTML = "";
                                  /**
                                  * 获取类型
                                  * @returns 
                                  */
                                  function getNavigationType() {
                                      const arr = [...document.querySelectorAll('input[type=radio][name=navigationType]')]
                                      let data = ""
                                      arr.map(item => {
                                          if (item.checked) {
                                              data = item.defaultValue
                                          }
                                      })
                                      return data
                                  }
                                  if (JSON.stringify(this.startPositionResult) == "{}") {
                                      layer.msg('请输入选择起始位置', { icon: 5 });
                                      return
                                  }
                                  if (JSON.stringify(this.endPositionResult) == "{}") {
                                      layer.msg('请输入选择终点位置', { icon: 5 });
                                      return
                                  }
                                  const navigationType = getNavigationType()
                                  if (navigationType == "") {
                                      layer.msg('请选择类型', { icon: 5 });
                                      return
                                  }
                  
                                  const start = [
                                      this.startPositionResult.poi.location.lng,
                                      this.startPositionResult.poi.location.lat,
                                  ];
                                  const end = [
                                      this.endPositionResult.poi.location.lng,
                                      this.endPositionResult.poi.location.lat,
                                  ];
                  
                                  //驾车
                                  if (navigationType == "1") {
                                      this._GaodeMap
                                          .Driving({
                                              panel: "panel",
                                              start,
                                              end,
                                          })
                                          .then((res) => {
                                              // console.log(res.routes);
                                              if (res.routes.length != 0) {
                                                  let routeLocationArr = [];
                                                  const steps = res.routes[0].steps;
                                                  const len = steps.length;
                                                  for (let i = 0; i < len; i++) {
                                                      const item = steps[i];
                                                      routeLocationArr.push([
                                                          item.start_location.lng,
                                                          item.start_location.lat,
                                                      ]);
                                                      if (len - 1 == i) {
                                                          routeLocationArr.push([
                                                              item.end_location.lng,
                                                              item.end_location.lat,
                                                          ]);
                                                      }
                                                  }
                                                  this.setDrawRoute(routeLocationArr, "driving");
                                              }
                                          });
                                  }
                                  //公交车
                                  if (navigationType == "2") {
                                      this._GaodeMap
                                          .Transfer({
                                              panel: "panel",
                                              start,
                                              end,
                                              city: "沈阳市",
                                          })
                                          .then((res) => {
                                              // console.log(res);
                                          });
                                  }
                                  //骑行
                                  if (navigationType == "3") {
                                      this._GaodeMap
                                          .Riding({
                                              panel: "panel",
                                              start,
                                              end,
                                          })
                                          .then((res) => {
                                              if (res.routes.length != 0) {
                                                  let routeLocationArr = [];
                                                  const rides = res.routes[0].rides;
                                                  const len = rides.length;
                                                  for (let i = 0; i < len; i++) {
                                                      const item = rides[i];
                                                      routeLocationArr.push([
                                                          item.start_location.lng,
                                                          item.start_location.lat,
                                                      ]);
                                                      if (len - 1 == i) {
                                                          routeLocationArr.push([
                                                              item.end_location.lng,
                                                              item.end_location.lat,
                                                          ]);
                                                      }
                                                  }
                  
                                                  this.setDrawRoute(routeLocationArr, "riding");
                                              }
                                          });
                                  }
                                  //步行
                                  if (navigationType == "4") {
                                      this._GaodeMap
                                          .Walking({
                                              panel: "panel",
                                              start,
                                              end,
                                          })
                                          .then((res) => {
                                              if (res.routes.length != 0) {
                                                  let routeLocationArr = [];
                                                  const steps = res.routes[0].steps;
                                                  const len = steps.length;
                                                  for (let i = 0; i < len; i++) {
                                                      const item = steps[i];
                                                      routeLocationArr.push([
                                                          item.start_location.lng,
                                                          item.start_location.lat,
                                                      ]);
                                                      if (len - 1 == i) {
                                                          routeLocationArr.push([
                                                              item.end_location.lng,
                                                              item.end_location.lat,
                                                          ]);
                                                      }
                                                  }
                                                  this.setDrawRoute(routeLocationArr, "walking");
                                              }
                                          });
                                  }
                  
                              }
                  
                          },
                  
                  
                  
                      }
                  
                      //初始化
                      gaodePoiVar.init()
                  }`
      },
      {
        codeLanguage: "css",
        content: `.openSetUp {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        position: fixed;
                        right: 20px;
                        bottom: 20px;
                        background-color: #409EFF;
                      
                        cursor: pointer;
                      
                        .icon-view {
                          width: 100%;
                          height: 100%;
                          border-radius: 50%;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        }
                      
                        img {
                          width: 16px;
                          display: block;
                        }
                      
                        &:hover {
                          opacity: 0.8;
                        }
                      }
                      
                      .POIPanel {
                        width: 500px;
                        height: 100vh;
                        background-color: #fff;
                        box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2), 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
                        position: fixed;
                        top: 0;
                        right: -100%;
                        box-sizing: border-box;
                        padding-top: 60px;
                        display: flex;
                        flex-direction: column;
                        transition: all 0.3s;
                        &.active {
                          right: 0;
                        }
                      
                        .poiHead {
                          padding: 10px 20px;
                          box-sizing: border-box;
                          border-bottom: 1px solid #ccc;
                          display: flex;
                          align-items: center;
                          justify-content: space-between;
                      
                          .poiHead-title {
                            font-size: 16px;
                            font-weight: bold;
                          }
                      
                          .poiHead-close {
                            color: #409EFF;
                            font-size: 20px;
                            cursor: pointer;
                      
                            &:hover {
                              color: #F56C6C;
                            }
                          }
                        }
                      
                        .poi-operation {
                          padding: 0 20px;
                      
                          .poi-tab {
                            height: 40px;
                            display: flex;
                            align-items: center;
                            // border-bottom: 1px solid #ccc;
                            padding: 10px 0;
                      
                            .poi-tab-item {
                              margin-right: 30px;
                              cursor: pointer;
                              color: #303133;
                              font-size: 14px;
                              position: relative;
                              height: 100%;
                              display: flex;
                              align-items: center;
                      
                              &:hover {
                                color: #409EFF;
                              }
                      
                              &.active {
                                color: #409EFF;
                      
                                &::after {
                                  content: "";
                                  display: block;
                                  height: 2px;
                                  width: 100%;
                                  background-color: #409EFF;
                                  position: absolute;
                                  bottom: -10px;
                                  left: 0;
                                }
                              }
                            }
                          }
                      
                          .poi-tab-box {
                            display: none;
                      
                            &.active {
                              display: block;
                            }
                      
                            .poi-tab-box-item {
                              .poi-form {
                                padding-top: 10px;
                      
                                .poi-form-item {
                                  display: flex;
                                  align-items: center;
                                  margin-bottom: 5px;
                      
                                  .poi-form-item-label {
                                    white-space: nowrap;
                                  }
                      
                                  .poi-form-item-value {
                                    flex: 1;
                      
                                    .poiInput {
                                      -webkit-appearance: none;
                                      background-color: #FFF;
                                      background-image: none;
                                      border-radius: 4px;
                                      border: 1px solid #DCDFE6;
                                      -webkit-box-sizing: border-box;
                                      box-sizing: border-box;
                                      color: #606266;
                                      display: inline-block;
                                      font-size: 12px;
                                      height: 28px;
                                      line-height: 28px;
                                      outline: 0;
                                      padding: 0 15px;
                                      -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                                      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                                      width: 100%;
                                    }
                      
                                    .navigationType {
                                      display: flex;
                                      align-items: center;
                      
                                      .search-button {
                                        margin-left: auto;
                                        display: inline-block;
                                        line-height: 1;
                                        white-space: nowrap;
                                        cursor: pointer;
                                        border: 1px solid #DCDFE6;
                                        color: #606266;
                                        -webkit-appearance: none;
                                        text-align: center;
                                        -webkit-box-sizing: border-box;
                                        box-sizing: border-box;
                                        outline: 0;
                                        -webkit-transition: .1s;
                                        transition: .1s;
                                        font-weight: 500;
                                        padding: 7px 15px;
                                        font-size: 12px;
                                        border-radius: 3px;
                      
                                        color: #FFF;
                                        background-color: #409EFF;
                                        border-color: #409EFF;
                                      }
                                    }
                                  }
                      
                                  label {
                                    margin-bottom: 0;
                      
                                  }
                                }
                      
                                .text-search {
                                  display: flex;
                                  align-items: center;
                      
                                  .search-text {
                                    -webkit-appearance: none;
                                    background-color: #FFF;
                                    background-image: none;
                                    border-radius: 4px;
                                    border: 1px solid #DCDFE6;
                                    -webkit-box-sizing: border-box;
                                    box-sizing: border-box;
                                    color: #606266;
                                    display: inline-block;
                                    font-size: 12px;
                                    height: 28px;
                                    line-height: 28px;
                                    outline: 0;
                                    padding: 0 15px;
                                    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                                    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                                    flex: 1;
                                  }
                      
                                  .text-search-button {
                                    display: inline-block;
                                    line-height: 1;
                                    white-space: nowrap;
                                    cursor: pointer;
                                    border: 1px solid #DCDFE6;
                                    color: #606266;
                                    -webkit-appearance: none;
                                    text-align: center;
                                    -webkit-box-sizing: border-box;
                                    box-sizing: border-box;
                                    outline: 0;
                                    margin: 0;
                                    -webkit-transition: .1s;
                                    transition: .1s;
                                    font-weight: 500;
                                    padding: 7px 15px;
                                    font-size: 12px;
                                    border-radius: 3px;
                      
                                    color: #FFF;
                                    margin-left: 10px;
                                    background-color: #409EFF;
                                    border-color: #409EFF;
                      
                                  }
                                }
                              }
                            }
                          }
                        }
                      
                        .poi-main {
                          height: calc(100vh - 360px);
                          flex-direction: column;
                          padding-top: 10px;
                          display: none;
                          &.poi-main1 {
                            height: calc(100vh - 260px);
                          }
                          &.active {
                            display: flex;
                          }
                          &#panel {
                            overflow-y: auto;
                          }
                      
                          .data-view {
                            // flex: 1;
                            height: calc(100% - 50px);
                            overflow-y: auto;
                            padding: 0 20px;
                            overflow-x: hidden;
                      
                            .data-view-box {
                              .data-view-item {
                                height: 120px;
                                display: flex;
                                justify-content: space-between;
                                margin-bottom: 10px;
                                cursor: pointer;
                      
                                .data-view-item-image {
                                  height: 120px;
                                  width: 120px;
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                  overflow: hidden;
                                  background-color: #eee;
                      
                                  img {
                                    display: block;
                                    max-width: 100%;
                                    // max-height: 100%;
                                    transition: all 0.6s cubic-bezier(0.34, 1.01, 1, 1);
                                    -webkit-transition: all 0.6s cubic-bezier(0.34, 1.01, 1, 1);
                                    -moz-transition: all 0.6s cubic-bezier(0.34, 1.01, 1, 1);
                                    -ms-transition: all 0.6s cubic-bezier(0.34, 1.01, 1, 1);
                                    -o-transition: all 0.6s cubic-bezier(0.34, 1.01, 1, 1);
                                  }
                                }
                      
                                .data-view-item-text {
                                  width: calc(100% - 130px);
                      
                                  h3 {
                                    font-size: 18px;
                                  }
                      
                                  p {
                                    font-size: 12px;
                                  }
                                }
                      
                                &:hover {
                                  .data-view-item-image {
                                    img {
                                      transform: scale(1.15);
                                      -webkit-transform: scale(1.15);
                                      -moz-transform: scale(1.15);
                                      -o-transform: scale(1.15);
                                      -ms-transform: scale(1.15);
                                    }
                                  }
                      
                                  .data-view-item-text {
                                    h3 {
                                      color: #409EFF;
                                    }
                                  }
                                }
                              }
                            }
                          }
                      
                          .pagination-view {
                            height: 50px;
                            display: flex;
                            justify-content: flex-end;
                            padding: 0 20px;
                          }
                        }
                      }
                      
                      
                      .linkageAddress {
                        display: flex;
                        align-items: center;
                      
                        .linkageAddress-input {
                          -webkit-appearance: none;
                          background-color: #fff;
                          background-image: none;
                          border-radius: 4px;
                          border: 1px solid #dcdfe6;
                          box-sizing: border-box;
                          color: #606266;
                          display: inline-block;
                          font-size: inherit;
                          height: 28px;
                          line-height: 28px;
                          outline: none;
                          padding: 0 15px;
                          width: 160px;
                          font-size: 12px;
                          color: #333;
                          cursor: pointer;
                          position: relative;
                          margin: 0 5px;
                      
                          &.disabled {
                            background-color: #f5f7fa;
                            border-color: #e4e7ed;
                            color: #c0c4cc;
                            cursor: not-allowed;
                      
                            input {
                              display: none;
                            }
                          }
                      
                          p {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            color: #666;
                          }
                      
                          ul {
                            height: 180px;
                            overflow-y: auto;
                            position: absolute;
                            top: 30px;
                            left: 0;
                            width: 100%;
                            padding: 6px 0;
                            box-sizing: border-box;
                            list-style-type: none;
                            background: #fff;
                            visibility: hidden;
                            opacity: 0;
                            -webkit-transform: translate3d(0, -20px, 0);
                            transform: translate3d(0, -20px, 0);
                            -webkit-transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
                            transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
                      
                            li {
                              font-size: 14px;
                              padding: 0 20px;
                              position: relative;
                              white-space: nowrap;
                              overflow: hidden;
                              text-overflow: ellipsis;
                              color: #606266;
                              height: 34px;
                              line-height: 34px;
                              box-sizing: border-box;
                              cursor: pointer;
                      
                              &:hover {
                                background: #F5F7FA;
                              }
                            }
                          }
                      
                          input {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            opacity: 0;
                            cursor: pointer;
                      
                            &:focus+ul {
                              -webkit-transform: translate3d(0, 0, 0);
                              transform: translate3d(0, 0, 0);
                              visibility: visible;
                              opacity: 1;
                            }
                          }
                      
                      
                      
                        }
                      }`
      }
    ]
  }
]