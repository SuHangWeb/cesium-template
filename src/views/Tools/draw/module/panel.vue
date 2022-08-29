<template>
    <el-card class="panel-card">
        <div slot="header" class="clearfix">
            <span>操作面板</span>
        </div>
        <div class="panel-content">
            <el-button type="primary" size="mini">绘制点</el-button>
            <el-button type="primary" size="mini">绘制线</el-button>
            <el-button type="primary" size="mini">绘制面</el-button>
            <el-button type="primary" size="mini" @click="clickCreate('Rain')">雨</el-button>
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

        };
    },
    created() { },
    mounted() {

    },
    methods: {
        clickCreate(name) {
            this.$emit('draws', name)
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