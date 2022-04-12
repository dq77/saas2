<template lang="pug">
el-dialog(
  width="600px"
  custom-class='el-dialog-new'
  :title="'审批进度'"
  :visible.sync="visible"
  :before-close="cancleHandle"
)
  el-steps.white-search-progress(:active="active", align-center, finish-status="success")
    el-step(title="申请" :description="processData && processData.gmtCreated ? moment(processData.gmtCreated).format('YYYY-MM-DD') : ''" :class="active === 1 ? 'white-search-current' : ''")
    el-step(title="跟进" :description="processData && processData.followUpTime ? moment(processData.followUpTime).format('YYYY-MM-DD') : ''" :class="active === 2 ? 'white-search-current' : ''")
    el-step(title="开始审批" :description="processData && processData.approvalStartTime ? moment(processData.approvalStartTime).format('YYYY-MM-DD') : ''" :class="active === 3 ? 'white-search-current' : ''")
    el-step(title="完成审批" :description="processData && processData.approvalEndTime ? moment(processData.approvalEndTime).format('YYYY-MM-DD') : ''" :class="active === 4 ? 'white-search-current' : ''")
</template>
<script>
import moment from 'moment'

export default {
  data() {
    return {
      moment: moment
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    processData: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    active() {
      const { processData } = this
      if (!processData) return 0
      if (processData.approvalEndTime) return 4
      if (processData.approvalStartTime) return 3
      if (processData.followUpTime) return 2
      if (processData.gmtCreated) return 1
      return 0
    }
  },
  methods: {
    cancleHandle() {
      this.$emit('closeHandle')
    },
  },
}
</script>
<style lang="stylus" scoped>
>>> .white-search-progress
  padding 50px 0
  .el-step__title
    font-size 12px
    font-weight normal
  .is-success
    border-color #4A71F0
    color #333
    .el-step__icon
      background #4A71F0
    .el-step__icon-inner
      color #fff
  .white-search-current
    .is-success
      color #4A71F0
  .is-process
     border-color #ccc
     color #ccc
    .el-step__icon
      background #fff
    .is-text
      border-width 4px
    .el-step__icon-inner
      color rgba(0, 0, 0, 0)
  .is-wait
    border-color #ccc
</style>
