<template lang="pug">
  .gray-blocks(v-if='data.length>0')
    .gray-block(v-for='item in data')
      .gray-block--left
        .gray-block_label {{ item.label }}
        .gray-block_number {{ item.number }}
      .gray-block--right(:style='`background-image:url(${$assetsBaseUrl}/customerGuard/grayBlockIcons/`+item.iconName+")"')
</template>

<script>
export default {
  props: {
    data: {
      default() {
        return []
      },
      type: Array
    }
  }
}
</script>

<style lang="stylus" scoped>
.gray-blocks
  display flex
.gray-block
  display flex
  flex 1
  padding 20px 30px 20px 20px
  margin-right 8px
  background-color #F8F9FA
  justify-content center
  align-items center
  &:last-child
    margin-right 0
  &--left
    flex 1
  &--right
    width 80px
    height 60px
    background-repeat no-repeat
    background-size 100%
  &_label
    font-size 12px
    color #494949
  &_number
    margin-top 6px
    font-size 20px
    color #494949
    font-weight bold
</style>
