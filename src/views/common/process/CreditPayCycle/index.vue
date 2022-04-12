<template lang="pug">
.page-main.page-layout-approval(v-loading='isLoading')
  .page-layout-approval-title 还款周期修改审批
  ul.page-layout-approval-desc-list
    li 发起人：{{ approvalInfo.beginnerChName || approvalInfo.START_USER_NAME }}
    li 审批编号：{{ $route.query.processInstanceId }}
    li 流程提交时间：{{ approvalInfo.CREATE_TIME | toDateStr('yyyy-MM-dd hh:mm:ss') }}
  .page-layout-approval-content
    el-collapse(:value='[1, 2, 3, 4, 5]')
      el-collapse-item(:name='1', title='客户信息')
        table.table.table-layout-main
          tr
            th 经销商名称：
            td {{approvalInfo.customerName || '- -'}}
            th 订单编号：
            td {{approvalInfo.extOrderCode || '- -'}}
          tr
            th 应收账款金额
            td {{approvalInfo.deliveryLoanAmount || approvalInfo.deliveryLoanAmount === 0 ? approvalInfo.deliveryLoanAmount : '- -'}}
            th 修改后的还款周期（天）
            td {{approvalInfo.newDebtPeriodDays || approvalInfo.newDebtPeriodDays === 0 ? approvalInfo.newDebtPeriodDays : '- -'}}
          tr
            th 修改说明：
            td {{approvalInfo.modifyReasonDesc || '- -'}}
  process-component(:config='config')
</template>
<script>
import ProcessComponent from '../Components/ProcessComponent'

export default {
  data() {
    return {
      isLoading: false,
      approvalInfo: {}
    }
  },
  components: {
    ProcessComponent,
  },
  created() {
    this.getApprovalDetail()
  },
  computed: {
    config() {
      return {
        taskId: this.$route.query.taskId,
        processInstanceId: this.$route.query.processInstanceId,
        processConfig: [
          {
            taskName: '销售',
          },
          {
            taskName: '区总',
          },
          {
            taskName: '财务经理',
          }
        ],
      }
    },
  },
  methods: {
    async getApprovalDetail() {
      try {
        const res = await this.ajaxStore.common.process.getApprovalDetail({ taskId: this.$route.query.taskId, processInstanceId: this.$route.query.processInstanceId })
        if (res.data && res.data.code === '0') {
          this.approvalInfo = res.data.data
          if (res.data.data.fileList) this.fileList = JSON.parse(res.data.data.fileList)
        }
      } catch (error) {
        console.error(`error: ${error}`)
      }
    }
  }
}
</script>
