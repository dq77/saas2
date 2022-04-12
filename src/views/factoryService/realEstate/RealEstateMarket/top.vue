<template lang="pug">
Card.p-card(title='年度销售额排名(2021)' noWrap v-loading='salesVolumeTopLoading')
  .p-module-content.p-no-padding
    template(v-if='salesVolumeTopResult && salesVolumeTopResult.length')
      template(v-for='(item, key) in salesVolumeTopResult')
        .p-list-item(:key='key' @click='goDetail(item.comWholeName)')
          .p-list-left
            span.p-list-item-index {{key+1}}
            span.p-list-item-title {{item.comWholeName}}
          .p-list-right
            span.p-number {{item.sellMoney}}亿元
    .u-empty-tips(v-else) 暂无信息
</template>

<script>
import { watch } from '@vue/composition-api'
import Card from '@/components/Card'
import useFollow from '../hooks/useFollow'
import useApis from './api'
import { getCompanyList } from './utils'
import { yearList } from './config'

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
      getSalesAmountTop,
      salesVolumeTopLoading,
      salesVolumeTopResult,
    } = useApis({})

    const loadData = async () => {
      await getFollowCompanyList({cache: true})
      if (props.mode === 'follow' && !followCompanyList.value.length) {
        salesVolumeTopResult.value = []
        return
      }
      getSalesAmountTop({
        yearList: yearList[0],
        companyList: getCompanyList(followCompanyList.value, props.mode)
      })
    }

    const goDetail = (companyName) => {
      root.$router.push({
        name: 'realEstateDetail',
        query: { companyName }
      })
    }

    watch(
      () => props.refresh,
      (value) => {
        loadData()
      }
    )

    return {
      salesVolumeTopResult,
      salesVolumeTopLoading,
      goDetail
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
.p-list-item
  display flex
  justify-content space-between
  border-bottom 1px solid #F2F2F6
  line-height 40px
  border none
  cursor pointer
  .p-list-item-index
    margin-right 10px
  .p-list-item-title
    font-size 12px
    width 190px
    display block
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
.p-list-item:last-child
  border-bottom none
.p-list-item:nth-child(1)
  background-image linear-gradient(to right, #3C5DA4, #FFFFFF)
  .p-list-item-title
    color #fff
  .p-list-item-index
    color #F25754
.p-list-item:nth-child(2)
  background-image linear-gradient(to right, #6C85BB, #FFFFFF)
  .p-list-item-title
    color #fff
  .p-list-item-index
    color #F29354
.p-list-item:nth-child(3)
  background-image linear-gradient(to right, #9CACD2, #FFFFFF)
  .p-list-item-title
    color #fff
  .p-list-item-index
    color #F2C154
.p-list-item:nth-child(4)
  color #9AA6B8
  .p-list-item-index
    color #9AA6B8
.p-list-item:nth-child(5)
  color #9AA6B8
  .p-list-item-index
    color #9AA6B8
.p-module-content.p-no-padding
  padding 0
.p-list-item
  padding 5px 20px
.p-number
  min-width 61px
</style>
