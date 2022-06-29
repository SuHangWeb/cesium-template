/**
 * @class 工具类
 * @constructor
 * 摘取：https://www.jianshu.com/p/e27dd92263e0
 */

export let GeoInfoTools = {


    radiansPerDegree: Math.PI / 180.0,//角度转化为弧度(rad)
    degreesPerRadian: 180.0 / Math.PI,//弧度转化为角度
    /**
     * 错误
     */
    Error: {
        /**
         * 返回错误
         * @param msg
         * @returns {Error}
         */
        setError: function (msg) {
            if (msg) {
                return new Error(msg);
            }
            return new Error("Error in Parameter!");
        },
    },

    /**
     * 计算
     */
    Count: {

        /**
         * 获取两点之间的距离
         * @param p1
         * @param p2
         * @returns {*}
         */
        countDistanceBetweenTwoPoints: function (p1, p2) {
            if (!p1 || !p2) {
                throw GeoInfoTools.Error.setError();
            }
            p1 = GeoInfoTools.Transform.toCartesian(p1);
            p2 = GeoInfoTools.Transform.toCartesian(p2);
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2) + Math.pow((p1.z - p2.z), 2));
        },

        /**
         * 点到线段的最短距离
         * @param a 直线上一个点
         * @param b 直线上另一个点
         * @param s 该点到ab的最短距离
         * @returns {number}
         */
        countPoint2LineDistance: function (a, b, s) {
            if (!a || !b || !s) {
                throw GeoInfoTools.Error.setError();
            }
            a = GeoInfoTools.Transform.toCartesian(a);
            b = GeoInfoTools.Transform.toCartesian(b);
            s = GeoInfoTools.Transform.toCartesian(s);
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
        },

        /**
         * 求三角形面积;返回-1为不能组成三角形;
         * @param a
         * @param b
         * @param c
         * @returns {*}
         */
        countAreaByThreePoints: function (a, b, c) {
            if ((!a) || (!b) || (!c)) {
                throw GeoInfoTools.Error.setError();
            }
            a = GeoInfoTools.Transform.toCartesian(a);
            b = GeoInfoTools.Transform.toCartesian(b);
            c = GeoInfoTools.Transform.toCartesian(c);
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
        },

        /**
         * 求多边形的面积
         * @param arr
         * @returns {*}
         */
        countArea: function (arr) {
            if ((!arr) || (arr.length < 3)) {
                throw GeoInfoTools.Error.setError();
            } else {
                let area = 0;
                for (let i = 0; i < arr.length; i++) {
                    let j = (i + 1) % arr.length;
                    let p1 = arr[i], p2 = arr[j];
                    p1 = GeoInfoTools.Transform.toCartesian(p1);
                    p2 = GeoInfoTools.Transform.toCartesian(p2);
                    area += p1.x * p2.y;
                    area -= p1.y * p2.x;
                }
                area /= 2;
                return Math.abs(area);
            }

        },

        /**
         * 计算向量叉乘
         * @param v1
         * @param v2
         * @returns {number}
         */
        countCrossMul: function (v1, v2) {
            if (!v1 || !v2) {
                throw GeoInfoTools.Error.setError();
            }
            v1 = GeoInfoTools.Transform.toDegrees(v1);
            v2 = GeoInfoTools.Transform.toDegrees(v2);
            return v1.lng * v2.lat - v1.lat * v2.lng;
        },

    },

    /**
     * 转换
     */
    Transform: {

        /**
         * 世界坐标系转屏幕坐标
         * @param point
         * @param viewer
         */
        toWindowCoordinates: function (point, viewer) {
            if (viewer && point && point.x && point.y && point.z) {
                return Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, point);
            } else if (viewer && point.lng && point.lat && point.alt) {
                return Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, GeoInfoTools.Transform.toCartesianFromDegrees(point));
            } else {
                throw GeoInfoTools.Error.setError();
            }
        },

        /**
         * 笛卡尔坐标转世界坐标
         * @param point
         */
        toDegreesFromCartesian: function (point) {
            if (point.x && point.y && point.z) {
                let cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
                let cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
                return {
                    lng: parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(8)),
                    lat: parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(8)),
                    alt: parseFloat(cartographic.height.toFixed(8))
                };
            } else {
                throw GeoInfoTools.Error.setError();
            }
        }
        ,

        /**
         * 世界坐标转笛卡尔坐标
         * @param point
         */
        toCartesianFromDegrees: function (point) {
            if (point.lng && point.lat) {
                return Cesium.Cartesian3.fromDegrees(point.lng, point.lat, point.alt || 0);
            } else {
                throw GeoInfoTools.Error.setError();
            }
        }
        ,
        /**
         * 转化成经纬度
         * @param point
         */
        toDegrees: function (point) {
            if (GeoInfoTools.Judge.isDegreesOrCartesian(point)) {
                if (point.x && point.y && point.z) {
                    point = GeoInfoTools.Transform.toDegreesFromCartesian(point);
                }
                return point;
            } else {
                throw GeoInfoTools.Error.setError();
            }
        },

        /**
         * 转化成笛卡尔坐标
         * @param point
         */
        toCartesian: function (point) {
            if (GeoInfoTools.Judge.isDegreesOrCartesian(point)) {
                if (point.lng && point.lat) {
                    point = GeoInfoTools.Transform.toCartesianFromDegrees(point);
                }
                return point;
            } else {
                throw GeoInfoTools.Error.setError();
            }
        },


        /**
         * 距离（米）转换为纬度  一米对应的纬度为定值
         * @param meter 距离多少米
         * @returns {number}
         */
        meter2Lat: function (meter) {
            let pi = Math.PI;
            let lngInMeter = (6371 * 2 * pi) / 360;
            return (meter / lngInMeter) / 1000;
        },

        /**
         * 距离（米）转换为经度  一米对应的经度与所在有关纬度
         * @param meter 距离
         * @param lat 所在纬度
         * @returns {number}
         */
        meter2Lng: function (meter, lat) {
            let pi = Math.PI;
            let latInMeter = (Math.cos(lat * pi / 180) * 6371 * 2 * pi) / 360;
            return (meter / latInMeter) / 1000;
        },

    },

    /**
     * 信息
     */
    Info: {
        /**
         * 获取当前相机姿态信息
         * 包括经度、纬度、高程、Heading、Pitch、Roll
         * @param viewer
         */
        getCameraInfo: function (viewer) {
            if (viewer && viewer.camera && viewer.camera.position && viewer.camera.heading) {
                let p = GeoInfoTools.Transform.toDegrees(viewer.camera.position);
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
                throw GeoInfoTools.Error.setError();
            }
        }
    },

    Judge: {
        /**
         * 判断点是否在面的内部 不包含高程
         * @param point
         * @param coordinates
         * @returns {boolean}
         */
        isPointInPolygon: function (point, coordinates) {
            if ((!coordinates) || (!(coordinates instanceof Array)) || (coordinates.length < 3)) {
                throw GeoInfoTools.Error.setError();
            }
            point = GeoInfoTools.Transform.toDegrees(point);
            let x = point.lng, y = point.lat;
            let inside = false;
            for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
                let vsi = GeoInfoTools.Transform.toDegrees(coordinates[i]),
                    vsj = GeoInfoTools.Transform.toDegrees(coordinates[j]);
                let xi = vsi.lng, yi = vsi.lat;
                let xj = vsj.lng, yj = vsj.lat;
                let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) {
                    inside = !inside;
                }
            }
            return inside;
        },

        /**
         * 判断两条线段是否相交
         * @param p1
         * @param p2
         * @param p3
         * @param p4
         * @returns {boolean}
         */
        isLineCross: function (p1, p2, p3, p4) {
            p1 = GeoInfoTools.Transform.toDegrees(p1);
            p2 = GeoInfoTools.Transform.toDegrees(p2);
            p3 = GeoInfoTools.Transform.toDegrees(p3);
            p4 = GeoInfoTools.Transform.toDegrees(p4);
            let v1 = { lng: p1.lng - p3.lng, lat: p1.lat - p3.lat },
                v2 = { lng: p2.lng - p3.lng, lat: p2.lat - p3.lat },
                v3 = { lng: p4.lng - p3.lng, lat: p4.lat - p3.lat },
                v = GeoInfoTools.Count.countCrossMul(v1, v3) * GeoInfoTools.Count.countCrossMul(v2, v3);
            v1 = { lng: p3.lng - p1.lng, lat: p3.lat - p1.lat };
            v2 = { lng: p4.lng - p1.lng, lat: p4.lat - p1.lat };
            v3 = { lng: p2.lng - p1.lng, lat: p2.lat - p1.lat };
            return (v <= 0 && GeoInfoTools.Count.countCrossMul(v1, v3) * GeoInfoTools.Count.countCrossMul(v2, v3) <= 0) ? true : false
        },

        /**
         * 判断该点是否是经纬度或者笛卡尔坐标
         * @param point
         */
        isDegreesOrCartesian: function (point) {
            if (!point) {
                throw GeoInfoTools.Error.setError();
            }
            if (('number' === typeof point.x) && ('number' === typeof point.y) && ('number' === typeof point.z)) {
                return true
            }
            if (('number' === typeof point.lng) && ('number' === typeof point.lat)) {
                return true
            }
            return false;
        },

        /**
         * 判断线面是否相交
         * @param line
         * @param polygon
         * @constructor
         */
        isLineIntersectPolygon: function (line, polygon) {
            if (!line || !polygon || line.length !== 2 || polygon.length < 3) {
                throw GeoInfoTools.Error.setError();
            }
            let firstPoint = GeoInfoTools.Transform.toDegrees(line[0]),
                secondPoint = GeoInfoTools.Transform.toDegrees(line[1]), temp1, temp2,
                result = false;
            for (let poly = 0; poly < polygon.length; poly++) {
                if (poly == polygon.length - 1) {
                    temp1 = GeoInfoTools.Transform.toDegrees(polygon[poly]);
                    temp2 = GeoInfoTools.Transform.toDegrees(polygon[0]);
                } else {
                    temp1 = GeoInfoTools.Transform.toDegrees(polygon[poly]);
                    temp2 = GeoInfoTools.Transform.toDegrees(polygon[poly + 1]);
                }
                if (GeoInfoTools.Judge.isLineCross(firstPoint, secondPoint, temp1, temp2)) {
                    return true;
                }
            }
            return result;
        },

    },

    /**
     * 获取UUID
     * @returns {string}
     */
    getUUID: function () {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        let uuid = s.join("");
        uuid = uuid.replace(/-/g, '');
        return uuid;
    },

    /**
     * 格式化日期格式 1900-01-01 12.12.12
     * @param date
     * @returns {string}
     * @constructor
     */
    formatDateTime: function (date) {
        if ((!date) || (!(date instanceof Date))) {
            throw GeoInfoTools.Error.setError();
        }
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },
    /**
     * 调整Cesium3DTileset位置
     * @param tileset
     * @param params
     */
    update3dtilesMaxtrix: function (tileset, item) {
        let params = item.params;
        //旋转
        let mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(params.rx));
        let my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(params.ry));
        let mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.rz));
        let rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
        let rotationY = Cesium.Matrix4.fromRotationTranslation(my);
        let rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
        //平移
        let position = Cesium.Cartesian3.fromDegrees(params.tx, params.ty, params.tz);
        let m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        Cesium.Matrix4.multiply(m, rotationX, m);
        Cesium.Matrix4.multiply(m, rotationY, m);
        Cesium.Matrix4.multiply(m, rotationZ, m);
        // 赋值给tileset
        tileset._root.transform = m;
        if (item.alpha) {
            GeoInfoTools.setAlpha(tileset, item.alpha);
        }
    },
    updateTilePosition: function (tile, params) {
        //旋转
        let mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(params.position.heading));
        let my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(params.position.pitch));
        let mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.position.roll));
        let rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
        let rotationY = Cesium.Matrix4.fromRotationTranslation(my);
        let rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
        //平移
        let position = Cesium.Cartesian3.fromDegrees(params.position.lng, params.position.lat, params.position.alt);
        let m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        Cesium.Matrix4.multiply(m, rotationX, m);
        Cesium.Matrix4.multiply(m, rotationY, m);
        Cesium.Matrix4.multiply(m, rotationZ, m);
        //缩放
        let scale = Cesium.Matrix4.fromUniformScale(params.scale);
        Cesium.Matrix4.multiply(m, scale, m);
        // 赋值给tileset
        tile._root.transform = m;
    },
    /**
     * 获取当前实体的位置
     * @param entity
     * @returns {*}
     */
    getEntityPosition: function (entity) {
        return entity.position._value || Cesium.Property.getValueOrUndefined(entity.position, viewer.clock.currentTime || Cesium.JulianDate.now(), new Cesium.Cartesian3());
    },
    /**
     * 透明度
     * @param Cesium
     * @param tileset
     * @param al
     */
    setAlpha: function (tileset, al) {
        let alpha = parseFloat(al) / 100;
        let style = new Cesium.Cesium3DTileStyle({
            color: "color('white', " + alpha + ")",
            show: true
        });
        tileset.style = style;
    },

    /**
     *  销毁handler
     */
    handlerDestroy: function () {
        if (handler) {
            handler.destroy();
        }
    },

    /**
     * 计算 管线的管子的半径和边数
     * @param radius
     * @param itemp
     * @returns {Array}
     */
    computeCircleR: function (radius, itemp) {
        let result = [];
        for (let i = 0; i < 360; i += itemp) {
            let radians = Cesium.Math.toRadians(i);
            result.push(new Cesium.Cartesian2(radius * Math.sin(radians), radius * Math.cos(radians)));
        }
        return result;
    },
    /**
     * 点击按钮执行横断面分析的方法
     * @constructor
     */
    CroAn: function (minHeights, maxHeights, callback) {
        let minH = minHeights || -10, maxH = maxHeights || 100;
        GeoInfoTools.handlerDestroy();
        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        let positions = [];
        let options = {};
        let poly = undefined;
        viewer.entities.removeById('CrossAnalysis');
        let wallPoly = (function () {
            function _(positions) {
                options = {
                    id: "CrossAnalysis",
                    wall: {
                        positions: [],
                        minimumHeights: [minH, minH],
                        material: Cesium.Color.fromCssColorString("#409ad5")
                    }
                };
                _.prototype._init()
            }

            _.prototype._init = function () {
                let _update = function () {
                    let dp = [];
                    for (let i = 0; i < 2; i++) {
                        let cartesian3 = new Cesium.Cartesian3(positions[i].x, positions[i].y, positions[i].z);
                        let cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian3);
                        let lat = Cesium.Math.toDegrees(cartographic.latitude);
                        let lng = Cesium.Math.toDegrees(cartographic.longitude);
                        let alt = cartographic.height;
                        dp.push(lng);
                        dp.push(lat);
                        dp.push(maxH);
                    }
                    return Cesium.Cartesian3.fromDegreesArrayHeights(dp);
                };
                options.wall.positions = new Cesium.CallbackProperty(_update, false);
                // let wallEntity = viewer.entities.getOrCreateEntity("CrossAnalysis");
                // wallEntity.id = options.id;
                // wallEntity.wall = options.wall;
                viewer.entities.add(options)
            };
            return _;
        })();
        handler.setInputAction(function (movement) {
            let cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
            if (positions.length == 0) {
                positions.push(cartesian.clone());
            }
            if (positions.length >= 3) {
                handler.destroy();
                // CrossAnalysis();
            }
            positions.push(cartesian);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.setInputAction(function (movement) {
            let cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
            if (positions.length >= 3) {
                handler.destroy();
                // CrossAnalysis();
            } else if (positions.length >= 1) {
                if (!Cesium.defined(poly)) {
                    poly = new wallPoly(positions);
                } else {
                    positions.pop();
                    positions.push(cartesian);
                }
            }

        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.setInputAction(function (movement) {
            GeoInfoTools.handlerDestroy();
            CrossAnalysis(callback);
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    /**
     * 在canvas 上绘制横断面的信息
     * @param p
     */
    getCrossAnalysisResultToContext: function (p) {
        let maxAlt = 0;
        let minAlt = Infinity;
        p.forEach(function (data) {
            if (data.alt > maxAlt) {
                maxAlt = data.alt;
            }
            if (data.alt < minAlt) {
                minAlt = data.alt;
            }
        });
        maxAlt += 6;
        minAlt -= 3;
        let pixelPerMetre = 180 / (maxAlt - minAlt);
        let unitHeight = (maxAlt - minAlt) / 6;//最高的减去最低的除六
        // addDivCanvas()
        let canvas = document.getElementById('crossAnalysisResultCanvas'); /// 拿到画板
        let webWidth = 1920, webHeight = 948;//页面宽高
        let panelHeight = webHeight / 2, panelWidth = webWidth / 2;
        canvas.width = panelWidth;
        canvas.height = panelHeight + 50;
        let ctx = canvas.getContext('2d');   /// 拿到上下文
        // 四边框
        ctx.beginPath();   /// 绘制直线
        ctx.strokeStyle = 'black';   /// 设置线条的颜色
        ctx.lineWidth = 4;   /// 设置线条的宽度
        ctx.moveTo(10, 30);   /// 起点
        ctx.lineTo(panelWidth - 10, 30);    /// 终点
        ctx.lineTo(panelWidth - 10, panelHeight + 15);
        ctx.lineTo(10, panelHeight + 15);   /// 终点   /// 终点
        ctx.lineTo(10, 30);   /// 终点
        ctx.closePath();
        // 文字说明
        ctx.font = "20px Courier New";
        ctx.fillStyle = "black";
        ctx.fillText("横断面图", panelHeight - 40, 60);
        ctx.stroke();
        // 横纵坐标轴 以及文字
        ctx.font = "14px Courier New";   ///设置字体样式
        ctx.fillStyle = "black";   ///设置字体填充颜色
        ctx.strokeStyle = 'black';   /// 设置线条的颜色
        ctx.lineWidth = 1;   /// 设置线条的宽度
        ctx.beginPath();   /// 绘制直线
        let rectH = 32;
        let hTemp = 60;
        let rectW = 150;
        ctx.lineWidth = 1;
        //纵坐标 竖线
        ctx.moveTo(rectW, 130);
        ctx.lineTo(rectW, canvas.height - 35);
        for (let i = 0; i < canvas.height; i++) {
            if (i > 0 && i <= 7) {
                let n = hTemp -= 10;
                ctx.fillText((maxAlt - ((i - 1) * unitHeight)).toFixed(1) + "(m)", 80, rectH * i + 105);
                ctx.moveTo(150, rectH * i + 100);
                ctx.lineTo(165, rectH * i + 100);
            }
            if (i > 8 && i < 12) {
                ctx.moveTo(10, rectH * i + 100);
                ctx.lineTo(canvas.width - 10, rectH * i + 100);
            }
        }
        ctx.stroke();
        ctx.font = "15px Courier New";   ///设置字体样式
        ctx.fillStyle = "black";   ///设置字体填充颜色
        ctx.fillText("横截点高程（m）", 20, 410);
        ctx.fillText("间距（m）", 20, 440);
        ctx.fillText("管径（mm）", 20, 470);
        ctx.stroke();
        let CurveList = [];
        let realPoints = p;
        let unitDistance = (panelWidth - 300) / (realPoints.length);//根据相交的点数 计算间隔
        for (let k = 0; k < realPoints.length; k++) {
            // todo 管线信息调整
            let pipeDiameter = realPoints[k].pipeDiameter || 10;//canvas绘制的圆形的管径
            let pipeSpecification = realPoints[k].pipeSpecification || '1000';//规格
            let twoDistance;//两点之间的距离
            if (realPoints.length == 1) {
                twoDistance = "";
            } else {
                if (k != realPoints.length - 1) {
                    twoDistance = GeoInfoTools.Count.countDistanceBetweenTwoPoints(realPoints[k], realPoints[k + 1]).toFixed(3);
                } else {
                    twoDistance = GeoInfoTools.Count.countDistanceBetweenTwoPoints(realPoints[k], realPoints[0]).toFixed(3);
                }
            }
            CurveList.push([panelWidth - 230 - unitDistance * k, 310 - (parseFloat(realPoints[k].alt.toFixed(3)) - minAlt) * pixelPerMetre]);
            ctx.beginPath();
            //以点为中心 画圆
            ctx.arc(panelWidth - 230 - unitDistance * k, 310 - (realPoints[k].alt.toFixed(3) - minAlt) * pixelPerMetre, pipeDiameter, 0, Math.PI * 2, true);
            //写经纬度信息
            ctx.fillText("经度:" + realPoints[k].lng.toFixed(8), (panelWidth - 230 - unitDistance * k), 300 - (realPoints[k].alt.toFixed(3) - minAlt) * pixelPerMetre);
            ctx.fillText("纬度:" + realPoints[k].lat.toFixed(8), (panelWidth - 230 - unitDistance * k), 280 - (realPoints[k].alt.toFixed(3) - minAlt) * pixelPerMetre);
            ctx.fillText("高程:" + realPoints[k].alt.toFixed(3), (panelWidth - 230 - unitDistance * k), 260 - (realPoints[k].alt.toFixed(3) - minAlt) * pixelPerMetre);
            //管线高程 指点的高程
            ctx.fillText(realPoints[k].alt.toFixed(3), panelWidth - 230 - unitDistance * k, 410);
            //两点之间的间距 横截面为两个点的时候 可当作两点之间的距离
            ctx.fillText(twoDistance, panelWidth - 230 - unitDistance * k, 440);
            //管径规格
            ctx.fillText(pipeSpecification, panelWidth - 230 - unitDistance * k, 470);
            ctx.closePath();
            ctx.stroke();
            //竖直的虚线
            drawDashedLine(ctx, {
                x: panelWidth - 230 - unitDistance * k,
                y: 310 - (realPoints[k].alt.toFixed(3) - minAlt) * pixelPerMetre
            }, {
                x: panelWidth - 230 - unitDistance * k,
                y: 390
            }, [3, 3]);
            //水平的虚线
            drawDashedLine(ctx, {
                x: panelWidth - 230 - unitDistance * k,
                y: 310 - (realPoints[k].alt.toFixed(3) - minAlt) * pixelPerMetre
            }, {
                x: 150,
                y: 310 - (realPoints[k].alt.toFixed(3) - minAlt) * pixelPerMetre
            }, [3, 3]);
        }

        //连接横截面点 可以不使用
        // if(CurveList&&CurveList.length>0){
        //     if (CurveList.length == 1) {
        //         ctx.strokeStyle = "#060606";
        //         ctx.beginPath();
        //         ctx.arc(CurveList[0][0], CurveList[0][1], 1, 0, Math.PI * 2, true);
        //         ctx.stroke();
        //         ctx.closePath();
        //     } else if (CurveList.length > 1) {
        //         ctx.strokeStyle = "#060606";
        //         ctx.beginPath();
        //         ctx.moveTo(CurveList[0][0], CurveList[0][1]);
        //         for (let cl = 1; cl < CurveList.length; cl++) {
        //             ctx.lineTo(CurveList[cl][0], CurveList[cl][1]);
        //         }
        //         ctx.stroke();
        //         ctx.closePath();
        //     }
        // }


    },
    /**
     * 添加Cesium3DTileset
     * @param model_trans
     * @returns {*}
     */
    addCesium3DTileset: function (model_trans, view) {
        let Cesium3DTileset = new Cesium.Cesium3DTileset({
            url: model_trans.url,
            show: model_trans.show || true,
            scale: model_trans.scale
        });
        let tileset = view.scene.primitives.add(Cesium3DTileset);
        tileset.readyPromise.then(function (t) {
            GeoInfoTools.update3dtilesMaxtrix(tileset, model_trans);
        });
        return tileset;
    },
    /**
     * 根据范围来控制model的显示隐藏
     * @param show
     * @param area
     */
    showAreaEntiy: function (show, area) {
        let entities = viewer.entities.values;
        entities.forEach(function (item, index) {
            if (item.model && item.model._uri) {
                let position = GeoInfoTools.getEntityPosition(item);
                if (GeoInfoTools.Judge.isPointInPolygon(position, area)) {
                    item.show = show;
                } else {
                    item.show = !show;
                }
            } else {
                item.show = false;
            }
        });
    },
    /**
     * 根据位置来自动旋转视角
     * @param viewOptions
     */
    roundExtentView: function (viewOptions) {
        if (viewOptions && viewOptions.position) {
            flyExtent(viewOptions);
        }
    },
    /**
     * 根据矩形区域来生成clippingPlanes，然后计算旋转视角
     * @param range
     * @param viewOptions
     */
    specialView: function (range, viewOptions) {
        let primitives = viewer.scene.primitives._primitives;
        primitives.forEach(function (item, index) {
            if (item._url && item._url.indexOf("tileset.json") > 0) {
                let clippingPlanes = tilesetAddClippingPlanes(range, item);
                item.clippingPlanes = clippingPlanes;
            }
        });
        viewOptions = {};
        viewOptions.position = Cesium.Cartesian3.fromDegrees((range[0].lng + range[2].lng) / 2, (range[0].lat + range[2].lat) / 2, 0);
        let dis = GeoInfoTools.Count.countDistanceBetweenTwoPoints(range[0], range[2]);
        if (dis) {
            viewOptions.distance = dis * 2;
        }
        flyExtent(viewOptions);
        GeoInfoTools.showAreaEntiy(true, range);
    },

    showExtent(extent) {

        let primitives = viewer.scene.primitives._primitives;
        primitives.forEach(function (item, index) {
            if (item._url && item._url.indexOf("tileset.json") > 0) {
                let clippingPlanes = tilesetAddClippingPlanes(extent, item);
                item.clippingPlanes = clippingPlanes;
            }
        });
        GeoInfoTools.showParticleSystems(false);
        GeoInfoTools.showAreaEntiy(true, extent);
    },
    showAll() {
        GeoInfoTools.showParticleSystems(true);
        let primitives = viewer.scene.primitives._primitives;
        primitives.forEach(function (item, index) {
            if (item._url && item._url.indexOf("tileset.json") > 0) {
                if (item.clippingPlanes && item.clippingPlanes.unionClippingRegions) {
                    item.clippingPlanes.unionClippingRegions = false;
                }
            }

        });
        //改变模型的显示隐藏
        let entities = viewer.entities.values;
        entities.forEach(function (item, index) {
            item.show = true;
        });
    },
    /**
     * 添加右键结束提醒
     * @param cartesian
     */
    addTip: function (cartesian) {
        if (cartesian && cartesian.x && cartesian.y) {
            let p = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cartesian);
            if (document.getElementById("_____tip")) {
                let divChild = document.getElementById("_____tip");
                divChild.style.left = (p.x + 10) + "px";
                divChild.style.top = (p.y + 10) + "px";
            } else {
                let divChild = document.createElement("Div");
                divChild.innerHTML = "<label style='color: #000000'> 右键结束 </label>";
                divChild.id = "_____tip";
                divChild.style.width = "75px";
                divChild.style.left = (p.x + 10) + "px";
                divChild.style.top = (p.y + 10) + "px";
                divChild.style.height = "20px";
                divChild.style.position = "absolute";
                divChild.style.background = "#f2f4ff";
                divChild.style.borderRadius = "5px";
                divChild.style.show = "block";
                divChild.style.textAlign = "center";
                divChild.style.zIndex = "9999999999";
                document.body.append(divChild);
            }

        }
    },
    /**
     * 删除右键提示提醒
     */
    clearTip: function () {
        let my = document.getElementById("_____tip");
        if (my != null) {
            my.parentNode.removeChild(my);
        }
    },
    /**
     * 改变模型的显示隐藏和颜色
     * @param item
     * @param show
     * @param color
     * @param alpha
     */
    changeEntityModelView: function (item, show, color, alpha) {
        if (typeof show === "boolean") {
            item.show = show;
        }
        item.model.color = Cesium.Color.fromCssColorString(color).withAlpha(parseFloat(alpha));
    },

    /**
     * 改变model和tiles的显示隐藏和样式
     * @param type
     * @param pickEntity
     */
    changeModelAndTileStyle: function (type, pickEntity) {
        let primitives = viewer.scene.primitives._primitives;
        let entities = viewer.entities.values;
        if (type) {
            primitives.forEach(function (item, index) {
                GeoInfoTools.changeTileView(item, 'keep', '#67ADDF', 0.15)
            })
            entities.forEach(function (item, index) {
                if (item.model && item.model._uri._value) {
                    if (pickEntity.id === item.id) {
                        item.model.color = Cesium.Color.WHITE.withAlpha(1);
                        item.model.colorBlendMode = Cesium.ColorBlendMode['MIX'];
                        item.model.lightColor = new Cesium.Cartesian3(40, 40, 0);
                    } else {
                        item.model.color = Cesium.Color.fromCssColorString('#67ADDF').withAlpha(0.15);
                        item.model.colorBlendMode = Cesium.ColorBlendMode['HIGHLIGHT'];
                        item.model.lightColor = new Cesium.Cartesian3(0, 0, 0);
                    }

                }
            });

        } else {
            if (GeoInfoTools.pipeLineLabels instanceof Array && GeoInfoTools.pipeLineLabels.length > 0) {
                GeoInfoTools.pipeLineLabels.forEach(function (item, index) {
                    viewer.entities.remove(item);
                })
            }
            entities.forEach(function (item, index) {
                if (item.model && item.model._uri._value) {
                    item.model.color = Cesium.Color.WHITE.withAlpha(1);
                    item.model.lightColor = new Cesium.Cartesian3(0, 0, 0);
                    item.model.colorBlendMode = Cesium.ColorBlendMode['HIGHLIGHT'];
                }
            });

            primitives.forEach(function (item, index) {
                if (item instanceof Cesium.Cesium3DTileset) {
                    if (item && item._url && item._url.indexOf("tile/pipeline/tileset.json") >= 0) {
                        item.tileVisible.removeEventListener(GeoInfoTools.changTileColor); //清除管线效果
                    }
                    GeoInfoTools.changeTileView(item, 'keep', '#ffffff', 1);
                }
            })
        }

    },
    /***
     * 计算entity的时间和位置绑定
     * @param startTime
     * @param positions
     * @param uniformSpeed
     * @param speed
     * @param entity
     * @returns {Cesium.SampledPositionProperty}
     */
    computePositionProperty: function (startTime, positions, uniformSpeed, speed, entity) {
        if (!positions && positions.length < 2) {
            return
        }
        let property = new Cesium.SampledPositionProperty();
        let seconds = 0;
        //是否匀速
        if (uniformSpeed) {
            property.addSample(startTime, Cesium.Cartesian3.fromDegrees(positions[0].lng, positions[0].lat, positions[0].alt));
            positions.forEach(function (item, index) {
                if (index < positions.length - 1) {
                    // GeoInfoTools.Count.countDistanceBetweenTwoPoints(positions[index], positions[index + 1]);
                    let p1 = Cesium.Cartesian3.fromDegrees(positions[index].lng, positions[index].lat, positions[index].alt);
                    let p2 = Cesium.Cartesian3.fromDegrees(positions[index + 1].lng, positions[index + 1].lat, positions[index + 1].alt);
                    let distance = Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2) + Math.pow((p1.z - p2.z), 2));
                    seconds += (distance / speed);
                    // console.log(seconds, (distance / speed));
                    let time = Cesium.JulianDate.addSeconds(startTime, seconds, new Cesium.JulianDate);
                    let position = Cesium.Cartesian3.fromDegrees(positions[index + 1].lng, positions[index + 1].lat, positions[index + 1].alt);
                    // 添加位置，和时间对应
                    property.addSample(time, position);
                }
            })

        } else {
            positions.forEach(function (item, index) {
                let time = Cesium.JulianDate.addSeconds(startTime, item.seconds, new Cesium.JulianDate);
                let position = Cesium.Cartesian3.fromDegrees(item.lng, item.lat, item.alt);
                property.addSample(time, position);
            })
            seconds = positions[positions.length - 1].seconds;
        }
        if (entity) {
            entity.position = property;
            entity.orientation = new Cesium.VelocityOrientationProperty(property);
            entity.availability = new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                start: startTime,
                stop: Cesium.JulianDate.addSeconds(startTime, seconds, new Cesium.JulianDate)
            })]);
        }
        return property;
    },
    /**
     * 添加管线的label 和billboard用于显示信息
     * @param options
     * @returns {void | ActiveX.IXMLDOMNamedNodeMap | number | IDBRequest<IDBValidKey> | DataTransferItem | Promise<void>}
     */
    addPipeLineExplain: function (options) {
        return viewer.entities.add({
            id: options.id || getUUID(),
            name: options.name || "",
            position: Cesium.Cartesian3.fromDegrees(options.position.lng, options.position.lat, options.position.alt),
            billboard: {
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 300),
                image: options.imageUrl,//'../images/billLine2.png',
                show: true, // default
                pixelOffset: new Cesium.Cartesian2(0, 10), // default: (0, 0)
                eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
                horizontalOrigin: Cesium.HorizontalOrigin.RIGHT, // default
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
                // color: Cesium.Color.YELLOW, // default: WHITE
                // width: options.imageWidth || 300, // default: undefined
                // height: options.imageHeight || 100 // default: undefined
            },
            label: {
                position: Cesium.Cartesian3.fromDegrees(options.position.lng, options.position.lat, options.position.alt),
                pixelOffset: new Cesium.Cartesian2(-140, -(options.imageWidth / 2)),
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 300),
                horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                fillColor: new Cesium.Color.fromCssColorString('#ffffff'),
                font: '15px sans-serif',
                outlineColor: new Cesium.Color.fromCssColorString('#000000'),
                outlineWidth: 10,
                text: options.text || ""
            }
        });
    },
    execution: undefined,
    pipeLineLabels: [],
    /**
     * 修改管线feature6、16的颜色和透明度
     * @param tile
     */
    changTileColor: function (tile) {
        let content = tile.content;
        let feature6 = content.getFeature(6);
        let feature16 = content.getFeature(16);
        feature6.color = Cesium.Color.fromCssColorString('rgba(20,166,255,0.5)');
        feature16.color = Cesium.Color.fromCssColorString('rgba(20,166,255,0.5)');
    },
    /**
     * 删除视角旋转
     */
    removeExecution: function () {
        if (GeoInfoTools.execution) {
            viewer.clock.onTick.removeEventListener(GeoInfoTools.execution);
        }
    }
    // end
};


