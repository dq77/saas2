<template lang="pug">
el-popover(
  :width="width"
  :placement="placement"
  trigger="hover"
)
  template(slot="reference")
    div(style="display: inline-block; cursor: pointer;")
      img.info_total(:src="`${$assetsBaseUrl}/creditSystem/overview/info.png`")
      slot(name="content")
  slot
</template>
<script>
export default {
  props: {
    width: [String, Number],
    placement: {
      tyoe: String,
      default: 'bottom-start'
    },
  },
  setup() {

  },
}
</script>
<style lang="stylus" scoped>
.info_total
  width 12px
  height 12px
  position relative
  top 2px
  left 4px
</style>
