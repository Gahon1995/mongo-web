<template>
  <div class="app-container">
    <div align="center">

      <section id="search-title">

        <el-form
          :inline="true"
          :model="listQuery"
          class="demo-form-inline"
        >
          <el-row>
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
          </el-row>
          <el-row>
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
              <el-button
                type="success"
                @click="recentUpdate"
              >最近更细</el-button>
            </el-form-item>
          </el-row>
          <el-form-item
            id="addNew-item"
            class="fr"
          >
          </el-form-item>
        </el-form>
      </section>
    </div>

    <!-- <div v-if="!listLoading">
      <div
        v-for="(article) in this.list"
        :key="article.aid"
      >
        <router-link :to="'/articles/'+article.aid + '?category=' + article.category">
          <div
            class="art"
            style="background: #ffffff;padding:1.5rem 2rem;margin-bottom:5px"
          >
            <div
              class="head-info"
              style="font-size: 1rem;color: #b2bac2"
            >
              {{ article.authors}} &nbsp;&nbsp;· {{article.category}} &nbsp;&nbsp;· &nbsp;&nbsp; {{article.language}}
            </div>
            <div
              class='title1'
              style="font-size:12px;line-height:normal;margin: .5rem 0 1rem; white-space:nowrap; overflow: hidden; text-overflow:ellipsis"
            >
              <a style="font-size:1.4rem;font-weight:600;line-height:1.2;color:#2e3135"> {{article.title}}</a>
            </div>
            <div class='abstract'>{{article.abstract}}</div>
          </div>
        </router-link>
      </div>
    </div> -->

    <transition name="fade">
      <div v-if="!listLoading">
        <span
          v-for="(article) in this.list"
          :key="article.aid"
        >
          <router-link :to="'/articles/'+article.aid + '?category=' + article.category">
            <el-card
              shadow="hover"
              style="margin-bottom: 5px; align: left"
            >

              <div slot="header">
                <el-row>
                  <el-col :span="16">
                    <i
                      class="el-icon-edit-outline"
                      style='font-size:30px; vertical-align: middle;'
                    ></i>

                    <div
                      class="title"
                      @click="goDetails(article.aid)"
                      style="display:inline-block; margin-left: 10px; vertical-align: middle;"
                    >
                      {{article.title}}
                    </div>

                  </el-col>
                  <el-col
                    :span="8"
                    style="text-align: right; margin-top:10px"
                  >{{ article.authors }}</el-col>
                </el-row>

              </div>

              <el-row style="font-size:1.0rem; color: rgb(96, 108, 113)">
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

                    <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                      最近更新 {{ article.update_time }}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </router-link>
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
        dbms: 'Hong Kong',
        sort_by: null,
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
      this.listQuery.sort_by = null
      this.listQuery.page = 1
      this.fetchArticles()
    },
    addNewHandler() {},
    recentUpdate() {
      this.listQuery.sort_by = '-update_time'
      this.onSearchSubmit()
    },
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
  font-size: 30px;
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
