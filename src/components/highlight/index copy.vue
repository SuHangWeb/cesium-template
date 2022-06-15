<template>
  <div class="highlight" v-highlight>
    <pre>
        <code>
            {{code}}
        </code>
    </pre>
  </div>
</template>
 
<script>
// this.$store.dispatch("highlight/set_code", "");
import { mapState } from "vuex";
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    ...mapState({
      code: (state) => state.highlight.code,
    }),
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