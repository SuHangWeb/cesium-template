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

        //鼠标移动事件
        handler.setInputAction((movement) => {
            callback({
                entity: undefined,
                entityMsg: "绘制面",
                handlerMsg: "移动",
                msg: "成功",
                code: 202
            })
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        //左键点击操作
        handler.setInputAction((event) => {
            //调用获取位置信息的接口
            let ray = this.viewer.camera.getPickRay(event.position);
            position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
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

                function drawPolyline(positions) {
                    if (positions.length < 1) return;
                    //值由回调函数延迟计算
                    const _positions = new Cesium.CallbackProperty(() => {
                        return positions;
                    }, false);
                    return _Entity.createPolyline({
                        positions: _positions,
                        // width: 5.0,
                        // material: new Cesium.PolylineGlowMaterialProperty({
                        //     color: Cesium.Color.GOLD,
                        // }),
                        // depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
                        //     color: Cesium.Color.GOLD,
                        // }),
                        // clampToGround: true,
                    })
                }
                let pointline = drawPolyline([tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1]]);
                tempEntities.push(pointline);
            } else {
                // tooltip.innerHTML = "请绘制下一个点，右键结束";
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
}
export default Draw