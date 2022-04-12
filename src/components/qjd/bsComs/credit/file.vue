<template lang="pug">
fragment
  div(v-if='!fileList') - -
  div(v-else)
    div(
      style="margin-bottom: 4px;"
      v-for='(item, i) in Object.values(fileList)'
      :key='i'
    )
      div(style="margin-bottom: 4px;") {{ item.tagName }}
      div(
        v-for="(child, index) in item.data"
        :key="index"
        style="padding-left: 20px; display: flex; margin-bottom: 4px;"
      )
        div(
          style="color: #4A71F0; padding: 0; margin-right: 5px; cursor: pointer;"
          @click='clickPreviewFile(child)'
        ) {{child.fileName}}
        a(
          :href='toPrefixUrl(`/fs/file/download?fileKey=${child.fileId}`)'
          :download='child.fileName'
        ) 下载
</template>
<script>
import { toPrefixUrl } from '@/utils/util'

export default {
  props: {
    fileList: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    // 下载
    const clickPreviewFile = file => window.open(toPrefixUrl(`/fs/file/download?fileKey=${file.fileId}`))

    return {
      clickPreviewFile,
      toPrefixUrl
    }
  },
}
</script>
