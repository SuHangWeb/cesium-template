
/**
 * 界面 控件
 */
const control = {
    /**
     * msaaSamples  
     * MSAA 在 WebGL 2.0 才有
     *  1, 2, 4, 8, 默认 1, 越高效果越好, 也越吃性能 Cesium 1.92新增
     * 与 fxaa 差不太多
     * 区别
     * msaa 发生在管线结束前，准确的说是光栅化阶段对片元进行多重采样，输出到渲染缓冲，然后才绘制到屏幕上
     * fxaa 发生在管线结束后的后处理阶段，对渲染的结果进行图像算法处理
     */
    msaaSamples: 4, 
    geocoder: true, //是否显示地名查找控件
    homeButton: false, //是否显示初始化控件
    SceneModePicker: false, //是否显示投影方式控件
    selectionIndicator: false,
    baseLayerPicker: false, //是否显示图层选择控件
    navigationHelpButton: false, //是否显示帮助信息控件
    animation: false, // 是否显示动画控件
    // creditContainer: "credit",
    timeline: false, //是否显示时间线控件
    fullscreenButton: false,
    vrButton: false,
    infoBox: false, //是否显示点击要素之后显示的信息
    // requestRenderMode: true, //启用请求渲染模式
    scene3DOnly: true, //每个几何实例将只能以3D渲染以节省GPU内存
    sceneMode: 3, //初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode


    // terrainProvider: new Cesium.CesiumTerrainProvider({
    //   url: Cesium.IonResource.fromAssetId(1),
    //   requestVertexNormals: true, //用来提高光照效果
    //   requestWaterMask: true, //增加水面特效
    // }),
    // imageryProvider: esri,
}

export {
    control
}