<template lang="pug">
Modal(
  :title="title"
  :width="'600px'"
  :visible="visible"
  :showSure="false"
  @cancleHandle="cancleHandle"
)
  div(v-loading="loading" style="padding-bottom: 10px;")
    Files(:fileList="files" v-show="files && files.length")
    Empty(v-show="!files || !files.length")
</template>
<script>
import { computed, watch } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Files from '@/components/qjd/files'
import Empty from '@/components/qjd/empty'

export default {
  components: {
    Modal,
    Files,
    Empty
  },
  props: {
    title: String,
    visible: Boolean,
    detail: String
  },
  setup(props, { emit }) {
    // ajax
    const { receive: { getFileLists } } = ajaxStore
    // 变更授信接口
    const { doResult, loading, result } = useAsync({ request: getFileLists, init: false })
    // 处理数据
    const files = computed(() => result?.value ?? [])
    // 取消
    const cancleHandle = () => emit('cancleHandle')
    // watch
    watch(
      () => props.visible,
      value => value && doResult({ businessId: props.detail })
    )

    return {
      cancleHandle,
      loading,
      files
    }
  },
}
</script>
