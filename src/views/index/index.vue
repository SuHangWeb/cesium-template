<template>
  <div class="container">
    <docMd />
  </div>
</template>

<script>
import docMd from "@/assets/doc/home.md";
export default {
  name: "index",
  components: { docMd },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
}
</style>
