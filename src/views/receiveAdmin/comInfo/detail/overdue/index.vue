<template lang="pug">
div
  //- form
  Form.golbal_search_box(
    ref="formRef"
    :formData="formApis.formData"
    :formConfig="formApis.formConfig"
  )
    template(slot="overDays")
      .custom_form_item
        el-input-number(v-model="formApis.formData.overdueDaysMin" :min="0" controls-position="right" style="width: 45%" @change="inputChange")
        span(style="margin: 0 10px;") -
        el-input-number(v-model="formApis.formData.overdueDaysMax" :min="formApis.formData.overdueDaysMin" controls-position="right" style="width: 45%")
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
// 款项类型设置
import useFundType from '../useFundType'

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
    const { receive: { getOverdueDataView } } = ajaxStore
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // useFundType
    useFundType({ formApis })
    // table
    const tableApis = useTable({ request: getOverdueDataView, defaultParams: { customerId: props.customerId } })
    // table-查询
    const search = (params) => {
      const { searchInfo } = tableApis ?? {}
      tableApis && tableApis.searchHandle(Object.assign(searchInfo, params))
    }
    // form-查询
    const searchHandle = () => {
      const { formData: { plainTime, ...otherParams } } = formApis
      const { start: planEndDateStart, end: planEndDateEnd } = getDaterange(plainTime) ?? {}
      search({ ...otherParams, planEndDateStart, planEndDateEnd, pageNo: 1 })
    }
    // 重置
    const resetHandle = () => {
      formApis.resetHandle()
      formApis.resetFormData()
      const params = sortRef.value?.getSortVal() ?? {}
      tableApis && tableApis.resetHandle(params)
    }
    // inputChange
    const inputChange = val => {
      const { formData: { overdueDaysMax } } = formApis
      Number(val) > Number(overdueDaysMax) && formApis.setFormItem('overdueDaysMax', val)
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
      inputChange,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.custom_btns
  position: relative
  top -20px
.custom_form_item
  width: 100%
  display: flex
  justify-content: space-between
</style>
