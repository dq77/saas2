<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :loading="loading"
  :width="'600px'"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  CreatePay(ref="createPayRef")
</template>
<script>
import { ref } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import CreatePay from '../components/repayMent/createPay'
import useSubmit from '../components/repayMent/useSubmit'

export default {
  components: {
    Modal,
    CreatePay
  },
  props: {
    title: String,
    visible: Boolean
  },
  setup(props, { emit }) {
    // ref
    const createPayRef = ref()
    // 取消
    const cancle = () => emit('cancleHandle')
    // 成功
    const success = () => emit('successHandle')
    // useSubmit
    const {
      loading,
      sureHandle,
      cancleHandle
    } = useSubmit({ createPayRef, cancle, success })

    return {
      loading,
      createPayRef,
      sureHandle,
      cancleHandle,
    }
  },
}
</script>
