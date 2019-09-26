<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="com">
        账号信息
      </template>
    </bread-crumb>
    <el-form :rules="ruleForm" :model="formData" ref="Form" style="margin-left:60px"
      label-width="100px">
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="formData.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="头条号简介" prop="intro">
        <el-input type="textarea" v-model="formData.intro" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <!-- 手机号不能修改 -->
        <el-input disabled v-model="formData.mobile" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left:100px" @click="checkForm">保存信息</el-button>
      </el-form-item>
    </el-form>
    <el-upload action="" :http-request="changeImg" :show-file-list="false">
      <img :src="formData.photo?formData.photo:defaultImg" alt="" class="upload">
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../../utils/eventBus'
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      defaultImg: require('../../../assets/img/122.jpg'),
      ruleForm: {
        name: [{ required: true, message: '用户名不能为空' }, { min: 1, max: 7, message: '用户名要控制在1到7个字符' }],
        email: [{ required: true, message: '邮箱不能为空' }, { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }]
      }
    }
  },
  methods: {
    changeImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$http({ url: '/user/photo', method: 'patch', data }).then(res => {
        eventBus.$emit('UserInfoChange')
        this.formData.photo = res.data.photo
      })
    },
    checkForm () {
      this.$refs.Form.validate((isOk) => {
        this.$http({ url: '/user/profile', method: 'patch', data: this.formData }).then(res => {
          eventBus.$emit('UserInfoChange')
          this.$message({ message: '保存成功', type: 'success' })
        })
      })
    },
    getInfo () {
      this.$http({ url: '/user/profile' }).then(res => {
        this.formData.name = res.data.name
        this.formData.intro = res.data.intro
        this.formData.email = res.data.email
        this.formData.mobile = res.data.mobile
        this.formData.photo = res.data.photo
      })
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang="less" scoped>
.upload {
  height: 200px;
  width: 200px;
  border-radius: 100px;
  position: absolute;
  right: 200px;
  top: 100px;
}
</style>
