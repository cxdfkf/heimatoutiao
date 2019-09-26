<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="com">发布文章</template>
    </bread-crumb>
    <el-form label-width="100px" :model="formData" :rules="rulesForm" ref="formData">
      <el-form-item label="标题" prop="title">
        <el-input style="width:500px" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor style="height:300px" v-model="formData.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="cover" style="margin-top:120px">
        <el-radio-group v-model="formData.cover.type" @change="getRadio">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <cover-img :images="formData.cover.images" @transImg="thirdImg"></cover-img>
      <el-form-item label="频道" prop="channel_id">
        <!-- {{formData.channel_id}} -->
        <el-select v-model="formData.channel_id" placeholder="请选择">
          <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="matchForm(false)">发表</el-button>
        <el-button @click="matchForm(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 表单的各项信息，这样定义的好处是能够更好的提交给接口
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      loading: false,
      list: [], // 为了接收频道数据
      // 验证表单规则的对象，里面是字段名：对象数组
      rulesForm: {
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 30, message: '长度要在5到30个字符之间' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    thirdImg (url, index) {
      // this.formData.cover.images[index] = url
      this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
        if (index === i) {
          return url
        } else {
          return item
        }
      })
    },
    getRadio (value) {
      this.formData.cover.type = value
      if (value === 1) {
        this.formData.cover.images = ['']
      } else if (value === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 进行整个表单的验证
    matchForm (draft) {
      this.$refs.formData.validate((isOk) => {
        // 新增和编辑的简化写法
        if (isOk) {
          let articlesId = this.$route.params.articlesId
          this.$http({ url: articlesId ? `/articles/${articlesId}` : '/articles', params: { draft }, method: articlesId ? 'put' : 'post', data: this.formData }).then(res => {
            this.$router.push('/home/articles')
          })
        }
        // 新增和编辑的复杂写法
        // if (isOk) {
        //   let articlesId = this.$route.params.articlesId
        //   if (articlesId) {
        //     this.$http({ url: `/articles/${articlesId}`, params: { target: articlesId, draft }, method: 'put', data: this.formData }).then(res => {
        //       this.$router.push('/home/articles')
        //     })
        //   } else {
        //     this.$http({ url: '/articles', method: 'post', params: { draft }, data: this.formData }).then(res => {
        //       this.$router.push('/home/articles')
        //     })
        //   }
        // }
      })
    },
    // 获取频道列表
    getChannel () {
      this.$http({ url: '/channels' }).then(res => {
        this.list = res.data.channels
      })
    },
    // 当点击修改的时候，跳转到发表文章时 ，能够通过接口去将信息显示到页面上
    getInfo () {
      // this.loading = true
      let target = this.$route.params.articlesId
      target && this.$http({ url: `/articles/${target}`, params: { target } }).then(res => {
        this.formData = res.data
        // this.loading = false
      })
    }
  },
  created () {
    this.getChannel()// 页面一刷新就有频道
    this.getInfo()// 点击修改过来，页面就有对应id的信息
  }
}
</script>

<style>
</style>
