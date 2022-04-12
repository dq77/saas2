<template lang="pug">
.page-main.page-layout-approval(v-loading='isLoading')
  .page-layout-approval-title 收款审批
  ul.page-layout-approval-desc-list
    li 发起人：{{ approvalInfo.beginnerChName }}
    li 审批编号：{{ $route.query.processInstanceId }}
    li 流程提交时间：{{ approvalInfo.CREATE_TIME | toDateStr('yyyy-MM-dd hh:mm:ss') }}
  .page-layout-approval-content
    el-collapse(:value='[1, 2, 3]')
      el-collapse-item(:name='1', title='收款信息')
        table.table.table-layout-main
          tr
            th 收款编号：
            td {{approvalInfo.journalNo || '- -'}}
            th 收款来源：
            td {{approvalInfo.customerName || '- -'}}
          tr
            th 收款金额：
            td {{approvalInfo.amount | toAmountStr(2, true) || '- -'}}
            th
            td
  process-component(:config='config', @changeType="changeType")
    .p-process-table(slot='slot1', slot-scope='{row}')
      div(v-if='row.isCurrent')
        .process-title 保证金设置
        .bond-config
          .bond-config-item
            p 保证金类型
            .bond-config-item-change
              .bond-config-item-box
                el-select.p-width(v-model='claimType', style="width: 300px;", :class="isTypeShow ? 'bond-config-warning' : ''")
                  el-option(v-for='(item, key) in bondTypeList' :key='item.label' :label='item.label' :value='item.key')
                span.bond-config-item-info(v-show="isTypeShow") 请选择保证金类型
          .bond-config-item
            p 金额设置
            .bond-config-item-change
              .bond-config-item-box
                el-input-number(v-model='claimAmount', placeholder="请输入金额", controls-position="right", :precision='2', :step='1', :min='0', style="width: 300px; margin-right: 5px;", :class="isMoneyShow ? 'bond-config-warning' : ''")
                span 元
                span.bond-config-item-info(v-show="isMoneyShow") 额度不足
        .process-title 还款设置
        el-table(:data='tableData' v-loading='tableLoading' border max-height='800px' @selection-change='checkOrder')
          el-table-column(type="selection")
          //- el-table-column(prop="creditTypeName" label="授信类型")
          el-table-column(prop="extOrderCode" label="订单编号" width='260')
          el-table-column(prop="extDeliveryCode" label="发货编号" width='260')
          el-table-column(prop="debtEndTime" label="最后还款时间")
            template(slot-scope='{row}') {{ row.debtEndTime | toDateStr('yyyy-MM-dd') }}
          el-table-column(prop="loanAmount" label="总赊销金额" align="right")
          el-table-column(prop="leftToReturnAmount" label="剩余待还金额" align="right")
          el-table-column(prop="money" label="本次还款金额")
            template(slot-scope='{row}')
              el-input-number(
                :style="`width: ${tableData.length > 18 ? '90%' : '100%'}`"
                v-model="row.money"
                controls-position="right"
                :min="0"
                :max="row.leftToReturnAmount"
                :precision="2"
                @change="onChange"
              )
        .p-process-foot
          .p-process-total 还款总额:
            span {{toAmountStr(total, 2, true)}}
          .p-process-surplus
            .p-process-tip(v-if='surplus < 0')
              i.el-icon-warning
              span 余额不足
            .p-process-surplus-amount 剩余额度:
              span {{toAmountStr(surplus, 2, true)}}
      div(v-else)
        .process-title 保证金设置
        .bond-config
          .bond-config-item
            p 保证金类型
            .bond-config-item-change
              .bond-config-item-box
                el-select.p-width(v-model='claimType', style="width: 300px;", :class="isTypeShow ? 'bond-config-warning' : ''", disabled)
                  el-option(v-for='(item, key) in bondTypeList' :key='item.label' :label='item.label' :value='item.key')
                span.bond-config-item-info(v-show="isTypeShow") 请选择保证金类型
          .bond-config-item
            p 金额设置
            .bond-config-item-change
              .bond-config-item-box
                el-input-number(v-model='claimAmount', disabled, placeholder="请输入金额", controls-position="right", :precision='2', :step='1', :min='0', style="width: 300px; margin-right: 5px;", :class="isMoneyShow ? 'bond-config-warning' : ''")
                span 元
                span.bond-config-item-info(v-show="isMoneyShow") 额度不足
        .process-title 还款设置
        el-table(:data='historyTable' v-loading='hisTableLoading' border max-height='800px')
          el-table-column(label='操作' width='50px')
            template(slot-scope='{row}')
              el-checkbox(v-model='!!row.paymentNo' disabled)
          //- el-table-column(prop="creditTypeName" label="授信类型")
          el-table-column(prop="extOrderCode" label="订单编号" width='260')
          el-table-column(prop="extDeliveryCode" label="发货编号" width='260')
          el-table-column(prop="debtEndTime" label="最后还款时间")
            template(slot-scope='{row}') {{ row.debtEndTime | toDateStr('yyyy-MM-dd') }}
          el-table-column(prop="loanAmount" label="总赊销金额" align="right")
          el-table-column(prop="leftToReturnAmount" label="剩余待还金额" align="right")
          el-table-column(prop="money" label="本次还款金额" align="right")
            template(slot-scope='{row}')
              div(:style="`padding-right: ${historyTable.length > 18 ? '17px' : '0'}`") {{ row && row.money ? row.money : '- -' }}
        .p-process-foot
          .p-process-total 还款总额:
            span {{toAmountStr(hisTotal, 2, true)}}
          .p-process-surplus
            .p-process-tip(v-if='hisSurplus < 0')
              i.el-icon-warning
              span 余额不足
            .p-process-surplus-amount 剩余额度:
              span {{toAmountStr(hisSurplus, 2, true)}}
