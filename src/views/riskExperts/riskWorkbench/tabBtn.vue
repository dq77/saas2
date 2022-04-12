<template lang="pug">
.p-tabs
  .u-btn(
    v-for='tab in tabs'
    :class='activeTab === tab.name ? "u-active" : null'
    @click='clickTab(tab)'
  ) {{ tab.label }}
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  props: {
    tabs: Array, // [{name, label}]
    defaultActive: String, // name
  },
  setup(props, { emit }) {
    const activeTab = ref(props.defaultActive || props.tabs?.[0]?.name || null)
    function clickTab(tab) {
      activeTab.value = tab.name
      emit('clickTab', tab)
    }
    return {
      activeTab,
      clickTab,
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-tabs
  display flex
  align-items center
  .u-btn
    margin-left 15px
    width 88px
    height 28px
    line-height 28px
    text-align center
    border 1px solid #E1E1E1
    color #7D7D7E
    font-size 12px
    border-radius 2px
    cursor pointer
    &:first-child
      margin-left 0
    &.u-active
      background #3B68F0
      border-color #3B68F0
      color #fff
</style>
