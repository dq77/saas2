<template lang='pug'>
.config-choose
  .config-title {{ choose.title || '请将您需要的内容拖至此处：' }}
  .config-choose__list(
    ref='target'
    @drop.prevent="dropHandle"
    @dragover.prevent
    @dragenter.prevent
  )
    el-scrollbar(style="height: 100%; width: 100%;")
      ConfigButton.config-choose__list--li(
        v-for='item in choose.list'
        :key='item.id'
        :name='item.dictName'
        :id='item.id'
        :disabled='!item.moveFlag'
        :isChoose='true'
        selected
      )
</template>

<script>
import ConfigButton from './configButton'
import { ref } from '@vue/composition-api'
import { useEventBus, useMouseInElement } from '@vueuse/core'

export default {
  props: {
    choose: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    ConfigButton
  },
  setup (props) {
    // state
    const target = ref(null)
    // 是否在框外
    const { isOutside } = useMouseInElement(target)
    // useEventBus
    const busChoose = useEventBus('chooseHandle')
    const busIsChoose = useEventBus('isChooseHandle')
    // 是否是选中框内的拖动
    const isChooseHandle = (data = {}) => {
      const { id, isChoose } = data
      if (!isChoose || !isOutside.value) return
      busChoose.emit({ id, isAdd: false })
    }
    busIsChoose.on(isChooseHandle)
    // 鼠标放下添加组件信息
    const dropHandle = (e) => {
      const { dataTransfer } = e
      const id = dataTransfer.getData('id')
      busChoose.emit({ id, isAdd: true })
    }

    return {
      target,
      dropHandle
    }
  }
}
</script>

<style lang='stylus' scoped>
@import './style.styl'

.config-choose__list
  width 585px
  height 230px
  padding 20px
  border-radius 4px
  border 1px dashed #E1E1E1
  &--li
    height 32px
    margin-right 20px
    margin-bottom 20px
    &:last-child
      margin-right 0

/deep/ .el-scrollbar__view
  display flex
  flex-wrap wrap
  align-content flex-start
</style>
