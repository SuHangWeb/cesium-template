<template>
  <div class="container">
    <div class="view">
      <path-planning-driving />
    </div>
  </div>
</template>
 
<script>
import pathPlanningDriving from "@/common/cesium/Map/Gaode/components/pathPlanning/driving.vue";
export default {
  name: "BlankPage",
  components: { pathPlanningDriving },
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