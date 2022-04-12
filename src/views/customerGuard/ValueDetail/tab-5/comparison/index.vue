<template lang="pug">
.comparison
  //- 行业概览
  Overview.comparison-space(
    :reportDate='reportDate'
    :industry='industry'
    :avgData='avgData'
    @parentCurrentItem='currentItemHandle'
    v-loading='loading'
  )
  //- 行业排名趋势
  RankIndustry.comparison-space(:industry='industry')
  //- 指标排名
  RankIndicators.comparison-space(
    :reportDate='reportDate'
    :industry='industry'
    :avgDataDoResult='avgDataDoResult'
  )
</template>

<script>
import Overview from './overview'
import RankIndustry from './rankIndustry'
import RankIndicators from './rankIndicators'
import useBaseApi from '../hooks/useBaseApi'
import { reactive, toRefs, watch } from '@vue/composition-api'

export default {
  props: {
    industry: String
  },
  components: {
    Overview,
    RankIndustry,
    RankIndicators
  },
  setup (props, {root}) {
    const state = reactive({
      reportDate: [],
      currentItem: '',
      avgData: {},
      loading: false
    })
    const { reportDateApi, avgDataApi } = useBaseApi(root)
    const { doResult: reportDateDoResult } = reportDateApi.value ?? {}
    const { doResult: avgDataDoResult } = avgDataApi.value ?? {}

    // 当前切换报告期
    const currentItemHandle = (current) => { state.currentItem = current }
    const initAvgData = async (params) => {
      state.loading = true
      const { code, data } = await avgDataDoResult(params)
      state.loading = false
      if (code !== '0') return
      state.avgData = data?.[0] || {}
    }

    watch(() => state.currentItem, (reportDate) => {
      reportDate && initAvgData({ reportDate, industry: props.industry })
    })
    watch(() => props.industry, async (val) => {
      if (!val) return
      const { code, data } = await reportDateDoResult()
      if (code !== '0') return
      state.reportDate = data || []
      state.currentItem = state.reportDate[0]
    }, {
      immediate: true
    })

    return {
      currentItemHandle,
      ...toRefs(state),
      avgDataDoResult
    }
  }
}
</script>

<style lang='stylus' scoped>
.comparison-space
  margin-bottom 20px
</style>
