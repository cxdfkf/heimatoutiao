<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="com">内容列表</template>
    </bread-crumb>
    <el-form style="margin: 20px 30px">
      <!-- {{radio}} -->
      <el-form-item label="文章状态：">
        <el-radio-group v-model="formdata.radio" @change="changeCondition">
          <el-radio :label="6">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- {{channel_id}} -->
      <el-form-item label="频道列表：">
        <el-select placeholder="请选择" v-model="channel_id" @change="changeCondition">
          <el-option v-for="item in formdata.data" :key="item.id" :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- {{formdata.date}} -->
      <!-- value-format  -->
      <el-form-item label="时间选择：">
        <el-date-picker @change="changeCondition" v-model="formdata.date" value-format="yyyy-MM-dd"
          type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="total">共找到{{page.total}}条符合条件的内容</div>
    <!-- 下部文章的排布局 -->
    <div class="bottom" v-for="item in list" :key="item.id.toString()">
      <!-- 左边样式 -->
      <div class="left">
        <img :src="item.cover.images.length?item.cover.images[0]:mrImg" alt />
        <div class="mid">
          <span class="txt">{{item.title}}</span>
          <span>
            <el-tag :type="item.status | statusColor">{{item.status | statusChange}}</el-tag>
          </span>
          <span class="time">{{item.pubdate}}</span>
        </div>
      </div>
      <!-- 右边样式 -->
      <div class="right">
        <span class="xg" @click="editArticles(item.id.toString())">
          <i class="el-icon-edit"></i>修改
        </span>
        <span class="del" @click="delArticles(item.id.toString())">
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
    <el-row type="flex" justify="center">
      <el-pagination background layout="prev, pager, next" :total="page.total"
        :paeg-size="page.pageSize" :current-page="page.currentPage" @current-change="getPage">
      </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        radio: 6, // 代表el-radio-group选中的radio的label的默认值为全部对应的6
        data: [], // 代表el-select中对应的数组
        date: []
      },
      channel_id: null,
      list: [], // 放置查询的还有images的对象数组
      mrImg: require('../../../assets/img/b.jpeg'), // 默认图片
      page: {
        total: 0, // 总条数
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    editArticles (id) {
      this.$router.push(`/home/publish/${id}`)
    },
    delArticles (id) {
      this.$confirm('您确定要删除吗？').then(res => {
        this.$http({ url: `/articles/${id}`, method: 'delete', params: { target: id } }).then(res => {
          this.queryContent()
        })
      })
    },
    getPage (newPage) {
      this.page.currentPage = newPage
      this.queryContent()
    },
    changeCondition () {
      // let params = {
      //   status: this.formdata.radio === 6 ? null : this.formdata.radio,
      //   channel_id: this.channel_id,
      //   begin_pubdate: this.formdata.date.length ? this.formdata.date[0] : null,
      //   end_pubdate:
      //     this.formdata.date.length > 1 ? this.formdata.date[1] : null
      // }
      this.page.currentPage = 1
      this.queryContent()
    },
    queryContent () {
      let params = {
        status: this.formdata.radio === 6 ? null : this.formdata.radio,
        channel_id: this.channel_id,
        begin_pubdate: this.formdata.date.length ? this.formdata.date[0] : null,
        end_pubdate:
          this.formdata.date.length > 1 ? this.formdata.date[1] : null,
        per_page: this.page.pageSize,
        page: this.page.currentPage
      }
      this.getContent(params)
    },

    // 获取内容列表
    getContent (params) {
      this.$http({ url: '/articles', params }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.page.pageSize = res.data.per_page
      })
    },
    getChannel () {
      this.$http({ url: '/channels' }).then(res => {
        this.formdata.data = res.data.channels
      })
    }
  },

  filters: {
    statusChange (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusColor (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  },
  created () {
    this.getContent()
    this.getChannel()
  }
}
</script>

<style lang="less" scoped>
.total {
  margin: 30px 30px;
  font-size: 14px;
  border-bottom: 1px dashed #ccc;
  height: 60px;
  line-height: 60px;
}
.bottom {
  height: 120px;

  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f2f3f5;
  margin: 30px 20px;
  .left {
    display: flex;
    img {
      width: 180px;
      height: 100px;
      border-radius: 4px;
    }
    .mid {
      display: flex;
      flex-direction: column;
      margin: 10px 20px;
      justify-content: space-around;
      .txt {
        font-size: 14px;
      }
      .time {
        font-size: 10px;
        color: #999;
      }
    }
  }
  .right {
    margin: 20px 30px;
    font-size: 12px;
    .xg {
      margin-right: 10px;
      cursor: pointer;
    }
    .del {
      cursor: pointer;
    }
  }
}
</style>
