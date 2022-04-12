<template lang="pug">
.p-main
  .p-news-main
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
              el-checkbox-group(v-model='sentimentLabel[index]' :key='index'  @change='validIsAll')
                el-checkbox(v-for='(item, key) in labels.children' :key='key' :label="item.value") {{item.label}}
      .sentiment-btns
        el-button.p-btns(type='primary' @click='search') 确定
        // el-button.p-btns(type='infor' @click='reset') 重置
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
  Pagination(:pagination="pagination")
</template>
<script>
import Pagination from '@/components/qjd/pagination'
import ajaxStore from '@/apis'
import useTable from 'hooks/useTable'
import { watch, onMounted, toRefs, reactive } from '@vue/composition-api'
import { sentimentTypeEnums, sentimentLabels, sentimentLabelsIndex } from './config'
import { deepCopy } from '@/utils/qjd'
export default {
  props: {
    companyName: {
      type: String,
    },
    pageSize: {
      type: Number,
      default: 10
    },
    type: {
      type: String,
      default: 'normal'
    }
  },

  components: {
    Pagination
  },

  setup(props) {
    const state = reactive({
      isAll: [],
      sentimentType: [],
      sentimentLabel: [
        [], [], [], [], [], [], [], []
      ],
      initSentimentLabelData: []
    })
    const { getXWYQList } = ajaxStore.customer.enterprise
    const {
      loading,
      dataSource,
      pagination,
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
        pageSize: props.pageSize,
        dealerName: props.companyName,
        companyName: props.companyName,
        sentimentType: state.sentimentType.join(),
        route: false // 用户画像为true，其余为false
      })
    }

    const reset = (type) => {
      initData()
      searchHandle({
        pageSize: props.pageSize,
        dealerName: props.companyName,
        companyName: props.companyName,
        route: false // 用户画像为true，其余为false
      })
    }

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

    onMounted(() => {
      if (props.companyName) {
        initData('init')
        search()
      }
    })

    watch(
      () => props.companyName,
      (value) => {
        initData('init')
        search()
      }
    )

    return {
      loading,
      dataSource,
      pagination,
      sentimentTypeEnums,
      sentimentLabels,
      search,
      reset,
      setIsAll,
      validIsAll,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-news-main
  display flex
.sentiment-info-left
  margin-right 20px
  padding 20px
  background #F9FAFC
  min-width 350px
  width 20%
  .sentiment-title
    color #1E1E1E
    font-size 16px
    margin-bottom 30px
.sentiment-info-right
  flex 1
  width 80%
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
  background #5C94D6
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
      width 100%
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
