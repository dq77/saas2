<template lang='pug'>
  .p-bar-line(:style="{width: '100%', height: '100%'}")
    #chinaMapGeo(:style="{width: '100%', height: '100%'}")
</template>

<script>
import '@/utils/china.js'
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
  props: ['data', 'type'],
  components: {},
  mounted () {},
  methods: {
    initData() {
      const arr = this.data.map(item => {
        this.dataList.push(item)
        return item.value
      })
      this.maxAmount = this.formatInt(Math.max(...arr), 1, true)
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
      const option = {
        visualMap: { // 地图图例
          type: 'continuous',
          show: true,
          left: 15,
          bottom: 25,
          showLabel: true,
          itemWidth: 8,
          itemHeight: 60,
          min: 0,
          max: this.maxAmount > 6 ? this.maxAmount : 6,
          text: [this.maxAmount > 6 ? this.maxAmount : 6, 0],
          inRange: {
            color: ['#E1EBF7', '#5792D7', '#406DBD', '#2E4CA5', '#1E339E', '#0A003C']
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            let place = ''
            let value = 0
            if (params.name === '南海诸岛') {
              place = '地点：南海诸岛'
              value = this.type === '1' ? '出货经销商：0家' : '出货金额：0万元'
            } else {
              if (params.data) {
                place = `地点：${params.data.name}`
                value = this.type === '1' ? `出货经销商：${params.data.value}家` : `出货金额：${params.data.value}万元`
              }
            }
            return `${place}<br />${value}`
          }
        },
        geo: { // 中国地图设置
          map: 'china',
          roam: true,
          // scaleLimit: { // 缩放比例
          //   min: 0.5,
          //   max: 2
          // },
          zoom: 1,
          label: {
            opacity: 0,
            // show: false
          },
          itemStyle: {
            borderColor: '#406DBD'
          },
          emphasis: {
            itemStyle: {
              areaColor: '#3C5DA4',
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
    }
  },
  watch: {
    data: {
      handler(newVal) {
        if (newVal) {
          this.initData()
          this.initGeo()
        }
      },
      deep: true
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
