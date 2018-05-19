<template>
  <div>
    <el-menu
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :collapse="shrink"
        :router="true"
        :default-active="saveSelectMenu"            
        class="el-menu-vertical-demo"
        >
          <!-- 无下拉菜单 -->
          <el-menu-item
            v-for="item in menuList"
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
          </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from "./SidebarMenuItem";
import { mapState } from "vuex";

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
  components: {
    SidebarItem
  },
  computed: {
    ...mapState({
      shrink: state => state.app.shrink
    })
  },

  data() {
    return {
      saveSelectMenu: "/component1/text-editor1",
      menuList: appRouter
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
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
.el-menu {
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 255px;
}
</style>


