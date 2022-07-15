/**
 * 生成竖直管道
 * https://blog.csdn.net/qq_39142804/article/details/124598158
 * @param {DataSource} pipeEntityCollection 添加实体的数据源（viewer或自定义）
 * @param {String} id 实体id 
 * @param {Array} positions 实体经纬度[经度, 纬度]
 * @param {Number} height 实体据地面高度，默认为0
 * @param {Number} pipeRadius 管道外径，默认外径0.8、内径为外径的2/3
 * @param {Number} pipeHeight 管道高度， 默认为1.5
 * @param {Number} waterHeight 管道内水高， 默认为0
 * @returns 竖直管道管理对象
 */
function VerticalPipe(pipeEntityCollection, id, positions, height, pipeRadius, pipeHeight, waterHeight) {
	let pipe; // 存储管道实体
	let water; // 存储水实体

	/**
	 * 管道截面形状计算，根据中心点和半径生成圆形
	 * @param {Array} initialPosition [经度, 纬度]
	 * @param {Number} radius 截面半径
	 * @returns 组成截面的点集合
	 */
	function computeCircle(initialPosition, radius) {
		let Ea = 6378137; //   赤道半径
		let Eb = 6356725; // 极半径
		let positionArr = [];
		//cesium正东是0°
		for (let i = 0; i <= 360; i++) {
			let dx = radius * Math.sin((i * Math.PI) / 180.0);
			let dy = radius * Math.cos((i * Math.PI) / 180.0);

			let ec = Eb + ((Ea - Eb) * (90.0 - initialPosition[1])) / 90.0;
			let ed = ec * Math.cos((initialPosition[1] * Math.PI) / 180);

			let BJD = initialPosition[0] + ((dx / ed) * 180.0) / Math.PI; // 圆弧点经度
			let BWD = initialPosition[1] + ((dy / ec) * 180.0) / Math.PI; // 圆弧点纬度

			positionArr.push(BJD);
			positionArr.push(BWD);
		}
		return positionArr;
	}

	// 管道实体
	pipe = pipeEntityCollection.entities.add({
		id: `node_pipe_${id}`,
		name: "pipe",
		position: Cesium.Cartesian3.fromDegrees(positions[0], positions[1]),
		polygon: {
			hierarchy: {
				positions: Cesium.Cartesian3.fromDegreesArray(computeCircle(positions, pipeRadius ? pipeRadius : 0.8)),
				holes: [
					{
						positions: Cesium.Cartesian3.fromDegreesArray(computeCircle(positions, pipeRadius ? (pipeRadius * 3) / 4 : 0.6))
					}
				]
			},
			height: height ? height : 0.0,
			extrudedHeight: height ? (pipeHeight ? height + pipeHeight : height + 1.5) : pipeHeight ? pipeHeight : 1.5,
			material: Cesium.Color.GREEN.withAlpha(0.5)
		}
	});

	// 管道内水实体
	water = pipeEntityCollection.entities.add({
		id: `node_water_${id}`,
		name: "water in the pipe",
		position: Cesium.Cartesian3.fromDegrees(positions[0], positions[1]),
		polygon: {
			hierarchy: {
				positions: Cesium.Cartesian3.fromDegreesArray(computeCircle(positions, pipeRadius ? (pipeRadius * 3) / 4 : 0.6))
			},
			height: height ? height : 0.0,
			extrudedHeight: height ? (waterHeight ? height + waterHeight : height) : waterHeight ? waterHeight : 0,
			material: waterHeight && waterHeight != 0 ? Cesium.Color.BLUE.withAlpha(0.9) : Cesium.Color.TRANSPARENT
		}
	});

	// 初始化水的高度
	if (waterHeight) setWaterHeight(waterHeight);

	// 改变水位高度
	function setWaterHeight(value) {
		let initialHeight = height ? height : 0.0;
		value += initialHeight;
		const tempHeight = height ? (pipeHeight ? height + pipeHeight : height + 1.5) : pipeHeight ? pipeHeight : 1.5;
		if (water.polygon.material.getValue().color.alpha == 0) {
			water.polygon.material = Cesium.Color.BLUE.withAlpha(0.9);
		}
		if (value >= tempHeight) {
			water.polygon.extrudedHeight.setValue(tempHeight);
			pipe.polygon.material = Cesium.Color.RED.withAlpha(0.5);
			return -1;
		}

		water.polygon.extrudedHeight.setValue(value);
		return 0;
	}
	// 获得水位高度
	function getWaterHeight() {
		let totalHeight = parseFloat(water.polygon.extrudedHeight.getValue());
		let initialHeight = height ? height : 0.0;
		return totalHeight - initialHeight;
	}
	// 重置水位高度
	function initWaterHeight() {
		water.polygon.extrudedHeight.setValue(height ? height : 0.0);
		pipe.polygon.material = Cesium.Color.GREEN.withAlpha(0.5);
	}

  // 返回对象
	return {
		pipe,
		water,
		setWaterHeight,
		getWaterHeight,
		initWaterHeight
	};
}

/**
 * 生成水平管道
 * @param {DataSource} pipeEntityCollection 添加实体的数据源（viewer或自定义）
 * @param {String} id 实体id
 * @param {Array} positions 组成管道的点集合[..., 经度, 纬度, 高度, ...]
 * @param {"single" | "both" | "null"} cut 为避免水平管道与垂直管道重叠对水平管道进行裁切，默认不裁切
 * @param {1 | 2 | 3 | 4} status 管道内水位状态， 默认为1
 * @param {Number} pipeRadius 管道外径，默认为0.4、内径为外径的2/3
 * @returns 水平管道管理对象
 */
