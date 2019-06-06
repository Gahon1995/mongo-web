<template>
  <div class="public-container">
    <div
      class="detail-content"
      :v-loading="loading"
    >

      <div v-if="article != {}">
        <div
          class="article"
          style="margin-bottom: 20px; align: left"
          :v-loading="loading"
        >
          <div slot="header">
            <el-row style="padding-top: 30px">
              <el-col
                :span="16"
                class="title—detail"
              >{{ article.title }}</el-col>
              <el-col
                :span="8"
                style="text-align: right; margin-top:10px"
              >
                <el-button
                  style="padding: 3px 0"
                  type="text"
                  @click="agree()"
                >
                  <svg-icon icon-class="agree" />
                  点赞
                </el-button>
                <el-button
                  style="padding: 3px 0"
                  type="text"
                  @click="share()"
                >
                  <svg-icon icon-class="share" />
                  分享

                </el-button>

              </el-col>
            </el-row>

          </div>
          <el-divider />
          <el-row style="font-size:1.0rem; color: rgb(96, 108, 113); margin-bottom: 10px">
            <el-col :span="16">
              <div class="duiqi">
                <div style="display: inline-block;margin-right:20px">
                  <span style="margin-right:10px">作者: </span>{{ article.authors }}
                </div>
                <div style="display: inline-block;margin-right:20px">
                  <span style="margin-right:10px">类别: </span>{{ article.category }}
                </div>
                <div style="display: inline-block;margin-right:20px">
                  <span style="margin-right:10px">语言: </span>{{ article.language }}
                </div>
              </div>
            </el-col>
            <el-col
              :span="8"
              style="text-align: right;"
            >
              <el-tag
                size="small"
                type="success"
              >{{ article.articleTags }}</el-tag>
            </el-col>

          </el-row>

          <div
            class="duiqi"
            style="font-size: 1.1rem; line-height: 1.5; color: rgb(48, 49, 51);"
          >
            {{ article.abstract }}
          </div>
          <div style="font-size: 1.1rem;color: #303133;padding: 15px 0px 15px 0px;border-bottom: 1px solid #E4E7ED;">
            <el-row>
              <el-col
                :span="12"
                style="padding-top: 5px"
              >

                <div style="display: inline-block">
                  <el-tooltip
                    effect="dark"
                    :content="'阅读 '+record.readNum"
                    placement="bottom"
                    style="margin: 15px 5px 0px 15px"
                  >
                    <div>
                      <svg-icon icon-class="view" />
                      <div style="display: inline-block;">
                        {{ record.readNum }}</div>
                    </div>
                  </el-tooltip>
                </div>

                <div style="display: inline-block">
                  <el-tooltip
                    effect="dark"
                    :content="'评论 '+record.commentNum"
                    placement="bottom"
                    style="margin: 0px 5px 0px 15px"
                  >
                    <div>
                      <svg-icon icon-class="comment" />
                      <div style="display: inline-block;">
                        {{ record.commentNum }}</div>
                    </div>
                  </el-tooltip>
                </div>

                <div style="display: inline-block">
                  <el-tooltip
                    effect="dark"
                    :content="'点赞 '+record.agreeNum"
                    placement="bottom"
                    style="margin: 0px 5px 0px 15px"
                  >
                    <div>
                      <svg-icon icon-class="agree" />
                      <div style="display: inline-block;">
                        {{ record.agreeNum }}</div>
                    </div>
                  </el-tooltip>
                </div>

                <div style="display: inline-block">
                  <el-tooltip
                    effect="dark"
                    :content="'分享 '+record.shareNum"
                    placement="bottom"
                    style="margin: 0px 5px 0px 15px"
                  >
                    <div>
                      <svg-icon icon-class="share" />
                      <div style="display: inline-block;">
                        {{ record.shareNum }}</div>
                    </div>
                  </el-tooltip>
                </div>

              </el-col>
              <el-col
                :span="12"
                style="text-align: right;"
              >

                <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                  创建时间 {{ article.timestamp }}
                </div>
              </el-col>
            </el-row>
          </div>

          <el-divider content-position="center">上次更新 {{ article.update_time }}</el-divider>

          <div>

            <div class="text">
              <template>
                <div v-html="article.text" />
              </template>

            </div>
          </div>

        </div>

        <div
          class="commentBox"
          style="padding:20px"
          :v-loading="loadingComment"
        >
          <h3>评论列表</h3>
          <p v-if="record.comments == null">暂无评论，我来发表第一篇评论！</p>
          <div
            v-for="(item, index) in record.comments"
            v-else
            :key="index"
            class="container"
          >
            <div
              v-if="item.rid > -2"
              class="comment"
            >
              <div class="info">
                <img
                  class="avatar"
                  :src="item.avatar || 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg'"
                  width="36"
                  height="36"
                >
                <div class="right">
                  <div class="name">{{ item.name }}</div>
                  <div class="date">{{ item.timestamp }}</div>
                </div>
              </div>
              <div class="content">{{ item.commentDetail }}</div>
            </div>
            <!-- <el-card
            v-for="(item,index) in record.comments"
            :key="index"
            class="comment"
          >
            <b>
              <el-row>
                <el-col :span="12">{{ item.name }}</el-col>
                <el-col
                  :span="12"
                  style="text-align: right;"
                >{{ item.timestamp }}</el-col>
              </el-row>
            </b>

            <el-divider />
            <div class="commentDetail">
              {{ item.commentDetail }}
            </div>
          </el-card> -->
          </div>
          <!-- </div> -->

          <div
            class="input-wrapper"
            style="width: 100%; margin: 30px auto 0px auto"
          >
            <el-input
              v-model="commentDetail"
              class="gray-bg-input"
              type="textarea"
              placeholder="请输入评论内容"
              maxlength="150"
              show-word-limit
              :autosize="{ minRows: 3, maxRows: 5}"
            />
            <div class="btn-control">
              <span
                class="cancel"
                @click="cancel"
              >取消</span>
              <el-button
                class="btn"
                type="success"
                round
                @click="commitComment"
              >确定</el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>文章不存在哟</div>

    </div>
  </div>
