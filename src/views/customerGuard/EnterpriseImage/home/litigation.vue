<template lang="pug">
.home-litigation-main.time-line-main
  .home-title
    span 涉诉
    .time-line-more-btn(v-if='result && result.riskScanJudgementBOS.length' @click='goModule("litigation")') 更多
    .time-line-more-btn.time-line-empty(v-else)
  .time-line-content
    el-scrollbar.time-line-scroll
      template(v-if='result && result.riskScanJudgementBOS.length')
        .time-line-item(v-for='(item, index) in result.riskScanJudgementBOS.slice(0, 3)')
          .time-line-time
            i.time-line-icon
            span ({{item.pubDate}})
            i.time-line-type.u-green(v-if='item.type.match(/开庭公告/g)') {{item.type}}
            i.time-line-type.u-blue(v-else-if='item.type.match(/立案信息/g)') {{item.type}}
            i.time-line-type(v-else) {{item.type}}
          .time-line-detail {{item.caseReason || '-'}}
      .u-empty-tips.u-default-height(v-else)
        i.iconfont.iconweikong
        span 当前暂无动态
</template>

<script>
import { inject } from '@vue/composition-api'
export default {
  setup(props, { root }) {
    const { loading, result } = inject('scanningInfo')

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

    return {
      loading,
      result,
      goModule
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
.home-title
  display flex
  justify-content space-between
.time-line-empty
  border none
  margin-bottom 20px
</style>
