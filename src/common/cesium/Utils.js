/**
 * 工具
 */
class Utils {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }

    /**
     * 获取随机十六进制颜色
     */
    get getRandomColor() {
        let colourstr = "#"
        let coloruarr = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        for (let p = 0; p < 6; p++) {
            let n = Math.floor(Math.random() * coloruarr.length + 1) - 1;
            colourstr += coloruarr[n];
        }
        return colourstr;
    }

    /**
     * 操作dom
     * @param {*} type 
     * type：
     * append/插入 需要传递 NodeId/节点id（相当于父节点 插入到当前节点中） 和 appendChildDom/要插入的元素
     * remove/删除 需要传递 NodeId/节点id
     * has/查询是否存在当前id 需要传递 NodeId/节点id  存在回调
     */
    operationDom(type, NodeId, Dom) {
        if (type === "append") {
            document.getElementById(NodeId).appendChild(Dom)
        }
        if (type === "remove") {
            document.getElementById(NodeId).remove()
        }
        if (type === "has") {
            return document.getElementById(NodeId)
        }
    }

    /**
     * @param {Function} fn 目标函数
     * @param {Number} time 延迟执行毫秒数
     * @param {Boolean} immediate true - 立即执行 false - 延迟执行
     * @description 防抖函数
     */
    debounce(fn, time = 1000, immediate = true) {
        let timer
        return function () {
            const that = this
            const args = arguments

            if (timer) clearTimeout(timer)
            if (immediate) {
                const callNow = !timer
                timer = setTimeout(() => {
                    timer = null
                }, time)
                if (callNow) {
                    fn.apply(that, args)
                }
            } else {
                timer = setTimeout(() => {
                    fn.apply
                }, time)
            }
        }

    }

    /**
     * @param {Function} fn 目标函数
     * @param {Number} time 延迟执行毫秒数
     * @param {Boolean} type 1-立即执行，2-不立即执行
     * @description 节流函数
     */
    throttle(fn, time, type) {
        let previous = 0
        let timeout
        return function () {
            let that = this
            let args = arguments
            if (type === 1) {
                let now = Date.now()

                if (now - previous > time) {
                    fn.apply(that, args)
                    previous = now
                }
            } else if (type === 2) {
                if (!timeout) {
                    timeout = setTimeout(() => {
                        timeout = null
                        fn.apply(that, args)
                    }, time)
                }
            }
        }
    }

    /**
     * 原生创建脚本
     * @param {*} url 
     */
    createScript(url) {
        let script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    /**
     * 加载外部js
     * @param {*} src js地址
     * @returns 
     * 使用方法
     * import Utils from "@/common/cesium/Utils.js";
     * const _Utils = new Utils()
     * _Utils.loadJs(js地址).then(() => {加载成功，进行后续操作});
     */
    loadJs(src, async) {
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
}

export default Utils