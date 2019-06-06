<template>
  <div>
    <tabs
      :select.sync="select"
      :list="userOpList"
      @selectChange="regionChange"
    />

    <template v-if="select === 'UserInfo'">
      <my-info />
    </template>
    <template v-else-if="select == 'MyArticle'">
      <my-article />
    </template>
    <template v-else>
      <history />
    </template>
  </div>
</template>

<script>
// import Region from '@compoments/Region'
import Tabs from '@/components/Tabs' // Secondary package based on el-pagination

import MyArticle from './components/MyArticle'
import History from './components/History'
import MyInfo from './components/MyInfo'

export default {
  name: 'UserInfo',
  components: { Tabs, MyInfo, MyArticle, History },
  data() {
    return {
      select: 'UserInfo',
      userOpList: [
        { label: '个人信息', name: 'UserInfo' },
        { label: '我的文章', name: 'MyArticle' },
        { label: '阅读记录', name: 'History' }
      ]
    }
  },
  methods: {
    regionChange(dbms) {
      // console.log(this.select)
    }
  }
}
</script>
