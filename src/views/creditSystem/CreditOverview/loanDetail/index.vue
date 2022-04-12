<template lang="pug">
.loanDetail
  Header(:title="'放款明细表'")
  Form(
    ref="formRef"
    :formData="formData",
    :formConfig="formConfig"
  )
    .global-search-btn
      el-button.search-button(type="primary", @click="searchFormHandle") 搜索
      el-button.search-button(@click="resetFormHandle") 重置
  div(style="padding: 20px;")
    Table(:dataSource="dataSource", :columns="loanDetailColumns", :loading="loading")
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
import { loanDetailColumns } from '../config'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Header
  },
  setup() {
    const formRef = ref()
    const { credit: { getLoanDetailsList } } = ajaxStore
    // form
    const {
      formData,
      formConfig,
      submitHandle,
      resetHandle,
    } = useForm({
      formRef,
      formData: { accountName: undefined },
      formConfig: [
        { type: 'input', key: 'accountName', label: '经销商名称' }
      ]
    })

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({ request: getLoanDetailsList })
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
      loanDetailColumns
    }
  },
}
</script>
