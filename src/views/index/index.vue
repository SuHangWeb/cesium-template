<template>
  <div class="container">
    <highlight />
    <!-- <docMd /> -->
  </div>
</template>

<script>
import docMd from "@/assets/doc/home.md";
import highlight from "@/components/highlight";

export default {
  name: "index",
  components: { docMd, highlight },
  created() {
    const code = `
        <div class="highlight">
            <div class="post-content" v-html="content" v-highlight></div>
        </div>
      `;
    this.$store.dispatch("highlight/set_code", code);
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
}
</style>
