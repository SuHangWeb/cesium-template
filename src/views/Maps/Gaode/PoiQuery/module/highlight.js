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
        label: "components.zip（组件包）",
        url: "Vue/Maps/Gaode/PoiQuery/components.zip"
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
                        :poisId="poisClickId"
                        @close="poiPanelShow = false"
                        @load="load"
                        @poisClick="poisClick"
                        @stepsClick="setStepsCamera"
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
                  import Material from "@/common/cesium/Materials/index.js";
                  import GeoJSON from "geojson";
                  import { v4 as uuidv4 } from "uuid";
                  export default {
                    name: "PoiQuery",
                    components: { poiPanel },
                    data() {
                      return {
                        poiPanelShow: false,
                  
                        viewer: null,
                        _Entity: null,
                        _Canvas: null,
                        handler: null,
                  
                        EntityArr: [],
                        poisClickId: "", //兴趣点高亮id
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
                          shouldAnimate: true,
                          infoBox: false,
                          selectionIndicator: false,
                        });
                        //地形侦测
                        // this.viewer.scene.globe.depthTestAgainstTerrain = false;
                        //去锯齿 使文字清晰
                        this.viewer.scene.postProcessStages.fxaa.enabled = false;
                  
                        this._Entity = new Entity(Cesium, this.viewer);
                        this._Material = new Material(Cesium, this.viewer);
                        this._Canvas = new Canvas(Cesium, this.viewer);
                  
                        this.handler = new Cesium.ScreenSpaceEventHandler(
                          this.viewer.scene.canvas
                        );
                  
                        //去掉双击事件
                        this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
                          Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
                        );
                  
                        //鼠标左键点击
                        this.handler.setInputAction((event) => {
                          const pick = this.viewer.scene.pick(event.position);
                          if (pick) {
                            if (!pick.id) return;
                            this.setPoisActive(pick.id._id);
                            this.viewer.flyTo(pick.id);
                          }
                        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
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
                          id: e.id,
                        });
                      },
                      /**
                      * 设置兴趣点高亮
                      * @param {*} id
                      */
                      setPoisActive(id) {
                        this.poisClickId = id || "";
                        for (let i = 0; i < this.EntityArr.length; i++) {
                          if (this.EntityArr[i].id == id) {
                            this.EntityArr[i].billboard.image =
                              process.env.VUE_APP_PUBLIC_URL +
                              "/Vue/Maps/Gaode/PoiQuery/position-active.png";
                          } else {
                            this.EntityArr[i].billboard.image =
                              process.env.VUE_APP_PUBLIC_URL +
                              "/Vue/Maps/Gaode/PoiQuery/position.png";
                          }
                        }
                      },
                      /**
                      * 设置点击位置相机位置
                      * @param {*} e
                      */
                      setStepsCamera(e) {
                        const Cesium = this.cesium;
                        this.viewer.camera.flyTo({
                          destination: Cesium.Cartesian3.fromDegrees(e.lng, e.lat, 3000),
                        });
                      },
                      /**
                      * 设置相机位置
                      * @param {*} e
                      */
                      setCamera(e) {
                        const Cesium = this.cesium;
                        //设置兴趣点高亮
                        this.setPoisActive(e.id || "");
                  
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
                        this.clearEntity();
                        if (e.type == "pois") {
                          this.setPointPosition(e).then((res) => {
                            // console.log(res);
                            this.EntityArr = res;
                            this.viewer.flyTo(res);
                          });
                        }
                        if (e.type == "navigation") {
                          this.setDrawRoute(e);
                        }
                      },
                      /**
                      * 坐标转换
                      */
                      gcoordTransform(position) {
                        const result = gcoord.transform(
                          position, // 经纬度坐标
                          gcoord.AMap, // 当前坐标系
                          gcoord.WGS84 // 目标坐标系
                        );
                        return result;
                      },
                      /**
                      * 绘制起点和终点广告牌
                      * @param {Array} start
                      * @param {Array} end
                      */
                      setStartAndEndPosition(start, end) {
                        const Cesium = this.cesium;
                        this._Entity.createBillboard({
                          id: uuidv4(),
                          position: Cesium.Cartesian3.fromDegrees(start[0], start[1]),
                          image:
                            process.env.VUE_APP_PUBLIC_URL + "/Vue/Maps/Gaode/PoiQuery/start.png",
                          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                          width: 23,
                          height: 35,
                        });
                        this._Entity.createBillboard({
                          id: uuidv4(),
                          position: Cesium.Cartesian3.fromDegrees(end[0], end[1]),
                          image:
                            process.env.VUE_APP_PUBLIC_URL + "/Vue/Maps/Gaode/PoiQuery/end.png",
                          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                          width: 23,
                          height: 35,
                        });
                      },
                      /**
                      * 绘制路线
                      * @param {Object} parameter
                      */
                      setDrawRoute(parameter) {
                        console.log(parameter);
                        const { data, style } = parameter;
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
                        data.map((item) => {
                          const result = this.gcoordTransform([item[0], item[1]]);
                          arrData.push(result[0], result[1]);
                        });
                  
                        //设置广告牌哦
                        this.setStartAndEndPosition(
                          [arrData[0], arrData[1]],
                          [arrData[arrData.length - 2], arrData[arrData.length - 1]]
                        );
                  
                        const Route = this._Entity.createPolyline({
                          positions: Cesium.Cartesian3.fromDegreesArray(arrData),
                          // clampToGround: true,
                          material: new Cesium.Color.fromCssColorString(color),
                          arcType: Cesium.ArcType.GEODESIC,
                          width: 10,
                        });
                  
                        this.viewer.flyTo(Route);
                      },
                      /**
                      * 清空实体
                      */
                      clearEntity() {
                        this.viewer.entities.removeAll();
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
                                entity._id = entity._properties._id._value;
                                let image = "";
                                if (entity._id == this.poisClickId) {
                                  image =
                                    process.env.VUE_APP_PUBLIC_URL +
                                    "/Vue/Maps/Gaode/PoiQuery/position-active.png";
                                } else {
                                  image =
                                    process.env.VUE_APP_PUBLIC_URL +
                                    "/Vue/Maps/Gaode/PoiQuery/position.png";
                                }
                                entity.billboard = {
                                  image,
                                  width: 16,
                                  height: 22,
                                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                  heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
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
                            setTimeout(() => {
                              resolve(EntityArr);
                            }, 1000);
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
                            setTimeout(() => {
                              resolve(EntityArr);
                            }, 1000);
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
      {
        label: "iconfont.css",
        url: "JavaScript/cesium/iconfont/iconfont.css"
      },
      {
        label: "diricon.7z",
        url: "JavaScript/cesium/Map/Gaode/diricon.7z"
      },
    ],
    code: [
      {
        codeLanguage: "js",
        content: ` window.gaodePoiVar = {
                    tabIndex: 0,
                    securityJsCode: "必填",//高德code  测试不久之后会失效 需要自行注册
                    key: "必填",//高德key 测试不久之后会失效 需要自行注册
                    openSetUpDomId: "openSetUp",//打开操作面板元素id
                    openPOIPanelDomId: "POIPanel",//操作面板元素id
                    filePath: "/test/Maps/Gaode/PoiQuery",//通用路径
                    _Utils: null,
                    _GaodeMap: null,
                    _Entity: null,//初始化实体函数
                    _Canvas: null,
                    _Diricon: null,//icon 雪碧图
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
            
                    //驾车路线
                    drivingData: [],
                    //骑行路线
                    ridingData: [],
                    //步行路线
                    walkingData: [],
                    //公交路线
                    transferData: [],
            
            
            
                    //初始化
                    init() {
                        window._AMapSecurityConfig = {
                            securityJsCode: this.securityJsCode,
                        };
                        this._Utils = new Utils()
                        this._Canvas = new Canvas(Cesium)
                        this._Entity = new Entity(Cesium, viewer);
                        this._Utils.loadJs(
                            'https://webapi.amap.com/maps?v=2.0&key='+this.key+'&plugin='+new GaodeMap().plugin,
                            { append: "body", defer: true }
                        ).then(() => {
                                this._GaodeMap = new GaodeMap(AMap);
                                //行政列表
                                this._GaodeMap.districtList({ subdistrict: 2 }).then((res) => {
                                    // console.log(res)
                                    this.districtList = res
            
                                    //创建 省 dom元素 start
                                    let province = window.document.createElement("div");
                                    province.id = 'linkageAddress-province'
                                    province.className = 'linkageAddress-province linkageAddress-input'
                                    let province_find_html = ""
                                    for (let province_i = 0; province_i < res.length; province_i++) {
                                        const province_item = res[province_i]
                                        province_find_html += '<li onclick="gaodePoiVar.linkageAddressTrigger('+event+','+'province'+')" data-value="'+province_item.adcode+'" data-label="+'province_item.name'+">'+province_item.name+'</li>'
                                    }
                                    let provinceHtml = '<p>请选择省<span>&or;</span></p><input><ul>'+province_find_html+'</ul>'
                                    province.innerHTML = provinceHtml
                                    this.linkageAddressProvinceDom = province
                                    //创建 省 dom元素 end

                                    // 创建 市 dom元素 start
                                    let city = window.document.createElement("div");
                                    city.id = 'linkageAddress-city'
                                    city.className = 'linkageAddress-city linkageAddress-input disabled'
                                    let cityHtml = '<p>请选择市<span>&or;</span></p><input><ul></ul>'
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
                                    //加载自定义icon所需文件 -- 用作导航指引图标 start
                                    this._Utils.loadJs(
                                        '../landstar/js/LS-cesium-common/Map/Gaode/diricon/Diricon.js',
                                        { append: "body", defer: true }
                                    )
                                    createStyleModule('../landstar/js/LS-cesium-common/Map/Gaode/diricon/css/index.css')
                                    //加载自定义icon所需文件 -- 用作导航指引图标 end
                                });
                                //搜索数据的兴趣点类别
                                this.placeSearchType = this._GaodeMap.placeSearchType
                                let placeSearchType = window.document.createElement("div");
                                placeSearchType.id = 'placeSearchType'
                                placeSearchType.className = 'placeSearchType'
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
                            let html = '<div class="icon-view" onclick="gaodePoiVar.openPOIPanel()"><img src="'+this.filePath+'/icon-setup.png" alt="" /></div>'
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
                            html+='<div class="poi-operation">'
                            html+='<div class="poi-tab">'
                            html+='<div class="poi-tab-item active" onclick="gaodePoiVar.poiTabClick(0)">兴趣点</div>'
                            html+='<div class="poi-tab-item" onclick="gaodePoiVar.poiTabClick(1)">路线规划与导航</div>'
                            html+='</div>'
                            html+='<div class="poi-tab-box active">'
                            html+='<div class="poi-tab-box-item">'
                            html+='<div class="poi-form">'
                            html+='<div class="poi-form-item">'
                            html+='<div class="poi-form-item-label">范围：</div>'
                            html+='<div class="poi-form-item-value">'
                            html+='<label>'
                            html+='<input onclick="gaodePoiVar.rangeClick(event)" class="radio" type="radio" name="range" value="city" checked="checked" />城市'
                            html+='</label>'
                            html+='<label>'
                            html+='<input onclick="gaodePoiVar.rangeClick(event)" class="radio" type="radio" name="range" value="all"/>全国'
                            html+='</label>'
                            html+='</div>'
                            html+='</div>'
                            html+='<div class="poi-form-item" id="city-poi-form-item">'
                            html+='<div class="poi-form-item-label">城市：</div>'
                            html+='<div class="poi-form-item-value">'
                            html+='<div id="cityAddress" class="linkageAddress"></div>'
                            html+='</div>'
                            html+='</div>'
                            html+='<div class="poi-form-item">'
                            html+='<div class="poi-form-item-label">兴趣点类别：</div>'
                            html+='<div class="poi-form-item-value" id="placeSearchTypeWrap"></div>'
                            html+='</div>'
                            html+='<div class="poi-form-item">'
                            html+='<div class="poi-form-item-label">是否聚合：</div>'
                            html+='<div class="poi-form-item-value">'
                            html+='<div class="polymerization">'
                            html+='<label>'
                            html+='<input type="radio" name="polymerization" value="0" checked />否'
                            html+='</label>'
                            html+='<label>'
                            html+='<input type="radio" name="polymerization" value="1" />是'
                            html+='</label>'
                            html+='</div>'
                            html+='</div>'
                            html+='</div>'
                            html+='<div class="text-search">'
                            html+='<input type="text" class="search-text" id="search-text" autocomplete="off" placeholder="请输入搜索关键词"/>'
                            html+='<button class="text-search-button" onclick="gaodePoiVar.get_form_data()">搜索</button>'
                            html+='</div>'
                            html+='</div>'
                            html+='</div>'
                            html+='</div>'
                            html+='<div class="poi-tab-box">'
                            html+='<div class="poi-tab-box-item">'
                            html+='<div class="poi-form">'
                            html+='<div class="poi-form-item">'
                            html+='<div class="poi-form-item-label">起始位置：</div>'
                            html+='<div class="poi-form-item-value">'
                            html+='<input type="text" class="poiInput" id="startPosition" autocomplete="off" placeholder="搜索起始位置"/>'
                            html+='</div>'
                            html+='</div>'
                            html+='<div class="poi-form-item">'
                            html+='<div class="poi-form-item-label">终点位置：</div>'
                            html+='<div class="poi-form-item-value">'
                            html+='<input type="text" class="poiInput" id="endPosition" autocomplete="off" placeholder="搜索终点位置"/>'
                            html+='</div>'
                            html+='</div>'
                            html+='<div class="poi-form-item">'
                            html+='<div class="poi-form-item-label">类型：</div>'
                            html+='<div class="poi-form-item-value">'
                            html+='<div class="navigationType">'
                            html+='<label>'
                            html+='<input type="radio" name="navigationType" value="1"  />驾车'
                            html+='</label>'
                            html+='<label>'
                            html+='<input type="radio" name="navigationType" value="2" />公交'
                            html+='</label>'
                            html+='<label>'
                            html+='<input type="radio" name="navigationType" value="3"  />骑行'
                            html+='</label>'
                            html+='<label>'
                            html+='<input type="radio" name="navigationType" value="4" />步行'
                            html+='</label>'
                            html+='<button class="search-button" onclick="gaodePoiVar.get_form_data()">搜索</button>'
                            html+='</div>'
                            html+='</div>'
                            html+='</div>'
                            html+='</div>'
                            html+='</div>'
                            html+='</div>'
                            html+='</div>'
                            html+='<div class="poi-main active">'
                            html+='<div class="data-view" id="data-view"></div>'
                            html+='<div id="pagination-view" class="pagination-view"></div>'
                            html+='</div>'
                            html+='<div class="poi-main" id="panel">'
                            html+='</div>'
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
                            city.className = 'linkageAddress-city linkageAddress-input'
                            const ul = city.getElementsByTagName("ul")[0]
                            ul.innerHTML = ""
                            this.cityCode = ""
                            const city_p = city.getElementsByTagName("p")
                            city_p[0].innerHTML = '请选择市<span>&or;</span>'
                            const f_data = this.districtList.filter(item => item.adcode == e.value)
                            if (f_data.length == 0) return
            
                            let city_li_html = ""
                            for (let city_i = 0; city_i < f_data[0].districtList.length; city_i++) {
                                const city_item = f_data[0].districtList[city_i]
                                city_li_html += '<li onclick="gaodePoiVar.linkageAddressTrigger('+event+','+'city'+')" data-value="'+city_item.adcode+'" data-label="'+city_item.name+'">'+city_item.name+'</li>'
                            }
                            ul.innerHTML = city_li_html
                        }
            
                        //市触发
                        if (type == "city") {
                            const city = document.getElementById("linkageAddress-city")
                            const p = city.getElementsByTagName("p")
                            p[0].innerHTML = e.label + '<span>&or;</span>'
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
                            html+='<div class="data-view-item" onclick='gaodePoiVar.setFlyTo(\"'+item.id+'\")'>'
                            html+='<div class="data-view-item-image">' + image + '</div>'
                            html+='<div class="data-view-item-text">'
                            html+='<h3>'+item.name+'</h3>'
                            html+='<p>电话：'+item.tel+'</p>'
                            html+='<p>类目：'+item.type+'</p>'
                            html+='<p>地址：'+item.pname+item.cityname+item.adname+item.address+'</p>'
                            html+='</div>'
                            html+='</div>'
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
                    * 绘制起点和终点广告牌
                    * @param {Array} start
                    * @param {Array} end
                    */
                    setStartAndEndPosition(start, end) {
                        this._Entity.createBillboard({
                            id: uuid4(),
                            position: Cesium.Cartesian3.fromDegrees(start[0], start[1]),
                            image: "../landstar/js/LS-cesium-common/Map/Gaode/diricon/image/start.png",
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            width: 23,
                            height: 35,
                        });
                        this._Entity.createBillboard({
                            id: uuid4(),
                            position: Cesium.Cartesian3.fromDegrees(end[0], end[1]),
                            image: "../landstar/js/LS-cesium-common/Map/Gaode/diricon/image/end.png",
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            width: 23,
                            height: 35,
                        });
                    },
                    /**
                    * 坐标转换
                    */
                    gcoordTransform(position) {
                        const result = gcoord.transform(
                            position, // 经纬度坐标
                            gcoord.AMap, // 当前坐标系
                            gcoord.WGS84 // 目标坐标系
                        );
                        return result;
                    },
                    /**
                    * 绘制路线
                    * @param {*} arr 
                    * @param {*} style 
                    */
                    setDrawRoute(arr, style) {
                        viewer.entities.removeAll();
                        if (viewer.terrainProvider.availability) {
                            viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider({});//关闭地形
                            viewer.scene.globe.depthTestAgainstTerrain = false;//是否检查深度
                        }
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
                            const result = this.gcoordTransform([item[0], item[1]]);
                            arrData.push(result[0], result[1]);
                        });
                        this.setStartAndEndPosition(
                            [arrData[0], arrData[1]],
                            [arrData[arrData.length - 2], arrData[arrData.length - 1]]
                        );
            
                        const Route = this._Entity.createPolyline({
                            positions: Cesium.Cartesian3.fromDegreesArray(arrData),
                            material: new Cesium.Color.fromCssColorString(color),
                            arcType: Cesium.ArcType.GEODESIC,
                            width: 10,
                        });
            
                        viewer.flyTo(Route);
                    },
                    /**
                    * 处理路线数据
                    * @param {Array} arr 数据
                    * @param {Number} index 索引
                    * @param {String} key 根据数据自定义key名称
                    */
                    handleRoutes(arr, index = 0, key) {
                        let routeLocationArr = [];
                        const steps = arr[index][key];
                        const len = steps.length;
            
                        for (let i = 0; i < len; i++) {
                            const item = steps[i];
                            if (item.path.length != 0) {
                                for (let j = 0; j < item.path.length; j++) {
                                    routeLocationArr.push([item.path[j].lng, item.path[j].lat]);
                                }
                            } else {
                                routeLocationArr.push([
                                    item.start_location.lng,
                                    item.start_location.lat,
                                ]);
                            }
                        }
                        return routeLocationArr
                    },
                    /**
                    * 获取表单数据
                    */
                    get_form_data() {
                        viewer.entities.removeAll();
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
                                        extensions: "all",
                                        policy: 10,
                                        start,
                                        end,
                                    })
                                    .then((res) => {
                                        this.drivingData = res.routes;
                                        if (res.routes.length != 0) {
                                            this.setDrawRoute(this.handleRoutes(res.routes, 0, "steps"), "driving");
                                            this.createDrivingSteps(res.routes, 'steps', 'driving')
                                        }
                                    });
                            }
                            //公交车
                            if (navigationType == "2") {
                                this._GaodeMap
                                    .Transfer({
                                        extensions: "all",
                                        start,
                                        end,
                                        city: "沈阳市",
                                    })
                                    .then((res) => {
                                        this.transferData = res.plans;
                                        if (res.plans.length != 0) {
                                            this.createDrivingSteps(res.plans, "segments", 'riding')
                                        }
                                    });
                            }
                            //骑行
                            if (navigationType == "3") {
                                this._GaodeMap
                                    .Riding({
                                        extensions: "all",
                                        start,
                                        end,
                                    })
                                    .then((res) => {
                                        this.ridingData = res.routes;
                                        if (res.routes.length != 0) {
                                            this.setDrawRoute(this.handleRoutes(res.routes, 0, "rides"), "riding");
                                            this.createDrivingSteps(res.routes, "rides", 'riding')
                                        }
                                    });
                            }
                            //步行
                            if (navigationType == "4") {
                                this._GaodeMap
                                    .Walking({
                                        start,
                                        end,
                                    })
                                    .then((res) => {
                                        this.walkingData = res.routes;
                                        if (res.routes.length != 0) {
                                            this.setDrawRoute(this.handleRoutes(res.routes, 0, "steps"), "walking");
                                            this.createDrivingSteps(res.routes, "steps", 'walking')
                                        }
                                    });
                            }
            
                        }
            
                    },
                    /**
                    * 获取类型
                    * @returns 
                    */
                    getNavigationType() {
                        const arr = [...document.querySelectorAll('input[type=radio][name=navigationType]')]
                        let data = ""
                        arr.map(item => {
                            if (item.checked) {
                                data = item.defaultValue
                            }
                        })
                        return data
                    },
                    /**
                    * 处理折叠路径画线
                    */
                    setDrawRouteTwo(e) {
                        const getNavigationType = this.getNavigationType()
                        let arr = []
                        if (getNavigationType == 1) {
                            arr = this.drivingData
                        }
                        if (getNavigationType == 2) {
                            arr = this.transferData
                        }
                        if (getNavigationType == 3) {
                            arr = this.ridingData
                        }
                        if (getNavigationType == 4) {
                            arr = this.walkingData
                        }
            
                        const { index, type, key } = e;
                        if (getNavigationType != 2) {
                            this.setDrawRoute(this.handleRoutes(arr, index, key), type);
                        }
            
                        const collapseItem = document.getElementsByClassName("collapse-item")
                        for (let i = 0; i < collapseItem.length; i++) {
                            collapseItem[i].className = "collapse-item"
                        }
                        collapseItem[index].className = "collapse-item show"
                    },
                    /**
                    * 转换
                    */
                    transform: {
                        /**
                        * 秒转时间
                        * @param {Number} second 秒
                        */
                        secondToTime(second) {
                            let days = Math.floor(second / 86400);
                            let hours = Math.floor((second % 86400) / 3600);
                            let minutes = Math.floor(((second % 86400) % 3600) / 60);
                            if (days) {
                                return days + "天" + hours + "小时" + minutes + "分钟";
                            } else if (days || hours) {
                                return hours + "小时" + minutes + "分钟";
                            } else if (days || hours || minutes) {
                                return minutes + "分钟";
                            }
                        },
                        /**
                        * 米转换公里
                        * @param {Number} metre 米
                        */
                        metreToKilometre(metre) {
                            return (metre / 1000).toFixed(1);
                        },
                        /**
                        * 字符串转时间
                        * @param {*} str 
                        */
                        stringToTime(str) {
                            return str.replace(/^(.{2})/, "$1:");
                        }
                    },
                    /**
                    * 创建图标
                    * @param {*} parma 
                    */
                    crecteIcon(parma) {
                        this._Diricon = new Diricon()
                        let value = '', type, bgColor, typeColor
                        if (parma?.type) {
                            type = parma.type
                        }
                        if (parma?.value) {
                            value = parma.value
                        }
                        if (parma?.bgColor) {
                            bgColor = parma.bgColor
                        }
                        if (parma?.typeColor) {
                            typeColor = parma.typeColor
                        }
                        const _class = this._Diricon.setIcon(type, value, typeColor);
                        return '<div class="gaode-diricon '+_class+'" style="background-color:'+bgColor+'"></div>'
                    },
                    /**
                    * 设置点击位置相机位置
                    * @param {*} position 
                    */
                    setStepsCamera(position) {
                        viewer.camera.flyTo({
                            destination: Cesium.Cartesian3.fromDegrees(position[0], position[1], 3000),
                        });
                    },
                    /**
                    * 公交车站点操作
                    */
                    openTransferLeng({ i, j }) {
                        const collapseItem = document.getElementsByClassName("collapse-item") || []
                        for (let l = 0; l < collapseItem.length; l++) {
                            const stepItem = collapseItem[l].getElementsByClassName("step-item") || []
                            for (let k = 0; k < stepItem.length; k++) {
                                if (stepItem[k].className == "step-item Multiple") {
                                    let list = stepItem[k].getElementsByClassName('list')[0]
                                    if (l == i && j == k) {
                                        list.className = 'list show'
                                    } else {
                                        list.className = 'list'
                                    }
                                }
            
                            }
                        }
                    },
                    /**
                    * 创建自定义规划面板
                    * @param {*} arr 数据
                    * @param {*} key  字段key名称
                    * @param {*} type 类型 
                    */
                    createDrivingSteps(arr, key, type) {
                        let _div = window.document.createElement("div");
                        _div.id = "pathPlanningDriving"
                        // _div.className = "pathPlanning driving"
                        let _html = ""
                        const getNavigationType = this.getNavigationType()
                        if (getNavigationType == 2) {
                            _div.className = "pathPlanning transfer"
                            /**
                            * 过滤title使用的 交通工具数据
                            * @param {*} arr 
                            * @returns 
                            */
                            function stepFilter(arr) {
                                const filterArr = arr.filter((item) => item.transit_mode != "WALK");
                                if (filterArr.length != 0) {
                                    return filterArr;
                                } else {
                                    return [];
                                }
                            }
            
                            for (let i = 0; i < arr.length; i++) {
                                const item = arr[i]
                                // console.log(item)
                                //过滤title使用的 交通工具数据
                                const step = stepFilter(item.segments)
                                // console.log(step)
                                const defaultShow = i == 0 ? 'show' : '';
            
                                let stepHtml = ""
                                for (let stepI = 0; stepI < step.length; stepI++) {
                                    const stepItem = step[stepI]
                                    const imgURL = stepItem.transit_mode == "BUS" ? 'busline.png' : 'subway.png'
                                    const linesInfo = stepItem.transit.lines[0]
            
                                    if (stepI == 0) {
                                      stepHtml+='<div class="head-step-item">'
                                      stepHtml+='<div class="head-step-block">'
                                      stepHtml+='<img src="../landstar/js/LS-cesium-common/Map/Gaode/diricon/image/'+imgURL+'" alt="" />'
                                      stepHtml+=linesInfo.name
                                      stepHtml+='</div>'
                                      stepHtml+='</div>'
                                    } else {
                                      stepHtml += '<div class="head-step-item">'
                                      stepHtml += '<i class="iconfont icon-jiantouyou"></i>'
                                      stepHtml += '<div class="head-step-block">'
                                      stepHtml += '<img src="../landstar/js/LS-cesium-common/Map/Gaode/diricon/image/'+imgURL+'" alt="" />'
                                      stepHtml += linesInfo.name
                                      stepHtml += '</div>'
                                      stepHtml += '</div>'
                                    }
                                }
            
                                let step_html = ""
                                for (let j = 0; j < item[key].length; j++) {
                                    const stepsItem = item[key][j]
                                    // console.log(stepsItem)
                                    if (stepsItem.transit_mode == "WALK") {
                                        step_html += '<div class="step-item WALK"><div class="label">'+stepsItem.instruction+'</div></div>'
                                    } else {
                                        let via_stops_html = ""
                                        let via_num = 0
                                        if (stepsItem.transit_mode != "WALK") {
                                            via_num = stepsItem.transit.via_num
                                            for (let viaI = 0; viaI < stepsItem.transit.via_num; viaI++) {
                                                const viaItem = stepsItem.transit.via_stops[viaI]
                                                via_stops_html += '<li>' + viaItem.name + '</li>'
                                            }
                                        }
                                        const openTransferLengParameter = JSON.stringify({ i, j: j + 1 })
                                        const stimeText = stepsItem.transit.lines[0].stime.length != 0 ? '上车站 首：'+this.transform.stringToTime(stepsItem.transit.lines[0].stime)+' 末：'+this.transform.stringToTime(stepsItem.transit.lines[0].etime) : ""
                                        const entrance = stepsItem.transit.entrance ? stepsItem.transit.entrance.name : ""
                                        const exit = stepsItem.transit.exit ? stepsItem.transit.exit.name : ""
                                        step_html += '<div class="step-item Multiple">'
                                        step_html += '<div class="spot"></div>'
                                        step_html += this.crecteIcon({ type: 'vehicle', value: 'transfer', bgColor: "#418AEC" })
                                        step_html += '<div class="multiple-step">'
                                        step_html += '<div class="multiple-step-head">'
                                        step_html += stepsItem.instruction
                                        step_html += '</div>'
                                        step_html += '<div class="multiple-step-content">'
                                        step_html += '<div class="multiple-step-content-item">'
                                        step_html += '<div class="multiple-step-content-item-value">'
                                        step_html += stepsItem.transit.on_station.name
                                        step_html += '</div>'
                                        step_html += '<div class="multiple-step-content-item-label">'
                                        step_html += '上车 ' + entrance
                                        step_html += '</div>'
                                        step_html += '</div>'
                                        step_html += '<div class="list">'
                                        step_html += '<ul>'+via_stops_html+'</ul>'
                                        step_html += ' </div>'
                                        step_html += '<div class="multiple-step-content-item">'
                                        step_html += '<div class="multiple-step-content-item-value">'
                                        step_html += stepsItem.transit.off_station.name
                                        step_html += '</div>'
                                        step_html += '<div class="multiple-step-content-item-label">'
                                        step_html += '下车 '+exit
                                        step_html += '</div>'
                                        step_html += '</div>'
                                        step_html += '<div class="multiple-step-content-item-info">'
                                        step_html += '<div class="multiple-step-content-item-info-text">'+stimeText+'</div>'
                                        step_html += '<div class="multiple-step-content-item-info-leng" onclick='gaodePoiVar.openTransferLeng('+openTransferLengParameter+')'>'
                                        step_html += '<span>'+Number(via_num + 1)+'站</span>'
                                        step_html += '<i class="iconfont icon-jiantoushang"></i>'
                                        step_html += '</div>'
                                        step_html += '</div>'
                                        step_html += '</div>'
                                        step_html += '</div>'
                                        step_html += '</div>'
                                    }
                                }
                                let step_html_con = '<div class="step-main">'
                                step_html_con += '<div class="step-item">'
                                step_html_con += this.crecteIcon({ type: "text", value: "起" })
                                step_html_con += '<div class="label">从 '+this.startPositionResult.poi.name+'出发</div>'
                                step_html_con += '</div>'
                                step_html_con += step_html
                                step_html_con += '<div class="step-item">'
                                step_html_con += this.crecteIcon({ type: "text", value: "终" })
                                step_html_con += '<div class="label">到达终点 '+this.endPositionResult.poi.name+'</div>'
                                step_html_con += '</div>'
                                step_html_con += '</div>'
                                const parameter = JSON.stringify({ index: i, type: 'transfer', key: "" })
                                _html += '<div class="collapse-item '+defaultShow+'">'
                                _html += '<div class="collapse-item-head" onclick='gaodePoiVar.setDrawRouteTwo('+parameter+')'>'
                                _html += '<div class="collapse-item-head-info-view">'
                                _html += '<div class="head-step-view">'+stepHtml+'</div>'
                                _html += '<div class="info-view">'
                                _html += '<div class="info">'
                                _html += '<div class="info-item">'
                                _html += '约'+this.transform.secondToTime(item.time)+'（'+this.transform.metreToKilometre(item.transit_distance)+'）'
                                _html += '</div>'
                                _html += '<span>|</span>'
                                _html += '<div class="info-item">'
                                _html += '步行'+this.transform.metreToKilometre(item.walking_distance)
                                _html += '</div>'
                                _html += '<span>|</span>'
                                _html += '<div class="info-item" style="color: red">'
                                _html += item.cost + '元'
                                _html += '</div>'
                                _html += '</div>'
                                _html += '</div>'
                                _html += '</div>'
                                _html += '<i class="iconfont icon-jiantouyou"></i>'
                                _html += '</div>'
                                _html += '<div class="collapse-item-content">' + step_html_con + '</div>'
                                _html += '</div>'
                            }
                        } else {
                            for (let i = 0; i < arr.length; i++) {
                                const item = arr[i]
            
                                let step_html = ""
            
                                let parameter = {}
                                let crecteIconType = ""
                                if (getNavigationType == 1) {
                                    parameter = JSON.stringify({ index: i, type: 'driving', key: 'steps' })
                                    crecteIconType = "driving"
                                    _div.className = "pathPlanning driving"
                                }
                                if (getNavigationType == 3) {
                                    parameter = JSON.stringify({ index: i, type: 'riding', key: 'rides' })
                                    crecteIconType = "riding"
                                    _div.className = "pathPlanning riding"
                                }
                                if (getNavigationType == 4) {
                                    parameter = JSON.stringify({ index: i, type: 'walking', key: 'steps' })
                                    crecteIconType = "walking"
                                    _div.className = "pathPlanning walking"
                                }
            
                                for (let j = 0; j < item[key].length; j++) {
                                    const stepsItem = item[key][j]
                                    const _position = [stepsItem.start_location.lng, stepsItem.start_location.lat]
                                    step_html+='<div class="step-item" onclick='gaodePoiVar.setStepsCamera('+JSON.stringify(_position)+')'>'
                                    step_html+=this.crecteIcon({ type: crecteIconType, value: stepsItem.action })
                                    step_html+='<div class="label">'+stepsItem.instruction+'</div>'
                                    step_html+='</div>'
                                }
            
                                const start_position = [this.startPositionResult.poi.location.lng, this.startPositionResult.poi.location.lat];
                                const end_position = [this.endPositionResult.poi.location.lng, this.endPositionResult.poi.location.lat];

                                let step_html_con = '<div class="step-main">'
                                step_html_con+='<div class="step-item" onclick='gaodePoiVar.setStepsCamera('+JSON.stringify(start_position)+')'>'
                                step_html_con+=this.crecteIcon({ type: "text", value: "起" })
                                step_html_con+='<div class="label">从 '+this.startPositionResult.poi.name+'出发</div>'
                                step_html_con+='</div>'
                                step_html_con+=step_html
                                step_html_con+='<div class="step-item" onclick='gaodePoiVar.setStepsCamera('+JSON.stringify(end_position)+')'>'
                                step_html_con+=this.crecteIcon({ type: "text", value: "终" })
                                step_html_con+='<div class="label">到达终点 '+this.endPositionResult.poi.name+'</div>'
                                step_html_con+='</div>'
                                step_html_con+='</div>'
                                const defaultShow = i == 0 ? 'show' : '';
                                html += '<div class="collapse-item '+defaultShow+'">'
                                html += '<div class="collapse-item-head" onclick='gaodePoiVar.setDrawRouteTwo('+parameter+')'>'
                                html += '<div class="collapse-item-head-info-view">'
                                html += '<div class="scheme-tag">方案'+Number(i + 1)+'</div>'
                                html += '<div class="info">'
                                html += '<div class="info-item">约 '+this.transform.secondToTime(item.time)+'</div>'
                                html += '<span>|</span>'
                                html += '<div class="info-item">'+this.transform.metreToKilometre(item.distance)+'公里</div>'
                                html += '</div>'
                                html += '</div>'
                                html += '<i class="iconfont icon-jiantouyou"></i>'
                                html += '</div>'
                                html += '<div class="collapse-item-content">'
                                html += step_html_con
                                html += '</div>'
                                html += '</div>'
                  }
              }
  
              _div.innerHTML = '<div class="collapse-view">'+_html+'</div>'
              this._Utils.operationDom("append", 'panel', _div)
          },
  
      }
  
      //初始化
      gaodePoiVar.init()`
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
        }
        
        
        .pathPlanning {
          height: 100%;
        
          .collapse-view {
            padding: 0 16px;
            height: 100%;
        
            .collapse-item {
        
              .collapse-item-head {
                padding: 15px 0;
                color: #333;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #ebeef5;
                font-size: 13px;
                font-weight: 500;
                position: relative;
                cursor: pointer;
        
                .collapse-item-head-info-view {
                  padding-top: 23px;
        
                  .scheme-tag {
                    position: absolute;
                    top: 0;
                    left: 0;
                    font-size: 12px;
                    height: 23px;
                    padding: 0 14px;
                    line-height: 23px;
                    background: #e0f0ff;
                    color: #3c3d3f;
                  }
        
                  .info {
                    display: flex;
                    align-items: center;
                    line-height: 1.2;
                    font-size: 12px;
                    color: #3c3d3f;
        
                    span {
                      padding: 0 10px;
                    }
                  }
                }
        
                .iconfont {
                  font-size: 13px;
                  color: #333;
                }
        
                &:hover {
                  .collapse-item-head-info-view {
                    .info {
                      color: #409EFF;
                    }
                  }
        
                  .iconfont {
                    color: #409EFF;
                  }
                }
              }
        
              .collapse-item-content {
                padding-bottom: 20px;
                display: none;
        
        
                .step-item {
                  min-height: 40px;
                  display: -webkit-box;
                  display: -ms-flexbox;
                  display: flex;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
                  align-items: center;
                  position: relative;
        
                  .label {
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    min-height: 40px;
                    margin-left: 20px;
                    border-bottom: 1px solid #eee;
                    height: 100%;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    color: #565656;
                    word-wrap: break-word;
                    font-weight: 700;
                    font-size: 14px;
                    padding: 10px 0 10px 5px;
                    cursor: pointer;
                  }
        
                  &::after {
                    content: "";
                    height: 110%;
                    width: 4px;
                    z-index: 9;
                    background-color: #e5e7e8;
                    position: absolute;
                    left: 10px;
                    top: 0;
                  }
        
                  &:first-child {
                    .gaode-diricon {
                      position: relative;
                      left: 2px;
                    }
        
                    .label {
                      padding-left: 7px;
                    }
        
                    &::after {
                      top: 50%;
                      height: 60%;
                    }
                  }
        
                  &:last-child {
                    .gaode-diricon {
                      position: relative;
                      left: 2px;
                    }
        
                    .label {
                      padding-left: 7px;
                    }
        
                    &::after {
                      top: 0;
                      height: 60%;
                    }
                  }
                }
              }
        
        
              &.show {
                .collapse-item-head {
                  .collapse-item-head-info-view {
                    .scheme-tag {
                      background: #3d93fd;
                      color: #fff;
                    }
                  }
                }
        
                .collapse-item-content {
                  display: block;
                }
              }
            }
          }
        
          &.transfer {
            .collapse-view {
              .collapse-item {
                .collapse-item-head {
                  .collapse-item-head-info-view {
                    padding-top: 0;
                    flex: 1;
        
                    .head-step-view {
                      display: flex;
                      flex-wrap: wrap;
                      margin-bottom: 10px;
        
                      .head-step-item {
                        color: #565656;
                        font-size: 12px;
                        font-weight: 400;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        flex-wrap: wrap;
        
                        .iconfont {
                          margin: 0 5px;
                          font-size: 12px;
                        }
        
                        .head-step-block {
                          display: -webkit-box;
                          display: -ms-flexbox;
                          display: flex;
                          -webkit-box-align: center;
                          -ms-flex-align: center;
                          align-items: center;
        
                          img {
                            width: 16px;
                            display: block;
                            margin-right: 5px;
                          }
        
                        }
        
                      }
                    }
                  }
        
                  &:hover {
                    .collapse-item-head-info-view {
                      .head-step-view {
                        .head-step-item {
                          .iconfont {
                            color: #409EFF;
                          }
        
                          .head-step-block {
                            color: #409EFF;
                          }
                        }
                      }
                     
                    }
                  }
                }
        
                .collapse-item-content {
                  .step-main {
                    .step-item {
                      &.WALK {
                        .label {
                          font-weight: 400;
                          margin-left: 40px;
                        }
                      }
        
                      &.Multiple {
                        background-color: rgba(65, 138, 236, .15);
                        border-radius: 4px;
        
                        .spot {
        
                          &::after,
                          &::before {
                            content: "";
                            position: absolute;
                            left: 9px;
                            width: 6px;
                            height: 6px;
                            border-radius: 4px;
                            background: #fff;
                            border: 1px solid #418aec;
                            z-index: 10;
                          }
        
                          &::after {
                            bottom: 0;
                          }
        
                          &::before {
                            top: 0;
                          }
                        }
        
                        .gaode-diricon {
                          z-index: 10;
                        }
        
                        .multiple-step {
                          width: calc(100% - 40px);
                          margin-left: 20px;
        
                          .multiple-step-head {
                            color: #027cff;
                            font-weight: 700;
                            font-size: 14px;
                            padding: 10px 0 10px 5px;
                            border-bottom: 1px solid #fff;
                          }
        
                          .multiple-step-content {
                            padding: 5px;
        
                            .list {
                              max-height: 0;
                              -webkit-transition: max-height .8s linear;
                              transition: max-height .8s linear;
                              overflow: hidden;
        
                              &.show {
                                max-height: 300px
                              }
        
                              ul {
                                list-style: none;
                                margin: 0;
                                padding: 0;
        
                                li {
                                  color: grey;
                                  font-size: 12px;
                                  margin: 4px 0;
                                }
                              }
                            }
        
                            .multiple-step-content-item {
                              padding: 5px 0;
                              display: -webkit-box;
                              display: -ms-flexbox;
                              display: flex;
                              -webkit-box-align: center;
                              -ms-flex-align: center;
                              align-items: center;
                              font-size: 12px;
                              font-weight: 400;
                              line-height: 1;
        
                              .multiple-step-content-item-value {
                                color: #000;
                                margin-right: 10px;
                              }
        
                              .multiple-step-content-item-label {
                                color: #878a8c;
                              }
                            }
        
                            .multiple-step-content-item-info {
                              display: -webkit-box;
                              display: -ms-flexbox;
                              display: flex;
                              -webkit-box-align: center;
                              -ms-flex-align: center;
                              align-items: center;
                              -webkit-box-pack: justify;
                              -ms-flex-pack: justify;
                              justify-content: space-between;
        
                              .multiple-step-content-item-info-text {
                                font-size: 12px;
                                color: grey !important;
                              }
        
                              .multiple-step-content-item-info-leng {
                                font-size: 12px;
                                color: #0f89f5;
                                cursor: pointer;
                                display: -webkit-box;
                                display: -ms-flexbox;
                                display: flex;
                                -webkit-box-align: center;
                                -ms-flex-align: center;
                                align-items: center;
                                position: relative;
                                top: -20px;
        
                                span {
                                  padding-right: 5px;
                                }
        
                                .iconfont {
                                  font-size: 12px;
                                  transition: all .3s ease-in 0s;
                                  -webkit-transition: all .3s ease-in 0s;
                                  -moz-transition: all .3s ease-in 0s;
                                  transform: rotate(180deg);
                                  -webkit-transform: rotate(180deg);
                                  -moz-transform: rotate(180deg);
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
        
                &.show {
                  .collapse-item-head {
                    .collapse-item-head-info-view {
                      .head-step-view {
                        .head-step-item {
                          .iconfont {
                            color: #409EFF;
                          }
        
                          .head-step-block {
                            color: #409EFF;
                          }
                        }
                      }
                      .info-view {
                        .info {
                          color: #409EFF;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }`
      }
    ]
  }
]