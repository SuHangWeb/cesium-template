export default [
  {
    codeLanguage: "VUE",
    relyOn: [
      {
        label: "data.js",
        url: "Vue/Html/htmlPopup/data.js"
      },
      {
        label: "popupDom.vue",
        url: "Vue/Html/htmlPopup/popupDom.vue"
      },
      {
        label: "Entity.js",
        url: "cesium/Entity.js"
      },
    ],
    code: [
      {
        codeLanguage: "html",
        content: ` <div class="container">
                  <div id="cesiumContainer"></div>
                  <div v-for="(item, index) in dataPosition" :key="index">
                    <popup-dom
                      @close="popupClose"
                      v-show="JSON.stringify(show_list).indexOf(item.id) != -1"
                      :item="item"
                    />
                  </div>
                </div>`
      },
      {
        codeLanguage: "js",
        content: `import { initPosition, dataPosition } from "./module/data";
                  import popupDom from "./module/popupDom.vue";
                  import Entity from "@/common/cesium/Entity.js";
                  export default {
                    name: "htmlPopup",
                    components: { popupDom },
                    data() {
                      return {
                        viewer: null,
                        _Entity: null,
                        handler: null,
                        dataPosition: dataPosition,
                        show_list: [],
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
                            //????????????????????????
                            url: "http://data.marsgis.cn/terrain",
                          }),
                          shouldAnimate: true,
                          infoBox: false,
                          selectionIndicator: false,
                        });
                        //??????????????????
                        this.viewer.scene.globe.depthTestAgainstTerrain = false;
                        this._Entity = new Entity(Cesium, this.viewer);
                        this.handler = new Cesium.ScreenSpaceEventHandler(
                          this.viewer.scene.canvas
                        );
                        this.start();
                        //??????????????????
                        this.popupPosition();
                  
                        //??????
                        this.viewer.camera.flyTo({
                          //setView??????????????? flyTo// ??????????????????  ???????????????????????????????????? ????????????fly??????
                          destination: Cesium.Cartesian3.fromDegrees(
                            initPosition.lng,
                            initPosition.lat,
                            initPosition.height
                          ), //???????????????????????? ???????????????(????????????)
                          orientation: {
                            heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //??????????????????
                            pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //??????????????????
                            roll: 0.0, // default value
                          },
                          duration: 3, //3???????????????
                        });
                      },
                      /**
                       * ??????
                       */
                      start() {
                        const Cesium = this.cesium;
                        //????????????
                        this.dataPosition.map((item) => {
                          this._Entity.createPoint({
                            id: item.id,
                            name: item.name,
                            position: Cesium.Cartesian3.fromDegrees(item.lng, item.lat),
                            color: Cesium.Color.CHARTREUSE.withAlpha(1),
                            pixelSize: 10,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            outlineColor: Cesium.Color.WHITE,
                            outlineWidth: 1,
                          });
                        });
                        //????????????????????????
                        this.handler.setInputAction((event) => {
                          const pick = this.viewer.scene.pick(event.position);
                          if (pick) {
                            const f = this.dataPosition.filter(
                              (item) => item.id == pick.id._id
                            )[0];
                            this.show_list.push(f.id);
                            //????????????
                            this.show_list = [...new Set(this.show_list)];
                          }
                        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                      },
                      /**
                       * ??????????????????
                       */
                      popupPosition() {
                        const Cesium = this.cesium;
                        for (let i = 0; i < this.dataPosition.length; i++) {
                          const item = this.dataPosition[i];
                          const dom = document.getElementById(item.id);
                          /**
                           * scene = ??????
                           * preRender = Event ????????????
                           * addEventListener = ???????????????????????????????????????????????????
                           *
                           */
                          this.viewer.scene.preRender.addEventListener(() => {
                            const position = Cesium.Cartesian3.fromDegrees(item.lng, item.lat, 0);
                            /**
                             * ?????????????????????
                             * cartesianToCanvasCoordinates = ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????HTML?????????
                             */
                            var canvasPosition = this.viewer.scene.cartesianToCanvasCoordinates(
                              position,
                              new Cesium.Cartesian2()
                            );
                            if (Cesium.defined(canvasPosition)) {
                              dom.style.top = canvasPosition.y - dom.offsetHeight + 20 + "px";
                              dom.style.left = canvasPosition.x + dom.offsetWidth - 40 + "px";
                            }
                          });
                        }
                      },
                      /**
                       * ????????????
                       * @param {*} id
                       */
                      popupClose(id) {
                        const index = this.show_list.indexOf(id);
                        this.show_list.splice(index, 1);
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
                  } `
      }
    ]
  },
  {
    codeLanguage: "JS",
    relyOn: [
      {
        label: "testDomHTML.js",
        url: "JavaScript/Html/htmlPopup/testDomHTML.js"
      }
    ],
    code: [
      {
        codeLanguage: "js",
        content: `/**
                    * ????????????
                    */
                  class createPoint_sh {
                      /**
                       * @param {Object} Cesium 
                       * @param {Object} viewer 
                       * @param {Object} position  ??????
                       * @param {Object} id        id
                       * @param {Object} name      name
                       * @param {Object} option     ??????????????????
                       */
                      constructor(Cesium, viewer, position, id, name, option = {}) {
                          this.Cesium = Cesium
                          this.viewer = viewer
                          this.position = position
                          this.name = name
                          this.id = id
                          this.option = option
                      }
                  
                      startCreate() {
                          const Cesium = this.Cesium;
                          const option = this.option
                          const position = this.position
                          const id = this.id
                          const name = this.name
                          let pointGeometry = this.viewer.entities.add({
                              id,
                              name,
                              position,
                              point: {
                                  color: option?.color ? option.color : Cesium.Color.SKYBLUE,
                                  pixelSize: option?.pixelSize ? option.pixelSize : 10,
                                  outlineColor: option?.outlineColor ? option.outlineColor : Cesium.Color.YELLOW,
                                  outlineWidth: option?.outlineWidth ? option.outlineWidth : 3,
                                  disableDepthTestDistance: option?.disableDepthTestDistance ? option.disableDepthTestDistance : Number.POSITIVE_INFINITY,
                              },
                          });
                          return pointGeometry;
                      }
                  }
                  /**
                    * ??????html
                    */
                  function addCreateHTML() {
                      const _this = this
                      //???????????????????????????
                      const initPosition = {
                          "lng": 123.42840294759996,
                          "lat": 41.81072850022128,
                          "height": 5517
                      }
                      //????????????
                      const test_data = [
                          {
                              "id": "e4df481f-fbfa-41cb-8582-cec2ffb46f31",
                              "lng": 123.42786580298868,
                              "lat": 41.80191390065372,
                              "height": 0,
                              "title": "????????????",
                              "area": "66200?????????",
                              "year": "1911"
                          },
                          {
                              "id": "dad52921-08cb-4ae0-b2c6-fb7342d8c52f",
                              "lng": 123.43378100090162,
                              "lat": 41.811274298820095,
                              "height": 0,
                              "title": "????????????",
                              "area": "",
                              "year": ""
                          },
                          {
                              "id": "08a69a4d-cd14-4dd8-a28e-a91eb4fb1e1a",
                              "lng": 123.42942835160613,
                              "lat": 41.81700147554745,
                              "height": 0,
                              "title": "????????????",
                              "area": "12.11????????????",
                              "year": "1913"
                          }
                      ]
                  
                      //????????????
                      test_data.map(item => {
                          const position = Cesium.Cartesian3.fromDegrees(item.lng, item.lat)
                          const id = item.id
                          const name = item.title
                          const _addPoint = new createPoint_sh(Cesium, viewer, position, id, name)
                          _addPoint.startCreate()
                      })
                  
                      /**
                        * ????????????
                        * @param {*} obj ??????
                        * @param {*} id ??????????????? ?????????id
                        */
                      function addPopup(obj, id) {
                          let htmlOverlay = document.getElementById(id);
                          htmlOverlay.style.display = "block";
                          // console.log("htmlOverlay?????????", htmlOverlay);
                          // console.log("htmlOverlay?????????", htmlOverlay.offsetHeight);
                          // console.log("htmlOverlay?????????", htmlOverlay.offsetWidth);
                          //Cartesian2 = 2D????????????  ???????????? x,y
                          let scratch = new Cesium.Cartesian2();
                  
                          /**
                            * scene = ??????
                            * preRender = Event ????????????
                            * addEventListener = ???????????????????????????????????????????????????
                            *
                            */
                          viewer.scene.preRender.addEventListener(function () {
                              var position = Cesium.Cartesian3.fromDegrees(
                                  obj.lng,
                                  obj.lat,
                                  obj.height
                              );
                              /**
                                * ?????????????????????
                                * cartesianToCanvasCoordinates = ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????HTML?????????
                                */
                              var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(
                                  position,
                                  scratch
                              );
                              if (Cesium.defined(canvasPosition)) {
                                  htmlOverlay.style.top =
                                      canvasPosition.y - htmlOverlay.offsetHeight + "px";
                                  htmlOverlay.style.left =
                                      canvasPosition.x - htmlOverlay.offsetWidth / 2 + "px";
                              }
                          });
                      }
                  
                      /**
                        * ??????html
                        * @param {*} lng
                        * @param {*} lat
                        * @param {*} id ??????????????? ?????????id
                        */
                      function addHTML(lng, lat, id) {
                          //??????????????????
                          const obj = { lng, lat };
                          let cartographics = [Cesium.Cartographic.fromDegrees(obj.lng, obj.lat)];
                          cartographics.obj = obj;
                          // sampleTerrain=???????????? ??????????????????????????????
                          Cesium.sampleTerrain(
                              viewer.scene.terrainProvider, //???????????????
                              14, //??????????????????
                              cartographics
                          ).then((updatedPositions) => {
                              // console.log(updatedPositions);
                              // console.log("?????????", updatedPositions[0].height);
                              updatedPositions.obj.height = updatedPositions[0].height;
                              addPopup(updatedPositions.obj, id);
                          });
                      }
                  
                  
                  
                      //????????????
                      let handler = new Cesium.ScreenSpaceEventHandler(
                          viewer.scene.canvas
                      );
                  
                      handler.setInputAction((event) => {
                          var pick = viewer.scene.pick(event.position);
                          if (pick && pick.id) {
                              let f = test_data.filter((item) => item.id == pick.id._id);
                              console.log(test_data)
                              console.log(f)
                              if (f.length == 0) {
                                  return
                              }
                              addHTML(f[0].lng, f[0].lat, pick.id._id);//??????id ????????????????????????
                  
                              //??????????????????dom
                              const hasDom = new operationDom(pick.id._id).hasDom
                              if (hasDom) {
                                  return
                              }
                  
                              const _createHTMLClass = new operationDom("MainCenter", testDomHTML(f[0], pick.id._id))
                              _createHTMLClass.append()
                          }
                      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                  
                  
                      //??????
                      viewer.camera.flyTo({
                          //setView??????????????? flyTo// ??????????????????  ???????????????????????????????????? ????????????fly??????
                          destination: Cesium.Cartesian3.fromDegrees(
                              initPosition.lng,
                              initPosition.lat,
                              initPosition.height
                          ), //???????????????????????? ???????????????(????????????)
                          orientation: {
                              heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north) //??????????????????
                              pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //??????????????????
                              roll: 0.0, // default value
                          },
                          duration: 3, //3???????????????
                      });
                  }
                  `
      },
      {
        codeLanguage: "css",
        content: `.cesium-popup {
                      position: absolute;
                      left: 0;
                      top: 5px;
                      text-align: left;
                      display: none;
                  }
                  
                  .cesium-popup-background {
                      background: rgba(0, 0, 0, 0.6);
                      border-radius: 6px;
                  }
                  
                  .cesium-popup-content-wrapper {
                      text-align: center;
                      max-height: 600px;
                      overflow-y: auto;
                      box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
                      text-align: left;
                      border-radius: 3px;
                  }
                  
                  .cesium-popup-color {
                      color: white;
                  }
                  
                  .cesium-popup-content {
                      margin: 15px 10px 10px;
                      line-height: 1.4;
                      font-size: 13px;
                      max-width: 439px;
                      min-width: 50px;
                  }
                  
                  .cesium-popup-tip-container {
                      margin: 0 auto;
                      width: 40px;
                      height: 13px;
                      position: relative;
                      overflow: hidden;
                  }
                  
                  .cesium-popup-tip {
                      box-shadow: 0 3px 14px rgba(0, 0, 0, .4);
                      width: 17px;
                      height: 17px;
                      padding: 1px;
                      margin: -10px auto 0;
                      -webkit-transform: rotate(45deg);
                      transform: rotate(45deg);
                  }
                  
                  .cesium-popup-close-button {
                      position: absolute;
                      top: 0;
                      right: 0;
                      padding: 4px 4px 0 0;
                      text-align: center;
                      width: 18px;
                      height: 14px;
                      font: 16px/14px Tahoma, Verdana, sans-serif;
                      text-decoration: none;
                      font-weight: 700;
                      background: transparent;
                      z-index: 9999;
                      color: #fff !important;
                  }
                  
                  .cesium-popup-close-button:hover {
                      cursor: pointer;
                      color: #23527c;
                  }
                  
                  
                  .switch {
                      appearance: none;
                      -moz-appearance: button;
                      -webkit-appearance: none;
                  }
                  
                  .switch {
                      position: relative;
                      margin: 0;
                      width: 40PX;
                      height: 24PX;
                      border: 1PX solid #EBEBF9;
                      outline: 0;
                      border-radius: 16PX;
                      box-sizing: border-box;
                      background-color: #EBEBF9;
                      -webkit-transition: background-color 0.1s, border 0.1s;
                      transition: background-color 0.1s, border 0.1s;
                  }
                  
                  .switch:before {
                      content: " ";
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 38PX;
                      height: 22PX;
                      border-radius: 19PX;
                      background-color: #EBEBF9;
                      -webkit-transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
                      transition: -webkit-transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
                      transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
                  }
                  
                  .switch:after {
                      content: " ";
                      position: absolute;
                      top: 0;
                      left: 1px;
                      width: 22PX;
                      height: 22PX;
                      border-radius: 15PX;
                      background-color: #FFFFFF;
                      /*box-shadow: 0 1PX 3PX rgba(0, 0, 0, 0.4);*/
                      -webkit-transition: -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
                      transition: -webkit-transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
                      transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
                  }
                  
                  .switch:checked {
                      background: #00D287;
                      border: solid 1px #00D287;
                  }
                  
                  .switch:checked:before {
                      transform: scale(0);
                  }
                  
                  .switch:checked:after {
                      transform: translateX(15PX);
                  }`
      }
    ]
  }
]