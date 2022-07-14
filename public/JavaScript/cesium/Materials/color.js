/**
 * 颜色材质
 */
class colorMaterial {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }
    /**
     * 创建材质
     * @param {Object} options 参数说明：
     * color 颜色 选填 默认： Cesium.Color.BLUE
     * source 着色器 必填
     * uniforms 参数变量 必填
     * cesiumName 函数名称 必填
     * @returns 材质函数
     */
    create(options) {
        const Cesium = this.Cesium
        const viewer = this.viewer
        //new 函数的名称 必填
        const cesiumName = options?.cesiumName ? options.cesiumName : ""
        const source = options?.source ? options.source : "";
        const uniforms = options?.uniforms ? options.uniforms : "";
        /**
         * color 颜色
         * source 着色器
         */
        function MaterialFun() {
            this._definitionChanged = new Cesium.Event()
            this._color = undefined;
            this.color = options?.color ? options.color : Cesium.Color.BLUE;
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
            color: Cesium.createPropertyDescriptor('color')
        });
        const MaterialType = `colorMaterial${parseInt(Math.random() * 1000)}`;
        MaterialFun.prototype.getType = function (time) {
            return MaterialType;
        };
        MaterialFun.prototype.getValue = function (time, result) {
            if (!Cesium.defined(result)) {
                result = {};
            }
            result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
            viewer.scene.requestRender();
            return result;
        };

        MaterialFun.prototype.equals = function (other) {
            return this === other || (other instanceof MaterialFun && Cesium.Property.equals(this._color, other._color))
        };


        Cesium.Material._materialCache.addMaterial(MaterialType, {
            fabric: {
                type: MaterialType,
                uniforms,
                source
            },
            translucent: function (material) {
                return true;
            }
        });

        Cesium[cesiumName] = MaterialFun;
        return MaterialFun
    }
}

// export default colorMaterial