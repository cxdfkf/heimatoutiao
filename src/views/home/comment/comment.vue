<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="com">评论列表</template>
    </bread-crumb>
    <el-table :data="tableData" style="width: 100%" width="600">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="comment_status" :formatter="resolvestatus" label="评论状态" align="center"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数" align="center"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数" align="center"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
          <el-button
            :style="{color:obj.row.comment_status?'#E6A23C':'#409EFF'}"
            type="text"
            size="small"
            @click="closeOropen(obj.row)"
          >{{obj.row.comment_status?"关闭评论":"打开评论"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination background layout="prev, pager, next" @current-change="currentChange" :total="pageData.total" :page-size="pageData.pageSize" :current-page="pageData.currentPage"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      pageData: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      loading: ''
    }
  },
  methods: {
    // 分页触发的函数
    currentChange (newPage) {
      this.pageData.currentPage = newPage
      this.getList()
    },
    // 因为el-table不显示布尔类型的数据，使用对数据进行格式化处理--cellValue代表状态的值
    resolvestatus (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 关闭或打开评论
    closeOropen (row) {
      this.$confirm(
        `确定要${row.comment_status ? '关闭' : '打开'}评论吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$http({
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          method: 'PUT',
          data: { allow_comment: !row.comment_status }
        }).then(res => {
          this.getList()
        })
      })
    },
    getList () {
      this.loading = true
      this.$http({
        url: '/articles',
        params: { 'response_type': 'comment', 'page': this.pageData.currentPage, 'per_page': this.pageData.pageSize }
      }).then(res => {
        // console.log(res)
        this.tableData = res.data.results
        this.pageData.total = res.data.total_count
        this.loading = false
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style>
</style>
