<template lang="pug">
  .p-recommend-container
    Card(:title='title')
      .p-rc-container(ref='rcContainer')
        .p-rc-card
          ul.p-rc-ul(ref='rcUl')
            li.p-rc-li(v-for='item in cardList' :key='item.id')
              .u-li-title
                span {{ item.title }}
                span {{ item.status ? '已开通' : '未开通' }}
              .u-li-context
                .u-text {{ item.text }}
                el-button.u-li-button(plain @click='handleClickView(item)') 查看
        .p-rc-prev.el-icon-arrow-left(@click='handleClickPrev' v-if='showPrev')
        .p-rc-next.el-icon-arrow-right(@click='handleClickNext' v-if='showNext')
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'RecommendService',
  data() {
    return {
      title: '推荐服务',
      showPrev: false,
      showNext: false,
      rcContainerWidth: 0,
      cardList: [
        // { id: 1, title: '供应链协同', text: '业务流程线上化，帮助企业降本增效', status: false, permissions: ['PTN:SUPPLIER:CHAIN_ORDER:MANAGE', 'PTN:SUPPLIER:CHAIN_PROJECT:MANAGE', 'PTN:SUPPLIER:CHAIN_PRODUCT:MANAGE'], routerName: 'supplyCoordination' }, // 订单管理 项目查询 产品管理
        // { id: 2, title: '赊销系统', text: '赊销流程全链路线上化管理', status: false, permissions: ['PTN:SUPPLIER:SAASCREDIT_AMOUNT:MANAGE', 'PTN:SUPPLIER:SAASCREDIT_USE:MANAGE', 'PTN:SUPPLIER:SAASCREDIT_REFUND:MANAGE', 'PTN:SUPPLIER:CREDIT'], routerName: 'creditsalesSystem' }, // 额度管理 用信管理 还款管理 授信设置
        { id: 3, title: '经销商分层', text: '经销商风险评估，锁定优质下游', status: false, permissions: ['PTN:ASIA:SUPPLIER:INTEGRITY_ENQUIRY:VIEW'], routerName: 'dealerStratification' }, // 分层管理
        { id: 4, title: '智能合同', text: '实现合同全流程线上化、无纸化', status: false, permissions: ['PTN:SUPPLIER:CONTRACT:MANAGE', 'PTN:SUPPLIER:CONTRACT:MANAGE:CREATE', 'PTN:SUPPLIER:CONTRACT:MANAGE:UPDATE'], routerName: 'smartContract'}, // 智能合同
        { id: 5, title: '开发商评估', text: '透查建筑工程商、项目资质，精准定位合作风险', status: false, permissions: ['PTN:SUPPLIER:ENTERPRISE_REPORT:VIEW'], routerName: 'evaluationDeveloper' } // 开发商大盘
      ]
    }
  },
  async mounted() {
    this.initPermissions()
    this.initShowNextBool()
  },
  methods: {
    initShowNextBool () {
      const length = this.cardList.length
      this.rcContainerWidth = this.$refs.rcContainer && this.$refs.rcContainer.clientWidth
      this.UlWidth = 210 * length - 20
      this.showPrev = false
      if (this.UlWidth > this.rcContainerWidth) {
        this.showNext = true
      } else {
        this.showNext = false
      }
    },
    initPermissions(permissions) {
      permissions && this.cardList.forEach(item => {
        item.status = item.permissions.some(key => permissions[key])
      })
      // for (let i = 0; i < this.cardList.length; i++) {
      //   this.cardList[i].status = false
      //   for (const key in permissions) {
      //     if (this.cardList[i].permissions.includes(key)) {
      //       this.$set(this.cardList[i], 'status', permissions[key])
      //     }
      //     if (this.cardList[i].status === true) break
      //   }
      // }
    },
    handleClickView (item) {
      this.$router.push({name: item.routerName})
    },
    handleClickPrev () {
      this.moveMarginLeft('prev')
    },
    handleClickNext () {
      this.moveMarginLeft('next')
    },
    moveMarginLeft (type = 'next') {
      const uiMarginLeft = Number(this.$refs.rcUl.style.marginLeft.slice(0, -2))
      if (type === 'next') { // 下一张
        const move = (this.UlWidth + uiMarginLeft) - this.rcContainerWidth
        if (move < 190) { // 是否最后一次移动
          // this.showNext = false
          if (uiMarginLeft === 0) { // 是否第一次移动
            this.$refs.rcUl && (this.$refs.rcUl.style.marginLeft = `-${move}px`)
          } else {
            this.$refs.rcUl && (this.$refs.rcUl.style.marginLeft = `-${move - uiMarginLeft}px`)
          }
        } else {
          if (uiMarginLeft === 0) { // 是否第一次移动
            this.$refs.rcUl && (this.$refs.rcUl.style.marginLeft = '-210px')
          } else {
            this.$refs.rcUl && (this.$refs.rcUl.style.marginLeft = `-${210 - uiMarginLeft}px`)
          }
        }
      } else { // 上一张
        if (uiMarginLeft >= -210) { // 是否最后一次移动
          // this.showPrev = false
          this.$refs.rcUl.style.marginLeft = ''
        } else {
          this.$refs.rcUl && (this.$refs.rcUl.style.marginLeft = `${210 + uiMarginLeft}px`)
        }
      }
      // 移动后展示
      const uiMarginLeft2 = Number(this.$refs.rcUl.style.marginLeft.slice(0, -2))
      const move2 = (this.UlWidth + uiMarginLeft2) - this.rcContainerWidth
      this.showPrev = uiMarginLeft2 !== 0 || false
      this.showNext = move2 !== 0 || false
    },
  },
  computed: {
    permissions() {
      return this.$store.state.permissions
    }
  },
  watch: {
    permissions: {
      handler(newVal) {
        this.initPermissions(newVal)
      },
      immediate: true
    }
  },
  components: {
    Card
  }
}
</script>

