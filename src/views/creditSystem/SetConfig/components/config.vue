<template lang="pug">
.config_box(v-if="dataSource && dataSource.length > 2")
  .config_title 推荐配置流程
  .guide-list
    div(
      v-for='(item, index) in dataSource'
      :class='{"guide-item": item.name, "between": !item.name && index < dataSource.length - 1, "current": item.menuTag === menuTag}'
    )
      .item-box(@click="() => jumpHandle(item)")
        .circle_big
          .circle_small
        .guide-title {{ item.name }}
      .icon-area(v-if='!item.name && index < dataSource.length - 1')
        .mid-icon
</template>
<script>
import { computed } from '@vue/composition-api'
import { menuRoutes } from '@/router'
import store from '@/store'

export default {
  props: {
    setNextData: Function
  },
  setup(props, { root: { $router, $route } }) {
    const { meta: { menuTag } } = $route
    const { state: { menuPermisssions } } = store

    const list = [
      { name: '赊销类型配置', menuTag: 'credit_system_type_setting'},
      { name: '赊销额度配置', menuTag: 'credit_system_limit_setting' },
      { name: '营销规则配置', menuTag: 'credit_system_rule_setting' },
      { name: '风险防范配置', menuTag: 'credit_system_risk_setting' },
      { name: '审批材料配置', menuTag: 'credit_system_approve_setting' },
    ]

    const dataSource = computed(() => {
      const data = []
      const nextData = []
      list.forEach((item, index) => {
        if (menuPermisssions?.[item.menuTag]) {
          nextData.push(item)
          data.push(item)
          index < list.length - 1 && data.push({})
        }
      })
      props.setNextData && props.setNextData(nextData)
      return data
    })

    const jumpHandle = item => $router.push({ name: menuRoutes?.[item?.menuTag]?.name })

    return {
      dataSource,
      menuTag,
      jumpHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
.config_box
  width 100%
  height 164px
  background #FFFFFF
  border-radius 4px
  border 1px solid #EAEBEE
  box-sizing border-box
  padding 20px
  margin-bottom 10px
  .config_title
    height 20px
    font-size 14px
    font-weight 500
    color #494949
    line-height 20px
    margin-bottom: 15px
  .guide-list
    padding 10px 50px 30px
    display flex
    height 132px
    .guide-item
      text-align center
      width 52px
      .circle_big
        width 38px
        height 38px
        border 2px solid #E8ECF7
        margin 0 auto
        border-radius 50%
        box-sizing: border-box
        display: flex
        align-items: center
        justify-content: center
        .circle_small
          width 14px
          height 14px
          border 2px solid #E8ECF7
          border-radius 50%
          box-sizing: border-box
      .guide-title
        margin 10px 0
        width 100px
        margin-left -25px
    .between
      flex 1 0 auto
      height 3px
      background-color #E8ECF7
      margin-top 18px
      .icon-area
        width 14px
        background-color #fff
        height 14px
        margin -2px auto
        .mid-icon
          width 0
          height 0
          border-left 4px solid #E8ECF7
          border-top 4px solid transparent
          border-bottom 4px solid transparent
          margin 0 auto
    .current
      .circle_big
        border-color rgba(59, 104, 240, 1)
        .circle_small
          border-color rgba(59, 104, 240, 1)
          background rgba(59, 104, 240, 1)
    .item-box
      cursor pointer
</style>
