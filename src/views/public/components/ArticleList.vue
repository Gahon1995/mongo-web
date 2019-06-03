<template>
  <div class="app-container">
    <div align="center">
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
    </div>

    <el-card
      shadow="hover"
      v-for="(article,index) in this.list"
      :key="'p'+index"
      style="margin-bottom: 20px; align: left"
    >

      <!-- {{ article.title }} -->

      <div
        @click="goDetails(article.aid)"
        class="title"
        slot="header"
      >
        <i class="el-icon-s-order"></i>&nbsp;&nbsp; {{article.title}}

      </div>

      <el-row style="text_align:20px; font-size:1.0rem">
        <el-col :span="8">作者: {{ article.authors }}</el-col>
        <el-col :span="8">类别: {{article.category }}</el-col>
        <el-col :span="8">语言: {{ article.language }}</el-col>
      </el-row>

      <div class="text">
        {{ article.abstract }}
      </div>
      <div style="font-size: 1.1rem;color: #303133;padding: 10px 0px 0px 0px">
        <el-row>
          <el-col
            :span="16"
            style="padding-top: 5px"
          >
            <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
              最近更新 {{ article.update_time }}
            </div>
          </el-col>
          <el-col
            :span="8"
            style="text-align: right;"
          >
            <!-- <el-tag
              size="small"
              type="danger"
              v-if="item.license"
            >{{item.license}}</el-tag> -->
            <el-tag
              size="small"
              type="success"
            >{{article.articleTags}}</el-tag>
          </el-col>
        </el-row>
      </div>
    </el-card>

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


<style lang="scss">
.title {
  font-size: 1.5rem;
  text-decoration: none;
  cursor: pointer;
  color: red;
}
.text {
  font-size: 1.15rem;
  line-height: 1.5;
  color: #303133;
  padding: 20px 0px 0px 10px;
}
</style>
