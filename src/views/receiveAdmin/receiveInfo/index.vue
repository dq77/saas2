<template lang="pug">
.page-main
  //- 累计总额
  Money
  //- 历史收款情况
  History
  //- form
  Form.golbal_search_box(
    ref="formRef"
    v-show="isSearch"
    :formData="formApis.formData",
    :formConfig="formApis.formConfig"
  )
    .global-search-btn
      el-button.search-button(type="primary", @click="searchHandle") 搜索
      el-button.search-button(@click="resetHandle") 重置
    i.el-icon-circle-close.close(@click="isSearch = false")
  div(style="background: #fff; padding: 20px;")
    .sort_box
      //- 排序
      Sort(
        ref="sortRef"
        style="margin-bottom: 20px;"
        :options="options"
        :defaultSort="'createdTime'"
        @onChange="(params) => search(params)"
        @orderHandle="(params) => search(params)"
      )
      el-button(
        type="text"
        style="margin-left: 10px;"
        @click="isSearch = !isSearch"
      ) 高级搜索
    //- table
    Table(
      :columns="columns"
      :dataSource="tableApis.dataSource"
      :loading="tableApis.loading"
      @buttonHandle="buttonHandle"
    )
    //- page
    Pagination(:pagination="tableApis.pagination")
    //- 详情
    Detail(
      :title="detailApis.title"
      :visible="detailApis.visible"
      :detail="detailApis.detail"
      @cancleHandle="detailApis.cancleHandle"
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
import Sort from '../components/sort'
import Money from './money/index.vue'
import History from './history/index.vue'
import { getDaterange } from '@/utils/qjd'
// 款项类型设置
import useFundType from '@/views/receiveAdmin/comInfo/detail/useFundType'
// 详情
import Detail from './detail/index.vue'
import useDetail from './detail/useDetail'

export default {
  components: {
    Money,
    History,
    Form,
    Table,
    Sort,
    Detail,
    Pagination,
  },
  setup(props, { root: { $router } }) {
    // ref
    const formRef = ref()
    const sortRef = ref()
    // 是否展示高级搜索
    const isSearch = ref(false)
    // ajax
    const { receive: { getReceiptsPaymentAllDataList } } = ajaxStore
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // detailApis
    const detailApis = useDetail()
    // useFundType
    useFundType({ formApis })
    // table
    const tableApis = useTable({ request: getReceiptsPaymentAllDataList })
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
    // 详情
    const buttonHandle = ({ row }) => detailApis.open(row?.id)
    // state
    const state = reactive({ formApis, tableApis, detailApis })

    return {
      formRef,
      sortRef,
      columns,
      options,
      isSearch,
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
.close
  position: absolute
  right: 0
  top -10px
  cursor pointer
  color #409EFF
  font-size 16px
.custom_btns
  position: relative
  top -20px
.sort_box
  display: flex
</style>
