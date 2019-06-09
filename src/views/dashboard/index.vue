<template>
  <div class="dashboard-editor-container">
    <div align="center">
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
    </div>

    <panel-group :nums="nums" />

    <el-row :gutter="32">
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <pie-chart
            :data="charts.users"
            title="各地区用户比例"
          />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <pie-chart
            :data="charts.articles"
            title="各地区文章比例"
          />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <pie-chart
            :data="charts.reads"
            title="各地区阅读量比例"
          />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-card>
        <div>在线节点数量: <p>{{ nodes.length }}</p>
        </div>
        <div>{{ nodes }}</div>
      </el-card>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import PieChart from './components/PieChart'
import { getInfos } from '@/api/dashboard.js'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    PieChart
  },

  data() {
    return {
      total: 0,
      nums: {
        users: 100000,
        articles: 123123,
        reads: 62362,
        populars: 73225
      },
      charts: {},
      nodes: [],
      listLoading: true,
      listQuery: {
        dbms: 'Beijing'
      }
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  created() {
    this.fetchInfos()
  },

  methods: {
    handleClick() {
      this.fetchInfos()
    },
    fetchInfos() {
      this.listLoading = true
      getInfos(this.listQuery).then(response => {
        this.nums = response.data.nums
        this.charts = response.data.charts
        this.nodes = response.data.nodes
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  height: 100%;
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
