<template>
  <div>
    <!-- <el-card class="box-card info">
      <div class="form-item">
        <a class="label">姓名:</a>
        <a class="info">{{ user.name }}</a>
      </div>
      <div class="form-item">
        <a class="label">性别:</a>
        <a class="info">{{ user.gender }}</a>
      </div>
      <div class="form-item">
        <a class="label">邮箱:</a>
        <a class="info">{{ user.email }}</a>
      </div>
      <div class="form-item">
        <a class="label">电话:</a>
        <a class="info">{{ user.phone }}</a>
      </div>
      <div class="form-item">
        <a class="label">dept:</a>
        <a class="info">{{ user.dept }}</a>
      </div>
      <div class="form-item">
        <a class="label">grade:</a>
        <a class="info">{{ user.grade }}</a>
      </div>
      <div class="form-item">
        <a class="label">language:</a>
        <a class="info">{{ user.language }}</a>
      </div>
      <div class="form-item">
        <a class="label">region:</a>
        <a class="info">{{ user.region }}</a>
      </div>
      <div class="form-item">
        <a class="label">role:</a>
        <a class="info">{{ user.role }}</a>
      </div>
      <div class="form-item">
        <a class="label">preferTags:</a>
        <a class="info">{{ user.preferTags }}</a>
      </div>
      <div class="form-item">
        <a class="label">obtainedCredits:</a>
        <a class="info">{{ user.obtainedCredits }}</a>
      </div>
      <div class="form-item">
        <a class="label">timestamp:</a>
        <a class="info">{{ user.timestamp }}</a>
      </div>
    </el-card> -->

    <el-card class="box-card">
      <div align="right">
        <template v-if="!edit">
          <el-button
            type="primary"
            round
            @click="EditInfo"
          >
            修改个人信息
          </el-button>
        </template>
        <span v-else>
          <el-button
            type="danger"
            round
            @click="cancel"
          >
            取消
          </el-button>
          <el-button
            type="success"
            round
            @click="updateInfo"
          >
            更新信息
          </el-button>
        </span>
      </div>

      <el-form
        ref="form"
        :model="postForm"
        label-width="200px"
      >

        <el-form-item
          min-width="300px"
          label="用户名: "
        >
          <span class="label">
            {{ postForm.name }}
          </span>
        </el-form-item>

        <el-divider />
        <el-form-item
          min-width="300px"
          label="密码: "
        >
          <template v-if="edit">
            <el-input
              v-model="postForm.pwd"
              class="edit-input"
            />
          </template>
          <span
            v-else
            class="label"
          >
            {{ postForm.pwd }}
          </span>
        </el-form-item>
        <el-divider />
        <el-form-item
          min-width="300px"
          label="性别: "
        >
          <template v-if="edit">
            <el-input
              v-model="postForm.gender"
              class="edit-input"
            />
          </template>
          <span
            v-else
            class="label"
          >
            {{ postForm.gender }}
          </span>
        </el-form-item>
        <el-divider />
        <el-form-item
          min-width="300px"
          label="邮箱: "
        >
          <template v-if="edit">
            <el-input
              v-model="postForm.email"
              class="edit-input"
            />
          </template>
          <span
            v-else
            class="label"
          >
            {{ postForm.email }}
          </span>
        </el-form-item>
        <el-divider />
        <el-form-item
          min-width="300px"
          label="电话: "
        >
          <template v-if="edit">
            <el-input
              v-model="postForm.phone"
              class="edit-input"
            />
          </template>
          <span
            v-else
            class="label"
          >
            {{ postForm.phone }}
          </span>
        </el-form-item>
        <el-divider />
        <el-form-item
          min-width="300px"
          label="dept: "
        >
          <template v-if="edit">
            <el-input
              v-model="postForm.dept"
              class="edit-input"
            />
          </template>
          <span
            v-else
            class="label"
          >
            {{ postForm.dept }}
          </span>
        </el-form-item>
        <el-divider />
        <el-form-item
          min-width="300px"
          label="grade: "
        >
          <template v-if="edit">
            <el-input
              v-model="postForm.grade"
              class="edit-input"
            />
          </template>
          <span
            v-else
            class="label"
          >
            {{ postForm.grade }}
          </span>
        </el-form-item>
        <el-divider />
        <el-form-item
          min-width="300px"
          label="language: "
        >
          <template v-if="edit">
            <el-input
              v-model="postForm.language"
              class="edit-input"
            />
          </template>
          <span
            v-else
            class="label"
          >
            {{ postForm.language }}
          </span>
        </el-form-item>
        <el-divider />
        <el-form-item
          min-width="300px"
          label="region: "
        >
          <!-- <template v-if="edit">
            <el-input
              v-model="postForm.region"
              class="edit-input"
              size="small"
            />
          </template> -->
          <span class="label">
            {{ postForm.region }}
          </span>
        </el-form-item>
        <el-divider />
        <el-form-item
          min-width="300px"
          label="role: "
        >
          <template v-if="edit">
            <el-input
              v-model="postForm.role"
              class="edit-input"
            />
          </template>
          <span
            v-else
            class="label"
          >
            {{ postForm.role }}
          </span>
        </el-form-item>
        <el-divider />
        <el-form-item
          min-width="300px"
          label="preferTags: "
        >
          <template v-if="edit">
            <el-input
              v-model="postForm.preferTags"
              class="edit-input"
            />
          </template>
          <span
            v-else
            class="label"
          >
            {{ postForm.preferTags }}
          </span>
        </el-form-item>
        <el-divider />
        <el-form-item
          min-width="300px"
          label="obtainedCredits: "
        >
          <template v-if="edit">
            <el-input
              v-model="postForm.obtainedCredits"
              class="edit-input"
            />
          </template>
          <span
            v-else
            class="label"
          >
            {{ postForm.obtainedCredits }}
          </span>
        </el-form-item>
        <el-divider />
        <el-form-item
          min-width="300px"
          label="timestamp: "
        >
          <span class="label">
            {{ postForm.timestamp }}
          </span>
        </el-form-item>
        <el-divider />
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// const postForm = {
//   name: null,
//   pwd: null,
//   gender: null,
//   email: null,
//   phone: null,
//   dept: null,
//   grade: null,
//   language: null,
//   region: null,
//   role: null,
//   preferTags: null,
//   obtainedCredits: null,
//   timestamp: null
// }

