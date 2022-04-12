<template lang="pug">
div
  Form(
    ref="formRef"
    :formData="formData",
    :formConfig="formConfig"
  )
    .global-search-btn
      el-button.search-button(type="primary", @click="searchFormHandle", :loading="loading") 搜索
      el-button.search-button(@click="resetFormHandle") 重置
  div(style="padding: 20px;")
    Table(:dataSource="dataSource", :columns="sysColumns", :loading="loading")
  Pagination(:pagination="pagination")
</template>
<script>
import { ref } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import { logLevel } from '@/consts'
import ajaxStore from '@/apis'
import { sysColumns, sysFormConfig } from '../config'

export default {
  components: {
    Form,
    Table,
    Pagination
  },
  setup() {
    const formRef = ref()
    const { getSysTemList, getFnMoudles } = ajaxStore.common.openPlat
    // form
    const {
      formData,
      formConfig,
      submitHandle,
      resetHandle,
      setConfig
    } = useForm({
      formRef,
      formData: { methodFunction: undefined, logLevel: undefined },
      formConfig: sysFormConfig
    })
    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({ request: getSysTemList })
    // 查询
    const searchFormHandle = () => submitHandle(searchHandle)
    // 重置
    const resetFormHandle = () => {
      resetHandle()
      resetTableHandle()
    }
    // 成功回调
    const successCallBack = ({ data }) => {
      const { pagedRecords } = data || {}
      pagedRecords && pagedRecords.length && setConfig('methodFunction', 'options', pagedRecords)
    }
    // 获取功能模块
    useAsync({
      request: getFnMoudles,
      successCallBack
    })

    return {
      formRef,
      formData,
      formConfig,
      searchFormHandle,
      resetFormHandle,
      loading,
      dataSource,
      pagination,
      sysColumns,
      logLevel
    }
  },
}
</script>
