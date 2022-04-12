<template lang="pug">
.page-main
  Card(noTitle noWrap)
    CompanyNameBar(
      style='height: 120px;'
      :companyName='customerName'
      :listData='sumState.listData'
      v-loading='sumState.loading'
    )
      template(v-slot:cycle='{ data }')
        span.p-bar-cycle-content {{ data.content }}
        i.el-icon-edit.p-bar-cycle-edit(@click='clickEditCycle(data.cycle)')
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
    )
      template(slot='createdTime' slot-scope='{row}')
        span {{ toDateStr(row.createdTime, 'yyyy-MM-dd') }}
        span.p-current-period(v-if='row.isCurrentPeriod') 本期
      template(slot='operate' slot-scope='{row}')
        //- 操作
        el-button(type='text' @click='clickDetail(row)') 查看对账明细
    Pagination(:pagination='tableState.pagination')
  DialogCycle(
    :visible='dialogCycle.visible'
    :mode='dialogCycle.mode'
    :customerId='dialogCycle.customerId'
    :customerName='dialogCycle.customerName'
    :cycle='dialogCycle.cycle'
    @close='dialogCycle.visible = false'
    @success='sumState.doResult'
  )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import Card from '@/components/Card'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { toDateStr } from '@/utils/util'
import CompanyNameBar from '@/views/SupplyChain/Factory/Finance/components/companyNameBar/index'
import DialogCycle from '@/views/SupplyChain/Factory/Finance/components/dialogCycle'
import { columns, formConfig, formData, companyListData, fileUlr } from './config'
import useSum from './useSum'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Card,
    CompanyNameBar,
    DialogCycle,
  },
  setup(props, { root }) {
    const { customerId, customerName } = root?.$route?.query || {}
    const formRef = ref()
    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig
    })
    // table & page
    const tableState = useTable({
      request: ajaxStore.factory.finance.getPagedAccountCheck,
      defaultParams: {
        customerId
      },
      callback: (data) => {
        // 总记录的第一条显示本期
        if (data.pageNo === 1 && data.totalCount > 0) {
          data.pagedRecords[0].isCurrentPeriod = true
        }
        data.dataSource = data.pagedRecords
        return data
      }
    })

    // 查询
    const searchFormHandle = () => formState.submitHandle((data) => {
      const newDate = {}
      if (data.dateRange[0]) newDate.queryStartDate = data.dateRange[0] + ' 00:00:00'
      if (data.dateRange[1]) newDate.queryEndDate = data.dateRange[1] + ' 23:59:59'
      if (data.status) newDate.status = data.status
      tableState.searchHandle(newDate)
    })
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // 顶部统计
    const sumState = useSum({
      listData: companyListData,
      params: { customerId }
    })
    // state
    const state = reactive({
      customerName,
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
    // 点击编辑对账周期
    const clickEditCycle = (cycle) => {
      state.dialogCycle.mode = 'single'
      state.dialogCycle.visible = true
      state.dialogCycle.customerId = customerId
      state.dialogCycle.customerName = customerName
      state.dialogCycle.cycle = cycle
    }
    // 查看应收详情
    const clickDetail = (row) => window.open(`${fileUlr}?fileKey=${row.ossKey}`)

    return {
      formRef,
      columns,
      ...toRefs(state),
      toDateStr,
      searchFormHandle,
      resetFormHandle,
      clickEditCycle,
      clickDetail,
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-mg
  margin-top 10px
.p-bar-cycle-content
  color: #494949;
  font-size: 26px;
  font-weight: bold;
  line-height: 31px;
.p-bar-cycle-edit
  margin-left 6px
  font-size: 12px
  color #3B68F0
  cursor: pointer
.p-current-period
  padding 3px 7px
  margin-left 7px
  background #25BECD
  color #fff
</style>
