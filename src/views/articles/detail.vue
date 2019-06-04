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
                  icon="el-icon-share"
                  @click="share()"
                >分享</el-button>
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
          <!-- <el-row style="font-size:1.0rem; color: rgb(96, 108, 113)">
            <div class="duiqi">
              <div style="display: inline-block; margin-right:10px">类别: </div>{{ article.category }}
              <div style="display: inline-block; margin: 0px 10px">语言: </div>{{ article.language }}
            </div>
          </el-row> -->

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
                <div
                  class="duiqi"
                  style="display: inline-block;"
                >
                  <el-tooltip
                    effect="dark"
                    :content="'read '+record.readNum"
                    placement="bottom"
                  >
                    <i
                      class="el-icon-star-off"
                      style="margin: 0px 5px 0px 0px"
                    />
                  </el-tooltip>
                  {{ record.readNum }}
                </div>
                <div style="display: inline-block">
                  <el-tooltip
                    effect="dark"
                    :content="'comment '+record.commentNum"
                    placement="bottom"
                  >
                    <i
                      class="el-icon-view"
                      style="margin: 0px 5px 0px 15px"
                    />
                  </el-tooltip>
                  {{ record.commentNum }}
                </div>
                <div style="display: inline-block">
                  <el-tooltip
                    effect="dark"
                    :content="'agree '+record.agreeNum"
                    placement="bottom"
                  >
                    <i
                      class="el-icon-bell"
                      style="margin: 0px 5px 0px 15px"
                    />
                  </el-tooltip>
                  {{ record.agreeNum }}
                </div>
                <div style="display: inline-block">
                  <el-tooltip
                    effect="dark"
                    :content="'share '+record.shareNum"
                    placement="bottom"
                  >
                    <i
                      class="el-icon-share"
                      style="margin: 0px 5px 0px 15px"
                    />
                  </el-tooltip>
                  {{ record.shareNum }}
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
            <!-- <div style="font-size: 0.9rem;;color: #606c71; text-align: center;">
              上次更新 {{ article.update_time }}
            </div> -->
            <div class="text">
              {{ article.text }}
            </div>
          </div>

        </div>

        <!-- <div style="margin: 40px 0;" /> -->

        <div
          class="commentBox"
          style="padding:20px"
          :v-loading="loadingComment"
        >
          <h3>评论列表</h3>
          <p v-if="record.comments == null">暂无评论，我来发表第一篇评论！</p>
          <div
            v-else
            class="container"
          >
            <div
              v-for="(item, index) in record.comments"
              :key="index"
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

export default {
  data() {
    return {
      loading: true,
      loadingComment: true,
      article: {},
      commentDetail: '',
      record: {}
    }
  },
  created() {
    const aid = this.$route.params && this.$route.params.id
    const query = this.$route.query
    this.fetchData(aid, query)
  },
  methods: {
    commitComment() {},
    cancel() {},
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
        })
        .catch(() => {
          this.$router.push({ path: '/index' })
        })

      this.loading = false
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
      this.$message({
        message: '分享成功',
        type: 'success'
      })
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
