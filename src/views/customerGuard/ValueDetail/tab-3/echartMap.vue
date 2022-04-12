<template lang='pug'>
.p-module-content
  #chinaMapGeo(:style="{width: '100%', height: '100%'}" v-if='dataSource.length')
  Empty(v-else)
</template>

<script>
import Empty from '@/components/qjd/empty'
import { reactive, toRefs, watch } from '@vue/composition-api'
import * as echarts from 'echarts/core'
import useTimeout from 'hooks/useTimeout'
import '@/utils/china.js'
import { deepCopy } from '@/utils/qjd'

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    }
  },
  components: { Empty },
  setup (props) {
    // state
    const state = reactive({
      dataList: [{
        name: '南海诸岛',
        value: 0
      }],
      maxAmount: 0,
      myChart: null,
      mapOption: null
    })
    const { perTimeout } = useTimeout()
    // methods
    const initData = () => {
      const arr = props.dataSource.map(item => {
        state.dataList.push(item)
        return item.value
      })
      state.maxAmount = formatInt(Math.max(...arr), 1, true)
    }
    const initOption = () => {
      const mapOption = {
        visualMap: { // 地图图例
          type: 'continuous',
          show: true,
          left: 80,
          bottom: 60,
          showLabel: true,
          itemWidth: 12,
          itemHeight: 138,
          min: 0,
          max: state.maxAmount,
          // text: [state.maxAmount, 0],
          text: ['高', '低'],
          calculable: true,
          gird: {
            left: '10%'
          },
          inRange: {
            color: ['#E1EBF7', '#9ABBF0', '#5B81F0', '#4066DF', '#003DD8', '#05005D']
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            let place = ''
            let value = 0
            if (params.name === '南海诸岛') {
              place = '涉案地区分布'
              value = '南海诸岛：0家'
            } else {
              if (params.data) {
                place = '涉案地区分布'
                value = `${params.data.name}：${params.data.value}家`
              }
            }
            return `${place}<br />${value}`
          }
        },
        geo: { // 中国地图设置
          map: 'china',
          // roam: true,
          // scaleLimit: { // 缩放比例
          //   min: 0.5,
          //   max: 2
          // },
          zoom: 1.1,
          label: {
            opacity: 0,
            // show: false
          },
          itemStyle: {
            borderColor: '#406DBD'
          },
          emphasis: {
            itemStyle: {
              areaColor: '#3B68F0',
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
            data: null
          }
        ]
      }

      state.mapOption = deepCopy(mapOption)
      return state.mapOption
    }
    const formatInt = (num, prec = 2, ceil = true) => {
      const len = String(num).length
      if (len <= prec) { return num }
      const mult = Math.pow(10, prec)
      return ceil ? Math.ceil(num / mult) * mult : Math.floor(num / mult) * mult
    }
    const initGeo = () => {
      if (state.myChart !== null && state.myChart !== '' && state.myChart !== undefined) {
        state.myChart.dispose()
      }
      state.myChart = echarts.init(document.getElementById('chinaMapGeo'))
      const option = initOption()
      option.series[0].data = props.dataSource
      // console.log(props.dataSource)
      state.myChart.setOption(option)
    }

    // watch
    watch(() => props.dataSource, (val) => {
      if (val && val.length) {
        perTimeout(() => {
          initData()
          initGeo()
        })
      }
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.p-module-content
  width 100%
  height 100%
</style>
