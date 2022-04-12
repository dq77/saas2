<template lang="pug">
.home-base-main
  .home-title 基本信息
  .base-detail(v-if='dataSource')
    //- 公司简介
    ComanyBase(:dataSource='dataSource.companyBaseBO')
    //- 股东信息
    Holders(:dataSource='dataSource.holders')
</template>

<script>
import ComanyBase from './companyBase'
import Holders from './holders'
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => {}
    },
  },
  components: {
    ComanyBase,
    Holders
  },
}
</script>

<style lang="stylus">
@import '../../index.styl'
</style>
<style lang="stylus" scoped>
@import '../index.styl'
.base-detail
  border 1px solid #F2F2F6
  padding 27px 22px
</style>
