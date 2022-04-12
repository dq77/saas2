<template lang="pug">
.p-border(v-loading='loading')
  .p-title 企业风险
    el-popover(
      placement="bottom"
      width="420"
      trigger="hover"
    )
      .p-tips
        p
          .p-label 1.失信被执行：
            span.p-value 当前企业、法定代表人、自然人股东、企业股东及其法定代表人成为失信被执行人；
        p
          .p-label 2.限制高消费：
            span.p-value 当前企业、法定代表人、自然人股东、企业股东及其法定代表人被限制高消费；
        p
          .p-label 3.被执行人：
            span.p-value 企业当前有被执行；
        p
          .p-label 4.税务违法：
            span.p-value 企业有税务违法或税务黑名单中；
        p
          .p-label 5.三年内因借贷纠纷成为被告：
            span.p-value 三年内因金融借贷纠纷及民间借贷纠纷成为被告；
      i.el-icon-info(slot="reference")
  .p-risk-main
    .p-risk-item(v-for='(item, key) in redLineSummary')
      .p-risk-item-name {{item.name}}（个）
      .p-risk-item-num {{item.count}}
</template>

<script>
import { companyRedLine } from '../config'
import { reactive, toRefs, watch } from '@vue/composition-api'
export default {
  props: {
    summary: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  setup(props) {
    const state = reactive({
      redLineSummary: {}
    })
    watch(
      () => props.summary,
      (value) => {
        state.redLineSummary = companyRedLine
        state.redLineSummary.map((item, key) => {
          state.redLineSummary[key].count = value[item.type] || 0
        })
      }
    )

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
</style>
