<template lang="pug">
.collection-tab
  div.tab-item(
    v-for="(item, index) in list"
    @click="() => selectHandle(index+1)"
    :class="currentIndex === index+1 ? 'tab-item-select' : ''"
  ) {{ item.label }}
</template>
<script>

export default {
  props: {
    currentIndex: Number
  },
  setup(props, { emit }) {
    const list = [
      { label: '应收详情'},
      { label: '联系方式'},
      { label: '阶段回款记录'},
      { label: '催收记录'}
    ]
    const selectHandle = index => emit('selectHandle', index)

    return {
      selectHandle,
      list
    }
  },
}
</script>
<style lang="stylus" scoped>
.collection-tab
  display flex
  height 50px
  .tab-item
    padding 0 40px
    height 50px
    text-align center
    line-height 50px
    font-size 16px
    font-weight 500
    color var(--fontColor)
    cursor pointer
    background #eef0f5
    &:first-child
      border-radius var(--defaultStadius) 0 0
  .tab-item-select
    background #fff
</style>
