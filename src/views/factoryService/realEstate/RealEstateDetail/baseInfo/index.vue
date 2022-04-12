<template lang="pug">
.p-base-info.card(v-loading='loading')
  //- 头部
  Header(:dataSource='dataSource' :companyName='companyName')
  //- 排名
  Rank(:dataSource='dataSource' :companyName='companyName')
  //- 基本信息项
  BaseItem(:dataSource='dataSource')
</template>

<script>
import Header from './header'
import Rank from './rank'
import BaseItem from './baseItem'
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    },
    companyName: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: { Header, Rank, BaseItem }
}
</script>

<style lang="stylus" scoped>
.p-base-info
  width 100%
  background url('//cdn.qjdchina.com/static-online/saas/factoryService/realEstate/base-bg.png') top right no-repeat #415E9F
  background-size cover
  color #fff
  padding 24px 12px 24px 18px
  box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.05)
</style>
