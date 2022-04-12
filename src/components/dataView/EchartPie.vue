<template lang="pug">
  .pie-area(:style='{width: "100%", height: "100%"}')
    .pie-root(:id='id' :style='{width: "100%", height: "100%"}')
    .text {{ title }}
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
    },
    title: {
      type: String,
      required: false
    },
    color: {
      type: Array,
      default: () => ['#3C5DA4', '#25BECD', '#376BD7', '#56E5DA', '#5480DE', '#C2F1D8', '#82A7F3']
    }
  },
  data() {
    return {

    }
  },
  methods: {
    initPie() {
      // Dom init
      const myChart = this.$echarts.init(document.getElementById(this.id))
      const option = {
        name: 'ceserf',
        color: this.color,
        tooltip: {
          show: true,
          trigger: 'item',
          className: 'echarts-tooltip-point',
          formatter: function (params) {
            return `
              <div class="toolbox">
                <div class="left-box">
                  <div class="icon" style="background-color:${params.color}"></div>
                  <div class="text">${params.data.name}</div>
                </div>
                <div class="num">${params.data.value}</div>
              </div>
            `
          },
          position: function (point, params, dom, rect, size) {
            return [point[0] + 10, point[1] + 10]
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['68%', '90%'],
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: false
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2
            },
            labelLine: {
              show: false
            },
            data: this.data
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  created() {
  },
  mounted() {
    if (this.data.length !== 0) {
      this.initPie()
    }
  },
  watch: {
    data(val) {
      if (val.length !== 0) {
        this.initPie()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.pie-area
  position relative
  display flex
  justify-content center
  align-items center
  .pie-root
    position absolute
    top 0
    left 0
    >>>.echarts-tooltip-point
      .toolbox
        font-size 12px
        line-height 12px
        display flex
        justify-content space-between
        .left-box
          display flex
          margin-right 6px
          .icon
            height 12px
            width 12px
            margin-right 4px
        .num
          font-weight bold
  .text
    width 50px
    padding-top 2px
    text-align center
    color #494949
</style>
