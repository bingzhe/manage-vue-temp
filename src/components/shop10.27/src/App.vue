<template>
  <div id="app">
   <!-- 这里是需要keepalive的 -->
    <transition name="fadeRouter">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <!-- 这里不会被keepalive -->
    <transition name="fadeRouter">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  
  </div>
</template>

<script>
export default {
  name: 'app'

}; 
</script>

<style lang="scss">
@import './styles/common.scss';

</style>
