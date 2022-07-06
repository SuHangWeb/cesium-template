<template>
  <div class="pathPlanning">
    <el-collapse accordion v-model="collapseIndex" @change="collapseChange">
      <el-collapse-item :name="0">
        <template slot="title">
          <div class="head">
            <div class="head-step-view">
              <div class="head-step-item">
                <img
                  src="@/common/cesium/Map/Gaode/components/diricon/image/busline.png"
                  alt=""
                />
                V108路
              </div>
              <i class="el-icon-arrow-right icon"></i>
              <div class="head-step-item">
                <img
                  src="@/common/cesium/Map/Gaode/components/diricon/image/subway.png"
                  alt=""
                />
                V108路
              </div>
              <i class="el-icon-arrow-right icon"></i>
              <div class="head-step-item">
                <img
                  src="@/common/cesium/Map/Gaode/components/diricon/image/busline.png"
                  alt=""
                />
                V108路
              </div>
            </div>
            <div class="info-view">
              <div class="info">
                <div class="info-item">
                  约{{ secondToTime(12345) }}（{{ metreToKilometre(12345) }}）
                </div>
                <span>|</span>
                <div class="info-item">步行{{ metreToKilometre(999) }}</div>
                <span>|</span>
                <div class="info-item" style="color: red">6元</div>
              </div>
            </div>
          </div>
        </template>
        <div class="step-main">
          <div class="step-item start">
            <diricon class="diricon" type="text" value="起" />
            <div class="label">沈阳北站</div>
          </div>

          <div>
            <div class="step-item WALK">
              <div class="label">步行 1000米 至 京东物流园西门(约2分钟)</div>
            </div>
            <div class="step-item Multiple">
              <div class="spot"></div>
              <diricon
                class="diricon"
                type="vehicle"
                value="transfer"
                bgColor="#418AEC"
              />
              <div class="multiple-step">
                <div class="multiple-step-head">
                  V108路(苏宁物流分拣中心--金杯汽车制造有限公司)
                </div>
                <div class="multiple-step-content">
                  <div class="multiple-step-content-item">
                    <div class="multiple-step-content-item-value">长青南街</div>
                    <div class="multiple-step-content-item-label">
                      上车（A口进）
                    </div>
                  </div>

                  <div class="list" :class="{ hide: open }">
                    <ul>
                      <li>朗日街</li>
                      <li>朗日街</li>
                      <li>朗日街</li>
                      <li>朗日街</li>
                    </ul>
                  </div>
                  <div class="multiple-step-content-item">
                    <div class="multiple-step-content-item-value">奥体中心</div>
                    <div class="multiple-step-content-item-label">下车</div>
                  </div>
                  <div
                    class="multiple-step-content-item-info"
                    :class="{ open: open }"
                  >
                    <div class="multiple-step-content-item-info-text">
                      上车站 首：06:02 末：23:02 约7分钟/趟
                    </div>
                    <div
                      class="multiple-step-content-item-info-leng"
                      @click="open = !open"
                    >
                      <span>3站</span>
                      <i class="el-icon-arrow-up icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="step-item end">
            <diricon class="diricon" type="text" value="终" />
            <div class="label">郡原悦城</div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
 
<script>
import diricon from "@/common/cesium/Map/Gaode/components/diricon";
export default {
  components: { diricon },
  props: {
    //出发位置
    start: {
      type: Object,
      default: () => {
        return {};
      },
    },
    //终点位置
    end: {
      type: Object,
      default: () => {
        return {};
      },
    },
    //数据
    dataArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      collapseIndex: 0,
      open: false,
    };
  },
  computed: {
    // 米转换公里
    metreToKilometre() {
      return (metre) => {
        if (metre < 1000) {
          return metre + "米";
        } else {
          return (metre / 1000).toFixed(1) + "公里";
        }
      };
    },
    /**
     * 秒转时间
     */
    secondToTime() {
      return (second) => {
        let days = Math.floor(second / 86400);
        let hours = Math.floor((second % 86400) / 3600);
        let minutes = Math.floor(((second % 86400) % 3600) / 60);
        // let seconds = Math.floor(((second % 86400) % 3600) % 60);
        // let duration = days + "天" + hours + "小时" + minutes + "分";
        if (days) {
          return days + "天" + hours + "小时" + minutes + "分钟";
        } else if (days || hours) {
          return hours + "小时" + minutes + "分钟";
        } else if (days || hours || minutes) {
          return minutes + "分钟";
        }
      };
    },
    /**
     * 途径
     */
    channel() {
      return (arr) => {
        const arrFilter = arr.filter((item) => item.road != "");
        const arrMap = arrFilter.map((item) => item.road);
        return [...new Set(arrMap)];
      };
    },
  },
  mounted() {},
  methods: {
    /**
     * 单条步骤点击
     */
    stepsClick(lng, lat) {
      this.$emit("stepsClick", { lng, lat });
    },
    /**
     * 触发折叠
     */
    collapseChange(e) {
      if (this.collapseIndex !== "") {
        this.$emit("change", this.collapseIndex);
      }
    },
  },
};
</script>
  
<style scoped lang="scss">
@import "./transfer.scss";
</style>