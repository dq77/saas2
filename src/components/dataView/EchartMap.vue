<template lang='pug'>
  .p-bar-line(:style="{width: '100%', height: '100%'}")
    #chinaMapGeo(:style="{width: '100%', height: '100%'}")
</template>

<script>
import '@/utils/china.js'
import { toAmountStr } from '@/utils/util'
export default {
  name: 'chinaMapGeo',
  data () {
    return {
      dataList: [{
        name: '南海诸岛',
        value: 0
      }],
      maxAmount: 0,
      myChart: null
    }
  },
  props: ['data', 'type', 'tooltip'],
  components: {},
  mounted () {
    if (this.data.length !== 0) {
      this.initData()
      this.initGeo()
    }
  },
  methods: {
    initData() {
      const arr = this.data.map(item => {
        this.dataList.push(item)
        return item.value
      })
      this.maxAmount = this.formatInt(Math.max(...arr), 2, true)
    },
    formatInt(num, prec = 2, ceil = true) {
      const len = String(num).length
      if (len <= prec) { return num };
      const mult = Math.pow(10, prec)
      return ceil ? Math.ceil(num / mult) * mult : Math.floor(num / mult) * mult
    },
    initGeo() {
      if (this.myChart !== null && this.myChart !== '' && this.myChart !== undefined) {
        this.myChart.dispose()
      }
      this.myChart = this.$echarts.init(document.getElementById('chinaMapGeo'))
      this.data.forEach(item => {
        delete item.code
      })
      const option = {
        visualMap: { // 地图图例
          type: 'continuous',
          show: true,
          left: 15,
          bottom: 15,
          showLabel: true,
          itemWidth: 8,
          itemHeight: 60,
          min: 0,
          max: this.maxAmount || this.maxAmount + 1,
          text: [this.maxAmount, 0],
          inRange: {
            color: ['#E1EBF7', '#5792D7', '#406DBD', '#2E4CA5', '#1E339E', '#0A003C']
          }
        },
        tooltip: {
          trigger: 'item',
          className: 'echarts-tooltip-point',
          formatter: (params) => {
            return this.getToolip(params)
          }
        },
        geo: { // 中国地图设置
          map: 'china',
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1,
          // top: 0,
          left: 0,
          right: 0,
          label: {
            opacity: 0,
            // show: false
          },
          itemStyle: {
            borderColor: '#6B9DE6'
          },
          emphasis: {
            itemStyle: {
              areaColor: '#3c5da4',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: '省份',
            type: 'map',
            geoIndex: 0,
            selectedMode: false,
            data: this.data
          }
        ]
      }
      this.myChart.setOption(option)
    },
    getToolip(params) {
      if (this.tooltip && this.tooltip === 'quota') {
        return `
          <div class="quotabox">
            <div class="info-box">
              <div class="icon" style="background-color:${params.color}"></div>
              <div class="text">${params.data ? params.data.name : ''}</div>
            </div>
            <div>生效中额度：</div>
            <div class="num">${params.data ? toAmountStr(params.data.value, 2, true, true) + '万元' : ''}</div>
          </div>
        `
      } else if (this.tooltip && this.tooltip === 'risk') {
        let place = ''
        let value = 0
        if (params.name === '南海诸岛') {
          place = '地点：南海诸岛'
          value = this.type === '1' ? '经销商数量：0' : '案件数量：0'
        } else {
          if (params.data) {
            place = `地点：${params.data.name}`
            value = this.type === '1' ? `经销商数量：${params.data.value}` : `案件数量：${params.data.value}`
          }
        }
        return `${place}<br />${value}`
      }
    }
  },
  watch: {
    data(val) {
      if (val.length !== 0) {
        this.initData()
        this.initGeo()
      }
    }
    // data: {
    //   handler(newVal) {

    //     if (newVal) {
    //       this.initData()
    //       this.initGeo()
    //     }
    //   },
    //   deep: true
    // }
  }
}
</script>

<style lang='stylus' scoped>
>>>.echarts-tooltip-point
  .quotabox
    font-size 12px
    line-height 16px
    .info-box
      line-height 12px
      display flex
      justify-content space-between
      margin-right 6px
      .icon
        height 12px
        width 12px
        margin-right 4px
    .num
      font-weight bold
</style>
