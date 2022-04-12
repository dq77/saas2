<template lang="pug">
.finance-main(v-loading='loading')
  .home-title 融资历程
  template(v-if='info && info.finances')
    .p-roll-box
      .u-roll-content
        .u-roll-bg
        .u-roll-list
          .u-roll-item(v-for='(item, index) in info.finances' :key='index')
            .u-roll-item-tag {{item.pubTime.substr(0,4)}}
            .u-roll-item-tip
              .u-icon-triangle-top
              .u-roll-item-text-wrap
                .u-roll-item-text-1 {{item.round}}
                .u-roll-item-text-2 {{item.investorName}}
                .u-roll-item-text-2 {{item.money}}
        .u-roll-bg
      .u-roll-mask-left
      .u-roll-mask-right
    Table.enterprise-detail-table(
      :dataSource="info.finances"
      :columns="financesColumns"
      :index='true'
      :border='true'
    )
  .u-empty-tips(v-else) 暂无数据
</template>

<script>
import { inject } from '@vue/composition-api'
import { financesColumns } from './config'
import Table from '@/components/qjd/table'
export default {
  components: {
    Table
  },
  setup(props) {
    const { loading, result: info } = inject('baseInfo')

    return {
      loading,
      info,
      financesColumns
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
.finance-main
  margin-bottom 45px
.p-roll-box
  .u-roll-bg
    width 125px
    height 10px
    background url('//cdn.qjdchina.com/static-online/saas/customerGuard/icon-roll-1.png')
    background-size 25px 10px
    flex-shrink 0
  .u-roll-list
    height 350px
    display flex
    align-items center
    justify-content center
    .u-roll-item
      width 275px
      height 10px
      background url('//cdn.qjdchina.com/static-online/saas/customerGuard/icon-roll-1.png')
      background-size 25px 10px
      display flex
      align-items center
      justify-content center
      position relative
      &:nth-child(2n)
        .u-roll-item-tip
          transform rotateX(180deg)
          transform-origin 0 -35px
        .u-roll-item-text-wrap
          transform rotateX(180deg)
          transform-origin 50% 50%
    .u-roll-item-tag
      width 85px
      height 43px
      background url('//cdn.qjdchina.com/static-online/saas/customerGuard/icon-roll-2.png')
      background-size 85px 43px
      display flex
      align-items center
      justify-content center
      position absolute
      left 94px
      font-size 20px
      font-weight 600
      color #fff
    .u-roll-item-tip
      position absolute
      top 42px
      min-width 155px
      max-width 100%
      padding 8px
      background #fff
      box-shadow 0px 0px 8px 0px rgba(0, 0, 0, 0.1)
      text-align center
    .u-icon-triangle-top
      width 0
      height 0
      border-left 5px solid transparent
      border-right 5px solid transparent
      border-bottom 5px solid #fff
      position absolute
      top -5px
      left 50%
      margin-left -2.5px
    .u-roll-item-text-1
      font-size 18px
      line-height 28px
      color #2D2926
      font-weight 600
    .u-roll-item-text-2
      font-size 14px
      line-height 18px
      color #2D2926
      font-weight 400
      margin-top 2px
</style>
