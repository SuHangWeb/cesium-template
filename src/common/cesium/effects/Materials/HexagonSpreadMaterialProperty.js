/**
 * 六边形扩散效果
 */
class HexagonSpreadMaterialProperty {
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

        const MaterialType = `HexagonSpreadMaterial${parseInt(Math.random() * 1000)}`;
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
            result.image = Cesium.Material.HexagonSpreadMaterialImage
            return result
        };

        MaterialFun.prototype.equals = function (other) {
            return this === other || (other instanceof MaterialFun && Cesium.Property.equals(this._color, other._color))
        };
        Cesium.Material.HexagonSpreadMaterialImage = process.env.VUE_APP_PUBLIC_URL + '/cesium/effects/Materials/hexagon.png'
        Cesium.Material.HexagonSpreadSource = `
        czm_material czm_getMaterial(czm_materialInput materialInput)
        {
             czm_material material = czm_getDefaultMaterial(materialInput);
             vec2 st = materialInput.st;
             vec4 colorImage = texture2D(image,  vec2(st));
             material.alpha = colorImage.a * color.a * 0.5;
             material.diffuse =  1.8 * color.rgb  ;
             return material;
         }
         `

        Cesium.Material._materialCache.addMaterial(MaterialType, {
            fabric: {
                type: Cesium.Material.HexagonSpreadMaterialType,
                uniforms: {
                    color: new Cesium.Color(1, 0, 0, 0.5),
                    image: Cesium.Material.HexagonSpreadMaterialImage,
                },
                source: Cesium.Material.HexagonSpreadSource,
            },
            translucent: function (material) {
                return true
            },
        });

        Cesium[cesiumName] = MaterialFun;
        return MaterialFun
    }
}

export default HexagonSpreadMaterialProperty