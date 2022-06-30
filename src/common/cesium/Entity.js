/**
 * 获取时间戳
 * @returns 
 */
const timeStamp = () => {
    return new Date().getTime()
}

/**
 * 实体实例将多种形式的可视化聚集到单个高级对象中
 * 使用方法如下 
   const _Entity = new Entity(cenium上下文,场景viewer)
    _Entity.方法函数(根据当前方法所需参数进行传递)
    
    方法目录如下：

    方法名称 | 概要
    --- | ---
    getEntity | 通过id 查询实体
    removeEntity | 删除实体（查询删除、直接删除、删除所有）
    create | 创建任意实体（需要根据官方的格式来创建）
    createPoint | 点
    createPolyline | 线
    createPolygon | 多边形线
    createWall | 墙
    createModel | 模型
    createBox | 盒子
    createRectangle | 矩形
    createBillboard | 广告牌
    createEllipse | 椭圆
    createCylinder | 圆柱体
    createPolylineVolume | 多线段柱体
 */
class Entity {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }

    /**
     * 根据实体ID 查询是否存在当前实体
     * @param {*} id 
     * @returns  有/返回实体 无/返回undefined
     */
    getEntity(id) {
        return this.viewer.entities.getById(id);
    }

    /**
     * 删除实体
     * @param {Object} params 
     *  id 实体id
     *  type get/先查询后删除 direct/直接删除 all/删除所有 默认get
     */
    removeEntity(params) {
        const id = params?.id ? params.id : ""
        const type = params?.type ? params.type : "get"
        //先查后删
        if (type == "get") {
            const entity = this.viewer.entities.getById(id);
            this.viewer.entities.remove(entity)
        }
        //直接删除
        if (type == "direct") {
            this.viewer.entities.removeById(id)
        }
        //删除所有
        if (type == "all") {
            this.viewer.entities.removeAll()
        }
    }


    /**
    * 创建任意实体
    * @param {Object} params 配置参数
    * @returns {Entity} 实体
    */
    create(params) {
        const entity = this.viewer.entities.add({
            ...params
        })
        return entity
    }

    /**
     * 创建点
     * @param {Object} params 配置参数
     * 注：通用参数使用 params.common
     * @returns {Entity} 实体点
     */
    createPoint(params) {
        const Cesium = this.Cesium
        /**
         * 仅使用部分参数 多余参数可迭代
         * add 内部参数 中文文档
         * http://cesium.xin/cesium/cn/Documentation1.72/Entity.html
         */
        const entity = this.viewer.entities.add({
            //唯一ID
            id: params.id || `Point-${timeStamp()}`,
            //设置对象的名称。该名称适用于最终用户消费，并不需要唯一。
            name: params.name || `Point-${timeStamp()}`,
            //位置信息
            position: params.position,
            //通用参数
            ...params.common,
            point: {
                //用于指定可见性。
                show: params.show || true,
                // 点的大小 像素/px 为单位
                pixelSize: params.pixelSize || 20,
                /**
                 * 相对于高度的高度 默认值 ： Cesium.HeightReference.NONE
                 * NONE/位置绝对
                 * CLAMP_TO_GROUND/位置固定在地形上。
                 * RELATIVE_TO_GROUND/位置高度是指地形上方的高度。
                 */
                heightReference: params.heightReference || Cesium.HeightReference.NONE,
                //点的颜色
                color: params.color || Cesium.Color.WHITE,
                //轮廓/描边的颜色
                outlineColor: params.outlineColor || Cesium.Color.BLACK,
                //轮廓/描边的尺寸 像素/px 为单位
                outlineWidth: params.outlineWidth || 0,
                /**
                 * 该属性用于根据距离缩放点。如果未定义，则使用恒定大小。
                 * new Cesium.NearFarScalar(0, 1, 5e10, 1)
                 * NearFarScalar 四个参数分别为
                 * 名称：near | 类型：{Number} |默认值：0.0 | （可选）摄像机范围的下限
                 * 名称：nearValue | 类型：{Number} |默认值：0.0 | （可选）摄像机范围下限的值
                 * 名称：far | 类型：{Number} |默认值：1.0 | （可选）摄像机范围的上限。
                 * 名称：farValue | 类型：{Number} |默认值：0.0 | （可选）摄像机范围上限的值。
                 */
                scaleByDistance: params.scaleByDistance || undefined,
                //作用于透明度 与scaleByDistance值相同 
                translucencyByDistance: params.translucencyByDistance || undefined,
                /**
                 * 指定将在距相机的距离显示
                 * new Cesium.DistanceDisplayCondition(0, 4.8e10)
                 * DistanceDisplayCondition 两个参数分别为
                 * 名称：near | 类型：{Number} |默认值：0.0 | （可选）可见物体的间隔中的最小距离。
                 * 名称：far | 类型：{Number} |默认值：Number.MAX_VALUE | （可选）在物体可见的间隔中最大的距离。
                 */
                distanceDisplayCondition: params.distanceDisplayCondition || undefined,
                //获取或设置与相机的距离，在深度处禁用深度测试，例如，以防止剪切地形。设置为零时，将始终应用深度测试。设置为Number.POSITIVE_INFINITY时，永远不会应用深度测试。
                disableDepthTestDistance: params.disableDepthTestDistance || undefined
            }
        });
        return entity;
    }
    /**
     * 创建线
     * @param {Object} params 配置参数
     * 注：通用参数使用 params.common
     * @returns {Entity} 实体线
     */
    createPolyline(params) {
        const Cesium = this.Cesium
        /**
        * 仅使用部分参数 多余参数可迭代
        * add 内部参数 中文文档
        * http://cesium.xin/cesium/cn/Documentation1.72/Entity.html
        */
        const entity = this.viewer.entities.add({
            //唯一ID
            id: params.id || `Polyline-${timeStamp()}`,
            //设置对象的名称。该名称适用于最终用户消费，并不需要唯一。
            name: params.name || `Polyline-${timeStamp()}`,
            //通用参数
            ...params.common,
            polyline: {
                //用于指定可见性。
                show: params.show || true,
                //位置信息使用 笛卡尔3d 数组
                positions: params.positions,
                //以 像素/px 为单位指定宽度
                width: params.width || 1,
                //材质
                material: params.material || Cesium.Color.WHITE,
                /**
                 * 该属性指定线段应该是大弧线，菱形线还是线性连接
                 * NONE/与椭圆表面不符的直线。
                 * GEODESIC/遵循测地路径。
                 * RHUMB/遵循大黄蜂或恶魔般的道路。
                 */
                arcType: params.arcType || Cesium.ArcType.GEODESIC,
                /**
                 * 如果arcType不是ArcType.NONE，则指定每个纬度和经度之间的角距离
                 * DEGREES_PER_RADIAN/以弧度为单位的度数（默认值）
                 * 参数太多具体查看：http://cesium.xin/cesium/cn/Documentation1.72/Math.html
                 */
                granularity: params.granularity || Cesium.Math.RADIANS_PER_DEGREE,
                //用于指定折线低于地形时用于绘制折线的材料。
                depthFailMaterial: params.depthFailMaterial || undefined,
                //用于指定是否应将折线固定在地面上。
                clampToGround: params.clampToGround || false,
                //该属性指定折线的顺序。仅当`clampToGround`为true并且支持地形上的折线时才有效
                zIndex: params.zIndex || 0,
                /**
                 * 指定是否 折线投射或接收来自光源的阴影
                 * DISABLED/对象不投射或接收阴影
                 * ENABLED/对象投射并接收阴影
                 * CAST_ONLY/对象仅投射阴影
                 * RECEIVE_ONLY/该对象仅接收阴影
                 */
                shadows: params.shadows || Cesium.ShadowMode.DISABLED,
                /**
                 * 指定将在距相机的距离显示
                 * DistanceDisplayCondition 两个参数分别为
                 * 名称：near | 类型：{Number} |默认值：0.0 | （可选）可见物体的间隔中的最小距离。
                 * 名称：far | 类型：{Number} |默认值：Number.MAX_VALUE | （可选）在物体可见的间隔中最大的距离。
                 */
                distanceDisplayCondition: params.distanceDisplayCondition || undefined,
                /**
                 * 该属性指定此折线在地面上时是否对地形，3D瓷砖或两者进行分类
                 * TERRAIN/将仅对地形进行分类。
                 * CESIUM_3D_TILE/将仅对3D瓷砖进行分类。
                 * BOTH/将同时对Terrain和3D Tile进行分类
                 */
                classificationType: params.classificationType || Cesium.ClassificationType.BOTH,
            }
        });
        return entity;
    }
    /**
     * 创建多边形线
     * @param {Object} params 配置参数
     * 注：通用参数使用 params.common
     * @returns {Entity} 实体多边形线
     */
    createPolygon(params) {
        const Cesium = this.Cesium
        /**
        * 仅使用部分参数 多余参数可迭代
        * add 内部参数 中文文档
        * http://cesium.xin/cesium/cn/Documentation1.72/Entity.html
        */
        const entity = this.viewer.entities.add({
            //唯一ID
            id: params.id || `Polygon-${timeStamp()}`,
            //设置对象的名称。该名称适用于最终用户消费，并不需要唯一。
            name: params.name || `Polygon-${timeStamp()}`,
            polygon: {
                //用于指定可见性。
                show: params.show || true,
                //用于指定多边形相对于椭球面的高度。
                height: params.height || 0,
                /**
                * 相对于高度的高度 默认值 ： Cesium.HeightReference.NONE
                * NONE/位置绝对
                * CLAMP_TO_GROUND/位置固定在地形上。
                * RELATIVE_TO_GROUND/位置高度是指地形上方的高度。
                */
                heightReference: params.heightReference || Cesium.HeightReference.NONE,
                /**
                 * 位置信息
                 * 使用方法：
                 * new Cesium.PolygonHierarchy(定义多边形或孔的外部边界的线性环[可选],定义多边形中孔的多边形层次结构数组[可选])
                 */
                hierarchy: params.hierarchy || undefined,
                //材质
                material: params.material || new Cesium.Color.fromCssColorString("#FFD700").withAlpha(.2),
                //用于指定多边形纹理从北方逆时针旋转的数值属性
                stRotation: params.stRotation || Cesium.Math.toRadians(0),
                //指定是否使用每个位置的高度。
                perPositionHeight: params.perPositionHeight || false,
                /**
                 * 该属性指定多边形拉伸的高度。
                 * 如果 PolygonGraphics＃perPositionHeight 为false，则该卷将从 PolygonGraphics开始#height 并在此高度结束。
                 * 如果 PolygonGraphics＃perPositionHeight 为true，则该体积从每个 的高度开始 PolygonGraphics＃hierarchy 位置，并在此海拔高度处结束。
                 */
                extrudedHeight: params.extrudedHeight || undefined,
                /**
                 * 表示相对于地形的位置 /用于指定extrudedHeight相对于什么
                 * NONE/位置绝对。
                 * CLAMP_TO_GROUND/位置固定在地形上。
                 * RELATIVE_TO_GROUND/位置高度是指地形上方的高度。
                 */
                extrudedHeightReference: params.extrudedHeightReference || Cesium.HeightReference.NONE,
                /**
                 * 该属性指定线段应该是大弧线，菱形线还是线性连接
                 * NONE/与椭圆表面不符的直线。
                 * GEODESIC/遵循测地路径。
                 * RHUMB/遵循大黄蜂或恶魔般的道路。
                 */
                arcType: params.arcType || Cesium.ArcType.GEODESIC,
                /**
                 * 如果arcType不是ArcType.NONE，则指定每个纬度和经度之间的角距离
                 * DEGREES_PER_RADIAN/以弧度为单位的度数（默认值）
                 * 参数太多具体查看：http://cesium.xin/cesium/cn/Documentation1.72/Math.html
                 */
                granularity: params.granularity || Cesium.Math.RADIANS_PER_DEGREE,
                //指定多边形是否被所提供的材料填充
                fill: params.fill || true,
                //是否有轮廓/描边
                outline: params.outline || false,
                //轮廓/描边的颜色
                outlineColor: params.outlineColor || new Cesium.Color(0, 0, 0, 0),
                //轮廓/描边的尺寸 像素/px 为单位
                outlineWidth: params.outlineWidth || 0,
                //如果为false，则将挤出的多边形顶部留空。
                closeTop: params.closeTop || true,
                //如果为false，则将挤出的多边形的底部保留为开放状态。
                closeBottom: params.closeBottom || true,
                /**
                * 指定是否 折线投射或接收来自光源的阴影
                * DISABLED/对象不投射或接收阴影
                * ENABLED/对象投射并接收阴影
                * CAST_ONLY/对象仅投射阴影
                * RECEIVE_ONLY/该对象仅接收阴影
                */
                shadows: params.shadows || Cesium.ShadowMode.DISABLED,
                /**
                 * 指定将在距相机的距离显示
                 * DistanceDisplayCondition 两个参数分别为
                 * 名称：near | 类型：{Number} |默认值：0.0 | （可选）可见物体的间隔中的最小距离。
                 * 名称：far | 类型：{Number} |默认值：Number.MAX_VALUE | （可选）在物体可见的间隔中最大的距离。
                 */
                distanceDisplayCondition: params.distanceDisplayCondition || new Cesium.DistanceDisplayCondition(0, 4.8e10),
                /**
                * 该属性指定此折线在地面上时是否对地形，3D瓷砖或两者进行分类
                * TERRAIN/将仅对地形进行分类。
                * CESIUM_3D_TILE/将仅对3D瓷砖进行分类。
                * BOTH/将同时对Terrain和3D Tile进行分类
                */
                classificationType: params.classificationType || Cesium.ClassificationType.BOTH,
                //指定地面几何图形的顺序。仅当多边形为常数且未指定height或extrudedHeight时才有效。
                zIndex: params.zIndex || 0,

            }
        });
        return entity;
    }
    /**
    * 创建墙体
    * @param {Object} params 配置参数
    * 注：通用参数使用 params.common
    * @returns {Entity} 实体墙体
    */
    createWall(params) {
        const Cesium = this.Cesium
        /**
        * 仅使用部分参数 多余参数可迭代
        * add 内部参数 中文文档
        * http://cesium.xin/cesium/cn/Documentation1.72/Entity.html
        */
        const entity = this.viewer.entities.add({
            //唯一ID
            id: params.id || `Wall-${timeStamp()}`,
            //设置对象的名称。该名称适用于最终用户消费，并不需要唯一。
            name: params.name || `Wall-${timeStamp()}`,
            //通用参数
            ...params.common,
            wall: {
                //用于指定可见性。
                show: params.show || true,
                //指定定义墙顶的 Cartesian3/笛卡尔3 位置的数组。
                positions: params.positions || [],
                //指定要用于墙底而不是地球表面的高度数组。
                minimumHeights: params.minimumHeights || new Array(params.positions.length).fill(0),
                //指定要用于墙顶的高度数组，而不是每个位置的高度。
                maximumHeights: params.maximumHeights || new Array(params.positions.length).fill(150),
                //获取或设置数字属性，该属性指定墙壁上的点之间的角度距离。
                granularity: params.granularity || undefined,
                //指定多边形是否被所提供的材料填充
                fill: params.fill || true,
                //材质
                material: params.material || Cesium.Color.WHITE,
                //是否有轮廓/描边
                outline: params.outline || false,
                //轮廓/描边的颜色
                outlineColor: params.outlineColor || Cesium.Color.BLACK,
                //轮廓/描边的尺寸 像素/px 为单位
                outlineWidth: params.outlineWidth || 1.0,
                /**
                 * 指定是否 折线投射或接收来自光源的阴影
                 * DISABLED/对象不投射或接收阴影
                 * ENABLED/对象投射并接收阴影
                 * CAST_ONLY/对象仅投射阴影
                 * RECEIVE_ONLY/该对象仅接收阴影
                 */
                shadows: params.shadows || Cesium.ShadowMode.DISABLED,
                /**
                * 指定将在距相机的距离上显示此模型。
                * new Cesium.DistanceDisplayCondition ( near , far )
                * near | number |默认：0.0 | 可见物体的间隔中的最小距离。
                * far | number |默认：Number.MAX_VALUE | 在物体可见的间隔中最大的距离
                */
                distanceDisplayCondition: params.distanceDisplayCondition || undefined,
            }
        });
        return entity;
    }

    /**
     * 创建模型
     * @param {Object} params 配置参数
     * 注：通用参数使用 params.common
     * @returns {Entity} 实体模型
     */
    createModel(params) {
        const Cesium = this.Cesium
        /**
         * 仅使用部分参数 多余参数可迭代
         * add 内部参数 中文文档
         * http://cesium.xin/cesium/cn/Documentation1.72/Entity.html
         */
        const entity = this.viewer.entities.add({
            //唯一ID
            id: params.id || `Model-${timeStamp()}`,
            //设置对象的名称。该名称适用于最终用户消费，并不需要唯一。
            name: params.name || `Model-${timeStamp()}`,
            //位置信息
            position: params.position || undefined,
            //控制位偏移
            viewFrom: params.viewFrom || undefined,
            //通用参数
            ...params.common,
            //模型
            model: {
                //用于指定可见性。
                show: params.show || true,
                /**
                 * 指定glTF资产的URI的字符串或资源属性。
                 * gltf 方法：http://cesium.xin/cesium/cn/Documentation1.72/Resource.html
                 */
                uri: params.uri || "",
                //指定统一的线性比例
                scale: params.scale || 1.0,
                //指定模型的最小最小像素大小，而不考虑缩放。
                minimumPixelSize: params.minimumPixelSize || 0.0,
                //指定最大比例模型的大小
                maximumScale: params.maximumScale || undefined,
                //确定在加载模型后纹理是否可以继续流入
                incrementallyLoadTextures: params.incrementallyLoadTextures || true,
                //是否应启动模型中指定的glTF动画。
                runAnimations: params.runAnimations || true,
                //指定glTF动画是否应在没有关键帧的持续时间内保持最后一个姿势。
                clampAnimations: params.clampAnimations || true,
                /**
                * 指定是否 折线投射或接收来自光源的阴影
                * DISABLED/对象不投射或接收阴影
                * ENABLED/对象投射并接收阴影
                * CAST_ONLY/对象仅投射阴影
                * RECEIVE_ONLY/该对象仅接收阴影
                */
                shadows: params.shadows || Cesium.ShadowMode.DISABLED,
                /**
                * 相对于高度的高度 默认值 ： Cesium.HeightReference.NONE
                * NONE/位置绝对
                * CLAMP_TO_GROUND/位置固定在地形上。
                * RELATIVE_TO_GROUND/位置高度是指地形上方的高度。
                */
                heightReference: params.heightReference || Cesium.HeightReference.NONE,
                //轮廓的颜色
                silhouetteColor: params.silhouetteColor || Cesium.Color.RED,
                //轮廓的大小(以像素为单位)
                silhouetteSize: params.silhouetteSize || 0.0,
                //模型的渲染颜色
                color: params.color || Cesium.Color.WHITE,
                /**
                 * 指定颜色如何与模型混合
                 * 定义用于在目标颜色和图元的源颜色之间混合的不同模式。
                 * HIGHLIGHT/将源颜色乘以目标颜色
                 * REPLACE/将源颜色替换为目标颜色
                 * MIX/将源颜色和目标颜色混合在一起
                 */
                colorBlendMode: params.colorBlendMode || Cesium.ColorBlendMode.HIGHLIGHT,
                /**
                 * 指定 colorBlendMode 为 MIX 时的颜色强度。
                 * 值0.0会产生模型的着色，
                 * 而值1.0会导致纯色，
                 * 介于两者之间的任何值都会导致两者混合。
                 * 
                 */
                colorBlendAmount: params.colorBlendAmount || 0.5,
                /**
                 * 一个指定 Cartesian2 的属性，用于将基于漫反射和镜面反射的基于图像的照明比例缩放到最终颜色。
                 * Cartesian2
                 */
                imageBasedLightingFactor: params.imageBasedLightingFactor || new Cesium.Cartesian2(1.0, 1.0),
                //为模型着色时指定浅色的属性。如果 undefined ，则使用场景的浅色。
                lightColor: params.lightColor || undefined,
                /**
                 * 指定将在距相机的距离上显示此模型。
                 * new Cesium.DistanceDisplayCondition ( near , far )
                 * near | number |默认：0.0 | 可见物体的间隔中的最小距离。
                 * far | number |默认：Number.MAX_VALUE | 在物体可见的间隔中最大的距离
                 */
                distanceDisplayCondition: params.distanceDisplayCondition || undefined,
                /**
                 * 获取或设置要应用于此模型的节点转换集。这表示为 PropertyBag ，其中键是节点的名称，值是 TranslationRotationScale 属性，
                 * 用于描述要应用于该节点的转换。转换是在glTF中指定的节点现有转换之后应用的，并且不会替换节点现有转换。
                 * new Cesium.PropertyBag ( value , createPropertyCallback )
                 * value | Object | 一个对象，其中包含属性名称到属性的键-值映射。
                 * createPropertyCallback | function | 当value中的任何属性的值都不是Property时将调用的函数
                 */
                nodeTransformations: params.nodeTransformations || undefined,
                /**
                 * 要应用于此模型的清晰度值集。这表示为 PropertyBag ，其中键是由关节的名称，单个空间和舞台的名称组成。
                 * Object.<string, number>
                 */
                articulations: params.articulations || undefined,
                /**
                 * 指定 ClippingPlaneCollection 的属性，用于有选择地禁用渲染模型。
                 * new Cesium.ClippingPlaneCollection(options)
                 * options参数：http://cesium.xin/cesium/cn/Documentation1.72/ClippingPlaneCollection.html
                 */
                clippingPlanes: params.clippingPlanes || undefined,

            },

        });
        return entity;
    }

    /**
    * 绘制盒子
    * @param {Object} params 配置参数
    * 注：通用参数使用 params.common
    * @returns {Entity} 实体盒子
    */
    createBox(params) {
        const Cesium = this.Cesium
        /**
        * 仅使用部分参数 多余参数可迭代
        * add 内部参数 中文文档
        * http://cesium.xin/cesium/cn/Documentation1.72/Entity.html
        */
        const entity = this.viewer.entities.add({
            //唯一ID
            id: params.id || `Box-${timeStamp()}`,
            //设置对象的名称。该名称适用于最终用户消费，并不需要唯一。
            name: params.name || `Box-${timeStamp()}`,
            //通用参数
            ...params.common,
            box: {
                //用于指定可见性。
                show: params.show || true,
                /**
                 * 于指定框的长度，宽度和高度
                 *  Cartesian3/笛卡尔3
                 */
                dimensions: params.dimensions || undefined,
                /**
                 * 相对于高度的高度 默认值 ： Cesium.HeightReference.NONE
                 * NONE/位置绝对
                 * CLAMP_TO_GROUND/位置固定在地形上。
                 * RELATIVE_TO_GROUND/位置高度是指地形上方的高度。
                 */
                heightReference: params.heightReference || Cesium.HeightReference.NONE,
                //指定多边形是否被所提供的材料填充
                fill: params.fill || true,
                //填充框的材质
                material: params.material || Cesium.Color.WHITE,
                //是否有轮廓/描边
                outline: params.outline || false,
                //轮廓/描边的颜色
                outlineColor: params.outlineColor || new Cesium.Color(0, 0, 0, 0),
                //轮廓/描边的尺寸 像素/px 为单位
                outlineWidth: params.outlineWidth || 0,
                /**
                * 指定是否 折线投射或接收来自光源的阴影
                * DISABLED/对象不投射或接收阴影
                * ENABLED/对象投射并接收阴影
                * CAST_ONLY/对象仅投射阴影
                * RECEIVE_ONLY/该对象仅接收阴影
                */
                shadows: params.shadows || Cesium.ShadowMode.DISABLED,
                /**
                * 指定将在距相机的距离显示
                * new Cesium.DistanceDisplayCondition(0, 4.8e10)
                * DistanceDisplayCondition 两个参数分别为
                * 名称：near | 类型：{Number} |默认值：0.0 | （可选）可见物体的间隔中的最小距离。
                * 名称：far | 类型：{Number} |默认值：Number.MAX_VALUE | （可选）在物体可见的间隔中最大的距离。
                */
                distanceDisplayCondition: params.distanceDisplayCondition || undefined,
            }
        });
        return entity;
    }

    /**
   * 绘制矩形
   * @param {Object} params 配置参数
   * 注：通用参数使用 params.common
   * @returns {Entity} 实体矩形
   */
    createRectangle(params) {
        const Cesium = this.Cesium
        /**
        * 仅使用部分参数 多余参数可迭代
        * add 内部参数 中文文档
        * http://cesium.xin/cesium/cn/Documentation1.72/Entity.html
        */
        const entity = this.viewer.entities.add({
            //唯一ID
            id: params.id || `Rectangle-${timeStamp()}`,
            //设置对象的名称。该名称适用于最终用户消费，并不需要唯一。
            name: params.name || `Rectangle-${timeStamp()}`,
            //通用参数
            ...params.common,
            rectangle: {
                //用于指定可见性。
                show: params.show || true,
                /**
                 * 指定为经度和纬度坐标的二维区域  / Rectangle
                 * new Cesium.Rectangle ( west , south , east , north )
                 * west | Number | 0.0 | 最西的经度，以弧度表示，在[-Pi，Pi]范围内。
                 * south | Number | 0.0 | 以弧度表示的最南端的纬度，范围为[-Pi/2，Pi/2]。
                 * east | Number | 0.0 | 最东经度，以弧度表示，在[-Pi，Pi]范围内。
                 * north | Number | 0.0 | 最北端的纬度，以弧度表示，范围为[-Pi/2，Pi/2]。
                 */
                coordinates: params.coordinates || undefined,
                //指定矩形相对于椭圆表面的高度。
                height: params.height || 0,
                /**
                * 相对于高度的高度 默认值 ： Cesium.HeightReference.NONE
                * NONE/位置绝对
                * CLAMP_TO_GROUND/位置固定在地形上。
                * RELATIVE_TO_GROUND/位置高度是指地形上方的高度。
                */
                heightReference: params.heightReference || Cesium.HeightReference.NONE,
                /**
                 * 指定矩形拉伸的高度。设置此属性将创建从高处开始到此高度处结束的体积。
                 * 类型：Number
                 */
                extrudedHeight: params.extrudedHeight || undefined,
                /**
                 * 指定拉伸的 HeightReference 的属性。
                 * 表示相对于地形的位置。
                 * Cesium.HeightReference.NONE
                 * NONE/位置绝对。
                 * CLAMP_TO_GROUND/位置固定在地形上。
                 * RELATIVE_TO_GROUND/位置高度是指地形上方的高度。
                 */
                extrudedHeightReference: params.extrudedHeightReference || undefined,
                //指定矩形从北方向顺时针方向的旋转
                //整体旋转entity的角度，围绕中心点
                rotation: params.rotation || 0.0,
                //指定矩形纹理从北方逆时针旋转。
                //旋转entity上的材质信息
                stRotation: params.stRotation || 0.0,
                /**
                 * 指定矩形上各点之间的角度距离。
                 * 类型：Number
                 */
                granularity: params.granularity || undefined,
                //指定多边形是否被所提供的材料填充
                fill: params.fill || true,
                //材质
                material: params.material || Cesium.Color.WHITE,
                //是否有轮廓/描边
                outline: params.outline || false,
                //轮廓/描边的颜色
                outlineColor: params.outlineColor || Cesium.Color.BLACK,
                //轮廓/描边的尺寸 像素/px 为单位
                outlineWidth: params.outlineWidth || 1.0,
                /**
                 * 指定矩形是投射还是接收光源的阴影
                 * DISABLED/对象不投射或接收阴影
                 * ENABLED/对象投射并接收阴影
                 * CAST_ONLY/对象仅投射阴影
                 * RECEIVE_ONLY/该对象仅接收阴影
                 */
                shadows: params.shadows || Cesium.ShadowMode.DISABLED,
                /**
                * 指定要在距相机的距离处显示此矩形。
                * new Cesium.DistanceDisplayCondition(0, 4.8e10)
                * DistanceDisplayCondition 两个参数分别为
                * 名称：near | 类型：{Number} |默认值：0.0 | （可选）可见物体的间隔中的最小距离。
                * 名称：far | 类型：{Number} |默认值：Number.MAX_VALUE | （可选）在物体可见的间隔中最大的距离。
                */
                distanceDisplayCondition: params.distanceDisplayCondition || undefined,
                /**
                 * 设置 ClassificationType 属性，该属性指定此矩形在地面上时是对地形，3D Tile还是对两者进行分类
                 * 分类是否影响地形，3D切片或同时影响这两者。
                 * TERRAIN/将仅对地形进行分类。
                 * CESIUM_3D_TILE/将仅对3D瓷砖进行分类
                 * BOTH/将同时对Terrain和3D Tile进行分类。  默认
                 */
                classificationType: params.classificationType || undefined,
                /**
                 * 定用于排序地面几何图形的zIndex。仅当矩形为常数且未指定height或extrudedHeight时才有效。
                 * 默认：Number
                 */
                zIndex: params.zIndex || 0,
            }
        });
        return entity;
    }



    /**
     * 创建广告牌
     * @param {Object} params 配置参数
     * 注：通用参数使用 params.common
     * @returns {Entity} 实体广告牌
     */
    createBillboard(params) {
        const Cesium = this.Cesium
        /**
         * 仅使用部分参数 多余参数可迭代
         * add 内部参数 中文文档
         * http://cesium.xin/cesium/cn/Documentation1.72/Entity.html
         */
        const entity = this.viewer.entities.add({
            //唯一ID
            id: params.id || `Billboard-${timeStamp()}`,
            //设置对象的名称。该名称适用于最终用户消费，并不需要唯一。
            name: params.name || `Billboard-${timeStamp()}`,
            //位置信息
            position: params.position,
            //通用参数
            ...params.common,
            //广告牌
            billboard: {
                //用于指定可见性。
                show: params.show || true,
                /**
                 * 指定用于广告牌的Image，URL或Canvas的属性
                 * 类型：Property | string | HTMLCanvasElement
                 */
                image: params.image,
                //应用于图像尺寸的比例
                scale: params.scale || 1.0,
                /**
                 * 设置 Cartesian2 属性，
                 * 该属性指定广告牌在屏幕空间中的像素偏移量从此广告牌的来源开始。
                 * 通常用于对齐多个广告牌和标签相同的位置，例如图片和文字。
                 * 屏幕空间原点是屏幕顶部的左上角画布; x 从左到右增加， y 从上到下增加。
                 */
                pixelOffset: params.pixelOffset || undefined,
                /**
                 * 设置 Cartesian3 属性，
                 * 该属性指定广告牌在眼坐标中的偏移量。
                 * 眼睛坐标是一个左手坐标系，其中 x 指向查看者的右边， y 指向上方， z 指向屏幕。
                 */
                eyeOffset: params.eyeOffset || undefined,
                /**
                 * 指定 Horizo​​ntalOrigin 的属性
                 * 
                 * CENTER/原点在对象的水平中心。
                 * LEFT/原点在对象的左侧。
                 * RIGHT/原点在对象的右侧。
                 * 将水平原点设置为 LEFT 或 RIGHT 将在屏幕的左侧或右侧显示一个广告牌锚位置。
                 * 
                 * 写法例如：Cesium.HorizontalOrigin.CENTER
                 */
                horizontalOrigin: params.horizontalOrigin || undefined,
                /**
                 * 指定 VerticalOrigin 的属性。
                 * 
                 * CENTER/原点位于 BASELINE 和 TOP 之间的垂直中心。
                 * BOTTOM/原点在对象的底部。
                 * BASELINE/如果对象包含文本，则原点位于文本的基线，否则原点位于对象的底部。
                 * TOP/原点在对象的顶部。
                 * 将垂直原点设置为 TOP 或 BOTTOM 会在屏幕上方或下方显示广告牌锚点位置。
                 * 
                 * 写法例如：Cesium.VerticalOrigin.CENTER
                 */
                verticalOrigin: params.verticalOrigin || undefined,
                /**
                 * 指定 HeightReference 的属性。
                 * 
                 * 表示相对于地形的位置
                 * NONE/位置绝对。
                 * CLAMP_TO_GROUND/位置固定在地形上。
                 * RELATIVE_TO_GROUND/位置高度是指地形上方的高度。
                 * 
                 * 写法例如：Cesium.HeightReference.NONE
                 */
                heightReference: params.heightReference || undefined,
                //指定图像的色调 颜色 
                color: params.color || Cesium.Color.WHITE,
                /**
                 * 设置数字属性，该属性指定图像的旋转从 alignedAxis 逆时针旋转。
                 */
                rotation: params.rotation || 0.0,
                /**
                 * 指定单位矢量旋转轴。
                 * 设置 Cartesian3 属性，该属性指定旋转的单位矢量轴在固定框架中。设置为Cartesian3.ZERO时，旋转从屏幕顶部开始
                 */
                alignedAxis: params.alignedAxis || undefined,
                /**
                 * 是否应以米为单位测量此广告牌的大小
                 * 类型：Boolean
                 */
                sizeInMeters: params.sizeInMeters || undefined,
                /**
                 * 指定广告牌的宽度（以像素为单位），并覆盖原始尺寸
                 * 未定义时，将使用原始宽度。
                 */
                width: params.width || undefined,
                /**
                 * 指定广告牌的高度（以像素为单位），并覆盖原始尺寸。
                 * 未定义时，将使用原始高度
                 */
                height: params.height || undefined,
                /**
                 * 该属性用于根据距离缩放点。如果未定义，则使用恒定大小。
                 * new Cesium.NearFarScalar(0, 1, 5e10, 1)
                 * NearFarScalar 四个参数分别为
                 * 名称：near | 类型：{Number} |默认值：0.0 | （可选）摄像机范围的下限
                 * 名称：nearValue | 类型：{Number} |默认值：0.0 | （可选）摄像机范围下限的值
                 * 名称：far | 类型：{Number} |默认值：1.0 | （可选）摄像机范围的上限。
                 * 名称：farValue | 类型：{Number} |默认值：0.0 | （可选）摄像机范围上限的值。
                 */
                scaleByDistance: params.scaleByDistance || undefined,
                //作用于透明度 与scaleByDistance值相同 采用 NearFarScalar 
                translucencyByDistance: params.translucencyByDistance || undefined,
                /**
                 * 该属性根据距照相机的距离指定广告牌的像素偏移
                 * 广告牌的像素偏移将在 NearFarScalar＃nearValue 和 NearFarScalar＃farValue ，
                 * 而摄像头距离在上下限之内指定的 NearFarScalar＃near 和 NearFarScalar＃far
                 * 在这些范围之外，广告牌的像素偏移保持钳位到最近的范围
                 * 与scaleByDistance值相同 采用 NearFarScalar
                 */
                pixelOffsetScaleByDistance: params.pixelOffsetScaleByDistance || undefined,
                /**
                 * 它指定 BoundingRectangle ，
                 * 该属性定义了 image 的子区域（而不是整个图像）用于广告牌，从左下角开始以像素为单位进行测量。
                 * 
                 * BoundingRectangle:
                 * 由角，宽度和高度给定的边界矩形。
                 * new Cesium.BoundingRectangle ( x , y , width , height )
                 * 参数：{类型统一为：Number 默认值统一为：0.0}
                 * x/矩形的x坐标。
                 * y/矩形的y坐标。
                 * width/矩形的宽度。
                 * height/矩形的高度。
                 */
                imageSubRegion: params.imageSubRegion || undefined,
                /**
                 * 指定将在距相机的距离显示
                 * new Cesium.DistanceDisplayCondition(0, 4.8e10)
                 * DistanceDisplayCondition 两个参数分别为
                 * 名称：near | 类型：{Number} |默认值：0.0 | （可选）可见物体的间隔中的最小距离。
                 * 名称：far | 类型：{Number} |默认值：Number.MAX_VALUE | （可选）在物体可见的间隔中最大的距离。
                 */
                distanceDisplayCondition: params.distanceDisplayCondition || undefined,
                //与相机的距离，在深度处禁用深度测试，例如，以防止剪切地形。设置为零时，将始终应用深度测试。设置为Number.POSITIVE_INFINITY时，永远不会应用深度测试。
                disableDepthTestDistance: params.disableDepthTestDistance || undefined
            },

        });
        return entity;
    }


    /**
     * 创建椭圆
     * 描述由中心点，半长轴和半短轴定义的椭圆。椭圆符合地球的曲率，可以放置在表面或可以选择将其挤出成一定体积。中心点由包含的 Entity 确定
     * @param {Object} params 配置参数
     * 注：通用参数使用 params.common
     * @returns {Entity} 实体椭圆
     */
    createEllipse(params) {
        const Cesium = this.Cesium
        /**
         * 仅使用部分参数 多余参数可迭代
         * add 内部参数 中文文档
         * http://cesium.xin/cesium/cn/Documentation1.72/Entity.html
         */
        const entity = this.viewer.entities.add({
            //唯一ID
            id: params.id || `Ellipse-${timeStamp()}`,
            //设置对象的名称。该名称适用于最终用户消费，并不需要唯一。
            name: params.name || `Ellipse-${timeStamp()}`,
            //位置信息
            position: params.position,
            //通用参数
            ...params.common,
            //椭圆
            ellipse: {
                //用于指定可见性。
                show: params.show || true,
                /**
                 * 指定半长轴的数值属性
                 */
                semiMajorAxis: params.semiMajorAxis || undefined,
                /**
                 * 指定半短轴的数值属性
                 */
                semiMinorAxis: params.semiMinorAxis || undefined,
                /**
                 * 指定椭圆相对于椭球表面的高度 数值属性
                 */
                height: params.height || 0.0,
                /**
                 * 相对于高度的高度 默认值 ： Cesium.HeightReference.NONE
                 * NONE/位置绝对
                 * CLAMP_TO_GROUND/位置固定在地形上。
                 * RELATIVE_TO_GROUND/位置高度是指地形上方的高度。
                 */
                heightReference: params.heightReference || undefined,
                /**
                 * 指定椭圆的凸出面相对于椭圆表面的高度
                 * 如果 PolygonGraphics＃perPositionHeight 为false，则该卷将从 PolygonGraphics开始#height 并在此高度结束。
                 * 如果 PolygonGraphics＃perPositionHeight 为true，则该体积从每个 的高度开始 PolygonGraphics＃hierarchy 位置，并在此海拔高度处结束。
                 */
                extrudedHeight: params.extrudedHeight || undefined,
                /**
                 * 指定拉伸的 HeightReference 的属性。
                 * 表示相对于地形的位置。
                 * Cesium.HeightReference.NONE
                 * NONE/位置绝对。
                 * CLAMP_TO_GROUND/位置固定在地形上。
                 * RELATIVE_TO_GROUND/位置高度是指地形上方的高度。
                 */
                extrudedHeightReference: params.extrudedHeightReference || undefined,
                /**
                 * 指定矩形从北方向顺时针方向的旋转
                 * 整体旋转entity的角度，围绕中心点
                 */
                rotation: params.rotation || 0.0,
                //用于指定多边形纹理从北方逆时针旋转的数值属性
                stRotation: params.stRotation || 0.0,
                /**
                 * 指定椭圆上各点之间的角度距离
                 */
                granularity: params.granularity || undefined,
                //指定多边形是否被所提供的材料填充
                fill: params.fill || true,
                //材质
                material: params.material || Cesium.Color.WHITE,
                //是否有轮廓/描边 必须设置height，否则ouline无法显示
                outline: params.outline || false,
                //轮廓/描边的颜色
                outlineColor: params.outlineColor || Cesium.Color.BLACK,
                //轮廓/描边的尺寸 像素/px 为单位
                outlineWidth: params.outlineWidth || 1.0,
                /**
                 * 该属性指定要沿着轮廓的周长绘制的垂直线的数量。
                 * 类型：Number
                 */
                numberOfVerticalLines: params.numberOfVerticalLines || 16.0,
                /**
                 * 指定是否 折线投射或接收来自光源的阴影
                 * DISABLED/对象不投射或接收阴影
                 * ENABLED/对象投射并接收阴影
                 * CAST_ONLY/对象仅投射阴影
                 * RECEIVE_ONLY/该对象仅接收阴影
                 */
                shadows: params.shadows || Cesium.ShadowMode.DISABLED,
                /**
                 * 指定将在距相机的距离显示
                 * new Cesium.DistanceDisplayCondition(0, 4.8e10)
                 * DistanceDisplayCondition 两个参数分别为
                 * 名称：near | 类型：{Number} |默认值：0.0 | （可选）可见物体的间隔中的最小距离。
                 * 名称：far | 类型：{Number} |默认值：Number.MAX_VALUE | （可选）在物体可见的间隔中最大的距离。
                 */
                distanceDisplayCondition: params.distanceDisplayCondition || undefined,
                /**
                 * 该属性指定此折线在地面上时是否对地形，3D瓷砖或两者进行分类
                 * TERRAIN/将仅对地形进行分类。
                 * CESIUM_3D_TILE/将仅对3D瓷砖进行分类。
                 * BOTH/将同时对Terrain和3D Tile进行分类
                 */
                classificationType: params.classificationType || Cesium.ClassificationType.BOTH,
                //该属性指定折线的顺序。仅当`clampToGround`为true并且支持地形上的折线时才有效
                zIndex: params.zIndex || 0,
            },

        });
        return entity;
    }



    /**
     * 创建圆柱体
     * @param {Object} params 配置参数
     * 注：通用参数使用 params.common
     * @returns {Entity} 实体圆柱体
     */
    createCylinder(params) {
        const Cesium = this.Cesium
        /**
         * 仅使用部分参数 多余参数可迭代
         * add 内部参数 中文文档
         * http://cesium.xin/cesium/cn/Documentation1.72/Entity.html
         */
        const entity = this.viewer.entities.add({
            //唯一ID
            id: params.id || `Cylinder-${timeStamp()}`,
            //设置对象的名称。该名称适用于最终用户消费，并不需要唯一。
            name: params.name || `Cylinder-${timeStamp()}`,
            //位置信息
            position: params.position,
            //通用参数
            ...params.common,
            //圆柱体
            cylinder: {
                //用于指定可见性。
                show: params.show || true,
                /**
                 * 指定圆柱体长度的 
                 * 类型：Number
                 */
                length: params.length || undefined,
                /**
                 * 指定圆柱体顶部的半径
                 * 类型：Number
                 */
                topRadius: params.topRadius || undefined,
                /**
                 * 指定圆柱体底部的半径
                 * 类型：Number
                 */
                bottomRadius: params.bottomRadius || undefined,
                /**
                 * 相对于高度的高度 默认值 ： Cesium.HeightReference.NONE
                 * NONE/位置绝对
                 * CLAMP_TO_GROUND/位置固定在地形上。
                 * RELATIVE_TO_GROUND/位置高度是指地形上方的高度。
                 */
                heightReference: params.heightReference || Cesium.HeightReference.NONE,
                //指定多边形是否被所提供的材料填充
                fill: params.fill || true,
                //材质
                material: params.material || Cesium.Color.WHITE,
                //是否有轮廓/描边
                outline: params.outline || false,
                //轮廓/描边的颜色
                outlineColor: params.outlineColor || Cesium.Color.BLACK,
                //轮廓/描边的尺寸 像素/px 为单位
                outlineWidth: params.outlineWidth || 1.0,
                /**
                 * 该属性指定要沿着轮廓的周长绘制的垂直线的数量。
                 * 类型：Number
                 */
                numberOfVerticalLines: params.numberOfVerticalLines || 16.0,
                /**
                * 圆柱周围的边缘数量。
                * 类型：Number
                */
                slices: params.slices || 128,
                /**
                 * 指定是否 折线投射或接收来自光源的阴影
                 * DISABLED/对象不投射或接收阴影
                 * ENABLED/对象投射并接收阴影
                 * CAST_ONLY/对象仅投射阴影
                 * RECEIVE_ONLY/该对象仅接收阴影
                 */
                shadows: params.shadows || Cesium.ShadowMode.DISABLED,
                /**
                 * 指定将在距相机的距离显示
                 * new Cesium.DistanceDisplayCondition(0, 4.8e10)
                 * DistanceDisplayCondition 两个参数分别为
                 * 名称：near | 类型：{Number} |默认值：0.0 | （可选）可见物体的间隔中的最小距离。
                 * 名称：far | 类型：{Number} |默认值：Number.MAX_VALUE | （可选）在物体可见的间隔中最大的距离。
                 */
                distanceDisplayCondition: params.distanceDisplayCondition || undefined,
            },

        });
        return entity;
    }


    /**
    * 创建多线段柱体
    * @param {Object} params 配置参数
    * 注：通用参数使用 params.common
    * @returns {Entity} 实体多线段柱体
    */
    createPolylineVolume(params) {
        const Cesium = this.Cesium
        /**
         * 仅使用部分参数 多余参数可迭代
         * add 内部参数 中文文档
         * http://cesium.xin/cesium/cn/Documentation1.72/Entity.html
         */
        const entity = this.viewer.entities.add({
            //唯一ID
            id: params.id || `PolylineVolume-${timeStamp()}`,
            //设置对象的名称。该名称适用于最终用户消费，并不需要唯一。
            name: params.name || `PolylineVolume-${timeStamp()}`,
            //通用参数
            ...params.common,
            //多线段柱体
            polylineVolume: {
                //用于指定可见性。
                show: params.show || true,
                /**
                 * 位置信息
                 * 类型 ：Cartesian3 位置的数组
                 */
                positions: params.positions || undefined,
                /**
                 * 拉伸的形状
                 * 类型： Cartesian2 位置的数组
                 */
                shape: params.shape || undefined,
                /**
                 * 拐角样式
                 * Cesium.CornerType.ROUNDED
                 * ROUNDED/角有光滑的边缘
                 * MITERED/拐角点是相邻边的交点(直角)
                 * BEVELED/角被修剪 （交叉的角 是被切割平了）
                 */
                cornerType: params.cornerType || Cesium.CornerType.ROUNDED,
                /**
                 * 每个纬度和经度点之间的角距离
                 * 类型：Number
                 */
                granularity: params.granularity || Cesium.Math.RADIANS_PER_DEGREE,
                //是否用所提供的材料填充
                fill: params.fill || true,
                //材质
                material: params.material || Cesium.Color.WHITE,
                //是否有轮廓/描边
                outline: params.outline || false,
                //轮廓/描边的颜色
                outlineColor: params.outlineColor || Cesium.Color.BLACK,
                //轮廓/描边的尺寸 像素/px 为单位
                outlineWidth: params.outlineWidth || 1.0,
                /**
                 * 指定是否 折线投射或接收来自光源的阴影
                 * DISABLED/对象不投射或接收阴影
                 * ENABLED/对象投射并接收阴影
                 * CAST_ONLY/对象仅投射阴影
                 * RECEIVE_ONLY/该对象仅接收阴影
                 */
                shadows: params.shadows || Cesium.ShadowMode.DISABLED,
                /**
                * 指定将在距相机的距离显示
                * new Cesium.DistanceDisplayCondition(0, 4.8e10)
                * DistanceDisplayCondition 两个参数分别为
                * 名称：near | 类型：{Number} |默认值：0.0 | （可选）可见物体的间隔中的最小距离。
                * 名称：far | 类型：{Number} |默认值：Number.MAX_VALUE | （可选）在物体可见的间隔中最大的距离。
                */
                distanceDisplayCondition: params.distanceDisplayCondition || undefined,
            },

        });
        return entity;
    }


    /**
    * 创建标签
    * @param {Object} params 配置参数
    * 注：通用参数使用 params.common
    * @returns {Entity} 实体标签
    */
    createLabel(params) {
        const Cesium = this.Cesium
        /**
         * 仅使用部分参数 多余参数可迭代
         * add 内部参数 中文文档
         * http://cesium.xin/cesium/cn/Documentation1.72/Entity.html
         */
        const entity = this.viewer.entities.add({
            //唯一ID
            id: params.id || `Label-${timeStamp()}`,
            //设置对象的名称。该名称适用于最终用户消费，并不需要唯一。
            name: params.name || `Label-${timeStamp()}`,
            //位置信息
            position: params.position,
            //通用参数
            ...params.common,
            label: {
                //用于指定可见性。
                show: params.show || true,
                /**
                 * 文本的属性。支持显式换行符 '\n'
                 * 类型：String
                 * 默认值：undefined
                 */
                text: params.text || undefined,
                /**
                 * 指定 CSS 字体的属性
                 * 类型：String
                 * 默认值：'30px sans-serif'
                 */
                font: params.font || '30px sans-serif',
                /**
                 * 标签样式填充
                 * Cesium.LabelStyle.[值]
                 * 值：
                 * FILL/填写标签的文本，但不要勾勒轮廓。
                 * OUTLINE/概述标签的文本，但不要填写。
                 * FILL_AND_OUTLINE/填写并标记标签文本。
                 */
                style: params.style || undefined,
                /**
                 * 文本的缩放比例
                 * 类型：Number
                 */
                scale: params.scale || 1.0,
                /**
                 * 指定标签背景的可见性
                 * 类型：Boolean
                 * 默认：false
                 */
                showBackground: params.showBackground || false,
                // backgroundColor,
                // backgroundPadding,
                // pixelOffset,
                // eyeOffset,
                // horizontalOrigin,
                // verticalOrigin,
                // heightReference,
                // outlineColor,
                // outlineWidth,
                // translucencyByDistance,
                // pixelOffsetScaleByDistance,
                // scaleByDistance,
                // distanceDisplayCondition,
                // disableDepthTestDistance
            }
        });
        return entity;
    }

}

export default Entity