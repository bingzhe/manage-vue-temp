<template>
    <div id="login-container">
        <div class="sl-logo">
            <img src="./images/logo.png" alt="logo">
        </div>

        <div class="login-content">
            <!-- 公众号 start -->
            <div class="login-right">
                <div class="neweat-img">
                    <img src="./images/xinchihuo.png" alt="新吃货公众号">
                </div>
                <p class="neweat-text">扫一扫，关注新吃货公众号</p>
            </div>
            <!-- 公众号 end -->
            <!-- 切换二维码 start -->
            <div class="toggle" @click="toggleLoginWay">
                <img v-if="isShowlogin" src="./images/login1.png" />
                <img v-else src="./images/login2.png" alt="">
            </div>
            <!-- 切换二维码 end -->

            <!-- login start -->
            <div v-if="isShowlogin" class="login-left">
                <el-form class="login-form" :model="loginForm">

                    <!-- username -->
                    <el-form-item class="username">
                        <el-input @change="getPassword" class="user" :class="{errtip: isShowErrtip}" type="text" placeholder="手机号/用户名/邮箱" v-model="loginForm.username">
                            <template slot="prepend">
                                <img class="icon" src="./images/admin.png" alt="">
                            </template>
                        </el-input>
                    </el-form-item>

                    <!-- password -->
                    <el-form-item>
                        <el-input @change="clearErrTip" class="user " :class="{errtip: isShowErrtip}" :type="pwdType" placeholder="6-12位数字" v-model="loginForm.password">
                            <template slot="prepend">
                                <img class="icon" src="./images/password.png" alt="">
                            </template>
                        </el-input>
                    </el-form-item>

                    <!-- check-code -->
                    <div class="check-code clearfix">
                        <el-form-item class="check-input left">
                            <el-input @change="clearErrTip" :class="{errtip: isShowCheckErrtip}" type="text" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
                        </el-form-item>
                        <div class="check-img left">
                            <img :src="codeimgurl" alt="验证图片" />
                        </div>
                        <div class="reset left">
                            <img @click="changeCheckImg" src="./images/rennew.png" alt="刷新" />
                        </div>
                    </div>

                    <!-- 记住密码 -->
                    <div class="password-select clearfix">
                        <el-form-item class="password-remeber left">
                            <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
                        </el-form-item>

                        <div class="forget-password right">
                            忘记密码？
                        </div>
                    </div>

                    <div class="errTipMsg">{{ errTipMsg }}</div>

                    <el-form-item>
                        <el-button v-if="isShowSubmitBtn" class="submit" type="primary" @click="login">登录</el-button>
                        <el-button v-else class="disabled" type="primary" :disabled="true">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- login end -->

            <!-- 微信二维码 start -->
            <div v-if="!isShowlogin" class="login-left">

            </div>
            <!-- 微信二维码 end -->
        </div>
    </div>
</template>

<script>
// import _ from 'lodash';
// import { Login } from '../index';
import { loginByUsername } from '../api';
import { Util } from '@/config/util';
import { errcode } from '@/config/cfg';
import { ls } from '@/config/pageStore';

export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                code: '',
                checked: false
            },
            isShowlogin: true, //二维码btn切换
            pwdType: 'password',
            codeimgurl: '',  //验证码图片地址
            token: '',  //终端标识
            isShowErrtip: false,
            isShowCheckErrtip: false,
            errTipMsg: '',  //错误提示信息
            isToggle1: false, //动画
            isToggle2: false,
        };
    },
    computed: {
        isShowSubmitBtn() {
            if (this.loginForm.username && this.loginForm.password && this.loginForm.code) {
                return true;
            } else {
                return false;
            }
        }
    },
    created() {
        this.initCheckImg();
    },
    mounted() {
    },
    methods: {
        toggleLoginWay() {
            this.isToggle1 = true;
            this.isShowlogin = !this.isShowlogin;
            setTimeout(() => {
                // this.isShowlogin = !this.isShowlogin;
                this.isToggle2 = true;
            }, 3000);
            setTimeout(() => {
                this.isToggle1 = false;
                this.isToggle2 = false;
            }, 6000);
        },
        //登陆成功后处理
        loginHander(resp) {
            if (resp.ret === 0) {
                this.checkRember();
                ls.setItem("public#shopinfo", resp.data, 7);
                ls.setItem("public#userid", resp.data.userinfo.userid, 7);
                this.$router.push({ path: '/shop' });
            } else {
                this.loginErrMsg(resp.ret);
                this.changeCheckImg();
            }
        },
        //账号密码登陆
        login() {
            let username = this.loginForm.username;
            let password = this.loginForm.password;
            let checkcode = this.loginForm.code;
            loginByUsername(username, password, checkcode, this.loginHander); // <<<<<<<<<<<<<<<<<登录请求应加密

            // >>>>>>>>>>>>>>>>>>>
            // this.$router.push({ path: '/' });
        },
        initCheckImg() {
            this.token = Util.creatToken();
            this.codeimgurl = base_url + "/code.php?height=35&width=160&fontsize=20&codelen=4&token=" + this.token + "&is_plain=1";
            // <<<<<<<<<<<加个is_plain参数，避免后台检测key字段，修改后如：
            // this.codeimgurl = base_url + "/code.php?height=35&width=160&fontsize=20&codelen=4&token=" + this.token + "&is_plain=1";
        },
        changeCheckImg() {
            this.codeimgurl = base_url + "/code.php?height=35&width=160&fontsize=20&codelen=4&token=" + this.token + "&is_plain=1" + "&" + Math.random();
        },
        initform() {
            this.loginForm.username = "",
                this.loginForm.password = "",
                this.loginForm.code = "",
                this.loginForm.checked = false;
        },
        loginErrMsg: function(ret) {
            switch (ret) {
                case errcode.USER_NO_EXIST:
                    this.isShowErrtip = true;
                    this.errTipMsg = errcode.toString(ret);
                    // this.errTipMsg = "用户名或密码错误";  // <<<<<<<<<<<<<<<<< 文本统一定义在errcode对像中，使用如：errcode.toString(errcode.USER_NO_EXIST)
                    break;
                case errcode.DATA_PASSWD_ERR:
                    this.isShowErrtip = true;
                    this.errTipMsg = errcode.toString(ret);
                    // this.errTipMsg = "用户名或密码错误";
                    break;
                case errcode.USER_PASSWD_ERR:
                    this.isShowErrtip = true;
                    this.errTipMsg = errcode.toString(ret);
                    // this.errTipMsg = "用户名或密码错误";
                    break;
                case errcode.COKE_ERR:
                    this.isShowCheckErrtip = true;
                    this.errTipMsg = errcode.toString(ret);
                    // this.errTipMsg = "验证码错误";
                    break;
                default:
                    this.errTipMsg = errcode.toString(errcode.SYS_ERR);
                    // this.errTipMsg = "服务器故障，登陆失败";
            }
        },
        //记住密码
        checkRember() {
            if (this.loginForm.checked === true) {
                ls.setItem(this.loginForm.username, this.loginForm.password, 1);
            } else {
                ls.removeItem(this.loginForm.username);
            }
        },
        //取密码
        getPassword() {
            this.clearErrTip();
            let loginPd = ls.getItem(this.loginForm.username); // <<<<<<<<<<<< 全局对像，其它页面是否也会用此key?
            if (loginPd !== null) {
                this.loginForm.password = loginPd;
            }
        },
        clearErrTip() {
            this.isShowErrtip = false;
            this.isShowCheckErrtip = false;
            this.errTipMsg = "";
        }
    }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

