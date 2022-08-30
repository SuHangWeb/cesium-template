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
                    label: "点",
                    value: "Point"
                },
                {
                    label: "线",
                    value: "Polyline"
                },
                {
                    label: "面",
                    value: "polygon"
                },
                {
                    label: "矩形",
                    value: "rectangle"
                },
                {
                    label: "圆",
                    value: "ellipse"
                },
                {
                    label: "箭头",
                    value: "arrow"
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