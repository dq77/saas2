<template lang="pug">
  .p-bar-line(:style="{width: '100%', height: '100%'}")
    #businessOverviewBarLine(:style="{width: '100%', height: '100%'}")
</template>

<script>
// import 'zrender/lib/svg/svg' // svg渲染 需要微调option
export default {
  name: 'BusinessOverviewBarLine',
  data() {
    return {
      myChart: null,
      colors: ['#3C5DA4', '#25BECD', '#E29A27'],
      xAxis: [], // 横坐标
      data: [], // 纵坐标值
      tRate: [], // 同比
      hRate: [], // 环比
      legend: [],
      maxData: 0,
      maxRate: 0
    }
  },
  props: ['list', 'type', 'timeType'],
  methods: {
    initData() {
      this.xAxis = []
      this.data = []
      this.tRate = []
      this.hRate = []
      this.list.forEach(item => {
        this.xAxis.push(item.xAxis)
        this.data.push(item.amount)
        this.tRate.push(item.tRate || null)
        this.hRate.push(item.hRate || null)
      })
      this.maxData = parseInt((Math.max(...this.data) + 100) / 100) * 100
      this.maxRate = parseInt((Math.max(...this.hRate, ...this.tRate) + 100) / 100) * 100
      this.maxData = isNaN(this.maxData) ? 100 : this.maxData
      this.maxRate = isNaN(this.maxRate) ? 100 : this.maxRate
      if (this.type === 1) {
        switch (this.timeType) {
          case 1: this.legend = ['出货金额（万元）']; break
          case 2: this.legend = ['出货金额（万元）', '同比（%）', '环比（%）']; break
          case 3: this.legend = ['出货金额（万元）', '环比（%）']; break
        }
      } else if (this.type === 2) {
        switch (this.timeType) {
          case 1: this.legend = ['经销商数（个）']; break
          case 2: this.legend = ['经销商数（个）', '同比（%）', '环比（%）']; break
          case 3: this.legend = ['经销商数（个）', '环比（%）']; break
        }
      }
    },
    initBarLine() {
      // Dom init
      if (this.myChart !== null && this.myChart !== '' && this.myChart !== undefined) {
        this.myChart.dispose()
      }
      this.myChart = this.$echarts.init(document.getElementById('businessOverviewBarLine'), null, { renderer: 'svg' })
      const option = {
        color: this.colors,
        legend: {
          data: this.legend,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            color: '#738A9E'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(50,50,50,0.7)',
          textStyle: {
            color: '#fff',
            fontWeight: 'normal'
          }
        },
        grid: {
          left: 50,
          right: this.timeType === 1 ? 30 : 80,
          bottom: 50,
          x2: 50,
          y2: 25
        },
        xAxis: {
          name: '',
          type: 'category',
          data: this.xAxis,
          axisTick: false,
          axisLine: {
            lineStyle: {
              color: '#EAEBEE'
            }
          },
          axisLabel: {
            margin: 15,
            color: '#738A9E'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            name: this.type === 1 ? '单位：万元' : '单位：个',
            type: 'value',
            position: 'left',
            min: 0,
            max: this.maxData,
            splitNumber: 5,
            interval: Math.ceil(this.maxData / 5),
            nameGap: 40,
            nameTextStyle: {
              color: '#9AA6B8',
              // align: 'right'
            },
            axisLabel: {
              color: '#9AA6B8'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#EAEBEE'
              }
            }
          },
          {
            name: '单位：%',
            min: 0,
            max: this.maxRate,
            splitNumber: 5,
            interval: Math.ceil(this.maxRate / 5),
            show: this.timeType !== 1,
            type: 'value',
            position: 'right',
            nameGap: 40,
            nameTextStyle: {
              color: '#9AA6B8',
              // align: 'left'
            },
            axisLabel: {
              color: '#9AA6B8'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#EAEBEE'
              }
            }
          }
        ],
        series: [
          {
            name: this.type === 1 ? '出货金额（万元）' : '经销商数（个）',
            type: 'bar',
            barWidth: 16,
            itemStyle: {
              borderRadius: 2
            },
            data: this.data
          },
          {
            name: '同比（%）',
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            yAxisIndex: 1,
            data: this.tRate,
            lineStyle: {
              width: 3
            }
          },
          {
            name: '环比（%）',
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            yAxisIndex: 1,
            data: this.hRate,
            lineStyle: {
              width: 3
            }
          }
        ]
      }
      this.myChart.setOption(option)
    }
  },
  mounted() {
    this.initData()
    this.initBarLine()
  },
  watch: {
    list: {
      handler() {
        this.initData()
        this.initBarLine()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
