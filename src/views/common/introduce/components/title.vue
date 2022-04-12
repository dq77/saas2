<template lang='pug'>
.ins-title {{ text }}
  .line
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    text: {
      type: String
    }
  }
}
</script>

<style lang='stylus'>
.ins-title
  font-size 26px
  text-align center
  padding 36px 0 30px
  .line
    width 30px
    height 3px
    background-color #3B68F0
    margin 0 auto
    margin-top 10px
</style>
