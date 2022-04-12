<template lang="pug">
.page-main
  //- form
  Form.golbal_search_box(
    ref="formRef"
    :formData="formState.formData",
    :formConfig="formState.formConfig"
  )
    .global-search-btn-feed
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
        @sortChange="sortChange"
      )
        template(slot='operate' slot-scope='{row}')
          //- 操作
          Operate(
            :dataSource="row"
            @successHandle="tableState.searchHandle(tableState.searchInfo)"
            @changeCreditHandle="detail => changeApis.open(detail)"
            @expireCreditHandle="detail => expireApis.open(detail)"
          )
    Pagination(:pagination="tableState.pagination")
    // 变更授信
    ChangeCredit(
      :title="changeApis.title"
      :visible="changeApis.visible"
      :detail="changeApis.detail"
      @cancleHandle="changeApis.cancleHandle"
      @successHandle="tableState.searchHandle(tableState.searchInfo)"
    )
    // 失效授信
    ExpireCredit(
      :title="expireApis.title"
      :visible="expireApis.visible"
      :detail="expireApis.detail"
      @cancleHandle="expireApis.cancleHandle"
      @successHandle="tableState.searchHandle(tableState.searchInfo)"
    )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import Operate from './components/operate'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { columns, cFormConfig, cFormData } from './config'
import { orderVals } from '@/consts'
import { uppertoline } from '@/utils/qjd'
// 变更授信
import ChangeCredit from './changeCredit'
import useChange from './changeCredit/useChange'
// 失效授信
import ExpireCredit from './expireCredit'
import useExpire from './expireCredit/useExpire'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Operate,
    ChangeCredit,
    ExpireCredit
  },
  setup() {
    const formRef = ref()
    const {
      credit: { getCreditAccountList },
      common: { getDictList }
    } = ajaxStore
    // form
    const formState = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig
    })
    // table & page
    const tableState = useTable({ request: getCreditAccountList })
    // 获取授信状态
    useAsync({
      request: getDictList,
      params: { dictCategoryCode: 'credit_status' },
      successCallBack: ({ code, data }) => code === '0' && formState.setConfig('creditStatus', 'options', data || [])
    })
    // 获取授信类型
    useAsync({
      request: getDictList,
      params: { dictCategoryCode: 'credit_type' },
      successCallBack: ({ code, data }) => code === '0' && formState.setConfig('creditType', 'options', data || [])
    })
    // 查询
    const searchFormHandle = () => formState.submitHandle().then(() => {
      const { formData: { time, ...others } } = formState
      let params = {}
      if (time && time.length) {
        params.queryStartDate = time[0]
        params.queryEndDate = time[1]
      }
      params = { ...params, ...others }
      tableState.searchHandle(params)
    })
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // 排序
    const sortChange = ({ prop, order }) => tableState.searchHandle({ ...tableState.searchInfo, sortField: order ? uppertoline(prop) : null, sortBy: orderVals[order] })
    // 变更授信
    const changeApis = useChange()
    // 失效授信
    const expireApis = useExpire()
    // state
    const state = reactive({ formState, tableState, changeApis, expireApis })

    return {
      formRef,
      columns,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
      sortChange
    }
  },
}
</script>
