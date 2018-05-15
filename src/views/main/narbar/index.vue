<template>
  <div class="clearfix">
      <div class="fl">
          <i class="el-icon-menu" @click="TOGGLE_SHRINK"></i>
      </div>
      <div class="fr">
          <i class="el-icon-search"></i>
      </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["TOGGLE_SHRINK"])
    // toggleShrink() {
    //   //   this.TOGGLE_SHRINK();
    //   this.$store.commit("TOGGLE_SHRINK");
    // }
  }
};
</script>

<style lang="scss" scoped>

</style>

