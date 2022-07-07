<template>
  <div :class="`pan-btn ${randomColor}`" @click="btnClick">{{ title }}</div>
</template>

<script>
import colors from "./colors";
import { getRandom } from "@/utils";
export default {
  data() {
    return {
      colors: colors,
    };
  },
  props: {
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    identifier: {
      type: String,
      default: () => {
        return "";
      },
    },
    className: {
      type: String,
      default: () => {
        return "";
      },
    },
    index: {
      type: Number | String,
      default: () => {
        return "";
      },
    },
  },
  computed: {
    randomColor() {
      if (this.className !== "") {
        return this.className;
      }
      if (this.index === "") {
        return this.colors[getRandom(0, 25)].className;
      } else {
        return this.colors[this.index].className;
      }
    },
  },
  methods: {
    btnClick() {
      if (this.className !== "") {
        this.$emit("trigger", {
          type: "class",
          data: this.className,
          identifier: this.identifier,
        });
      } else {
        this.$emit("trigger", {
          type: "index",
          data: this.index,
          identifier: this.identifier,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
