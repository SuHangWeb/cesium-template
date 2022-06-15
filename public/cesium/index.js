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

const path = ".";

ImportJs(`${path}/Canvas.js`);//原生canvas操作
// ImportJs(`${path}/Config.js`);//配置项
ImportJs(`${path}/Entity.js`);//实体创建
ImportJs(`${path}/Primitives.js`);//图元
ImportJs(`${path}/Transform.js`);//转换方法
ImportJs(`${path}/Utils.js`);//工具