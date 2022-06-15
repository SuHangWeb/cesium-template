<template>
  <el-drawer
    append-to-body
    destroy-on-close
    :visible.sync="viewCode"
    direction="rtl"
    :before-close="handleClose"
    size="700px"
    custom-class="highlight"
  >
    <template #title>
      <div class="title-view">
        <div class="title">源代码</div>
        <el-radio-group size="mini" v-model="codeLanguage">
          <el-radio-button label="VUE">Vue</el-radio-button>
          <el-radio-button label="JS">原生JS</el-radio-button>
        </el-radio-group>
      </div>
    </template>
    <div class="code-view">
      <div class="subCodeLanguage">
        <el-radio-group size="mini" v-model="subCodeLanguage">
          <el-radio-button label="html">html</el-radio-button>
          <el-radio-button label="js">js</el-radio-button>
          <el-radio-button label="css">css</el-radio-button>
        </el-radio-group>
        <el-dropdown>
          <el-button size="mini" type="primary">
            依赖文件<i class="el-icon-connection el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled
              >当期示例依赖文件（注意顺序）</el-dropdown-item
            >
            <el-dropdown-item>Echarts.js</el-dropdown-item>
            <el-dropdown-item>Canvas.js</el-dropdown-item>
            <el-dropdown-item>Entity.js</el-dropdown-item>
            <el-dropdown-item>index.js</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="code-main">
        <div class="code-main-view" v-code>
          <pre>
            <code>
                {{code}}
            </code>
          </pre>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
 
<script>
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
      viewCode: (state) => state.highlight.viewCode,
    }),
  },
  data() {
    return {
      codeLanguage: "VUE",
      subCodeLanguage: "html",
    };
  },
  methods: {
    handleClose() {
      this.$store.dispatch("highlight/set_view_code", false);
    },
  },
};
</script>
  
<style scoped lang="scss">
.highlight {
  .title-view {
    display: flex;
    align-items: center;
    .title {
      margin-right: 20px;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .code-view {
    border-top: 1px solid #dcdfe6;
    height: calc(100vh - 90px);
    display: flex;
    flex-direction: column;
    .subCodeLanguage {
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      height: 68px;
    }
    .code-main {
      width: 100%;
      background: #f8f8f8;
      box-sizing: border-box;
      padding: 10px;
      height: calc(100% - 68px);
      .code-main-view {
        height: 100%;
        pre {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          // white-space: pre-wrap;
          // tab-size: 2;
          code {
            margin: 0;
            height: 100%;
            box-sizing: border-box;
            //  white-space: pre;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>