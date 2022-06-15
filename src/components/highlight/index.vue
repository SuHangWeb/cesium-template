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
          <el-radio-button
            v-for="(item, index) in codeComputed"
            :key="index"
            :label="item.codeLanguage"
            >{{ item.codeLanguageLable }}</el-radio-button
          >
        </el-radio-group>
      </div>
    </template>
    <div class="code-view">
      <div class="subCodeLanguage">
        <el-radio-group size="mini" v-model="subCodeLanguage">
          <el-radio-button
            v-for="(item, index) in subCodeComputed.code"
            :key="index"
            :label="item.codeLanguage"
            >{{ item.codeLanguage }}</el-radio-button
          >
        </el-radio-group>
        <el-dropdown>
          <el-button size="mini" type="primary">
            依赖文件<i class="el-icon-connection el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled
              >当期示例依赖文件（注意顺序）</el-dropdown-item
            >
            <el-dropdown-item
              v-for="(item, index) in subCodeComputed.relyOn"
              :key="index"
              >{{ item.label }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="code-main">
        <div v-for="(_item, _index) in codeComputed" :key="_index">
          <div v-if="_item.codeLanguage == codeLanguage">
            <div v-for="(item, index) in subCodeComputed.code" :key="index">
              <div
                class="code-main-view"
                v-if="item.codeLanguage == subCodeLanguage"
                v-code
              >
                <pre>
                  <code>
                      {{item.content}}
                  </code>
                </pre>
              </div>
            </div>
          </div>
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
    //一级计算
    codeComputed() {
      function get_subCodeLanguage(type) {
        if (type == "VUE") {
          return "Vue";
        }
        if (type == "JS") {
          return "原生JS";
        }
      }
      if (this.code.length == 0) {
        return [];
      } else {
        return this.code.map((item) => {
          return {
            ...item,
            codeLanguageLable: get_subCodeLanguage(item.codeLanguage),
          };
        });
      }
    },
    //二级计算
    subCodeComputed() {
      const _filter = this.code.filter(
        (item) => this.codeLanguage == item.codeLanguage
      );
      return _filter.length != 0 ? _filter[0] : [];
    },
  },
  data() {
    return {
      codeLanguage: "VUE",
      subCodeLanguage: "html",
    };
  },
  created() {
    if (this.code[0].length != 0) {
      this.codeLanguage = this.code[0].codeLanguage;
      this.subCodeLanguage = this.code[0].code[0].codeLanguage;
    }
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

      height: calc(100% - 68px);
      position: relative;
      .code-main-view {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px;
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