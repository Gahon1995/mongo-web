<template>
  <div
    class="app-container"
    align="center"
  >
    <el-tabs
      v-model="listQuery.dbms"
      :stretch="true"
      style="margin-bottom: 20px"
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
        width="80"
      >
        <template slot-scope="scope">
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
</template>

<script>
import { getUsers, deleteUser } from '@/api/admin.js'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
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
      total: 0,
      activeName: 'Beijing',
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        dbms: 'Beijing'
      }
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    handleClick(tab, event) {
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
