<template>
  <div class="main">
    <el-container>
      <el-aside  :width="shrink ? '256px' : '256px'">
        <sidebar-menu></sidebar-menu>
      </el-aside>
      <el-container class="right-content">
        <el-header height="64px">
          <narbar-menu></narbar-menu>
        </el-header>
        <el-main>
          <!-- <transition name="fade" mode="out-in">
            <keep-alive :include="cachedViews"> -->
              <router-view></router-view>
            <!-- </keep-alive>
          </transition> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SidebarMenu from "./sidebar/SidebarMenu";
import NarbarMenu from "./narbar/index";
import { mapState } from "vuex";

export default {
  components: {
    SidebarMenu,
    NarbarMenu
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      shrink: state => state.app.shrink
    })
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 14px;
}

.el-header {
  line-height: 64px;
  padding: 0 14px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.el-aside {
  background-color: #001529;
}

.right-content {
  min-height: 100vh;
}
</style>


