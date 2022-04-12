<template lang="pug">
.p-tab-main(v-loading='loading')
  .p-tab-title
    span 流程说明
    span.p-btn(@click='changeShow' v-if='showDetail') 收起
    span.p-btn(@click='changeShow' v-else) 展开
  .p-tab-content(v-if='showDetail')
    .p-detail(v-if='result && result.endEvent.length')
      .p-detail-content.p-tips(v-for='item in result.endEvent')
        p 当前为{{item.businessName}}审批流配置。当此审批通过后，即{{item.name}}（{{item.eventContent}}）。
        p 下面的几个操作，是在审批结束后，可执行的操作。您可以在所配置的审批节点中，关联这几个操作，关联后，当节点审批结束后，会执行相应的操作。
    .p-detail(v-if='result && result.passEvent.length')
      .p-detail-title
        i.iconfont.iconjiediantongguo.p-icon-green
        span.p-title-text 通过后的操作
      .p-detail-content
        .p-detail-item(v-for='(item, index) in result.passEvent')
          .p-detail-item-title {{index+1}}.{{item.name}}
          .p-detail-item-content {{item.eventContent}}
    .p-detail(v-if='result && result.noPassEvent.length')
      .p-detail-title
        i.iconfont.iconjiedianbohuihou.p-icon-red
        span.p-title-text 驳回后的操作
      .p-detail-content
        .p-detail-item(v-for='(item, index) in result.noPassEvent')
          .p-detail-item-title {{index+1}}.{{item.name}}
          .p-detail-item-content {{item.eventContent}}
</template>

<script>
import { toRefs, reactive } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
export default {
  setup(props, { root }) {
    const state = reactive({
      showDetail: true
    })

    const { process: { getWorkflowTips } } = ajaxStore

    const { applicationCode, businessCode } = root.$route.query

    const { loading, result } = useAsync({
      request: getWorkflowTips,
      callback: (res) => {
        const { data: { data, code } } = res
        if (code === '0') {
          const passEvent = data.filter((item) => {
            return item.confType === 1
          })
          const noPassEvent = data.filter((item) => {
            return item.confType === 2 && item.normalEndEvent === 0
          })
          const endEvent = data.filter((item) => {
            return item.confType === 2 && item.normalEndEvent === 1
          })
          return {
            data: {
              passEvent,
              noPassEvent,
              endEvent
            }
          }
        }
      },
      params: {
        businessCode,
        applicationCode
      }
    })

    const changeShow = () => {
      state.showDetail = !state.showDetail
    }

    return {
      changeShow,
      loading,
      result,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-tab-main
  width 32%
  min-width 200px
  margin 20px 10% 20px 20px
  .p-tab-title
    display flex
    justify-content space-between
    color #494949
    background #F2F2F6
    padding 20px
    border-bottom 1px solid #F2F2F6
    border 1px solid #F2F2F6
    font-weight bold
    .p-btn
      color #3B68F0
      cursor pointer
      font-weight normal
  .p-tab-content
    border 1px solid #F2F2F6
    border-top none
    .p-detail
      border-bottom 1px solid #F2F2F6
      padding 20px
      .p-detail-title
        margin-bottom 15px
        .p-title-text
          color #494949
          margin-left 5px
          font-weight bold
    .p-detail:last-child
      border-bottom none
    .p-detail-item
      margin-bottom 15px
      .p-detail-item-title
        margin-bottom 10px
      .p-detail-item-content
        color #848484
    .p-detail-item:last-child
      margin-bottom 0
.p-icon-red
  color #FF3366
.p-icon-green
  color #88CCAB
.p-tips
  color #66788e
  line-height 20px
</style>
