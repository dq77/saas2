<template lang='pug'>
.groups
  ButtonGroup.button-ability(
    v-for='(item, index) in config'
    :key='item.title'
    :title='item.title'
    :dataSource='item.lists'
    :current='current'
    :isGroups='true'
    @change='changeGroup'
  )
    span.button--split(v-if='item.split')
</template>

<script>
// components
import ButtonGroup from './buttonGroup'
export default {
  props: {
    config: {
      type: Array,
      default: () => ([])
    },
    current: String
  },
  emits: ['change'],
  components: { ButtonGroup },
  setup (props, {emit}) {
    const changeGroup = (data) => {
      emit('change', data)
    }
    return {
      changeGroup
    }
  }
}
</script>

<style lang='stylus' scoped>
.groups
  // display flex
  // align-items center
  // flex-wrap wrap
.button-ability
  margin-top 10px

.button--split
  margin 0 50px
  height 20px
  border-left 1px solid #A9AFB8

@media screen and (max-width: 1300px){
  .button--split {
    visibility hidden
  }
}
</style>
