<template lang="pug">
.page-main
  .p-main
    .p-title 针对项目方进行全方位风险评估
    .p-title-sub 副标题副标题副标题
    .p-mode
      ModeCard.p-mode-item(type='project' mode='fast' v-weblogs.click='"项目评估-二选一页-点击快速评估"'  :permissions="permissions['PTN:RISKEXPERTS:PROJECTEVALUATION:FAST']")
      ModeCard.p-mode-item(type='project' mode='deep' v-weblogs.click='"项目评估-二选一页-点击深度评估"'  :permissions="permissions['PTN:RISKEXPERTS:PROJECTEVALUATION:DEPTH']")
</template>

<script>
import ModeCard from '../components/modeCard'
import { weblogsDom } from '@/utils/qjd/weblogs'
import store from '@/store'
export default {
  components: {
    ModeCard
  },
  setup (props, { root }) {
    // store
    const { state: { permissions } } = store
    weblogsDom('发起项目评估')
    return {
      permissions
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-main
  background #ffffff
  padding 50px 0 100px 0
  min-height 90vh
.p-title
  color #494949
  font-size 30px
  margin-bottom 20px
  text-align center
.p-title-sub
  color #494949
  font-size 12px
  text-align center
  margin-bottom 50px
.p-mode
  display flex
  justify-content center
.p-mode-item
  margin-left 3%
.p-mode-item:first
  margin-left 0
</style>
