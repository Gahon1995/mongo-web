<template>
  <div class='public-container'>
    <section class="main-content">
      <div align="center">
        <el-tabs
          class="region"
          v-model="dbms"
          :stretch="true"
          style="margin-bottom: 20px; width: 50%; align=center"
          @tab-click="handleClick"
        >

          <el-tab-pane
            label="Hong Kong"
            name="Hong Kong"
          />
          <el-tab-pane
            label="Beijing"
            name="Beijing"
          />
        </el-tabs>
      </div>
      <el-row>
        <el-col
          :span="15"
          style="padding-right:10px"
        >
          <article-list
            class='article-list'
            ref='article'
          ></article-list>
          <!-- articles -->
        </el-col>
        <el-col
          :span="9"
          style="padding-left:10px"
        >
          <popular-list
            class='popular-list'
            ref='popular'
          ></popular-list>
          <!-- populars -->
        </el-col>
      </el-row>

    </section>
  </div>
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
      dbms: 'Hong Kong'
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


<style lang='scss'>
.main-content {
  max-width: 1300px;
  padding: 30px 0px 30px 0px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
  min-height: 800px;
}
.public-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .region {
    // position: absolute;
    // background-color: rgb(255, 255, 255);
    top: 0px;
    border: 0;
    right: 0;
  }
  .popular-list {
    // background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .article-list {
    // background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
