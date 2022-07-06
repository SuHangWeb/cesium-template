<template>
  <div class="container">
    <div class="view">
      <path-planning-transfer />
    </div>
  </div>
</template>
 
<script>
import pathPlanningTransfer from "@/common/cesium/Map/Gaode/components/pathPlanning/transfer.vue";
export default {
  name: "BlankPage",
  components: { pathPlanningTransfer },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
  
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  padding: 16px;
  background-color: #eee;
  .view {
    width: 410px;
  }
}
</style>