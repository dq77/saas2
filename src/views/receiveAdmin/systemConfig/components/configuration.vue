<template lang='pug'>
.config
  .config-types(v-for='(option, key) in options' :key='key')
    .config-title {{ option.title || '配置类型'}}
    .config__list
      template(v-if='!dictCategoryCode')
        ConfigButton.config__list--li(
          v-for='item in option.list'
          :key='item.id'
          :name='item.dictName'
          :isClose='option.isCustomize && item.dictStatus !== "1"'
          :disabled='item.dictStatus === "1"'
          :draggable='true'
          :id='item.id'
        )
      template(v-else)
        ConfigButton.config__list--li(
          v-for='item in option.list'
          :key='item.id'
          :name='item.dictName'
          :isClose='option.isCustomize && !item.isConfiguration'
          :disabled='item.isConfiguration'
          :draggable='false'
          :id='item.id'
        )
      el-button.config__list--add(icon="el-icon-plus" v-if='option.isCustomize' @click='addHandle')
</template>

<script>
/**
 * props.options
 * @param {string} title
 * @param {array} list
 * @param {boolean} isAdd 是否有添加按钮
 */
import ConfigButton from './configButton'
import { useEventBus } from '@vueuse/core'

export default {
  props: {
    options: {
      type: Array,
      default: () => ([])
    },
    dictCategoryCode: String
  },
  components: {
    ConfigButton
  },
  setup (props) {
    // useEventBus
    const bus = useEventBus('cancleHandle')
    // methods
    const addHandle = () => {
      bus.emit(true)
    }
    return {
      addHandle
    }
  }
}
</script>

<style lang='stylus' scoped>
@import './style.styl'

.config-types
  margin-bottom 6px
.config__list
  display flex
  flex-wrap wrap
  &--li
    margin-right 20px
    margin-bottom 20px
    &:last-child
      margin-right 0
  &--add
    min-width 78px

/deep/ .el-scrollbar__view
  display flex
  flex-wrap wrap
  align-content flex-start
</style>
