<template>
  <div class="container">
    <el-card class="box-card" style="margin-bottom: 16px">
      <div slot="header" class="clearfix">
        <span>参考文档</span>
      </div>
      <div>
        <div
          v-for="(item, index) in doc"
          :key="index"
          :class="`pan-btn ${item.style}`"
          @click="link(item)"
        >
          {{ item.title }}
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>三方依赖（根据需求酌情使用）</span>
      </div>
      <div class="card-main">
        <div v-for="(item, index) in tripartite" :key="index">
          <el-tooltip
            class="item"
            effect="dark"
            :content="item.describe"
            placement="top-start"
          >
            <div
              :class="`pan-btn ${item.style}`"
              @click="link(item)"
            >
              {{ item.title }}
            </div>
          </el-tooltip>
        </div>
      </div>
    </el-card>
  </div>
</template>
 
<script>
import { doc, tripartite } from "./module/data";
export default {
  name: "Files",
  data() {
    return {
      doc: doc,
      tripartite: tripartite,
    };
  },
  methods: {
    /**
     * 跳转
     */
    link(item) {
      window.open(item.link);
    },
  },
};
</script>
  
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  padding: 16px;
  .pan-btn {
    margin: 5px;
  }
  .card-main {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>