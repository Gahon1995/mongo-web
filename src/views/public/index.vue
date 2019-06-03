<template>
  <section class="main-content">
    <el-row>
      <el-col
        :span="16"
        style="padding-right:10px"
      >
        <article-list></article-list>
        <!-- articles -->
      </el-col>
      <el-col
        :span="8"
        style="padding-left:10px"
      >
        <popular-list></popular-list>
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
  }
}
</script>


<style>
.main-content {
  max-width: 64rem;
  padding: 30px 0px 30px 0px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
  min-height: 800px;
}
</style>
