<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="com">素材管理</template>
    </bread-crumb>
     <!-- 自定义上传 -->
<el-upload
  class="elupload"
  action=""
  :http-request="handleChange"
  :show-file-list="false">
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>

    <el-tabs v-model="activeName" @tab-click="getImg">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-item">
            <img :src="item.url" alt />
            <div class="icon">
              <i @click="collectImg(item)" class="el-icon-star-on" :style="{color: item.is_collected ? 'red':'#000'}"></i>
              <i class="el-icon-delete-solid" @click="collectDel(item.id)"></i>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-item">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="getCurrent"
        background
        layout="prev, pager, next"
        :total="this.pageInfo.total"
        :page-size="this.pageInfo.pageSize"
        :current-page="this.pageInfo.currentPage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 设置默认选中全部
      list: [], // 设置接收图片信息的列表
      pageInfo: {
        total: 0,
        pageSize: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    collectImg (item) {
      let collect = item.is_collect ? '取消收藏' : '收藏'
      this.$confirm(`您确定要${collect}图片吗？`, '提示', {
        type: 'warning',
        center: true
      }).then(() => {
        this.$http({ url: `user/images/${item.id}`, method: 'put', data: { collect: !item.is_collect } }).then(res => {
          this.getImg()
        })
      })
    },
    collectDel (id) {
      // console.log(id)
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning',
        center: true
      }).then(() => {
        this.$http({ url: `/user/images/${id}`, method: 'delete' }).then(res => {
          this.getImg()
        })
      })
    },
    handleChange (params) {
      let formdata = new FormData()
      formdata.append('image', params.file)
      this.$http({ url: '/user/images', data: formdata, method: 'post' }).then(res => {
        this.getImg()
      })
    },
    getCurrent (newPage) {
      this.pageInfo.currentPage = newPage
      this.getImg()
    },
    getImg () {
      this.$http({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.pageInfo.currentPage,
          per_page: this.pageInfo.pageSize
        }
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
        this.pageInfo.total = res.data.total_count
      })
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang="less" scoped>
.elupload{
    position: absolute;
    right: 20px;
      margin-top:-10px;
}
.img-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .img-item {
    width: 180px;
    height: 180px;
    border-radius: 6px;
    margin: 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .icon {
      background-color: #f4f5f6;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      i {
        font-size: 18px;
      }
    }
  }
}
</style>
