<template lang="pug">
.page-main
  .p-header
    ListTabs(
      page='riskEvent'
      :tabConfig='newsRemindTabs'
    )
  .risk-list(v-if='permissions["PTN:RISKEXPERTS:PUBLICOPINION:RISKEVENT"]')
    Form.risk-list__form(
      ref="formRef"
      :formData="formData",
      :formConfig="formConfig"
      style="padding:20px"
    )
      .global-search-btn
        el-button.search-button(type="primary", @click="searchFormHandle") 搜索
        el-button.search-button(@click="resetFormHandle") 重置
    .risk-list__table
      Table(
        :dataSource="dataSource",
        :columns="riskColumns",
        :loading="loading"
        row-key="index"
      )
      Pagination(:pagination="pagination")
</template>
<script>
import { ref } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import ListTabs from '../customerRiskAdmin/listTabs'
import { riskformData, riskformConfig, riskColumns, newsRemindTabs } from './config'
import { weblogsDom } from '@/utils/qjd/weblogs'
import store from '@/store'

export default {
  components: {
    Form,
    Table,
    Pagination,
    ListTabs
  },
  setup(props, { root }) {
    const {riskExperts: {newsRemind: { getListByMemberPage, getCorporationList }}} = ajaxStore
    const formRef = ref()
    const { state: { permissions } } = store
    // form
    const {
      formData,
      formConfig,
      resetHandle,
      setConfig,
      submitHandle,
    } = useForm({
      formRef,
      formData: riskformData,
      formConfig: riskformConfig(query => doResult({corporationName: query}))
    })

    // 模糊搜索
    const { doResult} = useAsync({
      request: getCorporationList,
      init: false,
      successCallBack: ({ data }) => {
        setConfig('corporationName', 'options', data)
      },
    })

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({
      request: getListByMemberPage
    })
    // 查询
    const searchFormHandle = () => {
      submitHandle(() => {
        const searchData = formData.value || {}
        const { time } = searchData
        const params = {...searchData}
        const timeParams = {}
        if (time) {
          timeParams.queryStartDate = time[0]
          timeParams.queryEndDate = time[1]
          delete params.time
        }
        for (const i in params) {
          if (!params[i]) {
            delete params[i]
          }
        }
        weblogsDom('舆情订阅信息-tab：风险事件-条件搜索（每个搜索项是否录入）、搜索按钮', params)
        searchHandle({...params, ...timeParams})
      })
    }
    // 重置
    const resetFormHandle = () => {
      resetHandle()
      resetTableHandle()
    }

    return {
      permissions,
      formRef,
      formData,
      formConfig,
      riskColumns,
      newsRemindTabs,
      searchFormHandle,
      resetFormHandle,
      loading,
      dataSource,
      pagination,
    }
  },
}
</script>
<style lang="stylus" scoped>
.risk-list
  &__form
    background #fff
  &__table
    margin-top 10px
    padding 20px
    background #fff
  &__button
    margin-bottom 10px
    .current
      color #fff
      background-color #3b68f0
      border-color #3b68f0
</style>
