<template lang="pug">
.p-border
  .p-title 个人风险
    el-popover(
      placement="bottom"
      width="420"
      trigger="hover"
    )
      .p-tips
        p
          .p-label 1.失信被执行：
            span.p-value 企业实际控制人成为失信被执行；
        p
          .p-label 2.限制高消费：
            span.p-value 企业实际控制人被限制高消费；
        p
          .p-label 3.被执行人：
            span.p-value 企业实际控制人成为被执行人。
      i.el-icon-info(slot="reference")
  .p-risk-main
    .p-risk-item(v-for='(item, key) in redLineSummary')
      .p-risk-item-name {{item.name}}（个）
      .p-risk-item-num {{item.count}}
</template>

<script>
import { personRedLine } from '../config'
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
        state.redLineSummary = personRedLine
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
