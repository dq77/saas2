<template lang='pug'>
.tab-card
  .tab-card__head
    .tab-card__head--title
      span {{ title || '标题' }}
      span.tab-card__head--subtitle(v-if='subtitle') {{ subtitle }}
  .tab-card__content
    slot
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String
  },
  emits: {},
  components: {},
  setup (props, {root}) {
    return {}
  }
}
</script>

<style lang='stylus' scoped>
// tab
.tab-card
  display flex
  flex-direction column
  margin-bottom 43px
  height 100%
  &__head
    display flex
    justify-content space-between
    align-items center
    margin-bottom 17px
    &--button
      margin-left 10px
    &--title
      color #494949
      font-size 16px
    &--subtitle
      margin-left 24px
      font-size 14px
      color #a9afb8
    &--right
      display flex
      align-items center
  &__content
    height 0
    flex 1
.el-icon-info
  margin-left 5px
</style>
