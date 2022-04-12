<template lang='pug'>
.enterprise-finance-detail
  Balance(v-if="type === 'balance'")
  Income(v-if="type === 'income'")
  CashFlow(v-if="type === 'cashFlow'")
</template>

<script>
// 组件
import Balance from './Balance'
import Income from './Income'
import CashFlow from './CashFlow'
// import { reactive, ref, toRefs } from '@vue/composition-api'
export default {
  props: {},
  components: {
    Balance,
    Income,
    CashFlow
  },
  setup (props, { root }) {
    const { type } = root.$route.query
    return {
      type
    }
  }
}
</script>

<style lang='stylus' scoped>
.enterprise-finance-detail
  position relative
  min-width 800px
  flex 1
  margin 0 30px
  padding 30px 20px 50px
  background #fff
</style>
