<template>
  <div class="menuitem-wrapper">
    <template v-for="item in menuList">
      
      <!-- 无下拉菜单 -->
      <el-menu-item
        v-if="hasOneShowChild(item.children) && !item.children[0].children && !item.alwaysShow"
        :index="item.path+'/'+item.children[0].path"
        :key="item.children[0].name"
      >
        <i
          v-if="item.children[0].meta&&item.children[0].meta.icon" 
          :class="item.children[0].meta.icon"
        ></i>
        <span 
          v-if="item.children[0].meta&&item.children[0].meta.title"
          slot="title"
        >
          {{item.children[0].meta.title}}
        </span>
      </el-menu-item>

      <!-- 有下拉菜单 -->
      <el-submenu
        v-else
        :index="item.path"
        :key="item.name"
      >
        <!-- <template slot="title">
          <i 
            v-if="item.meta&&item.meta.icon" 
            :class="item.meta.icon"
          ></i>
          <span 
            v-if="item.meta&&item.meta.title"
            slot="title"
          >
          {{item.meta.title}}
          </span>
        </template> -->

        <!-- <template 
        > -->
          <el-menu-item 
            v-if="!child.hidden"
            v-for="child in item.children"
            :index="item.path+'/'+child.path" 
            :key="child.name">
            <i  
              v-if="child.meta&&child.meta.icon" 
              :class="child.meta.icon"
            ></i>
            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        <!-- </template> -->
      </el-submenu>

    </template>

  </div>
</template>

<script>
// import { appRouter } from "@/router/router.js";

const appRouter = [
  {
    path: "/component",
    name: "component",
    meta: {
      icon: "el-icon-printer",
      title: "组件"
    },
    children: [
      {
        path: "text-editor",
        name: "text-editor",
        meta: {
          icon: "el-icon-printer",
          title: "富文本编辑器"
        }
      }
    ]
  },
  {
    path: "/component1",
    name: "component1",
    meta: {
      icon: "el-icon-printer",
      title: "组件"
    },
    children: [
      {
        path: "text-editor1",
        name: "text-editor1",
        meta: {
          icon: "el-icon-printer",
          title: "富文本编辑器"
        }
      },
      {
        path: "file-upload1",
        name: "file-upload1",
        meta: {
          icon: "el-icon-printer",
          title: "文件上传"
        }
      }
    ]
  }
];
export default {
  data() {
    return {
      menuList: appRouter
    };
  },
  methods: {
    hasOneShowChild(children) {
      const showChildren = children.filter(item => {
        return !item.hidden;
      });

      if (showChildren.length === 1) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


