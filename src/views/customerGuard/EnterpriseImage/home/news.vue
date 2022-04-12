<template lang="pug">
.home-news-main
  .home-title
    span 新闻舆情
    .time-line-more-btn(@click='goModule("news")' v-if="dataSource && dataSource.length !== 0") 更多
  .sentiment-info-right(v-loading='loading')
    .p-list
      .no-data(v-if="dataSource && dataSource.length === 0")
        img.no-data-icon(:src="`${$assetsBaseUrl}/factoryService/realEstate/no-data.svg`")
        .no-data-content 此公司暂时没有舆情
      template(v-else)
        .p-item(v-for='(searchItem, index) in dataSource' :key='index' :class='type === "shadow" ? "p-shadow" : "p-normal"')
          .p-item-left
            .p-item-line1
              .iconOpinion.icon-zhongxing(v-if='searchItem.sentimentType === 0') 中
              .iconOpinion.icon-zhengmian(v-if='searchItem.sentimentType === 1') 正
              .iconOpinion.icon-fumian(v-if='searchItem.sentimentType === -1') 负
              a.company(
              v-html='searchItem.title'
              :href='searchItem.webSite?searchItem.webSite:"javascript:;"'
              target='_blank') {{searchItem.title}}
            .p-item-line2
              span 来源：{{searchItem.source}}
              .status
                span 日期：{{searchItem.publishTime}}
            .p-item-line(:class='!!searchItem.closed?"open":"closed"' v-html='searchItem.content') {{searchItem.content}}
</template>

<script>
import ajaxStore from '@/apis'
import useTable from 'hooks/useTable'
import { onMounted, inject } from '@vue/composition-api'
export default {
  props: {
    pageSize: {
      type: Number,
      default: 3
    },
    type: {
      type: String,
      default: 'normal'
    }
  },

  setup(props, { root }) {
    const { getXWYQList } = ajaxStore.customer.enterprise
    const {
      loading,
      dataSource,
      searchHandle,
    } = useTable({
      request: getXWYQList,
      isInit: false,
      callback: (res) => {
        return {
          totalCount: res.total,
          dataSource: res.list || []
        }
      }
    })

    const companyName = inject('companyName')
    const creditCode = inject('creditCode')

    const goModule = (link) => {
      root.$router.push({
        name: 'enterpriseImage',
        query: {
          companyName,
          creditCode,
          link,
          hash: new Date().getTime()
        }
      })
    }

    onMounted(() => {
      if (inject('companyName')) {
        searchHandle({
          pageSize: props.pageSize,
          dealerName: props.companyName,
          companyName: inject('companyName'),
          route: true
        })
      }
    })

    return {
      loading,
      dataSource,
      goModule
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
.sentiment-info-right
  flex 1
.p-header
  color #8997AE
  font-size 12px
  padding-bottom 20px
.no-data-icon
  width 40px
  height 40px
  margin-top 100px
.no-data-content
  font-size 12px
  color #485465
  line-height 34px
  text-align center
  margin-top -45px
.no-data
  text-align center
  line-height 100px
  font-size 18px
.icon-zhongxing
  background #646464
.icon-zhengmian
  background #3B68F0
.icon-fumian
  background #F16051
.iconOpinion
  text-align center
  line-height 20px
  display block
  width 20px
  height 20px
  border-radius 100%
  color white
  margin-right 5px
.p-item
  display flex
  align-items center
  padding 0 20px
  background #FFFFFF
  margin-bottom 20px
  .p-item-left
    .p-item-line1
      display flex
      align-items center
      height 40px
      margin-top: 15px
      .company
        font-size 16px
        color #1E1E1E
        text-decoration underline
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        overflow hidden
      .change
        margin-left 30px
        font-size: 12px
        color #EB9201
        border 1px solid #EB9201
        border-radius 9px
        padding 0 5px
    .p-item-line2
      display flex
      align-items center
      height 24px
      margin-bottom 5px
      color #8997AE
      margin-bottom 15px
        span
          font-size 12px
          color #8997AE
          line-height 12px
      .status
        span
          font-size 12px
          color #8997AE
          line-height 12px
          padding 0 5px
    .p-item-line
      width 760px
      font-size 12px
      color: #3B3C5A
      font-family PingFangSC-Regular
      margin-bottom 15px
      line-height 24px
      span
        color #3B3C5A
        font-family PingFang-SC-Heavy
        font-weight bold
      .change
        font-size 12px
        color #EB9201
        border-radius 9px
    .closed
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 3
      overflow hidden
  .p-item-right
    margin-left auto
    .p-btn
      border 1px solid #4A90E2
      border-radius 4px
      width 96px
      height 40px
      line-height 40px
      text-align center
      color #4A90E2
      cursor pointer
      font-size 14px
.p-shadow
  box-shadow 0 0 10px 0 rgba(98,133,175,0.10)
  border-radius 4px
.p-normal
  border 1px solid #F2F2F6
</style>
