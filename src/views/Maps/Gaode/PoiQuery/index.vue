<template>
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
    />
  </div>
</template>
 
<script>
import poiPanel from "./module/POI-panel.vue";
import Canvas from "@/common/cesium/Canvas.js";
import Entity from "@/common/cesium/Entity.js";
import gcoord from "gcoord";
import TrailLineMaterialProperty from "./module/material/TrailLineMaterialProperty"; //流动
import Material from "@/common/cesium/Materials/index.js";
import GeoJSON from "geojson";
import code from "./module/highlight";
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
  created() {
    this.$store.dispatch("highlight/set_code", code);
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
        // terrainProvider: new Cesium.CesiumTerrainProvider({
        //   //加载火星在线地形
        //   url: "http://data.marsgis.cn/terrain",
        // }),
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
     * 绘制路线
     * @param {Object} parameter
     */
    setDrawRoute(parameter) {
      console.log(parameter);
      const { data, style, pointPosition } = parameter;
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

      // this._Material.create(TrailLineMaterialProperty(Cesium));

      const Route = this._Entity.createPolyline({
        positions: Cesium.Cartesian3.fromDegreesArray(arrData),
        // clampToGround: true,
        material: new Cesium.Color.fromCssColorString(color),
        // material: new Cesium.Material_TrailLineMaterialProperty(),
        arcType: Cesium.ArcType.GEODESIC,
        width: 3,
      });
      this._Entity.createBillboard({
        id: uuidv4(),
        position: Cesium.Cartesian3.fromDegrees(arrData[0], arrData[1]),
        image:
          process.env.VUE_APP_PUBLIC_URL + "/Vue/Maps/Gaode/PoiQuery/start.png",
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        width: 23,
        height: 35,
      });
      this._Entity.createBillboard({
        id: uuidv4(),
        position: Cesium.Cartesian3.fromDegrees(arrData[arrData.length-2], arrData[arrData.length-1]),
        image:
          process.env.VUE_APP_PUBLIC_URL + "/Vue/Maps/Gaode/PoiQuery/end.png",
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        width: 23,
        height: 35,
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
  .tools {
    position: fixed;
    bottom: 40px;
    right: 20px;
  }
}
</style>