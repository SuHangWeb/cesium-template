/**
 * 折线轨迹材质
 */
class PolylineTrailMaterialProperty {
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


    function MaterialFun() {
      this._definitionChanged = new Cesium.Event()
      this.colorSubscription = void 0
      this.speed = options.speed || 6 * Math.random()
      this.color = options.color || Cesium.Color.RED
      this.percent = options.percent || 0.1
      this.gradient = options.gradient || 0.01
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
      speed: Cesium.createPropertyDescriptor('speed'),
      gradient: Cesium.createPropertyDescriptor('gradient'),
      percent: Cesium.createPropertyDescriptor('percent')
    });

    const MaterialType = `PolylineTrail${parseInt(Math.random() * 1000)}`;
    MaterialFun.prototype.getType = function (time) {
      return MaterialType;
    };
    MaterialFun.prototype.getValue = function (time, result) {
      if (!Cesium.defined(result)) {
        result = {}
      }
      result.color = Cesium.Property.getValueOrClonedDefault(this.color, time, Cesium.Color.WHITE, result.color)
      result.speed = this.speed
      result.gradient = this.gradient
      result.percent = this.percent
      return result
    };

    MaterialFun.prototype.equals = function (t = { color, speed }) {
      return this === t || t instanceof PolylineTrailMaterialProperty && this.speed === t.speed && Cesium.Property.equals(this.color, t.color)
    }
    Cesium.Material.PolylineTrailSource = `
          uniform vec4 color;
          uniform float speed;
          uniform float percent;
          uniform float gradient;
          
          czm_material czm_getMaterial(czm_materialInput materialInput){
            czm_material material = czm_getDefaultMaterial(materialInput);
            vec2 st = materialInput.st;
            float t = fract(czm_frameNumber * speed / 1000.0);
            t *= (1.0 + percent);
            float alpha = smoothstep(t- percent, t, st.s) * step(-t, -st.s);
            alpha += gradient;
            material.diffuse = color.rgb;
            material.alpha = alpha;
            return material;
          }
          `

    Cesium.Material._materialCache.addMaterial(MaterialType, {
      fabric: {
        type: Cesium.Material.PolylineTrailType,
        uniforms: {
          color: new Cesium.Color(1, 0, 0, 0.5),
          transparent: true,
          speed: 0,
          gradient: 0.01,
          percent: 0.1
        },
        source: Cesium.Material.PolylineTrailSource
      },
      translucent: function (t) {
        return true
      }
    });

    Cesium[cesiumName] = MaterialFun;
    return MaterialFun
  }
}

// export default PolylineTrailMaterialProperty