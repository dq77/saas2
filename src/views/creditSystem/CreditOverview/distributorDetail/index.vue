<template lang="pug">
.distributorDetail
  Header(:title="'经销商逾期明细表'")
  Form.golbal_search_box(
    ref="formRef"
    :formData="formData",
    :formConfig="formConfig"
  )
    .global-search-btn
      el-button.search-button(type="primary", @click="searchFormHandle", :loading="loading") 搜索
      el-button.search-button(@click="resetFormHandle") 重置
  div(style="padding: 20px;")
    Table(:dataSource="dataSource", :columns="distributorDetailColumns", :loading="loading")
  Pagination(:pagination="pagination")
</template>
<script>
import { ref } from '@vue/composition-api'
import Header from '../header'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { distributorDetailColumns } from '../config'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Header
  },
  setup() {
    const formRef = ref()
    const { credit: { dealerOverdueDetailList } } = ajaxStore
    // form
    const {
      formData,
      formConfig,
      submitHandle,
      resetHandle,
    } = useForm({
      formRef,
      formData: { customerName: undefined, memberName: undefined },
      formConfig: [
        { type: 'input', key: 'customerName', label: '经销商名称' },
        { type: 'input', key: 'memberName', label: '业务员' }
      ]
    })

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({ request: dealerOverdueDetailList })
    // 查询
    const searchFormHandle = () => submitHandle(searchHandle)
    // 重置
    const resetFormHandle = () => {
      resetHandle()
      resetTableHandle()
    }

    return {
      formRef,
      formData,
      formConfig,
      searchFormHandle,
      resetFormHandle,
      loading,
      dataSource,
      pagination,
      distributorDetailColumns
    }
  },
}
</script>
