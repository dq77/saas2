<template lang="pug">
  .footer ©{{year}} 杭州仟金顶信息技术有限公司
</template>

<script>
export default {
  computed: {
    year () {
      const d = new Date()
      return d.getFullYear()
    }
  }
}
</script>

<style lang="stylus" scoped>
.footer
  color #9AA6B8
  text-align center
  line-height 60px
</style>