#login-container {
    width: 100%;
    height: 100vh;
    background-image: url(./images/loadingpage.png);
    background-repeat: no-repeat;
    background-size: cover;
}

.sl-logo {
    position: fixed;
    @include tl(25.5%, 50%);
    @include wh(230px, 78px);
    margin-left: -115px;

    img {
        @include wh(230px, 78px);
    }
}



.login-content {

    .login-right {
        @include wh(160px, 200px);
        position: absolute;
        top: -4px;
        right: -180px;
        background-color: #fff;
        border-top: 4px solid $blue;

        .neweat-img {
            @include wh(120px, 120px);
            margin: 20px;
        }

        .neweat-text {
            @include fc(12px, #000);
            text-align: center;
        }
    }

    position: fixed;
    @include tl(36.4%, 50%);
    @include wh(540px, 350px); // transform: translate(-50%, 0);
    margin-left: -270px;
    background-color: #fff;
    border-top: 4px solid $blue;
    padding: 0 70px;




    .toggle {
        cursor: pointer;
        @include wh(60px, 60px);
        position: absolute;
        top: -4px;
        right: 0;
    }
}

.login-form {
    .icon {
        @include wh(16px, 16px);
    }

    .submit {
        width: 100%;
        background-color: $blue;
    }

    .disabled {
        width: 100%;
        background-color: #D8D8D8;
    }

    .check-code {
        .check-input {
            width: 160px;
        }
        .check-img {
            @include wh(160px, 34px);
            margin-left: 10px;
        }
        .reset {
            height: 35px;
            padding-top: 6px;
            margin-left: 20px;

            img {
                @include wh(24px, 24px);
                cursor: pointer;
            }
        }
    }

    .password-select {
        .forget-password {
            @include fc(12px, #4877E7);
            height: 36px;
            line-height: 36px;
        }
    }

    .errTipMsg {
        @include fc(12px, #E7487E);
        height: 30px;
    }
}

.toggle1 {
    animation-duration: 3s;
    animation-name: toggle;
}

.toggle2 {
    animation-duration: 3s;
    animation-name: toggle1;
}

@keyframes toggle {
    from {
        transform: rotateX(0deg)
    }
    to {
        transform: rotateX(90deg)
    }
}

@keyframes toggle1 {
    from {
        transform: rotateX(90deg)
    }
    to {
        transform: rotateX(0deg)
    }
}
</style>

<style lang="scss">
#login-container {
    input.el-input__inner {
        height: 34px;
        border-radius: 0;
    }
    div.el-input-group__prepend {
        border-radius: 0;
    }
    div.user {
        .el-input__inner {
            border-left: 0;
        }
    }
    input.el-input__inner:hover {
        border-color: #bfcbd9;
    }
    input.el-input__inner:focus {
        border-color: #bfcbd9;
    }

    .el-form-item {
        margin-bottom: 20px;
    }
    .el-form-item.username {
        margin-top: 50px;
    }
    .el-form-item.check-input {
        margin-bottom: 0;
    }
    .el-form-item.password-remeber {
        margin-bottom: 0;
    }

    .errtip {
        .el-input-group__prepend {
            border-color: red;
        }
        input {
            border-color: red;
        }
        input.el-input__inner:hover {
            border-color: red;
        }
        input.el-input__inner:focus {
            border-color: red;
        } // input
    }
    .el-form-item__content button.el-button--primary.submit:hover {
        background-color: #3254A5;
        border-color: #3254A5;
    }
    .el-form-item__content button.el-button--primary.disabled {
        border-color: #c4c4c4;
    }
}
</style>
