<template lang="pug">
el-scrollbar.list-scroll
  .list-item(
    v-for="(item, index) in dataSource"
    :key="index"
    :class="index === 0 ? 'list-one' : index === 1 ? 'list-two' : index === 2 ? 'list-three' : ''"
  )
    .list-item-left
      img.list-item-index(:src="`${$assetsBaseUrl}/creditSystem/overview/one.png`", v-if="index === 0")
      img.list-item-index(:src="`${$assetsBaseUrl}/creditSystem/overview/two.png`", v-if="index === 1")
      img.list-item-index(:src="`${$assetsBaseUrl}/creditSystem/overview/three.png`", v-if="index === 2")
      span.list-item-index(v-if="index > 2") {{ index + 1 }}
      .list-item-content {{ item && item[options.user] ? item[options.user] : '- -' }}
    .list-item-money {{ item && item[options.money] ? toAmountStr(Number(item[options.money]), 2, true, true) : '' }}
</template>
<script>
import { toAmountStr } from '@/utils/util'

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    return {
      toAmountStr
    }
  }
}
</script>
<style lang="stylus" scoped>
.list-scroll
  width 100%
  height 100%
  .list-item
    display flex
    justify-content space-between
    align-items center
    height 38px
    margin-bottom 4px
    padding-right 70px
    color #494949
    font-size 12px
    .list-item-left
      display flex
      flex 1
      height 38px
      align-items center
      .list-item-index
        display inline-block
        width 26px
        height 26px
        line-height 26px
        text-align center
        margin-right 15px
        margin-left 20px
        color #9AA6B8
        font-size 14px
        font-family PingFangTC-Medium, PingFangTC
      .list-item-content
        flex 1
        height 38px
        line-height 38px
        text-overflow -o-ellipsis-lastline
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 1
        line-clamp 1
        -webkit-box-orient vertical
    .list-item-money
      margin-left 10px
  .list-one
    background linear-gradient(270deg, #FFFFFF 0%, rgba(60, 93, 164, 0.2) 100%)
  .list-two
    background linear-gradient(270deg, #FFFFFF 0%, rgba(60, 93, 164, 0.1) 100%)
  .list-three
    background linear-gradient(270deg, #FFFFFF 0%, rgba(60, 93, 164, 0.04) 100%)
</style>
