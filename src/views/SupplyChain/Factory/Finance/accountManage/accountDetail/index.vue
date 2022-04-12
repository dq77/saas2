<template lang="pug">
.page-main
  Card(noTitle noWrap)
    CompanyNameBar(
      style='height: 120px;'
      v-loading='sumState.loading'
      :companyName='customerName'
      :listData='sumState.listData'
    )
  Card.p-mg(noTitle noWrap)
    .p-tabs(v-loading='sumState.loading' v-if='sumState.tabs.length')
      el-tabs(
        v-model='sumState.activeTab'
      )
        el-tab-pane(
          v-for='tab in sumState.tabs'
          :key='tab.name'
          :name='tab.name'
          :label='tab.label'
        )
          MultiAccountBar(
            :showBac='false'
            :totalData='tab.totalData'
            :accountsData='tab.accountsData'
          )
  Card.p-mg(noTitle useFor='search')
    //- form
    Form(
      ref='formRef'
      :formData='formState.formData',
      :formConfig='formState.formConfig'
    )
      .global-search-btn
        el-button.search-button(
          type='primary'
          @click='searchFormHandle'
          :loading='tableState.loading'
        ) 搜索
        el-button.search-button(@click='resetFormHandle') 重置
  Card.p-mg(noTitle)
    //- table
    Table(
      :dataSource='tableState.dataSource'
      :columns='columns'
      :loading='tableState.loading'
    )
      template(slot='operate' slot-scope='{row}')
        //- 操作
        el-button(type='text' v-if='row.turnoverType === "1"' @click='clickDetail(row)') 查看入账单
        el-button(type='text' v-else-if='row.turnoverType === "2"' @click='clickDetail(row)') 查看出账单
        el-button(type='text' v-else-if='row.turnoverType === "3"' @click='clickDetail(row)') 查看付款单
        el-button(type='text' v-else-if='row.turnoverType === "4"' @click='clickDetail(row)') 查看退款单
    Pagination(:pagination='tableState.pagination')
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import Card from '@/components/Card'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import CompanyNameBar from '@/views/SupplyChain/Factory/Finance/components/companyNameBar/index'
import MultiAccountBar from '@/views/SupplyChain/Factory/Finance/components/multiAccountBar/index'
import { columns, formConfig, formData, companyListData } from './config'
import useSum from './useSum'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Card,
    CompanyNameBar,
    MultiAccountBar,
  },
  setup(props, { root }) {
    const { customerName, customerId } = root.$route?.query

    const formRef = ref()
    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig
    })
    // table & page
    const tableState = useTable({
      request: ajaxStore.factory.finance.getPagedAccountDetail,
      defaultParams: { customerId }
    })

    // 查询
    const searchFormHandle = () => formState.submitHandle(tableState.searchHandle)
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // 顶部统计
    const sumState = useSum({
      listData: companyListData,
      params: { customerId }
    })
    // state
    const state = reactive({
      customerName,
      formState,
      tableState,
      sumState
    })

    // 应收账簿
    const clickDetail = (row) => {
      // 1 入账 2出账 3付款 4退款
      const routeMap = {
        1: 'supplyChain_factory_finance_enterAccountDetail',
        2: 'supplyChain_factory_finance_expenseAccountDetail',
        3: 'supplyChain_factory_finance_paymentDetail',
        4: 'supplyChain_factory_finance_refundDetail'
      }
      root.$router.push({
        name: routeMap[row.turnoverType],
        query: {
          customerId, customerName, billNo: row.turnoverSn
        }
      })
    }
    return {
      formRef,
      columns,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
      clickDetail,
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-mg
  margin-top 10px
.p-tabs
  margin 0 20px
  padding-bottom 20px
  >>>.el-tabs__nav-wrap::after
    display block
    height: 1px
</style>
