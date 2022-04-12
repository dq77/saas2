<template lang="pug">
div
  el-button(type='primary' @click='dialogShow' v-if='pageType === "projectInfo"' weblogs-anchor='factory-customerEvaluation-eval-initiate-base-initiate') 发起人工评估
  .u-tip(v-if='pageType === "projectInfo"')
    i.el-icon-info
    | 提示：发起人工评估，可获取专业项目评分哦～
  GoEvaluationDialog(:isVisible='isVisible' @close='dialogHide')
</template>

<script>
import usePageType from '../hooks/usePageType'
import GoEvaluationDialog from '../../components/goEvaluationDialog'
export default {
  data: function() {
    return {
      isVisible: false
    }
  },
  components: {
    GoEvaluationDialog
  },
  methods: {
    dialogShow() {
      this.isVisible = true
    },
    dialogHide() {
      this.isVisible = false
    },
  },
  setup(props, { root, emit }) {
    const { pageType } = usePageType(root)
    return {
      pageType
    }
  }
}
</script>

<style lang="stylus" scoped>
.u-tip
  margin-top 15px
  margin-bottom 20px
  border-bottom 1px solid #E8ECF7
  padding-bottom 20px
  color #6D7278
</style>