export default {
  name: 'MyInfo',
  data() {
    return {
      edit: false,
      postForm: {
        name: null,
        pwd: null,
        gender: null,
        email: null,
        phone: null,
        dept: null,
        grade: null,
        language: null,
        region: null,
        role: null,
        preferTags: null,
        obtainedCredits: null,
        timestamp: null
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    EditInfo() {
      this.edit = true
    },
    cancel() {
      this.edit = false
      this.getUserInfo()
    },
    updateInfo() {
      this.edit = false
      delete this.postForm['timestamp']
      delete this.postForm['name']
      console.log(this.postForm)
    },
    getUserInfo() {
      this.postForm.uid = this.user.uid
      this.postForm.name = this.user.name
      this.postForm.pwd = this.user.pwd
      this.postForm.gender = this.user.gender
      this.postForm.email = this.user.email
      this.postForm.phone = this.user.phone
      this.postForm.dept = this.user.dept
      this.postForm.grade = this.user.grade
      this.postForm.language = this.user.language
      this.postForm.region = this.user.region
      this.postForm.role = this.user.role
      this.postForm.preferTags = this.user.preferTags
      this.postForm.obtainedCredits = this.user.obtainedCredits
      this.postForm.timestamp = this.user.timestamp
    }
  }
}
</script>

<style lang="scss">
.info {
  .form-item {
    font-size: 20px;
    margin: 10px;
    .label {
      font-weight: 600;
      width: 250px;
    }
  }
}
.box-card {
  margin: 0px auto;

  max-width: 600px;
}
.el-form-item__content {
  font-size: 20px;
  padding-left: 30px;
}
.el-form-item__label {
  font-size: 20px;
}

.edit-input {
  font-size: 20px;
  width: 200px;
}
.label {
  padding: 0px 15px;
}

.el-form-item {
  margin-bottom: 0px;
}
.el-divider--horizontal {
  width: 80%;
  margin: 10px auto;
}
</style>
