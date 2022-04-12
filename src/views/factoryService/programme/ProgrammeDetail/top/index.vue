<template lang="pug">
div
  .p-detail-main(v-if='pageType === "assessmentDetail"')
    .p-detail-flex
      //- 评分详情
      Score
      //- 流程信息
      ProcessInfo
    //- 合同信息
    // ContractInfo
</template>

<script>
import Score from './score'
import ProcessInfo from './processInfo'
import ContractInfo from './contractInfo'
import usePageType from '../hooks/usePageType'
export default {

  components: {
    Score,
    ContractInfo,
    ProcessInfo
  },

  setup(props, { root }) {
    const { pageType } = usePageType(root)
    return {
      pageType
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-detail-main
  // background #fff
  // padding 20px
  box-shadow 4px 6px 8px 0px #EEF1FC
  margin-bottom 20px
  .p-detail-flex
    display flex
</style>
