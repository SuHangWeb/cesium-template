<template>
  <div class="popupDom" :id="item.id">
    <div class="close" @click="close">×</div>
    <div class="title">{{ item.title }}</div>
    <div class="info-view">
      <div class="info-item">
        <div class="label">建筑面积：</div>
        <div class="value">
          <template v-if="item.area != ''">{{ item.area }}</template>
          <template v-else>未知</template>
        </div>
      </div>
      <div class="info-item">
        <div class="label">建筑年份：</div>
        <div class="value">
          <template v-if="item.year != ''">{{ item.year }}</template>
          <template v-else>未知</template>
        </div>
      </div>
    </div>
    <div class="triangle"></div>
  </div>
</template>
 
<script>
export default {
  name: "popupDom",
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close", this.item.id);
    },
  },
};
</script>
  
<style scoped lang="scss">
.popupDom {
  padding: 20px;
  background-color: #fff;
  width: 240px;
  border-radius: 6px;
  position: fixed;
  z-index: 2;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
    color: #409eff;
    &:hover {
      color: red;
    }
  }
  .title {
    text-align: center;
    color: #333;
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .info-view {
    .info-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0;
      font-size: 16px;
      .label {
        color: #333;
      }
      .value {
        color: #666;
      }
    }
  }
  .triangle {
    position: absolute;
    bottom: 0;
    left: 30px;
    border: 16px solid transparent;
    border-top-color: #fff;
    border-bottom: 0;
    margin: 0 0 -16px -16px;
    border-left: 0;
  }
}
</style>