/**
 * UUID
 * @returns {string}
 */
function getUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

/**
 * 旋转环视
 * @param options
 * @returns {TimeExecution}
 */
function flyExtent(options) {
    let seconds = options.seconds || 120;
    let pitch = Cesium.Math.toRadians(options.pitch || -30);
    let angle = 360 / seconds;
    let distance = options.distance || 200;
    let startTime = Cesium.JulianDate.fromDate(new Date());
    let stopTime = Cesium.JulianDate.addSeconds(startTime, seconds, new Cesium.JulianDate());
    viewer.clock.startTime = startTime.clone();
    viewer.clock.stopTime = stopTime.clone();
    viewer.clock.currentTime = startTime.clone(); // 当前时间
    viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; // 行为方式
    viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK; // 时钟设置为当前系统时间; 忽略所有其他设置。
    let initialHeading = viewer.camera.heading;
    GeoInfoTools.execution = function TimeExecution() {
        let delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
        let heading = Cesium.Math.toRadians(delTime * angle) + initialHeading;
        viewer.scene.camera.setView({
            destination: options.position, // 点的坐标
            orientation: {
                heading: heading,
                pitch: pitch,
            }
        });
        viewer.scene.camera.moveBackward(distance);
        // if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
        //     // viewer.clock.onTick.removeEventListener(execution);
        // }
    };
    viewer.clock.onTick.addEventListener(GeoInfoTools.execution);
    return GeoInfoTools.execution;
}

