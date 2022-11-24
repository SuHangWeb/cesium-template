/**
 * 抛物线
 *  const _Parabola = new Parabola(Cesium, viewer)
    SmartCity.data.fountainLine = _Parabola.create(from, to, 5)
 */
class Parabola {
    constructor(Cesium, viewer, speed = 100) {
        this.Cesium = Cesium
        this.viewer = viewer
        this.speed = speed //流线速度
    }
    /**
     * 创建
     * @param {Object} center 中心点坐标
     * @param {Array=>Object} data 抛物线二维数组坐标
     * @param {Number} num 每条线上的飞线数量
     */
    create(center, data, num) {
        const _this = this
        const Cesium = this.Cesium
        let _entity_arr = []
        data.forEach(item => {
            let _siglePositions = this.createParabola([center.lng, center.lat], [item.lng, item.lat], item.height || 100);
            // let _siglePositions = this.createParabola(center, item, 5000);
            // 创建飞线
            for (let i = 0; i < num; i++) {
                const _entity = this.viewer.entities.add({
                    polyline: {
                        positions: _siglePositions,
                        material: new Cesium.LineFlowMaterialProperty({
                            color: Cesium.Color.fromCssColorString(item.color),
                            speed: _this.speed * Math.random(),
                            percent: 0.1,
                            gradient: 0.01
                        })
                    },
                });
                _entity_arr.push(_entity)
            }
            // 创建轨迹线
            const _polyline = this.viewer.entities.add({
                polyline: {
                    positions: _siglePositions,
                    material: new Cesium.Color(1.0, 1.0, 1.0, 0.2),
                    // material: Cesium.Color.fromCssColorString(item.color),
                }
            })
            _entity_arr.push(_polyline)
        });
        return _entity_arr
    }
    /**
     * 抛物线构造函数
     * @param {*} startPosition 
     * @param {*} endPosition 
     * @param {*} height 
     * @param {*} count 
     */
    createParabola(startPosition, endPosition, height = 100, count = 50) {
        const Cesium = this.Cesium
        //方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
        let result = []
        height = Math.max(+height, 100)
        count = Math.max(+count, 50)
        let diffLon = Math.abs(startPosition[0] - endPosition[0])
        let diffLat = Math.abs(startPosition[1] - endPosition[1])
        let L = Math.max(diffLon, diffLat)
        let dlt = L / count
        if (diffLon > diffLat) {
            //base on lon
            let delLat = (endPosition[1] - startPosition[1]) / count
            if (startPosition[0] - endPosition[0] > 0) {
                dlt = -dlt
            }
            for (let i = 0; i < count; i++) {
                let h =
                    height -
                    (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * height) /
                    Math.pow(L, 2)
                let lon = startPosition[0] + dlt * i
                let lat = startPosition[1] + delLat * i
                let point = new Cesium.Cartesian3.fromDegrees(lon, lat, h);
                result.push(point);
            }
        } else {
            //base on lat
            let delLon = (endPosition[0] - startPosition[0]) / count
            if (startPosition[1] - endPosition[1] > 0) {
                dlt = -dlt
            }
            for (let i = 0; i < count; i++) {
                let h =
                    height -
                    (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * height) /
                    Math.pow(L, 2)
                let lon = startPosition[0] + delLon * i
                let lat = startPosition[1] + dlt * i
                let point = new Cesium.Cartesian3.fromDegrees(lon, lat, h);
                result.push(point);
            }
        }
        return result
    }
}