/**
 * 墙推动扩散效果
 */
class WallGradientsMaterialProperty {
  constructor(Cesium, viewer) {
    this.Cesium = Cesium
    this.viewer = viewer
  }
  /**
  * CircleWaveMaterialProperty
  * @param {*} color  颜色
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

    const MaterialType = `WallGradients${parseInt(Math.random() * 1000)}`;
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
      result.image = Cesium.Material.WallGradientsImage
      return result
    };

    MaterialFun.prototype.equals = function (other = { _color }) {
      const reData =
        this === other ||
        (other instanceof WallGradientsMaterialProperty &&
          Cesium.Property.equals(this._color, other._color))
      return reData
    }

    Cesium.Material.WallGradientsImage = process.env.VUE_APP_PUBLIC_URL + '/cesium/effects/Materials/wallgradients.png'
    Cesium.Material.WallGradientsSource = `
      czm_material czm_getMaterial(czm_materialInput materialInput)
      {
          czm_material material = czm_getDefaultMaterial(materialInput);
          vec2 st = materialInput.st;
          vec4 colorImage = texture2D(image, vec2(fract(st.t - time), st.t));
          material.alpha = colorImage.a * color.a;
          material.diffuse =  2.5 * color.rgb  ;
          return material;
      }
      `

    Cesium.Material._materialCache.addMaterial(MaterialType, {
      fabric: {
        type: Cesium.Material.WallGradientsType,
        uniforms: {
          color: new Cesium.Color(0, 1, 0, 0.5),
          image: Cesium.Material.WallGradientsImage,
          time: 0,
        },
        source: Cesium.Material.WallGradientsSource,
      },
      translucent: function (t) {
        return true
      },
    });

    Cesium[cesiumName] = MaterialFun;
    return MaterialFun
  }
}

export default WallGradientsMaterialProperty