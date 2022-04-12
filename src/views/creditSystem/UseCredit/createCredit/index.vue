<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :loading="loading"
  :width="'600px'"
  :disabled="disabled"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  //- 表单
  CreateUse(ref="createRef" :checkInfo="checkInfo")
</template>
<script>
import { computed, ref } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import CreateUse from '../components/useCredit/createUse'
import useSubmit from '../components/useCredit/useSubmit'

export default {
  components: {
    Modal,
    CreateUse
  },
  props: {
    title: String,
    visible: Boolean,
    setInfo: Function,
    noticeInfo: Object,
    checkInfo: Function
  },
  setup(props, { emit }) {
    // ref
    const createRef = ref()
    // 是否可提交
    const disabled = computed(() => !!(props?.noticeInfo?.errorMsgList?.length && props?.noticeInfo?.limitType === '2'))
    // 取消
    const cancle = () => {
      props.setInfo && props.setInfo({})
      emit('cancleHandle')
    }
    // 成功
    const success = () => emit('successHandle')
    // useSubmit
    const {
      loading,
      sureHandle,
      cancleHandle
    } = useSubmit({ createRef, cancle, success })

    return {
      loading,
      disabled,
      createRef,
      sureHandle,
      cancleHandle
    }
  },
}
</script>
