<template lang="pug">
.page-main.page-layout-approval(v-loading='isLoading')
  .page-layout-approval-title 授信申报
  ul.page-layout-approval-desc-list
    li 发起人：{{ approvalInfo.beginnerChName || approvalInfo.START_USER_NAME }}
    li 审批编号：{{ $route.query.processInstanceId }}
    li 流程提交时间：{{ approvalInfo.createdTime | toDateStr('yyyy-MM-dd hh:mm:ss') }}
  .page-layout-approval-content
    el-collapse(:value='[1, 2, 3, 4, 5]')
      el-collapse-item(:name='1', title='客户信息', v-if='approvalInfo.creditTypeName !== "直签使用授信"')
        table.table.table-layout-main
          tr
            th 经销商名称：
            td {{approvalInfo.customerName || '- -'}}
            th 法人姓名：
            td {{approvalInfo.legalPersonName || '- -'}}
          tr
            th 社会信用代码：
            td {{approvalInfo.socialCode || '- -'}}
            th 法人身份证号：
            td {{approvalInfo.legalPersonCode || '- -'}}
          tr
            th 客户编号：
            td {{approvalInfo.extCustomCode || '- -'}}
            th 法人手机号：
            td {{approvalInfo.legalPersonMobile || '- -'}}
          tr
            th 曾经是否用过还款逾期：
            td {{!!approvalInfo.totalOverdueAmount ? '是' : '否'}}
            th 总逾期额度（元）：
            td {{approvalInfo.totalOverdueAmount || approvalInfo.totalOverdueAmount === 0 ? approvalInfo.totalOverdueAmount : '- -'}}
      el-collapse-item(:name='2', title='项目信息', v-if='approvalInfo.creditTypeName === "项目授信" && approvalInfo.creditTypeName !== "直签使用授信"')
        table.table.table-layout-main
          tr
            th 项目名称：
            td {{approvalInfo.projectName || '- -'}}
            th 项目方：
            td {{approvalInfo.projectCompany || '- -'}}
          tr
            th 项目地址：
            td {{approvalInfo.projectAddress || '- -'}}
            th 累积合同金额：
            td {{approvalInfo.contractAmount || '- -'}}
          tr
            th 项目编号：
            td {{approvalInfo.projectExtId || '- -'}}
            th 合同金额：
            td {{approvalInfo.singleContractAmount || '- -'}}
          tr
            th 合同编号：
            td {{approvalInfo.contractCode || '- -'}}
            th 合同名称：
            td {{approvalInfo.contractName || '- -'}}
          tr
            th 合同签署日期：
            td {{approvalInfo.signingDate || '- -'}}
      el-collapse-item(:name='3', title='授信信息', v-if='approvalInfo.creditTypeName !== "直签使用授信"')
        table.table.table-layout-main
          tr
            th 申报授信额度：
            td(colspan='3') {{approvalInfo.creditAmount || approvalInfo.creditAmount === 0 ? approvalInfo.creditAmount : '- -' }}
          tr
            th 申报时间：
            td {{approvalInfo.createdTime | toDateStr('yyyy-MM-dd hh:mm:ss') || '- -'}}
            th 剩余额度：
            td {{approvalInfo.remainingAmount || '- -'}}
          tr
            th 授信类型：
            td {{approvalInfo.creditTypeName || '- -'}}
            th 额度来源：
            td {{approvalInfo.salesAreaName || '- -'}}
      el-collapse-item(:name='4', title='客户信息', v-if='approvalInfo.creditTypeName === "直签使用授信"')
        table.table.table-layout-main
          tr
            th 拥有直签额度客户：
            td {{approvalInfo.parentCreditSourceName || '- -'}}
            th 使用额度客户：
            td {{approvalInfo.customerName || '- -'}}
      el-collapse-item(:name='5', title='项目信息', v-if='approvalInfo.creditTypeName === "直签使用授信"')
        table.table.table-layout-main
          tr
            th 项目编号：
            td {{approvalInfo.projectExtId || '- -'}}
            th 合同编号：
            td {{approvalInfo.contractCode || '- -'}}
          tr
            th 合同累计金额：
            td {{approvalInfo.contractAmount || '- -'}}
            th 项目名称：
            td {{approvalInfo.projectName || '- -'}}
          tr
            th 合同名称：
            td {{approvalInfo.contractName || '- -'}}
            th 合同签署日期：
            td {{approvalInfo.signingDate || '- -'}}
          tr
            th 项目地址：
            td {{approvalInfo.projectAddress || '- -'}}
            th 合同金额：
            td {{approvalInfo.singleContractAmount || '- -'}}
          tr
            th 项目文件
            td {{approvalInfo.creditStatusName || '- -'}}
      el-collapse-item(:name='5', title='授信信息', v-if='approvalInfo.creditTypeName === "直签使用授信"')
        table.table.table-layout-main
          tr
            th 授信类型：
            td(colspan='3') {{approvalInfo.creditTypeName || '- -'}}
          tr
            th 申报额度：
            td {{approvalInfo.creditAmount || approvalInfo.creditAmount === 0 ? approvalInfo.creditAmount : '- -' }}
            th 申报时间：
            td {{approvalInfo.createdTime | toDateStr('yyyy-MM-dd hh:mm:ss') || '- -'}}
      .wait-filelists
        div 附件：
        File(:fileList="fileList")
      div(style="padding: 20px 0 10px 0;") 备注：{{approvalInfo.description || '- -'}}
  process-component(:config='config' :subDisabled="noticeInfo && noticeInfo.errorMsgList && noticeInfo.errorMsgList.length && noticeInfo.limitType === '2'")
  //- 提示
  Notice(
    v-if="noticeInfo && noticeInfo.errorMsgList && noticeInfo.errorMsgList.length"
    :type="noticeInfo && noticeInfo.limitType ? noticeInfo.limitType === '1' ? 'warn' : noticeInfo.limitType === '2' ? 'error' : '' : ''"
    :member="noticeInfo ? noticeInfo.targetName ? noticeInfo.targetName : userInfo && userInfo.memberId === noticeInfo.memberId ? null : noticeInfo.memberName : '' "
    :rules="noticeInfo ? noticeInfo.errorMsgList : []"
  )
