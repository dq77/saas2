<template lang='pug'>
.heath-overview
  .heath-overview_content
    //- 逾期金额
    Chart
    .heath-overview_content--right
      //- 当前逾期金额排名
      Plan
</template>

<script>
import Header from '@/components/qjd/header'
import Chart from './chart'
import Plan from './plan'

export default {
  components: {
    Header,
    Chart,
    Plan
  },
  setup () {
  }
}
</script>

<style lang='stylus' scoped>
.heath-overview
  height 384px
  background #fff
  display flex
  flex-direction column
.heath-overview_content
  display flex
  border-top 1px solid #eaebee
  &--right
    flex 1
    position relative
</style>
