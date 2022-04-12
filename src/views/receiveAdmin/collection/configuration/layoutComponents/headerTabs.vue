<template lang="pug">
.p-tabs
  .u-tab(
    v-for='tab in repayDayTypeOptions'
    :key='tab.value'
    :class='activedTab === tab.value ? "u-actived" : ""'
    @click='clickTab(tab.value)'
  )
    .u-title {{ tab.label }}
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { repayDayTypeOptions } from '../config'

export default defineComponent({
  props: {
    activedTab: {
      type: String,
    }
  },
  setup(props, { root, emit }) {
    const clickTab = (key) => emit('changeTab', key)

    return {
      repayDayTypeOptions,
      clickTab
    }
  },
})
</script>

<style lang="stylus" scoped>
.p-tabs
  display flex
  .u-tab
    display flex
    align-items center
    justify-content center
    flex 1
    height 60px
    background: #EEF0F5;
    border-radius: 4px;
    border: 1px solid #EAEBEE;
    color: #383B42;
    cursor: pointer
    &:first-child
      margin-right 18px
    &.u-actived
      background: #FFFFFF;
      color: #3B68F0;
      cursor: default
      .u-status
        color: #3B68F0;
  .u-title
    font-size 16px
</style>
