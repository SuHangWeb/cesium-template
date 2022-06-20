/**
 * 加载外部js
 * @param {*} src js地址
 * @returns 
 * 使用方法
 * import loadJs from "@/common/loadJs.js";
 * loadJs(js地址).then(() => {加载成功，进行后续操作});
 */
function loadJs(src, async) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.type = "text/javascript";
        if (async) {
            script.async = "async";
        }
        script.src = src;
        document.body.appendChild(script);

        script.onload = () => {
            resolve();
        }
        script.onerror = () => {
            reject();
        }
    })
}

export default loadJs