</template>

<script>
import { toAmountStr } from '@/utils/util'
import ProcessComponent from './Components/ProcessComponent'
import ajaxStore from '@/apis'
import { bondTypeList } from '@/consts/index'
export default {
  data() {
    return {
      isLoading: false,
      approvalInfo: {},
      total: 0,
      surplus: 0,
      leftAmounnt: 0,
      hisTotal: 0,
      hisSurplus: 0,
      hisLeftAmounnt: 0,
      tableData: [],
      historyTable: [],
      checkList: [],
      tableLoading: false,
      hisTableLoading: false,
      claimType: undefined,
      claimAmount: null,
      isTypeShow: false,
      isMoneyShow: false,
      bondTypeList
    }
  },
  watch: {
    claimAmount(val) {
      const amount = this.approvalInfo && this.approvalInfo.amount ? this.approvalInfo.amount : 0
      this.isMoneyShow = val > amount
      this.getAmount(this.checkList)
    },
    claimType(val) {
      this.isTypeShow = !val
    }
  },
  methods: {
    onChange() {
      this.getAmount(this.checkList)
    },
    toAmountStr,
    checkOrder(val) {
      this.checkList = val
      this.getAmount(val)
    },
    getAmount(val) {
      let total = 0
      val.forEach(item => {
        total = (item.money ? item.money : 0) + total
      })
      this.total = total
      this.surplus = this.leftAmounnt - total - (this.claimAmount ? this.claimAmount : 0)
    },
    getHistoryAmount() {
      let total = 0
      this.historyTable.forEach(item => {
        if (item.paymentNo) total = (item.money ? item.money : 0) + total
      })
      this.hisTotal = total
      this.hisSurplus = this.hisLeftAmounnt - total - (this.claimAmount ? this.claimAmount : 0)
    },
    async getApprovalDetail() {
      const res = await ajaxStore.common.process.getApprovalDetail({ taskId: this.$route.query.taskId, processInstanceId: this.$route.query.processInstanceId })
      if (res.data && res.data.code === '0') {
        this.approvalInfo = res.data.data
        this.leftAmounnt = res.data.data.amount
        this.hisLeftAmounnt = res.data.data.amount
        this.surplus = res.data.data.amount
        this.getTable(res.data.data.paymentNo)
        this.getHistoryList()
        // 根据paymentNo是否为null判断是否勾选，不需要组合table
      }
    },
    async getTable(paymentNo) {
      this.tableLoading = true
      const res = await ajaxStore.credit.getToBeRepaidRepaymentPlanList({
        paymentNo,
        pageNo: '1',
        pageSize: 1000
      })
      if (res.data && res.data.code === '0') {
        const { data: { data: { pagedRecords } } } = res
        pagedRecords.forEach(item => { item.money = item.money ? item.money : 0 })
        this.tableData = pagedRecords
      }
      this.tableLoading = false
    },
    async getHistoryList() {
      this.hisTableLoading = true
      const res = await ajaxStore.credit.getHistoryList({
        // paymentNo: this.approvalInfo.paymentNo,
        processId: this.$route.query.processInstanceId,
      })
      if (res.data && res.data.code === '0' && res.data.data.pagedRecords[0]) {
        const { data: { data: { pagedRecords } } } = res
        const { claimDetail: { claimType, claimAmount } } = pagedRecords[0] ? pagedRecords[0] : {}
        this.claimType = claimType
        this.claimAmount = Number(claimAmount)
        this.historyTable = JSON.parse(res.data.data.pagedRecords[0].dataInfo)
        this.getHistoryAmount()
      }
      this.hisTableLoading = false
    },
    async submit(param) {
      // if (param.variables.isPass === 'Y' && this.checkList.length === 0) {
      //   return this.$message.warning('请选择要处理的发货单号')
      // }
      if (this.surplus < 0) return this.$message.warning('余额不足，不能发起流程')
      let repayList = ''
      let creditRepaymentPlanAmount = []
      const checkObj = {}
      this.checkList.forEach(item => {
        checkObj[item.repaymentPlanNo] = true
        repayList = repayList + item.repaymentPlanNo.toString() + ','
        creditRepaymentPlanAmount.push(item.money)
      })
      creditRepaymentPlanAmount = creditRepaymentPlanAmount.join(',')
      this.tableData.map(item => {
        if (checkObj[item.repaymentPlanNo]) {
          item.paymentNo = this.approvalInfo.paymentNo
        } else {
          item.paymentNo = null
          item.money = 0
        }
        return item
      })
      param.variables.claimType = this.claimType
      param.variables.claimAmount = this.claimAmount.toString()
      param.variables.claimName = '保证金'
      param.variables.creditRepaymentPlanNos = repayList
      param.variables.paymentNo = this.approvalInfo.paymentNo
      param.variables.planTableJsonText = JSON.stringify(this.tableData)
      param.variables.creditRepaymentPlanAmount = creditRepaymentPlanAmount
      return this.ajaxStore.common.process.submitProcess(param)
    },
    changeType(type) {
      this.isTypeShow = type
    }
  },
  async mounted() {
    this.getApprovalDetail()
  },
  computed: {
    config() {
      return {
        taskId: this.$route.query.taskId,
        processInstanceId: this.$route.query.processInstanceId,
        claimType: this.claimType,
        claimAmount: this.claimAmount,
        processConfig: [
          // 收款审批审批流程节点为 业服 +
          {
            taskName: '销售',
            isDefaultHide: true,
            collapseOpen: true,
            options: [
              {
                label: '查看厂家详情',
                type: 'slotWithoutLabel',
                slotName: 'slot1',
                required: true,
              },
            ],
            submitProcessFn: this.submit
          },
          {
            taskName: '业服',
            isDefaultHide: true,
            collapseOpen: true,
            options: [
              {
                label: '查看厂家详情',
                type: 'slotWithoutLabel',
                slotName: 'slot1',
                required: true,
              },
            ],
            submitProcessFn: this.submit
          },
          {
            taskName: '区总',
          },
          {
            taskName: '财务经理',
          },
        ],
      }
    },
  },
  components: {
    ProcessComponent,
  },
}
</script>
<style lang="stylus">
.p-process-table .el-table-column--selection .cell
  padding-left 10px
