<template lang="pug">
.page-main
  .container
    TopTotal(:totalInfo="totalInfo")
    //- form
    Form.golbal_search_box(
      ref="formRef"
      :formData="formState.formData",
      :formConfig="formState.formConfig"
    )
      .global-search-btn
        el-button.search-button(
          type="primary"
          @click="searchFormHandle"
          :loading="tableState.loading"
        ) 搜索
        el-button.search-button(@click="resetFormHandle") 重置
    div(style="background: #fff;")
      //- table
      div(style="padding: 20px")
        Table(
          :dataSource="tableState.dataSource"
          :columns="columns"
          :loading="tableState.loading"
        )
          template(slot='operate' slot-scope='{row}')
            //- 操作
            Operate(
              :dataSource="row"
            )
      Pagination(:pagination="tableState.pagination")
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import Operate from './operate'
import TopTotal from './topTotal'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { columns, cFormConfig, cFormData } from './config'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Operate,
    TopTotal
  },
  setup() {
    const formRef = ref()
    // ajax
    const { receive: { getCollectionOverviewData, getCollectionList } } = ajaxStore
    // form
    const formState = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig
    })
    // table & page
    const tableState = useTable({ request: getCollectionList })
    // state
    const state = reactive({
      formState,
      tableState,
      totalInfo: null
    })
    // 查询
    const searchFormHandle = () => formState.submitHandle().then(() => {
      const { formData: params } = formState
      tableState.searchHandle(params)
    })
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // 统计数据
    useAsync({
      request: getCollectionOverviewData,
      init: true,
      successCallBack: ({ code, data }) => {
        code === '0' && (state.totalInfo = data)
      }
    })

    return {
      formRef,
      columns,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle
    }
  },
}
</script>
