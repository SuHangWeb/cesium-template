/**
 * @function :根据传入参数实时更新模型的的位置和姿态
 * @datetime：2019-2-22 11:07:51
 * @author:一梦
 * @param {*} modelURL  模型url
 * @param {*} isShowInfo 是否显示鼠标当前位置的的经度纬度高程信息
 * @param {*} longitude 经度
 * @param {*} latitude 纬度
 * @param {*} height 高程
 * @param {*} heading 俯仰角
 * @param {*} pitch 偏航角
 * @param {*} roll 滚转角
 */
function doScene(modelURL, isShowInfo, longitude, latitude, height, heading, pitch, roll) {
    if (isShowInfo == true) {
        var showInfoHtml = document.getElementById("showInfo");
        showInfoHtml.innerHTML = '<div id = "latlng_show" style="120px;height:500px;position:absolute;top:10px;left:20px;z-index:1;font-size:15px;">' +
            '<div style="100px;height:30px;float: left;">' +
            '<font size="1" color="white">经　度: <span id="longitude_show"></span></font>' +
            '</div>' +
            '<div style="100px;height:30px;float:left;">' +
            '<font size="1" color="white">维　度: <span id="latitude_show"></span></font>' +
            '</div>' +
            '<div style="120px;height:30px;float:left;">' +
            '<font size="1" color="white">视角高: <span id="altitude_show"></span>km</font>' +
            '</div>' +
            '</div>';
        //经度纬度高程数据显示
        var longitude_show = document.getElementById("longitude_show");
        var latitude_show = document.getElementById("latitude_show");
        var altitude_show = document.getElementById("altitude_show");
        var canvas = viewer.scene.canvas;

        var ellipsoid = viewer.scene.globe.ellipsoid;
        var handler = new Cesium.ScreenSpaceEventHandler(canvas);

        handler.setInputAction(function (movement) {
            var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
            if (cartesian) {
                var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                var lat_String = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
                var log_String = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
                var alti_String = (viewer.camera.positionCartographic.height / 1000).toFixed(2);
                longitude_show.innerHTML = log_String;
                latitude_show.innerHTML = lat_String;
                altitude_show.innerHTML = alti_String;
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    }

    //指定位置
    var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);

    //指定姿态
    var hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(heading), Cesium.Math.toRadians(pitch), Cesium.Math.toRadians(roll));
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    //viewer.entities.removeAll();
    var entity = viewer.entities.add({
        id: "myEntity",
        //自己指定的位置
        position: position,

        //使用自己指定的姿态角
        orientation: orientation,

        model: {
            uri: modelURL,  //飞机模型
            minimumPixelSize: 64
        },

        //Show the path as a pink line sampled in 1 second increments.
        path: {
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 1.0,
                color: Cesium.Color.YELLOW
            }),
            width: 1

        }
    });

    //设置视点
    //viewer.zoomTo(viewer.entities, new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90),7500000));

    //隐藏版权信息
    viewer._cesiumWidget._creditContainer.style.display = "none";

}