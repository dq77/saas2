<template lang="pug">
fragment
  fragment
    el-button(type='text' @click='go("ActivityDetail")') 查看
  fragment
    el-button(type='text' @click='go("EditActivity", "edit")' v-show="dataSource.status === 'INIT'") 编辑
  fragment
    el-button(type='text' @click='go("CreateActivity", "copy")') 复制
  Close(:dataSource="dataSource" @closeSuccess="closeSuccess")
</template>
<script lang='ts'>
import Close from './close.vue'
export default {
  components: {
    Close
  },
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { root: { $router }, emit}) {
    const activityId: string = (props.dataSource as any)?.id ?? ''
    // ajax
    // methods
    const go = (name: string, type?: string) => $router.push({ name: name, query: { activityId, type } })
    const closeSuccess = (): void => (emit('closeSuccess'))
    return {
      closeSuccess,
      go
    }
  },
}
</script>
