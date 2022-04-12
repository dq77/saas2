<template lang="pug">
.task_all
  div(style="margin-left: 20px; margin-right: 50px; height: 44px")
    .task_item(style="margin-bottom: 10px" @click="() => jumpHandle('credit')")
      span ·任务1
      .task_shu
      span 您当前有
      span.task_num {{ dataSource || dataSource.creditApply === 0 ? dataSource.creditApply : 0 }}笔
      span 授信申请单未审批
    .task_item(@click="() => jumpHandle('pay')")
      span ·任务2
      .task_shu
      span 您当前有
      span.task_num {{ dataSource || dataSource.creditRepayment === 0 ? dataSource.creditRepayment : 0 }}笔
      span 还款审批申请单未审批
  .task_item(style="height: 44px" @click="() => jumpHandle('day')")
    span ·任务3
    .task_shu
    span 您当前有
    span.task_num {{ dataSource || dataSource.saasPeriodDays === 0 ? dataSource.saasPeriodDays : 0 }}笔
    span 还款周期修改单未审批
</template>
<script>
import useJump from './useJump'

export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const { jumpHandle } = useJump()

    return {
      jumpHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
.task_all
  display: flex
  height: 100%
  align-items: center
  font-size: 12px;
  font-weight: 400;
  color: #494949;
  line-height: 17px;
.task_item
  display: flex
  cursor pointer
  &:hover
    color: #3B68F0
  .task_num
    color: #3B68F0
  .task_shu
    display: inline-block
    width: 1px;
    height: 9px;
    border: 1px solid #ECEDEF;
    margin: 0 5px
    position: relative
    top 3px
</style>
