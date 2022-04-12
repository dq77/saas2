<template lang="pug">
fragment
  .page-layout-approval-title {{ title }}
  ul.page-layout-approval-desc-list
    li 发起人：{{ dataSource.beginnerChName || dataSource.START_USER_NAME }}
    li 审批编号：{{ dataInfo.processInstanceId }}
    li 流程提交时间：{{ dataSource.createdTime || dataSource.CREATE_TIME | toDateStr('yyyy-MM-dd hh:mm:ss') }}
</template>
<script>
import { computed } from '@vue/composition-api'
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    },
    title: String
  },
  setup(props) {
    const dataInfo = computed(() => (props.dataSource ?? {}))

    return {
      dataInfo
    }
  },
}
</script>
