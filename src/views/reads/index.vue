<template>
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
        <el-form-item label="uid:">
          <el-input
            v-model="listQuery.uid"
            type="text"
            style="width:150px"
            placeholder="请输入uid"
          />
        </el-form-item>
        <el-form-item label="aid:">
          <el-input
            v-model="listQuery.aid"
            type="text"
            style="width:150px"
            placeholder="请输入aid"
          />
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
      style="width: 100%"
      stripe
      highlight-current-row
    >
      <el-table-column
        type="index"
        width="50"
      />
      <!-- <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">{{ scope.row.uid }}</template>
      </el-table-column>-->
      <el-table-column
        label="uid"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.uid }}</template>
      </el-table-column>
      <el-table-column
        label="aid"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.aid }}</template>
      </el-table-column>
      <el-table-column
        label="readOrNot"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.readOrNot }}</template>
      </el-table-column>
      <el-table-column
        label="readTimeLength"
        align="center"
      >
        <template slot-scope="scope"> {{ scope.row.readTimeLength }} </template>
      </el-table-column>
      <el-table-column
        label="readSequence"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.readSequence }}</template>
      </el-table-column>
      <el-table-column
        label="agreeOrNot"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.agreeOrNot }}</template>
      </el-table-column>
      <el-table-column
        label="commentOrNot"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.commentOrNot }}</template>
      </el-table-column>
      <el-table-column
        label="shareOrNot"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.shareOrNot }}</template>
      </el-table-column>
      <el-table-column
        label="commentDetail"
        align="center"
        width="150px"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">{{ scope.row.commentDetail }}</template>
        <!-- <template slot-scope="scope">
          <el-popover
            placement="top"
            width="300"
            trigger="hover"
          >
            <div>{{ scope.row.commentDetail }}</div>
            <el-button slot="reference">点击查看</el-button>
          </el-popover>
        </template> -->
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="注册时间"
        width="200px"
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
import { getReads, deleteRead } from '@/api/reads.js'
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
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        dbms: 'Beijing',
        uid: null,
        aid: null
      }
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    resetSearch() {
      this.listQuery.page = 1
      this.listQuery.uid = null
      this.listQuery.aid = null
      this.fetchUsers()
    },
    addNewHandler() {},
    onSearchSubmit() {
      this.listQuery.page = 1
      for (var prop in this.listQuery) {
        if (this.listQuery[prop] === '') {
          this.listQuery[prop] = null
        }
      }
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
      getReads(this.listQuery).then(response => {
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
          deleteRead(row.rid)
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
