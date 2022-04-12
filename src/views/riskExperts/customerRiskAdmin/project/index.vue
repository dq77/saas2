<template lang="pug">
.page-main
  .p-header
    ListTabs(
      page='projectCustomerQuery'
      :tabConfig='assessmentTabs'
    )
    .project-list(v-if='permissions["PTN:RISKEXPERTS:PROJECTEVALUATION:CUSTOMER"]')
      Form.project-list__form(
        ref="formRef"
        :formData="formData",
        :formConfig="formConfig"
        style="padding:20px"
      )
        .global-search-btn
          el-button.search-button(type="primary", @click="searchFormHandle" :loading="formLoading") 搜索
          el-button.search-button(@click="resetFormHandle") 重置
      .project-list__table
        Table(
          :dataSource="dataSource",
          :columns="projectColumns",
          :loading="loading"
        )
          //- 关注
          template(slot="flag" slot-scope="{row}" v-if='permissions["PTN:RISKEXPERTS:PROJECTEVALUATION:CUSTOMER:ATTENTION"]')
            el-popconfirm(
              v-if="row.flag"
              :title="'你确定要取消关注吗？'"
              @confirm="focusOn(row, 'PROJECT_ATTENT', 'cancel')"
            )
              el-button(
                type='text'
                slot='reference'
                :disabled="cancelFoucusLoading"
                v-weblogs.click='"客户风险查询-tab：项目评估客户-列表操作-取消关注"'
              ) 取消关注
            el-button(
              v-else
              type="text"
              :disabled="focusLoading"
              @click="() => focusOn(row, 'PROJECT_ATTENT', 'focus')"
              v-weblogs.click='"客户风险查询-tab：项目评估客户-列表操作-关注"'
            ) 关注
          //- operate
          template(slot="operate" slot-scope="{row}")
            el-button(
              type="text"
              @click="() => resultHandle(row)"
              v-if='row.result && row.name && permissions["PTN:RISKEXPERTS:PROJECTEVALUATION:CUSTOMER:RESULT"]'
              v-weblogs.click='"客户风险查询-tab：项目评估客户-列表操作-评估结果"'
            ) 评估结果
            el-button(
              type="text"
              v-if='row.name && permissions["PTN:RISKEXPERTS:PROJECTEVALUATION:CUSTOMER:OPINION"]'
              @click="() => infoHandle(row)"
              v-weblogs.click='"客户风险查询-tab：项目评估客户-列表操作-预警信息"'
            ) 预警信息
        Pagination(:pagination="pagination")
</template>
<script>
import { ref } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import ListTabs from '../listTabs'
import { projectformData, projectformConfig, projectColumns, assessmentTabs } from '../config'
import store from '@/store'

export default {
  components: {
    Form,
    Table,
    Pagination,
    ListTabs
  },
  setup(props, { root }) {
    const {riskExperts: {customerRiskAdmin: { getProjectEvaluation, riskexpertFoucus, riskexpertCancelFoucus, getNameList }}} = ajaxStore
    const formRef = ref()
    // store
    const { state: { permissions } } = store
    // form
    const {
      formData,
      formConfig,
      resetHandle,
      setConfig,
      submitHandle,
      loading: formLoading,
    } = useForm({
      formRef,
      formData: projectformData,
      formConfig: projectformConfig(query => doResult({name: query}))
    })

    const { doResult } = useAsync({
      request: getNameList,
      init: false,
      successCallBack: ({ data }) => {
        setConfig('name', 'options', data)
      },
    })

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({ request: getProjectEvaluation, defaultParams: {isDistinct: 1}, })
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
        searchHandle({...params, ...timeParams})
      })
    }
    // 重置
    const resetFormHandle = () => {
      resetHandle()
      resetTableHandle()
    }

    // 评估结果
    const resultHandle = ({ name, uniformCreditCode } = {row}) => root.$router.push({ name: 'projectCustomerResult', query: { name, corporationId: uniformCreditCode } })
    // 预警信息
    const infoHandle = ({ name, uniformCreditCode } = {row}) => root.$router.push({ name: 'projectCustomerWarning', query: { name, corporationId: uniformCreditCode } })
    // 关注
    const { doResult: _foucus, loading: focusLoading} = useAsync({
      request: riskexpertFoucus,
      init: false,
      successCallBack: ({ code, data }) => {
        code === '0' && Message.success('操作成功')
        code === '0' && searchFormHandle()
      },
    })
    // 取消关注
    const { doResult: _cancelfoucus, loading: cancelFoucusLoading} = useAsync({
      request: riskexpertCancelFoucus,
      init: false,
      successCallBack: ({ code, data }) => {
        code === '0' && Message.success('操作成功')
        code === '0' && searchFormHandle()
      },
    })
    const focusOn = (data, attentType, event) => {
      const params = {
        attentType,
        corporationName: data.name,
        uniformCreditCode: data.uniformCreditCode
      }
      event === 'cancel' && _cancelfoucus(params)
      event === 'focus' && _foucus(params)
    }

    return {
      permissions,
      formRef,
      formData,
      formConfig,
      projectColumns,
      assessmentTabs,
      searchFormHandle,
      resetFormHandle,
      resultHandle,
      infoHandle,
      focusOn,
      focusLoading,
      cancelFoucusLoading,
      formLoading,
      loading,
      dataSource,
      pagination,
    }
  },
}
</script>
<style lang="stylus" scoped>
.project-list
  &__form
    background #fff
  &__table
    margin-top 10px
    padding 20px
    background #fff
</style>