/**
 *为3dties添加裁剪面
 * @param range
 * @param tileset
 */
function tilesetAddClippingPlanes(range, tileset) {
    if ((!range) || (!tileset) || (range.length < 4)) {
        return
    }

    function getInverseTransform(tileSet) {
        let transform = undefined;
        let tmp = tileSet.root.transform;
        if ((tmp && tmp.equals(Cesium.Matrix4.IDENTITY)) || !tmp) {
            // 如果root.transform不存在，则3DTiles的原点变成了boundingSphere.center
            transform = Cesium.Transforms.eastNorthUpToFixedFrame(tileSet.boundingSphere.center)
        } else {
            transform = Cesium.Matrix4.fromArray(tileSet.root.transform)
        }
        return Cesium.Matrix4.inverseTransformation(transform, new Cesium.Matrix4())
    }

    function getOriginCoordinateSystemPoint(point, inverseTransform) {
        let val = Cesium.Cartesian3.fromDegrees(point.lng, point.lat)
        return Cesium.Matrix4.multiplyByPoint(inverseTransform, val, new Cesium.Cartesian3(0, 0, 0))
    }

    function createPlane(p1, p2, inverseTransform) {
        // 将仅包含经纬度信息的p1,p2，转换为相应坐标系的cartesian3对象
        let p1C3 = getOriginCoordinateSystemPoint(p1, inverseTransform)
        let p2C3 = getOriginCoordinateSystemPoint(p2, inverseTransform)
        // 定义一个垂直向上的向量up
        let up = new Cesium.Cartesian3(0, 0, 10)
        //  right 实际上就是由p1指向p2的向量
        let right = Cesium.Cartesian3.subtract(p2C3, p1C3, new Cesium.Cartesian3())
        // 计算normal， right叉乘up，得到平面法向量，这个法向量指向right的右侧
        let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3())
        normal = Cesium.Cartesian3.normalize(normal, normal)
        //由于已经获得了法向量和过平面的一点，因此可以直接构造Plane,并进一步构造ClippingPlane
        let planeTmp = Cesium.Plane.fromPointNormal(p1C3, normal)
        return Cesium.ClippingPlane.fromPlane(planeTmp)
    }

    let inverseTransform = getInverseTransform(tileset);
    let clippingPlanes = new Cesium.ClippingPlaneCollection({
        unionClippingRegions: true
    });
    for (let i = 0; i < range.length; i++) {

        if (i === range.length - 1) {
            clippingPlanes.add(createPlane(range[range.length - 1], range[0], inverseTransform));
        } else {
            clippingPlanes.add(createPlane(range[i], range[i + 1], inverseTransform));
        }

    }
    // clippingPlanes.add(createPlane(range[0], range[1], inverseTransform));
    // clippingPlanes.add(createPlane(range[1], range[2], inverseTransform));
    // clippingPlanes.add(createPlane(range[2], range[3], inverseTransform));
    // clippingPlanes.add(createPlane(range[3], range[0], inverseTransform));
    // tileset.clippingPlanes = clippingPlanes;
    return clippingPlanes;

}

