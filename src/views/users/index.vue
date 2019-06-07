<template>
  <div>
    <div
      class="app-container"
      align="center"
    >
      <el-tabs
        v-model="listQuery.dbms"
        :stretch="true"
        style="margin-bottom: 20px; width: 50%; align=center"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="Beijing"
          name="Beijing"
        />
        <el-tab-pane
          label="Hong Kong"
          name="Hong Kong"
        />
      </el-tabs>

      <section id="search-title">
        <el-form
          :inline="true"
          :model="listQuery"
          class="demo-form-inline"
        >
          <el-form-item label="用户名:">
            <el-input
              v-model="listQuery.name"
              type="text"
              style="width:150px"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item label="性别:">
            <el-select
              v-model="listQuery.gender"
              placeholder="性别"
              style="width:100px"
            >
              <el-option
                label="全部"
                :value="null"
              />
              <el-option
                label="男"
                value="male"
              />
              <el-option
                label="女"
                value="female"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            id="submit-item"
            style="margin-left:20px"
          >
            <el-button
              type="primary"
              @click="onSearchSubmit"
            >查询</el-button>
          </el-form-item>
          <el-form-item
            id="clear-item"
            class="fr"
          >
            <el-button
              type="warning"
              @click="resetSearch"
            >重置</el-button>
          </el-form-item>
          <el-form-item
            id="addNew-item"
            class="fr"
          >
            <el-button
              type="primary"
              @click="addNewHandler"
            >新增</el-button>
          </el-form-item>
        </el-form>
      </section>

      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        stripe
        highlight-current-row
      >
        <el-table-column
          type="index"
          width="50"
        />
        <!-- <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">{{ scope.row.uid }}</template>
      </el-table-column> -->
        <el-table-column
          label="姓名"
          width="110"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          label="性别"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <a v-if="scope.row.gender === 'male'">男</a>
            <a v-else>女</a>
          </template>
        </el-table-column>
        <el-table-column
          label="电话"
          width="200"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column
          label="邮件"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column
          label="dept"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.dept }}</template>
        </el-table-column>
        <el-table-column
          label="grade"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.grade }}</template>
        </el-table-column>
        <el-table-column
          label="语言"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.language }}</template>
        </el-table-column>
        <el-table-column
          label="region"
          align="center"
          width="100px"
        >
          <template slot-scope="scope">{{ scope.row.region }}</template>
        </el-table-column>
        <el-table-column
          label="role"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.role }}</template>
        </el-table-column>
        <el-table-column
          label="Tags"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.preferTags }}</template>
        </el-table-column>
        <el-table-column
          label="Credits"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.obtainedCredits }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created_at"
          width="200"
          label="注册时间"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.timestamp }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="160"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total / listQuery.size > 1"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.size"
        @pagination="fetchUsers"
      />

    </div>
    <edit-user
      :visiable.sync="dialogVisiable"
      :post-form="dialogUser"
      :action="dialogAction"
      :title="dialogTitle"
      @submit="HandleSubmit"
    />
  </div>
</template>

<script>
import { getUsers, deleteUser } from '@/api/admin.js'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import EditUser from './components/EditUser'

export default {
  components: { Pagination, EditUser },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      dialogAction: 'edit',
      dialogVisiable: false,
      dialogUser: null,
      dialogTitle: '',
      total: 0,
      activeName: 'Beijing',
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        dbms: 'Beijing',
        name: null,
        gender: null
      }
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    HandleSubmit(info) {
      console.log(this.dialogUser)
      for (const v of this.list) {
        if (v.uid === info.uid) {
          const index = this.list.indexOf(v)
          this.list.splice(index, 1, info)
          break
        }
      }
    },
    resetSearch() {
      this.listQuery.name = null
      this.listQuery.gender = null
      this.listQuery.page = 1
      this.fetchUsers()
    },
    addNewHandler() {
      var info = {
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
      this.dialogUser = info
      this.dialogTitle = '添加新用户'
      this.dialogAction = 'register'
      this.dialogVisiable = true
    },
    onSearchSubmit() {
      for (var prop in this.listQuery) {
        if (this.listQuery[prop] === '') {
          this.listQuery[prop] = null
        }
      }
      this.listQuery.page = 1
      this.fetchUsers()
    },
    handleClick(tab, event) {
      this.listQuery.page = 1
      this.fetchUsers()
      // console.log(tab.name)
      // console.log(tab, event)
    },
    fetchUsers() {
      this.listLoading = true
      getUsers(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleEdit(row) {
      this.dialogUser = Object.assign({}, row)
      // console.log(this.dialogUser)
      this.dialogAction = 'edit'
      this.dialogTitle = '编辑用户信息'
      this.dialogVisiable = true
    },
    handleDelete(row) {
      this.$confirm('确定删除该需求?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          deleteUser(row.uid)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 1000
              })
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
            })
            .catch(() => {
              this.formVisible = false
              // this.$notify({
              //   title: '失败',
              //   message: '删除数据失败，请检查后台状态',
              //   type: 'error',
              //   duration: 2000
              // })
            })
        })
        .catch(() => {})
    }
  }
}
</script>
