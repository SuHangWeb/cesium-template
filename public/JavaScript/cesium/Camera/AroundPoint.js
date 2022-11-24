/*
 * 相机绕点旋转
https://blog.csdn.net/weixin_45782925/article/details/124649736
 let aroundPoint = new AroundPoint(viewer, 0.2, new Cesium.Cartesian3.fromDegrees(103.62416890925606, 28.782654034074834, 1300));
 aroundPoint.start();
 https://blog.csdn.net/qq_18144905/article/details/99828843?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-99828843-blog-118155872.pc_relevant_3mothn_strategy_and_data_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-99828843-blog-118155872.pc_relevant_3mothn_strategy_and_data_recovery&utm_relevant_index=5
 */
class AroundPoint {
    constructor(viewer, amount, position, height = 5000.0) {
        this._viewer = viewer;
        this._amount = amount;
        this._position = position;
        this._height = height;
    }

    _bindEvent() {
        this._viewer.clock.onTick.addEventListener(this._aroundPoint, this);
    }

    _unbindEvent() {
        this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        this._viewer.clock.onTick.removeEventListener(this._aroundPoint, this);
    }

    start() {
        this._viewer.clock.shouldAnimate = true;
        this._unbindEvent();
        this._bindEvent();
        return this;
    }

    stop() {
        this._unbindEvent();
        return this;
    }

    // 相机绕点旋转函数
    _aroundPoint() {
        let heading = this._viewer.camera.heading;
        let pitch = this._viewer.camera.pitch;


        heading += Cesium.Math.toRadians(this._amount);
        if (heading >= Math.PI * 2 || heading <= -Math.PI * 2) {
            heading = 0;
        }

        this._viewer.camera.lookAt(
            this._position,
            new Cesium.HeadingPitchRange(
                heading,
                pitch,
                this._height
            )
        )
    }
}
