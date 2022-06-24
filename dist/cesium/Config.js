
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
    animation: false, //是否建立动画小器件，左下角仪表
    baseLayerPicker: false, //是否显示图层选择器
    fullscreenButton: false, //是否显示全屏按钮
    geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    homeButton: false, //是否显示Home按钮
    infoBox: false, //是否显示信息框
    sceneModePicker: false, //是否显示3D/2D选择器
    selectionIndicator: false, //是否显示选取指示器组件
    timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
    scene3DOnly: true, //若是设置为true，则全部几何图形以3D模式绘制以节约GPU资源
    vrButton: false,
    clock: new Cesium.Clock(), //用于控制当前时间的时钟对象
    selectedImageryProviderViewModel: undefined, //当前图像图层的显示模型，仅baseLayerPicker设为true有意义
    imageryProviderViewModels: Cesium.createDefaultImageryProviderViewModels(), //可供BaseLayerPicker选择的图像图层ProviderViewModel数组
    selectedTerrainProviderViewModel: undefined, //当前地形图层的显示模型，仅baseLayerPicker设为true有意义
    terrainProviderViewModels: Cesium.createDefaultTerrainProviderViewModels(), //可供BaseLayerPicker选择的地形图层ProviderViewModel数组
    imageryProvider: new Cesium.OpenStreetMapImageryProvider({
        credit: '',
        url: '//192.168.0.89:5539/planet-satellite/'
    }), //图像图层提供者，仅baseLayerPicker设为false有意义
    // terrainProvider: new Cesium.CesiumTerrainProvider({
    //   url: Cesium.IonResource.fromAssetId(1),
    //   requestVertexNormals: true, //用来提高光照效果
    //   requestWaterMask: true, //增加水面特效
    // }),
    // imageryProvider: esri,
    terrainProvider: new Cesium.EllipsoidTerrainProvider(), //地形图层提供者，仅baseLayerPicker设为false有意义
    skyBox: new Cesium.SkyBox({
        sources: {
            positiveX: 'Cesium-1.7.1/Skybox/px.jpg',
            negativeX: 'Cesium-1.7.1/Skybox/mx.jpg',
            positiveY: 'Cesium-1.7.1/Skybox/py.jpg',
            negativeY: 'Cesium-1.7.1/Skybox/my.jpg',
            positiveZ: 'Cesium-1.7.1/Skybox/pz.jpg',
            negativeZ: 'Cesium-1.7.1/Skybox/mz.jpg'
        }
    }), //用于渲染星空的SkyBox对象
    fullscreenElement: document.body, //全屏时渲染的HTML元素,
    useDefaultRenderLoop: true, //若是须要控制渲染循环，则设为true
    targetFrameRate: undefined, //使用默认render loop时的帧率
    showRenderLoopErrors: false, //若是设为true，将在一个HTML面板中显示错误信息
    automaticallyTrackDataSourceClocks: true, //自动追踪最近添加的数据源的时钟设置
    contextOptions: undefined, //传递给Scene对象的上下文参数（scene.options）
    sceneMode: Cesium.SceneMode.SCENE3D, //初始场景模式   1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
    mapProjection: new Cesium.WebMercatorProjection(), //地图投影体系
    dataSources: new Cesium.DataSourceCollection()
    //须要进行可视化的数据源的集合
}

// var scene = viewer.scene ;
// var canvas = viewer.canvas ;
// var clock = viewer.clock ;
// var camera = viewer.scene.camera ;
// var entities = viewer.entities ;

export {
    control
}