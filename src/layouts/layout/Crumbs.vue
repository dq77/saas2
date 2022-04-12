<template lang="pug">
  .crumbs-wrap
    .crumbs
      span(v-for='(item,index) in list' :key='`${item}${index}`') {{ item }}
        span(v-if='index<list.length-1') &nbsp;/&nbsp;
    .crumbs(v-if='show')
       identify-switch
</template>

<script>
import IdentifySwitch from '../IdentifySwitch/index'

export default {
  components: {
    IdentifySwitch
  },
  computed: {
    list() {
      return this.$route.meta.crumbs
    },
    show() {
      return this.$route.path.split('/')[2] === 'supplyChain'
    }
  },

}
</script>

<style lang="stylus" scoped>
.crumbs-wrap
  display flex
  justify-content space-between
  flex: 44px 0 0
  .crumbs
    padding 20px 30px 10px
    font-size 12px
    color rgba(73, 73, 73, 1)
    box-sizing border-box
    &>span
      vertical-align text-bottom
      line-height 12px
</style>
