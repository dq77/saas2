<template lang="pug">
.page-main
  Card(noTitle noWrap)
    CompanyNameBar(
      style='height: 120px;'
      :companyName='customerName'
      :listData='sumState.listData'
      v-loading='sumState.loading'
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
    .p-table-header-btns
      el-button(type='primary' @click='clickCheckOut') 登记出账
    //- table
    Table(
      :dataSource='tableState.dataSource'
      :columns='columns'
      :loading='tableState.loading'
    )
      template(slot='operate' slot-scope='{row}')
        //- 操作
        el-button.p-mg-r-10(type='text' @click='clickDetail(row)') 查看
        template(v-if='row.status === 0')
          BtnSure.p-mg-r-10(
            :rowData='row'
            @success='searchFormHandle'
          )
          BtnClose(
            :rowData='row'
            @success='searchFormHandle'
          )
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
import BtnClose from './btnClose'
import BtnSure from './btnSure'
import useSum from './useSum'
import { columns, formConfig, formData, companyListData } from './config'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Card,
    CompanyNameBar,
    BtnClose,
    BtnSure,
  },
  setup(props, { root }) {
    const { customerId, customerName } = root.$route?.query

    const formRef = ref()
    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig
    })
    // table & page
    const tableState = useTable({
      request: ajaxStore.factory.finance.getBillPaged,
      defaultParams: {
        billType: 2,
        customerId
      }
    })

    // 查询
    const searchFormHandle = () => formState.submitHandle((formData) => {
      const params = {}
      if (formData?.daterange?.length > 0) {
        params.queryStartDate = formData.daterange[0] ? formData.daterange[0] + ' 00:00:00' : ''
        params.queryEndDate = formData.daterange[1] ? formData.daterange[1] + ' 23:59:59' : ''
      }
      formData?.billNo && (params.billNo = formData.billNo)
      formData?.status && (params.status = formData.status)
      tableState.searchHandle(params)
    })
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // 顶部统计
    const sumState = useSum({
      listData: companyListData,
      params: { customerId, billType: 2 }
    })
    // state
    const state = reactive({
      customerName,
      companyListData,
      formState,
      tableState,
      sumState,
    })
    // 点击查看
    const clickDetail = (row) => root.$router.push({
      name: 'supplyChain_factory_finance_expenseAccountDetail',
      query: {
        billNo: row.billNo,
        customerName,
        customerId,
      }
    })

    // 点击登记出账
    const clickCheckOut = () => root.$router.push({
      name: 'supplyChain_factory_finance_expenseAccount',
      query: {
        customerName,
        customerId
      }
    })

    return {
      formRef,
      columns,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
      clickCheckOut,
      clickDetail,
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-mg
  margin-top 10px
.p-mg-r-10
  margin-right 10px
.p-table-header-btns
  margin-bottom 20px
</style>
