/**
 * 多线段柱体
 * 使用方法如下 
   const _PolylineVolume = new PolylineVolume(cenium上下文,场景viewer)
    _PolylineVolume.方法函数(根据当前方法所需参数进行传递)
    
    方法目录如下：

    方法名称 | 概要
    --- | ---
    circleShape | 圆形
    circleStar | 星形 可以根据参数产生 菱形
    circleRectangle | 矩形
    circleTriangle | 三角形
    circlePentagonal | 五角形
 */

class PolylineVolume {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }

    /**
     * 圆形
     * @param {Number} radius 半径
     * @param {Number} status 默认：1 
     * 说明：1 = 整圆 、2 = 1/4圆、3 = 半圆、 4 = 3/4圆 5、环形 默认内环半径是外部半径的 1/2
     * @param {Number} insRadius 内部中空半径
     */
    circleShape(radius, status = 1, insRadius) {
        const Cesium = this.Cesium;
        let positions = [];
        let startRad, endRad;

        if (status == 1) {
            startRad = 0;
            endRad = 360;
        }
        if (status == 2) {
            startRad = 225;
            endRad = 315;
        }
        if (status == 3) {
            startRad = 180;
            endRad = 360;
        }
        if (status == 4) {
            startRad = 135;
            endRad = 405;
        }
        if (status == 5) {
            startRad = 0;
            endRad = 360;
            insRadius = insRadius ? insRadius : radius / 2
            for (let i = 360; i >= 0; i--) {
                let radians = Cesium.Math.toRadians(i);
                positions.push(
                    new Cesium.Cartesian2(
                        insRadius * Math.cos(radians),
                        insRadius * Math.sin(radians)
                    )
                );
            }
        }

        for (let i = startRad; i <= endRad; i++) {
            let radians = Cesium.Math.toRadians(i);
            positions.push(
                new Cesium.Cartesian2(
                    radius * Math.cos(radians),
                    radius * Math.sin(radians)
                )
            );
        }

        return positions;
    }
    /**
     * 星形 (玩法很多 还可以根据参数来定制 菱形)
     * @param {Number} radius 半径
     * @param {Number} insRadius 内角半径
     * @param {Number} arms 角的数量
     */
    circleStar(radius, insRadius, arms) {
        const Cesium = this.Cesium;
        const angle = Math.PI / arms;
        const length = 2 * arms;
        const positions = new Array(length);
        for (let i = 0; i < length; i++) {
            const r = i % 2 === 0 ? radius : insRadius;
            positions[i] = new Cesium.Cartesian2(
                Math.cos(i * angle) * r,
                Math.sin(i * angle) * r
            );
        }
        return positions;
    }
    /**
     * 矩形
     * @param {Number} radius 半径
     */
    circleRectangle(radius) {
        const Cesium = this.Cesium;
        return [
            new Cesium.Cartesian2(-radius, -radius),
            new Cesium.Cartesian2(radius, -radius),
            new Cesium.Cartesian2(radius, radius),
            new Cesium.Cartesian2(-radius, radius),
        ]
    }
    /**
     * 三角形
     * @param {Number} radius 半径
     */
    circleTriangle(radius) {
        const Cesium = this.Cesium;
        return [
            new Cesium.Cartesian2(-radius, -radius),
            new Cesium.Cartesian2(radius, radius),
            new Cesium.Cartesian2(radius, -radius),
        ]
    }
    /**
     * 五角形
     * @param {Number} radius 半径
     */
    circlePentagonal(radius) {
        const Cesium = this.Cesium;
        return [
            new Cesium.Cartesian2(-(radius / 2), 0),
            new Cesium.Cartesian2((radius / 2), 0),
            new Cesium.Cartesian2(radius, radius),
            new Cesium.Cartesian2(0, radius * 2),
            new Cesium.Cartesian2(-radius, radius)
        ]
    }

}

export default PolylineVolume