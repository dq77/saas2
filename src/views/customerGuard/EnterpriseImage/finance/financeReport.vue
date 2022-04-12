<template lang="pug">
.finanace-report
  ButtonGroup.tab-button(
    title='报告期'
    :dataSource='buttonGroupApi.dataSource'
    :current='buttonGroupApi.current'
    @change='changeGroup'
  )
  //- 资产负债摘要表
  TableModule.table-item(
    title='资产负债摘要表'
    :month='month'
    :request='getBalanceByQuarter'
    :columns='balanceTableList'
    unit='亿元'
  )
    template(slot="headRight")
      router-link.link-btn(
        :to='{ name: "enterpriseImageFinance", query: { companyName: $route.query.companyName, month: month, type: "balance" } }'
        target="_blank"
      ) 查看资产负债表
  //- 利润表摘要
  TableModule.table-item(
    title='利润表摘要'
    :month='month'
    :request='getIncomeByQuarter'
    :columns='incomeTableList'
    unit='亿元'
  )
    template(slot="headRight")
      router-link.link-btn(
        :to='{ name: "enterpriseImageFinance", query: { companyName: $route.query.companyName, month: month, type: "income" } }'
        target="_blank"
      ) 查看利润表
  //- 现金流量表摘要
  TableModule.table-item(
    title='现金流量表摘要'
    :month='month'
    :request='getCashFlowByQuarter'
    :columns='cashFlowTableList'
    unit='亿元'
  )
    template(slot="headRight")
      router-link.link-btn(
        :to='{ name: "enterpriseImageFinance", query: { companyName: $route.query.companyName, month: month, type: "cashFlow" } }'
        target="_blank"
      ) 查看现金流量表摘要
</template>

<script>
// components
import ButtonGroup from '../../components/buttonGroup'
import TableModule from './table'
// hooks
import useButtonGroup from '../../hooks/useButtonGroup'
// others
import ajaxStore from '@/apis'
import { reactive, toRefs } from '@vue/composition-api'
import { reportButtonGroupLists, monthEnums, balanceTableList, incomeTableList, cashFlowTableList } from './config'

export default {
  components: {
    ButtonGroup,
    TableModule
  },
  setup(props) {
    const { customer: { stratify: { getBalanceByQuarter, getIncomeByQuarter, getCashFlowByQuarter } } } = ajaxStore

    const state = reactive({
      buttonGroupApi: {},
      month: null
    })

    state.buttonGroupApi = useButtonGroup({ config: reportButtonGroupLists })
    const changeGroup = ({ item, index }) => {
      state.buttonGroupApi.changeGroup({ item, index })
      state.month = monthEnums[item]
    }

    return {
      ...toRefs(state),
      changeGroup,
      getBalanceByQuarter,
      getIncomeByQuarter,
      getCashFlowByQuarter,
      balanceTableList,
      incomeTableList,
      cashFlowTableList
    }
  }
}

</script>

<style lang="stylus" scoped>
// button
.tab-button
  margin-bottom 25px
.table-item
  margin 0 20px 40px 0
.link-btn
  font-size 14px
  color #3B68F0
  cursor pointer
</style>
