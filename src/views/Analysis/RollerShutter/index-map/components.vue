<template>
    <div class="rollerShutterBox">
        <div class="titleBox">
            <h3>卷帘</h3>
            <Icon class="colseIcon" type="md-close" @click="closeRollerShutterState"/>
        </div>
        <div class="toolbar-containe">
            <div class="toggle-panel">
                <span class="iconfont icon-zhankai1"></span>
            </div>
            <div class="toolbar" id="toolbar">
                <table style="margin: 10px 0;">
                    <tr>
                        <td>
                            <label class="lang" lang-key="shutterStyle">卷帘模式</label>
                        </td>
                        <td>
                            <select name="scanMode" id="scanMode" class="scanAngle lang" v-model="selected" 
                                style="width: 130px;height: 30px;margin-left: 12px;"
                                @input='scanModeChange'>
                                <option value="lrShutter" class="lang" lang-key="lrShutter">左右卷帘</option>
                                <option value="tbShutter" class="lang" lang-key="tbShutter">上下卷帘</option>
                                <option value="disableShutters" class="lang" lang-key="disableShutters">不启用卷帘</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <table id="shutterSetting" style="display:none;">
                    <tr class="header">
                        <td colspan="3">
                            <label class="lang" lang-key="shutterLayer">底图</label>
                        </td>
                    </tr>
                    <tr>
                        <!-- 左右卷帘 -->
                        <td class="lrShutter">
                            <label class="lang" lang-key="disableShutters">不启用</label>
                            <input type="radio" name="lrLayer" class="lrLayer" value="0" @input="lrShutterChange(0)">
                        </td>
                        <td class="lrShutter">
                            <label class="lang" lang-key="leftShutters">左侧显示</label>
                            <input type="radio" name="lrLayer" class="lrLayer" value="1" checked="checked" @input="lrShutterChange(1)">
                        </td>
                        <td class="lrShutter">
                            <label class="lang" lang-key="rightShutters">右侧显示</label>
                            <input type="radio" name="lrLayer" class="lrLayer" value="2" @input="lrShutterChange(2)">
                        </td>
                        <!-- 上下卷帘 -->
                        <td class="tbShutter">
                            <label class="lang" lang-key="disableShutters">不启用</label>
                            <input type="radio" name="tbLayer" class="tbLayer" value="0" @input="tbShutterChange(0)">
                        </td>
                        <td class="tbShutter">
                            <label class="lang" lang-key="topShutters">上侧显示</label>
                            <input type="radio" name="tbLayer" class="tbLayer" value="3" checked="checked" @input="tbShutterChange(3)">
                        </td>
                        <td class="tbShutter">
                            <label class="lang" lang-key="bottomShutters">下侧显示</label>
                            <input type="radio" name="tbLayer" class="tbLayer" value="4" @input="tbShutterChange(4)">
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    data(){
        return {
            layer:'',
            selected:'lrShutter', // 卷帘模式的选中
        }
    },
    methods:{
        // 关闭面板
        closeRollerShutterState(){
            this.$emit('on-Close');
            $('#tbSlider').hide(); // 上下卷帘分割条隐藏
            $('#lrSlider').hide(); // 左右卷帘分割条隐藏
        },
        // 设置卷帘模式
        scanModeChange(){
            this.$nextTick(()=>{
                this.changeShutterStyle(this.selected);
            })
        },
        // 切换卷帘模式
        changeShutterStyle(value) {
            switch (value){
                case 'disableShutters': // 不卷帘
                    viewer.scene.imagerySplitPosition= Cesium.ImagerySplitDirection.NONE;
                    // window.viewer.layer.splitDirection = Cesium.ImagerySplitDirection.NONE;
                    $('#shutterSetting').css('display', 'none'); // 选项隐藏
                    $('#tbSlider').hide(); // 上下卷帘分割条隐藏
                    $('#lrSlider').hide(); // 左右卷帘分割条隐藏
                    break;
                case 'lrShutter': // 左右卷帘
                    // 1 layer切割
                    this.setObjectShutter(this.layer, Number($("input[name='lrLayer']:checked").val()));
                    // 2 切割线显隐
                    $('.shutter-slider').css('display','')
                    $('#lrSlider').css('display','');
                    $('#tbSlider').css('display','none');
                    viewer.scene.imagerySplitPosition = (lrSlider.offsetLeft) / lrSlider.parentElement.offsetWidth;
                    // 3 选项显隐
                    $('#shutterSetting').css('display', 'table'); // 总选项
                    $('.tbShutter').css('display', 'none'); // 子选项
                    $('.lrShutter').css('display', ''); // 子选项
                    break;
                case 'tbShutter': // 上下卷帘
                    this.setObjectShutter(this.layer, Number($("input[name='tbLayer']:checked").val()));
                    $('.shutter-slider').css('display','')
                    $('#lrSlider').css('display','none');
                    $('#tbSlider').css('display','');
                    viewer.scene.imagerySplitPosition = 1.0 - (tbSlider.offsetTop) / tbSlider.parentElement.offsetHeight;
                    $('#shutterSetting').css('display', 'table');
                    $('.tbShutter').css('display', '');
                    $('.lrShutter').css('display', 'none');
                    break;
                default:
                    viewer.scene.imagerySplitPosition= Cesium.ImagerySplitDirection.NONE;
                    // this.layer.splitDirection = Cesium.ImagerySplitDirection.NONE;
                    $('#shutterSetting').css('display', 'none');
                    $('#tbSlider').hide();
                    $('#lrSlider').hide();
                    break;
            }
        },

        //左右卷帘设置
        lrShutterChange(value){
            this.setObjectShutter(this.layer, value); 
        },
        //上下卷帘设置
        tbShutterChange(value) {
            this.setObjectShutter(this.layer, value);
        },
        // 卷帘模式
        setObjectShutter(object, key) {
            switch (key) {
                case 0:
                    object.splitDirection = Cesium.ImagerySplitDirection.NONE;
                    break;
                case 1:
                    object.splitDirection = Cesium.ImagerySplitDirection.LEFT;
                    break;
                case 2:
                    object.splitDirection = Cesium.ImagerySplitDirection.RIGHT;
                    break;
                case 3:
                    object.splitDirection = Cesium.ImagerySplitDirection.TOP;
                    break;
                case 4:
                    // console.log(object.splitDirection)
                    object.splitDirection = Cesium.ImagerySplitDirection.BOTTOM;
                    break;
                default:
                    break;
            }
        }
    },
    mounted(){
        // let viewer=this.earthMapManager.viewer;     
         
        // 底图
        this.layer = window.viewer.imageryLayers.addImageryProvider(new Cesium.TiandituImageryProvider({
            mapStyle: Cesium.TiandituMapsStyle.IMG_C.Dark,
        }));

        // 左右卷帘
        // var lrSlider = this.$parent.$refs.lrSlider;
        // 上下卷帘
        // var tdSlider=this.$parent.$refs.tbSlider;

        // 页面开始时调用左右卷帘
        this.changeShutterStyle('lrShutter')
       
        //移动左右卷帘位置
        var lrSliderHandler = new Cesium.ScreenSpaceEventHandler(lrSlider); // 定义画布元素的事件处理
        var lrSliderMoveActive = false;
        function lrSliderMmove(movement) {
            if (!lrSliderMoveActive) {
                return;
            }
            var relativeOffset = movement.endPosition.x;
            var splitPosition = (lrSlider.offsetLeft + relativeOffset) / lrSlider.parentElement.offsetWidth;
            lrSlider.style.left = 100.0 * splitPosition + '%';
            window.viewer.scene.imagerySplitPosition = splitPosition;
        }
        // 左键点击
        lrSliderHandler.setInputAction(function () {
            lrSliderMoveActive = true;
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
        // // 两指开始
        // lrSliderHandler.setInputAction(function () {
        //     lrSliderMoveActive = true; 
        // }, Cesium.ScreenSpaceEventType.PINCH_START);
        // // 移动
        lrSliderHandler.setInputAction(lrSliderMmove, Cesium.ScreenSpaceEventType.MOUSE_MOVE); 
        // // 两指移动
        // lrSliderHandler.setInputAction(lrSliderMmove, Cesium.ScreenSpaceEventType.PINCH_MOVE); 
        // 左键抬起
        lrSliderHandler.setInputAction(function () {
            lrSliderMoveActive = false;
        }, Cesium.ScreenSpaceEventType.LEFT_UP);
        // // 两指事件在触摸面上的结束
        // lrSliderHandler.setInputAction(function () {
        //     lrSliderMoveActive = false;
        // }, Cesium.ScreenSpaceEventType.PINCH_END);


        //移动上下卷帘位置
        var tbSliderHandler = new Cesium.ScreenSpaceEventHandler(tbSlider);
        var tbSliderMoveActive = false;
        // 核心代码
        function tbSliderMove(movement) {
            if (!tbSliderMoveActive) {
                return;
            }
            var relativeOffset = movement.endPosition.y; // 移动终点位置的y轴
            var splitPosition = 1.0 - (tbSlider.offsetTop + relativeOffset)/ tbSlider.parentElement.offsetHeight;
            tbSlider.style.top = 100.0 * (1.0 - splitPosition) + '%'; // 分割线的top
            window.viewer.scene.imagerySplitPosition = splitPosition; // 图层分割的位置
            // console.log(tbSlider.style.top)
            // console.log(viewer.scene.imagerySplitPosition)
        }
        tbSliderHandler.setInputAction(function () {
            tbSliderMoveActive = true;
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
        // tbSliderHandler.setInputAction(function () {
        //     tbSliderMoveActive = true;
        // }, Cesium.ScreenSpaceEventType.PINCH_START);
        tbSliderHandler.setInputAction(tbSliderMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        // tbSliderHandler.setInputAction(tbSliderMove, Cesium.ScreenSpaceEventType.PINCH_MOVE);
        tbSliderHandler.setInputAction(function () {
            tbSliderMoveActive = false;
        }, Cesium.ScreenSpaceEventType.LEFT_UP);
        // tbSliderHandler.setInputAction(function () {
        //     tbSliderMoveActive = false;
        // }, Cesium.ScreenSpaceEventType.PINCH_END);
    },
    destroyed(){
        window.viewer.imageryLayers.remove(this.layer);
    }
}
</script>

<style lang="less" scoped>
    .rollerShutterBox {
        position: fixed;
        top: 90px;
        right: 25px;
        width: 310px;
        background: #3A455C;
        z-index: 999;
    }
    .titleBox {
        display: flex;justify-content: space-between;
        align-items: center;
        padding: 5px 15px 0 15px;;
        color: #fff;
    }
    .toolbar-containe {
        .toolbar {
            background-color: #3A455C;
            color: #fff;
        }
    }

    table {
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
        // color: #3A455C;
        font-size: 13.3px;
        width: 100%;
    }

    table tr {
        height: 32px;
    }
    table tr.header {
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 2px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    table td {
        padding-left: 10px;
        text-align: left;
    }
    // .shutter-slider {
    //     display: none;
    //     position: absolute;
    //     background-color: rgb(230, 227, 227);
    //     z-index: 999;
    // }
    // #lrSlider {
    //     left: 50%;
    //     top: 0px;
    //     width: 3px;
    //     height: 100%;
    // }

    // #lrSlider:hover {
    //     cursor: ew-resize;
    // }
    // #tbSlider {
    //     left: 0px;
    //     top: 50%;
    //     width: 100%;
    //     height: 3px;
    // }

    // #tbSlider:hover {
    //     cursor: ns-resize;
    // }

    input[type=radio],
    input[type=checkbox] {
        vertical-align: middle;
        margin-top: -2px;
    }
</style>
