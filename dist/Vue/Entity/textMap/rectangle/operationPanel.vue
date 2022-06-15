<template>
  <div class="operationPanel">
    <div class="tip-view">
      <div class="tip-item">
        <div class="tip-title">绘制：</div>
        <div class="tip-step">
          输入文字=》点击绘制按钮 开始绘制
          =》按住鼠标左键拖动=》抬起鼠标左键结束绘制
        </div>
      </div>
      <div class="tip-item">
        <div class="tip-title">编辑：</div>
        <div class="tip-step">
          点击编辑按钮=》选中要编辑的图形 =》拖动点位=》鼠标右键结束编辑
        </div>
      </div>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="颜色">
        <el-color-picker size="mini" v-model="form.color"></el-color-picker>
      </el-form-item>
      <el-form-item label="动画">
        <el-switch
          v-model="form.is_animation"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="地形">
        <el-select
          class="value"
          size="mini"
          v-model="form.terrainValue"
          placeholder="请选择地形"
        >
          <el-option
            v-for="item in terrain"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文字">
        <el-input
          class="value"
          size="mini"
          placeholder="请输入要创建的文字"
          v-model="form.text"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="drawStart">绘制</el-button>
        <el-button type="warning" v-if="edit" @click="editRect">编辑</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
export default {
  props: {
    edit: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      terrain: [
        {
          label: "位置绝对",
          value: "NONE",
        },
        {
          label: "位置固定在地形上",
          value: "CLAMP_TO_GROUND",
        },
        {
          label: "位置高度是指地形上方的高度",
          value: "RELATIVE_TO_GROUND",
        },
      ],
      form: {
        fontSize: 100,
        color: "#409EFF",
        is_animation: false,
        terrainValue: "CLAMP_TO_GROUND",
        text: "到此一游",
      },
    };
  },
  methods: {
    /**
     * 开始绘制
     */
    drawStart() {
      if (this.form.fontColor == "") {
        this.$notify({
          title: "警告",
          message: "请选择颜色",
          type: "warning",
        });
        return;
      }
      if (this.form.text == "") {
        this.$notify({
          title: "警告",
          message: "请输入要创建的文字",
          type: "warning",
        });
        return;
      }
      this.$emit("draw", this.form);
    },
    /**
     * 编辑
     */
    editRect() {
      this.$emit("edit");
    },
  },
};
</script>
  
<style scoped lang="scss">
.operationPanel {
  width: 400px;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 2;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 6px 0 0 0;
  .tip-view {
    padding-bottom: 10px;
    .tip-item {
      line-height: 1.5;
      margin-bottom: 10px;
      .tip-title {
        font-size: 14px;
        font-weight: bold;
      }
      .tip-step {
        font-size: 12px;
      }
    }
  }
  ::v-deep .el-form-item {
    margin-bottom: 5px;
  }
}
</style>