<template>
  <div class="menuitem-wrapper">
    <!-- <template v-for="item in menuList"> -->
      
      <!-- 无下拉菜单 -->
      <!-- <el-menu-item
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
      </el-menu-item> -->

      <!-- 有下拉菜单 -->
      <!-- <el-submenu
        v-else
        :index="item.path" 
        :key="item.name"
      >
        <template slot="title">
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
        </template>

        <template 
          v-for="child in item.children"
          v-if="!child.hidden"
        >
          <el-menu-item 
            :index="item.path+'/'+child.path" 
            :key="child.name">
            <i  
              v-if="child.meta&&child.meta.icon" 
              :class="child.meta.icon"
            ></i>
            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-submenu>

    </template> -->

  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">导航一</span>
    </template>
    <el-menu-item-group>
      <span slot="title">分组一</span>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="分组2">
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title">导航二</span>
  </el-menu-item>
  <el-menu-item index="3" disabled>
    <i class="el-icon-document"></i>
    <span slot="title">导航三</span>
  </el-menu-item>
  <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <span slot="title">导航四</span>
  </el-menu-item>

  </div>
</template>

<script>
// import { appRouter } from "@/router/router.js";

const appRouter = [
  {
    path: "/component",
    icon: "",
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
    path: "/component",
    name: "component1",
    meta: {
      icon: "el-icon-printer",
      title: "组件"
    },
    children: [
      {
        path: "text-editor",
        name: "text-editor1",
        meta: {
          icon: "el-icon-printer",
          title: "富文本编辑器"
        }
      },
      {
        path: "file-upload",
        icon: "android-upload",
        name: "file-upload",
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


