<template lang="pug">
  customInfo.form_info(
    :style="`right: ${right}px`"
  )
    span {{ content }}
</template>
<script>
import customInfo from '../../../customInfo'

export default {
  components: {
    customInfo
  },
  props: {
    content: {
      type: String,
      default: '若需自定义选项，可前往【应收系统配置】菜单进行配置'
    },
    right: {
      type: Number,
      default: -14
    }
  }
}
</script>
<style lang="stylus" scoped>
.form_info
  position: absolute
  top 0
</style>
