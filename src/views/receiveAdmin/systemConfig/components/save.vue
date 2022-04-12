<template lang='pug'>
.save
  el-button.save--button(type='primary' @click='saveHandle' :loading='loading') 保存
</template>

<script>
import useAsync from 'hooks/useAsync'
import { useEventBus } from '@vueuse/core'
import ajaxStore from '@/apis'
import { Message } from 'element-ui'

export default {
  props: {
    dictCategoryCode: String,
    list: {
      type: Array,
      default: () => ([])
    }
  },
  setup (props) {
    // ajaxStore
    const { receive: { configGetMenuUpdate } } = ajaxStore
    // useEventBus
    const busInit = useEventBus('initHandle')
    // methods
    const saveHandle = async() => {
      const ids = props.list && props.list.map(item => item.id)
      if (!props.dictCategoryCode) {
        Message.error('参数信息不足，缺少dictCategoryCode')
        return
      }
      if (!ids.length) {
        Message.error('最少保存一条信息')
        return
      }
      const { code } = await doResult({ ids, dictCategoryCode: props.dictCategoryCode })
      if (code === '0') {
        Message.success('保存成功')
        busInit.emit()
      }
    }
    // useAsync
    const { loading, doResult } = useAsync({
      init: false,
      isLoading: true,
      request: configGetMenuUpdate,
    })
    return {
      loading,
      doResult,
      saveHandle
    }
  }
}
</script>

<style lang='stylus' scoped>
.save
  margin-top 70px
  height 60px
  text-align center
  line-height 60px
  border-top 1px solid #ECEDF1
  &--button
    min-width 67px
</style>