</template>

<script>
import { getArticle, getArticleRecord } from '@/api/article.js'
import { newRead } from '@/api/reads.js'
import { mapGetters } from 'vuex'
import { formatTime } from '@/utils/index.js'

export default {
  data() {
    return {
      openTime: null,
      loading: true,
      loadingComment: true,
      article: {},
      commentDetail: '',
      record: {}
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    const aid = this.$route.params && this.$route.params.id
    const query = this.$route.query
    this.fetchData(aid, query)
    this.openTime = Date.now()

    // window.addEventListener('beforeunload', e => this.newRecord(e))
  },
  destroyed() {
    var data = {}
    data.readSequence = 1
    this.newRecord(data)
    // window.removeEventListener('beforeunload', e => this.newRecord(e))
  },
  methods: {
    newRecord(data, info) {
      if (this.user == null) {
        console.log('无用户登录')
      } else {
        data.uid = this.user.uid
        data.aid = this.article.aid
        data.region = this.user.region
        data.category = this.article.category
        data.readTimeLength = parseInt((Date.now() - this.openTime) / 1000)
        this.openTime = Date.now()

        newRead(data)
          .then(response => {
            if (response.data.rid >= 0) {
              if (
                this.record.comments.length > 0 &&
                this.record.comments[0].rid === -3
              ) {
                this.record.comments[0].rid = response.data.rid
              }

              if (info) {
                this.$message({
                  message: info + '成功',
                  type: 'success'
                })
              }
            } else {
              throw response
              // if (info) {
              //   this.$message({
              //     message: info + '失败，请稍后重试',
              //     type: 'error'
              //   })
              // }
            }
            return true
          })
          .catch(errors => {
            console.log(errors)
            if (info) {
              this.$message({
                message: info + '失败，请稍后重试',
                type: 'error'
              })
            }
            return false
          })
      }
    },
    commitComment() {
      if (this.commentDetail.length < 5) {
        this.$message({
          message: '评论字数至少5个字哟',
          type: 'error'
        })
        return
      }
      var data = {}
      data.commentOrNot = 1
      data.commentDetail = this.commentDetail

      var comment = {
        commentDetail: this.commentDetail,
        name: this.user.name,
        rid: -3,
        timestamp: formatTime(Date.now())
      }

      this.newRecord(data, '评论')
      // 更新评论列表

      this.record.comments.unshift(comment)
      this.commentDetail = null
    },
    cancel() {
      this.commentDetail = null
    },
    fetchData(aid, query) {
      this.loading = true
      getArticle(aid, query)
        .then(response => {
          if (!response.data) {
            this.$message({
              message: '当前文章不存在',
              type: 'error'
            })
            this.$router.push({ path: '/index' })
          }

          this.article = response.data
          this.fetchRecord(aid, this.article.category)
          this.loading = false
          var data = {}
          data.readOrNot = 1
          this.newRecord(data)
        })
        .catch(() => {
          this.$router.push({ path: '/index' })
        })
    },
    fetchRecord(aid, dbms) {
      this.loadingComment = true
      const query = { category: dbms }
      getArticleRecord(aid, query).then(response => {
        this.record = response.data
      })
      this.loadingComment = false
    },
    share() {
      const data = {}
      data.shareOrNot = 1
      this.newRecord(data, '分享')
      // this.$message({
      //   message: '分享成功',
      //   type: 'success'
      // })
    },
    agree() {
      var data = {}
      data.agreeOrNot = 1
      this.newRecord(data, '点赞')
      // this.$message({
      //   message: '点赞成功',
      //   type: 'success'
      // })
    }
  }
}
</script>

<style lang="scss">
.public-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  height: 100%;
  position: relative;
}

.detail-content {
  max-width: 800px;
  background-color: rgb(255, 255, 255);
  // padding: 30px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
  min-height: 800px;
}

.article {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  padding: 0 24px 16px;
}
.text {
  word-wrap: break-word;
  margin: 0 0 16px;
  font-size: 16px;
  // color: #4f4f4f;
  font-weight: 400px;
  line-height: 26px;
}

.title—detail {
  padding-left: 20px;
  font-size: 2rem;
  font-weight: 600px;
}

.duiqi {
  margin-left: 15px !important;
}
.comment {
  margin: 10px;
  padding: 10px;
}

.container {
  padding: 0 10px;
  box-sizing: border-box;
  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid #f2f6fc;
    .info {
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          font-size: 16px;
          color: #303133;
          margin-bottom: 5px;
          font-weight: 500;
        }
        .date {
          font-size: 12px;
          color: #909399;
        }
      }
    }
    .content {
      font-size: 16px;
      color: #303133;
      line-height: 20px;
      padding: 10px 0;
    }
  }
}

.input-wrapper {
  padding: 10px;
  .gray-bg-input,
  .el-input__inner {
    /*background-color: #67C23A;*/
  }
  .btn-control {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
    .cancel {
      font-size: 16px;
      color: #606266;
      margin-right: 20px;
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
    .confirm {
      font-size: 16px;
    }
  }
}
</style>
