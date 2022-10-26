/*
 * 图层
 */
// import Transform from "./../Transform"
// import { opt } from "./../Config"
class Layer {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }
    /**
     * 设置图层
     * @param {*} MapImagery 
     */
    setLayer(MapImagery) {
        const Cesium = this.Cesium

        // this.otherSettings(opt);

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

    /**
     * 创建白模
     * @param {*} url 
     */
    createWhiteMold(url) {
        const Cesium = this.Cesium
        return this.viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url,
                show: true,

                // 3dtiles姿态，包括位置，旋转角度，高度；也可以通过 update3dtilesMaxtrix 设置
                // modelMatrix: Cesium.Matrix4.fromArray([
                //   1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
                // ]),

                /** 参数设置 */
                shadows: 4,
                maximumScreenSpaceError: 1, // Temporary workaround for low memory mobile devices - Increase maximum error to 8.
                maximumNumberOfLoadedTiles: 1000, // Temporary workaround for low memory mobile devices - Decrease (disable) tile cache.

                /** 优化加载，提升流畅度 */
                skipLevelOfDetail: true,
                baseScreenSpaceError: 1024,
                maximumScreenSpaceError: 256, // 数值加大，能让最终成像变模糊
                skipScreenSpaceErrorFactor: 16,
                skipLevels: 1,
                immediatelyLoadDesiredLevelOfDetail: false,
                loadSiblings: true, // 如果为true则不会在已加载完概况房屋后，自动从中心开始超清化房屋
                cullWithChildrenBounds: true,
                cullRequestsWhileMoving: true,
                cullRequestsWhileMovingMultiplier: 10, // 值越小能够更快的剔除
                preloadWhenHidden: true,
                preferLeaves: true,
                maximumMemoryUsage: 128, // 内存分配变小有利于倾斜摄影数据回收，提升性能体验
                progressiveResolutionHeightFraction: 0.5, // 数值偏于0能够让初始加载变得模糊
                dynamicScreenSpaceErrorDensity: 0.1, // 数值加大，能让周边加载变快
                dynamicScreenSpaceErrorFactor: 1,
                dynamicScreenSpaceError: true, // 有了这个后，会在真正的全屏加载完之后才清晰化房屋
                backFaceCulling: false, //背面绘制

                /** 调试 */
                // debugShowBoundingVolume: true,
                // debugColorizeTiles: true,
                // debugShowUrl: true,
                // debugShowContentBoundingVolume: true,
                // debugShowViewerRequestVolume: true,
                // debugShowRenderingStatistics: true,
                // debugShowMemoryUsage: true,
            })
        )
    }

    /**
     * 设置白模颜色
     * @param {*} tileset 
     * @param {*} color 
     */
    Cesium3DTileStyle(tileset, color) {
        const Cesium = this.Cesium
        tileset.style = new Cesium.Cesium3DTileStyle({
            color: {
                conditions: [
                    ['true', `color('${color}')`]
                ],
                // show: "",
                meta: {
                    description: '',
                },
            }
        })
    }

    /**
     * 更改3dtiles姿态，包括位置，旋转角度，高度
     * @param {*} tileset 
     * @param {*} params 
     */
    update3dtilesMaxtrix(tileset, params) {
        const Cesium = this.Cesium
        if (!tileset.ready) {
            return
        }
        // 根据tileset的边界球体中心点的笛卡尔坐标得到经纬度坐标
        const cartographic = Cesium.Cartographic.fromCartesian(
            tileset.boundingSphere.center
        )
        // 根据经纬度和高度0，得到地面笛卡尔坐标
        const surface = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            cartographic.height
        )
        // 根据经纬度和需要的高度，得到偏移后的笛卡尔坐标
        const offset = Cesium.Cartesian3.fromRadians(
            cartographic.longitude + Cesium.Math.toRadians(params.offset_x), // 这里更改的是经纬度偏移
            cartographic.latitude + Cesium.Math.toRadians(params.offset_y),
            cartographic.height + params.offset_z // 程度的高度 需要偏移
        )
        // 计算坐标变换，得到新的笛卡尔坐标
        const translation = Cesium.Cartesian3.subtract(
            offset,
            surface,
            new Cesium.Cartesian3()
        )
        // 调整3dtiles位置
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
    }

    /**
     * 设置白模的打光效果
     * @param {*} tileset 
     * @param {*} params 
     */
    makeEffect(tileset, params) {
        const CurSourceShaders = []
        const _Transform = new Transform()
        // console.log(tileset, params)
        // 批处理可见的3D白模
        tileset.tileVisible.addEventListener((cesium3DTile) => {
            // 以下设置白模的打光效果
            const cesium3DTileCon = cesium3DTile.content
            const featuresLength = cesium3DTileCon.featuresLength
            const effect_color = _Transform.colorRgb1(params.effect_color)
            for (let i = 0; i < featuresLength; i += 2) {
                const _model = cesium3DTileCon.getFeature(i).content._model
                if (_model && _model._sourcePrograms && _model._rendererResources) {
                    Object.getOwnPropertyNames(_model._sourcePrograms).forEach(function (
                        i
                    ) {
                        const msp = _model._sourcePrograms[i]
                        // 备份着色器 代码
                        if (!CurSourceShaders[0]) {
                            CurSourceShaders[0] = _model._rendererResources.sourceShaders[msp.fragmentShader]
                        }
                        if (params.effectswitch !== 1) {
                            _model._rendererResources.sourceShaders[msp.fragmentShader] = CurSourceShaders[0]
                        } else {
                            _model._rendererResources.sourceShaders[msp.fragmentShader] = `
                                        varying vec3 v_positionEC;
                                        void main(void){
                                            vec4 position = czm_inverseModelView * vec4(v_positionEC,1); // 位置
                                            float glowRange = ${params.height.toFixed(2)}; // 光环的移动范围(高度)
                                            gl_FragColor = vec4(${effect_color[0]}, ${effect_color[1]}, ${effect_color[2]}, 1.0); // 颜色
                                            // 底楼 亮度太暗了，那么把20%以内的底楼，都不再变暗
                                            if((position.z / 100.0) < 0.2) {
                                            gl_FragColor *= vec4(vec3(position.z / 100.0 * 2.0), 1.0);
                                            }else{
                                            gl_FragColor *= vec4(vec3(position.z / 100.0), 1.0); // 渐变
                                            }
                                            // 动态光环
                                            float time = fract(czm_frameNumber / 360.0);
                                            time = abs(time - 0.5) * 2.0;
                                            float diff = step(0.005, abs( clamp(position.z / glowRange, 0.0, 1.0) - time));
                                            gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - diff);
                                        }
                                        `
                        }
                    })
                    _model._shouldRegenerateShaders = params.effectswitch === 1 || false 
                }
            }
        })
    }

    /**
     * Cesium 其它设置
     * @param {*} opt 
     */
    otherSettings(opt) {
        const Cesium = this.Cesium
        // 去除商标、logo
        this.viewer._cesiumWidget._creditContainer.style.display = "none";

        // 设置场景背景色透明 只有在没有天空框时才可见，即，场景#skyBox未定义。
        this.viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT;

        // 设置球体globe的颜色，在没有可用图像时，获取或设置全局的颜色，默认值：rgba(27, 126, 167, 1)
        this.viewer.scene.globe.baseColor = Cesium.defined(opt) && opt.globeBaseColor &&
            Cesium.defined(opt.globeBaseColor.r) &&
            Cesium.defined(opt.globeBaseColor.g) &&
            Cesium.defined(opt.globeBaseColor.b) &&
            Cesium.defined(opt.globeBaseColor.a) ? new Cesium.Color(
                opt.globeBaseColor.r / 255,
                opt.globeBaseColor.g / 255,
                opt.globeBaseColor.b / 255,
                opt.globeBaseColor.a
            ) : new Cesium.Color(
                9 / 255,
                25 / 255,
                51 / 255,
                1
            );

        // 关闭地下模式
        this.viewer.scene.undergroundMode = Cesium.defined(opt) && opt.undergroundMode === undefined ? false : opt.undergroundMode;

        // 鼠标滚轮放大的步长参数
        this.viewer.scene.screenSpaceCameraController._zoomFactor = Cesium.defined(opt) && opt._zoomFactor === undefined ? 5.0 : opt._zoomFactor;

        // 开启深度检测(在深度检测不开启时，拾取的坐标会不准确)
        this.viewer.scene.globe.depthTestAgainstTerrain = true;

        // 是否显示地球globe
        this.viewer.scene.globe.show = Cesium.defined(opt) && opt.isGlobe === undefined ? true : opt.isGlobe;

        // 是否开启抗锯齿
        if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
            // 判断是否支持图像渲染像素化处理
            // viewer.resolutionScale = window.devicePixelRatio;
            var vtxf_dpr = window.devicePixelRatio;
            // 适度降低分辨率
            while (vtxf_dpr >= 2.0) {
                vtxf_dpr /= 2.0;
            }
            this.viewer.resolutionScale = vtxf_dpr;
        }
        this.viewer.scene.fxaa = true;
        this.viewer.scene.postProcessStages.fxaa.enabled = true;

        // 解决Cesium显示画面模糊的问题(性能优化，适度降低分辨率)
        this.viewer._cesiumWidget._supportsImageRenderingPixelated =
            Cesium.FeatureDetection.supportsImageRenderingPixelated();
        this.viewer._cesiumWidget._forceResize = true;
        if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
            var vtxf_dpr = window.devicePixelRatio;
            // 适度降低分辨率
            while (vtxf_dpr >= 2.0) {
                vtxf_dpr /= 2.0;
            }
            this.viewer.resolutionScale = vtxf_dpr;
        }
    }
}
// export default Layer