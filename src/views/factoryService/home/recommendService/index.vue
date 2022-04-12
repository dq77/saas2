<template lang='pug'>
.page-main
  slot(:status='status' :cardList='cardList' :goPage='goPage')
</template>

<script>

export default {

  data () {
    return {
      cardList: [
        { permissions: ['PTN:SUPPLIER:CHAIN_ORDER:MANAGE', 'PTN:SUPPLIER:CHAIN_PROJECT:MANAGE', 'PTN:SUPPLIER:CHAIN_PRODUCT:MANAGE'], pages: ['orderManage', 'projectQuery', 'productManage'], routerName: 'supplyCoordination' }, // 订单管理 项目查询 产品管理
        { permissions: ['PTN:SUPPLIER:SAASCREDIT_AMOUNT:MANAGE', 'PTN:SUPPLIER:SAASCREDIT_USE:MANAGE', 'PTN:SUPPLIER:SAASCREDIT_REFUND:MANAGE', 'PTN:SUPPLIER:CREDIT'], pages: ['creditList', 'CreditManageList', 'creditRepay', 'creditManager'], routerName: 'creditsalesSystem' }, // 额度管理 用信管理 还款管理 授信设置
        { permissions: ['PTN:ASIA:SUPPLIER:INTEGRITY_ENQUIRY:VIEW'], pages: ['sinceritySearch'], routerName: 'dealerStratification' }, // 分层管理
        { permissions: ['PTN:SUPPLIER:CONTRACT:MANAGE'], pages: ['contractList'], routerName: 'smartContract'}, // 智能合同
        { permissions: ['PTN:SUPPLIER:ENTERPRISE_REPORT:VIEW'], pages: ['realEstateMarket'], routerName: 'evaluationDeveloper' } // 开发商大盘
      ],
      status: false,
      page: {}
    }
  },
  methods: {
    initPermissions(permissions) {
      this.page = this.cardList.find(item => {
        return item.routerName === this.$route.name
      })
      this.page.permissions.map(item => {
        this.status = this.status || permissions[item]
      })
    },
    goPage() {
      if (this.status) {
        let next = ''
        this.page.permissions.map((item, index) => {
          if (this.permissions[item] && next === '') {
            next = this.page.pages[index]
          }
        })
        this.$router.push({name: next})
      } else {
        window.layoutScrollbar.wrap.scrollTo({top: 10000, left: 0, behavior: 'smooth'})
      }
    },
  },
  mounted () {
    if (Object.keys(this.permissions).length > 1) {
      this.initPermissions(this.permissions)
    }
    window.layoutScrollbar.wrap.scrollTo(0, 0)
  },
  computed: {
    permissions() {
      return this.$store.state.permissions
    }
  },
  watch: {
    permissions(newVal) {
      if (Object.keys(newVal).length > 1) {
        this.initPermissions(newVal)
      }
    }
  },
}
</script>

<style lang='stylus'>
.page-main
  .p-main-page
    min-width 980px
    background-color #FFF
    box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.05);
    // 盒
    .container
      margin: 0 auto
      padding 0 20px
      width 1300px
      @media screen and (max-width: 1600px)
        width 1033px
      @media screen and (max-width: 1300px)
        width 980px
      // 大标题
    .page-header-title
      color #2D2926
      font-size 24px
      height 93px
      line-height 33px
      padding-top 40px
      padding-bottom 20px
      text-align center
    // 列表Item项
    .flex-item
      text-align center
      width 216px
      .icon-area
        display block
        margin 0 auto
        width 66px
        height 66px
      .name
        margin 10px 0 16px
        font-size 16px
      .info
        line-height 17px
    // 应用场景
    .application-scenario
      margin-top 40px
      overflow hidden
      background linear-gradient(225deg, #2E4684 0%, #495E92 50%, #273861 100%)
      display flex
      position relative
      .left-pic-area
        img
          display block
          width 62%
          @media screen and (max-width: 1600px)
            width 460px
          @media screen and (max-width: 1300px)
            width 430px
      .right-bg-area
        flex 1 0 auto
        .rt-bgimg
          position absolute
          top 0
          right 0
          width 192px
          height 142px
        .dot-bging-1,.dot-bging-2
          position absolute
          width 84px
          height 54px
        .dot-bging-1
          top 131px
          right 388px
        .dot-bging-2
          top 246px
          right 51px
        .center-area
          position absolute
          top 50%
          margin-top -150px
          left 50%
          margin-left -48px
          .application-title
            font-size 24px
            height 33px
            line-height 33px
            color #FFF
            margin-top 40px
          .lc-bgimg
            display block
            margin 64px 0 10px
            height 14px
            width 18px
          .application-list
            display flex
            .scene-item
              display flex
              flex-direction column
              justify-content center
              border-top 12px solid #3C5DA4
              box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.05)
              background-color #FFF
              width 268px
              min-height 78px
              margin-right 20px
              padding 10px 20px
              @media screen and (max-width: 1300px)
                width 226px
              .scene-title
                font-size 16px
                line-height 22px
                height 22px
                margin-bottom 10px
    // 服务优势
    .service-advantage
      padding-bottom 40px
      .service-advantage-list
        margin-top 14px
        display flex
        justify-content space-between
        .flex-item
          border 1px solid #E8ECF7
          padding 20px 50px 40px
          width 310px
          @media screen and (max-width: 1300px)
            padding 20px 20px 40px
            width 278px
    // 悬浮阴影动画
    .hover
      box-shadow 0px 0px 0px 0px rgba(0, 0, 0, 0)
      transition: all .2s ease
    .hover:hover
      box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.1)
      transition: all .2s ease
</style>
