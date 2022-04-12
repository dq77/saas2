<template lang="pug">
.page-main
  .content_box
    el-button.content_upload(type="text" @click="uploadState.openHandle") 批量导入还款单
    .content_form
      CreatePay(ref="createPayRef")
      .content_btns
        el-button(@click="cancleHandle") 重置
        el-button(type="primary" :loading="loading" @click="sureHandle") 提交
  //- 批量导入-modal
  UploadModal(
    :title="uploadState.title"
    :visible="uploadState.visible"
    @cancleHandle="uploadState.cancleHandle"
  )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import CreatePay from '../components/repayMent/createPay'
import useSubmit from '../components/repayMent/useSubmit'
// 批量导入
import UploadModal from '../uploadModal/index.vue'
import useUpload from '../uploadModal/useUpload'

export default {
  components: {
    CreatePay,
    UploadModal
  },
  setup(props, { root: { $router } }) {
    // ref
    const createPayRef = ref()
    // success
    const success = () => $router.push({ name: 'usePaySuccess', query: { key: 'pay' } })
    // useSubmit
    const {
      loading,
      sureHandle,
      cancleHandle
    } = useSubmit({ createPayRef, success })
    // 批量上传-modal
    const uploadState = useUpload()
    // state
    const state = reactive({ uploadState })

    return {
      loading,
      createPayRef,
      sureHandle,
      cancleHandle,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.content_box
  position: relative
  background: #fff
  display: flex
  justify-content: center
  .content_upload
    position: absolute
    top 20px
    right: 30px
  .content_form
    width: 500px
    padding: 60px 0
    .content_btns
      display: flex
      justify-content: flex-end
      padding-top: 10px
</style>
