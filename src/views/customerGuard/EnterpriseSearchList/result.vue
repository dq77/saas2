<template lang="pug">
.p-result
  .p-tips 已为您找到
    span.p-num {{pagination.total}}
    span 家公司
  .p-list(v-loading='loading')
    .p-item(v-for='(item, index) in dataSource' :key='')
      .p-logo {{ item.companyName.substr(0, 2) }}
      .p-detail
        .p-item-header
          .p-item-name(@click='checkDetail(item)') {{ item.companyName }}
          .u-follow.u-has(v-if='hasFollow[index]' @click='unFollow(item.companyName)')
            i.el-icon-check
            | &nbsp;已关注
          .u-follow(v-else @click='follow(item.companyName)')
            i.el-icon-star-off
            | &nbsp;加关注
          .p-item-update(v-if='item.updateCount') 舆情更新+{{item.updateCount}}
        .p-item-summary
          .p-label 法定代表人：{{ item.legalPersonName }}
          .p-label 注册资本：{{ item.regCapital }}
          .p-label 企业类型：{{ companyType[item.companyType] }}
  Pagination(:pagination="pagination" v-if='pagination')
</template>

<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import Pagination from '@/components/qjd/pagination'
import { companyType } from './config'
import useFollow from '@/views/customerGuard/hooks/useFollow'
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: { Pagination },
  setup(props, { root }) {
    const state = reactive({
      companyType,
      hasFollow: []
    })

    const clickFollow = (result) => {
      console.log(result)
    }

    const checkDetail = (item) => {
      root.$router.push({
        name: 'enterpriseImage',
        query: {
          companyName: item.companyName,
          creditCode: item.creditCode
        }
      })
    }

    const {
      getFollowCompanyList,
      checkHasFollowed,
      followCompanys,
      unFollowCompany
    } = useFollow()

    watch(
      () => props.dataSource,
      (value) => {
        getFollowResult(value)
      }
    )

    // 检查单个公司是否已关注
    const check = async (companyName) => {
      return await checkHasFollowed({
        companyName,
        cache: true
      })
    }

    // 关注操作
    const follow = async (companyName) => {
      await followCompanys([{companyName}])
      getFollowResult(props.dataSource)
    }

    // 取消关注操作
    const unFollow = async (companyName) => {
      await unFollowCompany(companyName)
      getFollowResult(props.dataSource)
    }

    // 获取列表数据关注情况
    const getFollowResult = async (companyList) => {
      await getFollowCompanyList(true)
      state.hasFollow = []
      companyList.map(async (item) => {
        const result = await check(item.companyName)
        state.hasFollow.push(result)
      })
    }

    return {
      checkDetail,
      clickFollow,
      check,
      follow,
      unFollow,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-result
  margin-top 26px
  .p-tips
    color #8997AE
    font-size 14px
    .p-num
      color #3B68F0
.p-item
  display flex
  align-items center
  padding 27px 0
  border-bottom 1px solid #F0F0F0
  .p-logo
    width 64px
    height 64px
    line-height 64px
    background #7EA6DA
    font-size 20px
    color #ffffff
    text-align center
    margin-right 20px
  .p-detail
    .p-item-header
      display flex
      margin-bottom 10px
      .p-item-name
        color #414141
        font-size 18px
        cursor pointer
      .p-item-name:hover
        color #3B68F0
      .p-item-update
        background #FF6666
        color #ffffff
        border-radius 9px
        height 16px
        line-height 16px
        padding 0 8px
        margin 5px 0 0 20px
      .u-follow
        margin 3px 0 0 16px
        padding 4px 10px 4px 8px
        width 74px
        height 22px
        font-size 12px
        line-height 12px
        text-align center
        color #3B68F0
        cursor pointer
        border 1px solid #3B68F0
        border-radius 2px
        &.u-has
          color #8997AE
          border-color #8997AE
        i
          font-size 14px
    .p-item-summary
      display flex
      .p-label
        margin-right 20px
        color #494949
        font-size 12px
</style>
