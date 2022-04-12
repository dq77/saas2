<template lang="pug">
.page-main
  Form.golbal_search_box(
    ref="formRef"
    :formData="formData",
    :formConfig="formConfig"
  )
    .global-search-btn-feed
      el-button.search-button(type="primary", @click="searchFormHandle", :loading="loading") 搜索
      el-button.search-button(@click="resetFormHandle") 重置
  div(style="background: #fff;")
    div(style="padding: 20px")
      Table(
        :dataSource="dataSource"
        :columns="columns"
        :loading="loading"
      )
        template(slot="fileName" slot-scope="{ row }")
          .credit_fileName(@click="() => downHandle(row)") {{ row['fileName'] }}
        template(slot="operate" slot-scope="{row}")
          el-button(type="text" v-if="row.canExportErrorFile" @click="() => leadHandle(row && row.fileKey ? row.fileKey : '')") 导出异常数据
          el-button(type="text" :loading="doneLoading" v-if="row.canRetry" @click="() => doResult({ importBatchId: row && row.id ? row.id : '' })") 处理一下
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
import ajaxStore from '@/apis'
import { columns, cFormConfig, cFormData } from './config'
import { toPrefixUrl } from '@/utils/util'
import { Message } from 'element-ui'

export default {
  components: {
    Form,
    Table,
    Pagination
  },
  setup() {
    const formRef = ref()
    const { credit: { getImportList, retryDone } } = ajaxStore
    // form
    const {
      formData,
      formConfig,
      submitHandle,
      resetHandle,
    } = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig
    })
    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({ request: getImportList, defaultParams: { businessCase: 'CREDIT_ORDER' }, })
    // 查询
    const searchFormHandle = () => submitHandle().then(() => {
      const { value: { time, ...others } } = formData
      let params = {}
      if (time && time.length) {
        params.queryStartDate = time[0]
        params.queryEndDate = time[1]
      }
      params = { ...params, ...others }
      searchHandle(params)
    })
    // 重置
    const resetFormHandle = () => {
      resetHandle()
      resetTableHandle()
    }
    // 下载文件
    const downHandle = row => {
      const { fileKey } = row || {}
      window.open(toPrefixUrl(`/saas-credit/v1/credit/import/downFile?fileKey=${fileKey}`))
    }
    // 导出异常数据
    const leadHandle = fileKey => window.open(toPrefixUrl(`/saas-credit/v1/credit/import/downErrorFile?fileKey=${fileKey}`))
    // 处理一下 接口
    const { doResult, loading: doneLoading } = useAsync({
      request: retryDone,
      init: false,
      successCallBack: ({ code, params }) => {
        if (code === '0') {
          Message.success('处理成功')
          const { importBatchId } = params || {}
          const current = dataSource.value.find(item => item.id === importBatchId)
          current.canRetry = false
        }
      }
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
      columns,
      downHandle,
      leadHandle,
      doResult,
      doneLoading
    }
  },
}
</script>
<style lang="stylus" scoped>
.credit_fileName
  cursor pointer
  color #3c5da4
</style>
