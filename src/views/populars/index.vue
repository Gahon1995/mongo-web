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
    <!-- <el-tabs
      v-model="listQuery.level"
      :stretch="true"
      style="margin-bottom: 20px"
      @tab-click="handleLevelClick"
    >
      <el-tab-pane
        label="daily"
        name="daily"
      />
      <el-tab-pane
        label="weekly"
        name="weekly"
      />
      <el-tab-pane
        label="monthly"
        name="monthly"
      />
    </el-tabs> -->

    <section id="search-title">
      <el-form
        :inline="true"
        :model="listQuery"
        class="demo-form-inline"
      >
        <el-form-item label="level:">
          <el-select
            v-model="listQuery.level"
            placeholder="级别"
            style="width:100px"
          >
            <el-option
              label="daily"
              value="daily"
            />
            <el-option
              label="weekly"
              value="weekly"
            />
            <el-option
              label="monthly"
              value="monthly"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="date:">
          <el-date-picker
            v-model="listQuery.timestamp"
            type="date"
            value-format="timestamp"
            placeholder="选择日期"
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
          >
            <div v-if="listQuery.timestamp != null">生成所选日期热门</div>
            <div v-else>生成今日热门文章</div>
          </el-button>
        </el-form-item>
      </el-form>
    </section>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      style="100%"
      highlight-current-row
      @sort-change="sortChange"
    >
      <el-table-column
        type="index"
        width="50"
      />
      <!-- <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">{{ scope.row.uid }}</template>
      </el-table-column> -->
      <el-table-column
        label="level"
        width="100px"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.temporalGranularity }}</template>
      </el-table-column>

      <el-table-column
        label="articleAids"
        align="center"
        min-width="500px"
        fit
      >
        <template slot-scope="scope">{{ scope.row.articleAidDict }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        width="200"
        label="更新时间"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="timestamp"
        width="120"
        sortable="custom"
        label="timestamp"
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
      @pagination="fetchPopulars"
    />
  </div>
</template>

<script>
import { getPopulars, deletePopular, updatePopulars } from '@/api/populars.js'
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
      // activeName: 'Beijing',
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        dbms: 'Beijing',
        sort_by: 'timestamp',
        level: 'daily',
        timestamp: null
      }
    }
  },
  created() {
    this.fetchPopulars()
  },
  methods: {
    resetSearch() {
      this.listQuery.level = 'daily'
      this.listQuery.timestamp = null
      this.fetchPopulars()
    },
    addNewHandler() {
      var _t = this.listQuery.timestamp
      var data = {}
      if (_t != null) {
        data['timestamp'] = _t
      }
      updatePopulars(data).then(response => {
        if (response.code === 200) {
          this.$message({
            message: '热门文章更新成功',
            type: 'success'
          })
          this.fetchPopulars()
        } else {
          // this.$message({
          //   message: response.data.message,
          //   type: 'error'
          // })
        }
      })
    },
    onSearchSubmit() {
      for (var prop in this.listQuery) {
        if (this.listQuery[prop] === '') {
          this.listQuery[prop] = null
        }
      }
      this.fetchPopulars()
    },
    handleClick(tab, event) {
      this.fetchPopulars()
      // console.log(tab.name)
      // console.log(tab, event)
    },
    // handleLevelClick(tab, event) {
    //   this.fetchPopulars()
    //   // console.log(tab.name)
    //   // console.log(tab, event)
    // },
    sortChange(column) {
      // console.log(column.prop)
      this.listQuery.sort_by = column.prop
      if (column.order === 'descending') {
        this.listQuery.sort_by = '-' + column.prop
      }
      // this.listQuery.sort_by = order
      // console.log(this.listQuery)
      this.fetchPopulars()
    },
    fetchPopulars() {
      this.listLoading = true
      getPopulars(this.listQuery).then(response => {
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
          deletePopular(row.id)
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
