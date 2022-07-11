<template>
  <div
    :class="`gaode-diricon ${iconName()}`"
    :style="{ backgroundColor: bgColor }"
  ></div>
</template>
 
<script>
import Diricon from "./Diricon";
export default {
  props: {
    //交通方式
    //driving=驾车  walking=步行  transfer=公交 riding=骑行 text=文字  vehicle=交通工具 text=文字
    type: {
      type: String,
      default: () => {
        return "driving";
      },
    },
    /**
     * 如果type参数为 driving=驾车  walking=步行  transfer=公交 riding=骑行
     * 当前可设置灰色 只要布尔值为false 默认为蓝色true
     */
    typeColor: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    //背景色  type=vehicle 的时候使用
    bgColor: {
      type: String,
      default: () => {
        return "";
      },
    },
    //图标类型 目前api提供的是汉字 所以根据汉字区分
    value: {
      type: String | Array,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      _Diricon: null,
    };
  },
  created() {
    this._Diricon = new Diricon();
  },
  mounted() {},
  methods: {
    iconName() {
      return this._Diricon.setIcon(this.type, this.value, this.typeColor);
    },
  },
};
</script>
  
<style scoped lang="scss">
@import "./index.scss";
</style>