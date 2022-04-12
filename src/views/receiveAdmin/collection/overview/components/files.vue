<template lang="pug">
fragment
  div(v-if='!fileList') - -
  div(v-else)
    div(
      v-for='(item, i) in fileList'
      :key='i'
      style="color: #4A71F0; padding: 0; margin-right: 10px; cursor: pointer; display: inline-block;"
        @click='clickPreviewFile(item)'
    ) {{item.fileName}}
</template>
<script>
import { toPrefixUrl } from '@/utils/util'

export default {
  props: {
    fileList: {
      type: Array,
      default: () => ([])
    }
  },
  setup() {
    const clickPreviewFile = item => window.open(toPrefixUrl(`/fs/file/download?fileKey=${item.fileKey}`))

    return {
      clickPreviewFile,
      toPrefixUrl
    }
  },
}
</script>
