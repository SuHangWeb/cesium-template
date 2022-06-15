
/**
 * 封装 光晕线
 */
class HaloLine {
    /**
     * 
     * @param {*} Cesium 
     * @param {*} viewer 
     * @param {*} geojson 数据
     * @param {*} color 线条颜色 （当前只是全局单色  可以在次根据 数据进行二次开发修改颜色）
     * 也可以新增线条 粗细值  目前暂未传递  可能后期 进行动态数据来读取
     */
    constructor(Cesium, viewer, geojson, color) {
        this.Cesium = Cesium
        this.viewer = viewer
        this.geojson = geojson
        this.color = color
    }

    init() {
        const _this = this;
        const Cesium = this.Cesium
        //设置贴地效果
        this.viewer.scene.globe.depthTestAgainstTerrain = false
        //clampToGround 贴地需要
        const promise = this.Cesium.GeoJsonDataSource.load(this.geojson, { clampToGround: true });
        promise.then((dataSource) => {
            this.viewer.dataSources.add(dataSource);
            const entities = dataSource.entities.values;
            entities.map((item, index) => {
                item.nameID = index
                item.polyline.width = 50
                item.polyline.material = new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.1,
                    // color: Cesium.Color.ORANGERED.withAlpha(0.9),
                    color: Cesium.Color.fromCssColorString(_this.color),
                })
                return item
            })
        });
        this.viewer.flyTo(promise);
    }
}
export default HaloLine