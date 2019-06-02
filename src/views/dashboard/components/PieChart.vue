<template>
  <div
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    title: {
      type: String,
      default: '比例'
    },
    data: {
      type: Array,
      default: function() {
        return [
          { name: 'Beijing', value: 50 },
          { name: 'Hong Kong', value: 50 }
        ]
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (this.chart) {
          this.chart.hideLoading()
          this.chart.setOption({
            series: [
              {
                name: this.title,
                data: this.data
              }
            ]
          })
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.showLoading()
      this.chart.setOption({
        title: {
          text: this.title,
          left: 'center'
          // top: 20
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Beijing', 'Hong Kong']
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '50%'],
            data: [],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
