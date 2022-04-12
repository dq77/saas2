<template lang="pug">
  .outer
    .outer-item(v-for='(item, i) in configData' :key='i')
      .outer-item-content {{item.value}}
      .outer-item-title {{item.title}}
      .outer-item-unit {{item.unit}}
</template>

<script>
export default {
  props: {
    configData: {
      type: Array,
      default: () => []
    }
  },
  setup() {
  },
}
</script>

<style lang="stylus" scoped>
.outer
  display flex
  border-radius 4px
  border 1px solid #EAEBEE
  height 150px
  padding 38px
  &-item
    flex 1
    text-align center
    border-left 1px solid #EAEBEE
    &:first-child
      border-left none
    &-content
      font-size 26px
      font-weight bold
    &-title
      color #9AA6B8
    &-unit
      color #9AA6B8
</style>
