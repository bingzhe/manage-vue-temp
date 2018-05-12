<template>
    <div>
        <el-menu
            mode="vertical"
            :show-timeout="200"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
            >
            <sidebar-item></sidebar-item>
        </el-menu>
    </div>
</template>

<script>
import SidebarItem from "./SidebarMenuItem";

export default {
  components: {
    SidebarItem
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>

</style>


