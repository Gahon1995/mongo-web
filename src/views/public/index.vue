<template>
  <section class="main-content">
    <div align="center">
      <el-tabs
        v-model="dbms"
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
    </div>
    <el-row>
      <el-col
        :span="16"
        style="padding-right:10px"
      >
        <article-list ref='article'></article-list>
        <!-- articles -->
      </el-col>
      <el-col
        :span="8"
        style="padding-left:10px"
      >
        <popular-list ref='popular'></popular-list>
        <!-- populars -->
      </el-col>
    </el-row>

  </section>
</template>

<script>
import ArticleList from './components/ArticleList'
import PopularList from './components/PopularList'
export default {
  components: {
    ArticleList,
    PopularList
  },
  data() {
    return {
      dbms: 'Beijing'
    }
  },
  methods: {
    handleClick() {
      this.$refs.article.handleClick(this.dbms)
      this.$refs.popular.handleClick(this.dbms)
      // this.listQuery.region = tab.name
      // this.listQuery.page = 1
      // this.fetchArticles()
      // console.log(tab.name)
      // console.log(tab, event)
    }
  }
}
</script>


<style>
.main-content {
  max-width: 80%;
  padding: 30px 0px 30px 0px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
  min-height: 800px;
}
</style>