/**
 * 求交点 线面相交 求交点
 * @param line
 * @param polygon
 * @returns {boolean|Array}
 */
function getPointInPolygon(line, polygon) {
    let normal = getNormal(polygon[0], polygon[1], polygon[2]);
    let lineNormal = [];
    let lineX = line[0].x - line[1].x;
    let lineY = line[0].y - line[1].y;
    let lineZ = line[0].z - line[1].z;
    lineNormal.push({ "x": lineX, "y": lineY, "z": lineZ });
    let result = CalPlaneLineIntersectPoint(normal, polygon[1], lineNormal, line[0]);
    if (result) {
        return result;
    }
    return false;
}

/**
 * 求交点是否在区域内部
 * @param point
 * @param polygon
 * @returns {boolean}
 * @constructor
 */
function JudgePointInPolygon(point, polygon) {
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

    return !(VectorMultiplication(n1, n2) * VectorMultiplication(n3, n3) >= 0 && VectorMultiplication(n5, n6) * VectorMultiplication(n7, n8) >= 0);
}

/**
 * 两个向量的叉积和
 * @param n
 * @param m
 * @returns {number}
 * @constructor
 */
function VectorMultiplication(n, m) {
    return n.y * m.z - m.y * n.z + n.z * m.x - n.x * m.z + n.x * m.y - n.y * m.x;
}

