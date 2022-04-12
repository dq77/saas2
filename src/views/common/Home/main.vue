<template lang='pug'>
  .saas2-home-page
    .home-left
      ServiceGuide(v-if='isTenants')
      MyService
      BasicApplication(v-if='isTenants')
      Manual
    .home-right
      BaseInfo
      MyMission(v-if='isTenants')
      MyMessage(v-if='isTenants')
      PhoneService
      FillMore
</template>

<script>
import ServiceGuide from './serviceGuide'
import MyService from './myService'
import BasicApplication from './basicApplication'
import Manual from './manual'
import MyMission from './myMission'
import MyMessage from './myMessage'
import BaseInfo from './baseInfo'
import PhoneService from './phoneService'
import FillMore from './fillMore'
import store from '@/store'

export default {
  props: {
  },
  setup(props, context) {
    const { state } = store
    const isTenants = state.userInfo.userType !== 2 // 租户？还是客户？
    return {
      isTenants
    }
  },
  components: {
    ServiceGuide,
    MyService,
    BasicApplication,
    Manual,
    MyMission,
    MyMessage,
    BaseInfo,
    PhoneService,
    FillMore,
  }
}
</script>

<style lang='stylus'>
.saas2-home-page
  display flex
  padding 0 30px 30px
  color #494949
  .home-left
    flex 1
    width 0
  .home-right
    flex 0 1 330px
    min-width 300px
    display flex
    flex-direction column
    margin-left 19px
  .card
    border-radius 4px
    border 1px solid #EAEBEE
    background-color #fff
    .title
      display flex
      justify-content space-between
      .left-txt
        margin 20px
        font-size 14px
        line-height 16px
</style>
