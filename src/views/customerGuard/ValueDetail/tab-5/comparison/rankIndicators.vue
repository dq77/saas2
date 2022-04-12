<template lang='pug'>
.rankIndicators
  .tab-header 指标排名
  ButtonGroup.tab-button(
    title='报告期'
    :dataSource='buttonGroupApi.dataSource'
    :current='buttonGroupApi.current'
    @change='changeGroup'
  )
  //- 偿债能力
  ChartList(
    prop='solvency'
    title='偿债能力'
    :dataSource='lists'
    :loading='loading'
    :avgDataSource='avgData'
    :current='buttonGroupApi.current'
  )
  //- 营运能力
  ChartList(
    prop='operation'
    title='营运能力'
    :dataSource='lists'
    :loading='loading'
    :avgDataSource='avgData'
  )
  //- 盈利能力
  ChartList(
    prop='profitability'
    title='盈利能力'
    :dataSource='lists'
    :loading='loading'
    :avgDataSource='avgData'
  )
  //- 公司规模
  ChartList(
    prop='companySize'
    title='公司规模'
    :dataSource='lists'
    :loading='loading'
    :avgDataSource='avgData'
  )
</template>

<script>
// components
import ButtonGroup from '../../../components/buttonGroup'
import TabCard from '../../components/tabCard'
import ChartList from './components/chartList'
// hooks
import useButtonGroup from '../../../hooks/useButtonGroup'
import useAsync from 'hooks/useAsync'
// others
import ajaxStore from '@/apis'
import { reactive, toRefs, ref, watch } from '@vue/composition-api'

export default {
  props: {
    reportDate: {
      type: Array,
      default: () => ([])
    },
    industry: String,
    avgDataDoResult: Function
  },
  components: {
    ButtonGroup,
    TabCard,
    ChartList
  },
  setup (props) {
    // state
    const state = reactive({
      buttonGroupApi: {},
      form: {
        reportDate: '',
        industry: ''
      },
      avgData: {}
    })
    // useButtonGroup
    const changeGroup = ({ item, index }) => {
      state.buttonGroupApi.changeGroup({ item, index })
      state.form.reportDate = props.reportDate[index]
      initData(state.form)
    }
    // useAsync
    const { customer: { stratify: { getByDealerTime } } } = ajaxStore
    const lists = ref([])
    const { loading, doResult } = useAsync({
      init: false,
      request: getByDealerTime,
      successCallBack: res => {
        const { code, data } = res
        if (code !== '0') return
        lists.value = data
      }
    })
    // 初始化
    const initData = async (params) => {
      // state.loading = true
      const { code, data } = await props.avgDataDoResult(params)
      // state.loading = false
      if (code !== '0') return
      state.avgData = data?.[0] || {}
      doResult(state.form)
    }

    watch(() => props.reportDate, (val) => {
      const config = val.map(item => {
        return item.slice(0, -3)
      })
      state.buttonGroupApi = useButtonGroup({ config })

      state.form.reportDate = props.reportDate[0]
      state.form.industry = props.industry
      initData(state.form)
    })

    return {
      loading,
      lists,
      ...toRefs(state),
      changeGroup
    }
  }
}
</script>

<style lang='stylus' scoped>
// header
.tab-header
  padding 15px 0
  font-size 16px
  font-weight 500
  color #494949
  line-height 22px
  border-bottom 1px solid #EAEBEE
// button
.tab-button
  margin 25px 0
</style>