function HorizontalPipe(pipeEntityCollection, id, positions, cut, status, pipeRadius) {
	let pipe; // 管道对象
	let water; // 水体对象
	let _cut = cut ? cut : "null"; // 裁切方法
	let _status = status ? status : 1; // 管道内水位状态

	/**
	 * 管道截面形状计算，分为四个阶段：1/4弧、半圆、3/4弧、整圆
	 * @param {Number} radius 半径
	 * @param {Number} status 截面阶段
	 * @returns 组成截面的点集合
	 */
	function computeCircle(radius, status) {
		var positions = [];
		let startRad, endRad;
		// 水位截面角度
		switch (status) {
			case 1:
				startRad = 225;
				endRad = 315;
				break;
			case 2:
				startRad = 180;
				endRad = 360;
				break;
			case 3:
				startRad = 135;
				endRad = 405;
				break;
			case 4:
				startRad = 0;
				endRad = 360;
				break;
			default:
				for (let i = 360; i >= 0; i--) {
					let radians = Cesium.Math.toRadians(i);
					positions.push(new Cesium.Cartesian2(insRadius * Math.cos(radians), insRadius * Math.sin(radians)));
				}
		}

		for (let i = startRad; i <= endRad; i++) {
			let radians = Cesium.Math.toRadians(i);
			positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
		}

		return positions;
	}

	/**
	 * 避免水平管道与垂直管道重叠，重新计算初末位置
	 * @param {"pipe" | "water"} type  管道或者水体
	 * @param {"single" | "both" | "null"} cut 单侧裁切、两侧裁切、不裁切
	 * @returns {Array} cartesianPositions
	 */
	function computePos(type, cut) {
		let waterPositions = positions.concat();
		let cartesianPositions;
		if (type == "water") {
			for (let i = 2; i < waterPositions.length; i += 3) {
				waterPositions[i] += 0.4 - 0.25;
			}
			cartesianPositions = new Cesium.Cartesian3.fromDegreesArrayHeights(waterPositions);
		} else if (type == "pipe") {
			cartesianPositions = new Cesium.Cartesian3.fromDegreesArrayHeights(positions);
		}
		const start = cartesianPositions[0];
		const second = cartesianPositions[1];
		const end = cartesianPositions[cartesianPositions.length - 1];
		const secondToLast = cartesianPositions[cartesianPositions.length - 2];
		const startLength = Math.sqrt(Math.pow(start.x - second.x, 2) + Math.pow(start.y - second.y, 2) + Math.pow(start.z - second.z, 2));
		const endLength = Math.sqrt(Math.pow(secondToLast.x - end.x, 2) + Math.pow(secondToLast.y - end.y, 2) + Math.pow(secondToLast.z - end.z, 2));
		const startOffsetX = (0.7 / startLength) * (second.x - start.x);
		const startOffsetY = (0.7 / startLength) * (second.y - start.y);
		const startOffsetZ = (0.7 / startLength) * (second.z - start.z);
		const endOffsetX = (0.7 / endLength) * (secondToLast.x - end.x);
		const endOffsetY = (0.7 / endLength) * (secondToLast.y - end.y);
		const endOffsetZ = (0.7 / endLength) * (secondToLast.z - end.z);

		if (cut == "single") {
			start.x += startOffsetX;
			start.y += startOffsetY;
			start.z += startOffsetZ;
		}
		if (cut == "both") {
			start.x += startOffsetX;
			start.y += startOffsetY;
			start.z += startOffsetZ;
			end.x += endOffsetX;
			end.y += endOffsetY;
			end.z += endOffsetZ;
		}

		return cartesianPositions;
	}

	// 管道实体
	pipe = pipeEntityCollection.entities.add({
		id: `link_pipe_${id}`,
		name: "link pipe",
		polylineVolume: {
			positions: computePos("pipe", _cut),
			// positions: new Cesium.Cartesian3.fromDegreesArrayHeights(startPos.concat(endPos)),
			shape: computeCircle(pipeRadius ? pipeRadius : 0.4, 4),
			material: Cesium.Color.GREEN.withAlpha(0.5)
		}
	});

	// 管道内水实体
	water = pipeEntityCollection.entities.add({
		id: `link_water_${id}`,
		name: "water in the pipe",
		polylineVolume: {
			positions: computePos("water", _cut),
			// positions: new Cesium.Cartesian3.fromDegreesArrayHeights(waterStartPos.concat(waterEndPos)),
			shape: computeCircle(pipeRadius ? (pipeRadius * 2) / 3 : 0.25, _status),
			material: Cesium.Color.BLUE.withAlpha(0.9)
		}
	});

	// 初始化水位高度
	if (status) setStatus(status);

	// 获取水位高度
	function getStatus() {
		return _status;
	}

	// 设置水位高度
	function setStatus(value) {
		let res = 0;
		if (value >= 4) {
			value = 4;
			res = -1;
			pipe.polylineVolume.material = Cesium.Color.RED.withAlpha(0.5);
		}
		water.polylineVolume.shape = computeCircle(pipeRadius ? (pipeRadius * 2) / 3 : 0.25, value);
		_status = value;
		return res;
	}

	// 重置水位高度
	function initStatus() {
		pipe.polylineVolume.material = Cesium.Color.GREEN.withAlpha(0.5);
		water.polylineVolume.shape = computeCircle(pipeRadius ? (pipeRadius * 2) / 3 : 0.25, 1);
		_status = 1;
	}

	return {
		pipe,
		water,
		getStatus,
		setStatus,
		initStatus
	};
}
