<template>
    <el-card class="panel-card">
        <div slot="header" class="clearfix">
            <span>操作面板</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="clears">清楚</el-button>
        </div>
        <div class="panel-content">
            <el-button type="primary" size="mini" @click="clickCreate('Point')">绘制点</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('Polyline')">绘制线</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('polygonGather')">绘制面</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('Rain')">雨</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('Snow')">雪</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('Fog')">雾</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('private-Fog')">雾（私有）</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('private-Sun')">太阳（私有）</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('private-Moon')">月亮（私有）</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('colourless')">黑白</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('gaussianBlur')">高斯模糊</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('brightness')">亮度</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('depthOfField')">景深</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('solarFlare')">耀斑</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('nightVision')">夜视</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('ambientOcclusion')">环境遮蔽</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('shadow')">阴影</el-button>
        </div>
    </el-card>
</template>
 
<script>
export default {
    props: {
        option: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            clickCreateFor: [
                {
                    label: "",
                    value: ""
                }
            ]
        };
    },
    created() { },
    mounted() {

    },
    methods: {
        clickCreate(name) {
            this.$emit('draws', name)
        },
        clears() {
            this.$emit('clears')
        }
    },
};
</script>
  
<style scoped lang="scss">
.panel-card {
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 300px;

    .panel-content {
        >* {
            margin: 0 10px 10px 0;
        }
    }
}
</style>