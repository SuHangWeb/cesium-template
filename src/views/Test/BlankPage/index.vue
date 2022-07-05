<template>
  <div class="container">
    <diricon :value="value" type="vehicle" bgColor="#EE782E" />
  </div>
</template>
 
<script>
import diricon from "@/common/cesium/Map/Gaode/components/diricon/index.vue";
export default {
  name: "BlankPage",
  components: { diricon },
  data() {
    return {
      value: "metro",
    };
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
}
</style>