<template>
    <div class="app-wrapper" :class="{hide:isHideSide}">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <navbar @change-sidebar="toggleSidebar"></navbar>
			<app-main></app-main>
		</div>
    </div>
</template>

<script>
import Sidebar from "./Sidebar";
import AppMain from "./AppMain";
import Navbar from "./Navbar";

export default {
  components: {
    Sidebar,
    AppMain,
    Navbar
  },
  data() {
    return {
      isHideSide: false
    };
  },
  methods: {
    toggleSidebar() {
        this.isHideSide = !this.isHideSide;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  position: relative;
  @include wh(100%, 100vh);

  .sidebar-container {
    width: 210px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow-y: auto;
    transition: all 0.3s ease-out;
    box-shadow: 0 2px 4px 0 #BECAEB;
    // border-right: 1px solid #ccc;
  }

  .main-container {
    min-height: 100%;
    transition: margin-left 0.3s ease-out;
    margin-left: 210px;
    background-color: #eff3fa;
  }
}
.app-wrapper.hide {
  .sidebar-container {
    width: 0;
  }
  .main-container {
    margin-left: 0;
  }
}
</style>

