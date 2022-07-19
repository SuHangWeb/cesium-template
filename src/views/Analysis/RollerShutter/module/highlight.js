export default [
  {
    codeLanguage: "VUE",
    relyOn: [

    ],
    code: [
      {
        codeLanguage: "html",
        content: `<template>
                      <div class="container" ref="container">
                        <div id="cesiumContainer"></div>
                        <div class="slider-view">
                          <div class="slider-line" ref="line"></div>
                          <div class="slider" ref="slider">
                            <i class="el-icon-s-operation icon"></i>
                          </div>
                        </div>
                      </div>
                    </template>`
      },
      {
        codeLanguage: "js",
        content: `export default {
                          data() {
                            return {
                              viewer: null,
                              handler: null,
                              moveActive: false,
                            };
                          },
                          mounted() {
                            this.init();
                          },
                          methods: {
                            init() {
                              const Cesium = this.cesium;
                              this.viewer = new Cesium.Viewer("cesiumContainer", {
                                shouldAnimate: true,
                                infoBox: false,
                                selectionIndicator: false,
                              });
                              // 添加图层
                              const layer1 = new Cesium.UrlTemplateImageryProvider({
                                url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
                                minimumLevel: 1,
                                maximumLevel: 18,
                              });
                              const layer2 = new Cesium.UrlTemplateImageryProvider({
                                url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
                                minimumLevel: 1,
                                maximumLevel: 18,
                              });
                        
                              const layers = this.viewer.imageryLayers;
                              const earthAtRight = layers.addImageryProvider(layer1);
                              const earthAtLeft = layers.addImageryProvider(layer2);
                        
                              earthAtLeft.splitDirection = Cesium.SplitDirection.LEFT;
                              earthAtRight.splitDirection = Cesium.SplitDirection.RIGHT;
                        
                              this.initRollerShutter();
                            },
                            /**
                             * 初始化卷帘地球位置
                             */
                            initRollerShutter() {
                              const Cesium = this.cesium;
                              if (this.handler) {
                                this.handler.destroy();
                                this.handler = null;
                              }
                              const slider = this.$refs.slider;
                              const container = this.$refs.container;
                              const line = this.$refs.line;
                              if (!slider && !container) return;
                              this.handler = new Cesium.ScreenSpaceEventHandler(slider);
                              this.viewer.scene.splitPosition =
                                slider.offsetLeft / container.offsetWidth;
                        
                              const move = (movement) => {
                                if (!this.moveActive) return;
                                const relativeOffset = movement.endPosition.x;
                                const splitPosition =
                                  (slider.offsetLeft + relativeOffset) / container?.offsetWidth;
                                slider.style.left = 100.0 * splitPosition + '%';
                                line.style.left = 100.0 * splitPosition + '%';
                        
                                this.viewer.scene.splitPosition = splitPosition; // 设置卷帘左右分区范围(0-1)之间
                              };
                        
                              this.handler.setInputAction(() => {
                                this.moveActive = true;
                              }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
                              this.handler.setInputAction(() => {
                                this.moveActive = true;
                              }, Cesium.ScreenSpaceEventType.PINCH_START);
                        
                              this.handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                              this.handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);
                        
                              this.handler.setInputAction(() => {
                                this.moveActive = false;
                              }, Cesium.ScreenSpaceEventType.LEFT_UP);
                              this.handler.setInputAction(() => {
                                this.moveActive = false;
                              }, Cesium.ScreenSpaceEventType.PINCH_END);
                            },
                          },
                        };`
      },
      {
        codeLanguage: "css",
        content: `$color: #409eff;
                    .container {
                      width: 100%;
                      height: 100%;
                      position: relative;
                    
                      #cesiumContainer {
                        width: 100%;
                        height: 100%;
                      }
                    
                      .slider-view {
                        .slider-line {
                          position: absolute;
                          top: 0;
                          left: 50%;
                          transform: translateX(-50%);
                          background-color: $color;
                          width: 5px;
                          height: 100%;
                          z-index: 2;
                          pointer-events: none;
                        }
                    
                        .slider {
                          width: 40px;
                          height: 40px;
                          border-radius: 50%;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                          background-color: $color;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          color: #fff;
                          z-index: 3;
                          font-size: 24px;
                    
                          &:hover {
                            cursor: ew-resize;
                          }
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
        label: "Utils.js",
        url: "JavaScript/cesium/Utils.js"
      },
    ],
    code: [
      {
        codeLanguage: "js",
        content: `function analysisRollerShutter() {
                          const _Utils = new Utils()
                          /**
                           * 创建 滑动dom
                           */
                          function create_slider_dom(id) {
                              let _div = window.document.createElement("div");
                              _div.id = id
                              _div.className = "slider-view"
                              let _html = '<div class="slider-line" id="analysis-line"></div><div class="slider" id="analysis-slider"><i class="iconfont icon-s-operation"></i></div>'
                              _div.innerHTML = _html
                              return _div
                          }
                          if (!_Utils.operationDom('has', "analysis-slider-view")) {
                              _Utils.operationDom("append", 'MainCenter', create_slider_dom("analysis-slider-view"))
                          }
                          let handler = null
                          let moveActive = false
                      
                          // 添加图层
                          const layer1 = new Cesium.UrlTemplateImageryProvider({
                              url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
                              minimumLevel: 1,
                              maximumLevel: 18,
                          });
                          const layer2 = new Cesium.UrlTemplateImageryProvider({
                              url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
                              minimumLevel: 1,
                              maximumLevel: 18,
                          });
                      
                          const layers = this.viewer.imageryLayers;
                          const earthAtRight = layers.addImageryProvider(layer1);
                          const earthAtLeft = layers.addImageryProvider(layer2);
                      
                          earthAtLeft.splitDirection = Cesium.SplitDirection.LEFT;
                          earthAtRight.splitDirection = Cesium.SplitDirection.RIGHT;
                      
                          const slider = document.getElementById('analysis-slider');
                          const container = document.getElementById('MainCenter');
                          const line = document.getElementById('analysis-line');
                          if (!slider && !container) return;
                          handler = new Cesium.ScreenSpaceEventHandler(slider);
                          viewer.scene.splitPosition = slider.offsetLeft / container.offsetWidth;
                      
                      
                          const move = (movement) => {
                              if (!moveActive) return;
                              const relativeOffset = movement.endPosition.x;
                              const splitPosition =
                                  (slider.offsetLeft + relativeOffset) / container?.offsetWidth;
                              slider.style.left = 100.0 * splitPosition + '%';
                              line.style.left =  100.0 * splitPosition + '%';
                      
                              viewer.scene.splitPosition = splitPosition; // 设置卷帘左右分区范围(0-1)之间
                          };
                      
                          handler.setInputAction(() => {
                              moveActive = true;
                          }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
                          handler.setInputAction(() => {
                              moveActive = true;
                          }, Cesium.ScreenSpaceEventType.PINCH_START);
                      
                          handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                          handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);
                      
                          handler.setInputAction(() => {
                              moveActive = false;
                          }, Cesium.ScreenSpaceEventType.LEFT_UP);
                          handler.setInputAction(() => {
                              moveActive = false;
                          }, Cesium.ScreenSpaceEventType.PINCH_END);
                      }
                      `
      },
      {
        codeLanguage: "css",
        content: `$color: #409eff;
                      .slider-view {
                          .slider-line {
                              position: absolute;
                              top: 0;
                              left: 50%;
                              transform: translateX(-50%);
                              background-color: $color;
                              width: 5px;
                              height: 100%;
                              z-index: 999;
                              pointer-events: none;
                            }
                        
                            .slider {
                              width: 40px;
                              height: 40px;
                              border-radius: 50%;
                              position: absolute;
                              top: 50%;
                              left: 50%;
                              transform: translate(-50%, -50%);
                              background-color: $color;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              color: #fff;
                              z-index: 9999;
                              font-size: 24px;
                        
                              &:hover {
                                cursor: ew-resize;
                              }
                            }
                      }`
      }
    ]
  },
]