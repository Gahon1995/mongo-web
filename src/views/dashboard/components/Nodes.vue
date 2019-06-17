<template>
  <div>
    <el-card v-if="loading">
      <div
        align="center"
        style="margin-bottom:30px;font-size:20px;font-weight:600"
      >
        当前连接数：
        <a style="color: #f56c6c"> {{ data.connections_current }}</a>
      </div>
      <el-row v-if="data != [] && data.replica !== null">
        <div
          v-for="(item, index) in data.replica"
          :key="index"
          align="center"
        >
          <el-col
            v-if="item !== null"
            :span="24 / data.replica.length"
          >
            <svg-icon
              v-if="item.state === 1.0 || item.state === 2.0"
              icon-class="primary"
            />
            <svg-icon
              v-else
              icon-class="fail"
            />

            {{ item.name }}
          </el-col>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Nodes',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: function() {
        return {
          connections_current: 0,
          repl_role: 'other',
          uptime: '',
          replica: []
        }
      }
    }
  }
}
</script>
