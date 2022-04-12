<template lang='pug'>
.tab-card
  .tab-card__head
    .tab-card__head--title
      span {{ title || '标题' }}
      el-popover(
        v-if='isPopover'
        placement="top"
        trigger="hover"
      )
        slot(name='popover')
        i.el-icon-info(slot="reference")
    .tab-card__head--right
      slot(name='headRight')
      el-button.tab-card__head--button(@click='link' v-if='isMore' :disabled='isMoreDisabled') 更多
  .tab-card__content
    slot
</template>

<script>
import Router from '@/router'
export default {
  props: {
    title: String,
    isMore: Boolean,
    isMoreDisabled: Boolean,
    isPopover: Boolean,
    type: String
  },
  emits: {},
  components: {},
  setup (props, {root}) {
    const link = () => {
      const { corpName, regCode } = root.$route.query
      const query = {
        companyName: corpName,
        creditCode: regCode
      }
      if (props.type) query.link = props.type
      const url = Router.resolve({
        name: 'enterpriseImage',
        query
      })
      window.open(url.href, '_blank')
    }
    return {
      link
    }
  }
}
</script>

<style lang='stylus' scoped>
// tab
.tab-card
  display flex
  flex-direction column
  margin-bottom 30px
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
    &--right
      display flex
      align-items center
  &__content
    height 0
    flex 1
.el-icon-info
  margin-left 5px
</style>
