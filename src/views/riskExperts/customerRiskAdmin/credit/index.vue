<template lang="pug">
.page-main
  .p-header
    ListTabs(
      page='creditCustomerQuery'
      :tabConfig='assessmentTabs'
    )
  .credit-list(v-if='permissions["PTN:RISKEXPERTS:CREDITEVALUATION:CUSTOMER"]')
    Form.credit-list__form(
      ref="formRef"
      :formData="formData",
      :formConfig="formConfig"
      style="padding:20px"
    )
      .global-search-btn
        el-button.search-button(type="primary", @click="searchFormHandle" :loading="formLoading") 搜索
        el-button.search-button(@click="resetFormHandle") 重置
    .credit-list__table
      Table(
        :dataSource="dataSource",
        :columns="creditColumns",
        :loading="loading"
      )
        //- 关注
        template(slot="isNoticed" slot-scope="{row}" v-if='permissions["PTN:RISKEXPERTS:CREDITEVALUATION:CUSTOMER:ATTENTION"]')
          el-popconfirm(
            v-if="row.isNoticed === 'Y'"
            :title="'你确定要取消关注吗？'"
            @confirm="focusOn(row, 'CREDIT_ATTENT', 'cancel')"
          )
            el-button(
              type='text'
              slot='reference'
              :disabled="cancelFoucusLoading"
              v-weblogs.click='"客户风险查询-tab：赊销评估客户-列表操作-取消关注"'
            ) 取消关注
          el-button(
            v-else
            type="text"
            :disabled="focusLoading"
            @click="() => focusOn(row, 'CREDIT_ATTENT', 'focus')"
            v-weblogs.click='"客户风险查询-tab：赊销评估客户-列表操作-关注"'
          ) 关注
        //- operate
        template(slot="operate" slot-scope="{row}")
          el-button(
            type="text"
            v-if='row.evaluateResult && row.corporationName && permissions["PTN:RISKEXPERTS:CREDITEVALUATION:CUSTOMER:RESULT"]'
            @click="() => resultHandle(row)"
            v-weblogs.click='"客户风险查询-tab：赊销评估客户-列表操作-评估结果"'
          ) 评估结果
          el-button(
            type="text"
            @click="() => infoHandle(row)"
            v-if='permissions["PTN:RISKEXPERTS:CREDITEVALUATION:CUSTOMER:OPINION"]'
            v-weblogs.click='"客户风险查询-tab：赊销评估客户-列表操作-舆情信息"'
          ) 舆情信息
      Pagination(:pagination="pagination")
</template>
<script>
import { ref, toRefs, reactive } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import ListTabs from '../listTabs'
import { creditformData, creditformConfig, creditColumns, assessmentTabs } from '../config'
import { Message } from 'element-ui'
import store from '@/store'

export default {
  components: {
    Form,
    Table,
    Pagination,
    ListTabs
  },
  setup(props, { root }) {
    const {riskExperts: {customerRiskAdmin: { getCreditEvaluation, getListCustomer, riskexpertFoucus, riskexpertCancelFoucus }}} = ajaxStore
    const formRef = ref()
    // store
    const { state: { permissions } } = store
    if (!permissions['PTN:RISKEXPERTS:CREDITEVALUATION:CUSTOMER'] && !permissions['PTN:RISKEXPERTS:PROJECTEVALUATION:CUSTOMER']) {
      root.$message.error('您还未开通此项服务，请联系售前商务')
    }
    // form
    const {
      formData,
      formConfig,
      resetHandle,
      setConfig,
      submitHandle,
      loading: formLoading
    } = useForm({
      formRef,
      formData: creditformData,
      formConfig: creditformConfig(query => doResult({likeName: query}))
    })

    // 模糊搜索
    const { doResult} = useAsync({
      request: getListCustomer,
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
    } = useTable({ request: getCreditEvaluation })
    // 查询
    const searchFormHandle = () => {
      submitHandle(() => {
        const searchData = JSON.parse(JSON.stringify(formData.value))
        for (const i in searchData) {
          if (!searchData[i]) {
            delete searchData[i]
          }
        }
        searchHandle({ ...searchData })
      })
    }
    // 重置
    const resetFormHandle = () => {
      resetHandle()
      resetTableHandle()
    }
    // 评估结果
    const resultHandle = ({ corporationName, uniformCreditCode } = {row}) => root.$router.push({ name: 'creditCustomerResult', query: { name: corporationName, corporationId: uniformCreditCode } })

    // 舆情信息
    const infoHandle = ({ corporationName, uniformCreditCode } = {row}) => root.$router.push({ name: 'creditCustomerNews', query: { name: corporationName, corporationId: uniformCreditCode } })
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
        corporationName: data.corporationName,
        uniformCreditCode: data.uniformCreditCode
      }
      event === 'cancel' && _cancelfoucus(params)
      event === 'focus' && _foucus(params)
    }

    const state = reactive({assessmentTabs})

    return {
      permissions,
      formRef,
      formData,
      formConfig,
      creditColumns,
      searchFormHandle,
      resetFormHandle,
      resultHandle,
      infoHandle,
      focusOn,
      loading,
      focusLoading,
      cancelFoucusLoading,
      formLoading,
      dataSource,
      pagination,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.credit-list
  &__form
    background #fff
  &__table
    margin-top 10px
    padding 20px
    background #fff
</style>
