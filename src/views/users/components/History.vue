<template>
  <div>
    <div
      class="main_content"
      style="max-width: 600px; margin:0px auto"
    >
      <div
        v-for="(item,index) in historys"
        :key="'p'+index"
      >
        <router-link :to="'/articles/'+ item.aid">
          <div
            class="record-item record-item_success"
            style="margin-top: 20px"
          >
            <el-row
              type="flex"
              align="middle"
              justify="right"
            >
              <div style="display: inline-block; padding:10px; font-size:30px">{{ item.title }}</div>
              <div
                class="tags"
                style="display: inline-block; margin: 10px"
              >
                <el-tag
                  v-if="item.readOrNot"
                  type="success"
                >阅读</el-tag>

                <el-tag
                  v-if="item.agreeOrNot"
                  type="info"
                >点赞</el-tag>

                <el-tag
                  v-if="item.shareOrNot"
                  type="warning"
                >分享</el-tag>

                <el-tag
                  v-if="item.commentOrNot"
                  type="danger"
                >评论</el-tag>

              </div>
            </el-row>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getReadHistory } from '@/api/reads.js'
export default {
  name: 'History',
  data() {
    return {
      total: 0,
      historys: [],
      listQuery: {
        page: 1,
        size: 10,
        region: ''
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.listQuery.region = this.user.region
    this.GetHistory()
  },
  methods: {
    GetHistory() {
      getReadHistory(this.user.uid, this.listQuery).then(response => {
        if (response.code === 200) {
          this.historys = response.data.list
          this.total = response.data.total
        }
      })
    }
  }
}
</script>

<style lang="scss">
.record-item {
  width: 100%;
  padding: 8px 16px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  opacity: 1;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
}

.record-item_success {
  // background-color: #f0f9eb;
  // color: #67c23a;

  // background-color: #67c23a;
  // color: #fff;

  background-color: #fdf6ec;
  color: #e6a23c;
}
</style>
