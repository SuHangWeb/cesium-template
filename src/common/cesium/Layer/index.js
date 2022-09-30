/*
 * 图层
 */
class Layer {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }
    // const mapImageData2 = [
    //     {
    //         "id": 3,
    //         "isShow": true,
    //         "name": "高德地图02",
    //         "type": "UrlTemplateImageryProvider",
    //         "classConfig": {
    //             "url": "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
    //         },
    //         "interfaceConfig": {},
    //         "offset": "0,0",
    //         "invertswitch": 0,
    //         "filterRGB": "#ffffff",
    //         "showswitch": 1,
    //         "weigh": 0,
    //         "createtime": 1624346908,
    //         "updatetime": 1647395260
    //     },
    //     {
    //         "id": 14,
    //         "isShow": true,
    //         "name": "高德地图01",
    //         "type": "UrlTemplateImageryProvider",
    //         "classConfig": {
    //             "url": "http://webst03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&style=7"
    //         },
    //         "interfaceConfig": {
    //             "saturation": 0,// 饱和度
    //             "brightness": 0.6,// 亮度
    //             "contrast": 1.8,// 对比度
    //             "hue": 1,// 色调
    //             "gamma": 0.3// 伽马校正
    //         },
    //         "offset": "0,0",// 偏移量
    //         "invertswitch": 1,// 是否反色 1 \ 0
    //         "filterRGB": "#4e70a6",// 滤镜颜色
    //         "showswitch": 1,
    //         "weigh": 0,
    //         "createtime": 1624326728,
    //         "updatetime": 1646979297
    //     }
    //   ]
    /**
     * 设置图层
     * @param {*} MapImagery 
     */
    setLayer(MapImagery) {
        const Cesium = this.Cesium
        const imageryLayers = this.viewer.imageryLayers;
        function setOneimageryProvider() {
            return new Cesium[MapImagery.type](MapImagery.classConfig)
        }
        imageryLayers.addImageryProvider(setOneimageryProvider(MapImagery));

        
    }
}
export default Layer