<template lang='pug'>
.open-service
  .container
    .page-header-title 开通服务
    .sub-title 当前您暂未开通此项服务
    .open-service-list
      .open-item
        img.icon-open(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-open-service-icon1.png`')
        .name 开通管理员账号
        .info 请联系khyunying@qjdchina.com 或 400-6121-666
      .open-item
        img.icon-open(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-open-service-icon2.png`')
        .name 开通子账号
        .info 请联系管理员开通
</template>

<script>

export default {

  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
}
</script>

<style lang='stylus' scoped>
.open-service
  background-color #F8F9FA
  padding-bottom 40px
  .sub-title
    color #E29A27
    font-size 16px
    height 22px
    margin-bottom 20px
    text-align center
  .open-service-list
    display flex
    justify-content space-between
    .open-item
      background-color #FFF
      border 1px solid #E8ECF7
      padding 20px
      flex 1 0 100px
      position relative
      .icon-open
        position absolute
        top 20px
        right 20px
        height 68px
        width 68px
      .name
        height 22px
        font-size 16px
        line-height 22px
        border-left 4px solid #4D7FD5
        padding-left 6px
      .info
        font-size 14px
        margin 20px 0 6px
        height 20px
        line-height 20px
    .open-item:last-child
      margin-left 20px
</style>
