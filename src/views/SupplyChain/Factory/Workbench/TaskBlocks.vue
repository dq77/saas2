<template lang="pug">
.p-task-blocks
  .u-block(v-for='task in taskCardConfig')
    .u-title {{ task.title }}
    .u-handle-group
      template(v-for='handle in task.handleGroup')
        .u-num(
          :class='{"u-link": data[handle.key]}'
          @click='clickGoto(handle.goto)'
        ) {{ handle.renderFn(data[handle.key], handle.key) }}
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { taskCardConfig } from './config'

export default defineComponent({
  props: {
    data: {
      type: Object
    }
  },
  setup(props, { root }) {
    const clickGoto = (obj) => root.$router.push(obj)
    return {
      taskCardConfig,
      clickGoto
    }
  },
})
</script>

<style lang="stylus" scoped>
.p-task-blocks
  display flex
  border-radius 4px
  border 1px solid #EAEBEE
  .u-block
    flex 1
    padding 20px
    width 0
    border-left 1px solid #eaebee
    &:first-child
      border-left none
  .u-handle-group
    margin-top 10px
  .u-num
    display inline
    margin-left 10px
    color #9aa6b8
    &:first-child
      margin-left 0
    &.u-link
      cursor: pointer
      &:hover
        color: var(--defaultColor)
</style>
