<template lang='pug'>
.config-button(@dragstart="dragStartHandle" @dragend="dragEndHandle")
  button.config-button--li(
    :class='[{"is-disabled" : disabled}, {"is-selected" : selected}]'
    :draggable="!disabled && draggable"
  ) {{ name }}
  i.el-icon-circle-close(v-if='isClose' @click='deleteHandle')
</template>

<script>
import useAsync from 'hooks/useAsync'
import { useEventBus } from '@vueuse/core'
import ajaxStore from '@/apis'
import { MessageBox, Message } from 'element-ui'

export default {
  props: {
    name: String, // 按钮名字
    isClose: { // 是否有删除icon
      type: Boolean,
      default: false
    },
    disabled: { // 是否禁用状态
      type: Boolean,
      default: false
    },
    selected: { // 是否选中状态
      type: Boolean,
      default: false
    },
    isChoose: { // 是否是选中框内的按钮
      type: Boolean,
      default: false
    },
    draggable: { // 主要针对收款状态配置不需要拖拽
      type: Boolean,
      default: true
    },
    id: [Number, String] // 用来识别按钮唯一key
  },
  setup (props) {
    // ajaxStore
    const { receive: { configDeleteDict } } = ajaxStore
    // useEventBus
    const busInit = useEventBus('initHandle')
    const busIsChoose = useEventBus('isChooseHandle')
    // useAsync
    const { doResult } = useAsync({
      init: false,
      isLoading: true,
      request: configDeleteDict
    })
    // methods
    // 触发dragstart事件，并将组件信息记录于dataTransfer
    const dragStartHandle = (e) => {
      const { dataTransfer } = e
      dataTransfer.setData('id', props.id)
    }
    // 删除
    const deleteHandle = () => {
      openMessageBox({ id: props.id })
    }
    const openMessageBox = (params) => {
      MessageBox.confirm('是否确认删除当前自定义类型？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            try {
              instance.confirmButtonLoading = true
              const { code } = await doResult(params)
              if (code === '0') {
                Message.success('删除成功')
                busInit.emit()
              }
            } catch (error) {
              console.error(error)
            }
            instance.confirmButtonLoading = false
          }
          done()
        }
      }).then(() => {
      }).catch(() => {
      })
    }
    // dragEndHandle
    const dragEndHandle = (e) => {
      busIsChoose.emit({ id: props.id, isChoose: props.isChoose }) // 选中框内的拖动
    }

    return {
      doResult,
      deleteHandle,
      dragStartHandle,
      dragEndHandle
    }
  }
}
</script>

<style lang='stylus' scoped>
.config-button
  position relative
  &--li
    min-width 78px
    padding 7px 20px
    font-size 12px
    color #494949
    border 1px solid #E1E1E1
    border-radius 4px
    box-shadow 0px 3px 13px 3px rgba(140, 140, 140, 0.1)
    background #fff
    overflow hidden
    cursor pointer
    &:hover
      color #3b68f0
      border-color #c4d2fb
      background-color #ebf0fe
    &.is-disabled
      color rgba(73, 73, 73, .5)
      background-color #fff
      border-color rgba(225, 225, 225, .5)
      cursor not-allowed
    &.is-selected
      color #fff
      background-color #3B68F0
      border-color #3B68F0
      &.is-disabled
        background-color #a0cfff
        border-color #a0cfff
  .el-icon-circle-close
    position absolute
    top -9px
    right -9px
    font-size 18px
    color #E1E1E1
    border-radius 9px
    background #fff
    cursor pointer
    &:hover
      color #999
</style>