/**
 * 求交点是否在线段上
 * @param point
 * @param polyline
 * @returns {boolean}
 * @constructor
 */
function JudgePointInPolyline(point, polyline) {
    let lineLength = Math.sqrt(Math.pow((polyline[0].x - polyline[1].x), 2) + Math.pow((polyline[0].y - polyline[1].y), 2) + Math.pow((polyline[0].z - polyline[1].z), 2));
    let one = Math.sqrt(Math.pow((point.x - polyline[1].x), 2) + Math.pow((point.y - polyline[1].y), 2) + Math.pow((point.z - polyline[1].z), 2));
    let two = Math.sqrt(Math.pow((point.x - polyline[0].x), 2) + Math.pow((point.y - polyline[0].y), 2) + Math.pow((point.z - polyline[0].z), 2));
    let di = one + two - lineLength;
    if (di * 100 < 1) {
        return true;
    }
    return false;

}

/**
 * 求线面交点 线面平行返回undefined
 * @param planeVector 平面的法线向量，长度为3
 * @param planePoint 平面经过的一点坐标，长度为3
 * @param lineVector 直线的方向向量，长度为3
 * @param linePoint 直线经过的一点坐标，长度为3
 * @returns {Array}  返回交点坐标，长度为3
 * @constructor
 */
