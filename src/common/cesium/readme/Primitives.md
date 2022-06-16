# Primitives 

## Primitive由两个部分组成

* 几何形状（Geometry）：定义了Primitive的结构，例如三角形、线条、点等
* 外观（Appearance ）：定义Primitive的着色（Sharding），包括GLSL（OpenGL着色语言，OpenGL Shading Language）顶点着色器和片断着色器（ vertex and fragment shaders），以及渲染状态（render state）

> Cesium支持如下几何图形

|  几何图形    |  说明  |
|  ----  | ----  |
| BoxGeometry  | 立方体 |
| BoxOutlineGeometry  | 	仅有轮廓的立方体 |
| CircleGeometry  | 圆形或者拉伸的圆形 |
| CircleOutlineGeometry  | 只有轮廓的圆形 |
| CorridorGeometry  | 走廊：沿着地表的多段线，且具备必定的宽度，能够拉伸到必定的高度 |
| CorridorOutlineGeometry  | 只有轮廓的走廊 |
| CylinderGeometry  | 圆柱、圆锥或者截断的圆锥 |
| CylinderOutlineGeometry  | 只有轮廓的圆柱、圆锥或者截断的圆锥 |
| EllipseGeometry  | 椭圆或者拉伸的椭圆 |
| EllipseOutlineGeometry  | 只有轮廓的椭圆或者拉伸的椭圆 |
| EllipsoidGeometry  | 	椭球体 |
| EllipsoidOutlineGeometry  | 只有轮廓的椭球体 |
| RectangleGeometry	  | 矩形或者拉伸的矩形 |
| RectangleOutlineGeometry  | 只有轮廓的矩形或者拉伸的矩形 |
| PolygonGeometry  | 多边形，能够具备空洞或者拉伸必定的高度 |
| PolygonOutlineGeometry  | 只有轮廓的多边形 |
| PolylineGeometry  | 多段线，能够具备必定的宽度 |
| SimplePolylineGeometry  | 简单的多段线 |
| PolylineVolumeGeometry  | 多段线柱体 |
| PolylineVolumeOutlineGeometry  | 只有轮廓的多段线柱体 |
| SphereGeometry  | 球体 |
| SphereOutlineGeometry  | 只有轮廓的球体 |
| WallGeometry  | 墙 |
| WallOutlineGeometry  | 只有轮廓的墙 |


[参考地址](http://www.javashuo.com/article/p-qdnnknlr-k.html)