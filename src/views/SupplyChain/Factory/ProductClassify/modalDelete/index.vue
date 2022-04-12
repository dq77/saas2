<template lang="pug">
el-dialog(
    width='400px'
    title='删除类目'
    :visible.sync='visible'
  )
    div 是否删除{{detail.name}}类目？
    span(slot='footer')
      el-button(@click='cancleHandle') 取消
      el-button(type='primary' :loading='loading' @click='sureHandle') 确认
</template>
<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { Message } from 'element-ui'

export default {
  components: {
  },
  props: {
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const { delCategory } = ajaxStore.factory
    //  取消
    const cancleHandle = () => {
      emit('cancleHandle')
    }
    // 成功回调
    const successCallBack = ({ code, data }) => {
      if (code === '0') {
        Message.success('删除成功')
        cancleHandle()
        emit('successHandle')
      }
    }
    // 确定-接口
    const {
      doResult,
      loading
    } = useAsync({
      init: false,
      request: delCategory,
      successCallBack
    })
    // 确定
    const sureHandle = () => doResult({id: props.detail.id})

    const state = reactive({
      loading,
    })
    // 回显
    watch(
      () => props.visible,
      val => {}
    )

    return {
      loading,
      cancleHandle,
      sureHandle,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.pay-detail
  padding 10px 0
.cycle-footer
  display flex
  justify-content center
</style>
