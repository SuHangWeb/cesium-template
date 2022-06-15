/**
 * 材质
 */
class material {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }
    /**
     * 创建多段线
     * @param {*} params 
     */
    createPolylineTrailLink(params) {
        console.log(this.createPolylineTrailLink)
        const _this = this
        const Cesium = this.Cesium
        Object.defineProperties(this.createPolylineTrailLink.prototype, {
            isConstant: {
                get: () => {
                    return false;
                }
            },
            definitionChanged: {
                get: () => {
                    return new Cesium.Event();
                }
            },
            color: Cesium.createPropertyDescriptor('color')
        });
        this.createPolylineTrailLink.prototype.getType = (time) => {
            return Cesium.Material.PolylineTrailLinkType;
        }

        this.createPolylineTrailLink.prototype.getValue = (time, result) => {
            if (!Cesium.defined(result)) {
                result = {};
            }
            result.color = Cesium.Property.getValueOrClonedDefault(params.color, time, Cesium.Color.WHITE, result.color);
            result.image = Cesium.Material.PolylineTrailLinkImage;
            result.time = (((new Date()).getTime() - params.time) % params.duration) / params.duration;
            return result;
        }
        this.createPolylineTrailLink.prototype.equals = (other) => {
            return this === other || (other instanceof _this.createPolylineTrailLink && Property.equals(params.color, other._color))
        };
        Cesium.createPolylineTrailLink = this.createPolylineTrailLink;
        Cesium.Material.PolylineTrailLinkType = params.type || 'PolylineTrailLink';
        Cesium.Material.PolylineTrailLinkImage = params.image || "";//图片
        Cesium.Material.PolylineTrailLinkSource = params.source || "";//着色器
        Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
            fabric: {
                type: Cesium.Material.PolylineTrailLinkType,
                uniforms: {
                    color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
                    image: Cesium.Material.PolylineTrailLinkImage,
                    time: 0
                },
                source: Cesium.Material.PolylineTrailLinkSource
            },
            translucent: (material) => {
                return true;
            }
        })
    }
}

export default material