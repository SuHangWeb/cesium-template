/**
 * 引入js
 * @param {*} url 引用文件的路径
 */
const ImportJs = (url) => {
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * 创建css样式表
 * @param {*} url 
 */
const createStyle = (url) => {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);

}

const path = "../landstar/js/LS-cesium-common";

/**
 * 三方js库 Start
 */
ImportJs(`${path}/Tripartite/uuid-js/uuid.min.js`);//uuid
ImportJs(`${path}/Tripartite/bignumber/bignumber.js`);//bignumber
ImportJs(`${path}/Tripartite/layer/layer.js`);//layer
ImportJs(`${path}/Tripartite/mock/mock-min.js`);//layer

//layui start
//文档：http://www.uimaker.com/layui/doc/index.html
// createStyle(`${path}/Tripartite/layer/css/layer.css`)
//样式表在MainScene.html文件中引用了
ImportJs(`${path}/Tripartite/layui/layui.js`);
//layui end

ImportJs(`${path}/Tripartite/gcoord/dist/gcoord.js`);
ImportJs(`${path}/Tripartite/geojson/geojson.min.js`);
// createStyle(`${path}/Tripartite/cesium-navigation/cesium-navigation.css`);
// ImportJs(`${path}/Tripartite/cesium-navigation/CesiumNavigation.umd.js`);

// ImportJs(`${path}/Tripartite/turf/turf.min.js`);

// ImportJs(`${path}/Tripartite/dat.gui/dat.gui.min.js`);
ImportJs(`${path}/Tripartite/heatmap/heatmap.min.js`);

// ImportJs(`${path}/Tripartite/echarts/echarts.min.js`);
/**
 * 三方js库 End
 */

/**
 * 依赖 Start
 */
ImportJs(`${path}/Map/Baidu/module/BaiDuImageryProvider.js`);//百度地图依赖
// createStyle(`${path}/iconfont/iconfont.css`)//矢量图标
ImportJs(`${path}/EntityUtils/PolylineVolume.js`);//多线段柱体形态
ImportJs(`${path}/Materials/lineFlowMaterialProperty.js`);//抛物线材质着色器
ImportJs(`${path}/EntityUtils/Parabola.js`);//抛物线
/**
 * 依赖 End
 */


// ImportJs(`${path}/Config.js`);//配置项

ImportJs(`${path}/Utils.js`);//工具
ImportJs(`${path}/Entity.js`);//实体创建
ImportJs(`${path}/Primitives.js`);//图元
ImportJs(`${path}/Transform.js`);//转换方法
ImportJs(`${path}/Materials/index.js`);//材质
ImportJs(`${path}/Materials/color.js`);//颜色材质
ImportJs(`${path}/Canvas.js`);//原生canvas操作
ImportJs(`${path}/Map/Gaode/index.js`);//高德api
ImportJs(`${path}/Map/index.js`);//地图
ImportJs(`${path}/Scene/index.js`);//场景集合
ImportJs(`${path}/Scene/Fog.js`);// 雾
ImportJs(`${path}/Scene/Rain.js`);//雨
ImportJs(`${path}/Scene/Skyline.js`);//天际线
ImportJs(`${path}/Scene/Snow.js`);//雪
ImportJs(`${path}/Scene/Rainbow.js`);//彩虹
ImportJs(`${path}/rightClickMenu.js`);//右键菜单
ImportJs(`${path}/Draw/straightArrow.js`);//直线箭头
ImportJs(`${path}/Draw/index.js`);//绘制
ImportJs(`${path}/Measure/common.js`);//测量继承
setTimeout(() => {
    ImportJs(`${path}/Measure/area.js`);//测量面积
    ImportJs(`${path}/Measure/distance.js`);//测量距离
    ImportJs(`${path}/Measure/index.js`);//测量
}, 500)

ImportJs(`${path}/Camera/AroundPoint.js`);//相机绕点旋转
ImportJs(`${path}/Camera/AroundView.js`);//相机绕地旋转

/**
 * Echarts图表封装以及3d模拟 
 * 依赖：
 * ./Utils.js 工具方法
 * ./Entity.js 实体创建
 * ./Tripartite/uuid-js/uuid.min.js 三方库 uuid
 */
ImportJs(`${path}/Echarts.js`);


/**
 * 智慧城市
 */
ImportJs(`${path}/effects/Effect.js`);

setTimeout(() => {
    ImportJs(`${path}/effects/Materials/CircleWaveMaterialProperty.js`);
    ImportJs(`${path}/effects/Materials/EllipsoidFadeMaterialProperty.js`);
    ImportJs(`${path}/effects/Materials/HexagonSpreadMaterialProperty.js`);
    ImportJs(`${path}/effects/Materials/PolylineTrailMaterialProperty.js`);
    ImportJs(`${path}/effects/Materials/ScanlineMaterialProperty.js`);
    ImportJs(`${path}/effects/Materials/Spriteline1MaterialProperty.js`);
    ImportJs(`${path}/effects/Materials/WallGradientsMaterialProperty.js`);

    ImportJs(`${path}/effects/CircleScan.js`);
    ImportJs(`${path}/effects/CircleDiffusion.js`);
    ImportJs(`${path}/effects/CircleWave.js`);
    ImportJs(`${path}/effects/WaterRipple.js`);
    ImportJs(`${path}/effects/HexagonSpread.js`);
    ImportJs(`${path}/effects/Scanline.js`);
    ImportJs(`${path}/effects/SpreadWall.js`);
    ImportJs(`${path}/effects/EllipsoidFade.js`);
    ImportJs(`${path}/effects/RoadNetwork.js`);
    ImportJs(`${path}/Layer/index.js`);
}, 500)
