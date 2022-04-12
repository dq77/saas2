<template lang="pug">
.page-main.page-layout-approval(v-loading='aLoading')
  Header(:title='approvalInfo.PROCESS_NAME || "催收回款审批流程"' :dataSource='{ ...approvalInfo, ...{ processInstanceId: $route.query.processInstanceId } }')
  .page-layout-approval-content
    Collapse(
      :columns="colColumns"
      :defaultActiveName="defaultActiveName"
    )
      //- 流程信息
      template(slot="process")
        Descriptions(
          :labelWidth="150"
          :columns="processColumns"
          :dataSource="approvalInfo ? approvalInfo : {}"
        )
        .wait-filelists
          div 附件：
          File(:fileList="fileList")
        div(style="padding: 20px 0 10px 0;") 备注：{{approvalInfo.remark || '- -'}}
  process-component(:config='config')
</template>

<script>
import { toRefs, reactive, computed } from '@vue/composition-api'
import Header from '../Components/header.vue'
import ProcessComponent from '../Components/ProcessComponent'
import Collapse from '@/components/qjd/collapse'
import Descriptions from '@/components/qjd/descriptions'
import File from '@/views/receiveAdmin/collection/overview/components/files.vue'
import { defaultActiveName, colColumns, processColumns } from './config'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default {
  components: {
    File,
    ProcessComponent,
    Header,
    Collapse,
    Descriptions
  },
  setup(props, { root: { $route } }) {
    // ajax
    const { common: { process: { getApprovalDetail } }, receive: { getStageReturnDtl, getCollectionListDtl } } = ajaxStore
    // async
    const { doResult: returnResult } = useAsync({
      init: false,
      request: getStageReturnDtl,
      successCallBack: ({code, data}) => {
        if (code === '0') {
          const { remark, bankSerialNo, saArmBusinessFileList, returnDate, returnAmount } = data
          state.approvalInfo = { ...state.approvalInfo, remark, bankSerialNo, returnDate, returnAmount }
          state.fileList = saArmBusinessFileList || []
        }
      }
    })
    const { doResult: dtlResult } = useAsync({
      init: false,
      request: getCollectionListDtl,
      successCallBack: ({code, data}) => {
        if (code === '0') {
          const { overdueAmount, remainReceivableAmount } = data
          state.approvalInfo = { ...state.approvalInfo, overdueAmount, remainReceivableAmount }
        }
      }
    })
    const { loading: aLoading } = useAsync({
      request: getApprovalDetail,
      params: {
        taskId: $route.query.taskId,
        processInstanceId: $route.query.processInstanceId
      },
      successCallBack: ({code, data}) => {
        if (code === '0') {
          state.approvalInfo = data ?? {}
          returnResult({ armUrgeStageReturnId: data?.id ?? '' })
          dtlResult({ customerId: data?.customerId ?? '' })
        }
      }
    })
    // computed
    const config = computed(() => {
      return {
        taskId: $route.query.taskId,
        processInstanceId: $route.query.processInstanceId,
        processConfig: [
          {
            taskName: '审批节点'
          }
        ],
      }
    })
    // state
    const state = reactive({
      approvalInfo: {},
      fileList: [],
      tableData: []
    })
    return {
      defaultActiveName,
      colColumns,
      processColumns,
      aLoading,
      config,
      ...toRefs(state)
    }
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
