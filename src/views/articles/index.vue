<template>
  <div
    class="app-container"
    align="center"
  >
    <el-tabs
      v-model="listQuery.dbms"
      :stretch="true"
      style="margin-bottom: 20px; width: 50%; align=center"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="Beijing"
        name="Beijing"
      />
      <el-tab-pane
        label="Hong Kong"
        name="Hong Kong"
      />
    </el-tabs>

    <section id="search-title">
      <el-form
        :inline="true"
        :model="listQuery"
        class="demo-form-inline"
      >
        <el-form-item label="title:">
          <el-input
            v-model="listQuery.title"
            type="text"
            style="width:150px"
            placeholder="请输入title"
          />
        </el-form-item>
        <el-form-item label="类别:">
          <el-select
            v-model="listQuery.category"
            placeholder="类别"
            style="width:100px"
          >
            <el-option
              label="全部"
              :value="null"
            />
            <el-option
              label="science"
              value="science"
            />
            <el-option
              label="technology"
              value="technology"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="authors:">
          <el-input
            v-model="listQuery.authors"
            type="text"
            style="width:150px"
            placeholder="作者"
          />
        </el-form-item>
        <el-form-item label="articleTags:">
          <el-input
            v-model="listQuery.articleTags"
            type="text"
            style="width:150px"
            placeholder="articleTags"
          />
        </el-form-item>
        <el-form-item label="类别:">
          <el-select
            v-model="listQuery.language"
            placeholder="类别"
            style="width:100px"
          >
            <el-option
              label="全部"
              :value="null"
            />
            <el-option
              label="中文"
              value="zh"
            />
            <el-option
              label="英文"
              value="en"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          id="submit-item"
          style="margin-left:20px"
        >
          <el-button
            type="primary"
            @click="onSearchSubmit"
          >查询</el-button>
        </el-form-item>
        <el-form-item
          id="clear-item"
          class="fr"
        >
          <el-button
            type="warning"
            @click="resetSearch"
          >重置</el-button>
        </el-form-item>
        <el-form-item
          id="addNew-item"
          class="fr"
        >
          <el-button
            type="primary"
            @click="addNewHandler"
          >新增</el-button>
        </el-form-item>
      </el-form>
    </section>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      stripe
      highlight-current-row
    >
      <el-table-column
        type="index"
        width="50"
      />
      <!-- <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">{{ scope.row.aid }}</template>
      </el-table-column>-->
      <el-table-column
        label="标题"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column
        label="authors"
        align="center"
        width="100px"
      >
        <template slot-scope="scope">{{ scope.row.authors }}</template>
      </el-table-column>
      <el-table-column
        label="类别"
        align="center"
        width="100px"
      >
        <template slot-scope="scope">{{ scope.row.category }}</template>
      </el-table-column>
      <el-table-column
        label="abstract"
        align="center"
        min-width="150px"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">{{ scope.row.abstract }}</template>
      </el-table-column>
      <el-table-column
        label="articleTags"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.articleTags }}</template>
      </el-table-column>
      <el-table-column
        label="language"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.language }}</template>
      </el-table-column>
      <el-table-column
        label="text"
        align="center"
        min-width="150px"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">{{ scope.row.text }}</template>
        <!-- <template slot-scope="scope">
          <el-popover
            placement="top"
            width="300"
            trigger="click"
          >
            <div>{{ scope.row.text }}</div>
            <el-button slot="reference">点击查看</el-button>
          </el-popover>
        </template> -->
      </el-table-column>
      <el-table-column
        label="image"
        align="center"
      >
        <!-- <template slot-scope="scope">{{ scope.row.image }}</template> -->
        <template slot-scope="scope">
          <el-popover
            placement="top"
            width="300"
            trigger="click"
          >
            <div>{{ scope.row.image }}</div>
            <el-button slot="reference">查看</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="video"
        align="center"
      >
        <!-- <template slot-scope="scope">{{ scope.row.video }}</template> -->
        <template slot-scope="scope">
          <el-popover
            placement="top"
            width="300"
            trigger="click"
          >
            <div>{{ scope.row.video }}</div>
            <el-button slot="reference">播放</el-button>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="更新时间"
        align="center"
        width="200px"
      >
        <template slot-scope="scope">{{ scope.row.update_time }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        width="200px"
        label="创建时间"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="80"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
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
        dbms: 'Beijing',
        title: null,
        category: null,
        authors: null,
        articleTags: null,
        language: null
      }
    }
  },
  created() {
    this.fetchArticles()
  },
  methods: {
    resetSearch() {
      this.listQuery.title = null
      this.listQuery.category = null
      this.listQuery.authors = null
      this.listQuery.articleTags = null
      this.listQuery.language = null
      this.listQuery.page = 1
      this.fetchArticles()
    },
    addNewHandler() {},
    onSearchSubmit() {
      for (var prop in this.listQuery) {
        if (this.listQuery[prop] === '') {
          this.listQuery[prop] = null
        }
      }

      this.listQuery.page = 1
      this.fetchArticles()
    },
    handleClick(tab, event) {
      // this.listQuery.region = tab.name
      this.listQuery.page = 1
      this.fetchArticles()
      // console.log(tab.name)
      // console.log(tab, event)
    },
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
      })
        .then(() => {
          deleteArticle(row.aid)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 1000
              })
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
            })
            .catch(() => {
              this.formVisible = false
              // this.$notify({
              //   title: '失败',
              //   message: '删除数据失败，请检查后台状态',
              //   type: 'error',
              //   duration: 2000
              // })
            })
        })
        .catch(() => {})
    }
  }
}
</script>
