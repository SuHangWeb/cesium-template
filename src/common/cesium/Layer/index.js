/*
 * 图层
 */
import Transform from "./../Transform"
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

        const _Transform = new Transform()
        const filterRGB = _Transform.colorRgb(MapImagery.filterRGB)
        imageryLayers.filterRGB = filterRGB
        imageryLayers.invertColor = MapImagery.invertswitch

        // 设置 offset 偏移量
        const offset = MapImagery.offset.split(',');
        if (offset.length === 2) {
            try {
                const oxy = [
                    parseFloat(offset[0]),
                    parseFloat(offset[1]),
                ];
                setTimeout(() => {
                    let i = imageryLayers.imageryProvider
                    if (!i) {
                        return false;
                    }
                    let _rectangleNortheastInMeters = i.tilingScheme._rectangleNortheastInMeters;
                    _rectangleNortheastInMeters.x += oxy[0];
                    _rectangleNortheastInMeters.y += oxy[1];
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        }

        // 更改cesium的着色器代码 关于滤镜和反色的 [在不更改cesium源文件的情况下]
        this.changeImageryProviderColors(imageryLayers);
        // 显隐
        this.isShowImagery(MapImagery.isShow, imageryLayers);

    }

    /**
     * 更改 cesium 着色的方法
     * @param {*} baseLayer 
     */
    changeImageryProviderColors(baseLayer) {
        // 更改底图的着色器 代码
        const baseFragmentShaderSource =
            this.viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources
        for (let i = 0; i < baseFragmentShaderSource.length; i++) {
            const oneSource = baseFragmentShaderSource[i]
            // 格式必须一致 不能多有空格 且保持版本一致性
            const strS = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
            let strT = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
            if (baseLayer.invertColor) {
                strT += `
                        color.r = 1.0 - color.r;
                        color.g = 1.0 - color.g;
                        color.b = 1.0 - color.b;
                        `
                strT += `
                        color.r = color.r * ${baseLayer.filterRGB[0]}.0/255.0;
                        color.g = color.g * ${baseLayer.filterRGB[1]}.0/255.0;
                        color.b = color.b * ${baseLayer.filterRGB[2]}.0/255.0;
                        `
            }

            if (oneSource.indexOf(strS) !== -1) {
                baseFragmentShaderSource[i] = baseFragmentShaderSource[i].replace(
                    strS,
                    strT
                )
            }
        }
    }

    /**
     * 显示或者隐藏Imagery
     * @param {*} isShow 
     * @param {*} imagery 
     */
    isShowImagery(isShow, imagery) {
        imagery.show = isShow;
    }
}
export default Layer