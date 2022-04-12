<template lang="pug">
Card.p-card(title='行业舆情预警日报' noWrap v-loading='dailyReportListLoading')
  template(slot='headRight')
    .u-title-more(@click='goMore')
      span.txt 查看更多 &gt;
  .p-module-content.p-scroll-content
    template(v-if='dailyReportListResult && dailyReportListResult.length')
      el-scrollbar.p-seamless-content
        span
          .u-daily-item(v-for='(item, index) in dailyReportListResult' :key='item.id' @click='goMore')
            .u-warning-item-name
              span.u-warning-item-companyName.p-daily-title(:title='item.title' v-html='renderKeyWords(`${index+1}.${item.title}`, item.label)')
            .u-hot-icon(v-if='index < 3') 热
    .u-empty-tips(v-else) 暂无信息
</template>

<script>
import { watch } from '@vue/composition-api'
import Card from '@/components/Card'
import { renderKeyWords } from '@/utils/util'
import useFollow from '../hooks/useFollow'
import useApis from './api'

export default {
  props: {
    mode: {
      type: String,
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Card
  },
  setup(props, { root }) {
    const {
      followCompanyList,
      getFollowCompanyList
    } = useFollow()

    const {
      getDailyReport,
      dailyReportListLoading,
      dailyReportListResult
    } = useApis({})

    const loadData = async () => {
      await getFollowCompanyList({cache: true})
      if (props.mode === 'follow' && !followCompanyList.value.length) {
        dailyReportListResult.value = []
        return
      }
      getDailyReport()
    }

    const goMore = () => {
      root.$router.push({
        name: 'dailyReportList'
      })
    }

    watch(
      () => props.refresh,
      (value) => {
        loadData()
      }
    )

    return {
      dailyReportListLoading,
      dailyReportListResult,
      goMore,
      renderKeyWords
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
.p-seamless-content
  height 242px
.p-scroll-content
  padding 5px 0
.u-title-more
  padding-right 18px
  text-indent 0
  cursor pointer
  color #25BECD
  line-height 50px
  font-size 12px
  .txt
    margin-right 2px
.u-daily-item
  display: flex;
  justify-content flex-start
  padding 10px 0 10px 20px
  border-bottom: 1px solid #f2f2f6;
  color: #494949;
  line-height: 24px;
  cursor: pointer;
  margin-right: 15px;
  .p-daily-title
    max-width 100%
.u-daily-item:hover
  background #f3f4f8
  color #3c5da4
.u-hot-icon
  color #ffffff
  background #F7564E
  width 16px
  height 16px
  border-radius 2px
  display block
  text-align center
  line-height 16px
  transform scale(0.83, 0.83)
  margin 3px 0 0 5px
</style>
