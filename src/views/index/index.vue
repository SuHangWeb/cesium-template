<template>
  <div class="container">
    <highlight />
    <!-- <docMd /> -->
  </div>
</template>

<script>
import docMd from "@/assets/doc/home.md";
import highlight from "@/components/highlight";
import code from "./module/highlight";
export default {
  name: "index",
  components: { docMd, highlight },
  created() {
    this.$store.dispatch("highlight/set_code", code);
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
}
</style>
