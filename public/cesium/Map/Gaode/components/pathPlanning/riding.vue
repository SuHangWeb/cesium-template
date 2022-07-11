<template>
  <div class="pathPlanning">
    <el-collapse accordion v-model="collapseIndex" @change="collapseChange">
      <el-collapse-item
        :name="index"
        v-for="(item, index) in dataArr"
        :key="index"
      >
        <template slot="title">
          <div class="info-view">
            <div class="tag">方案{{ index + 1 }}</div>
            <div class="info">
              <div class="info-item">约 {{ secondToTime(item.time) }}</div>
              <span>|</span>
              <div class="info-item">
                {{ metreToKilometre(item.distance) }}公里
              </div>
            </div>
            <div class="channel">
              <div class="channel-label">途径：</div>
              <div class="channel-info">
                <span
                  v-for="(channelItem, channelIndex) in channel(item.rides)"
                  :key="`channel${channelIndex}`"
                >
                  <i v-if="channelIndex != 0" class="el-icon-arrow-right"></i>
                  <span>{{ channelItem }}</span>
                </span>
              </div>
            </div>
          </div>
        </template>
        <div class="step-main">
          <div
            class="step-item"
            @click="stepsClick(start.location.lng, start.location.lat)"
          >
            <diricon class="diricon" type="text" value="起" />
            <div class="label">从 {{ start.name }}出发</div>
          </div>

          <div
            class="step-item"
            v-for="(stepsItem, stepsIndex) in item.rides"
            :key="`steps${stepsIndex}`"
            @click="
              stepsClick(
                stepsItem.start_location.lng,
                stepsItem.start_location.lat
              )
            "
          >
            <diricon class="diricon" type="riding" :value="stepsItem.action" />
            <div class="label">{{ stepsItem.instruction }}</div>
          </div>

          <div
            class="step-item"
            @click="stepsClick(end.location.lng, end.location.lat)"
          >
            <diricon class="diricon" type="text" value="终" />
            <div class="label">到达终点 {{ end.name }}</div>
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
    };
  },
  computed: {
    // 米转换公里
    metreToKilometre() {
      return (metre) => {
        return (metre / 1000).toFixed(1);
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
@import "./riding.scss";
</style>