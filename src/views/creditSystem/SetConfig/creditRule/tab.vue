<template lang="pug">
.rule_tabs
  .rule_item(@click="() => selectHandle(1)" :class="currentIndex === 1 ? 'rule_item_select' : ''") 配置营销策略
  .rule_item(@click="() => selectHandle(2)" :class="currentIndex === 2 ? 'rule_item_select' : ''") 启用营销策略
</template>
<script>
export default {
  props: {
    currentIndex: Number
  },
  setup(props, { emit }) {
    const selectHandle = index => emit('selectHandle', index)

    return {
      selectHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
.rule_tabs
  display flex
  width calc(100% + 40px)
  height 50px
  background #EFF2F6
  border 1px solid #EAEBEE
  margin-left -20px
  .rule_item
    width 146px
    height 50px
    text-align center
    line-height 50px
    font-size 14px
    font-weight 500
    color #494949
    cursor pointer
  .rule_item_select
    color rgba(59, 104, 240, 1)
    background #fff
</style>
