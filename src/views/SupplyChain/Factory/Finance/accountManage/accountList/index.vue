<template lang="pug">
.page-main
  PromptInfo(title='在下游账户管理菜单中，您可以查看客户在多账户下的账户余额及明细，同时可以进行出入账的管理。')
  Card(noTitle)
    GrayBlocks(:data='statistics' v-loading='sumLoading')
  Card.p-mg(noTitle useFor='search')
    //- form
    Form(
      ref='formRef'
      :formData='formState.formData',
      :formConfig='formState.formConfig'
    )
      .global-search-btn
        el-button.search-button(
          type='primary'
          @click='searchFormHandle'
          :loading='tableState.loading'
        ) 搜索
        el-button.search-button(@click='resetFormHandle') 重置
  Card.p-mg(noTitle noWrap v-show='guideState.status === "show"')
    Guide
  Card.p-mg(noTitle v-show='guideState.status === "hide"')
    //- table
    Table(
      :dataSource='tableState.dataSource'
      :columns='tableState.columns'
      :loading='tableState.loading'
    )
      template(slot='operate' slot-scope='{row}')
        //- 操作
        div
          el-button(type='text' @click='operateState.clickAccountDetail(row)') 账户明细
          el-button(type='text' @click='operateState.clickAccountConfig(row)') 账户配置
        div
          el-button(type='text' @click='operateState.clickEnterAccount(row)') 入账管理
          el-button(type='text' @click='operateState.clickExpenseAccount(row)') 出账管理
    Pagination(:pagination='tableState.pagination')
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import GrayBlocks from '@/components/GrayBlocks'
import Card from '@/components/Card'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'
import PromptInfo from '@/views/SupplyChain/Factory/Components/PromptInfo.vue'
import { columns, formConfig, formData, statistics } from './config'
import useStatictics from './useStatictics'
import useOperate from './useOperate'
import Guide from './guide'
import useGuide from './useGuide'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Card,
    PromptInfo,
    GrayBlocks,
    Guide,
  },
  setup(props, { root }) {
    const formRef = ref()
    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig
    })
    // table & page
    const tableState = useTable({
      columns,
      request: ajaxStore.factory.finance.getPagedAccount,
      isActiveColumn: true,
      callback: (data) => {
        data.pagedRecords.forEach(row => {
          row?.accountDetailResponses?.length && row.accountDetailResponses.forEach(acc => {
            row[acc.accountTypeCode] = acc.amountBalance
          })
        })
        data.dataSource = data.pagedRecords
        return data
      }
    })
    // 操作列
    const operateState = useOperate()
    // 引导状态
    const guideState = useGuide()

    // 查询
    const searchFormHandle = () => formState.submitHandle(tableState.searchHandle)
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // state
    const state = reactive({
      formState,
      tableState,
      operateState,
      statistics,
      guideState,
    })
    // 顶部统计
    const { loading: sumLoading } = useStatictics({
      listData: state.statistics
    })

    // 动态获得表格列
    useAsync({
      request: ajaxStore.factory.finance.getAccountTypeAllList,
      successCallBack: (res) => {
        if (res?.code === '0') {
          const originList = res.data
          // 将内置账户排在最前面
          const baseAccount = originList.splice(originList.findIndex(item => item.type === 0) || 0, 1)
          baseAccount.length && originList.unshift(baseAccount[0])
          const accountColumns = originList.map(item => {
            return {
              label: `${item.accountTypeName}总余额(元)`,
              key: item.accountTypeCode,
              minWidth: 100,
              align: 'right',
              render: (row, value) => toAmountStr(value, 2, true) || '- -'
            }
          })
          const newColumns = columns.slice(0, 4).concat(accountColumns, [columns[4]])
          tableState.setColumns(newColumns)
        }
      }
    })

    return {
      formRef,
      sumLoading,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
    }
  },
}
</script>

<style lang="stylus">
.p-mg
  margin-top 10px
</style>
