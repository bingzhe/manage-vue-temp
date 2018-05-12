<template>
  <div class="main">
    <el-container>
      <el-aside  width="256px">
        <!-- <sidebar-menu></sidebar-menu> -->
        111
      </el-aside>
      <el-container class="right-content">
        <el-header height="64px">22</el-header>
        <el-main>
          <!-- <transition name="fade" mode="out-in">
            <keep-alive :include="cachedViews"> -->
              <!-- <router-view></router-view> -->
            <!-- </keep-alive>
          </transition> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SidebarMenu from "./sidebar/SidebarMenu";

export default {
  components: {
    // SidebarMenu
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 14px;
}

.el-header {
  line-height: 64px;
  padding: 0 14px;
}

// .el-aside {
//   background-color: #d3dce6;
// }

.right-content {
  min-height: 100vh;
}
</style>


