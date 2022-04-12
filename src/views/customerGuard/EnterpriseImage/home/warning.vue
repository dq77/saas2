<template lang="pug">
.home-warning-main.time-line-main(v-loading='loading')
  .home-title
    span 预警动态
    el-popover(
      placement='bottom-start'
      trigger='hover'
      content='请到经营状况或者司法风险模块查看更多内容'
      v-if='result && result.length'
    )
      .time-line-more-btn(slot='reference') 更多
  .time-line-content
    el-scrollbar.time-line-scroll(v-if='result')
      template(v-if='result.length')
        .time-line-item(v-for='item in result.slice(0, 3)')
          .time-line-time
            i.time-line-icon
            span ({{item.time}})
            i.time-line-type {{item.tag}}
          .time-line-detail {{item.title}}
          .time-line-summay
            .time-line-summary-item(v-if='item.caseNo')
              .time-line-label 备注：
              .time-line-value {{item.caseNo}}
            .time-line-summary-item(v-if='item.plaintiff && item.plaintiff.join()')
              .time-line-label 原告：
              .time-line-value {{item.plaintiff.join()}}
            .time-line-summary-item(v-if='item.defendant && item.defendant.join()')
              .time-line-label 被告：
              .time-line-value {{item.defendant.join()}}
      .u-empty-tips.u-default-height(v-else)
        i.iconfont.iconweikong
        span 当前暂无动态
</template>

<script>
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { inject } from '@vue/composition-api'
export default {
  setup(props) {
    const { getScanningWarining } = ajaxStore.customer.enterprise
    const { loading, result } = useAsync({
      request: getScanningWarining,
      params: {
        companyName: inject('companyName')
      }
    })

    return {
      loading,
      result
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
.time-line-summary-item
  margin-bottom 5px
  display flex
  .time-line-label
    color #494949
    min-width 40px
  .time-line-value
    color #9B9B9B
</style>
