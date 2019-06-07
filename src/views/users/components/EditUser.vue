<template>
  <div
    v-if="postForm != null"
    class="edit-user"
  >
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="form"
        :model="postForm"
        label-width="130px"
      >

        <el-form-item label="用户名: ">
          <div v-if="action === 'register'">
            <el-input
              v-model="postForm.name"
              class="edit-input"
            />
          </div>
          <span
            v-else
            class="label"
          >
            {{ postForm.name }}
          </span>
        </el-form-item>

        <el-form-item label="密码: ">
          <el-input
            v-model="postForm.pwd"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item label="性别: ">

          <el-input
            v-model="postForm.gender"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item label="邮箱: ">

          <el-input
            v-model="postForm.email"
            class="edit-input"
          />

        </el-form-item>

        <el-form-item label="电话: ">

          <el-input
            v-model="postForm.phone"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item label="dept: ">
          <el-input
            v-model="postForm.dept"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item label="grade: ">
          <el-input
            v-model="postForm.grade"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item label="language: ">
          <el-input
            v-model="postForm.language"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item label="region: ">
          <template v-if="action === 'register'">
            <el-input
              v-model="postForm.region"
              class="edit-input"
              size="small"
            />
          </template>
          <span
            v-else
            class="label"
          >
            {{ postForm.region }}
          </span>
        </el-form-item>
        <el-form-item label="role: ">
          <el-input
            v-model="postForm.role"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item label="preferTags: ">
          <el-input
            v-model="postForm.preferTags"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item label="obtainedCredits: ">
          <el-input
            v-model="postForm.obtainedCredits"
            class="edit-input"
          />

        </el-form-item>
        <el-form-item
          v-if="action !== 'register'"
          label="timestamp: "
        >
          <span class="label">
            {{ postForm.timestamp }}
          </span>
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
  <!-- <div v-else>
    <el-alert
      title="传入数据错误"
      type="error"
      description="编辑所需要的数据不能为空"
      show-icon
    />
  </div> -->
</template>

<script>
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
    return {
      edit: false
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
  methods: {
    Submit() {
      this.dialogFormVisible = false
      this.$emit('submit', this.postForm)
    }
  }
}
</script>

<style lang="scss">
.edit-input {
  width: 180px;
}
</style>
