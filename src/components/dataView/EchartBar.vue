<template lang="pug">
.echart-block(:id='id' :style="{width: '100%', height: `${config.height}px`}")
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: 'myCanvas'
    },
    config: {
      type: Object,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    initBarLine() {
      // Dom init
      const myChart = this.$echarts.init(document.getElementById(this.id))
      const option = {
        grid: {
          top: 20,
          bottom: 26,
          left: 44,
          right: 8
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#9AA6B8',
            interval: 0
          },
          axisLine: {
            lineStyle: {
              color: '#EAEBEE'
            }
          },
          data: this.data.map(item => {
            if (item && item[0]) {
              return item[0]
            } else {
              return ''
            }
          })
        },
        yAxis: {
          type: 'value',
          splitNumber: 3,
          offset: 6,
          splitLine: {
            lineStyle: {
              color: '#EAEBEE',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#9AA6B8'
          },
        },
        series: [{
          data: this.data.map(item => {
            if (item && item[1]) {
              return parseInt(item[1])
            } else {
              return ''
            }
          }),
          type: 'bar',
          label: {
            show: true,
            formatter: `{c}${this.config.seriesLabel || ''}`,
            position: 'top',
            color: '#9AA6B8'
          },
          barWidth: '16',
          itemStyle: {
            color: '#3C5DA4',
          }
        }]
      }
      myChart.setOption(option)
    }
  },
  created() {
  },
  mounted() {
    if (this.data.length !== 0) {
      this.initBarLine()
    }
  },
  watch: {
    data(val) {
      if (val.length !== 0) {
        this.initBarLine()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.echart-block
  margin 0 auto
</style>
