<template lang="pug">
  .page-main.p-main.flex
    div
      i
      .u-text-wrap
        p 天呐，您要访问的页面失踪了！如有疑问，请联系技术部。
        p
          el-button(type='text' size='medium' @click='$router.push({name: "login"})') 前往登录
          span.u-gap |
          el-button(type='text' size='medium' @click='$router.go(-2)') 返回上一页
</template>

<style lang="stylus" scoped>
.p-main
  align-items center
  justify-content center
  margin-top 100px
  i
    display inline-block
    width 400px
    height 228px
    background url('//cdn.qjdchina.com/static-online/saas/common/404.png') center no-repeat
    background-size contain
  .u-text-wrap
    margin-top 28px
    text-align center
  p
    margin 0
    font-size 14px
    line-height 24px
    color #353F51
  .u-gap
    margin 0 20px
</style>
