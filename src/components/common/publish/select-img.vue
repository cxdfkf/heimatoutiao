<template>
  <el-card>
    <el-tabs type="border-card" slot="header">
      <el-tab-pane label="素材库">
        <el-radio-group v-model="tabPosition">
          <el-radio-button label="1">全部</el-radio-button>
          <el-radio-button label="2">收藏</el-radio-button>
        </el-radio-group>
        <!-- 放全部图片的盒子，方便设置子盒子的布局 -->
        <div class="images">
          <!-- 单个图片 -->
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt="" @click="transImg(item.url)">
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" @current-change="currentChange"
            :total="pageData.total" :page-size="pageData.pageSize"
            :current-page="pageData.currentPage"></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传图片">
        <!-- 自定义上传 -->
        <el-upload action="" :show-file-list="false" :http-request="uploadUserImg">
          <img src="../../../assets/img/pic_bg.png" alt="">
        </el-upload>
      </el-tab-pane>
    </el-tabs>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tabPosition: 1,
      list: [],
      pageData: {
        total: 0,
        pageSize: 12,
        currentPage: 1
      }
    }
  },
  methods: {
    uploadUserImg (params) {
      let formData = new FormData()
      formData.append('image', params.file)
      this.$http({ url: '/user/images', method: 'post', data: formData, params: { image: params.file } }).then(res => {
        console.log(res.data.url)

        this.$emit('transImg', res.data.url)
      })
    },
    // 获取当前页数，给data中的数据，以便再次请求时，会获取当前页面的
    currentChange (newPage) {
      this.pageData.currentPage = newPage
      this.getImg()// 重新拉取数据
    },
    // 当选完图片后，获得图片的url，将其传给上层的cover-img组件，使用子给父传值的方法
    transImg (url) {
      // 子组件抛出自定义事件transImg，并传了一个图片的url，给父组件
      this.$emit('transImg', url)
    },
    getImg () {
      // 获取所有图片
      this.$http({ url: '/user/images', params: { collect: false, page: this.pageData.currentPage, per_page: this.pageData.pageSize } }).then(res => {
        this.list = res.data.results
        this.pageData.total = res.data.total_count
      })
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang="less" scoped>
.images {
  display: flex;
  flex-wrap: wrap;
  .img-item {
    width: 100px;
    height: 100px;
    margin: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
