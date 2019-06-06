<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >

      <sticky
        :z-index="10"
        :class-name="'sub-navbar '+postForm.status"
      >
        <!-- <CommentDropdown v-model="postForm.comment_disabled" />
        <PlatformDropdown v-model="postForm.platforms" />
        <SourceUrlDropdown v-model="postForm.source_uri" /> -->
        <div style="text-align: right; margin:10px 80px 0px 0px">
          <el-button
            v-loading="loading"
            style="margin-left: 10px;"
            type="success"
            :disabled="loading"
            @click="submitForm"
          >
            发表
          </el-button>
          <el-button
            v-loading="loading"
            :disabled="loading"
            type="warning"
            @click="draftForm"
          >
            草稿
          </el-button>
        </div>

      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <!-- <Warning /> -->

          <el-col :span="24">
            <el-form-item
              style="margin-bottom: 40px;"
              prop="title"
            >
              <MDinput
                v-model="postForm.title"
                :maxlength="100"
                name="name"
                required
              >
                标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label-width="50px"
                    label="作者:"
                    prop="authors"
                    class="postInfo-container-item"
                  >
                    <el-input
                      v-model="postForm.authors"
                      placeholder="请输入作者名字"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item
                    label-width="50px"
                    label="类别:"
                    prop="category"
                    class="postInfo-container-item"
                  >
                    <el-select
                      v-model="postForm.category"
                      filterable
                      :disabled="isEdit"
                      default-first-option
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item,index) in categoryList"
                        :key="item+index"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label-width="50px"
                    label="语言:"
                    prop="language"
                    class="postInfo-container-item"
                  >
                    <el-select
                      v-model="postForm.language"
                      filterable
                      default-first-option
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item,index) in languageList"
                        :key="item+index"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label-width="50px"
                    label="标签:"
                    class="postInfo-container-item"
                  >
                    <el-tag
                      v-for="tag in dynamicTags"
                      :key="tag"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)"
                    >
                      {{ tag }}
                    </el-tag>
                    <el-input
                      v-if="inputVisible"
                      ref="saveTagInput"
                      v-model="inputValue"
                      class="input-new-tag"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                    />
                    <el-button
                      v-else
                      class="button-new-tag"
                      size="small"
                      @click="showInput"
                    >+ New Tag</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item
          style="margin-bottom: 40px;"
          label-width="50px"
          label="摘要:"
          prop="abstract"
        >
          <el-input
            v-model="postForm.abstract"
            :rows="1"
            type="textarea"
            class="article-textarea"
            autosize
            placeholder="请输入文章摘要"
          />
          <span
            v-show="contentShortLength"
            class="word-counter"
          >{{ contentShortLength }}字</span>
        </el-form-item>

        <el-form-item
          prop="text"
          style="margin-bottom: 30px;"
        >
          <Tinymce
            ref="editor"
            v-model="postForm.text"
            :height="400"
          />
        </el-form-item>

        <el-form-item
          prop="image_uri"
          style="margin-bottom: 30px;"
        >
          <!-- <Upload v-model="postForm.image" /> -->
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
// import Upload from '@/components/Upload/SingleImage'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { getArticle, newArticle, updateArticle } from '@/api/article'
// import Warning from './Warning'
// import {
//   CommentDropdown,
//   PlatformDropdown,
//   SourceUrlDropdown
// } from './Dropdown'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  category: '', // 文章类别
  abstract: '', // 文章摘要
  articleTags: '', // 文章tags
  authors: '', // 文章作者
  language: '', // 文章语言
  aid: undefined,
  text: '', // 文章正文
  image: '', // 文章图片
  video: '' // 文章视频
  // comment_disabled: false,
  // importance: 0
}

export default {
  name: 'ArticleDetail',
  components: {
    Tinymce,
    MDinput,
    // Upload,
    Sticky
    // Warning,
    // CommentDropdown,
    // PlatformDropdown,
    // SourceUrlDropdown
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        // this.$message({
        //   message: rule.field + '为必传项',
        //   type: 'error'
        // })
        callback(new Error(rule.field + '为必填项'))
      } else {
        callback()
      }
    }

    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      categoryList: ['science', 'technology'],
      languageList: ['zh', 'en'],
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        // image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire, trigger: 'blur' }],
        text: [{ validator: validateRequire, trigger: 'blur' }],
        authors: [{ validator: validateRequire, trigger: 'blur' }],
        category: [{ validator: validateRequire, trigger: 'blur' }],
        language: [{ validator: validateRequire, trigger: 'blur' }],
        abstract: [{ validator: validateRequire, trigger: 'blur' }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.abstract.length
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return +new Date(this.postForm.display_time)
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const aid = this.$route.params && this.$route.params.id
      const category = this.$route.query && this.$route.query.category

      this.fetchData(aid, category)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(aid, category) {
      var query = {}
      if (category != null) {
        query = { category: category }
      }
      getArticle(aid, query)
        .then(response => {
          this.postForm = response.data

          // just for test
          // this.postForm.title += `   Article Id:${this.postForm.id}`
          // this.postForm.abstract += `   Article Id:${this.postForm.id}`

          // set tagsview title
          this.dynamicTags =
            this.postForm.articleTags !== '' &&
            this.postForm.articleTags.split(',')
          // this.setTagsViewTitle()

          // set page title
          this.setPageTitle()
        })
        .catch(err => {
          console.log(err)
        })
    },
    setTagsViewTitle() {
      const title = '文章编辑'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.postForm.aid}`
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑'
      document.title = `${title} - ${this.postForm.title}`
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postForm.articleTags = this.dynamicTags.join(',')
          if (this.isEdit) {
            updateArticle(this.postForm.aid, this.postForm).then(response => {
              if (response.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '更新文章成功',
                  type: 'success',
                  duration: 2000
                })
                this.postForm.status = 'published'
                var aid = response.data.aid
                this.loading = false
                this.$router.push({
                  path: `/articles/${aid}`,
                  query: { category: this.postForm.category }
                })
              }
            })
          } else {
            newArticle(this.postForm)
              .then(response => {
                if (response.code === 200) {
                  this.$notify({
                    title: '成功',
                    message: '发布文章成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.postForm.status = 'published'
                  var aid = response.data.aid
                  this.loading = false
                  this.$router.push({
                    path: `/articles/${aid}`,
                    query: { category: this.postForm.category }
                  })
                }
              })
              .catch(() => {
                this.$notify({
                  title: '失败',
                  message: '服务器出现故障，稍后重试',
                  type: 'error',
                  duration: 2000
                })
                this.loading = false
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (
        this.postForm.content.length === 0 ||
        this.postForm.title.length === 0
      ) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
