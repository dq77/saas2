<template lang="pug">
.info(v-if='baseInfoData')
  .info_item(v-for='(item, i) in baseInfoList')
    span.title {{item.label}}：
    span.value {{item.enums ? item.enums[baseInfoData[item.key]] : baseInfoData[item.key]}}
</template>

<script>
export default {
  props: {
    // 要渲染的列表
    baseInfoList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 数据
    baseInfoData: {
      type: Object
    },
  },
  setup(props) {
    return {
    }
  },
}
</script>

<style lang="stylus" scoped>
.info
  background-color #F4F9FD
  border-radius 4px
  display flex
  padding 20px
  flex-wrap wrap
  margin-bottom 20px
  &_item
    width 50%
    line-height 32px
    &:nth-child(2n+1)
      border-right 1px #CDD0D4 dashed
    .title
      width 120px
      text-align right
      display inline-block
      margin-right 10px
      color #738A9E
</style>
