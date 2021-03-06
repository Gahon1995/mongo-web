<template>
  <div class="app-container">
    <div align="center">

      <div
        class="filter-container"
        style="margin-bottom: 20px"
      >
        <el-input
          v-model="listQuery.title"
          placeholder="标题"
          style="width: 150px; margin-bottom:10px"
          class="filter-item"
          @keyup.enter.native="onSearchSubmit"
        />
        <el-input
          v-model="listQuery.authors"
          placeholder="作者"
          style="width: 100px;"
          class="filter-item"
          @keyup.enter.native="onSearchSubmit"
        />
        <el-select
          v-model="listQuery.category"
          @change="onSearchSubmit"
          placeholder="类别"
          style="width: 120px"
          class="filter-item"
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>

        <el-button
          class="filter-item"
          type="primary"
          style="margin-left: 10px;"
          icon="el-icon-search"
          @click="onSearchSubmit"
        >
          搜索
        </el-button>
        <el-row style="display: inline-block">
          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="warning"
            icon="el-icon-edit"
            @click="resetSearch"
          >
            重置
          </el-button>
          <el-button
            class="filter-item"
            type="success"
            icon="el-icon-download"
            @click="recentUpdate"
          >
            最近更新
          </el-button>
        </el-row>
      </div>

    </div>

    <transition name="fade">
      <div v-loading="listLoading">
        <span
          v-for="(article) in list"
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
        <div
          v-if="!list || list.length <= 0"
          style="max-width:400px;margin:0px auto"
        >
          <el-alert
            title="未找到相关的文章"
            type="error"
            center
            :closable='false'
          >
          </el-alert>
        </div>
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
      },
      categoryOptions: [
        { name: '全部', value: null },
        { name: 'science', value: 'science' },
        { name: 'technology', value: 'technology' }
      ]
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