</template>

<script>
import { toAmountStr, toPrefixUrl } from '@/utils/util'
import ProcessComponent from './Components/ProcessComponent'
import ajaxStore from '@/apis'
import { getFile } from '@/utils/qjd/credit'
import File from '@/components/qjd/bsComs/credit/file.vue'
import Notice from '@/components/qjd/notice'
import { mapState } from 'vuex'

export default {
  components: {
    File,
    ProcessComponent,
    Notice
  },
  data() {
    return {
      isLoading: false,
      approvalInfo: {},
      fileList: {},
      tableData: [],
      list: [
        { label: 'a', fileId: 'a' },
        { label: 'b', fileId: 'b' }
      ],
      noticeInfo: {}
    }
  },
  methods: {
    toAmountStr,
    toPrefixUrl,
    async getApprovalDetail() {
      try {
        const res = await ajaxStore.common.process.getApprovalDetail({ taskId: this.$route.query.taskId, processInstanceId: this.$route.query.processInstanceId })
        if (res.data && res.data.code === '0') {
          this.approvalInfo = res.data.data
          if (res.data.data.fileList) {
            const fileList = getFile(JSON.parse(res.data.data.fileList))
            this.fileList = fileList
          }
          if (res.data.data.ruleReminderContext) {
            const ruleReminderContext = JSON.parse(res.data.data.ruleReminderContext)
            this.noticeInfo = ruleReminderContext
          }
        }
      } catch (error) {
        console.error(`error: ${error}`)
      }
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
        processConfig: [
          {
            taskName: '区总',
          },
          {
            taskName: '销售总',
          },
          {
            taskName: '财务经理',
          },
          {
            taskName: '财务总',
          },
        ],
      }
    },
    ...mapState(['userInfo']),
  }
}
</script>

<style lang="stylus" scoped>
.p-width-220
  width 220px
.wait-filelists
  display flex
  align-items flex-start
  padding-top 20px
</style>
