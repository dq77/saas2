<template lang="pug">
fragment
  div(v-if='!fileList') - -
  div(v-else)
    div(
      v-for='(item, i) in fileList'
      :key='i'
      style="color: #4A71F0; padding: 0; margin-right: 10px; cursor: pointer; display: block;"
      @click='clickPreviewFile(item)'
    ) {{item[fileName]}}
</template>
<script>
import { toPrefixUrl } from '@/utils/util'

export default {
  props: {
    fileList: {
      type: Array,
      default: () => ([])
    },
    fileKey: {
      type: String,
      default: 'fileKey'
    },
    fileName: {
      type: String,
      default: 'fileName'
    }
  },
  setup(props) {
    // 预览
    const clickPreviewFile = item => window.open(toPrefixUrl(`/fs/file/download?fileKey=${item[props.fileKey]}`))

    return {
      clickPreviewFile,
      toPrefixUrl
    }
  },
}
</script>
