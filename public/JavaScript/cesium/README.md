# Cesium 二次封装

## 目录 （方法文件 上方有使用方法）

```
┌─Tripartite                        三方依赖库
│  ├─bignumber                      精度计算
│  ├─geojson                        json转geojson
│  ├─gcoord                         坐标系转换
│  ├─layui                          ui
│  ├─layer                          提示
│  ├─mock                           数据模拟
│  ├─cesium-navigation              罗盘
│  ├─xy-ui                          ui库
│  ├─dat.gui                        可视化工具
│  ├─heatmap                        热力图
│  ├─turf                           地理空间分析库，处理各种地图算法
│  └─uuid-js                        生成唯一id
├─Layer                             图层
├─effects                           效果
├─Map                               地图
│  ├─Baidu                          百度  
│  └─Gaode                          高德
├─Draw                              绘制
│  ├─straightArrow                  直线箭头  
│  └─index                          入口 
├─Scene                             场景
│  ├─Fog                            雾 
│  ├─Rain                           雨 
│  ├─Skyline                        天际线 
│  ├─Snow                           雪  
│  └─index                          集合 
├─Materials                         材质
├─Measure                           测量 
├─Scene                             场景
├─EntityUtils                       Entity 工具
│  └─PolylineVolume.js              多段线柱体 
├─Config.js                         配置项
├─Entity.js                         实体创建
├─Primitives.js                     图元
├─Utils.js                          工具
├─Echarts.js                        图表
├─Transform.js                      转换方法
├─Canvas.js                         原生canvas操作
├─rightClickMenu.js                 右键菜单 依赖Utils.js
├─index.js                          入口文件
└─readme                            自述文件夹
```