<template>
  <div class="pathPlanning">
    <el-collapse accordion v-model="collapseIndex" @change="collapseChange">
      <el-collapse-item
        :name="index"
        v-for="(item, index) in dataArr"
        :key="index"
      >
        <template slot="title">
          <div class="head">
            <div class="head-step-view">
              <div
                class="head-step-item-for"
                v-for="(step_item, step_index) in step(item.segments)"
                :key="step_index"
              >
                <i v-if="step_index != 0" class="el-icon-arrow-right icon"></i>
                <div class="head-step-item">
                  <img
                    src="@/common/cesium/Map/Gaode/components/diricon/image/busline.png"
                    alt=""
                  />
                  {{ step_item.transit.lines[0].name }}
                </div>
              </div>
            </div>
            <div class="info-view">
              <div class="info">
                <div class="info-item">
                  约{{ secondToTime(item.time) }}（{{
                    metreToKilometre(item.transit_distance)
                  }}）
                </div>
                <span>|</span>
                <div class="info-item">
                  步行{{ metreToKilometre(item.walking_distance) }}
                </div>
                <span>|</span>
                <div class="info-item" style="color: red">
                  {{ item.cost }}元
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="step-main">
          <div class="step-item start">
            <diricon class="diricon" type="text" value="起" />
            <div class="label">{{ start.name }}</div>
          </div>

          <div
            v-for="(segments_item, segments_index) in item.segments"
            :key="segments_index"
          >
            <div
              class="step-item WALK"
              v-if="segments_item.transit_mode == 'WALK'"
            >
              <div class="label">{{ segments_item.instruction }}</div>
            </div>
            <div class="step-item Multiple" v-else>
              <div class="spot"></div>
              <diricon
                class="diricon"
                type="vehicle"
                value="transfer"
                bgColor="#418AEC"
              />
              <div class="multiple-step">
                <div class="multiple-step-head">
                  {{ segments_item.instruction }}
                </div>
                <div class="multiple-step-content">
                  <div class="multiple-step-content-item">
                    <div class="multiple-step-content-item-value">
                      {{ segments_item.transit.on_station.name }}
                    </div>
                    <div class="multiple-step-content-item-label">
                      上车
                      <template v-if="segments_item.transit.entrance">{{
                        segments_item.transit.entrance.name
                      }}</template>
                    </div>
                  </div>

                  <div class="list" :class="{ hide: open }">
                    <ul>
                      <li
                        v-for="(
                          via_stops_item, via_stops_index
                        ) in segments_item.transit.via_stops"
                        :key="via_stops_index"
                      >
                        {{ via_stops_item.name }}
                      </li>
                    </ul>
                  </div>
                  <div class="multiple-step-content-item">
                    <div class="multiple-step-content-item-value">
                      {{ segments_item.transit.off_station.name }}
                    </div>
                    <div class="multiple-step-content-item-label">
                      下车
                      <template v-if="segments_item.transit.exit">{{
                        segments_item.transit.exit.name
                      }}</template>
                    </div>
                  </div>
                  <div
                    class="multiple-step-content-item-info"
                    :class="{ open: open }"
                  >
                    <div class="multiple-step-content-item-info-text">
                      上车站 首：{{
                        stringToTime(segments_item.transit.lines[0].stime)
                      }}
                      末：{{
                        stringToTime(segments_item.transit.lines[0].etime)
                      }}
                    </div>
                    <div
                      class="multiple-step-content-item-info-leng"
                      @click="open = !open"
                    >
                      <span>{{ segments_item.transit.via_num + 1 }}站</span>
                      <i class="el-icon-arrow-up icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="step-item end">
            <diricon class="diricon" type="text" value="终" />
            <div class="label">{{ end.name }}</div>
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
     * 步骤
     */
    step() {
      return (arr) => {
        const filterArr = arr.filter((item) => item.transit_mode != "WALK");
        if (filterArr.length != 0) {
          return filterArr;
        } else {
          return [];
        }
      };
    },
    /**
     * 字符串转时间
     */
    stringToTime() {
      return (str) => {
        return str.replace(/^(.{2})/, "$1:");
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