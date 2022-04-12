<template lang="pug">
.page-main
  //- 累计总额
  Money(:dataSource="currentApis.dataSource" v-loading="currentApis.loading")
  //- 当前逾期分布情况
  Chart(:dataSource="currentApis.dataSource")
  //- form
  Form.golbal_search_box(
    ref="formRef"
    v-show="isSearch"
    :formData="formApis.formData",
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
import Money from './money/index.vue'
import Chart from './chart/index.vue'
import useCurrent from './useCurrent'
import { getDaterange } from '@/utils/qjd'
// 款项类型设置
import useFundType from '@/views/receiveAdmin/comInfo/detail/useFundType'

export default {
  components: {
    Form,
    Table,
    Sort,
    Pagination,
    Money,
    Chart
  },
  setup() {
    // ref
    const formRef = ref()
    const sortRef = ref()
    // 是否展示高级搜索
    const isSearch = ref(false)
    // ajax
    const { receive: { getOverdueAllDataList } } = ajaxStore
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // table
    const tableApis = useTable({ request: getOverdueAllDataList })
    // useFundType
    useFundType({ formApis })
    // useCurrent
    const currentApis = useCurrent()
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
    const state = reactive({ formApis, tableApis, currentApis })

    return {
      formRef,
      sortRef,
      columns,
      options,
      isSearch,
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
.close
  position: absolute
  right: 0
  top -10px
  cursor pointer
  color #409EFF
  font-size 16px
.custom_form_item
  width: 100%
  display: flex
  justify-content: space-between
.custom_btns
  position: relative
  top -20px
.sort_box
  display: flex
</style>
