<template lang='pug'>
.rm-news(v-loading='loading')
  .rmn-no(v-if='!dataSource || dataSource.length === 0') 暂无新闻舆情数据
  ul.rmn-list(v-else)
    li.rmn-list__li(v-for='(item, index) in dataSource' :key='index' :class='item.sentimentType===-1 ? "fumian" : ""')
      .rmn-list__li-title
        .rmn-list__li-title--icon.icon-zhongxing(v-if='item.sentimentType===0') 中
        .rmn-list__li-title--icon.icon-zhengmian(v-if='item.sentimentType===1') 正
        .rmn-list__li-title--icon.icon-fumian(v-if='item.sentimentType===-1') 负
        a.rmn-list__li-title--link(v-html='item.title' :href='item.webSite ? item.webSite : "javascript:;"' target='_blank') {{item.title}}
      .rmn-list__li-subtitle
        span.rmn-list__li-subtitle--source 来源：{{item.source}}
        span.rmn-list__li-subtitle--time 日期：{{item.publishTime}}
      .rmn-list__li-content(v-html='item.content') {{item.content}}
  Pagination(:pagination="pagination")
</template>

<script>
import Pagination from '@/components/qjd/pagination'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'

export default {
  components: { Pagination },
  setup() {
    const { newsSentimentList } = ajaxStore.risk

    // table & page
    const {
      loading,
      dataSource,
      pagination,
    } = useTable({
      request: newsSentimentList
    })

    return {
      loading,
      dataSource,
      pagination
    }
  }
}
</script>

<style lang='stylus' scoped>
.rm-news
  background #fff
  border-radius 4px
.rmn-no
  height calc(100vh - 235px)
  display flex
  align-items center
  justify-content center
  font-size 14px
  color #909399
.rmn-list
  padding 20px 20px 0
  &__li
    padding 20px
    background #FFFFFF
    margin-bottom 20px
    border 1px solid #F2F2F6
    border-radius 4px
    &-title
      display flex
      height 40px
      &--icon
        text-align center
        line-height 20px
        display block
        width 20px
        height 20px
        border-radius 100%
        color #fff
        margin-right 5px
      &--link
        font-size 16px
        color #1E1E1E
        text-decoration underline
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        overflow hidden
    &-subtitle
      height 24px
      margin-bottom 5px
      font-size 12px
      color #8997AE
      &--source
        margin-right 35px
    &-content
      font-size 12px
      color: #3B3C5A
      font-family PingFangSC-Regular
      line-height 24px
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 2
      overflow hidden
    &:last-child
      margin-bottom 0

.fumian
  background #FFF5F5
  box-shadow 0 0 10px 0 rgba(98,133,175,0.10)
  border-radius 4px
.icon-zhongxing
  background #646464
.icon-zhengmian
  background #5C94D6
.icon-fumian
  background #F16051
</style>
