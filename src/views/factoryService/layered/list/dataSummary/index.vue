<template lang="pug">
Card.p-data-summary(title='数据概览' noWrap)
  template(slot='headRight')
    .u-tip
      i.el-icon-info
      | 经销商分层模块仅供企业内部经营决策性参考
  .p-content(v-loading='loading')
    .p-flex
      Count(title='总计经销商数量' :num='companyCount' icon='company')
      Count(title='触发红线经销商数量' :num='redlineNum' icon='redline')
    .p-flex
      .p-border
        Distribution(:dataSource='distributionData')
      .p-border
        Redline(:dataSource='redlineData')
</template>

<script>
import Card from '@/components/Card'
import Count from './count'
import Distribution from './distribution'
import Redline from './redline'
import { toRefs, reactive, watch } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { summaryRedLine } from './config'
export default {
  props: {
    refresh: {
      type: Boolean,
      default: false
    }
  },

  components: { Card, Count, Distribution, Redline },

  setup(props) {
    const state = reactive({
      distributionData: [],
      redlineData: [],
      companyCount: 0,
      redlineNum: 0
    })

    const { getRedLineCount } = ajaxStore.factoryService.layered

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
        // redMap, allCount, corpMap, redCount都可能为null
        const { redMap, allCount, levelA, levelB, levelC, redCount } = value
        // 获取总计经销商数量
        state.companyCount = allCount

        // 获取触发红线经销商数量
        state.redlineNum = redCount

        // 获取经销商等级分布
        state.distributionData = []
        state.distributionData.push(getDistributionData('[0-35]', levelA, allCount))
        state.distributionData.push(getDistributionData('(35-70]', levelB, allCount))
        state.distributionData.push(getDistributionData('(70-100]', levelC, allCount))

        // 获取红线触发次数
        state.redlineData = []
        for (const key in summaryRedLine) {
          state.redlineData.push({
            name: summaryRedLine[key],
            count: redMap[key]
          })
        }
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
<style lang="stylus">
.p-data-summary
  .card-title_text
      margin-left 0
</style>

<style lang="stylus" scoped>
.p-data-summary
    margin-bottom 10px
    padding 0 20px 20px 20px
    .u-tip
      font-size 12px
      line-height 50px
      margin-right 20px
      color #E0E0E0
      &:before
          content ""
          display inline-block
          margin 0 7px 0 6px
          width 6px
          height 6px
          background #fff
          border-radius 6px
      i
        margin-right 6px
    .p-border
        border 1px solid #EAEBEE
        width 50%
        padding 20px 17px
    .p-border:last-child
        border-left none
</style>
