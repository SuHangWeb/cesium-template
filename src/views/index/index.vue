<template>
  <div class="container">
    <highlight/>
    <!-- <docMd /> -->
  </div>
</template>

<script>
import docMd from "@/assets/doc/home.md";
import highlight from "@/components/highlight";
export default {
  name: "index",
  components: { docMd, highlight },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
}
</style>
