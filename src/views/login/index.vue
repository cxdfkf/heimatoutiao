<template>
  <div class="login">
  <el-card class="card">
    <div class="img">
      <img src="../../assets/img/logo_index.png" alt="">
    </div>
    <el-form :model="loginFrom" :rules="loginRules" ref="bigform">
      <el-form-item prop="mobile" >
        <el-input placeholder="请输入手机号" v-model="loginFrom.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="code" >
        <el-input style="width:60%;float:left" v-model="loginFrom.code" placeholder="请输入验证码"></el-input>
        <el-button style="width:30%;float:right">发送验证码</el-button>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox label="我已阅读并同意用户协议和隐式条款" name="type" v-model="loginFrom.agree"></el-checkbox>
            <!-- <el-checkbox></el-checkbox><span></span> -->
      </el-form-item>
      <el-form-item >
        <el-button class="log" type="primary" @click="loginbtn">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callback) {
      value ? callback() : callback(new Error('您必须遵守协议'))
      // if (value) {
      //   callback()
      // } else {
      //   callback(new Error('您必须遵从协议'))
      // }
    }
    return {
      loginFrom: {
        mobile: '',
        code: '',
        agree: false
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入您的的手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        code: [{ required: true, message: '请输入您的验证码' }, { pattern: /^\d{6}$/, message: '请输入正确的验证码' }],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    loginbtn () {
      // this.$refs.bigform 获取整个表单实例
      this.$refs.bigform.validate((isOK) => {
        if (isOK) {
          // isOK代表全部验证成功
          this.$http({
            url: '/authorizations',
            data: this.loginFrom,
            method: 'post'
          }).then(res => {
            window.localStorage.setItem('user-token', res.data.token)
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;// 设置子元素在主轴的排列方式
  align-items: center;// 设置在侧轴上子元素的排列方式
  .card{
    width: 340px;
    height: 340px;
    .img{
      text-align: center;
      img{
        height: 45px;
      }
    }
    .btn{
      display: inline;
    }
    .log{
      width: 100%;
    }
  }
}
</style>
