<template lang="pug">
.p-head(v-loading='loading')
  .u-left
    img.u-logo(v-if='baseInfo && baseInfo.logo' :src='baseInfo.logo' alt='logo')
    .u-logo(v-else) {{ companyName.substr(0, 2) }}
  .u-right
    .u-row-1
      .u-company-name {{ companyName }}
      .u-follow-content
        SearchCompany.u-search-company(:apis='companyStateApi' @change='doChange')
        .u-follow.u-has(v-if='hasFollowed' @click='unFollowCompany(companyName)')
          i.el-icon-check
          | &nbsp;已关注
        .u-follow(v-else @click='follow(companyName)')
          i.el-icon-star-off
          | &nbsp;加关注
    .u-row-2(v-if='baseInfo && baseInfo.tags && baseInfo.tags.length>0')
      .u-tag-main
        template(v-for='item in baseInfo.tags')
          .u-tag.u-blue(v-if='item.match(/存续|仍注册|核准设立|正常/g)') {{item}}
          .u-tag.u-red(v-else-if='item.match(/小微企业|在业-注销|吊销-已注销|吊销-未注销|已告解散|注销/g)') {{item}}
          .u-tag.u-purple(v-else-if='item.match(/A股|新三板|港股|上市公司/g)') {{item}}
          .u-tag.u-yellow(v-else-if='item.match(/税务评级/g)') {{item}}
          .u-tag.u-gray(v-else-if='["曾用名"].indexOf(item) === -1') {{item}}
        el-popover.p-history-name-main(
          placement="bottom-start"
          width="200"
          title="曾用名"
          trigger="hover"
          v-if='baseInfo && baseInfo.historyNameList && baseInfo.historyNameList.length'
        )
          .p-history-name(v-for='item in baseInfo.historyNameList')
            .p-history-name-item {{item}}
          .u-tag.u-green(slot='reference')
            span 曾用名
            span.p-history-name-arrow
        .u-tag.u-error(v-if='baseInfo && baseInfo.riskInfo')
          i.el-icon-warning.p-error-icon
          span 异常提醒：{{baseInfo.riskInfo}}
</template>

<script>
import SearchCompany from '../../components/searchCompany'
import useSearchCompany from '../../hooks/useSearchCompany'
import ajaxStore from '@/apis'
import useFollow from '@/views/customerGuard/hooks/useFollow'
import { inject, reactive, toRefs } from '@vue/composition-api'
export default {
  components: {
    SearchCompany
  },
  setup(props, { root }) {
    const state = reactive({
      companyName: inject('companyName'),
      companyStateApi: null
    })

    const { loading, result: baseInfo } = inject('topInfo')

    const {
      checkHasFollowed,
      unFollowCompany,
      followCompanys,
      hasFollowed
    } = useFollow()

    const check = () => {
      checkHasFollowed({
        companyName: state.companyName,
        cache: true
      })
    }

    const follow = async (companyName) => {
      await followCompanys([{companyName}])
      check()
    }

    check()

    // 搜索api
    const { getCompanyList } = ajaxStore.customer.enterprise
    state.companyStateApi = useSearchCompany({
      init: false,
      request: getCompanyList,
      nameKey: 'name',
      resultKey: 'list',
      callbackKeys: ['companyName', 'creditCode']
    })
    const doChange = (current) => {
      const { name, value } = current
      root.$router.push({
        name: 'enterpriseImage',
        query: {
          companyName: name,
          creditCode: value,
          hash: new Date().getTime()
        }
      })
    }

    return {
      loading,
      baseInfo,
      hasFollowed,
      unFollowCompany,
      follow,
      doChange,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-head
  display flex
  margin-bottom 10px
  .u-left
    width 64px
    height 64px
    line-height 64px
    border 1px solid #eee
    border-radius 4px
    overflow hidden
  .u-logo
    max-width 100%
    height auto
    max-height 100%
    vertical-align middle
    background #7EB3DA
    border-radius 4px
    font-size 20px
    text-align center
    color #fff
  img.u-logo
    background none
  .u-right
    flex 1
    margin-left 20px
    position relative
  .u-row-1
    display flex
    align-items center
    justify-content space-between
    .u-company-name
      color #2D2926
      line-height 33px
      font-size 24px
    .u-follow-content
      display flex
      align-items center
      justify-content space-between
    .u-search-company
      margin-right 10px
    .u-follow
      padding 4px 10px 4px 8px
      width 90px
      height 32px
      font-size 14px
      line-height 24px
      text-align center
      color #3B68F0
      cursor pointer
      border 1px solid #3B68F0
      border-radius 4px
      &.u-has
        color #8997AE
        border-color #8997AE
  .u-row-2
    display flex
    margin-top 6px
    justify-content space-between
    .u-tag-main
      display flex
      flex-wrap wrap
    .u-tag
      padding 0 10px
      margin-right 10px
      line-height 24px
      border-radius 2px
      font-size 12px
      display inline-flex
      margin-bottom 10px
      &:first-child
        margin-left 0
      &.u-blue
        color #1989FA
        background #E1EDFC
      &.u-red
        color #FF6666
        background #F8E9ED
      &.u-green
        color #59B844
        background #E7F1EA
      &.u-purple
        color #AA62C6
        background #EFE9F7
      &.u-yellow
        color #E09B1D
        background #F4EFE6
      &.u-gray
        color #646598
        background #E8E9F2
      &.u-green
        color #76B889
        background #EBF9EF
      &.u-error
        color #ffffff
        background #FF6666
.p-history-name
  font-size 12px
.p-history-name-main
  .p-history-name-arrow
    border-top 1px solid #76B889
    border-left 1px solid #76B889
    transform: rotate(45deg)
    width 6px
    height 6px
    background-size 100%
    margin 10px 0 0 5px
.p-history-name-main:hover
  .p-history-name-arrow
    transform: rotate(-135deg)
    margin 7px 0 0 5px
.p-error-icon
  color #ffffff
  font-size 14px
  line-height inherit

/deep/ .p-select
  width 230px
</style>
