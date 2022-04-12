<template lang="pug">
.task_single
  .task_item(@click="() => jumpHandle('credit')")
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
  .task_item(@click="() => jumpHandle('day')")
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
.task_single
  display: flex
  height: 100%
  align-items: center
  padding-left: 20px
.task_item
  display: flex
  cursor pointer
  padding: 12px 30px
  background: #F8F9FA;
  font-size: 12px;
  font-weight: 500;
  color: #494949;
  line-height: 17px;
  margin-right: 20px
  &:hover
    background: #DFEBFF
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
