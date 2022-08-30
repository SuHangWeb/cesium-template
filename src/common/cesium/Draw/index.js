import Entity from "./../Entity"

/**
 * 绘制
 */
class Draw extends Entity {

    /**
     * 绘制点
     * @param {*} params 样式参数
     * @param {*} handler 事件
     * @param {*} callback 回调函数
     */
    createPoint(params, handler, callback) {
        const Cesium = this.Cesium
        const viewer = this.viewer
        const _Entity = new Entity(this.Cesium, this.viewer)
        //鼠标点击事件
        handler.setInputAction((event) => {
            //获取加载地形后对应的经纬度和高程：地标坐标
            var ray = viewer.camera.getPickRay(event.position);
            var cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            if (!Cesium.defined(cartesian)) {
                return;
            }
            const _Point = _Entity.createPoint({
                position: cartesian,
                ...params
            })
            callback({
                entity: _Point,
                entityMsg: "绘制点",
                handlerMsg: "左键",
                msg: "成功",
                code: 200
            })
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
        //鼠标右键点击
        handler.setInputAction((event) => {
            handler = null
            callback({
                entity: undefined,
                entityMsg: "绘制点",
                handlerMsg: "右键",
                msg: "成功",
                code: 201
            })
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    /**
     * 绘制线
     * @param {*} params 样式参数
     * @param {*} handler 事件
     * @param {*} callback 回调函数
     */
    createPolyline(params, handler, callback) {
        const Cesium = this.Cesium
        const _Entity = new Entity(this.Cesium, this.viewer)

        let lineEntity = null; //线实体
        let positions = []; //位置

        /**
         * 选择了椭球或地图，返回世界上椭球或地图表面上的点坐标。如果未选择椭球或地图，则返回undefined
         * @return  Cartesian3
         */
        const pickEllipsoid = (eventPosition) => {
            return this.viewer.scene.camera.pickEllipsoid(
                eventPosition,
                this.viewer.scene.globe.ellipsoid
            );
        };

        //鼠标左键点击
        handler.setInputAction((event) => {
            const cartesian = pickEllipsoid(event.position);
            if (!Cesium.defined(cartesian)) {
                return;
            }
            if (positions.length == 0) {
                //复制此实例
                positions.push(cartesian.clone());
            }
            positions.push(cartesian);
            callback({
                entity: undefined,
                entityMsg: "绘制线",
                handlerMsg: "左键",
                msg: "成功",
                code: 202
            })
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        //鼠标移动
        handler.setInputAction((event) => {
            const cartesian = pickEllipsoid(event.endPosition);
            if (positions.length >= 2) {
                if (!Cesium.defined(lineEntity)) {
                    //值由回调函数延迟计算
                    const _positions = new Cesium.CallbackProperty(() => {
                        return positions;
                    }, false);

                    lineEntity = _Entity.createPolyline({
                        positions: _positions,
                        ...params
                    })
                } else {
                    if (cartesian != undefined) {
                        positions.pop();
                        cartesian.y += 1 + Math.random();
                        positions.push(cartesian);
                    }
                }
                callback({
                    entity: positions,
                    entityMsg: "绘制线",
                    handlerMsg: "移动",
                    msg: "成功",
                    code: 200
                })
            }

        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        //鼠标右键点击
        handler.setInputAction((event) => {
            handler = null
            callback({
                entity: undefined,
                entityMsg: "绘制线",
                handlerMsg: "右键",
                msg: "成功",
                code: 201
            })
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    /**
     * 绘制面
     * @param {*} params 样式参数
     * @param {*} handler 事件
     * @param {*} callback 回调函数
     */
    createPolygon(params, handler, callback) {
        const Cesium = this.Cesium
        const _Entity = new Entity(this.Cesium, this.viewer)
        let tempEntities = [];
        let position = [];
        let tempPoints = [];
        let lineEntity = null; //线实体
        let linePositions = [];

        /**
        * 选择了椭球或地图，返回世界上椭球或地图表面上的点坐标。如果未选择椭球或地图，则返回undefined
        * @return  Cartesian3
        */
        const pickEllipsoid = (eventPosition) => {
            return this.viewer.scene.camera.pickEllipsoid(
                eventPosition,
                this.viewer.scene.globe.ellipsoid
            );
        };


        //左键点击操作
        handler.setInputAction((event) => {
            //调用获取位置信息的接口
            let ray = this.viewer.camera.getPickRay(event.position);
            position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
            if (!Cesium.defined(position)) {
                return;
            }
            tempPoints.push(position);
            let tempLength = tempPoints.length;

            //调用绘制点的接口
            let point = _Entity.createPoint({
                position: position,
                color: Cesium.Color.SKYBLUE,
                pixelSize: 10,
                outlineColor: Cesium.Color.YELLOW,
                outlineWidth: 3,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            })
            tempEntities.push(point);
            if (tempLength > 1) {
                // function drawPolyline(positions) {
                //     if (positions.length < 1) return;
                //     //值由回调函数延迟计算
                //     const _positions = new Cesium.CallbackProperty(() => {
                //         return positions;
                //     }, false);

                //     return _Entity.createPolyline({
                //         positions: _positions,
                //         // width: 5.0,
                //         // material: new Cesium.PolylineGlowMaterialProperty({
                //         //     color: Cesium.Color.GOLD,
                //         // }),
                //         // depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
                //         //     color: Cesium.Color.GOLD,
                //         // }),
                //         // clampToGround: true,
                //     })
                // }
                // let pointline = drawPolyline([tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1]]);
                // tempEntities.push(pointline);
            } else {
                // tooltip.innerHTML = "请绘制下一个点，右键结束";
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        //鼠标移动事件
        handler.setInputAction((event) => {
            const cartesian = pickEllipsoid(event.endPosition);

            if (!Cesium.defined(lineEntity)) {
                //值由回调函数延迟计算
                const _positions = new Cesium.CallbackProperty(() => {
                    return tempPoints;
                }, false);

                lineEntity = _Entity.createPolyline({
                    positions: _positions,
                    material: Cesium.Color.RED,
                    width: 2,
                })

            } else {
                if (cartesian != undefined) {
                    tempPoints.pop();
                    cartesian.y += 1 + Math.random();
                    tempPoints.push(cartesian);
                }
            }

            let tempLength = tempPoints.length;
            if (tempLength >= 3) {
                const _Polygon = _Entity.createPolygon({
                    hierarchy: new Cesium.CallbackProperty((time, result) => {
                        return new Cesium.PolygonHierarchy(tempPoints, null)
                    }, false),
                    material: Cesium.Color.fromCssColorString("#FFD700").withAlpha(.2)
                })
                tempEntities.push(_Polygon);
            }
            callback({
                entity: undefined,
                entityMsg: "绘制面",
                handlerMsg: "移动",
                msg: "成功",
                code: 202
            })
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        //鼠标右键点击
        handler.setInputAction((event) => {

            const _positions = new Cesium.CallbackProperty(() => {
                return [tempPoints[tempPoints.length - 1], tempPoints[0]];
            }, false);

            lineEntity = _Entity.createPolyline({
                positions: _positions,
                material: Cesium.Color.RED,
                width: 2,
            })
            tempEntities.push(lineEntity);

            handler = null
            callback({
                entity: tempEntities,
                entityMsg: "绘制面",
                handlerMsg: "右键",
                msg: "成功",
                code: 200
            })
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    /**
     * 绘制矩形
     * @param {*} params 样式参数
     * @param {*} handler 事件
     * @param {*} callback 回调函数
     */
    createRectangle(params, handler, callback) {
        const Cesium = this.Cesium
        const _Entity = new Entity(this.Cesium, this.viewer)
        let startPoint = null;
        let rect = null;

        //进制地图移动
        this.viewer.scene.screenSpaceCameraController.enableRotate = false;
        this.viewer.scene.screenSpaceCameraController.enableZoom = false;

        //鼠标点击事件
        handler.setInputAction((event) => {
            //获取加载地形后对应的经纬度和高程：地标坐标
            const ray = this.viewer.camera.getPickRay(event.position);
            const cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);

            if (!Cesium.defined(cartesian)) {
                return;
            }

            startPoint = _Entity.createPoint({
                position: cartesian,
                color: Cesium.Color.SKYBLUE,
                pixelSize: 10,
                outlineColor: Cesium.Color.YELLOW,
                outlineWidth: 3,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            })

            rect = _Entity.createRectangle({
                coordinates: Cesium.Rectangle.fromCartesianArray([cartesian, cartesian]),
                material: Cesium.Color.GREENYELLOW.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 3
            })


        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

        // 对鼠标移动事件的监听
        handler.setInputAction((event) => {
            if (startPoint == null || rect == null) {
                return;
            }
            //获取加载地形后对应的经纬度和高程：地标坐标
            const ray = this.viewer.camera.getPickRay(event.endPosition);
            const cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
            if (!cartesian) {
                return;
            }
            const startCartesian = startPoint.position.getValue(Cesium.JulianDate.now());

            rect.rectangle.coordinates = new Cesium.CallbackProperty((time, result) => {
                return Cesium.Rectangle.fromCartesianArray([startCartesian, cartesian]);
            }, false);

        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


        // 对鼠标抬起事件的监听(结束点采集)
        handler.setInputAction((event) => {
            //鼠标变成默认
            this.viewer.scene.screenSpaceCameraController.enableRotate = true;
            this.viewer.scene.screenSpaceCameraController.enableZoom = true;
            this.viewer.entities.remove(startPoint);
            //移除地图鼠标点击事件
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN)
            //移除地图鼠标移动事件
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
            //移除地图鼠标抬起事件
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP)

            handler = null


            var dke = rect.rectangle.coordinates.getValue();
            // console.log("修改后的面坐标(笛卡尔)：", dke);
            var east = Cesium.Math.toDegrees(dke.east);
            var west = Cesium.Math.toDegrees(dke.west);
            var north = Cesium.Math.toDegrees(dke.north);
            var south = Cesium.Math.toDegrees(dke.south);
            // console.log("矩形西南东北坐标:", west, south, east, north);
            callback({
                entity: rect,
                entityMsg: "绘制矩形",
                handlerMsg: "左键抬起",
                msg: "成功",
                code: 200,
                data: `矩形西南东北坐标:${west},${south},${east},${north}；笛卡尔：${JSON.stringify(dke)}`
            })
        }, Cesium.ScreenSpaceEventType.LEFT_UP);

    }


    /**
     * 绘制圆
     * @param {*} params 样式参数
     * @param {*} handler 事件
     * @param {*} callback 回调函数
     */
    createEllipse(params, handler, callback) {
        const Cesium = this.Cesium
        const _Entity = new Entity(this.Cesium, this.viewer)

        //中心点
        let centerPoint = null;
        //采集的圆对象
        let ellipseGather = null;

        //进制地图移动
        this.viewer.scene.screenSpaceCameraController.enableRotate = false;
        this.viewer.scene.screenSpaceCameraController.enableZoom = false;

        //鼠标点击事件
        handler.setInputAction((event) => {
            //获取加载地形后对应的经纬度和高程：地标坐标
            const ray = this.viewer.camera.getPickRay(event.position);
            const cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);

            if (!Cesium.defined(cartesian)) {
                return;
            }

            centerPoint = _Entity.createPoint({
                position: cartesian,
                color: Cesium.Color.SKYBLUE,
                pixelSize: 10,
                outlineColor: Cesium.Color.YELLOW,
                outlineWidth: 3,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            })

            //默认生成半径为0.1米的圆。
            ellipseGather = _Entity.createEllipse({
                position: cartesian,
                semiMinorAxis: 0.1, //椭圆短轴（单位米）
                semiMajorAxis: 0.1, //椭圆长轴（单位米）
                material: Cesium.Color.GREENYELLOW.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 3
            })

        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

        // 对鼠标移动事件的监听
        handler.setInputAction((event) => {
            if (centerPoint == null || ellipseGather == null) {
                return;
            }
            //获取加载地形后对应的经纬度和高程：地标坐标
            const ray = this.viewer.camera.getPickRay(event.endPosition);
            const radiusCartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
            if (!radiusCartesian) {
                return;
            }
            const centerCartesian = centerPoint.position.getValue(Cesium.JulianDate.now());
            //计算移动点与中心点的距离（单位米）
            const centerTemp = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(centerCartesian);
            const radiusTemp = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(radiusCartesian);
            const geodesic = new Cesium.EllipsoidGeodesic();
            geodesic.setEndPoints(centerTemp, radiusTemp);
            const radius = geodesic.surfaceDistance;
            //如果半径小于0,则不更新圆信息
            if (radius <= 0) {
                return;
            }
            ellipseGather.ellipse.semiMinorAxis = new Cesium.CallbackProperty((time, result) => {
                return radius;
            }, false);
            ellipseGather.ellipse.semiMajorAxis = new Cesium.CallbackProperty((time, result) => {
                return radius;
            }, false);

        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        // 对鼠标抬起事件的监听(结束点采集)
        handler.setInputAction((event) => {
            //开始鼠标操作地图
            this.viewer.scene.screenSpaceCameraController.enableRotate = true;
            this.viewer.scene.screenSpaceCameraController.enableZoom = true;
            //移除地图鼠标点击事件
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN)
            //移除地图鼠标移动事件
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
            //移除地图鼠标抬起事件
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP)
            // const ellipsoid = this.viewer.scene.globe.ellipsoid;
            // const cartographic = ellipsoid.cartesianToCartographic(centerPoint.position.getValue(Cesium.JulianDate
            //     .now()));
            // const lat = Cesium.Math.toDegrees(cartographic.latitude);
            // const lng = Cesium.Math.toDegrees(cartographic.longitude);
            // const height = cartographic.height;
            // console.log("圆中心点：经度", lng + ",纬度：" + lat + ",高度：" + height);
            // console.log("圆半径：", ellipseGather.ellipse.semiMinorAxis.getValue() + "米");
            //如果圆半径小于0.5米则删除，防止出现默认为0.1米的被采集。该种情况则是用户取消圆采集
            if (ellipseGather.ellipse.semiMinorAxis.getValue() < 0.5) {
                this.viewer.entities.remove(ellipseGather);
                ellipseGather = null;
            }
            //清除圆中心点和半径点
            this.viewer.entities.remove(centerPoint);
            centerPoint = null;

            callback({
                entity: ellipseGather,
                entityMsg: "绘制圆",
                handlerMsg: "左键抬起",
                msg: "成功",
                code: 200,
            })
        }, Cesium.ScreenSpaceEventType.LEFT_UP);

    }

    /**
    * 绘制箭头
    * @param {*} params 样式参数
    * @param {*} handler 事件
    * @param {*} callback 回调函数
    */
    createArrow(params, handler, callback) {
        const Cesium = this.Cesium
        const _Entity = new Entity(this.Cesium, this.viewer)

        let gatherPosition = []; //采集的点信息
        let floatingPoint = null; //移动点
        let layerId = "straightArrowLayer";

        //左键点击
        handler.setInputAction((event) => {
            const position = event.position;
            if (!Cesium.defined(position)) {
                return;
            }
            const ray = this.viewer.camera.getPickRay(position);
            if (!Cesium.defined(ray)) {
                return;
            }
            const cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
            if (!Cesium.defined(cartesian)) {
                return;
            }

            if (gatherPosition.length == 0) {
                gatherPosition.push(cartesian);
                floatingPoint = createPoint(cartesian, -1);
                showRegion2Map();
            }


        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
}
export default Draw