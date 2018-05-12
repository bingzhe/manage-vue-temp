<template>
  <div class="menuitem-wrapper">
      <template v-for="item in menuList">
        <el-menu-item
            :index="item.path+'/'+item.children[0].path"
            :key="item.children[0].name"
        >
            <i  
                v-if="item.children[0].meta&&item.children[0].meta.icon" 
                :class="item.children[0].meta.icon"
            >
            </i>
            <span 
                v-if="item.children[0].meta&&item.children[0].meta.title"
            >
                {{item.children[0].meta.title}}
            </span>
        </el-menu-item>
      </template>

  </div>
</template>

<script>
import { appRouter } from "@/router/router.js";

export default {
  data() {
    return {
      menuList: appRouter
    };
  }
};
</script>

<style lang="scss" scoped>

</style>


