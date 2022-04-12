<template lang="pug">
  .title {{ title }}
</template>
<script>
export default {
  props: {
    title: String
  }
}
</script>
<style lang="stylus" scoped>
.title
  font-size var(--smallSize)
  font-weight 500
  color #494949
  line-height 17px
</style>
