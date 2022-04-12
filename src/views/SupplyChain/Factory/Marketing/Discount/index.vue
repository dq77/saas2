<template lang="pug">
.page-main
  Header(:totalInfo="totalInfo")
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
    //- button
    el-button(
      type="primary"
      style="margin: 20px 20px 0 20px"
      @click="createActivity"
    ) 创建活动
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
            @closeSuccess="handleClose"
          )
    Pagination(:pagination="tableState.pagination")
</template>

<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Header from './components/header/index.vue'
import Form from '@/components/qjd/form/index.vue'
import Table from '@/components/qjd/table/index.vue'
import Pagination from '@/components/qjd/pagination/index.vue'
import Operate from './components/operate/index.vue'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { columns, formConfig, formData } from './config'
export default {
  components: {
    Header,
    Form,
    Table,
    Pagination,
    Operate
  },
  setup(props, {root: { $router } }) {
    const formRef = ref()
    // ajax
    const { factory: { getActivityList, getStatusCount } } = ajaxStore
    // form
    const formState = useForm({
      formRef,
      formData: formData,
      formConfig: formConfig
    })
    // table & page
    const tableState = useTable({ request: getActivityList })
    // state
    const state = reactive({
      formState,
      tableState,
      totalInfo: null
    })
    // 关闭成功
    const handleClose = () => {
      searchFormHandle()
      doResult()
    }
    // 查询
    const searchFormHandle = () => formState.submitHandle().then(() => {
      const { formData: params } = formState
      tableState.resetHandle(params)
    })
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // 统计数据
    const {doResult } = useAsync({
      request: getStatusCount,
      init: true,
      successCallBack: ({ code, data }) => {
        code === '0' && (state.totalInfo = data)
      }
    })
    // methods
    const createActivity = () => $router.push({ name: 'CreateActivity' })
    return {
      formRef,
      columns,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
      createActivity,
      handleClose
    }
  },
}
</script>
<style lang="stylus" scoped>
.row
  background-color #fff
  padding 20px
  margin-bottom 10px
  >.col:not(:last-child)
    padding-right 10px
</style>


