/**
 * 水波纹圈扩散效果
 */
class CircleWaveMaterialProperty2 {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }
    /**
    * CircleWaveMaterialProperty
    * @param {*} color  颜色
    * @param {*} duration 持续时间 毫秒
    * @param {*} count  波浪数量
    * @param {*} gradient 渐变曲率
    */
    create(options) {
        const Cesium = this.Cesium
        const viewer = this.viewer

        //new 函数的名称 必填
        const cesiumName = options?.cesiumName ? options.cesiumName : ""
        // const source = options?.source ? options.source : "";
        // const uniforms = options?.uniforms ? options.uniforms : "";

        /**
         * color 颜色
         * source 着色器
         */
        function MaterialFun() {
            this._definitionChanged = new Cesium.Event()
            this._color = undefined
            this._colorSubscription = undefined
            this.color = options.color
            this.duration = Cesium.defaultValue(options.duration, 1000)
            this.count = Cesium.defaultValue(options.count, 2)

            if (this.count <= 0) {
                this.count = 1
            }
            this.gradient = Cesium.defaultValue(options.gradient, 0.1)
            if (this.gradient === 0) {
                this.gradient = 0
            }
            if (this.gradient > 1) {
                this.gradient = 1
            }
            this._time = new Date().getTime()
        }

        Object.defineProperties(MaterialFun.prototype, {
            isConstant: {
                get: function () {
                    return false;
                }
            },
            definitionChanged: {
                get: function () {
                    return this._definitionChanged;
                }
            },
            color: Cesium.createPropertyDescriptor('color'),
            duration: Cesium.createPropertyDescriptor('duration'),
            count: Cesium.createPropertyDescriptor('count'),
        });

        const MaterialType = `CircleWaveMaterial${parseInt(Math.random() * 1000)}`;
        MaterialFun.prototype.getType = function (time) {
            return MaterialType;
        };
        MaterialFun.prototype.getValue = function (time, result) {
            if (!Cesium.defined(result)) {
                result = {};
            }
            result.color = Cesium.Property.getValueOrClonedDefault(
                this._color,
                time,
                Cesium.Color.WHITE,
                result.color
            )
            result.time =
                ((new Date().getTime() - this._time) % this.duration) / this.duration
            result.count = this.count
            result.gradient = 1 + 10 * (1 - this.gradient)
            return result
        };

        MaterialFun.prototype.equals = function (other) {
            return this === other || (other instanceof MaterialFun && Cesium.Property.equals(this._color, other._color))
        };
        Cesium.Material.CircleWaveSource = `
                                  czm_material czm_getMaterial(czm_materialInput materialInput) {
                                    czm_material material = czm_getDefaultMaterial(materialInput);
                                    material.diffuse = 1.5 * color.rgb;
                                    vec2 st = materialInput.st;
                                    vec3 str = materialInput.str;
                                    float dis = distance(st, vec2(0.5, 0.5));
                                    float per = fract(time);
                                    if (abs(str.z) > 0.001) {
                                      discard;
                                    }
                                    if (dis > 0.5) {
                                      discard;
                                    } else {
                                      float perDis = 0.5 / count;
                                      float disNum;
                                      float bl = .0;
                                      for (int i = 0; i <= 9; i++) {
                                        if (float(i) <= count) {
                                          disNum = perDis *float(i) - dis + per / count;
                                          if (disNum > 0.0) {
                                            if (disNum < perDis) {
                                              bl = 1.0 - disNum / perDis;
                                            } else if(disNum - perDis < perDis) {
                                              bl = 1.0 - abs(1.0 - disNum / perDis);
                                            }
                                            material.alpha = pow(bl, gradient);
                                          }
                                        }
                                      }
                                    }
                                    return material;
                                  }
                                  `

        Cesium.Material._materialCache.addMaterial(MaterialType, {
            fabric: {
                type: MaterialType,
                uniforms: {
                    color: new Cesium.Color(1, 0, 0, 1),
                    time: 1,
                    count: 1,
                    gradient: 0.1,
                },
                source: Cesium.Material.CircleWaveSource,
            },
            translucent: function (material) {
                return true
            },
        });

        Cesium[cesiumName] = MaterialFun;
        return MaterialFun
    }
}

// export default CircleWaveMaterialProperty