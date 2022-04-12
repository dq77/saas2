<template lang='pug'>
.warn-card
  .warn-card__content
    .warn-card__name
      .warn-card__name-receive.warn-card-14 {{ item.receivablePlanName }}
      .warn-card-12(v-if='type === 1') {{ item.customerName }}
      .warn-card-12(v-if='type === 2') {{ item.fundType }}
    .warn-card__value
      .warn-card__value--left
        .warn-card__value-title.warn-card-12 应收总金额
        .warn-card-14 {{ item.receivableAmount | toAmountStr(2)}}
      el-progress.warn-card__value--right(type='circle' :percentage='Number(item.recycleRatio)' :width='44' :stroke-width='4' color='#3b68f0')
  .warn-card__status(:class='`warn-card__status--${item.status === "超期" ? 1 : 2}`')
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    type: Number
  }
}
</script>

<style lang='stylus' scoped>
.warn-card
  height 70px
  padding 0 20px
  color #494949
  background #F3F4F8
  border-radius 4px
  overflow hidden
  position relative
  &__content
    height 100%
    position relative
    z-index 9
    display flex
    justify-content space-between
    align-items center
  &__name
    &-receive
      margin-bottom 6px
  &__value
    display flex
    align-items center
    &-title
      margin-bottom 6px
    &--right
      margin-left 26px
  &__status
    position absolute
    left 0
    top 0
    z-index 1
    width 380px
    height 70px
    line-height 70px
    span
      margin-left 10px
      font-size 48px
    &--1
      background url(//cdn.qjdchina.com/static-online/saas/receiveAdmin/workSpace/warn1.png)
      span
        color #FF0028
        opacity .05
    &--2, &--undefined
      background url(//cdn.qjdchina.com/static-online/saas/receiveAdmin/workSpace/warn2.png)
      background-position 0 -5px
      span
        color #FEBB27
        opacity .2
.warn-card-14
  font-size 14px
  line-height 20px
.warn-card-12
  font-size 12px
  line-height 17px
</style>
