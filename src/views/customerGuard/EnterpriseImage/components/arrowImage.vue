<template lang="pug">
.arrow-image
  .arrow-image-item(v-for='(item, index) in dataSource')
    template(v-for='(list, key) in item')
      template(v-if='key')
        .arrow-person(v-if='list.type === "human"') {{list.value}}
        .arrow-line(v-if='list.type === "percent"')
          .arrow-icon
          span.arrow-number {{list.value}}
        .arrow-company(v-if='list.type === "company"') {{list.value}}
</template>

<script>
import { watch } from '@vue/composition-api'
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    watch(
      () => props.dataSource.value,
      (value) => {
        console.log(value, 'watch')
      }
    )
  }
}
</script>

<style lang="stylus" scoped>
.arrow-image
  padding 40px 20px
  .arrow-image-item
    display flex
    width max-content
    margin-bottom 20px
    font-size 14px
    .arrow-person
      color #3B68F0
      background #F5FAFF
      border 1px solid #EAEBEE
      padding 7px 15px
    .arrow-company
      color #494949
      border 1px solid #EAEBEE
      padding 7px 15px
    .arrow-line
      width 120px
      height 1px
      border-top 1px solid #E0E0E0
      margin-top 15px
      position relative
      .arrow-icon
        width 0
        height 0
        border-top 5px solid transparent
        border-left 10px solid #3B68F0
        border-bottom 5px solid transparent
        position absolute
        right 2px
        top -5px
      .arrow-number
        color #494949
        background #ffffff
        padding 0 3px
        position absolute
        left 30%
        top -8px
</style>
