<template lang='pug'>
.rm-news(v-loading='loading')
  .sentiment-info-left
      .sentiment-title 新闻舆情筛选
      .p-screen
        .p-screen-item
          .p-screen-label 正负面筛选
          .p-screen-value
            el-checkbox-group(v-model='sentimentType')
              el-checkbox(v-for='(item, key) in sentimentTypeEnums' :key='key' :label="item.value") {{item.label}}
        .p-screen-item
          .p-screen-label 多分类筛选
          .p-screen-value
            el-checkbox-group(v-model='isAll' @change='setIsAll')
              el-checkbox(:label="1") 全选
            template(v-for='(labels, index) in sentimentLabels')
              el-checkbox-group(v-model='sentimentLabel[index]' :key='index' @change='validIsAll')
                el-checkbox(v-for='(item, key) in labels.children' :key='key' :label="item.value") {{item.label}}
      .sentiment-btns
        el-button.p-btns(type='primary' @click='search') 确定
        // el-button.p-btns(type='infor' @click='reset') 重置
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
import { sentimentTypeEnums, sentimentLabels, sentimentLabelsIndex } from './config'
import { toRefs, reactive } from '@vue/composition-api'
import { deepCopy } from '@/utils/qjd'

export default {
  components: { Pagination },
  setup() {
    const state = reactive({
      isAll: [],
      sentimentType: [],
      sentimentLabel: [
        [], [], [], [], [], [], [], []
      ],
    })
    const { newsSentimentList } = ajaxStore.risk

    const initData = (type) => {
      state.isAll = [1]
      for (const i in sentimentLabels) {
        for (const j in sentimentLabels[i].children) {
          state.sentimentLabel[i].push(sentimentLabels[i].children[j].value)
        }
      }
      for (const i in state.sentimentLabel) {
        state.sentimentLabel[i].sort()
      }
      state.initSentimentLabelData = deepCopy(state.sentimentLabel)
      if (type === 'init') {
        for (const i in sentimentTypeEnums) {
          state.sentimentType.push(sentimentTypeEnums[i].value)
        }
      }
    }

    const validIsAll = () => {
      for (const i in state.sentimentLabel) {
        state.sentimentLabel[i].sort()
      }
      if (JSON.stringify(state.sentimentLabel) === JSON.stringify(state.initSentimentLabelData)) {
        state.isAll = [1]
      } else {
        state.isAll = []
      }
    }

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
    } = useTable({
      request: newsSentimentList,
      isInit: false
    })

    const setIsAll = (value) => {
      if (value.length) {
        initData()
      } else {
        state.sentimentLabel = [
          [], [], [], [], [], [], [], []
        ]
      }
    }

    const search = () => {
      const newsClassifys = []
      state.sentimentLabel.map((oneItem, oneIndex) => {
        newsClassifys[sentimentLabelsIndex[oneIndex]] = []
        oneItem.map((twoItem, twoIndex) => {
          newsClassifys[sentimentLabelsIndex[oneIndex]].push(twoItem)
        })
      })
      searchHandle({
        newsClassifys,
        pageSize: 10,
        sentimentType: state.sentimentType.join(),
      })
    }

    const reset = () => {
      initData()
      searchHandle({
        pageSize: 10,
      })
    }
    initData('init')
    search()

    return {
      loading,
      dataSource,
      pagination,
      search,
      reset,
      sentimentTypeEnums,
      sentimentLabels,
      setIsAll,
      validIsAll,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.rm-news
  background #fff
  border-radius 4px
  display flex
.sentiment-info-left
  margin 20px
  padding 20px
  background #F9FAFC
  min-width 350px
  width 20%
  .sentiment-title
    color #1E1E1E
    font-size 16px
    margin-bottom 30px
.rmn-no
  width 80%
  height calc(100vh - 235px)
  display flex
  align-items center
  justify-content center
  font-size 14px
  color #909399
.rmn-list
  width 80%
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
.p-screen
  margin-bottom 20px
  .p-screen-item
    line-height 30px
    margin-bottom 30px
    font-size 12px
    .p-screen-label
      margin-right 10px
.sentiment-btns
  .p-btns
    width 80px
</style>
