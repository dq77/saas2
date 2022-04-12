<template lang='pug'>
.rank
  Header(title='应收排名' :left='20')
  .rank-content
    //- 项目应收总金额排名TOP5（万元）
    Overview
    .rank-content--right
      //- 应收计划总金额排名top10（万元）
      Plan
</template>

<script>
import Header from '@/components/qjd/header'
import Overview from './overview'
import Plan from './plan'

export default {
  components: {
    Header,
    Overview,
    Plan
  },
  setup () {
  }
}
</script>

<style lang='stylus' scoped>
.rank
  height 450px
  background #fff
  margin-top var(--smallSpace)
  display flex
  flex-direction column
.rank-content
  display flex
  &--right
    flex 1
    position relative
</style>
