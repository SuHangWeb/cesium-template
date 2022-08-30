<template>
    <el-card class="panel-card">
        <div slot="header" class="clearfix">
            <span>操作面板</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="clears">清楚</el-button>
        </div>
        <div class="panel-content">
            <el-button type="primary" v-for="(item, index) in clickCreateFor" :key="index" size="mini"
                @click="clickCreate(item.value)">{{  item.label  }}</el-button>
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
                    label: "雨",
                    value: "Rain"
                },
                {
                    label: "雪",
                    value: "Snow"
                }, {
                    label: "雾",
                    value: "Fog"
                }, {
                    label: "雾（私有）",
                    value: "private-Fog"
                }, {
                    label: "太阳（私有）",
                    value: "private-Sun"
                }, {
                    label: "月亮（私有）",
                    value: "private-Moon"
                }, {
                    label: "黑白",
                    value: "colourless"
                }, {
                    label: "高斯模糊",
                    value: "gaussianBlur"
                }, {
                    label: "亮度",
                    value: "brightness"
                }, {
                    label: "景深",
                    value: "depthOfField"
                }, {
                    label: "耀斑",
                    value: "solarFlare"
                }, {
                    label: "夜视",
                    value: "nightVision"
                }, {
                    label: "环境遮蔽",
                    value: "ambientOcclusion"
                }, {
                    label: "阴影",
                    value: "shadow"
                }, {
                    label: "天际线",
                    value: "Skyline"
                }, {
                    label: "轮廓（描边）",
                    value: "Stroke"
                }, {
                    label: "泛光",
                    value: "Bloom"
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