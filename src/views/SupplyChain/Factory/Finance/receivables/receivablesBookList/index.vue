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
    //- table
    Table(
      :dataSource='tableState.dataSource'
      :columns='columns'
      :loading='tableState.loading'
      @sortChange='sortChange'
    )
      template(slot='operate' slot-scope='{row}')
        //- 操作
        el-button(type='text' @click='clickDetail(row)') 查看应收详情
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
import { columns, formConfig, formData, companyListData } from './config'
import useSum from './useSum'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Card,
    CompanyNameBar,
  },
  setup(props, { root }) {
    const { customerId, customerName } = root?.$route?.query || {}
    const formRef = ref()
    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig
    })
    // table & page
    const tableState = useTable({
      request: ajaxStore.factory.finance.getPagedReceivablesByCustomer,
      defaultParams: {
        customerId,
        accountType: 1, // 只查发货
      }
    })

    // 查询
    const searchFormHandle = (sorted) => {
      formState.submitHandle((data) => {
        const newData = {}
        if (data.dateRange[0]) newData.queryStartDate = data.dateRange[0] + ' 00:00:00'
        if (data.dateRange[1]) newData.queryEndDate = data.dateRange[1] + ' 23:59:59'
        if (data.isCheck) newData.isCheck = Number(data.isCheck)
        if (sorted?.sortProp) newData[sorted.sortType] = sorted.sortProp
        tableState.searchHandle(newData)
      })
    }
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // 排序
    const sortChange = ({ prop, order }) => {
      let sortProp = null // 字段key
      let sortType = null // 排序类型，desc，asc
      if (order === 'ascending') {
        sortProp = prop
        sortType = 'asc'
      } else if (order === 'descending') {
        sortProp = prop
        sortType = 'desc'
      }
      searchFormHandle({ sortProp, sortType })
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
      sumState,
    })
    // 查看应收详情
    const clickDetail = (row) => root.$router.push({
      name: 'supplyChain_factory_finance_receivablesDetail',
      query: { incomeSn: row.incomeSn }
    })

    return {
      formRef,
      columns,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
      sortChange,
      clickDetail,
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-mg
  margin-top 10px
</style>
