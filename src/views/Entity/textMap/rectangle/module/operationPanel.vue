<template>
  <div class="operationPanel">
    <div class="tip-view">
      <div class="tip-item">
        <div class="tip-title"></div>
        <el-steps :active="2" align-center>
          <el-step
            title="步骤1"
            description="这是一段很长很长很长的描述性文字"
          ></el-step>
          <el-step
            title="步骤2"
            description="这是一段很长很长很长的描述性文字"
          ></el-step>
          <el-step
            title="步骤3"
            description="这是一段很长很长很长的描述性文字"
          ></el-step>
          <el-step
            title="步骤4"
            description="这是一段很长很长很长的描述性文字"
          ></el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
  
<style scoped lang="scss">
.operationPanel {
  width: 300px;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 2;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 6px 0 0 0;
}
</style>