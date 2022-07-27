export default [
  {
    codeLanguage: "VUE",
    relyOn: [
      {
        label: "uuid（npm）",
        url: "https://www.npmjs.com/package/uuid",
        externalLinks: true
      },
      {
        label: "bignumber.js（npm）",
        url: "https://www.npmjs.com/package/bignumber.js",
        externalLinks: true
      },
      {
        label: "Entity.js",
        url: "cesium/Transform.js"
      },
      {
        label: "floor.glb",
        url: "Vue/Models/gLTF/storey/floor.glb"
      },
      {
        label: "top.glb",
        url: "Vue/Models/gLTF/storey/top.glb"
      }
    ],
    code: [
      {
        codeLanguage: "html",
        content: `<template>
                      <div class="container">
                        <div id="cesiumContainer"></div>
                        <el-card class="operation-panel">
                          <div slot="header" class="operation-header clearfix">
                            <span>楼层分解</span>
                          </div>
                          <div class="operation-content">
                            <el-form ref="form" :model="form" label-width="80px" size="mini">
                              <el-form-item label="整体控制">
                                <el-radio-group v-model="form.whole" @change="wholeChange">
                                  <el-radio-button :label="item.value" v-for="(item, index) in wholeArr" :key="index">{{ item.label }}
                                  </el-radio-button>
                                </el-radio-group>
                              </el-form-item>
                              <el-form-item label="显示指定">
                                <el-radio-group v-model="form.appoint" @change="appointChange">
                                  <el-radio class="appoint-radio" border :label="item.value" v-for="(item, index) in appointArr"
                                    :key="index">{{ item.label }}
                                  </el-radio>
                                </el-radio-group>
                              </el-form-item>
                            </el-form>
                          </div>
                        </el-card>
                      </div>
                    </template>`
      },
      {
        codeLanguage: "js",
        content: `import Entity from "@/common/cesium/Entity.js";
                    import Transform from "@/common/cesium/Transform.js";
                    import BigNumber from "bignumber.js";
                    import { v4 as uuidv4 } from "uuid";
                    export default {
                      data() {
                        return {
                          viewer: null,
                          handler: null,
                          _Entity: null,
                          _Transform: null,
                          cesiumContainerDom: null,
                          wholeArr: [
                            {
                              value: 1,
                              label: "展开"
                            },
                            {
                              value: 2,
                              label: "合并"
                            },
                            {
                              value: 3,
                              label: "还原"
                            }
                          ],
                          appointArr: [
                            {
                              value: 1,
                              label: "一楼"
                            },
                            {
                              value: 2,
                              label: "二楼"
                            },
                            {
                              value: 3,
                              label: "三楼"
                            },
                            {
                              value: 4,
                              label: "四楼"
                            },
                            {
                              value: 5,
                              label: "五楼"
                            },
                            {
                              value: 6,
                              label: "六楼"
                            },
                            {
                              value: 7,
                              label: "七楼"
                            },
                            {
                              value: 8,
                              label: "八楼"
                            },
                            {
                              value: 9,
                              label: "九楼"
                            },
                            {
                              value: 0,
                              label: "顶楼"
                            },
                          ],
                          form: {
                            whole: "",
                            appoint: ""
                          },
                          EntityArr: [],
                          defaultPosition: {
                            lat: 41.81741540043599,
                            lng: 123.42949456471793,
                          },
                          offsetLng: "",
                          offsetMeter: ""
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
                            infoBox: false,
                            selectionIndicator: false,
                            navigation: false,
                            animation: false,
                            timeline: false,
                            baseLayerPicker: false,
                            geocoder: false,
                            homeButton: false,
                            sceneModePicker: false,
                            navigationHelpButton: false,
                            shouldAnimate: false,
                          });
                          //是否开启抗锯齿
                          this.viewer.scene.fxaa = true;
                          this.viewer.scene.postProcessStages.fxaa.enabled = true;
                          this._Entity = new Entity(Cesium, this.viewer);
                          this._Transform = new Transform(Cesium, this.viewer);
                          this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
                          this.cesiumContainerDom = document.getElementById('cesiumContainer')
                          this.viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});//移除地形
                          this.start();
                        },
                        /**
                         * 开始
                         */
                        start() {
                          const Cesium = this.cesium;
                          const _this = this
                          /**
                           * 初始化模型
                           */
                          function floorInit(len, height) {
                            let EntityModelArr = []
                            let _height = 0
                            // 加载楼层 start
                            for (let i = 0; i < len; i++) {
                              _height = i * height
                              const EntityModel = _this._Entity.createModel({
                                id: uuidv4(),
                                position: Cesium.Cartesian3.fromDegrees(
                                  _this.defaultPosition.lng, _this.defaultPosition.lat, _height
                                ),
                                uri: process.env.VUE_APP_PUBLIC_URL + "/Vue/Models/gLTF/storey/floor.glb",
                                heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                              })
                              EntityModelArr.push(EntityModel)
                            }
                            // 加载楼层 end
                            // 加载楼顶 start
                            const EntityModelTop = _this._Entity.createModel({
                              id: uuidv4(),
                              position: Cesium.Cartesian3.fromDegrees(
                                _this.defaultPosition.lng, _this.defaultPosition.lat, len * height
                              ),
                              uri: process.env.VUE_APP_PUBLIC_URL + "/Vue/Models/gLTF/storey/top.glb",
                              heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                            })
                            // 加载楼顶 end
                            return [...EntityModelArr, EntityModelTop]
                          }
                    
                          this.EntityArr = floorInit(9, 3)
                    
                          this.viewer.flyTo(this.EntityArr);
                    
                    
                          // 计算移位的位置
                          this.offsetMeter = Math.abs(Number(this._Transform.meter2Lng(15, this.defaultPosition.lng)))
                          this.offsetLng = Number(new BigNumber(this.defaultPosition.lng).plus(this.offsetMeter))
                    
                          /**
                           * 鼠标接触模型 产生高亮
                           */
                          function modelHover($entity, type) {
                            if (type) {
                              $entity.model.color = Cesium.Color.RED.withAlpha(0.5)
                              $entity.model.colorBlendMode = Cesium.ColorBlendMode.MIX
                              $entity.model.colorBlendAmount = 0.5
                              $entity.model.silhouetteColor = "Red"
                              $entity.model.silhouetteSize = 2.0
                            } else {
                              $entity.model.color = undefined
                              $entity.model.colorBlendMode = undefined
                              $entity.model.colorBlendAmount = undefined
                              $entity.model.silhouetteColor = undefined
                              $entity.model.silhouetteSize = undefined
                            }
                          }
                    
                          // 鼠标移动 start
                          this.handler.setInputAction((event) => {
                            const pick = this.viewer.scene.pick(event.endPosition);
                            // const dpick = this.viewer.scene.drillPick(movement.position, 1000, 1000)
                            // console.log("cesium点击", movement, pick, dpick);
                            if (!Cesium.defined(pick)) {
                              this.cesiumContainerDom.style.cursor = "default";
                              for (let i = 0; i < this.EntityArr.length; i++) {
                                const item = this.EntityArr[i]
                                modelHover(item, false)
                              }
                            } else {
                              this.cesiumContainerDom.style.cursor = "pointer";
                              const _Entity = pick.id
                              for (let i = 0; i < this.EntityArr.length; i++) {
                                const item = this.EntityArr[i]
                                modelHover(item, false)
                                if (item._id == _Entity._id) {
                                  modelHover(_Entity, true)
                                }
                              }
                            }
                    
                            // const ray = this.viewer.camera.getPickRay(event.endPosition);
                            // const cartesian = this.viewer.scene.globe.pick(
                            //   ray,
                            //   this.viewer.scene
                            // );
                            // console.log(cartesian)
                          }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                          // 鼠标移动 end
                          //鼠标左键点击 Start
                          this.handler.setInputAction((event) => {
                            const pick = this.viewer.scene.pick(event.position);
                            if (pick) {
                              const $entity = pick.id
                              // $entity.model.heightReference = Cesium.HeightReference.NONE
                              // $entity.position = this.getCallbackProperty(position, 'offset')
                              for (let i = 0; i < this.EntityArr.length; i++) {
                                const _Entity_ = this.EntityArr[i]
                                let position
                                if (_Entity_.position?._value) {
                                  position = this.cartesian3TolngLatAlt(_Entity_.position._value)
                                } else {
                                  position = this.cartesian3TolngLatAlt(_Entity_.position.getValue())
                                }
                    
                                if (_Entity_._id == $entity._id) {
                                  if (position[0] == this.defaultPosition.lng) {
                                    _Entity_.position = this.getCallbackProperty(position, 'offset')
                                  } else {
                                    _Entity_.position = this.getCallbackProperty(position, 'noOffset')
                                  }
                    
                                } else {
                                  _Entity_.position = this.getCallbackProperty(position, 'noOffset')
                                }
                              }
                            }
                          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                          //鼠标左键点击 End
                        },
                        /**
                         * @description 将笛卡尔坐标系转成经纬度高程
                         * @param {Object} cartesian 笛卡尔坐标系对象 {x, y, z}
                         * @returns 返回经纬度高程对象
                         */
                        cartesian3TolngLatAlt(cartesian) {
                          const Cesium = this.cesium;
                          if (!cartesian || Object.keys(cartesian).length !== 3) {
                            throw new Error('请传入合法的cartesian对象 {x, y, z}')
                          }
                          const cartesian3 = new Cesium.Cartesian3(cartesian.x, cartesian.y, cartesian.z);
                          const cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
                          const lat = Cesium.Math.toDegrees(cartographic.latitude);
                          const lng = Cesium.Math.toDegrees(cartographic.longitude);
                          const height = Math.round(cartographic.height)
                          return [lng, lat, height]
                        },
                    
                        /**
                         * 延迟操作
                         */
                        getCallbackProperty(position, type, height) {
                          const Cesium = this.cesium;
                          const _this = this
                          if (type == "open") {
                            let factor = position[2];
                            return new Cesium.CallbackProperty((time) => {
                              if (factor >= height) {
                                factor = height
                              } else {
                                factor++
                              }
                              // 动态更新位置
                              return Cesium.Cartesian3.fromDegrees(
                                position[0], position[1], factor
                              )
                            }, false);
                          }
                          if (type == "merge") {
                            let factor = position[2];
                            return new Cesium.CallbackProperty((time) => {
                              if (factor <= height) {
                                factor = height
                              } else {
                                factor--
                              }
                              // 动态更新位置
                              return Cesium.Cartesian3.fromDegrees(
                                position[0], position[1], factor
                              )
                            }, false);
                          }
                          if (type == "recovery") {
                            return Cesium.Cartesian3.fromDegrees(
                              this.defaultPosition.lng, position[1], height
                            )
                          }
                          if (type == "offset") {
                            let originalLng = position[0]
                            return new Cesium.CallbackProperty((time) => {
                              if (originalLng >= this.offsetLng) {
                                originalLng = this.offsetLng
                              } else {
                                originalLng += this.offsetMeter / 30
                              }
                              // 动态更新位置
                              return Cesium.Cartesian3.fromDegrees(
                                originalLng, position[1], position[2]
                              )
                            }, false);
                          }
                          if (type == "noOffset") {
                            let originalLng = position[0]
                            return new Cesium.CallbackProperty((time) => {
                              if (originalLng <= this.defaultPosition.lng) {
                                originalLng = this.defaultPosition.lng
                              } else {
                                originalLng -= this.offsetMeter / 30
                              }
                              // 动态更新位置
                              return Cesium.Cartesian3.fromDegrees(
                                originalLng, position[1], position[2]
                              )
                            }, false);
                          }
                        },
                        /**
                         * 整体控制
                         */
                        wholeChange(e) {
                          const Cesium = this.cesium;
                          this.form.appoint = ""
                          for (let i = 0; i < this.EntityArr.length; i++) {
                            const item = this.EntityArr[i]
                            let position
                            if (item.position?._value) {
                              position = this.cartesian3TolngLatAlt(item.position._value)
                            } else {
                              position = this.cartesian3TolngLatAlt(item.position.getValue())
                            }
                    
                            if (e === 1) {
                              item.show = true
                              item.position = this.getCallbackProperty(position, 'open', 3 * i * 2)
                            }
                            if (e === 2) {
                              item.show = true
                              item.position = this.getCallbackProperty(position, 'merge', 3 * i)
                            }
                            if (e === 3) {
                              item.show = true
                              item.position = this.getCallbackProperty(position, 'recovery', 3 * i)
                            }
                          }
                        },
                        /**
                         * 显示指定
                         */
                        appointChange(e) {
                          this.form.whole = ""
                          for (let i = 0; i < this.EntityArr.length; i++) {
                            const item = this.EntityArr[i]
                            let position
                            if (item.position?._value) {
                              position = this.cartesian3TolngLatAlt(item.position._value)
                            } else {
                              position = this.cartesian3TolngLatAlt(item.position.getValue())
                            }
                            item.position = this.getCallbackProperty(position, 'merge', 3 * i)
                            if (e === 0) {
                              item.show = true
                            } else {
                              if (i < e) {
                                item.show = true
                              } else {
                                item.show = false
                              }
                            }
                          }
                        }
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
                      
                        .operation-panel {
                          width: 360px;
                          position: fixed;
                          top: 60px;
                          right: 10px;
                          z-index: 9;
                      
                          .appoint-radio {
                            margin: 0 5px 5px 0;
                          }
                        }
                      }`
      }
    ]
  },
  {
    codeLanguage: "JS",
    relyOn: [
      {
        label: "uuid.min.js",
        url: "JavaScript/cesium/Tripartite/uuid-js/uuid.min.js"
      },
      {
        label: "bignumber.js",
        url: "JavaScript/cesium/Tripartite/bignumber/bignumber.js"
      },
      {
        label: "Entity.js",
        url: "JavaScript/cesium/Entity.js"
      },
      {
        label: "Utils.js",
        url: "JavaScript/cesium/Utils.js"
      },
      {
        label: "Transform.js",
        url: "JavaScript/cesium/Transform.js"
      },
      {
        label: "floor.glb",
        url: "JavaScript/Models/gLTF/storey/floor.glb"
      },
      {
        label: "top.glb",
        url: "JavaScript/Models/gLTF/storey/top.glb"
      }
    ],
    code: [
      {
        codeLanguage: "js",
        content: `window.models_gLTF_district_Obj = {
                            _Utils: new Utils(),
                            handler: null,
                            _Entity: null,
                            _Transform: null,
                            cesiumContainerDom: null,
                            wholeArr: [{
                                value: 1,
                                label: "展开"
                            },
                            {
                                value: 2,
                                label: "合并"
                            },
                            {
                                value: 3,
                                label: "还原"
                            }],
                            appointArr: [
                                {
                                    value: 1,
                                    label: "一楼"
                                },
                                {
                                    value: 2,
                                    label: "二楼"
                                },
                                {
                                    value: 3,
                                    label: "三楼"
                                },
                                {
                                    value: 4,
                                    label: "四楼"
                                },
                                {
                                    value: 5,
                                    label: "五楼"
                                },
                                {
                                    value: 6,
                                    label: "六楼"
                                },
                                {
                                    value: 7,
                                    label: "七楼"
                                },
                                {
                                    value: 8,
                                    label: "八楼"
                                },
                                {
                                    value: 9,
                                    label: "九楼"
                                },
                                {
                                    value: 0,
                                    label: "顶楼"
                                },
                            ],
                            form: {
                                whole: "",
                                appoint: ""
                            },
                            EntityArr: [],
                            defaultPosition: {
                                lat: 41.81741540043599,
                                lng: 123.42949456471793,
                            },
                            offsetLng: "",
                            offsetMeter: "",
                            // 初始化
                            init() {
                                if (!this._Utils.operationDom('has', "operation-panel")) {
                                    this._Utils.operationDom("append", 'MainCenter', this.create_panel_dom("operation-panel"))
                                }
                                this._Entity = new Entity(Cesium, viewer);
                                this._Transform = new Transform(Cesium, viewer);
                                this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                                this.cesiumContainerDom = document.getElementById('MainCenter')
                                viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider({});//移除地形
                    
                                this.EntityArr = this.floorInit(9, 3)
                                viewer.flyTo(this.EntityArr);
                    
                                // 计算移位的位置
                                this.offsetMeter = Math.abs(Number(this._Transform.meter2Lng(15, this.defaultPosition.lng)))
                                this.offsetLng = Number(new BigNumber(this.defaultPosition.lng).plus(this.offsetMeter))
                    
                    
                    
                                // 鼠标移动 start
                                this.handler.setInputAction((event) => {
                                    const pick = viewer.scene.pick(event.endPosition);
                                    if (!Cesium.defined(pick)) {
                                        this.cesiumContainerDom.style.cursor = "default";
                                        for (let i = 0; i < this.EntityArr.length; i++) {
                                            const item = this.EntityArr[i]
                                            this.modelHover(item, false)
                                        }
                                    } else {
                                        this.cesiumContainerDom.style.cursor = "pointer";
                                        const _Entity = pick.id
                                        for (let i = 0; i < this.EntityArr.length; i++) {
                                            const item = this.EntityArr[i]
                                            this.modelHover(item, false)
                                            if (item._id == _Entity._id) {
                                                this.modelHover(_Entity, true)
                                            }
                                        }
                                    }
                                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                                // 鼠标移动 end
                                //鼠标左键点击 Start
                                this.handler.setInputAction((event) => {
                                    const pick = viewer.scene.pick(event.position);
                                    if (pick) {
                                        const $entity = pick.id
                                        for (let i = 0; i < this.EntityArr.length; i++) {
                                            const _Entity_ = this.EntityArr[i]
                                            let position
                                            if (_Entity_.position?._value) {
                                                position = this.cartesian3TolngLatAlt(_Entity_.position._value)
                                            } else {
                                                position = this.cartesian3TolngLatAlt(_Entity_.position.getValue())
                                            }
                    
                                            if (_Entity_._id == $entity._id) {
                                                if (position[0] == this.defaultPosition.lng) {
                                                    _Entity_.position = this.getCallbackProperty(position, 'offset')
                                                } else {
                                                    _Entity_.position = this.getCallbackProperty(position, 'noOffset')
                                                }
                    
                                            } else {
                                                _Entity_.position = this.getCallbackProperty(position, 'noOffset')
                                            }
                                        }
                                    }
                                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                                //鼠标左键点击 End
                    
                    
                    
                            },
                            /**
                            * 初始化模型
                            */
                            floorInit(len, height) {
                                let EntityModelArr = []
                                let _height = 0
                                // 加载楼层 start
                                for (let i = 0; i < len; i++) {
                                    _height = i * height
                                    const EntityModel = this._Entity.createModel({
                                        id: uuid4(),
                                        position: Cesium.Cartesian3.fromDegrees(
                                            this.defaultPosition.lng, this.defaultPosition.lat, _height
                                        ),
                                        uri: "http://re8r7gk9l.hb-bkt.clouddn.com/JavaScript/cesium/Models/gLTF/storey/floor.glb",
                                        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                                    })
                                    EntityModelArr.push(EntityModel)
                                }
                                // 加载楼层 end
                                // 加载楼顶 start
                                const EntityModelTop = this._Entity.createModel({
                                    id: uuid4(),
                                    position: Cesium.Cartesian3.fromDegrees(
                                        this.defaultPosition.lng, this.defaultPosition.lat, len * height
                                    ),
                                    uri: "http://re8r7gk9l.hb-bkt.clouddn.com/JavaScript/cesium/Models/gLTF/storey/top.glb",
                                    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                                })
                                // 加载楼顶 end
                                return [...EntityModelArr, EntityModelTop]
                            },
                    
                            /**
                            * @description 将笛卡尔坐标系转成经纬度高程
                            * @param {Object} cartesian 笛卡尔坐标系对象 {x, y, z}
                            * @returns 返回经纬度高程对象
                            */
                            cartesian3TolngLatAlt(cartesian) {
                                if (!cartesian || Object.keys(cartesian).length !== 3) {
                                    throw new Error('请传入合法的cartesian对象 {x, y, z}')
                                }
                                const cartesian3 = new Cesium.Cartesian3(cartesian.x, cartesian.y, cartesian.z);
                                const cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
                                const lat = Cesium.Math.toDegrees(cartographic.latitude);
                                const lng = Cesium.Math.toDegrees(cartographic.longitude);
                                const height = Math.round(cartographic.height)
                                return [lng, lat, height]
                            },
                            /**
                            * 延迟操作
                            */
                            getCallbackProperty(position, type, height) {
                                if (type == "open") {
                                    let factor = position[2];
                                    return new Cesium.CallbackProperty((time) => {
                                        if (factor >= height) {
                                            factor = height
                                        } else {
                                            factor++
                                        }
                                        // 动态更新位置
                                        return Cesium.Cartesian3.fromDegrees(
                                            position[0], position[1], factor
                                        )
                                    }, false);
                                }
                                if (type == "merge") {
                                    let factor = position[2];
                                    return new Cesium.CallbackProperty((time) => {
                                        if (factor <= height) {
                                            factor = height
                                        } else {
                                            factor--
                                        }
                                        // 动态更新位置
                                        return Cesium.Cartesian3.fromDegrees(
                                            position[0], position[1], factor
                                        )
                                    }, false);
                                }
                                if (type == "recovery") {
                                    return Cesium.Cartesian3.fromDegrees(
                                        this.defaultPosition.lng, position[1], height
                                    )
                                }
                                if (type == "offset") {
                                    let originalLng = position[0]
                                    return new Cesium.CallbackProperty((time) => {
                                        if (originalLng >= this.offsetLng) {
                                            originalLng = this.offsetLng
                                        } else {
                                            originalLng += this.offsetMeter / 30
                                        }
                                        // 动态更新位置
                                        return Cesium.Cartesian3.fromDegrees(
                                            originalLng, position[1], position[2]
                                        )
                                    }, false);
                                }
                                if (type == "noOffset") {
                                    let originalLng = position[0]
                                    return new Cesium.CallbackProperty((time) => {
                                        if (originalLng <= this.defaultPosition.lng) {
                                            originalLng = this.defaultPosition.lng
                                        } else {
                                            originalLng -= this.offsetMeter / 30
                                        }
                                        // 动态更新位置
                                        return Cesium.Cartesian3.fromDegrees(
                                            originalLng, position[1], position[2]
                                        )
                                    }, false);
                                }
                            },
                            /**
                            * 创建操作面板
                            * @param {*} id 
                            * @returns 
                            */
                            create_panel_dom(id) {
                                let _div = window.document.createElement("div");
                                _div.id = id
                                _div.className = id
                                const _this = this
                    
                                function create_whole() {
                                    let wholeHTML = ''
                                    for (let i = 0; i < _this.wholeArr.length; i++) {
                                        wholeHTML += '<div class="whole-item" onclick="models_gLTF_district_Obj.wholeClick(' + i + ')">' + _this.wholeArr[i].label + '</div>'
                                    }
                                    return wholeHTML
                                }
                    
                                function create_appoint() {
                                    let appointHTML = ''
                                    for (let i = 0; i < _this.appointArr.length; i++) {
                                        appointHTML += '<div class="appoint-item" onclick="models_gLTF_district_Obj.appointClick(' + i + ')">' + _this.appointArr[i].label + '</div>'
                                    }
                                    return appointHTML
                                }
                    
                                let _html = '<div class="operation-header">楼层分解</div>'
                                _html += '<div class="operation-content">'
                                _html += '<div class="form-item">'
                                _html += '<div class="form-label">整体控制</div>'
                                _html += '<div class="form-value">'
                                _html += create_whole()
                                _html += '</div>'
                                _html += '</div>'
                                _html += '<div class="form-item">'
                                _html += '<div class="form-label">显示指定</div>'
                                _html += '<div class="form-value">'
                                _html += create_appoint()
                                _html += '</div>'
                                _html += '</div>'
                                _html += '</div>'
                                _div.innerHTML = _html
                                return _div
                            },
                            /**
                            * 鼠标接触模型 产生高亮
                            */
                            modelHover($entity, type) {
                                if (type) {
                                    $entity.model.color = Cesium.Color.RED.withAlpha(0.5)
                                    $entity.model.colorBlendMode = Cesium.ColorBlendMode.MIX
                                    $entity.model.colorBlendAmount = 0.5
                                    $entity.model.silhouetteColor = "Red"
                                    $entity.model.silhouetteSize = 2.0
                                } else {
                                    $entity.model.color = undefined
                                    $entity.model.colorBlendMode = undefined
                                    $entity.model.colorBlendAmount = undefined
                                    $entity.model.silhouetteColor = undefined
                                    $entity.model.silhouetteSize = undefined
                                }
                            },
                            /**
                            * 整体控制触发
                            */
                            wholeClick(index) {
                                const e = this.wholeArr[index].value
                                this.form.appoint = ""
                                for (let i = 0; i < this.EntityArr.length; i++) {
                                  const item = this.EntityArr[i]
                                  let position
                                  if (item.position?._value) {
                                    position = this.cartesian3TolngLatAlt(item.position._value)
                                  } else {
                                    position = this.cartesian3TolngLatAlt(item.position.getValue())
                                  }
                          
                                  if (e === 1) {
                                    item.show = true
                                    item.position = this.getCallbackProperty(position, 'open', 3 * i * 2)
                                  }
                                  if (e === 2) {
                                    item.show = true
                                    item.position = this.getCallbackProperty(position, 'merge', 3 * i)
                                  }
                                  if (e === 3) {
                                    item.show = true
                                    item.position = this.getCallbackProperty(position, 'recovery', 3 * i)
                                  }
                                }
                            },
                            /**
                            * 显示指定触发
                            */
                            appointClick(index) {
                                const e = this.appointArr[index].value
                                this.form.whole = ""
                                for (let i = 0; i < this.EntityArr.length; i++) {
                                    const item = this.EntityArr[i]
                                    let position
                                    if (item.position?._value) {
                                        position = this.cartesian3TolngLatAlt(item.position._value)
                                    } else {
                                        position = this.cartesian3TolngLatAlt(item.position.getValue())
                                    }
                                    item.position = this.getCallbackProperty(position, 'merge', 3 * i)
                                    if (e === 0) {
                                        item.show = true
                                    } else {
                                        if (i < e) {
                                            item.show = true
                                        } else {
                                            item.show = false
                                        }
                                    }
                                }
                            }
                        }
                        models_gLTF_district_Obj.init()`
      },
      {
        codeLanguage: "css",
        content: `.operation-panel {
                            width: 360px;
                            position: fixed;
                            top: 60px;
                            right: 10px;
                            z-index: 9;
                            -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                            border: 1px solid #ebeef5;
                            background-color: #fff;
                            color: #303133;
                            -webkit-transition: .3s;
                            transition: .3s;
                            border-radius: 4px;
                            overflow: hidden;
                          
                            .operation-header {
                              padding: 18px 20px;
                              border-bottom: 1px solid #ebeef5;
                              -webkit-box-sizing: border-box;
                              box-sizing: border-box;
                              color: #303133;
                              font-size: 16px;
                            }
                          
                            .operation-content {
                              padding: 20px;
                          
                              .form-item {
                                display: flex;
                                margin-bottom: 20px;
                          
                                .form-label {
                                  width: 80px;
                                  text-align: right;
                                  vertical-align: middle;
                                  float: left;
                                  font-size: 14px;
                                  color: #606266;
                                  padding: 6px 12px 6px 0;
                                  -webkit-box-sizing: border-box;
                                  box-sizing: border-box;
                                  font-weight: 700;
                                }
                          
                                .form-value {
                                  flex: 1;
                                  overflow: hidden;
                                  display: flex;
                                  flex-wrap: wrap;
                          
                                  >* {
                                    padding: 6px 15px;
                                    margin: 0 5px 5px 0;
                                    border-radius: 3px;
                                    font-size: 14px;
                                    color: #606266;
                                    cursor: pointer;
                                    border: 1px solid #dcdfe6;
                          
                                    &:hover {
                                      border-color: #409eff;
                                      color: #409eff;
                                    }
                                  }
                                }
                              }
                            }
                          }`
      }
    ]
  },
]