/**
 * 工具
 * 使用方法如下 
   const _Utils = new Utils(cenium上下文,场景viewer)
    _Utils.方法函数(根据当前方法所需参数进行传递)
    
    方法目录如下：

    方法名称 | 概要
    --- | ---
    getRandomColor | 获取随机十六进制颜色
    operationDom | 操作dom
    crecteIframe | 创建 iframe
    queryParams | 将对象转换为url参数形式
    debounce | 防抖函数
    throttle | 节流函数
    createScript | 原生创建脚本
    loadJs | 加载外部js（es6）
    randomPoint | 取区域内的随机坐标点
    getEntityPosition | 获取当前实体位置
    toDegrees | 转化成经纬度
    getCameraInfo | 获取相机姿态
    isDegreesOrCartesian | 判断该点是否是经纬度或者笛卡尔坐标
    toCartesian | 转化成笛卡尔坐标
    point2LineDistance | 点到线段的最短距离
    countArea | 求多边形的面积
    countAreaByThreePoints | 求三角形面积
    getDistance | 计算空间上两点之间的距离
    getNormal | 已知三点坐标，求平面的法向量
    countIntersectionOfLineAndPlane | 求线面交点
    getPointInPolygon | 求交点 线面相交 求交点
    isPointInQuadrilateral | 判断点是否在四边形内部(只针对凸多边形)
    JudgePointInPolygon | 判断点是否在平面内部
    JudgePointInPolyline | 盘算点是否在线段上
    GetPanelEquation | 根据3个点,计算空间平面的方程
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
     * 创建iframe
     * @param {String} url 
     * @param {Object} params 
     * @returns 
     */
    crecteIframe(url, params) {
        let ifr = document.createElement('iframe');
        ifr.src = url;
        ifr.setAttribute('frameBorder', 0);
        if (params?.width) {
            ifr.width = params.width
        }
        if (params?.height) {
            ifr.height = params.height
        }
        return ifr
    }

    /**
     * 将对象转换为url参数形式
     * @param {Object} data,对象
     * @param {Boolean} isPrefix,是否自动加上"?"
     * @return {String} URL参数字符串
     */
     queryParams(data = {}, isPrefix = true, arrayFormat = 'brackets') {
        let prefix = isPrefix ? '?' : ''
        let _result = []
        if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
        for (let key in data) {
            let value = data[key]
            // 去掉为空的参数
            if (['', undefined, null].indexOf(value) >= 0) {
                continue;
            }
            // 如果值为数组，另行处理
            if (value.constructor === Array) {
                // e.g. {ids: [1, 2, 3]}
                switch (arrayFormat) {
                    case 'indices':
                        // 结果: ids[0]=1&ids[1]=2&ids[2]=3
                        for (let i = 0; i < value.length; i++) {
                            _result.push(key + '[' + i + ']=' + value[i])
                        }
                        break;
                    case 'brackets':
                        // 结果: ids[]=1&ids[]=2&ids[]=3
                        value.forEach(_value => {
                            _result.push(key + '[]=' + _value)
                        })
                        break;
                    case 'repeat':
                        // 结果: ids=1&ids=2&ids=3
                        value.forEach(_value => {
                            _result.push(key + '=' + _value)
                        })
                        break;
                    case 'comma':
                        // 结果: ids=1,2,3
                        let commaStr = "";
                        value.forEach(_value => {
                            commaStr += (commaStr ? "," : "") + _value;
                        })
                        _result.push(key + '=' + commaStr)
                        break;
                    default:
                        value.forEach(_value => {
                            _result.push(key + '[]=' + _value)
                        })
                }
            } else {
                _result.push(key + '=' + value)
            }
        }
        return _result.length ? prefix + _result.join('&') : ''
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
     * @param {String} src js地址
     * @param {Object} params 参数
     *  append {String} 插入标签 例如：head、body
     *  async {Boolean} 脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
     *  defer {Boolean} 脚本将在页面完成解析时执行
     *  注意：如果既不使用 async 也不使用 defer；在浏览器继续解析页面之前，立即读取并执行脚本
     * @returns 
     * 使用方法
     * import Utils from "@/common/cesium/Utils.js";
     * const _Utils = new Utils()
     * _Utils.loadJs(js地址).then(() => {加载成功，进行后续操作});
     */
    loadJs(src, params) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.type = "text/javascript";
            if (params?.async && params.async) {
                script.async = "async";
            }
            if (params?.defer && params.defer) {
                script.defer = "defer";
            }
            let append = "body"
            if (params?.append && params.append && (params.append == "body" || params.append == "head")) {
                append = params.append;
            }
            script.src = src;
            document[append].appendChild(script);

            script.onload = () => {
                resolve();
            }
            script.onerror = () => {
                reject();
            }
        })
    }


    /**
     * 取区域内的随机坐标点
     * @param {*} params 
     * start {Array} 必填 [经度,纬度]
     * end {Array} 必填 [经度,纬度]
     * range {Number} 选填 默认：1000 范围 保留几位小数
     * height {Number} 选填 默认：0 高度
     * type {String} 选填 默认：cartesian3  返回类型 cartesian3=笛卡尔 jwd=经纬度
     * @returns {cartesian3 | Array}  位置 笛卡尔/经纬度
     */
    randomPoint(params) {
        const start = params.start
        const end = params.end
        const range = params.range || 1000
        const height = params.height || 0
        const type = params.type || "cartesian3"
        let Cesium = this.Cesium
        function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const jd = random(start[0] * range, end[0] * range) / range
        const wd = random(start[1] * range, end[1] * range) / range

        if (type == "cartesian3") {
            return Cesium.Cartesian3.fromDegrees(jd, wd, height)
        }
        if (type == "jwd") {
            return [jd, wd, height]
        }
    }

    /**
     * 获取当前实体的位置
     * @param {*} entity 
     */
    getEntityPosition(entity) {
        const Cesium = this.Cesium
        if (entity.position) {
            return (
                entity.position._value ||
                Cesium.Property.getValueOrUndefined(
                    entity.position,
                    this.viewer.clock.currentTime || Cesium.JulianDate.now(),
                    new Cesium.Cartesian3()
                )
            );
        } else {
            return undefined
        }
    }

    /**
    * 转化成经纬度
    * @param point
    * 依赖函数：
    * getCameraInfo
    */
    toDegrees(point) {
        const Cesium = this.Cesium
        if (this.isDegreesOrCartesian(point)) {
            /**
             * 笛卡尔坐标转地理坐标
             * @param point
             */
            let toDegreesFromCartesian = (point) => {
                let cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
                let cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
                return {
                    lng: parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(8)),
                    lat: parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(8)),
                    alt: parseFloat(cartographic.height.toFixed(8))
                };

            };
            if (point.x) {
                point = toDegreesFromCartesian(point);
            }
            return point;
        }
    }

    /**
     * 获取相机姿态
     * @returns 
     */
    getCameraInfo() {
        const viewer = this.viewer
        if (viewer && viewer.camera && viewer.camera.position && viewer.camera.heading) {
            let p = this.toDegrees(viewer.camera.position);
            let heading = Cesium.Math.toDegrees(viewer.camera.heading);
            let pitch = Cesium.Math.toDegrees(viewer.camera.pitch);
            let roll = Cesium.Math.toDegrees(viewer.camera.roll);
            return {
                heading: parseFloat(heading).toFixed(5),
                pitch: parseFloat(pitch).toFixed(5),
                roll: parseFloat(roll).toFixed(5),
                lng: parseFloat(p.lng).toFixed(7),
                lat: parseFloat(p.lat).toFixed(7),
                alt: parseFloat(p.alt).toFixed(2)
            }
        } else {
            throw new Error("Error in Parameter!");
        }
    }


    /**
     * 判断该点是否是经纬度或者笛卡尔坐标
     * @param point
     * 依赖函数：
     * toCartesian
     */
    isDegreesOrCartesian(point) {
        if (!point) {
            throw new Error("Error in Parameter!");
        }
        if (('number' === typeof point.x) && ('number' === typeof point.y) && ('number' === typeof point.z)) {
            return true
        }
        if (('number' === typeof point.lng) && ('number' === typeof point.lat)) {
            return true
        }
        return false;
    }

    /**
     * 转化成笛卡尔坐标
     * @param point
     * 依赖函数：
     * point2LineDistance
     * countArea
     * countAreaByThreePoints
     * getDistance
     * getNormal
     */
    toCartesian(point) {
        const Cesium = this.Cesium
        if (this.isDegreesOrCartesian(point)) {
            /**
             * 地理坐标转笛卡尔坐标
             * @param point
             */
            let toCartesianFromDegrees = (point) => {
                return Cesium.Cartesian3.fromDegrees(point.lng, point.lat, point.alt || 0);
            };
            if (point.lng) {
                point = toCartesianFromDegrees(point);
            }
            return point;
        }
    }

    /**
     * 点到线段的最短距离
     * @param a 线段端点
     * @param b 线段端点
     * @param s 该点到ab的最短距离
     * @returns {number}
     */
    point2LineDistance(a, b, s) {
        a = this.toCartesian(a);
        b = this.toCartesian(b);
        s = this.toCartesian(s);
        let ab = Math.sqrt(Math.pow((a.x - b.x), 2.0) + Math.pow((a.y - b.y), 2.0) + Math.pow((a.z - b.z), 2.0));
        let as = Math.sqrt(Math.pow((a.x - s.x), 2.0) + Math.pow((a.y - s.y), 2.0) + Math.pow((a.z - s.z), 2.0));
        let bs = Math.sqrt(Math.pow((s.x - b.x), 2.0) + Math.pow((s.y - b.y), 2.0) + Math.pow((s.z - b.z), 2.0));
        let cos_A = (Math.pow(as, 2.0) + Math.pow(ab, 2.0) - Math.pow(bs, 2.0)) / (2 * ab * as);
        let sin_A = Math.sqrt(1 - Math.pow(cos_A, 2.0));
        let t = ((a.x - s.x) * (a.x - b.x) + (a.y - s.y) * (a.y - b.y) + (a.z - s.z) * (a.z - b.z)) / (Math.pow((a.x - b.x), 2.0) + Math.pow((a.y - b.y), 2.0) + Math.pow((a.z - b.z), 2.0));
        if (t < 0) {
            return as;
        } else if (t <= 1 && t >= 0) {
            return as * sin_A;
        } else if (t > 1) {
            return bs;
        }
    }

    /**
     * 求多边形的面积
     * @param {*} arr 
     */
    countArea(arr) {
        if ((!arr) || (arr.length < 3)) {
            throw new Error("Error in Parameter!");
        } else {
            let area = 0;
            for (let i = 0; i < arr.length; i++) {
                let j = (i + 1) % arr.length;
                let p1 = arr[i], p2 = arr[j];
                p1 = this.toCartesian(p1);
                p2 = this.toCartesian(p2);
                area += p1.x * p2.y;
                area -= p1.y * p2.x;
            }
            area /= 2;
            return Math.abs(area);
        }
    }

    /**
     * 求三角形面积;返回-1为不能组成三角形;
     * @param {*} a 
     * @param {*} b 
     * @param {*} c 
     */
    countAreaByThreePoints(a, b, c) {
        a = this.toCartesian(a);
        b = this.toCartesian(b);
        c = this.toCartesian(c);
        let area = -1;
        let side = [];//存储三条边的长度;
        side[0] = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
        side[1] = Math.sqrt(Math.pow(a.x - c.x, 2) + Math.pow(a.y - c.y, 2) + Math.pow(a.z - c.z, 2));
        side[2] = Math.sqrt(Math.pow(c.x - b.x, 2) + Math.pow(c.y - b.y, 2) + Math.pow(c.z - b.z, 2));
        //不能构成三角形;
        if (side[0] + side[1] <= side[2] || side[0] + side[2] <= side[1] || side[1] + side[2] <= side[0]) {
            return area;
        }
        //利用海伦公式。area =sqr(p*(p-a)(p-b)(p-c));
        let p = (side[0] + side[1] + side[2]) / 2; //半周长;
        area = Math.sqrt(p * (p - side[0]) * (p - side[1]) * (p - side[2]));
        return area;
    }

    /**
     * 计算空间上两点之间的距离
     * @param p1
     * @param p2
     * @returns {null|number}
     * 依赖函数:
     * isPointInQuadrilateral
     */
    getDistance(p1, p2) {
        if ((!p1) || (!p2)) {
            throw new Error("Error in Parameter!");
        }
        p1 = this.toCartesian(p1);
        p2 = this.toCartesian(p2);
        return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2) + Math.pow((p1.z - p2.z), 2));
    }


    /**
     * 已知三点坐标，求平面的法向量
     * @param p1
     * @param p2
     * @param p3
     * @returns {{x: number, y: number, z: number}}
     * 依赖函数：getPointInPolygon
     */
    getNormal(p1, p2, p3) {
        p1 = this.toCartesian(p1);
        p2 = this.toCartesian(p2);
        p3 = this.toCartesian(p3);
        let x = ((p2.y - p1.y) * (p3.z - p1.z) - (p2.z - p1.z) * (p3.y - p1.y));
        let y = ((p2.z - p1.z) * (p3.x - p1.x) - (p2.x - p1.x) * (p3.z - p1.z));
        let z = ((p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x));
        return { "x": x, "y": y, "z": z };
    }

    /**
     * 求线面交点 线面平行返回undefined //参考网址[https://blog.csdn.net/abcjennifer/article/details/6688080]
     * @param planeVector 平面的法线向量
     * @param planePoint 平面经过的一点坐标
     * @param lineVector 直线的方向向量
     * @param linePoint 直线经过的一点坐标
     * @returns {Array}  返回交点坐标
     * @constructor
     * 依赖函数：getPointInPolygon
     */
    countIntersectionOfLineAndPlane(planeVector, planePoint, lineVector, linePoint) {
        let vp1, vp2, vp3, n1, n2, n3, v1, v2, v3, m1, m2, m3, t, vpt;
        vp1 = planeVector.x;
        vp2 = planeVector.y;
        vp3 = planeVector.z;
        n1 = planePoint.x;
        n2 = planePoint.y;
        n3 = planePoint.z;
        v1 = lineVector.x;
        v2 = lineVector.y;
        v3 = lineVector.z;
        m1 = linePoint.x;
        m2 = linePoint.y;
        m3 = linePoint.z;
        vpt = v1 * vp1 + v2 * vp2 + v3 * vp3;
        //首先判断直线是否与平面平行
        let result = {};
        if (vpt === 0) {
            return undefined;
        } else {
            t = ((n1 - m1) * vp1 + (n2 - m2) * vp2 + (n3 - m3) * vp3) / vpt;
            result.x = m1 + v1 * t;
            result.y = m2 + v2 * t;
            result.z = m3 + v3 * t;
        }
        return result;
    }


    /**
     * 求交点 线面相交 求交点
     * @param line
     * @param polygon
     * @returns {boolean|Array}
     */
    getPointInPolygon() {
        let normal = this.getNormal(polygon[0], polygon[1], polygon[2]);
        let lineX = line[0].x - line[1].x;
        let lineY = line[0].y - line[1].y;
        let lineZ = line[0].z - line[1].z;
        let lineNormal = { "x": lineX, "y": lineY, "z": lineZ };
        let result = this.countIntersectionOfLineAndPlane(normal, polygon[1], lineNormal, line[0]);
        if (result) {
            return result;
        }
        return false;
    }

    /**
     * 判断点是否在四边形内部(只针对凸多边形)
     * @param point
     * @param quadrilateral
     */
    isPointInQuadrilateral() {
        let s1, s2, s3, s4, s5, s6;//s1 s2是将四边形分为两个三角形的面积  s3 s4 s5 s6代表四边形四个顶点到目标点组成的四个三角形的面积
        let ab, bc, ac, cd, da;//四边形的边长和对角线ac的长度
        ab = this.getDistance(quadrilateral[0], quadrilateral[1]);
        bc = this.getDistance(quadrilateral[1], quadrilateral[2]);
        ac = this.getDistance(quadrilateral[0], quadrilateral[2]);
        cd = this.getDistance(quadrilateral[2], quadrilateral[3]);
        da = this.getDistance(quadrilateral[3], quadrilateral[4]);
        //海伦公式 计算出四边形中两个三角形的面积
        let p_abc = (ab + bc + ac) / 2;
        let p_acd = (ac + cd + da) / 2;
        s1 = Math.sqrt(p_abc * (p_abc - ab) * (p_abc - bc) * (p_abc - ac));
        s2 = Math.sqrt(p_acd * (p_acd - ac) * (p_acd - cd) * (p_acd - da));
        let ap, bp, cp, dp;//四边形到目标点之间的距离
        ap = this.getDistance(point, quadrilateral[0]);
        bp = this.getDistance(point, quadrilateral[1]);
        cp = this.getDistance(point, quadrilateral[2]);
        dp = this.getDistance(point, quadrilateral[3]);
        let p_abp = (ab + ap + bp) / 2;
        let p_bcp = (bc + bp + cp) / 2;
        let p_cdp = (cd + cp + dp) / 2;
        let p_dap = (da + dp + ap) / 2;
        s3 = Math.sqrt(p_abp * (p_abp - ab) * (p_abp - ap) * (p_abp - bp));
        s4 = Math.sqrt(p_bcp * (p_bcp - bc) * (p_bcp - bp) * (p_bcp - cp));
        s5 = Math.sqrt(p_cdp * (p_cdp - cd) * (p_cdp - cp) * (p_cdp - dp));
        s6 = Math.sqrt(p_dap * (p_dap - da) * (p_dap - dp) * (p_dap - ap));
        if (Math.abs((s3 + s4 + s5 + s6) - (s1 + s2)) > 0.0001) {
            return false
        }
        return true;
    }

    /**
     * 判断点是否在平面内部
     * @param point
     * @param polygon
     * @returns {boolean}
     * @constructor
     */
    JudgePointInPolygon(point, polygon) {
        /**
         * 两个向量的叉积和
         * @param n
         * @param m
         * @returns {number}
         * @constructor
         */
        let VectorMultiplication = (n, m) => {
            return (n.y * m.z - m.y * n.z) + (n.z * m.x - n.x * m.z) + (n.x * m.y - n.y * m.x);
        };

        let p1 = polygon[0];
        let p2 = polygon[1];
        let p3 = polygon[2];
        let p4 = polygon[3];
        let n1, n2, n3, n4, n5, n6, n7, n8;
        n1 = { "x": p2.x - p1.x, "y": p2.y - p1.y, "z": p2.z - p1.z };
        n2 = { "x": point.x - p1.x, "y": point.y - p1.y, "z": point.z - p1.z };
        n3 = { "x": p4.x - p3.x, "y": p4.y - p3.y, "z": p4.z - p3.z };
        n4 = { "x": point.x - p3.x, "y": point.y - p3.y, "z": point.z - p3.z };
        n5 = { "x": p3.x - p2.x, "y": p3.y - p2.y, "z": p3.z - p2.z };
        n6 = { "x": point.x - p2.x, "y": point.y - p2.y, "z": point.z - p2.z };
        n7 = { "x": p4.x - p1.x, "y": p4.y - p1.y, "z": p4.z - p1.z };
        n8 = { "x": point.x - p4.x, "y": point.y - p4.y, "z": point.z - p4.z };
        return !(VectorMultiplication(n1, n2) * VectorMultiplication(n3, n4) >= 0 && VectorMultiplication(n5, n6) * VectorMultiplication(n7, n8) >= 0);
    }


    /**
     * 盘算点是否在线段上
     * @param point
     * @param polyline
     * @returns {boolean}
     * @constructor
     */
    JudgePointInPolyline(point, polyline) {
        let lineLength = Math.sqrt(Math.pow((polyline[0].x - polyline[1].x), 2) + Math.pow((polyline[0].y - polyline[1].y), 2) + Math.pow((polyline[0].z - polyline[1].z), 2));
        let one = Math.sqrt(Math.pow((point.x - polyline[1].x), 2) + Math.pow((point.y - polyline[1].y), 2) + Math.pow((point.z - polyline[1].z), 2));
        let two = Math.sqrt(Math.pow((point.x - polyline[0].x), 2) + Math.pow((point.y - polyline[0].y), 2) + Math.pow((point.z - polyline[0].z), 2));
        let di = one + two - lineLength;
        if (di * 10000 < 1) {
            return true;
        }
        return false;
    }

    /**
     * 根据3个点,计算空间平面的方程
     * Ax+By+Cz+D=0
     * 输入参数:point3fArray---空间中3个点的坐标,大小为3;输入点>3时,只取前3个点
     * 输出参数A,B,C,D
     * 返回值:true---计算成功;false----计算失败
     * @param point3fArray
     * @returns {{A: number, B: number, C: number, D: number}}
     * @constructor
     */
    GetPanelEquation(point3fArray) {
        if (point3fArray.length < 3) {
            return undefined;
        }
        let A, B, C, D;
        A = point3fArray[0].y * (point3fArray[1].z - point3fArray[2].z) +
            point3fArray[1].y * (point3fArray[2].z - point3fArray[0].z) +
            point3fArray[2].y * (point3fArray[0].z - point3fArray[1].z);
        B = point3fArray[0].z * (point3fArray[1].x - point3fArray[2].x) +
            point3fArray[1].z * (point3fArray[2].x - point3fArray[0].x) +
            point3fArray[2].z * (point3fArray[0].x - point3fArray[1].x);
        C = point3fArray[0].x * (point3fArray[1].y - point3fArray[2].y) +
            point3fArray[1].x * (point3fArray[2].y - point3fArray[0].y) +
            point3fArray[2].x * (point3fArray[0].y - point3fArray[1].y);
        D = -point3fArray[0].x * (point3fArray[1].y * point3fArray[2].z - point3fArray[2].y * point3fArray[1].z) -
            point3fArray[1].x * (point3fArray[2].y * point3fArray[0].z - point3fArray[0].y * point3fArray[2].z) -
            point3fArray[2].x * (point3fArray[0].y * point3fArray[1].z - point3fArray[1].y * point3fArray[0].z);
        return { A: A, B: B, C: C, D: D };
    }

}

export default Utils