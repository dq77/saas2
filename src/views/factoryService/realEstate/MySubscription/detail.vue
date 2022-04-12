<template lang='pug'>
.subscription-details
  iframe.subscription-iframe(
    v-if='fileKey'
    :src="src"
    frameborder='0'
  )
  .empty(v-else) 暂无数据
</template>

<script>
import { toPrefixUrl } from '@/utils/util'
import { ref, watch } from '@vue/composition-api'

export default {
  props: {
    fileKey: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const src = ref('')
    const setUrl = (fileKey) => {
      return `${toPrefixUrl('/partner/common/file/download')}?fileKey=${fileKey}#scrollbars=0&toolbar=0&statusbar=0`
    }
    watch(() => props.fileKey, (value) => {
      src.value = setUrl(value)
    }, {
      immediate: true
    })
    return {
      src
    }
  }
}
</script>

<style lang='stylus' scoped>
.subscription-iframe
  width 100%
  min-height 100vh
.empty
  height 500px
  background #fff
  border-radius 4px
  display flex
  align-items center
  justify-content center
  color #494949
</style>
