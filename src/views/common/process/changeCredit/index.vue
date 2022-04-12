<template lang="pug">
.page-main.page-layout-approval
  .page-layout-approval-title 修改授信额度流程
  ul.page-layout-approval-desc-list
    li 发起人：{{ approvalInfo.beginnerChName || approvalInfo.START_USER_NAME }}
    li 审批编号：{{ processInstanceId }}
    li 流程提交时间：{{ approvalInfo.CREATE_TIME | toDateStr('yyyy-MM-dd hh:mm:ss') }}
  .process_detail
    .process_detail_title 流程信息
    Descriptions(
      :labelWidth="150"
      :columns="columns"
      :dataSource="approvalInfo"
    )
  process-component(:config='config')
</template>

<script>
import { computed } from '@vue/composition-api'
import Descriptions from '@/components/qjd/descriptions'
import ProcessComponent from '../Components/ProcessComponent'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { columns } from './config'

export default {
  components: {
    ProcessComponent,
    Descriptions
  },
  setup(props, { root: { $route: { query: { taskId, processInstanceId } } } }) {
    // config
    const config = { taskId, processInstanceId, processConfig: [] }
    // ajax
    const { common: { process: { getApprovalDetail } } } = ajaxStore
    // 获取信息
    const { result } = useAsync({
      request: getApprovalDetail,
      params: { taskId, processInstanceId }
    })
    // 数据处理
    const approvalInfo = computed(() => result.value ?? {})

    return {
      config,
      columns,
      processInstanceId,
      approvalInfo
    }
  }
}
</script>
<style lang="stylus" scoped>
.process_detail
  background #fff
  padding 20px
  .process_detail_title
    margin-bottom 20px
    font-weight 700
</style>