function CalPlaneLineIntersectPoint(planeVector, planePoint, lineVector, linePoint) {
    let returnResult = [];
    let vp1, vp2, vp3, n1, n2, n3, v1, v2, v3, m1, m2, m3, t, vpt;
    vp1 = planeVector[0].x;
    vp2 = planeVector[0].y;
    vp3 = planeVector[0].z;
    n1 = planePoint.x;
    n2 = planePoint.y;
    n3 = planePoint.z;
    v1 = lineVector[0].x;
    v2 = lineVector[0].y;
    v3 = lineVector[0].z;
    m1 = linePoint.x;
    m2 = linePoint.y;
    m3 = linePoint.z;
    vpt = v1 * vp1 + v2 * vp2 + v3 * vp3;
    //首先判断直线是否与平面平行
    if (vpt == 0) {
        returnResult = undefined;
    } else {
        t = ((n1 - m1) * vp1 + (n2 - m2) * vp2 + (n3 - m3) * vp3) / vpt;
        returnResult.x = m1 + v1 * t;
        returnResult.y = m2 + v2 * t;
        returnResult.z = m3 + v3 * t;
    }
    return returnResult;
}

/**
 * 已知三点坐标，求平面的法向量
 * @param p1
 * @param p2
 * @param p3
 * @returns {[]}
 */
