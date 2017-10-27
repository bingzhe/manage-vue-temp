<template>
    <div id="Navbar">
        <nav class="nav">
            <div class="menu-btn" @click="toggleSide" :class="{hide: isHideSlide}">
                <img src="./images/menu_buttonl.png" >
            </div>
        </nav>
        <transition name="fadeimg">
            <div class="banner" v-if="isShowBanner">
                <div>
                    <img class="banner-image" src="./images/banner.png" alt="banner">                    
                    <span class="close-btn" @click="closeBanner">
                        <img src="./images/close.png" alt="close">
                    </span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isHideSlide: false,
      isShowBanner: true
    };
  },
  methods: {
    toggleSide() {
      this.$emit("change-sidebar");
      this.isHideSlide = !this.isHideSlide;
    },
    closeBanner() {
      this.isShowBanner = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

.nav {
  height: 60px;
  background-color: #5a8cff;
  margin-bottom: 14px;
  padding: 20px 14px 14px;

  .menu-btn {
    @include wh(20px, 20px);
    cursor: pointer;
  }
  .menu-btn.hide {
    transition: all 0.3s ease-out;
    transform: rotate(90deg);
  }
}
.banner {
  height: 156px;
  padding: 0 14px 14px;

  div {
    @include wh(100%, 100%);
    position: relative;

    img.banner-image {
      @include wh(100%, 100%);
    }
    .close-btn {
      @include wh(30px, 30px);
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
}
.fadeimg-enter-active,
.fadeimg-leave-active {
  transition: all 0.3s ease-out;
}
.fadeimg-enter,
.fadeimg-leave-to {
  height: 0;
  padding: 0 14px;
}
</style>