<template>
  <div
    v-if="visiable && postForm != null"
    style="width: 200px"
    class="edit-user"
  >
    <el-dialog
      :title="title"
      width="600px"
      center
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="postForm"
        :model="postForm"
        :rules="rules"
        label-width="130px"
        style="margin-left:80px"
      >

        <el-form-item
          label="用户名: "
          prop="name"
          class="form-item"
          required
        >
          <el-input
            v-model="postForm.name"
            :disabled="action !== 'register'"
            size="small"
            class="edit-input"
          />

        </el-form-item>

        <el-form-item
          label="密码: "
          required
          class="form-item"
        >
          <el-input
            v-model="postForm.pwd"
            size="small"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item
          label="性别: "
          required
          class="form-item"
        >
          <template>
            <el-radio
              v-model="postForm.gender"
              label="male"
            >男</el-radio>
            <el-radio
              v-model="postForm.gender"
              label="female"
            >女</el-radio>
          </template>
        </el-form-item>

        <el-form-item
          label="region: "
          required
          class="form-item"
        >
          <el-select
            v-model="postForm.region"
            class="edit-input"
            :disabled="action !== 'register'"
            size="small"
            style="width: 180px"
            placeholder="请选择"
          >
            <el-option
              label="北京"
              value="Beijing"
            />
            <el-option
              label="香港"
              value="Hong Kong"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="邮箱: "
          prop="email"
          size="small"
          class="form-item"
          required
        >

          <el-input
            v-model="postForm.email"
            class="edit-input"
          />

        </el-form-item>

        <el-form-item
          label="电话: "
          required
          prop="phone"
          class="form-item"
        >

          <el-input
            v-model="postForm.phone"
            size="small"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item
          label="dept: "
          class="form-item"
        >
          <el-input
            v-model="postForm.dept"
            size="small"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item
          label="grade: "
          class="form-item"
        >
          <el-input
            v-model="postForm.grade"
            size="small"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item
          label="language: "
          class="form-item"
        >
          <template>
            <el-radio
              v-model="postForm.language"
              label="zh"
            >中文</el-radio>
            <el-radio
              v-model="postForm.language"
              label="en"
            >英文</el-radio>
          </template>
          <!-- <el-input
            v-model="postForm.language"
            class="edit-input"
          /> -->

        </el-form-item>

        <el-form-item
          label="role: "
          class="form-item"
        >
          <el-input
            v-model="postForm.role"
            size="small"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item
          label="preferTags: "
          class="form-item"
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
            size="mini"
            type="text"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
          >+ New Tag</el-button>

          <!-- <el-input
            v-model="postForm.preferTags"
            class="edit-input"
          /> -->

        </el-form-item>
        <el-form-item
          label="obtainedCredits: "
          prop="obtainedCredits"
          class="form-item"
        >
          <el-input
            v-model="postForm.obtainedCredits"
            class="edit-input"
            size="small"
          />

        </el-form-item>
        <el-form-item
          v-if="action !== 'register'"
          class="form-item"
          label="timestamp: "
        >
          <el-input
            v-model="postForm.timestamp"
            :disabled="action !== 'register'"
            size="small"
            class="edit-input"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="Submit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validEmail, validPhone } from '@/utils/validate.js'

export default {
  name: 'EditUser',
  props: {
    visiable: {
      type: Boolean,
      default: false
    },
    postForm: {
      type: Object,
      default() {
        return {
          uid: '',
          name: '',
          pwd: '',
          gender: '',
          email: '',
          phone: '',
          dept: '',
          grade: '',
          language: '',
          region: '',
          role: '',
          preferTags: '',
          obtainedCredits: '',
          timestamp: null
        }
      }
    },
    action: {
      type: String,
      default: 'register'
    },
    title: {
      type: String,
      default: '注册'
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
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        // this.$message({
        //   message: rule.field + '为必传项',
        //   type: 'error'
        // })
        callback(new Error(rule.field + '格式错误'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        // this.$message({
        //   message: rule.field + '为必传项',
        //   type: 'error'
        // })
        callback(new Error(rule.field + '格式错误'))
      } else {
        callback()
      }
    }
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      edit: false,
      rules: {
        // image_uri: [{ validator: validateRequire }],
        name: [{ validator: validateRequire, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'change' }],
        phone: [{ validator: validatePhone, trigger: 'change' }]
      }
    }
  },
  computed: {
    dialogFormVisible: {
      get() {
        return this.visiable
      },
      set(val) {
        this.$emit('update:visiable', val)
      }
    }
  },
  created() {
    // if (this.postForm && this.postForm.preferTags !== '') {
    this.dynamicTags =
      this.postForm.preferTags !== '' && this.postForm.preferTags.split(',')
    // }
  },
  methods: {
    Submit() {
      this.postForm.preferTags = this.dynamicTags.join(',')
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.$emit('submit', this.postForm)
          // this.dialogFormVisible = false
        }
        //  else {
        //   this.$message.error('请输入必填项')
        // }
      })
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

<style lang="scss">
.edit-input {
  width: 180px;
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
.form-item {
  margin-bottom: 15px;
}
.el-dialog {
  margin-top: 70px !important;
}
.el-dialog__body {
  padding: 20px 25px 0px !important;
}
</style>
