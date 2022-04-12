<template lang="pug">
Chart(title='拿地TOP5' category='landTaken' :mode='mode' :formData='formData' @changeType='changeType' :loading='landTakenAmountLoading || landTakenAreaLoading' :options='chartOptions' :dataSource='dataSource')
</template>

<script>
import Chart from './chart'
import { formData, businessChartOptions, barOptions, chartFormart } from './config'
import { reactive, toRefs, watch } from '@vue/composition-api'
import { deepCopy } from '@/utils/qjd'
import useTimeout from 'hooks/useTimeout'
import useFollow from '../hooks/useFollow'
import useCharts from 'hooks/useCharts'
import useApis from './api'
import { getCompanyList, getYearList } from './utils'
export default {
  props: {
    mode: {
      type: String
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  components: { Chart },
  setup(props, { emit }) {
    const state = reactive({
      formData: deepCopy(formData),
      chartOptions: deepCopy(businessChartOptions),
      dataSource: []
    })

    const { perTimeout } = useTimeout()

    // 加载图表
    const initCharts = (xData, yData) => {
      if (xData.length && yData.length) {
        perTimeout(() => {
          setDataSource(yData)
          setxData(xData)
          setOption()
          chartInit()
        })
      } else {
        chartClear()
      }
    }

    // 格式化图表数据
    const formartChartData = (type, data) => {
      state.dataSource = data.slice(0, 5)
      const xData = []
      const yData = []
      state.dataSource.map((item, key) => {
        xData.push(item.comName)
        yData.push(item[chartFormart[type].yName])
      })
      initCharts(xData, yData)
    }

    const {
      followCompanyList,
      getFollowCompanyList
    } = useFollow()

    const {
      getAcquireLandAmount,
      getAcquireLandArea,
      landTakenAmountLoading,
      landTakenAreaLoading,
    } = useApis({
      formartChartData,
    })

    const changeType = async () => {
      await getFollowCompanyList({cache: true})
      const { landTakenTime: time, landTaken: type } = state.formData
      if (props.mode === 'follow' && !followCompanyList.value.length) {
        formartChartData(type, [])
        return
      }
      switch (type) {
        case 'landTakenAmount':
          getAcquireLandAmount({
            yearList: getYearList(time),
            companyList: getCompanyList(followCompanyList.value, props.mode)
          })
          break
        case 'landTakenArea':
          getAcquireLandArea({
            yearList: getYearList(time),
            companyList: getCompanyList(followCompanyList.value, props.mode)
          })
          break
      }
    }

    const {
      chartInit,
      setDataSource,
      setxData,
      setOption,
      chartClear
    } = useCharts({
      option: barOptions,
      id: 'landTakenCharts',
      isInit: false
    })

    watch(
      () => props.refresh,
      (value) => {
        changeType()
      }
    )

    return {
      changeType,
      landTakenAmountLoading,
      landTakenAreaLoading,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
