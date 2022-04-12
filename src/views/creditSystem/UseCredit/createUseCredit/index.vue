<template lang="pug">
.page-main
  .content_box
    el-button.content_upload(type="text" @click="uploadHandle") 批量导入用信单
    .content_form
      CreateUse(ref="createRef" :checkInfo="checkInfo")
      .content_btns
        el-button(@click="cancleHandle") 重置
        el-button(type="primary" :loading="loading" @click="sureHandle") 提交
  //- 批量导入-modal
  UploadModal(
    :title="uploadState.title"
    :visible="uploadState.visible"
    :setInfo="setInfo"
    :noticeInfo="noticeInfo"
    @cancleHandle="uploadState.cancleHandle"
  )
  //- 提示
  Notice(
    v-if="noticeInfo && noticeInfo.errorMsgList && noticeInfo.errorMsgList.length"
    :type="noticeInfo && noticeInfo.limitType ? noticeInfo.limitType === '1' ? 'warn' : noticeInfo.limitType === '2' ? 'error' : '' : ''"
    :member="noticeInfo ? noticeInfo.targetName : ''"
    :rules="noticeInfo ? noticeInfo.errorMsgList : []"
  )
</template>
<script>
import { ref, toRefs, reactive } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Notice from '@/components/qjd/notice'
import CreateUse from '../components/useCredit/createUse'
import useSubmit from '../components/useCredit/useSubmit'
// 批量导入
import UploadModal from '../uploadModal/index.vue'
import useUpload from '../uploadModal/useUpload'

export default {
  components: {
    Notice,
    CreateUse,
    UploadModal
  },
  setup(props, { root: { $router } }) {
    // ajax
    const { credit: { checkBusinessRules } } = ajaxStore
    // ref
    const createRef = ref()
    // 存储消息提示信息
    const noticeInfo = ref({})
    // 设置消息提示信息
    const setInfo = value => { noticeInfo.value = value }
    // success
    const success = () => $router.push({ name: 'useCreditSuccess', query: { key: 'use' } })
    // 批量上传-modal
    const uploadState = useUpload()
    // useSubmit
    const {
      loading,
      sureHandle,
      cancleHandle
    } = useSubmit({ createRef, success })
    // 消息提示接口
    const { doResult: checkInfo } = useAsync({
      params: { appScenario: 'create_order' },
      isLoading: false,
      request: checkBusinessRules,
      successCallBack: ({ code, data }) => code === '0' && setInfo(data ?? {})
    })
    // up
    const uploadHandle = () => {
      checkInfo()
      uploadState.openHandle()
    }
    // state
    const state = reactive({ uploadState })

    return {
      ...toRefs(state),
      loading,
      createRef,
      sureHandle,
      cancleHandle,
      noticeInfo,
      setInfo,
      checkInfo,
      uploadHandle
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
</style>
