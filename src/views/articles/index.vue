<template>
  <div class="app-container" align="center">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index" width="50" />
      <!-- <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">{{ scope.row.aid }}</template>
      </el-table-column> -->
      <el-table-column label="标题" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="类别" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.category }}</template>
      </el-table-column>
      <el-table-column label="abstract" align="center">
        <template slot-scope="scope">{{ scope.row.abstract }}</template>
      </el-table-column>
      <el-table-column label="articleTags" align="center">
        <template slot-scope="scope">{{ scope.row.articleTags }}</template>
      </el-table-column>
      <el-table-column label="language" align="center">
        <template slot-scope="scope">{{ scope.row.language }}</template>
      </el-table-column>
      <el-table-column label="text" align="center">
        <template slot-scope="scope">{{ scope.row.text }}</template>
      </el-table-column>
      <el-table-column label="image" align="center">
        <template slot-scope="scope">{{ scope.row.image }}</template>
      </el-table-column>
      <el-table-column label="video" align="center">
        <template slot-scope="scope">{{ scope.row.video }}</template>
      </el-table-column>
      <el-table-column label="authors" align="center">
        <template slot-scope="scope">{{ scope.row.authors }}</template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">{{ scope.row.update_time }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" width="200" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total / listQuery.size > 1"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="fetchArticles"
    />
  </div>
</template>

<script>
import { getArticles, deleteArticle } from '@/api/article.js'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      total: 0,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        region: null
      }
    }
  },
  created() {
    this.fetchArticles()
  },
  methods: {
    fetchArticles() {
      this.listLoading = true
      getArticles(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleDelete(row) {
      this.$confirm('确定删除?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteArticle(row.aid).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        }).catch(() => {
          this.formVisible = false
          // this.$notify({
          //   title: '失败',
          //   message: '删除数据失败，请检查后台状态',
          //   type: 'error',
          //   duration: 2000
          // })
        })
      }).catch(() => { })
    }
  }
}
</script>
