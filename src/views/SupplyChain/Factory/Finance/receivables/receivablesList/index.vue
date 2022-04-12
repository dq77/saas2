<template lang="pug">
.page-main
  PromptInfo(title='您可以通过应收管理菜单，根据客户查询业务所发生的全部应收记录，同时可以查看客户应收对账记录和具体对账单详情。')
  Card(noTitle)
    GrayBlocks(:data='sumState.listData' v-loading='sumState.loading')
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
  Card.p-mg(noTitle)
    //- table
    Table(
      :dataSource='tableState.dataSource'
      :columns='columns'
      :loading='tableState.loading'
      @sortChange='sortChange'
    )
      template(slot='cycleHeader' slot-scope='{column}')
        span {{ column.label }}
        i.el-icon-edit-outline.p-edit-btn(@click='clickEditCycleAll')
      template(slot='cycle' slot-scope='{row}')
        span {{ row.cycle + '号' }}
        i.el-icon-edit-outline.p-edit-btn(@click='clickEditCycle(row)')
      template(slot='operate' slot-scope='{row}')
        //- 操作
        el-button(type='text' @click='clickReceivablesBookList(row)') 应收账簿
        el-button(type='text' @click='clickReceivablesCheckList(row)') 应收对账
    Pagination(:pagination='tableState.pagination')
  DialogCycle(
    :visible='dialogCycle.visible'
    :mode='dialogCycle.mode'
    :customerId='dialogCycle.customerId'
    :customerName='dialogCycle.customerName'
    :cycle='dialogCycle.cycle'
    @close='dialogCycle.visible = false'
    @success='searchFormHandle'
  )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import GrayBlocks from '@/components/GrayBlocks'
import PromptInfo from '@/views/SupplyChain/Factory/Components/PromptInfo'
import DialogCycle from '@/views/SupplyChain/Factory/Finance/components/dialogCycle'
import Card from '@/components/Card'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { columns, formConfig, formData, statistics } from './config'
import useSum from './useSum'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Card,
    PromptInfo,
    GrayBlocks,
    DialogCycle,
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
    const tableState = useTable({ request: ajaxStore.factory.finance.getPagedReceivables })

    // 查询
    const searchFormHandle = (sorted) => {
      formState.submitHandle(data => {
        const newData = {}
        if (data.likeCustomerName) newData.likeCustomerName = data.likeCustomerName
        if (sorted?.sortProp) newData[sorted.sortType] = sorted.sortProp
        tableState.searchHandle(newData)
      })
    }
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // 排序
    const sortChange = ({ prop, order }) => {
      let sortProp = null // 字段key
      let sortType = null // 排序类型，desc，asc
      if (order === 'ascending') {
        sortProp = prop
        sortType = 'asc'
      } else if (order === 'descending') {
        sortProp = prop
        sortType = 'desc'
      }
      searchFormHandle({ sortProp, sortType })
    }
    // 顶部统计
    const sumState = useSum({
      listData: statistics
    })
    // state
    const state = reactive({
      formState,
      tableState,
      sumState,
      dialogCycle: {
        visible: false,
        mode: 'all', // all表示修改全部经销商，single表示修改单个经销商
        customerId: '',
        customerName: '',
        cycle: null
      }
    })
    // 应收账簿
    const clickReceivablesBookList = (row) => root.$router.push({
      name: 'supplyChain_factory_finance_receivablesBookList',
      query: {
        customerId: row.customerId,
        customerName: row.customerName,
      }
    })
    // 应收对账
    const clickReceivablesCheckList = (row) => root.$router.push({
      name: 'supplyChain_factory_finance_accountCheckList',
      query: {
        customerId: row.customerId,
        customerName: row.customerName,
      }
    })
    // 批量修改对账周期
    const clickEditCycleAll = () => {
      state.dialogCycle.mode = 'all'
      state.dialogCycle.visible = true
    }
    // 修改某经销商的对账周期
    const clickEditCycle = (row) => {
      state.dialogCycle.mode = 'single'
      state.dialogCycle.visible = true
      state.dialogCycle.customerId = row.customerId
      state.dialogCycle.customerName = row.customerName
      state.dialogCycle.cycle = row.cycle
    }
    return {
      formRef,
      columns,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
      sortChange,
      clickReceivablesBookList,
      clickReceivablesCheckList,
      clickEditCycle,
      clickEditCycleAll,
    }
  },
}
</script>

<style lang="stylus">
.p-mg
  margin-top 10px
.p-edit-btn
  margin-left 4px
  color #3B68F0
  cursor: pointer
</style>