</style>

<style lang="stylus" scoped>
.p-width-220
  width 220px
.p-process-total
  border 1px solid #EBEEF5
  border-top none
  height 40px
  line-height 40px
  text-align right
  padding-right 80px
  span
    margin-left 5px
    color #4A71F0
.p-process-surplus
  height 40px
  background #FEF8E1
  padding-right 80px
  display flex
  align-items center
  justify-content flex-end
  .p-process-tip
    margin-left auto
    .el-icon-warning
      color #F25754
    span
      color #F25754
  .p-process-surplus-amount
    margin-left 10px
    span
      margin-left 5px
      color #F25754
.process-title
  padding 15px 0
  border-bottom 1px solid rgb(235, 238, 245)
  margin-bottom 15px
.bond-config
  width 100%
  display flex
  overflow hidden
  border 1px solid rgb(235, 238, 245)
  .bond-config-item
    flex 1
    p
      height 40px
      background #f8fbfd
      text-align center
      line-height 40px
      margin 0
      border-bottom 1px solid rgb(235, 238, 245)
    .bond-config-item-change
      position relative
      height 100px
      display flex
      align-items center
      justify-content center
      .bond-config-item-box
        position relative
        .bond-config-item-info
          position absolute
          top 38px
          left 0
          color #F56C6C
  .bond-config-item:nth-of-type(1)
    border-right 1px solid rgb(235, 238, 245)
.bond-config-warning
  /deep/ .el-input
    input
      border-color red !important
</style>
