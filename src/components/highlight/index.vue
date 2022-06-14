<template>
  <div class="highlight" v-highlight>
    <pre>
        <code>
            {{content}}
        </code>
    </pre>
  </div>
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
      content: `
        <div class="highlight">
            <div class="post-content" v-html="content" v-highlight></div>
        </div>
      `,
    };
  },
  methods: {},
};
</script>
  
<style scoped lang="scss">
.highlight {
}
</style>