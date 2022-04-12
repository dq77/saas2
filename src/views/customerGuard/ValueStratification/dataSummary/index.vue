<template lang="pug">
Card.p-data-summary(title="数据概览")
  template(slot="headRight")
    .u-tip
      i.el-icon-info
      | 企业价值分层模块仅供企业内部经营性参考
  .p-content(v-loading="loading")
    .p-flex
      Count(title="总计企业数量" :num="companyCount" icon="company")
      Count(title="触发红线企业数量" :num="redlineNum" icon="redline")
    //- 司法风险
    Judicial
    .p-flex
      .p-border
        Distribution(:dataSource="distributionData")
      .p-border
        Redline(:dataSource="redlineData" emptyText='暂无数据,请点击下方导入企业按钮')
</template>

<script>
import Card from '@/components/Card'
import Count from './count'
import Judicial from './judicial'
import Distribution from './distribution'
import Redline from '../../components/redline'
import { toRefs, reactive, watch } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { summaryRedLineList } from '../../components/redline/config'

export default {
  props: {
    refresh: {
      type: Boolean,
      default: false
    }
  },

  components: {
    Card,
    Count,
    Distribution,
    Redline,
    Judicial
  },

  setup(props) {
    const state = reactive({
      distributionData: [],
      redlineData: [],
      companyCount: 0,
      redlineNum: 0,
      redLineApi: null
    })

    const { getRedLineCount } = ajaxStore.risk

    const {
      loading,
      result,
      doResult
    } = useAsync({
      request: getRedLineCount,
      init: false
    })

    const getDistributionData = (name, count, countAll) => {
      return {
        name,
        count,
        percent: countAll === 0 ? 0 : (count / countAll).toFixed(2)
      }
    }

    doResult()

    watch(
      () => props.refresh,
      (value) => {
        doResult()
      }
    )

    watch(
      () => result.value,
      (value) => {
        const { redMap, allCount, levelA, levelB, levelC, redCount } = value

        // 获取总计企业数量
        state.companyCount = allCount

        // 获取触发红线企业数量
        state.redlineNum = redCount

        // 获取经销商等级分布
        state.distributionData = []
        state.distributionData.push(getDistributionData('[0-35]', levelA, allCount))
        state.distributionData.push(getDistributionData('(35-70]', levelB, allCount))
        state.distributionData.push(getDistributionData('(70-100]', levelC, allCount))

        // 获取红线触发次数
        state.redlineData = []
        summaryRedLineList.forEach((item, index) => {
          if (redMap && Object.keys(redMap).includes(`${item.key}`)) {
            state.redlineData.push({
              name: item.label,
              count: redMap[item.key]
            })
          } else {
            state.redlineData.push({
              name: item.label,
              count: undefined
            })
          }
        })
      }
    )

    return {
      loading,
      result,
      ...toRefs(state)
    }
  }

}
</script>

<style lang="stylus" scoped>
.p-data-summary
  border-radius 4px
  margin-bottom 10px
  .u-tip
    font-size 12px
    line-height 50px
    margin-right 20px
    color #E0E0E0
    &:before
      content ''
      display inline-block
      margin 0 7px 0 6px
      width 6px
      height 6px
      background #fff
      border-radius 6px
    i
      margin-right 6px
  .p-border
    width 50%
    padding 20px 17px
.p-flex
  display flex
  margin-bottom 20px

/deep/.card-content
  margin-top 0
/deep/ .card-title_text
  margin-left 20px
</style>
