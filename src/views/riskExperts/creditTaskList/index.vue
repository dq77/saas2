<template lang="pug">
.page-main
  .p-header
    ListTabs(page='creditTaskList')
  .rm-detail(v-if='permissions["PTN:RISKEXPERTS:CREDITEVALUATION:TASK"]')
    .rmd-list
      Form.rmd-list__form(
        ref="formRef"
        :formData="formData",
        :formConfig="formConfig"
      )
        .global-search-btn
          el-button.search-button(type="primary", @click="searchFormHandle", :loading="formLoading") 搜索
          el-button.search-button(@click="resetFormHandle") 重置
      .rmd-list__table
        .rmd-list__button
          el-button(type='primary' @click='startCreditEvaluation' v-weblogs.click='"评估任务管理-tab：赊销评估任务-发起赊销评估"' v-if='permissions["PTN:RISKEXPERTS:CREDITEVALUATION:MANAGE"]') 发起赊销评估
        Table(ref='tableRef' :dataSource="dataSource || []", :columns="collectionColumns", :loading="tableLoading")
          template(slot='operate' slot-scope='{row}' )
            Operate(:dataSource='row' @checkDetail='checkDetail')
      Pagination.rmd-pagination(:pagination="pagination")
      DetailDialog(:dialogShow='detailShow' @close='checkDetail' :taskId='currentTaskId' :mode='currentMode')
</template>

<script>
import { ref, reactive, toRefs, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import Operate from './operate'
import ListTabs from '../components/listTabs'
import DetailDialog from './detailDialog'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import useTimeout from 'hooks/useTimeout'
import { cFormData, getFormConfig, collectionColumns } from './config'
import { weblogsDom } from '@/utils/qjd/weblogs'
import store from '@/store'

export default {
  components: { Form, Table, Pagination, ListTabs, DetailDialog, Operate },
  setup(props, { root }) {
    // store
    const { state: { permissions } } = store
    if (!permissions['PTN:RISKEXPERTS:CREDITEVALUATION:TASK']) {
      if (permissions['PTN:RISKEXPERTS:PROJECTEVALUATION:TASK']) {
        root.$router.replace({
          name: 'projectTaskList'
        })
      } else {
        root.$message.error('您还未开通此项服务，请联系售前商务')
      }
    }
    // 基础数据
    const state = reactive({
      detailShow: false,
      currentTaskId: '',
      currentMode: ''
    })

    const { perTimeout } = useTimeout()

    // ref
    const tableRef = ref()
    const formRef = ref()
    // 接口
    const { getCreditTaskList, getCustomerList } = ajaxStore.riskExperts.creditEvaluation

    // 搜索功能中的客户名称的模糊查询
    const getCustomerOptions = (query, key, config) => {
      console.log('abc')
      useAsync({
        request: getCustomerList,
        params: { likeName: query},
        successCallBack: (res) => {
          if (res?.code === '0') {
            config.options = res?.data ?? []
          }
        }
      })
    }

    // form
    const {
      formData,
      formConfig,
      submitHandle,
      resetHandle,
      loading: formLoading,
      setFormItem,
      setFormData
    } = useForm({
      formRef,
      formData: cFormData,
      formConfig: getFormConfig({getCustomerOptions}),
    })

    // table & page
    const {
      loading: tableLoading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({ request: getCreditTaskList, isInit: false })

    // 查询
    const searchFormHandle = () => {
      submitHandle(() => {
        const data = JSON.parse(JSON.stringify(formData.value))
        if (data?.time) {
          data.initStarTime = data?.time?.[0]
          data.initEndTime = data?.time?.[1]
        }
        delete data.time
        for (const i in data) {
          if (!data[i]) {
            delete data[i]
          }
          if (data[i] && !data[i].length) {
            delete data[i]
          }
        }
        weblogsDom('评估任务管理-tab：赊销评估任务-条件搜索（每个搜索项是否录入）、搜索按钮', data)
        searchHandle({ ...data })
      })
    }
    // 重置
    const resetFormHandle = () => {
      setFormData({})
      resetHandle()
      resetTableHandle()
    }
    // 发起赊销评估
    const startCreditEvaluation = () => {
      root.$router.push({
        name: 'chooseCreditMode'
      })
    }
    const checkDetail = (taskId, mode) => {
      state.currentMode = mode || ''
      state.currentTaskId = taskId || ''
      state.detailShow = !!taskId
    }

    // 从url接收参数回填
    let { evaluateMode, evaluateStatus } = root.$route.query
    evaluateMode && setFormItem('evaluateMode', evaluateMode)
    if (typeof evaluateStatus === 'string' && evaluateStatus) { evaluateStatus = evaluateStatus.split() }
    setFormItem('evaluateStatusList', evaluateStatus)
    perTimeout(() => {
      searchFormHandle()
    })


    watch(
      () => dataSource.value,
      (value) => {
        root.$nextTick(() => {
          tableRef && tableRef.value.doLayout()
        })
      }
    )

    return {
      permissions,
      formLoading,
      ...toRefs(state),
      // form table
      tableRef,
      formRef,
      tableLoading,
      formData,
      formConfig,
      searchFormHandle,
      resetFormHandle,
      dataSource,
      pagination,
      collectionColumns,
      startCreditEvaluation,
      checkDetail,
    }
  }
}
</script>

<style lang="stylus" scoped>
.rmd-total
  padding 20px
  margin-bottom 10px
  background #fff
  border-radius 4px
.rmd-list
  border-radius 4px
  overflow hidden
  &__form
    padding 20px
    margin-bottom 10px
    background #fff
  &__button
    display flex
    align-items center
    margin-bottom 20px
    background #fff
  &__table
    background #fff
    padding 20px
.rmd-pagination
  margin-top 0
  background #fff
</style>
