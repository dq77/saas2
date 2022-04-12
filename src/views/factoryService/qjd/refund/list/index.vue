<template lang="pug">
.page-main
  Tabs(:dataSource="dataSource", :defaultTab="'loanList'", @tabCLick="(val) => tabCLick(val)")
  .system-content
    Loan(v-if="currentTab === 'loanList'")
    RefundLoan(v-if="currentTab === 'refundLoanList'")
</template>
<script>
import { ref } from '@vue/composition-api'
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import { refundDeductionTabs } from './config'
import Loan from './loan'
import RefundLoan from './refundLoan'

export default {
  components: {
    Tabs,
    Loan,
    RefundLoan,
  },
  setup() {
    const tabItem = ref('loanList')

    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: refundDeductionTabs,
      currentTab: 'loanList'
    })

    return {
      tabItem,
      dataSource,
      currentTab,
      tabCLick
    }
  },
}
</script>
<style lang="stylus" scoped>
.system-content
  background #fff
</style>
