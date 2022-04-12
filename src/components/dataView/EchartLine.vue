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
    getYear() {
      const date = new Date()
      return date.getYear()
    },
    initLine() {
      const myChart = this.$echarts.init(document.getElementById(this.id))
      const option = {
        grid: {
          top: 20,
          bottom: 26,
          left: 44,
          right: 20
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: function (params) {
            const date = new Date()
            const year = date.getFullYear()
            return `
              <div class="toolbox">
                <div class="num">月份:  ${year}-${params.name}</div>
                <div class="num">数量:  ${params.data}</div>
              </div>
            `
          },
        },
        xAxis: {
          // type: 'category',
          data: this.data.map(item => {
            return item[0] ?? ''
          }),
          axisTick: { // x轴刻度线
            show: false
          },
          // boundaryGap: false
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#eaebee'
            }
          },
          minInterval: 1
        },
        series: [{
          type: 'line',
          data: this.data.map(item => {
            return item[1] ?? ''
          }),
          smooth: 0.3,
          areaStyle: {
            color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, // 变化度
              [
                {
                  offset: 0,
                  color: '#3B68EF'
                }, {
                  offset: 1,
                  color: 'rgba(59, 104, 239, 0)'
                }
              ]
            ),
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
      this.initLine()
    }
  },
  watch: {
    data(val) {
      if (val.length !== 0) {
        this.initLine()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.echart-block
  margin 0 auto
</style>
