<template lang="pug">
  .unit(
    :style="left ? `left: ${left}px` : `right: 1px`"
  ) {{ unit }}
</template>
<script>
export default {
  props: {
    unit: String,
    left: Number
  }
}
</script>
<style lang="stylus" scoped>
.unit
  height: 30px
  width: 40px
  background-color: #f5f7fa
  line-height: 32px
  text-align: center
  position: absolute
  top 0
  // left: 109px
  top 1px
  border-left: 1px solid #e4e7ed
  border-radius: 0 4px 4px 0
</style>
