<template>
  <div class="container">
    <viewer
      :images="images"
      :options="options"
      @inited="inited"
      class="viewer"
      ref="viewer"
    >
      <template #default="scope">
        <img
          class="hide"
          v-for="(item, index) in scope.images"
          :src="item"
          :key="index"
        />
        <!-- {{ scope.options }} -->
      </template>
    </viewer>

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
            <div :class="`pan-btn ${item.style}`" @click="link(item)">
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
import "viewerjs/dist/viewer.css";
import { component as Viewer } from "v-viewer";
export default {
  components: { Viewer },
  name: "Files",
  data() {
    return {
      doc: doc,
      tripartite: tripartite,
      images: [],
      options: {
        inline: false,
        button: true,
        navbar: false,
        title: true,
        toolbar: false,
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: true,
        fullscreen: true,
        keyboard: true,
      },
    };
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer;
    },
    show() {
      this.$viewer.show();
    },
    /**
     * 跳转
     */
    link(item) {
      if (item?.externalLinks && item.externalLinks) {
        window.open(item.link);
      } else {
        this.images = [item.link];
        this.$viewer.show();
      }
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
.hide {
  display: none;
}
</style>