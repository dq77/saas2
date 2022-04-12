<template lang="pug">
  .page-main
    Quick
    .overview-box
      //- 授信总览
      Credit
    .overview-box
      //- 放款总览
      Loan
    //-   暂时屏蔽放款明细表模块，但需保留现有逻辑
    //- .overview-box
      //- LoanDetail
    .overview-box
      //- 还款总览
      Pay
    .overview-box
      //- 催收明细表
      Collection
    .overview-box
      //- 逾期总览
      Overdue
    .overview-box
      //- 经销商逾期明细表
      DistributorDetail
</template>
<script>
import Quick from './quick'
import Credit from './credit/index.vue'
import Loan from './loan'
// import LoanDetail from './loanDetail'
import Pay from './pay'
import Collection from './collection'
import Overdue from './overdue'
import DistributorDetail from './distributorDetail'

export default {
  components: {
    Quick,
    Credit,
    Loan,
    Pay,
    Collection,
    Overdue,
    DistributorDetail
  }
}
</script>
<style lang="stylus" scoped>
.overview-box
  background #fff
  margin-bottom 10px
</style>
