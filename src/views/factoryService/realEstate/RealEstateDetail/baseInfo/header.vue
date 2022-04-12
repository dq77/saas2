<template lang="pug">
.p-base-info-header
  //- 公司名称
  .p-base-info-header-title {{companyName}}
  //- 上市信息
  .p-market-main(v-if='dataSource && dataSource.stockMarket')
    svg.icon.svg-icon.p-market-icon(aria-hidden='true' v-if='dataSource.market === "cn"')
      use(xlink:href='#iconagu')
    svg.icon.svg-icon.p-market-icon.p-icon-hk(aria-hidden='true' v-else-if='dataSource.market === "hk"')
      use(xlink:href='#iconganggu')
    .p-market-code {{dataSource.stockCode}}
  //- 查看关联公司按钮
  .p-base-info-header-link(@click='checkRelated')
    i.iconfont.iconchaxun.p-qjy-icon
    span 查看关联公司
</template>

<script>
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    },
    companyName: {
      type: String,
      required: true
    },
  },
  setup(props, { root }) {
    const checkRelated = () => {
      root.$router.push({
        name: 'relatedRealEstate',
        query: {
          companyName: props.companyName
        }
      })
    }

    return {
      checkRelated
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-base-info-header
  display flex
  align-items top
  justify-content space-between
  margin-bottom 20px
  .p-base-info-header-title
    font-size 18px
    width 48%
    min-width 190px
    padding-left 8px
    position relative
    &:before
      content ''
      position absolute
      top 4px
      left 0px
      width 3px
      height 16px
      background-color #25becd
      border-radius 2px
.p-market-main
  width 100px
  display flex
.p-market-icon
  font-size 24px
  width 48px
  height 30px
  margin-left 10px
.p-icon-hk
  font-size 12px
  width 36px
  margin-right 5px
.p-market-code
  font-size 12px
  line-height 28px
  margin-left -5px
.p-base-info-header-link
  cursor pointer
  width 105px
  margin-top 5px
  margin-right -10px
.p-qjy-icon
  margin-left 5px
  font-size 12px
</style>
