<template lang="pug">
div
  //- form
  Form.golbal_search_box(
    ref="formRef"
    :formData="formApis.formData",
    :formConfig="formApis.formConfig"
  )
    .global-search-btn-feed
      el-button.search-button(type="primary", @click="searchHandle") 搜索
      el-button.search-button(@click="resetHandle") 重置
  //- 操作
  div(style="background: #fff; padding: 20px;")
    Table(
      :columns="columns"
      :dataSource="tableApis.dataSource"
      :loading="tableApis.loading"
    )
      //- 操作
      template(slot="operate" slot-scope="{ row }")
        el-button(type="text" v-if="row.failNum" @click="() => currentApis.downHandle(row)") 下载
    Pagination(:pagination="tableApis.pagination")
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { formConfig, formData, columns } from './config'
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import Pagination from '@/components/qjd/pagination'
import useCurrent from './useCurrent'
import { getDaterange } from '@/utils/qjd'

export default {
  components: {
    Form,
    Table,
    Pagination,
  },
  setup() {
    // ref
    const formRef = ref()
    // ajax
    const { common: { dataExport: { detailList } } } = ajaxStore
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // table & page
    const tableApis = useTable({ request: detailList })
    // 当前逻辑
    const currentApis = useCurrent({ formApis })
    // table-查询
    const search = (params = {}) => {
      const { searchInfo } = tableApis ?? {}
      tableApis && tableApis.searchHandle(Object.assign(searchInfo, params))
    }
    // form-查询
    const searchHandle = () => {
      const { formData: { time, ...otherParams } } = formApis
      const { start, end } = getDaterange(time) ?? {}
      search({ ...otherParams, insStartTime: start ? `${start} 00:00:00` : null, insEndTime: end ? `${end} 23:59:59` : null, pageNo: 1 })
    }
    // 重置
    const resetHandle = () => {
      formApis.resetFormData()
      tableApis.resetHandle()
    }
    // state
    const state = reactive({ formApis, tableApis, currentApis })

    return {
      formRef,
      columns,
      search,
      searchHandle,
      resetHandle,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.custom_btns
  position: relative
  top -20px
</style>
