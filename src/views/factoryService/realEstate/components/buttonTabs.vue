<template lang='pug'>
.tabs
  .tabs-nav
    el-button.tabs-nav__item(
      v-for='item in tabs'
      :key='item.name'
      :class='{"tabs-nav--current" : item.name === tabActive}'
      @click='changePage(item.name)'
    ) {{ item.label }}
  slot
</template>

<script>
// import { reactive, ref, toRefs } from '@vue/composition-api'
export default {
  props: {
    tabs: {
      type: Array,
      default: () => ([])
    },
    tabActive: {
      type: String,
      default: ''
    }
  },
  emits: ['changeTab'],
  components: {},
  setup (props, { emit }) {
    const changePage = (name) => {
      emit('changeTab', name)
    }
    return {
      changePage
    }
  }
}
</script>

<style lang='stylus' scoped>
.tabs
  display flex
  justify-content space-between
  align-items center
.tabs-nav
  display flex
  align-items center
  &__item
    height auto
    padding 13px 30px
    font-size 14px
    color #3C5DA4
    border none
    border-radius 4px
    box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.05)
  &--current
    background #3C5DA4
    color #fff
</style>
