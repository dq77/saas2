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
      @buttonHandle="({ row }) => modalApis.open(row.id)"
    )
    //- page
    Pagination(:pagination="tableApis.pagination")
  Modal(
    :visible="modalApis.visible"
    :title="modalApis.title"
    :detail="modalApis.detail"
    @cancleHandle="modalApis.cancleHandle"
  )
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
// 款项类型设置
import useFundType from '../useFundType'
// 附件详情
import Modal from './modal'
import useModal from './modal/useModal'

export default {
  components: {
    Form,
    Table,
    Sort,
    Pagination,
    Modal
  },
  props: {
    customerId: String
  },
  setup(props) {
    // ref
    const formRef = ref()
    const sortRef = ref()
    // ajax
    const { receive: { getReceiptsPaymentDataView } } = ajaxStore
    // useModal
    const modalApis = useModal()
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // useFundType
    useFundType({ formApis })
    // table
    const tableApis = useTable({ request: getReceiptsPaymentDataView, defaultParams: { customerId: props.customerId } })
    // table-查询
    const search = (params) => {
      const { searchInfo } = tableApis ?? {}
      tableApis && tableApis.searchHandle(Object.assign(searchInfo, params))
    }
    // form-查询
    const searchHandle = () => {
      const { formData: { plainTime, receiveTime, ...otherParams } } = formApis
      const { start: planEndDateStart, end: planEndDateEnd } = getDaterange(plainTime) ?? {}
      const { start: repaymentDataStart, end: repaymentDataEnd } = getDaterange(receiveTime) ?? {}
      search({ ...otherParams, planEndDateStart, planEndDateEnd, repaymentDataStart, repaymentDataEnd, pageNo: 1 })
    }
    // 重置
    const resetHandle = () => {
      formApis.resetHandle()
      const params = sortRef.value?.getSortVal() ?? {}
      tableApis && tableApis.resetHandle(params)
    }
    // state
    const state = reactive({ formApis, tableApis, modalApis })

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
