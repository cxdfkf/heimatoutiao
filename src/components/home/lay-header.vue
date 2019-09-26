<template>
  <div class="big">
    <el-row type="flex" justify="space-between" align="middle" style="height:50px">
      <el-col :span="6">
        <i class="el-icon-s-unfold" style="font-size:18px"></i>
        <span class="zt">江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="4">
        <span class="im">
          <img :src="list.photo?list.photo:mrimg" alt="">
        </span>
        <el-dropdown trigger="click" @command="show">
          <span class="el-dropdown-link">
            {{list.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script >
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      list: {},
      mrimg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      this.$http({ url: '/user/profile' }).then(res => {
        this.list = res.data
      })
    },
    show (command) {
      if (command === 'info') {
        this.$router.push('/home/account')
      } else if (command === 'git') {
        window.location.href('http://baidu.com')
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
    eventBus.$on('UserInfoChange', () => {
      this.getUserInfo()
    })
  }
}
</script>

<style lang="less" scoped>
.big {
  .zt {
    margin-left: 3px;
  }
  .im {
    img {
      height: 40px;
      border-radius: 20px;
      vertical-align: middle;
    }
  }
}
</style>
