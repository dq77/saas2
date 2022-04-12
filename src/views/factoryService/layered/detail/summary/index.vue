<template lang="pug">
  Card(:title='result && result.corpName')
    template(slot='headRight')
      .u-tip
        i.el-icon-info
        | 经销商分层模块仅供企业内部经营决策性参考
    .p-flex
      Chart(:detail='result')
      Company(:summary='riskResult' :loading='loading')
      Person(:summary='riskResult' :loading='loading')
</template>

<script>
import Card from '@/components/Card'
import Chart from './chart'
import Company from './company'
import Person from './person'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
export default {
  components: { Card, Chart, Company, Person },
  setup(props, { root }) {
    const { checkCompanyInfoById, getRedLineSummary } = ajaxStore.factoryService.layered
    const { id } = root.$route.query

    // 获取企业风险、个人风险统计
    const { loading: riskLoading, result: riskResult, doResult } = useAsync({
      init: false,
      request: getRedLineSummary
    })

    // 获取企业名称及诚信信息
    const { loading, result } = useAsync({
      request: checkCompanyInfoById,
      params: { id },
      successCallBack: ({ data }) => {
        doResult({
          companyName: data.corpName
        })
      },
    })

    return {
      loading,
      result,
      riskLoading,
      riskResult
    }
  }
}
</script>

<style lang="stylus" scoped>
.u-tip
  font-size 12px
  line-height 50px
  margin-right 20px
  color #E0E0E0
  &:before
      content ""
      display inline-block
      margin 0 7px 0 3px
      width 6px
      height 6px
      background #fff
      border-radius 6px
  i
    margin-right 6px
</style>
