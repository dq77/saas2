<template lang='pug'>
.p-box(v-if='data && data.length')
  .box-item(v-for='item in data' :class='item.status === 2 ? "box-warn" : ""' :key='item.dimension')
    .box-head
      .box-title {{item.dimension}}
      .box-desc {{item.level}}
    .box-content {{item.content}}
</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props) {}
}
</script>

<style lang='stylus' scoped>
.p-box
  display flex
  .box-item
    flex 0.25 0 0
    padding 20px
    margin-right 10px
    background #F5FAFF
    border-radius 4px
    &:last-child
      margin-right 0
    .box-head
      display flex
      align-items baseline
      .box-desc
        font-size 20px
        font-weight bold
        color #3B68F0
        margin-left 5px
      .box-title
        font-weight 500
        color #494949
    .box-content
      margin-top 10px
      color #6D7278
  .box-warn
    background #FEF1F1
    .box-head
      .box-desc
        color #E95257
</style>
