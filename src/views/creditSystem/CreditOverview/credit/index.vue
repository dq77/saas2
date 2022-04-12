<template lang="pug">
div
  Header(:title="'授信总览'")
    div.credit-buttons
      span(:class="active === 'orgYear' ? 'credit-button-select' : ''", @click="active = 'orgYear'" weblogs-anchor="common-situation-factory") 厂家年度额度占比
      span(:class="active === 'dealerCredit' ? 'credit-button-select' : ''", @click="active = 'dealerCredit'" weblogs-anchor="common-situation-coustom") 经销商额度占比
      span(:class="active === 'projectCredit' ? 'credit-button-select' : ''", @click="active = 'projectCredit'" weblogs-anchor="common-situation-progress") 项目授信占比
  .credit-content
    //- 总览
    Manufactor(:dataSource="companyData", :loading="loading")
    //- 企业年度授信
    Company(:title="title", :dataSource="dataSource", :loading="loading")
</template>
<script>
import Header from '../header'
import Manufactor from './manufactor'
import Company from './company'
import useCurrent from './index.js'

export default {
  components: {
    Header,
    Manufactor,
    Company
  },
  setup() {
    const state = useCurrent()

    return {
      ...state
    }
  },
}
</script>
<style lang="stylus" scoped>
.credit-buttons
  span
    cursor pointer
    display inline-block
    height 28px
    background #EFF4FC
    line-height 28px
    text-align center
    color #3C5DA4
    font-size 12px
    padding 0 20px
    margin-right 10px
  .credit-button-select
    background #3C5DA4
    color #fff
.credit-content
  display flex
</style>
