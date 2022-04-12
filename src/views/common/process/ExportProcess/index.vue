<!--
 * @Date: 2021-08-02 10:29:08
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-08-17 10:53:33
-->
<template lang="pug">
.page-main.page-layout-approval(v-loading='isLoading')
  .page-layout-approval-title 数据导出审批
  ul.page-layout-approval-desc-list
    li 发起人：{{ approvalInfo.beginnerChName || approvalInfo.START_USER_NAME }}
    li 审批编号：{{ $route.query.processInstanceId }}
    li 提交时间：{{ approvalInfo.CREATE_TIME | toDateStr('yyyy-MM-dd hh:mm:ss') }}
  .page-layout-approval-content
    el-collapse(:value='[1, 2, 3, 4, 5]')
      el-collapse-item(:name='1', title='申请信息')
        table.table.table-layout-main
          tr
            th 申请导出菜单名单
            td {{ typeName[approvalInfo.type] }}
            th 申请导出数据条数（条）
            td {{ approvalInfo.count }}
          tr
            th 申请原因
            td {{ approvalInfo.reason }}
            th 筛选条件
            td {{ approvalInfo.FileRequest }}
  process-component(:config='config' :rules='rules' showSlotNodes='管理员' showSlotForm )
    template(slot='slotForm' slot-scope='{disabled}')
      el-form(ref='formCom' :model="form" label-width='160px' style='padding-right: 100px')
        el-form-item(v-if='showDown' label='导出文件：')
          span(@click='downFile' style='cursor: pointer;color: #409eff') 点击下载
</template>
<script>
import ProcessComponent from '../Components/ProcessComponent'

export default {
  data() {
    return {
      isLoading: false,
      showDown: false,
      // typeName: ['', '订单查询', '支付查询', '履约管理', '赊销政策明细',],
      typeName: {
        1: '订单查询',
        2: '支付查询',
        3: '履约管理',
        4: '赊销政策明细',
        10: '应收信息查询'
      },
      form: { name: '' },
      rules: { name: [{ required: false, message: 'error', trigger: 'blur' }] },
      approvalInfo: {}
    }
  },
  components: {
    ProcessComponent,
  },
  created() {
    this.getApprovalDetail()
    this.getNodes()
  },
  computed: {
    config() {
      return {
        taskId: this.$route.query.taskId,
        processInstanceId: this.$route.query.processInstanceId,
        processConfig: [{ taskName: '管理员' }],
      }
    },
  },
  methods: {
    async getApprovalDetail() {
      try {
        const res = await this.ajaxStore.common.process.getApprovalDetail({ taskId: this.$route.query.taskId, processInstanceId: this.$route.query.processInstanceId })
        if (res.data && res.data.code === '0') {
          this.approvalInfo = res.data.data
        }
      } catch (error) {
        console.error(`error: ${error}`)
      }
    },
    async getNodes() {
      const res = await this.ajaxStore.common.process.getApprovalNodes({ taskId: this.$route.query.taskId, processInstanceId: this.$route.query.processInstanceId })
      if (res.data && res.data.code === '0' && res.data.data) {
        const data = res.data.data
        if (data.historicTasks.length === 0 || (data.historicTasks[0].isPass === 'Y')) {
          this.showDown = true
        }
      }
    },
    async downFile() {
      window.open(`/saas-boss/boss/dataExportDownLoad/check?processId=${this.$route.query.processInstanceId}`)
      // const res = await this.ajaxStore.common.lookloadExportFile({ processId: this.$route.query.processInstanceId })
      // if (res.data && res.data.code === '0' && res.data.data) {
      //   location.href = res.data.data.replace(/http/, 'https')
      // }
    }
  }
}
</script>
