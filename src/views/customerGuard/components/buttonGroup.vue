<template lang='pug'>
.group
  .group-title {{ title }}
  ul.group-buttons(v-if='isArray')
    li.group-button(
      v-for='(item, index) in dataSource || []'
      :key='index'
      :class='{"group-button--current" : item === current}'
      @click='clickPeriod(item, index)'
    ) {{ item }}
  slot
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
  props: {
    title: String,
    dataSource: {
      type: Array,
      default: () => ([])
    },
    current: String,
    isGroups: Boolean
  },
  emits: ['change'],
  components: {},
  setup (props, { emit }) {
    const clickPeriod = (item, index) => {
      emit('change', {item, index})
    }

    const isArray = computed(() => {
      return Array.isArray(props.dataSource)
    })

    return {
      clickPeriod,
      isArray
    }
  }
}
</script>

<style lang='stylus' scoped>
.group
  display flex
  align-items center
.group-title
  width 75px
  color #A9AFB8
  font-size 12px
.group-buttons
  flex-grow 1
  display flex
  align-items center
.group-button
  min-width 60px
  padding 0 5px
  height 24px
  margin-right 40px
  line-height 22px
  text-align center
  border-radius 2px
  border 1px solid #fff
  cursor pointer
  &:last-child
    margin-right 0
  &--current
    color #fff
    background #3B68F0
    border-color #3B68F0
  &:hover
    border-color #3B68F0
</style>
