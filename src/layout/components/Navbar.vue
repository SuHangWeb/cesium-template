<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="ciewSourceCode" v-if="ciewSourceCode && code.length != 0">
        <el-button type="text" class="button" @click="openViewCode"
          ><i class="iconfont icon-daima"></i>查看源代码</el-button
        >
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <img src="@/assets/logo.png" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link to="/">
            <el-dropdown-item> Home </el-dropdown-item>
          </router-link> -->
          <a target="_blank" href="https://segmentfault.com/u/suhangweb">
            <el-dropdown-item> segmentfault </el-dropdown-item>
          </a>
          <a target="_blank" href="https://gitee.com/SuHangWeb">
            <el-dropdown-item> gitee </el-dropdown-item>
          </a>
          <a target="_blank" href="https://www.npmjs.com/~suhang">
            <el-dropdown-item> npm </el-dropdown-item>
          </a>
          <!-- <el-dropdown-item divided @click.native="logout">
            <span style="display: block">Log Out</span>
          </el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      ciewSourceCode: false,
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        this.$store.dispatch("highlight/set_view_code", false);
        if (to.meta?.highlight && to.meta.highlight) {
          this.ciewSourceCode = true;
        } else {
          this.ciewSourceCode = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "code"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    /**
     * 打开查看源代码
     */
    openViewCode() {
      this.$store.dispatch("highlight/set_view_code", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }
    .ciewSourceCode {
      margin-right: 40px;
      .button {
        display: flex;
        align-items: center;
        line-height: 1;
        .iconfont {
          margin-right: 5px;
        }
      }
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      height: 100%;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 16px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
