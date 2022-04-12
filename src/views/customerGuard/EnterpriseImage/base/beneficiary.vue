<template lang="pug">
.actual-controller-main
  .home-title 最终受益人
  .actual-controller-title
    .title-left
      span 最终受益人：
      span.actual-controller-name(v-if='maxItem.name') {{maxItem.name}}
        template(v-if='maxItem.percent') （{{maxItem.percent}}）
      span.actual-controller-name(v-else) 暂无数据
    .title-right
      i.el-icon-warning
      span 受益路径图
  .p-roll-box
    .u-roll-content
      ArrowImage(:dataSource='maxItem.chainList' v-if='maxItem && maxItem.chainList.length')
      .u-empty-tips(v-else) 暂无数据
</template>

<script>
import ArrowImage from '../components/arrowImage'
import { reactive, toRefs, inject } from '@vue/composition-api'
export default {
  components: {
    ArrowImage
  },
  setup(props) {
    const state = reactive({
      dataSource: [],
      maxItem: ''
    })

    const { result, loading } = inject('baseInfo')

    const list = result.value?.tycHumanHoldingBOPage?.list

    const setChainList = (list) => {
      if (!list) { return }
      let max = 0
      let maxItem = ''
      list.map((item) => {
        if (parseFloat(item.percent) > max) {
          max = parseFloat(item.percent)
          maxItem = item
        }
      })
      if (!maxItem) { maxItem = list[0] }
      state.maxItem = maxItem
    }

    setChainList(list)

    return {
      loading,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
.u-empty-tips
  text-align center
  width 100%
</style>
