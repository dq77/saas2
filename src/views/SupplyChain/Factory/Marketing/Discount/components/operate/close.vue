<template lang="pug">
fragment
  el-popconfirm(
    title='确认关闭此活动吗？'
    @confirm='closetHandle'
    cancel-button-text='点错了'
    confirm-button-text='确认关闭'
  )
    el-button(
      type='text'
      slot='reference'
      style='margin-left: 10px'
      v-show="isClose"
    ) 关闭
</template>
<script lang='ts'>
import { computed } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { root: { $router }, emit}) {
    const activityId: string = (props.dataSource as any)?.id ?? ''
    // ajax
    const { factory: { closeActivity } } = ajaxStore
    // methods
    const closetHandle = (): void => {
      useAsync({
        request: closeActivity,
        params: { activityId },
        successCallBack: ({ code }) => {
          code === '0' && (emit('closeSuccess'))
        }
      })
    }
    // computed
    const isClose = computed((): boolean => { return (props.dataSource as any)?.status === 'INIT' || (props.dataSource as any)?.status === 'RUNNING' })
    return {
      closetHandle,
      isClose
    }
  },
}
</script>
