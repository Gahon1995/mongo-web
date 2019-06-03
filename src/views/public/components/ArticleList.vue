<template>
  <div class="app-container">
    <div align="center">

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
              style="width:120px"
              placeholder="请输入title"
            />
          </el-form-item>
          <el-form-item label="类别:">
            <el-select
              v-model="listQuery.category"
              placeholder="类别"
              style="width:120px"
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
              style="width:100px"
              placeholder="作者"
            />
          </el-form-item>
          <el-form-item
            id="submit-item"
            style="margin-left:20px"
          >
            <el-button
              type="primary"
              @click="onSearchSubmit"
            >查询</el-button>
            <!-- </el-form-item>
          <el-form-item
            id="clear-item"
            class="fr"
          > -->
            <el-button
              type="warning"
              @click="resetSearch"
            >重置</el-button>
          </el-form-item>
          <el-form-item
            id="addNew-item"
            class="fr"
          >
          </el-form-item>
        </el-form>
      </section>
    </div>
    <transition name="fade">
      <div v-show="!listLoading">
        <span
          class="list-complete-item"
          v-for="(article) in this.list"
          :key="article.aid"
        >
          <el-card
            shadow="hover"
            style="margin-bottom: 20px; align: left"
          >

            <!-- {{ article.title }} -->

            <div
              @click="goDetails(article.aid)"
              slot="header"
            >
              <el-row>
                <el-col
                  :span="16"
                  class="title"
                ><i class="el-icon-edit-outline"></i>&nbsp;&nbsp; {{article.title}}</el-col>
                <el-col
                  :span="8"
                  style="text-align: right; margin-top:10px"
                >{{ article.authors }}</el-col>
              </el-row>

            </div>

            <el-row style="font-size:1.0rem; color: rgb(96, 108, 113)">
              <!-- <el-col :span="8">作者: {{ article.authors }}</el-col> -->
              <!-- <el-col :span="8"> a</el-col> -->
              <el-col :span="8">类别: {{article.category }}</el-col>
              <el-col :span="8">语言: {{ article.language }}</el-col>
            </el-row>

            <div class="text">
              {{ article.abstract }}
            </div>
            <div style="font-size: 1.1rem;color: #303133;padding: 10px 0px 0px 0px">
              <el-row>
                <el-col
                  :span="8"
                  style="padding-top: 5px"
                >
                  <el-tag
                    size="small"
                    type="success"
                  >{{article.articleTags}}</el-tag>
                </el-col>
                <el-col
                  :span="16"
                  style="text-align: right;"
                >
                  <!-- <el-tag
              size="small"
              type="danger"
              v-if="item.license"
            >{{item.license}}</el-tag> -->

                  <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                    最近更新 {{ article.update_time }}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </span>
      </div>
    </transition>

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
        size: 5,
        dbms: 'Beijing',
        title: null,
        category: null,
        authors: null,
        articleTags: null,
        language: null,
        detail: '0'
      }
    }
  },
  mounted() {
    this.fetchArticles()
  },
  methods: {
    goDetails(data) {
      console.log(data)
    },
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
    handleClick(dbms) {
      this.listQuery.dbms = dbms
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
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  // padding: 1px 2px;
  color: #1e6bb8;
}
.text {
  font-size: 1.15rem;
  line-height: 1.5;
  color: #303133;
  padding: 20px 0px 0px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 80px;
}
.el-card__header {
  padding-bottom: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