function getNormal(p1, p2, p3) {
    let point = [];
    let x = ((p2.y - p1.y) * (p3.z - p1.z) - (p2.z - p1.z) * (p3.y - p1.y));
    let y = ((p2.z - p1.z) * (p3.x - p1.x) - (p2.x - p1.x) * (p3.z - p1.z));
    let z = ((p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x));
    point.push({ "x": x, "y": y, "z": z });
    return point;
}

/**
 * 根据3个点,计算空间平面的方程
 * Ax+By+Cz+D=0
 * 输入参数:point3fArray---空间中3个点的坐标,大小为3;输入点>3时,只取前3个点
 * 输出参数A,B,C,D
 * 返回值:true---计算成功;false----计算失败
 * @param point3fArray
 * @returns {boolean}
 * @constructor
 */
function GetPanelEquation(point3fArray) {
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

/**
 * canvas 绘制虚线
 * @param ctx
 * @param moveTo
 * @param lineTo
 * @param pattern
 */
function drawDashedLine(ctx, moveTo, lineTo, pattern) {
    ctx.beginPath();
    ctx.setLineDash(pattern);
    ctx.moveTo(moveTo.x, moveTo.y);
    ctx.lineTo(lineTo.x, lineTo.y);
    ctx.stroke();
    ctx.closePath();
    ctx.setLineDash([]);
}


/**
 * 动态创建DIV 和 canvas
 */
function addDivCanvas() {
    let div = document.getElementById("crossAnalysisResultCanvasDiv");
    if (!div) {
        div = document.createElement("div");
        div.id = "crossAnalysisResultCanvasDiv";
        // div.style.position = "absolute";
        // div.style.top = "25%";
        // div.style.left = "25%";
        div.style.backgroundColor = "#ffffff";
        // div.style.zIndex = 999999999;
        div.style.width = "960px";
        div.style.height = "524px";
        div.style.border = "1px #0366bf solid";
        div.style.borderRadius = "6px";
        let canvas = document.createElement("canvas");
        canvas.id = 'crossAnalysisResultCanvas';
        div.append(canvas)
        document.body.appendChild(div);
    }
}

//根据墙实体ID CrossAnalysis横断面分析所有的 polylineVolume
function CrossAnalysis(callback) {
    let wallEntity = viewer.entities.getOrCreateEntity("CrossAnalysis");
    //判断是否有横截面
    if (wallEntity && wallEntity.wall) {
        let wallPositions = wallEntity._wall.positions.getValue(), wallPositions2 = [];
        for (let u in wallPositions) {
            wallPositions2.push(GeoInfoTools.Transform.toDegrees(wallPositions[u]))
        }
        //平面的第三、四点
        wallPositions2.push({ lng: wallPositions2[1].lng, lat: wallPositions2[1].lat, alt: -10 });
        wallPositions2.push({ lng: wallPositions2[0].lng, lat: wallPositions2[0].lat, alt: -10 });
        let polylineVolumes = [], entities = viewer.entities._entities.values;
        //找entities中的管线
        for (let k in entities) {
            if (entities[k] && entities[k].polylineVolume) {
                polylineVolumes.push(entities[k]);
            }
        }

        //截面            相交点
        let polygon = [], intersections = [];
        //将polygon转化成笛卡尔坐标系
        for (let po in wallPositions2) {
            polygon.push(GeoInfoTools.Transform.toCartesian(wallPositions2[po]))
        }
        // console.log(GetPanelEquation(polygon))
        //便利管线进行横断面分析
        if (polylineVolumes.length > 0) {
            //遍历polylineVolumes
            for (let n in polylineVolumes) {
                //获取polylineVolume的位置信息
                let polylineVolumePositions = polylineVolumes[n].polylineVolume.positions.getValue();
                //遍历位置信息
                for (let p = 0; p < polylineVolumePositions.length - 1; p++) {
                    let line = [];
                    line.push(polylineVolumePositions[p]);
                    line.push(polylineVolumePositions[p + 1]);

                    let point = getPointInPolygon(line, polygon);
                    if (point) {
                        if (JudgePointInPolyline(point, line)) {
                            if (JudgePointInPolygon(point, polygon)) {
                                intersections.push(point);
                            }
                        }
                    }
                }

            }
        }

        //交点表示
        // for (let position in intersections) {
        //     addPoint(intersections[position])
        // }

        // console.log(intersections);
        let results = [];
        for (let t in intersections) {
            results.push(GeoInfoTools.Transform.toDegrees(intersections[t]));
        }
        // console.log(results)
        if (results.length > 0) {
            callback(results);
            // getCrossAnalysisResultToContext(results)
        } else {
            //todo 没有横断面的结果
        }

    }

    return undefined;
}




