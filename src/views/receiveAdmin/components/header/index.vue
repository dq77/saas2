<template lang="pug">
  .header
    .header-left
      span.header-line
      span {{title}}
    slot
</template>
<script>
export default {
  props: {
    title: String
  }
}
</script>
<style lang="stylus" scoped>
.header
  height 50px
  display flex
  justify-content space-between
  align-items center
  box-sizing border-box
  padding 0 20px
  border-bottom 1px solid #EAEBEE
  .header-left
    display flex
    align-items center
    font-weight: 500;
    color: #494949;
    font-size 14px
    .header-line
      display inline-block
      height 14px
      width 3px
      background: #3B68F0;
      border-radius: 2px;
      margin-right 4px
</style>
