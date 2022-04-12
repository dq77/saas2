<template lang="pug">
.loanList
  Form(
    ref="formRef"
    :formData="formData",
    :formConfig="formConfig"
    style="padding:20px"
  )
    .global-search-btn
      el-button.search-button(type="primary", @click="searchFormHandle") 搜索
      el-button.search-button(@click="resetFormHandle") 重置
  div(style="padding: 20px;")
    Table(:dataSource="dataSource", :columns="loanColumns", :loading="loading")
      //- operate
      template(slot="operate" slot-scope="{row}")
        el-button(
          type="text"
          @click="() => accountHandle(row)"
        ) 查看
  Pagination(:pagination="pagination")
</template>
<script>
import { ref } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { loanColumns, getLoanConfig, LoanFormData } from './config'

export default {
  components: {
    Form,
    Table,
    Pagination
  },
  setup(props, { root }) {
    const {factoryService: { qjd: { getLoanDeduction } }, common: {getFuzzyCompanyName}} = ajaxStore
    const formRef = ref()
    // form
    const {
      formData,
      formConfig,
      resetHandle,
      setConfig,
    } = useForm({
      formRef,
      formData: LoanFormData,
      formConfig: getLoanConfig(query => doResult({dealerName: query}))
    })

    // 远程获取经销商
    const { doResult} = useAsync({
      request: getFuzzyCompanyName,
      init: false,
      successCallBack: ({ data }) => {
        setConfig('companyName', 'options', data)
      },
    })

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({ request: getLoanDeduction })
    // 查询
    const searchFormHandle = () => {
      const searchData = formData.value || {}
      const { transTime } = searchData
      const loanParams = {...searchData}
      const loanTimeParams = {}
      if (transTime) {
        loanTimeParams.transStartTime = transTime[0]
        loanTimeParams.transEndTime = transTime[1]
        delete loanParams.transTime
      }
      searchHandle({...loanParams, ...loanTimeParams})
    }
    // 重置
    const resetFormHandle = () => {
      resetHandle()
      resetTableHandle()
    }
    // 查看
    const accountHandle = ({ loanNo } = {}) => root.$router.push({ name: 'LoanListDetail', query: { loanNo } })

    return {
      formRef,
      formData,
      formConfig,
      searchFormHandle,
      resetFormHandle,
      accountHandle,
      loading,
      dataSource,
      pagination,
      loanColumns
    }
  },
}
</script>
