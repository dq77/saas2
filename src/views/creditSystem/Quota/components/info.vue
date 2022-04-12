<template lang="pug">
.credit-edit-info
  i.icon.iconfont.icontishi.custom_icon
  .credit-edit-info_content
    .credit-edit-info_text
      .credit_circle
      span 厂家渠道类客户申请入口主要面向直属于厂家的客户群体申请授信；例如：厂家的经销商、代理商、大型企业客户等
    .credit-edit-info_text
      .credit_circle
      span 直签业务类申请入口主要面向已经获得厂家直签授信额度的客户，此类客户可以将直签额度再次授予给下游的项目关系客户
</template>
<style lang="stylus" scoped>
.credit-edit-info
  display flex
  height 76px
  background rgba(77, 127, 213, .1)
  padding 16px 20px
  box-sizing border-box
  .custom_icon
    font-size 14px
    margin-right 15px
    color rgba(77, 127, 213, 1)
    position relative
    top 2px
  .credit-edit-info_img
    width 14px
    height 14px
    margin-right 10px
    position relative
    top 2px
  .credit-edit-info_content
    height 100%
    display flex
    flex-direction column
    justify-content center
    font-size 12px
    font-weight 400
    color rgba(77, 127, 213, 1)
    .credit-edit-info_text
      display flex
      align-items center
      .credit_circle
        width 3px
        height 3px
        background #4D7FD5
        margin-right 5px
        border-radius 50%
    .credit-edit-info_text:nth-of-type(1)
      margin-bottom 10px
</style>
