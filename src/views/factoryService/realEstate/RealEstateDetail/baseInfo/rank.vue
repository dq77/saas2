<template lang="pug">
.p-flex-main
  .p-base-info-rank
    // i
    // span 2020年年度企业排名No.
    // template(v-if='dataSource') {{dataSource.rank}}
  .p-follow-main
    svg.icon.svg-icon.p-follow-icon(aria-hidden='true' v-if='hasFollowed' @click='unFollowCompany(companyName)')
      use(xlink:href='#icona-yiguanzhu1')
    svg.icon.svg-icon.p-follow-icon(aria-hidden='true' v-else @click='followCompany(companyName)')
      use(xlink:href='#iconjiaguanzhu1')
</template>

<script>
import { watch } from '@vue/composition-api'
import useFollow from '../../hooks/useFollow'
export default {
  props: {
    companyName: {
      type: String,
      required: true
    },
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const {
      hasFollowed,
      checkHasFollowed,
      unFollowCompany,
      followCompany,
    } = useFollow()

    watch(
      () => props.companyName,
      (value) => {
        checkHasFollowed({companyName: value})
      }
    )

    return {
      unFollowCompany,
      followCompany,
      hasFollowed,
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-flex-main
  display flex
  justify-content space-between
  align-items center
  margin-bottom 10px
  .p-base-info-rank
    // background linear-gradient(270deg, rgba(80, 116, 187, 0) 0%, #5079BD 15%, #4AC9E6 100%)
    width 275px
    height 45px
    line-height 45px
    display flex
    font-size 14px
    i
      background url('//cdn.qjdchina.com/static-online/saas/factoryService/realEstate/base-rank.png') center center no-repeat
      background-size contain
      width 45px
      height 45px
      display block
.p-follow-icon
  font-size 28px
  width 80px
  cursor pointer
</style>
