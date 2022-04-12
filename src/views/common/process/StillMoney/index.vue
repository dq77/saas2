<template lang="pug">
.page-main.page-layout-approval(v-loading='isLoading')
  .page-layout-approval-title 还款审批
  ul.page-layout-approval-desc-list
    li 发起人：{{ approvalInfo.beginnerChName }}
    li 审批编号：{{ $route.query.processInstanceId }}
    li 流程提交时间：{{ approvalInfo.CREATE_TIME | toDateStr('yyyy-MM-dd hh:mm:ss') }}
  .p-process-table
    p
      span 还款客户：
      span {{ approvalInfo.customerName }}
    div
      el-table(:data='tableData' border max-height='800px')
        el-table-column(prop="extOrderCode" label="订单编号" width='260')
        el-table-column(prop="extDeliveryCode" label="发货编号" width='260')
        el-table-column(prop="debtEndTime" label="最后还款时间")
          template(slot-scope='{row}') {{ row.debtEndTime | toDateStr('yyyy-MM-dd') }}
        el-table-column(prop="loanAmount" label="总赊销金额" align="right")
        el-table-column(prop="repaymentAmount" label="剩余待还金额" align="right")
        el-table-column(prop="refundAmount" label="本次还款金额" align="right")
      .p-process-foot
        .p-process-total 还款总额:
          span {{toAmountStr(total, 2, true)}}
      .wait-filelists
        div 附件：
        File(:fileList="fileList")
  process-component(:config='config')
</template>

<script>
import { toAmountStr } from '@/utils/util'
import ProcessComponent from '../Components/ProcessComponent'
import ajaxStore from '@/apis'
import { getFile } from '@/utils/qjd/credit'
import File from '@/components/qjd/bsComs/credit/file.vue'

export default {
  components: {
    ProcessComponent,
    File
  },
  data() {
    return {
      isLoading: false,
      approvalInfo: {},
      total: 0,
      leftAmounnt: 0,
      hisTotal: 0,
      hisLeftAmounnt: 0,
      tableData: [],
      checkList: [],
      fileList: {}
    }
  },
  methods: {
    toAmountStr,
    getAmount(val) {
      let total = 0
      val.forEach(item => {
        total = (item.refundAmount ? item.refundAmount : 0) + total
      })
      this.total = total
    },
    async getApprovalDetail() {
      this.isLoading = true
      const res = await ajaxStore.common.process.getApprovalDetail({ taskId: this.$route.query.taskId, processInstanceId: this.$route.query.processInstanceId })
      this.isLoading = false
      if (res.data && res.data.code === '0') {
        this.approvalInfo = res.data.data
        this.leftAmounnt = res.data.data.amount
        this.hisLeftAmounnt = res.data.data.amount
        const creditRepaymentString = res.data.data.creditRepaymentString || ''
        this.tableData = creditRepaymentString ? JSON.parse(creditRepaymentString) : []
        if (res.data.data.fileList) {
          const fileList = getFile(JSON.parse(res.data.data.fileList))
          this.fileList = fileList
        }
        this.getAmount(this.tableData)
      }
    },
    async submit(param) {
      let repayList = ''
      let creditRepaymentPlanAmount = []
      const checkObj = {}
      this.tableData.forEach(item => {
        checkObj[item.repaymentPlanNo] = true
        repayList = repayList + item.repaymentPlanNo.toString() + ','
        creditRepaymentPlanAmount.push(item.refundAmount)
      })
      creditRepaymentPlanAmount = creditRepaymentPlanAmount.join(',')
      param.variables.creditRepaymentPlanNos = repayList
      param.variables.planTableJsonText = JSON.stringify(this.tableData)
      param.variables.creditRepaymentPlanAmount = creditRepaymentPlanAmount
      return this.ajaxStore.common.process.submitProcess(param)
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
        processConfig: [],
      }
    },
  }
}
</script>
<style lang="stylus">
.p-process-table .el-table-column--selection .cell
  padding-left 10px
</style>

<style lang="stylus" scoped>
.p-process-table
  background: #fff
  padding: 20px
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
.wait-filelists
  display flex
  align-items flex-start
  padding-top 20px
</style>
