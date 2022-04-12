<template lang="pug">
.page-main
  Card.p-mg(noTitle noWrap)
    .p-title {{ customerName }}
    MultiAccountBar(
      style='padding: 20px;'
      :totalData='detailState.totalData'
      :accountsData='detailState.listData'
      v-loading='detailState.loading'
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
    Table(
      :dataSource='tableState.dataSource'
      :columns='columns'
      :loading='tableState.loading'
    )
    Pagination(:pagination='tableState.pagination')
</template>
<script>
import { reactive, toRefs, ref } from '@vue/composition-api'
import ajaxStore from '@/apis'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import Card from '@/components/Card'
import MultiAccountBar from '@/views/SupplyChain/Factory/Finance/components/multiAccountBar/index'
import useDetail from './useDetail'
import { columns, formConfig, formData } from './config'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Card,
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
      request: ajaxStore.factory.finance.getPagedFrozenDetail,
      defaultParams: {
        customerId,
        operation: '1',
      }
    })

    // 查询
    const searchFormHandle = () => formState.submitHandle((formData) => {
      const params = {}
      if (formData?.daterange?.length > 0) {
        params.queryStartDate = formData.daterange[0] ? formData.daterange[0] + ' 00:00:00' : ''
        params.queryEndDate = formData.daterange[1] ? formData.daterange[1] + ' 23:59:59' : ''
      }
      tableState.searchHandle(params)
    })
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // 顶部统计
    const detailState = useDetail({
      params: { customerId, operation: '1' },
    })
    // state
    const state = reactive({
      formState,
      tableState,
      detailState,
    })

    return {
      customerName,
      formRef,
      columns,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-mg
  margin-top 10px
.p-title
  margin 15px 0 5px 20px
  font-size 14px
  color #494949
.p-table-wrap
  margin 20px
</style>
