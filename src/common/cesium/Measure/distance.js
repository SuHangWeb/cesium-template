import MeasureCommon from "./common"
/**
 * 距离
 */
class Distance extends MeasureCommon {
    positions = [];
    tempPositions = [];
    vertexEntities = []; //线节点
    labelEntity = undefined;
    measureDistance = 0; //测量结果

    activate() {
        this.deactivate();
        this.registerEvents(); //注册鼠标事件
        //设置鼠标状态 
        this.viewer.enableCursorStyle = false;
        this.viewer._element.style.cursor = 'default';
        this.isMeasure = true;
        this.measureDistance = 0;
    }
    //禁用
    deactivate() {
        if (!this.isMeasure) return;
        this.unRegisterEvents();
        this.viewer._element.style.cursor = 'pointer';
        this.viewer.enableCursorStyle = true;
        this.isMeasure = false;
        this.tempPositions = [];
        this.positions = [];
    }
    //注册鼠标事件
    registerEvents() {
        this.leftClickEvent();
        this.rightClickEvent();
        this.mouseMoveEvent();
    }
    //解除鼠标事件
    unRegisterEvents() {
        const Cesium = this.Cesium
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }

    //左键点击事件
    leftClickEvent() {
        const Cesium = this.Cesium
        //单击鼠标左键画点点击事件
        this.handler.setInputAction(e => {
            this.viewer._element.style.cursor = 'default';
            let position = this.viewer.scene.pickPosition(e.position);
            if (!position) {
                const ellipsoid = this.viewer.scene.globe.ellipsoid;
                position = this.viewer.scene.camera.pickEllipsoid(e.position, ellipsoid);
            }
            if (!position) return;
            this.positions.push(position);
            if (this.positions.length == 1) { //首次点击  
                this.createLineEntity()
                this.createStartEntity();
                return;
            }
            this.createVertex();
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    //鼠标移动事件
    mouseMoveEvent() {
        const Cesium = this.Cesium
        this.handler.setInputAction(e => {
            if (!this.isMeasure) return;
            this.viewer._element.style.cursor = 'default';
            let position = this.viewer.scene.pickPosition(e.endPosition);
            if (!position) {
                position = this.viewer.scene.camera.pickEllipsoid(e.startPosition, this.viewer.scene.globe.ellipsoid);
            }
            if (!position) return;
            this.handleMoveEvent(position);
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }

    //处理鼠标移动
    handleMoveEvent(position) {
        if (this.positions.length < 1) return;
        this.tempPositions = this.positions.concat(position);
    }

    //右键事件
    rightClickEvent() {
        const Cesium = this.Cesium
        this.handler.setInputAction(e => {
            if (!this.isMeasure || this.positions.length < 1) {
                this.deactivate();
                this.clear();
            } else {
                this.createEndEntity();
                this.lineEntity.polyline = {
                    positions: this.positions,
                    width: 2,
                    material: Cesium.Color.YELLOW,
                    depthFailMaterial: Cesium.Color.YELLOW
                };
                this.measureEnd();
            }

        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    //测量结束
    measureEnd() {
        this.deactivate();
        this.MeasureEndEvent.raiseEvent(this.measureDistance); //触发结束事件 传入结果
        console.log(this.viewer)
    }

    //清空绘制
    clear() {
        //清除线对象
        this.viewer.entities.remove(this.lineEntity);
        this.lineEntity = undefined;

        //清除节点
        this.vertexEntities.forEach(item => {
            this.viewer.entities.remove(item);
        });
        this.vertexEntities = [];
    }

    //创建线对象
    createLineEntity() {
        const Cesium = this.Cesium
        this.lineEntity = this.viewer.entities.add({
            polyline: {
                positions: new Cesium.CallbackProperty(e => {
                    return this.tempPositions;
                }, false),
                width: 2,
                material: Cesium.Color.YELLOW,
                depthFailMaterial: Cesium.Color.YELLOW
            }
        })
    }
    /**
     * 计算距离
     * @param {*} positions 
     * @returns 
     */
    spaceDistance(positions) {
        const _len = positions.length
        let _Number = 0
        for (let i = 1; i < _len; i++) {
            _Number += Number(this.get_distance(positions[i - 1], positions[i]))
        }
        if (_Number > 1000) {
            return `${(_Number / 1000).toFixed(2)}公里`
        } else {
            return `${_Number.toFixed(2)}米`
        }

    }
    //创建线节点
    createVertex() {
        const Cesium = this.Cesium
        let vertexEntity = this.viewer.entities.add({
            position: this.positions[this.positions.length - 1],
            id: "MeasureDistanceVertex" + this.positions[this.positions.length - 1],
            type: "MeasureDistanceVertex",
            label: {
                text: this.spaceDistance(this.positions),
                scale: 0.5,
                font: 'normal 24px MicroSoft YaHei',
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
                scaleByDistance: new Cesium.NearFarScalar(1000, 1, 3000, 0.4),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                pixelOffset: new Cesium.Cartesian2(0, -30),
                outlineWidth: 9,
                outlineColor: Cesium.Color.WHITE
            },
            point: {
                color: Cesium.Color.FUCHSIA,
                pixelSize: 8,
                disableDepthTestDistance: 500,
            },
        });
        this.vertexEntities.push(vertexEntity);
    }

    //创建起点
    createStartEntity() {
        const Cesium = this.Cesium
        let vertexEntity = this.viewer.entities.add({
            position: this.positions[0],
            type: "MeasureDistanceVertex",
            billboard: {
                image: process.env.VUE_APP_PUBLIC_URL + "/image/start.png",
                scaleByDistance: new Cesium.NearFarScalar(300, 1, 1200, 0.4), //设置随图缩放距离和比例
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000), //设置可见距离 10000米可见
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            point: {
                color: Cesium.Color.FUCHSIA,
                pixelSize: 6,
            },
        });
        this.vertexEntities.push(vertexEntity);
    }

    //创建终点节点
    createEndEntity() {
        const Cesium = this.Cesium
        //结束时删除最后一个节点的距离标识
        let lastLabel = this.viewer.entities.getById("MeasureDistanceVertex" + this.positions[this.positions.length - 1]);
        this.viewer.entities.remove(lastLabel);
        this.viewer.entities.remove(this.moveVertexEntity);

        let vertexEntity = this.viewer.entities.add({
            position: this.positions[this.positions.length - 1],
            type: "MeasureDistanceVertex",
            label: {
                text: "总距离：" + this.spaceDistance(this.positions),
                scale: 0.5,
                font: 'normal 26px MicroSoft YaHei',
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
                scaleByDistance: new Cesium.NearFarScalar(1000, 1, 3000, 0.4),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                pixelOffset: new Cesium.Cartesian2(0, -50),
                outlineWidth: 9,
                outlineColor: Cesium.Color.WHITE,
                eyeOffset: new Cesium.Cartesian3(0, 0, -10)
            },
            billboard: {
                image: process.env.VUE_APP_PUBLIC_URL + "/image/end.png",
                scaleByDistance: new Cesium.NearFarScalar(300, 1, 1200, 0.4), //设置随图缩放距离和比例
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000), //设置可见距离 10000米可见
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            point: {
                color: Cesium.Color.FUCHSIA,
                pixelSize: 6,
            },
        });
        this.vertexEntities.push(vertexEntity);
    }
}
export default Distance