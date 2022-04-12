<template lang="pug">
.p-risk-item(
  @click='clickForward'
  v-weblogs.click='"风险工作台-风险预警-企业名称点击跳转"'
)
  .u-col-1
    .u-company-name {{ companyName }}
    .u-risk-type {{ riskType }}
  .u-risk-desc {{ riskDesc }}
  .u-date {{ date }}
</template>

<script>
export default {
  props: {
    companyName: String,
    uniformCreditCode: String,
    riskType: String,
    riskDesc: String,
    date: String,
  },
  setup(props, { root }) {
    const clickForward = () => {
      root.$options.router.push({
        name: 'creditCustomerNews',
        query: {
          name: props.companyName,
          corporationId: props.uniformCreditCode
        }
      })
    }

    return {
      clickForward
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-risk-item
  display flex
  align-items center
  padding 0 20px
  height 46px
  font-size 14px
  cursor pointer
  .u-col-1
    display flex
    width 300px
    margin-right 17px
    .u-company-name
      flex 1
      color #494949
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      margin-right 17px
    .u-risk-type
      padding 3px 5px
      font-size 12px
      color #FF6666
      background-color #FFEFEF
  .u-risk-desc
    flex 1
    margin-right 17px
    width 170px
    color #A9AFB8
  .u-date
    color #A9AFB8
    text-align right
  &:hover
    background-color #F5FAFF
    .u-company-name
      color #3B68F0
</style>
