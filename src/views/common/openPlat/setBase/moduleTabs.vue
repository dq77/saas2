<template lang="pug">
.p-tabs
  .u-tab-item(
    v-for='(tab, index) in tabs'
    :class='{"u-active": tab.name === activeTab}'
    @click='clickTab(tab, index)'
  ) {{ tab.label }}
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  props: {
    tabs: Array,
    defaultTab: String,
  },
  setup(props, { emit }) {
    const activeTab = ref(props.defaultTab)

    const clickTab = (tab) => {
      activeTab.value = tab.name
      emit('change', tab.name)
    }
    return {
      activeTab,
      clickTab,
    }
  }
}
</script>

<style lang="stylus">
.p-tabs
  .u-tab-item
    display inline-block
    padding 8px 16px
    margin-right 10px
    font-size 12px
    line-height 17px
    border-radius 4px
    color #494949
    cursor pointer
    &.u-active
      color #fff
      background #3B68F0
</style>
