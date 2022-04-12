<template lang="pug">
.page-main
  //- form
  Form.golbal_search_box(
    ref="formRef"
    :formData="formApis.formData",
    :formConfig="formApis.formConfig"
  )
    .global-search-btn-feed
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
      @buttonHandle="buttonHandle"
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
import Sort from '../components/sort'
import { getDaterange } from '@/utils/qjd'
// 应收总状态设置
import useStatus from '@/views/receiveAdmin/comInfo/detail/useStatus'
// 款项类型设置
import useFundType from '@/views/receiveAdmin/comInfo/detail/useFundType'

export default {
  components: {
    Form,
    Table,
    Sort,
    Pagination,
  },
  setup(props, { root: { $router } }) {
    // ref
    const formRef = ref()
    const sortRef = ref()
    // ajax
    const { receive: { getReceivablePaymentAllDataList } } = ajaxStore
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // useStatus
    useStatus({ formApis })
    // useFundType
    useFundType({ formApis })
    // table
    const tableApis = useTable({ request: getReceivablePaymentAllDataList })
    // table-查询
    const search = (params) => {
      const { searchInfo } = tableApis ?? {}
      tableApis && tableApis.searchHandle(Object.assign(searchInfo, params))
    }
    // form-查询
    const searchHandle = () => {
      const { formData: { time, ...otherParams } } = formApis
      const { start: planEndDateStart, end: planEndDateEnd } = getDaterange(time) ?? {}
      search({ ...otherParams, planEndDateStart, planEndDateEnd, pageNo: 1 })
    }
    // 重置
    const resetHandle = () => {
      formApis.resetHandle()
      const params = sortRef.value?.getSortVal() ?? {}
      tableApis && tableApis.resetHandle(params)
    }
    // 查看
    const buttonHandle = ({ row }) => $router.push({ name: 'payInfoDetail', query: { id: row?.id, saArmReceivablePlanId: row?.saArmReceivablePlanId } })
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
      buttonHandle,
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
