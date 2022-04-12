<template lang="pug">
div
  //- form
  Form.golbal_search_box(
    ref="formRef"
    :formData="formApis.formData"
    :formConfig="formApis.formConfig"
  )
    .global-search-btn
      el-button.search-button(type="primary", @click="searchHandle") 搜索
      el-button.search-button(@click="resetHandle") 重置
  div(style="background: #fff; padding: 20px;")
    //- 排序
    Sort(
      ref="sortRef"
      style="margin-bottom: 20px;"
      :options="options"
      :defaultSort="'createdTime'"
      @onChange="(params) => search(params)"
      @orderHandle="(params) => search(params)"
    )
    //- table
    Table(
      :columns="columns"
      :dataSource="tableApis.dataSource"
      :loading="tableApis.loading"
    )
    //- page
    Pagination(:pagination="tableApis.pagination")
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { formConfig, formData, columns, options } from './config'
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import Pagination from '@/components/qjd/pagination'
import Sort from '../../../components/sort'
import { getDaterange } from '@/utils/qjd'
// 应收总状态设置
import useStatus from '../useStatus'

export default {
  components: {
    Form,
    Table,
    Sort,
    Pagination,
  },
  props: {
    customerId: String
  },
  setup(props) {
    // ref
    const formRef = ref()
    const sortRef = ref()
    // ajax
    const { receive: { getReceivablePlanDataView } } = ajaxStore
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // useStatus
    useStatus({ formApis })
    // table
    const tableApis = useTable({ request: getReceivablePlanDataView, defaultParams: { customerId: props.customerId } })
    // table-查询
    const search = (params) => {
      const { searchInfo } = tableApis ?? {}
      tableApis && tableApis.searchHandle(Object.assign(searchInfo, params))
    }
    // form-查询
    const searchHandle = () => {
      const { formData: { time, ...otherParams } } = formApis
      const { start: lastEndDateStart, end: lastEndDateEnd } = getDaterange(time) ?? {}
      search({ ...otherParams, lastEndDateStart, lastEndDateEnd, pageNo: 1 })
    }
    // 重置
    const resetHandle = () => {
      formApis.resetHandle()
      const params = sortRef.value?.getSortVal() ?? {}
      tableApis && tableApis.resetHandle(params)
    }
    // state
    const state = reactive({ formApis, tableApis })

    return {
      formRef,
      sortRef,
      columns,
      options,
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
