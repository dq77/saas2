<template lang="pug">
.page-main
  Card(noTitle noWrap)
    Bar(
      style='height: 120px;'
      :incomeSn='incomeSn'
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
      //- 操作
      template(slot='operate' slot-scope='{row}')
        el-button(type='text' v-if='row.accountType === 2' @click='clickReceive(row)') 查看收款单
        el-button(type='text' v-if='row.accountType === 3' @click='clickReturn(row)') 查看退货单
        el-button(type='text' v-if='row.accountType === 4' @click='clickRefund(row)') 查看退款单
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
import Bar from './bar'
import { columns, formConfig, formData } from './config'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Card,
    Bar,
  },
  setup(props, { root }) {
    const { incomeSn } = root.$route?.query ?? {}
    const formRef = ref()
    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig
    })
    // table & page
    const tableState = useTable({
      request: ajaxStore.factory.finance.getReceivablesListInDetail,
      defaultParams: { incomeSn }
    })

    // 查询
    const searchFormHandle = () => formState.submitHandle(tableState.searchHandle)
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // state
    const state = reactive({
      formState,
      tableState,
    })
    // 查看退货单
    const clickReturn = (row) => root.$router.push({
      name: 'reverseOrderderDetail',
      query: {
        id: row.invoiceId,
        status: '1', // 用于发货详情页判断用，只要有值即可，发货详情页待优化
        type: 'look'
      }
    })
    // 查看退款单
    const clickRefund = (row) => root.$router.push({
      name: 'supplyChain_factory_finance_refundDetail',
      query: {
        billNo: row.invoiceSn,
        customerName: '',
      }
    })
    // 查看收款单
    const clickReceive = (row) => root.$router.push({
      name: 'supplyChain_factory_finance_receiptDetail',
      query: {
        billNo: row.invoiceSn
      }
    })
    return {
      formRef,
      columns,
      incomeSn,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
      clickReturn,
      clickRefund,
      clickReceive,
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-mg
  margin-top 10px
</style>
