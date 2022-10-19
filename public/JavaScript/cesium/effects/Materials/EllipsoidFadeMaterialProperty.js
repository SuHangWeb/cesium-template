/**
 * 流动纹理线
 * EllipsoidFadeMaterialProperty扩散点材质类 不会覆盖在白膜上
 */
class EllipsoidFadeMaterialProperty {
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

    /**
     * color 颜色
     * source 着色器
     */
    function MaterialFun() {
      this._definitionChanged = new Cesium.Event()
      this._color = undefined
      this._colorSubscription = undefined
      this.color = options.color
      this.duration = options.duration
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
    });

    const MaterialType = `EllipsoidFadeMaterialProperty${parseInt(Math.random() * 1000)}`;
    MaterialFun.prototype.getType = function (time) {
      return MaterialType;
    };
    MaterialFun.prototype.getValue = function (time, result) {
      if (!Cesium.defined(result)) {
        result = {}
      }
      result.color = Cesium.Property.getValueOrClonedDefault(
        this._color,
        time,
        Cesium.Color.WHITE,
        result.color
      )
      result.time =
        ((new Date().getTime() - this._time) % this.duration) / this.duration
      return result
    };

    MaterialFun.prototype.equals = function (other = { _color }) {
      const reData =
        this === other ||
        (other instanceof EllipsoidFadeMaterialProperty &&
          Cesium.Property.equals(this._color, other._color))
      return reData
    }
    Cesium.Material.EllipsoidFadeSource = `
          czm_material czm_getMaterial(czm_materialInput materialInput) {
            czm_material material = czm_getDefaultMaterial(materialInput);
            
            material.diffuse = 1.5 * color.rgb;
            vec2 st = materialInput.st;
            float dis = distance(st, vec2(0.5, 0.5));
            float bl = .0;
            float offset = 0.42;
            if( dis > 0.5) {
              material.alpha = 0.0;
              discard;
            }
            if( dis > offset) {
              bl = color.a * 1.0 / (0.5 - offset) * (dis - offset);
              material.alpha =  pow(bl, 3.0);
            } else {
              material.alpha = 0.0;
              discard;
            }
            return material;
          }
          `

    Cesium.Material._materialCache.addMaterial(MaterialType, {
      fabric: {
        type: Cesium.Material.EllipsoidFadeType,
        uniforms: {
          color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
          time: 0
        },
        source: Cesium.Material.EllipsoidFadeSource,
      },
      translucent: function (material) {
        return true
      },
    });

    Cesium[cesiumName] = MaterialFun;
    return MaterialFun
  }
}

// export default EllipsoidFadeMaterialProperty