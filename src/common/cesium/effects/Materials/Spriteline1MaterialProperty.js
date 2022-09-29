/**
 * 精灵穿梭路 光效果
 */
class Spriteline1MaterialProperty {
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
            this.duration = options.duration
            this.image = options.image
            this._time = performance.now()
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
            duration: Cesium.createPropertyDescriptor('duration')
        });

        const MaterialType = `Spriteline1${parseInt(Math.random() * 1000)}`;
        MaterialFun.prototype.getType = function (time) {
            return MaterialType;
        };
        MaterialFun.prototype.getValue = function (time, result) {
            if (!Cesium.defined(result)) {
                result = {}
            }
            result.image = this.image
            result.time =
                ((performance.now() - this._time) % this.duration) / this.duration
            return result
        };

        MaterialFun.prototype.equals = function (e = { duration }) {
            return (
                this === e ||
                (e instanceof Spriteline1MaterialProperty && this.duration === e.duration)
            )
        }
        Cesium.Material.Spriteline1Source = `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                    czm_material material = czm_getDefaultMaterial(materialInput);
                    vec2 st = materialInput.st;
                    vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));
                    material.alpha = colorImage.a;
                    material.diffuse = colorImage.rgb * 1.5 ;
                    return material;
                    }
                    `

        Cesium.Material._materialCache.addMaterial(MaterialType, {
            fabric: {
                type: Cesium.Material.Spriteline1Type,
                uniforms: {
                    color: new Cesium.Color(1, 0, 0, 0.5),
                    image: '',
                    transparent: true,
                    time: 20,
                },
                source: Cesium.Material.Spriteline1Source,
            },
            translucent: function (material) {
                return true
            },
        });

        Cesium[cesiumName] = MaterialFun;
        return MaterialFun
    }
}

export default Spriteline1MaterialProperty