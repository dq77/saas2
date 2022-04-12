<template lang='pug'>
  .page-main.p-main
    .p-main-left
      CommonService
      RecommendService
      BusinessOverview
      Risk
</template>

<script>
import { mapState } from 'vuex'
import Risk from './Risk'
import CommonService from './commonService'
import RecommendService from './recommendService'
import BusinessOverview from './businessOverview'

export default {
  computed: mapState(['userInfo']),
  components: {
    Risk,
    CommonService,
    RecommendService,
    BusinessOverview
  },
}
</script>

<style lang='stylus' scoped>
.p-main
  display flex
.p-main-left
  flex 1
  width 0
.p-main-right
  width 330px
  display flex
  flex-direction column
  margin-left 10px
</style>
