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

const path = "../js/cesium";

/**
 * 三方js库 Start
 */
ImportJs(`${path}/Tripartite/uuid-js/uuid.min.js`);//uuid
/**
 * 三方js库 End
 */

/**
 * 依赖 Start
 */
ImportJs(`${path}/Map/module/BaiDuImageryProvider.js`);//百度地图依赖
/**
 * 依赖 End
 */



// ImportJs(`${path}/Config.js`);//配置项
ImportJs(`${path}/Entity.js`);//实体创建
ImportJs(`${path}/Primitives.js`);//图元
ImportJs(`${path}/Utils.js`);//工具
ImportJs(`${path}/Transform.js`);//转换方法
ImportJs(`${path}/Canvas.js`);//原生canvas操作
ImportJs(`${path}/Map/index.js`);//地图
/**
 * Echarts图表封装以及3d模拟 
 * 依赖：
 * ./Utils.js 工具方法
 * ./Entity.js 实体创建
 * ./Tripartite/uuid-js/uuid.min.js 三方库 uuid
 */
ImportJs(`${path}/Echarts.js`);