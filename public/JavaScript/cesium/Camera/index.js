// view.camera.flyTo({  
//     destination :Cesium.Cartesian3.fromDegrees(116.435314,39.960521, 15000.0), // 设置位置
//     orientation: {    heading :Cesium.Math.toRadians(20.0), // 方向
//       pitch :Cesium.Math.toRadians(-90.0),// 倾斜角度
//       roll :0
//     },  
//     duration:5, // 设置飞行持续时间，默认会根据距离来计算
//     complete:function () {//TODO}, // 到达位置后执行的回调函数
//     cancle:function () {//TODO},   // 如果取消飞行则会调用此函数
//     pitchAdjustHeight:-90, // 如果摄像机飞越高于该值，则调整俯仰俯仰的俯仰角度，并将地球保持在视口中。
//     maximumHeight:5000, // 相机最大飞行高度
//     flyOverLongitude:100, // 如果到达目的地有2种方式，设置具体值后会强制选择方向飞过这个经度(这个，很好用)})


// https://blog.csdn.net/UmGsoil/article/details/74518960
// https://www.cnblogs.com/onsummer/archive/2020/12/08/14105008.html
// http://cesium.coinidea.com/topic/256.html
// https://blog.csdn.net/qq_38870665/article/details/112644937