<style lang="stylus" scoped>
SMALL_SIZE = 12px
TEXT_COLOR = #494949
BORDER_COLOR = #EAEBEE
LINK_BlUE = #3C5DA4
WHITE = #fff

p
  margin 0
  padding 0
.p-recommend-container
  margin-top 10px
.p-rc-container
  position relative
.p-rc-card
  flex 1
  // padding-right 10px
  overflow hidden
.p-rc-ul
  display flex
  transition .2s margin linear
.p-rc-li
  width 190px
  flex-shrink 0
  margin-right 20px
  border-radius 2px
  background WHITE
  overflow hidden
  &:last-child
    margin-right 0
  .u-li-title
    display flex
    justify-content space-between
    align-items center
    height 30px
    line-height 30px
    padding 0 20px
    font-size SMALL_SIZE
    color WHITE
    background linear-gradient(219deg, #4AC9E6 0%, #498CC9 1%, rgba(70, 106, 181, 0.93) 42%, rgba(67, 101, 176, 0.95) 62%, rgba(62, 94, 167, 0.99) 82%, #375597 120%)
  .u-li-context
    line-height 17px
    padding 10px 20px 17px
    color TEXT_COLOR
    background url(//cdn.qjdchina.com/static-online/saas/factoryService/home/recommend-1.png) no-repeat
    background-size cover
    border 1px solid BORDER_COLOR
    .u-text
      height 34px
      word-break break-all
      text-overflow ellipsis
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 2
      overflow: hidden
  &:nth-child(2) .u-li-context
    background url(//cdn.qjdchina.com/static-online/saas/factoryService/home/recommend-2.png) no-repeat
    background-size cover
  &:nth-child(3) .u-li-context
    background url(//cdn.qjdchina.com/static-online/saas/factoryService/home/recommend-3.png) no-repeat
    background-size cover
  &:nth-child(4) .u-li-context
    background url(//cdn.qjdchina.com/static-online/saas/factoryService/home/recommend-4.png) no-repeat
    background-size cover
  &:nth-child(5) .u-li-context
    background url(//cdn.qjdchina.com/static-online/saas/factoryService/home/recommend-5.png) no-repeat
    background-size cover
  .u-li-button
    width 54px
    height 24px
    margin-top 8px
    padding 0
.p-rc-prev
  display flex
  align-items center
  position absolute
  left -20px
  top -20px
  width 30px
  height calc(100% + 40px)
  padding 0
  font-size 28px
  color #9AA6B8
  background-color WHITE
  border-right 1px solid BORDER_COLOR
  cursor pointer
  &:hover
    color LINK_BlUE
.p-rc-next
  display flex
  align-items center
  position absolute
  right -20px
  top -20px
  width 30px
  height calc(100% + 40px)
  padding 0
  font-size 28px
  color #9AA6B8
  background-color WHITE
  border-left 1px solid BORDER_COLOR
  cursor pointer
  &:hover
    color LINK_BlUE
</style>

<style lang="stylus">
.p-recommend-container .card .u-content
  overflow visible
</style>
