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
ImportJs(`${path}/Tripartite/layer/layer.js`);//layer

//layui start
//文档：http://www.uimaker.com/layui/doc/index.html
// createStyle(`${path}/Tripartite/layer/css/layer.css`)
//样式表在MainScene.html文件中引用了
ImportJs(`${path}/Tripartite/layui/layui.js`);
//layui end

ImportJs(`${path}/Tripartite/gcoord/dist/gcoord.js`);
ImportJs(`${path}/Tripartite/geojson/geojson.min.js`);
/**
 * 三方js库 End
 */

/**
 * 依赖 Start
 */
ImportJs(`${path}/Map/Baidu/module/BaiDuImageryProvider.js`);//百度地图依赖
createStyle(`${path}/iconfont/iconfont.css`)//矢量图标
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
/**
 * Echarts图表封装以及3d模拟 
 * 依赖：
 * ./Utils.js 工具方法
 * ./Entity.js 实体创建
 * ./Tripartite/uuid-js/uuid.min.js 三方库 uuid
 */
ImportJs(`${path}/Echarts.js`);