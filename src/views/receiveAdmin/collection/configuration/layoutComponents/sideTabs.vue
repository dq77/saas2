<template lang="pug">
.p-tabs
  .u-tab(
    v-for='tab in urgeWayOptions'
    :key='tab.value'
    :class='activedTab === tab.value ? "u-actived" : ""'
    @click='clickTab(tab.value)'
  )
    .u-title {{ tab.label }}
    i.el-icon-caret-right
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { urgeWayOptions } from '../config'

export default defineComponent({
  props: {
    activedTab: {
      type: String,
    }
  },
  setup(props, { emit }) {
    const clickTab = (key) => emit('changeTab', key)

    return {
      urgeWayOptions,
      clickTab
    }
  },
})
</script>
<style lang="stylus" scoped>
.p-tabs
  padding 20px
  .u-tab
    display flex
    justify-content: space-between;
    align-items: center;
    padding 0 12px 0 20px
    height: 40px;
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #EAEBEE;
    color #848484
    font-size 14px
    cursor: pointer
    &:first-child
      margin-bottom 10px
    &.u-actived
      background: #3B68F0;
      color #fff
      cursor: default
</style>
