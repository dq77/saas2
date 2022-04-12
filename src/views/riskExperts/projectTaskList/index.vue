<template lang="pug">
.page-main
  .p-header
    ListTabs(page='projectTaskList')
  .rm-detail(v-if='permissions["PTN:RISKEXPERTS:PROJECTEVALUATION:TASK"]')
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
          el-button(type='primary' @click='startProjectEvaluation' v-weblogs.click='"评估任务管理-tab：项目评估任务-发起项目评估"') 发起项目评估
        Table(:dataSource="dataSource || []", :columns="collectionColumns", :loading="tableLoading")
          template(slot='operate' slot-scope='{row}')
            Operate(:dataSource='row' @searchHandle='searchFormHandle')
      Pagination.rmd-pagination(:pagination="pagination")
</template>

<script>
import { ref, reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import ListTabs from '../components/listTabs'
import Operate from './operate'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useTimeout from 'hooks/useTimeout'
import { cFormData, getFormConfig, collectionColumns } from './config'
import { weblogsDom } from '@/utils/qjd/weblogs'
import store from '@/store'

export default {
  components: { Form, Table, Pagination, ListTabs, Operate },
  setup(props, { root }) {
    // store
    const { state: { permissions } } = store
    if (!permissions['PTN:RISKEXPERTS:PROJECTEVALUATION:TASK']) {
      if (permissions['PTN:RISKEXPERTS:CREDITEVALUATION:TASK']) {
        root.$router.replace({
          name: 'creditTaskList'
        })
      } else {
        root.$message.error('您还未开通此项服务，请联系售前商务')
      }
    }
    // 基础数据
    const state = reactive({

    })

    // ref
    const formRef = ref()
    // 接口
    const { getProjectTaskList } = ajaxStore.riskExperts.projectEvaluation

    // form
    const {
      formData,
      formConfig,
      submitHandle,
      resetHandle,
      setFormItem,
      loading: formLoading
    } = useForm({
      formRef,
      formData: cFormData,
      formConfig: getFormConfig,
    })

    // table & page
    const {
      loading: tableLoading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({ request: getProjectTaskList })

    // 查询
    const searchFormHandle = () => {
      submitHandle(() => {
        const data = JSON.parse(JSON.stringify(formData.value))
        if (data?.insDatetime) {
          data.insDatetimeFrom = data?.insDatetime?.[0]
          data.insDatetimeTo = data?.insDatetime?.[1]
        }
        if (data?.resultTime) {
          data.resultTimeFrom = data?.resultTime?.[0]
          data.resultTimeTo = data?.resultTime?.[1]
        }
        delete data.resultTime
        delete data.insDatetime
        for (const i in data) {
          if (!data[i]) {
            delete data[i]
          }
        }
        weblogsDom('评估任务管理-tab：项目评估任务-条件搜索（每个搜索项是否录入）、搜索按钮', data)
        searchHandle({ ...data })
      })
    }
    // 重置
    const resetFormHandle = () => {
      resetHandle()
      resetTableHandle()
    }
    // 发起赊销评估
    const startProjectEvaluation = () => {
      root.$router.push({
        name: 'projectAssess'
      })
    }

    const { perTimeout } = useTimeout()

    // 从url接收参数回填
    const { type, status } = root.$route.query
    type && setFormItem('type', type)
    status && setFormItem('status', status.join())
    perTimeout(() => {
      searchFormHandle()
    })


    return {
      permissions,
      formLoading,
      ...toRefs(state),
      // form table
      formRef,
      tableLoading,
      formData,
      formConfig,
      searchFormHandle,
      resetFormHandle,
      dataSource,
      pagination,
      collectionColumns,
      startProjectEvaluation,
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
