import * as turf from '@turf/turf'

class Turf {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }
    /**
     * 笛卡尔坐标系转WGS84坐标系
     * @param point
     * @return {{lat: *, lng: *, alt: *}}
     * @constructor
     */
    Cartesian3_to_WGS84(point) {
        const Cesium = this.Cesium
        var cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        var lng = Cesium.Math.toDegrees(cartographic.longitude);
        var alt = cartographic.height;
        // return { lng: lng, lat: lat, alt: alt };
        return [lng, lat]
    }
    /**
     * 计算两点之间的距离
     * @param {*} from 
     * @param {*} to 
     * @param {*} units {units：degrees, radians, miles,  kilometers} 度、弧度、英里、公里 为单位计算两点之间的距离。
     */
    distance(from, to, units = "kilometers") {
        const _result = turf.distance(turf.point(this.Cartesian3_to_WGS84(from)), turf.point(this.Cartesian3_to_WGS84(to)), { units });
        return (_result * 1000).toFixed(2)
    }
}

export default Turf

/* <html lang="en">
<head>
    <meta charset="UTF-8"/>
    <script src="Build/Cesium/Cesium.js"></script>
    <link rel="stylesheet" href="Build/Cesium/Widgets/widgets.css">
    <script src="initMap.js"></script>
    <script>
         

        var viewer=null;

        function load() {
            console.log("Cesium:",window.Cesium);
          //初始化地图
            initMap();
            //重点，必须设置该配置
            viewer.scene.globe.depthTestAgainstTerrain = true;
            //定位
            var obj = {lng:118.1050887298584, lat: 24.449001083374023,eyeHeight:5000,pitch:-20,heading:0.0,time:1};
            viewerFlyToLonLat(obj);

        }

        //世界坐标-->经纬度（先转弧度，再转经纬度）
        function cartesianToLngLat() {
          //该测试值为function lngLatToCartesian()所执行的结果
          var x = -2739531.1065610424;
          var y = 5133901.101058983;
          var z = 2626765.040376103;
          var ellipsoid = viewer.scene.globe.ellipsoid;
          var cartesian3 = new Cesium.Cartesian3(x, y, z);
          var cartographic = ellipsoid.cartesianToCartographic(cartesian3);
          var lat = Cesium.Math.toDegrees(cartographic.latitude);
          var lng = Cesium.Math.toDegrees(cartographic.longitude);
          var height = cartographic.height;
          console.log("世界坐标："+x+","+y+","+z);
          console.log("世界坐标-->经纬度");
          console.log("经纬度：:"+lng + "," + lat + "," + height);
        }
        //经纬度-->世界坐标（先转弧度，再转世界坐标）
        function lngLatToCartesian() {
          var lng = 118.0850887298584;
          var lat = 24.439001083374023;
          var height = 10000;
          //方法1：直接转换
          console.log("经纬度：:"+lng + "," + lat + "," + height);
          var cartesian1 = Cesium.Cartesian3.fromDegrees(lng, lat, height);
          console.log("方法1：经纬度-->世界坐标：", cartesian1);
          //方法2：先转换成弧度再转换成世界坐标
          var ellipsoid = viewer.scene.globe.ellipsoid;
          var cartographic = Cesium.Cartographic.fromDegrees(lng, lat, height);
          var cartesian2 = ellipsoid.cartographicToCartesian(cartographic);
          console.log("方法2：经纬度-->世界坐标：", cartesian2);
        }

        	




    	
    </script>
</head>
<body onload="load()" >
    <div id="map" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></div>
    <input type="button" value="笛卡尔坐标（世界坐标）转经纬度" onclick="cartesianToLngLat()"  style="position:absolute;left:50px;top:50px;background: blue;color:white;z-index: 9999;font-size: 24px"/>
    <input type="button" value="经纬度转笛卡尔坐标（世界坐标）" onclick="lngLatToCartesian()"  style="position:absolute;left:50px;top:100px;background: blue;color:white;z-index: 9999;font-size: 24px"/>

</body>
</html> */

