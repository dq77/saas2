<template lang="pug">
.tab-btns
  .tab-btns-item(:class='{"btn-active" :currentTab === item.value}' v-for='item in dataSource' @click='tabClick(item.value)') {{item.label}}
</template>

<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    defaultTab: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      currentTab: props.defaultTab
    })
    const tabClick = (name) => {
      state.currentTab = name
      emit('tabClick', name)
    }

    watch(
      () => props.defaultTab,
      (value) => {
        state.currentTab = value
      }
    )

    return {
      tabClick,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tab-btns
  border-right 1px solid #EAEBEE
  width 200px
  padding-top 18px
  min-height 700px
  .tab-btns-item
    width 100%
    height 50px
    line-height 10px
    text-align center
    color #494949
    cursor pointer
    font-size 14px
    padding 20px 0
  .tab-btns-item.btn-active,
  .tab-btns-item:hover
    background #F5FAFF
    color #3B68F0
</style>
