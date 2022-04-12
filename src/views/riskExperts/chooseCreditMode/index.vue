<template lang="pug">
.page-main
  .p-main
    .p-title 一键开启客户风险评估
    .p-title-sub 秒级出具赊销风险评估结果 有效降低应收逾期风险
    .p-mode
      ModeCard.p-mode-item(type='credit' mode='fast' v-weblogs.click='"赊销评估-三选一页-点击快速评估"' :permissions="permissions['PTN:RISKEXPERTS:CREDITEVALUATION:FAST']")
      ModeCard.p-mode-item(type='credit' mode='standard' v-weblogs.click='"赊销评估-三选一页-点击标准评估"' :permissions="permissions['PTN:RISKEXPERTS:CREDITEVALUATION:STANDARD']")
      ModeCard.p-mode-item(type='credit' mode='accurate' recommend v-weblogs.click='"赊销评估-三选一页-点击精准评估"' :permissions="permissions['PTN:RISKEXPERTS:CREDITEVALUATION:ACCURATE']")
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
    weblogsDom('发起赊销评估')
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
.p-mode-item:first-child
  margin-left 0
</style>
