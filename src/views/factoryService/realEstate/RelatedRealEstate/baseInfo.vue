<template lang="pug">
.p-base-main
  .p-base-content(v-loading='baseLoading || creditLoading')
    img.p-logo(:src='creditResult.logo' v-if='creditResult && creditResult.logo')
    .p-logo-word(v-else) {{companyName.substring(0,2)}}
    .p-summary
      .p-summary-line
        .p-name {{companyName}}
        template(v-if='!isSubscription')
          svg.icon.u-follow-icon(aria-hidden='true' v-if='hasFollowed' @click='unFollowCompany(companyName)')
            use(xlink:href='#icona-yiguanzhu2')
          svg.icon.u-follow-icon(aria-hidden='true' v-else @click='followCompany(companyName)')
            use(xlink:href='#icona-jiaguanzhu2')
      .p-summary-line.p-summary-info
        .p-summary-item 法定代表人：
          template(v-if='creditResult') {{creditResult.legalPersonName || '-'}}
        .p-summary-item 注册资本：
          template(v-if='baseResult') {{baseResult.regCapital || '-'}}
        .p-summary-item 成立日期：
          template(v-if='baseResult') {{baseResult.fromTime || '-'}}
  el-button(type='primary' @click='toDetail' v-if='!isSubscription' weblogs-anchor='factory-customerEvaluation-concat-customer') 开发商详情
</template>
<script>
import { watch } from '@vue/composition-api'
import useCreditBaseInfo from '../hooks/useCreditBaseInfo'
import useBaseInfo from '../hooks/useBaseInfo'
import useFollow from '../hooks/useFollow'
export default {
  props: {
    companyName: {
      type: String,
    },
    isSubscription: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { root, emit }) {
    const { companyName } = props

    const {
      loading: creditLoading,
      result: creditResult,
      doResult: creditDoResult
    } = useCreditBaseInfo({companyName})

    const {
      loading: baseLoading,
      result: baseResult,
      doResult: baseDoResult
    } = useBaseInfo({companyName})

    const {
      hasFollowed,
      checkHasFollowed,
      unFollowCompany,
      followCompany,
    } = useFollow()

    checkHasFollowed({companyName})

    const toDetail = () => {
      root.$router.push({
        name: 'realEstateDetail',
        query: {
          companyName
        }
      })
    }

    baseDoResult({companyName})
    creditDoResult({companyName})

    watch(
      () => props.companyName,
      (value) => {
        baseDoResult({companyName: value})
        creditDoResult({companyName: value}).then(({code, data}) => {
          if (code === '0') {
            emit('actualCompanyName', data.companyName)
          }
        })
      }
    )

    return {
      baseLoading,
      baseResult,
      creditLoading,
      creditResult,
      toDetail,
      hasFollowed,
      unFollowCompany,
      followCompany,
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-base-main
  background #fff
  box-shadow 0px 0px 20px 0px rgba(0, 0, 0, 0.08)
  border 1px solid #EAEBEE
  padding 20px
  display flex
  align-items center
  justify-content space-between
  .p-base-content
     display flex
  .p-logo
    width 64px
    height 64px
    border-radius 4px
    border 1px solid #F4F5F6
  .p-logo-word
    width 64px
    height 64px
    font-size 20px
    line-height 64px
    font-weight bold
    border-radius 4px
    text-align center
    color #ffffff
    background #7eb3da
  .p-summary-line
    display flex
    margin-left 20px
    position relative
    .u-follow-icon
      font-size 80px
      margin -23px 0 0 20px
      cursor pointer
    .p-name
      height 57px
      font-size 24px
      color #2D2926
    .p-summary-item
      color #494949
      margin-right 30px
  .p-summary-info
    margin-top -15px
</style>
