<template lang="pug">
.page-main
  //- 操作指引
  Step(@addHandle="addHandle")
  //- 批量添加
  el-button(
    style="margin-bottom: 20px;"
    type="primary"
    v-if="permissions['PTN:RECEIVABLE:SEARCH_MANAGEMENT:BATCH_PLAN']"
    @click="uploadApis.openHandle"
  ) 批量添加
  //- 应收计划、应收款项
  Content(ref="contentRef")
  //- 批量导入-modal
  BatchUpload(
    :title="uploadApis.title"
    :visible="uploadApis.visible"
    :kind="'plain'"
    @cancleHandle="uploadApis.cancleHandle"
  )
</template>
<script>
import { reactive, toRefs, provide, ref } from '@vue/composition-api'
import store from '@/store'
import Step from '../components/step/index.vue'
import Content from '../components/content'
// 批量导入
import BatchUpload from '../components/upload/index.vue'
import useUpload from '../components/upload/useUpload'

export default {
  components: {
    Step,
    Content,
    BatchUpload
  },
  setup() {
    // store
    const { state: { permissions } } = store
    // ref
    const contentRef = ref()
    // 批量导入
    const uploadApis = useUpload()
    // 定义类型
    provide('kind', 'edit')
    // 添加款项
    const addHandle = () => contentRef.value && contentRef.value.openHandle()
    // state
    const state = reactive({ uploadApis })

    return {
      addHandle,
      contentRef,
      permissions,
      ...toRefs(state)
    }
  },
}
</script>
