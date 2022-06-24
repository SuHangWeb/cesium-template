# 飞行定位方法

参考：https://blog.csdn.net/weixin_39150852/article/details/119676613

## viewer类：

viewer.flyTo(target, options) 有飞行动画效果，pitch非默认值时推荐使用
viewer.zoomTo(target, options) 直接定位至目标点
viewer.trackedEntity = entity 视角会锁定到设定目标实体
可通过viewer.trackedEntity = undefined 取消视角锁定

## camera类：

viewer.camera.flyTo(options) 有飞行动画效果
viewer.camera.flyToBoundingSphere(boundingSphere, options) 有飞行动画效果
viewer.camera.setView(options)
viewer.camera.lookAt(target, offset) 视角会锁定到设定目标位置
viewer.camera.lookAtTransform(transform, offset) 常用于四维矩阵定位
可通过viewer.camera.lookAtTransform(Matrix4.IDENTITY)取消lookAt视角锁定
viewer.camera.twistLeft(cMath.PI_OVER_SIX) 弧度制，相机逆时针旋转一定角度
viewer.camera.twistRight(cMath.PI_OVER_SIX) 弧度制，相机顺时针旋转一定角度
viewer.camera.zoomIn(5000) 相机放大一定距离
viewer.camera.zoomOut(5000) 相机缩小一定距离
viewer.camera.move(direction, amount) 相机沿指定方向移动一定距离
viewer.camera.moveForward(5000) 相机向后一定距离
viewer.camera.moveBackward(5000) 相机向前一定距离
viewer.camera.moveUp(5000) 相机向上移动一定距离
viewer.camera.moveDown(5000) 相机向下移动一定距离
viewer.camera.moveLeft(5000) 相机向左移动一定距离
viewer.camera.moveRight(5000) 相机向右移动一定距离


## 位置参数：

pitch：俯仰角，默认-90（弧度）—— 前后空翻
heading：偏航角，默认0（弧度）—— 左右方向
roll：翻滚角，默认0（弧度）—— 侧空翻
range：范围（米）—— 距离目标的距离