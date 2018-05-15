<template>
    <div>
        <el-menu
            mode="vertical"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
            :collapse="shrink"
            :router="false"
            >
            <sidebar-item></sidebar-item>
        </el-menu>
    </div>
</template>

<script>
import SidebarItem from "./SidebarMenuItem";
import { mapState } from "vuex";

export default {
  components: {
    SidebarItem
  },
  computed: {
    ...mapState({
      shrink: state => state.app.shrink
    })
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>


