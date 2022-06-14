/**
 * 获取时间戳
 * @returns 
 */
const timeStamp = () => {
    return new Date().getTime()
}
import Entity from "@/common/cesium/Entity.js";
import Utils from "@/common/cesium/Utils.js";
import Transform from "@/common/cesium/Transform.js";
import { v4 as uuidv4 } from "uuid";
/**
 * 仿造Echarts 使用Cesium 生成 3D图表
 */
class Echarts3D {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }
    /**
     * 创建柱状图
     * @param {Object} params 配置参数
     * @returns 实体集合
     * @use 使用方法如下:
     * const _Echarts3D = new Echarts3D(Cesium, viewer)
     * _Echarts3D.createBar({
     *  data:[{
     *      name:"当前组名称:String",
     *      position:[经度:Number,纬度:Number,高程:Number],
     *      data:[{
     *       label:"名称:String",
     *       value:"值：Number"   
     *      }]
     *  }],
     * radius:{Number}, 可选参数：圆柱体半径 默认25
     * id:{String}, 可选参数：如果不存在id 默认会自动随机赋予id
     * tooltip:{Boolean}, 可选参数：是否鼠标接触显示信息框
     * nodeId:{String}, 可选参数：需要插入信息框的父元素id名称 注意：如果tooltip为true 当前参数必填
     * color:{Array}, 可选参数 颜色数组 默认会存在一组色值 也可以自定义传递 取值从索引0 开始
     * hover:{Boolean}, 可选参数：是否鼠标接触 柱体有透明效果
     * })
     */
    createBar(params) {
        const Cesium = this.Cesium
        const _Entity = new Entity(Cesium, this.viewer);
        const _Utils = new Utils();
        //节点id 用来插入当前节点内元素使用
        const nodeId = params?.nodeId ? params.nodeId : ""
        //圆柱体半径
        const radius = params?.radius ? params.radius : 25
        const color = params?.color ? params.color : [
            "#5470c6",
            "#91cc75",
            "#fac858",
            "#ee6666",
            "#73c0de",
            "#3ba272",
            "#fc8452",
            "#9a60b4",
            "#ea7ccc",
        ]
        //所有实体 最终返回
        let allEntityArr = [];
        //遍历数据，根据数据绘制柱状图
        for (let i = 0; i < params.data.length; i++) {
            const item = params.data[i]
            //一组实体 最终push到allEntityArr内
            let itemEntityArr = [];
            //默认高度
            let _height = 0
            for (let j = 0; j < item.data.length; j++) {
                const jItem = item.data[j]
                if (itemEntityArr.length == 0) {
                    _height = 0
                } else {
                    _height += item.data[j - 1].value
                }
                const _createCylinder = _Entity.createCylinder({
                    id: jItem?.id ? jItem.id : uuidv4(),
                    name: jItem.label,
                    position: Cesium.Cartesian3.fromDegrees(
                        item.position[0],
                        item.position[1],
                        _height
                    ),
                    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                    topRadius: radius,
                    bottomRadius: radius,
                    length: jItem.value,
                    shadows: Cesium.ShadowMode.ENABLED,
                    material: new Cesium.Color.fromCssColorString(color[j])

                });
                itemEntityArr.push(_createCylinder)
            }
            allEntityArr.push({
                entity: itemEntityArr,
                name: item.name
            })
        }
        //鼠标接触 显示信息框
        const tooltip = params?.tooltip ? params.tooltip : false
        if (tooltip) {

            //创建事件
            const handler = new Cesium.ScreenSpaceEventHandler(
                this.viewer.scene.canvas
            );
            /**
             * 根据id 查询 多个实体根数据 目前方式作用于 弹出层使用
             * @param {*} id 
             */
            const getBarInfo = (id) => {
                for (let i = 0; i < allEntityArr.length; i++) {
                    const item = allEntityArr[i]
                    const filterEntity = item.entity.filter(filterItem => filterItem.id == id)
                    if (filterEntity.length != 0) {
                        return i
                    }
                }
            }

            /**
             * 信息窗口dom
             * @param {*} data 
             */
            const infoWindowDom = (data) => {
                let _div = window.document.createElement("div");
                _div.id = "echarts3D-Bar-Info-Window"
                _div.className = "echarts3D-Bar-Info-Window"
                let html = ''
                let itemHtml = ''
                const arr = data.data.reverse() //进行数组倒叙操作 为了使柱状和提示显示顺序保持一致
                for (let i = 0; i < arr.length; i++) {
                    const item = arr[i]
                    itemHtml += `<div class="echarts3D-Bar-Info-Window-Item">
                                <div class="echarts3D-Bar-Info-Window-Item-Label">
                                    <div class="echarts3D-Bar-Info-Window-Item-Spot" style="background-color:${item.color}"></div>
                                    <div class="echarts3D-Bar-Info-Window-Item-Text">${item.label}</div>
                                </div>
                                <div class="echarts3D-Bar-Info-Window-Item-Value">${item.value}</div>
                            </div>`
                }
                html = `
                <div class="echarts3D-Bar-Info-Window-Title">${data.name}</div>
                <div class="echarts3D-Bar-Info-Window-Box">${itemHtml}</div>
                <div class="echarts3D-Bar-Info-Window-triangle"></div>
                `;
                _div.innerHTML = html
                return _div
            }
            /**
             * dom元素定位
             * @param {*} id 
             * @param {*} position 
             */
            const domPosition = (id, position) => {
                const dom = document.getElementById(id);
                dom.style.top =
                    position.y - dom.offsetHeight + "px";
                dom.style.left =
                    position.x + dom.offsetWidth + "px";
            }
            /**
             * 鼠标接触
             * @param {Boolean} isHover  是否接触实体
             * @param {Number} maxInfoIndex 实体数据的索引  如果isHover=true 则必填
             */
            const hoverOperation = (isHover, maxInfoIndex) => {
                //鼠标悬停高亮
                const hover = params?.hover ? params.hover : false
                if (!hover) return

                if (isHover) {
                    for (let i = 0; i < allEntityArr[maxInfoIndex].entity.length; i++) {
                        const _color = Cesium.Color.fromCssColorString(color[i]).withAlpha(0.9)
                        allEntityArr[maxInfoIndex].entity[i].cylinder.material = _color
                    }
                } else {
                    for (let i = 0; i < allEntityArr.length; i++) {
                        for (let j = 0; j < allEntityArr[i].entity.length; j++) {
                            const _color = Cesium.Color.fromCssColorString(color[j])
                            allEntityArr[i].entity[j].cylinder.material = _color
                        }
                    }
                }

            }
            /**
             * 创建信息窗口
             * @param {*} id 
             * @param {*} position 鼠标位置 
             */
            const createInfoWindow = (id, position) => {
                //获取柱状整体数据索引
                const maxInfoIndex = getBarInfo(id)
                //通过索引找到原始数据 并处理 根据color参数传递值
                const dataObj = {
                    name: params.data[maxInfoIndex].name,
                    data: params.data[maxInfoIndex].data.map((item, index) => {
                        return {
                            ...item,
                            color: color[index]
                        }
                    })
                }
                //获取信息窗口dom节点
                const dom = infoWindowDom(dataObj)
                if (!_Utils.operationDom('has', 'echarts3D-Bar-Info-Window')) {
                    _Utils.operationDom("append", nodeId, dom)
                    domPosition('echarts3D-Bar-Info-Window', position)
                } else {
                    domPosition('echarts3D-Bar-Info-Window', position)
                }

                hoverOperation(true, maxInfoIndex)

            }

            // 对鼠标移动事件的监听 Start
            handler.setInputAction((event) => {
                //根据坐标获取实体信息
                const pickInfo = this.viewer.scene.pick(event.endPosition);
                const cursorDom = document.getElementById(nodeId)
                if (!pickInfo) {
                    //移动非实体位置 删除窗口
                    if (_Utils.operationDom('has', 'echarts3D-Bar-Info-Window')) {
                        _Utils.operationDom('remove', 'echarts3D-Bar-Info-Window')
                    }
                    cursorDom.style.cursor = 'default'
                    hoverOperation(false)
                    return
                } else {
                    cursorDom.style.cursor = 'pointer'
                }
                _Utils.debounce(createInfoWindow(pickInfo.id.id, event.endPosition))
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            // 对鼠标移动事件的监听 End
        }
        return allEntityArr
    }

    /**
     * 创建动态水球
     * @param {*} params 
     */
    createWaterPolo(params) {
        if (params.data.length == 0) return

        const _Utils = new Utils();
        const Cesium = this.Cesium
        const _Transform = new Transform(Cesium, this.viewer)
        //节点id 用来插入当前节点内元素使用
        const nodeId = params?.nodeId ? params.nodeId : ""
        //初始化背景色
        const color = params?.color ? params.color : [
            "#5470c6",
            "#91cc75",
            "#fac858",
            "#ee6666",
            "#73c0de",
            "#3ba272",
            "#fc8452",
            "#9a60b4",
            "#ea7ccc",
        ]
        //球体尺寸（px）
        const size = params?.size ? params.size : 100
        //内间距
        const padding = params?.padding ? params.padding : 0
        //层级
        const zIndex = params?.zIndex ? params.zIndex : 2

        //边框 Start
        const border = {
            width: params.border?.width ? params.border.width : 0,
            color: params.border?.color ? params.border.color : "#000"
        }
        //边框 End

        //背景 Start
        const background = {
            color: params.background?.color ? params.background.color : "#fff"
        }
        //背景 End

        //文字 Start
        const font = {
            size: params.font?.size ? params.font.size : size / 4,
            color: params.font?.color ? params.font.color : "#000"
        };
        //文字 End

        //整理配置项
        const option = {
            zIndex,
            size,
            padding,
            border,
            background,
            font
        };
        //处理数据
        const data = params.data.map(item => {
            return {
                ...item,
                id: item?.id ? item.id : uuidv4(),
                size
            }
        })

        /**
        * 创建dom元素
        * @param {*} data 数据
        * @param {*} option 样式
        * @returns 
        */
        const createWaterPoloDom = (data, option) => {
            //最外层元素
            let _div = window.document.createElement("div");
            _div.id = "echarts3D-Water-Polo-Wrap"
            _div.className = "echarts3D-Water-Polo-Wrap"

            //创建动画样式
            let _style = `
                <style>
                @keyframes water-waves {
                    0% {
                    transform: rotate(0deg);
                    }
                    100% {
                    transform: rotate(360deg);
                    }
                }
                </style>
            `;


            let ItemHtml = ''
            for (let i = 0; i < data.length; i++) {
                const item = data[i]

                const style = {
                    zIndex: item?.zIndex ? item.zIndex : zIndex,
                    color: item?.color ? item.color : color.length > i ? color[i] : _Utils.getRandomColor,
                    data: item.data,
                    size: option.size,
                    padding: option.padding,
                    border: option.border,
                    background: option.background,
                    font: option.font
                }

                const ItemStyle = `
                    padding: ${style.padding}px;
                    width: ${style.size}px;
                    height: ${style.size}px;
                    border-radius: 50%;
                    position: fixed;
                    z-index: 2;
                    border:${style.color} ${style.border.width}px solid;
                    box-sizing: border-box;
                    overflow: hidden;
                    left:50%;
                    top:50%;
                    background:${style.background.color};
                    padding:${style.padding}px;
                `
                const ItemBoxStyle = `
                    width:100%;
                    height:100%;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;  
                    z-index:2;
                    box-sizing: border-box;
                    overflow: hidden;
                    position: relative;
                `
                const textStyle = `
                    font-size:${style.font.size}px;
                    color:${style.font.color};
                    position: relative;
                    user-select:none;
                `
                const waterStyle = `
                    position: absolute;
                    width: 200%;
                    height: 200%;
                    animation: water-waves linear infinite;
                    background-color: ${style.color};
                `

                const bottom = (100 - item.data) + 100
                // top: 40%; 45 50
                const water1Style = `
                    bottom: -${bottom - 10}%;
                    left: -25%;
                    opacity: 0.7;
                    border-radius: 40%;
                    animation-duration: 5s;
                `
                const water2Style = `
                    bottom: -${bottom - 5}%;
                    left: -35%;
                    border-radius: 35%;
                    opacity: 0.5;
                    animation-duration: 7s;
                `
                const water3Style = `
                    bottom: -${bottom}%;
                    left: -35%;
                    opacity: 0.3;
                    border-radius: 33%;
                    animation-duration: 11s;
                `

                ItemHtml += `
                    <div id="${item.id}" style="${ItemStyle}" class="echarts3D-Water-Polo">
                        <div style="${ItemBoxStyle}">
                            <div class="water water1" style="${waterStyle}${water1Style}"></div>
                            <div class="water water2" style="${waterStyle}${water2Style}"></div>
                            <div class="water water3" style="${waterStyle}${water3Style}"></div>
                            <div class="text" style="${textStyle}">${item.data}%</div>
                        </div>
                    </div>
                `
            }

            _div.innerHTML = `${_style}${ItemHtml}`
            return _div
        }
        const _createDom = createWaterPoloDom(data, option)
        //插入到页面中
        _Utils.operationDom("append", nodeId, _createDom)

        //定位到页面中
        for (let i = 0; i < data.length; i++) {
            const item = data[i]
            const dom = document.getElementById(item.id);
            // let cartographics = [Cesium.Cartographic.fromDegrees(item.position[0], item.position[1])];
            // // sampleTerrain=采样地形 三个参数分别备注如下
            // Cesium.sampleTerrain(
            //     this.viewer.scene.terrainProvider, //地形相关的
            //     14, //地形高度级别
            //     cartographics
            // ).then((updatedPositions) => {
            //     const { height, latitude, longitude } = updatedPositions[0]
            // });

            /**
             * scene = 场景
             * preRender = Event 事件订阅
             * addEventListener = 注册一个在事件引发时执行的回调函数
             *
             */
            this.viewer.scene.preRender.addEventListener(() => {
                const position = Cesium.Cartesian3.fromDegrees(item.position[0], item.position[1], item.position[2] || 0);
                /**
                 * 转换为画布坐标
                 * cartesianToCanvasCoordinates = 将笛卡尔坐标中的位置转换为画布坐标。这通常用于放置与场景中的对象位于同一屏幕位置的HTML元素。
                 */
                const canvasPosition = this.viewer.scene.cartesianToCanvasCoordinates(
                    position,
                    new Cesium.Cartesian2()
                );

                if (Cesium.defined(canvasPosition)) {
                    dom.style.top = canvasPosition.y + "px";
                    dom.style.left = canvasPosition.x + "px";
                }
            });

        }


    }
}

export default Echarts3D