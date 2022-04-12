<template lang="pug">
div.collection-detail(v-loading="loading")
  .title {{result && result.customerName}}
  ul.content
    li(v-for="(item, index) in detailColums" :key="item.key")
      .num {{ item.transform ? toAmountStr(result && result[item.key] ? result[item.key] : 0, undefined, true) : result && result[item.key] || 0}}
      .des {{ item.label }}
</template>
<script>
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'
import { detailColums } from './config'
export default {
  setup(props, { root }) {
    // id
    const { $route: { query: { customerId } } } = root
    const { receive: { getCollectionListDtl } } = ajaxStore
    // 获取详情
    const { result, loading } = useAsync({
      request: getCollectionListDtl,
      params: { customerId: customerId ?? '' }
    })

    return {
      toAmountStr,
      result,
      loading,
      detailColums
    }
  }
}
</script>
<style lang="stylus" scoped>
.collection-detail
  background #fff
  padding 20px
  margin-bottom 10px
  border-radius var(--defaultStadius)
  .title
    color var(--fontColor)
    font-weight 500
    font-size 24px
    line-height 33px
    margin-bottom 20px
  .content
    display flex
    align-items center
    padding 22px 0 21px 0
    box-sizing border-box
    border 1px solid #eaebee
    border-radius var(--defaultStadius)
    li
      position relative
      width 20%
      text-align center
      &:not(:last-child)
        &:after
          content ''
          height 40px
          border-left 1px solid #eaebee
          position absolute
          top 12px
          right 0px
      .num
        color #383b42
        font-size 26px
        font-weight 500
        line-height 37px
      .des
        color #9aa6b8
        line-height 17px
        margin-top 10px
</style>
