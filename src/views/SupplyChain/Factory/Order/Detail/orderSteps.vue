<template lang="pug">
.p-steps-wrap(v-loading='loading')
  el-steps(
    align-center
    finish-status='success'
    :style='{"max-width": maxWidth}'
    :active='active'
  )
    el-step(
      v-for='(item, index) in statusList'
      :key='index'
      :title='item.taskName'
      :description='item.startTime'
    )
</template>
<script>
import ajaxStore from '@/apis'
import { ref } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'

export default {
  props: {
    processInstanceId: {
      type: String,
      default: ''
    },
  },
  setup(props) {
    const statusList = ref([])
    const active = ref(1)
    const maxWidth = ref('100%')

    // 获取订单基础信息
    const { loading } = useAsync({
      request: ajaxStore.factory.getOrderStep,
      params: {
        processInstanceId: props.processInstanceId
      },
      successCallBack: ({ data }) => {
        statusList.value = data
        active.value = data?.length
        maxWidth.value = Math.min((data?.length ?? 0) * 0.2, 1) * 100 + '%'
      }
    })
    return {
      loading,
      statusList,
      active,
      maxWidth,
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-steps-wrap
  background #fff
  padding 60px 20px 20px
  width 100%
  >>>.el-steps
    margin 0 auto
    .el-step
      .el-step__head
        border-color #4A71F0
        .el-step__icon
          color #4A71F0
        .el-step__icon-inner
          color #fff
        .el-step__line
          background #4A71F0
        .el-step__icon.is-text
          background #4A71F0
      .el-step__main
        .el-step__title
          color #494949
          font-size 12px;
        .el-step__description
          color #ccc
</style>
