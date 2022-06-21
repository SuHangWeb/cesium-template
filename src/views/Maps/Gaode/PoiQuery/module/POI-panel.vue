<template>
  <el-drawer
    title="操作面板"
    :visible.sync="drawer"
    size="500px"
    direction="rtl"
    :before-close="handleClose"
  >
    <div class="POI-panel">
      <el-tabs v-model="panelType">
        <el-tab-pane
          v-for="(item, index) in panelTypeArr"
          :key="index"
          :label="item.label"
          :name="item.value"
        ></el-tab-pane>
      </el-tabs>
      <section class="pois">
        <div class="form-view">
          <div class="form-item">
            <div class="form-label">范围：</div>
            <div class="form-value">
              <el-radio-group v-model="range" size="mini">
                <el-radio label="city">城市</el-radio>
                <el-radio label="all">全国</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="form-item">
            <div class="form-label">城市：</div>
            <div class="form-value">
              <el-cascader
                size="mini"
                clearable
                :disabled="range == 'all'"
                v-model="city"
                :props="{
                  children: 'districtList',
                  label: 'name',
                  value: 'adcode',
                }"
                style="width: 100%"
                placeholder="城市选择..."
                :options="cityOptions"
              ></el-cascader>
            </div>
          </div>
          <div class="form-item multiple">
            <div class="form-label">兴趣点类别：</div>
            <div class="form-value">
              <el-select
                class="select"
                size="mini"
                v-model="searchType"
                multiple
                placeholder="请选择兴趣类别（可多选）"
              >
                <el-option
                  v-for="item in placeSearchType"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form-item search">
            <el-input
              size="mini"
              placeholder="请输入搜索关键词"
              v-model.trim="keyword"
              clearable
              @change="search"
            >
            </el-input>
            <el-button
              class="button"
              :disabled="keyword == ''"
              type="primary"
              size="mini"
              icon="el-icon-search"
              @click="search"
              >搜索</el-button
            >
          </div>
        </div>
        <div class="main">
          <div class="item-view" ref="poisList" v-loading="loading">
            <div
              class="pois-item"
              v-for="(item, index) in poisList"
              :key="item.id + index"
            >
              <div class="pois-item-image">
                <el-image
                  class="image"
                  v-if="item.photos.length != 0"
                  :src="item.photos[0].url"
                  fit="cover"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <el-image v-else class="image" src="" fit="cover">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
              <div class="pois-item-text">
                <h3>{{ item.name }}</h3>
                <p>
                  电话：
                  <template v-if="item.tel">{{ item.tel }}</template>
                  <template v-else>-</template>
                </p>
                <p>
                  类目：
                  {{ item.type }}
                </p>
                <p>
                  地址：
                  {{ item.pname }}{{ item.cityname }}{{ item.adname
                  }}{{ item.address }}
                </p>
              </div>
            </div>
          </div>
          <div class="pagination">
            <el-pagination
              layout="prev, pager, next"
              @current-change="currentPaginationChange"
              :total="total"
              :page-size="pageSize"
              :current-page="pageIndex"
            />
          </div>
        </div>
      </section>
    </div>
  </el-drawer>
</template>
 
<script>
import Utils from "@/common/cesium/Utils.js";
import GaodeMap from "@/common/cesium/Map/Gaode";
export default {
  props: {
    show: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    option: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      drawer: false,
      _GaodeMap: null,
      _Utils: null,
      loading: false,

      panelTypeArr: [
        {
          label: "兴趣点",
          value: "1",
        },
      ],
      panelType: "1", //面板类型tab
      range: "city", //范围
      cityOptions: [], //城市数据
      city: ["210000", "210100"], //城市
      placeSearchType: [], //兴趣类别
      searchType: ["餐饮服务", "商务住宅", "生活服务"], //选择的类别
      keyword: "", //搜索关键词

      pageIndex: 1, //页码
      pageSize: 10, //页数量
      total: 0, //总数

      poisList: [], //兴趣点搜索结果
    };
  },
  watch: {
    show: {
      handler(newValue, oldValue) {
        this.drawer = newValue;
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    /**
     * 设置秘钥 必须在脚本加载之前设置
     */
    window._AMapSecurityConfig = {
      securityJsCode: process.env.VUE_APP_SECURITY_JS_CODE,
    };
    this._Utils = new Utils();
    /**
     * 加载高德api
     */
    this._Utils
      .loadJs(
        `https://webapi.amap.com/maps?v=2.0&key=${process.env.VUE_APP_GAODE_KEY_WEB_TERMINAL}&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.DistrictSearch`,
        true
      )
      .then(() => {
        this._GaodeMap = new GaodeMap(AMap);
        this._GaodeMap.districtList({ subdistrict: 2 }).then((res) => {
          this.cityOptions = res;
        });
        this.placeSearchType = this._GaodeMap.placeSearchType;
      });
  },
  methods: {
    /**
     * 搜索
     */
    search() {
      if (this.range == "city") {
        if (this.city.length == 0) {
          this.$message({
            message: "请选择城市",
            type: "warning",
          });
          return;
        }
      }
      const placeSearchData = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        searchKeyword: this.keyword,
        extensions: "all",
      };
      if (this.range == "city") {
        placeSearchData.city = this.city[1] || "";
      }
      if (this.searchType.length != 0) {
        placeSearchData.type = this.searchType.join("|");
      }
      this.loading = true;
      this._GaodeMap
        .placeSearch(placeSearchData)
        .then((res) => {
          console.log(res);
          this.total = res.count;
          this.poisList = res.pois;
          this.$nextTick(() => {
            this.$refs.poisList.scrollTop = 0;
          });
          this.loading = false;
          this.$emit("load", this.poisList);
        })
        .catch((err) => {
          this.$notify.error({
            title: "错误",
            message: "请重新搜索",
          });
        });
    },
    /**
     * 分页
     * @param {NUmber} i 页码
     */
    currentPaginationChange(i) {
      this.pageIndex = i;
      this.search();
    },
    /**
     * 关闭抽屉窗口
     */
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>
  
<style scoped lang="scss">
@import "./POI-panel.scss";
</style>