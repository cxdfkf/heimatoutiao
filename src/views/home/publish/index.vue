<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="com">发布文章</template>
    </bread-crumb>
    <el-form label-width="100px" :model="formData" :rules="rulesForm" ref="formData">
      <el-form-item label="标题">
        <el-input style="width:500px" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" style="width:800px" v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="formData.channel_id" placeholder="请选择">
          <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发表</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        title: '',
        content: '',
        cover: {
          type: 1
        },
        images: [],
        channel_id: ''
      },
      list: []
    }
  },
  methods: {
    getChannel () {
      this.$http({ url: '/channels' }).then(res => {
        this.list = res.data.channels
      })
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style>
</style>
