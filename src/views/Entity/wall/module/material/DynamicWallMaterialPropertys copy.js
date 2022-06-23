

class Material {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }

    /**
     * 波纹材质
     */
    DynamicWallMaterialPropertys(options) {
        const Cesium = this.Cesium
        const viewer = this.viewer
        /**
         * color 颜色
         * duration 持续时间 毫秒
         * image 贴图地址
         * source 着色器
         */
        function MaterialFun() {
            this._definitionChanged = new Cesium.Event()
            this._color = undefined;
            this._colorSubscription = undefined;
            this.color = options?.color ? options.color : Cesium.Color.BLUE;
            this.duration = options?.duration ? options.duration : 1000;
            this.image = options?.image ? options.image : "";
            this._time = (new Date()).getTime();
            this.source = options?.source ? options.source : "";
        }

        Object.defineProperties(MaterialFun.prototype, {
            isConstant: {
                get: () => {
                    return false;
                }
            },
            definitionChanged: {
                get: () => {
                    return this._definitionChanged;
                }
            },
            color: Cesium.createPropertyDescriptor('color')
        });
        const MaterialType = `Material${parseInt(Math.random() * 1000)}`;
        MaterialFun.prototype.getType = (time) => {
            return MaterialType;
        };
        MaterialFun.prototype.getValue = (time, result) => {
            if (!Cesium.defined(result)) {
                result = {};
            }
            result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
            result.image = this.image;
            if (this.duration) {
                result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
            }
            viewer.scene.requestRender();
            return result;
        };

        MaterialFun.prototype.equals = (other) => {
            return this === other ||
                (other instanceof MaterialFun
                    && Cesium.Property.equals(this._color, other._color))
        };

        Cesium.Material._materialCache.addMaterial(MaterialType, {
            fabric: {
                type: MaterialType,
                uniforms: {
                    color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
                    image: Cesium.Material.DefaultImageId,
                    time: -20
                },
                source: this.source
            },
            translucent: (material) => {
                return true;
            }
        });
        Cesium.MaterialFun = MaterialFun;
    }

}