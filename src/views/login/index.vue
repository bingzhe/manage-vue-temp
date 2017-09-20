<template>
  <div class="login-container">
    <!-- 背景图片 start -->
    <div class="bg-img"></div>
    <!-- 背景图片 end -->

    <div class="login-content clearfix">
      <!-- login start -->
      <div class="login-left left">
        <el-form :model="loginForm">

          <el-form-item prop="username">
            <el-input name="username" type="text" v-model="loginForm.username" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input name="password" v-model="loginForm.password" />
          </el-form-item>
        
        </el-form>
      </div>
      <!-- login end -->

      <!-- 公众号二维码  start-->
      <div class="login-right left">
        <div class="neweat-img">
          <img src="" alt="新吃货公众号">
        </div>
        <p class="text">扫一扫，关注新吃货公众号</p>
      </div>
      <!-- 公众号二维码 end -->
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '手机号/用户名/邮箱',
        password: '6-12位数字'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/mixin.scss';

$blue: rgb(98, 138, 233);

.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  height: 100vh;

  .bg-img {
    background: $blue;
    width: 100%;
    height: 50vh;
  }
}

.login-container .login-content {
  position: fixed;
  @include tl(50%, 50%);
  @include wh(560px, 350px);
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  border-top: 5px solid rgb(90, 140, 255);
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  box-shadow: 0px 0px 23px -2px #7C7776;

  .login-left {
    @include wh(62.5%, 100%);
  }
  .login-right {
    @include wh(37.5%, 100%);
    border-left: 1px solid rgb(244, 244, 244);
  }
}
.el-input {
  width: 260px;
}
</style>