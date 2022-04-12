<template lang="pug">
.p-risk-summary(v-loading='loading')
  .p-risk-bg
    .p-risk-line
      .p-risk-label 关联企业：
      .p-risk-list
        .p-risk-item
          .p-risk-item-value(v-if='result') {{result.glqyRelationCompanyCount}}
          .p-risk-item-value(v-else) 0
    .p-risk-line
      .p-risk-label 风险类型：
      .p-risk-list
        .p-risk-item(v-for='(item, key) in relatedRiskSummary')
          .p-risk-item-title {{item}}
          .p-risk-item-value(v-if='result') （{{result[key]}}）
          .p-risk-item-value(v-else) （0）
</template>

<script>
import { watch } from '@vue/composition-api'
import useRelationSummary from '../hooks/useRelationSummary'
import { relatedRiskSummary } from './config'
export default {
  props: {
    companyName: {
      type: String
    },
  },
  setup(props) {
    const { companyName } = props
    const { loading, result, doResult } = useRelationSummary()

    if (companyName) {
      doResult({ companyName })
    }
    watch(
      () => companyName,
      (value) => {
        doResult({companyName: value})
      }
    )

    return {
      relatedRiskSummary,
      loading,
      result
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-risk-summary
  padding 10px 0
  .p-risk-bg
    background #F5F7FC
    margin 0 20px
    padding 14px 10px
    .p-risk-line
      margin-bottom 18px
      display flex
      color #494949
      .p-risk-label
        margin-right 10px
      .p-risk-list
        display flex
        .p-risk-item
          display flex
          margin-right 18px
          .p-risk-item-value
            color #E05E62
    .p-risk-line:last-child
      margin-bottom 0
</style>
