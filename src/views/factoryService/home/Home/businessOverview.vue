<template lang="pug">
  .p-business-container
    Card(:title='title' paddingRight='20px')
      template(v-slot:headRight)
        SearchSonTenant(v-model='selectedTenants' @change='changeTenant')
      .p-bc-container
        el-scrollbar
          ul.p-bc-info(v-loading='summaryLoading')
            li.p-bc-li(v-for='item in infoList' :key='item.id')
              .u-left
                .u-text
                  span {{ item.title }}
                  el-tooltip(effect="dark" :content="item.message" placement="top")
                    i.el-icon-warning
                .u-amount
                  span {{ item.amount | toAmountStr(2, true, true) }}
                  i.icon.iconfont.iconjiantou1.u-down(v-if='item.isUp === -1')
                  //- i.u-ping(v-if='item.isUp === 0')
                  i.icon.iconfont.iconjiantou1.u-up.p-deg180(v-if='item.isUp === 1')
              .u-right(:class='[{"p-down" : item.isUp === -1}, {"p-up" : item.isUp === 1}, {"p-no-change" : item.isUp === 0}]')
        .p-bc-chart
          .p-chart-title
            .u-text 出货数据
            .u-operating
              el-button-group.u-button-group1
                el-button(:loading='statisticsLoading' :type='timeType === 3 ? "primary" : "default"' @click='handleClickDateFilter(3)') 按年
                el-button(:loading='statisticsLoading' :type='timeType === 2 ? "primary" : "default"' @click='handleClickDateFilter(2)') 按月
                el-button(:loading='statisticsLoading' :type='timeType === 1 ? "primary" : "default"' @click='handleClickDateFilter(1)') 按日
              el-button-group.u-button-group2
                el-button(:loading='statisticsLoading' :type='type === 1 ? "primary" : "default"' @click='handleClickShipFilter(1)') 出货金额
                el-button(:loading='statisticsLoading' :type='type === 2 ? "primary" : "default"' @click='handleClickShipFilter(2)') 出货经销商数
          el-scrollbar
            .p-chart-content(v-loading='statisticsLoading')
              BusinessOverviewBarLine(:list='tableList' :type='type' :timeType='timeType')
</template>

<script>
import Card from '@/components/Card'
import SearchSonTenant from '@/components/SearchSonTenant'
import BusinessOverviewBarLine from './businessOverviewBarLine'
import ajaxStore from '@/apis'

export default {
  name: 'businessOverview',
  data() {
    return {
      title: '业务概览',
      timeType: 1, // 按日期方式默认筛选 1:日, 2: 月, 3: 年
      type: 1, // 按出货方式默认筛选 1: 出货金额, 2: 出货经销商
      summaryLoading: false,
      statisticsLoading: false,
      infoList: [ // 1：上升；0：持平；-1：下降
        { id: 1, title: '昨日出货金额（万元）', amount: 0, isUp: 0, message: '昨日经销商在仟金顶的出货金额总和' },
        { id: 2, title: '当前应收款（万元）', amount: 0, isUp: 0, message: '截止昨日24：00经销商处于仟金顶垫资中的货款总和' },
        { id: 3, title: '当前异常金额（万元）', amount: 0, isUp: 0, message: '截止昨日24：00经销商处于仟金顶垫资中的货款总和' }
      ],
      tableList: [],
      selectedTenants: []
    }
  },
  async created() {
    await this.$store.dispatch('getSonTenants')
    await this.businessViewSummary()
    await this.businessViewStatistics()
  },
  mounted() {},
  methods: {
    handleClickDateFilter(type) {
      this.timeType = type
      this.businessViewStatistics()
    },
    handleClickShipFilter(type) {
      this.type = type
      this.businessViewStatistics()
    },
    processingTime(time) {
      const str = new Date(time)
      const year = str.getFullYear()
      const mouth = str.getMonth() + 1
      const day = str.getDate()
      switch (this.timeType) {
        case 1: return `${mouth}/${day}`
        case 2: return `${mouth}月`
        case 3: return `${year}`
      }
    },
    processingList(list) {
      list.forEach((item) => {
        item.xAxis = this.processingTime(item.time)
        if (this.timeType === 2) {
          item.tRate = item.yoy === null ? null : (item.yoy * 100).toFixed(2)
          item.hRate = item.mom === null ? null : (item.mom * 100).toFixed(2)
        } else if (this.timeType === 3) {
          item.hRate = item.mom === null ? null : (item.mom * 100).toFixed(2)
        }
        if (this.type === 1) {
          item.amount = (Number(item.value) / 10000).toFixed(2)
        } else {
          item.amount = item.value
        }
      })
      return list
    },
    // 选择子公司后触发
    changeTenant() {
      this.businessViewSummary()
      this.businessViewStatistics()
    },
    async businessViewSummary () {
      const data = {}
      this.selectedTenants && (data.tenantIds = this.selectedTenants.join(','))
      this.summaryLoading = true
      const res = await ajaxStore.factoryService.home.businessViewSummary(data)
      this.summaryLoading = false
      if (res.data && res.data.code === '0') {
        const data = res.data.data
        this.$set(this.infoList[0], 'amount', data.shipmentAmount || 0)
        this.$set(this.infoList[0], 'isUp', data.shipmentTrend)
        this.$set(this.infoList[1], 'amount', data.creditBalanceAmount || 0)
        this.$set(this.infoList[1], 'isUp', data.creditBalanceTrend)
        this.$set(this.infoList[2], 'amount', data.exceptionAmount || 0)
        this.$set(this.infoList[2], 'isUp', data.exceptionTrend)
      }
    },
    async businessViewStatistics () {
      const data = { timeType: this.timeType, type: this.type }
      this.selectedTenants && (data.tenantIds = this.selectedTenants.join(','))
      this.statisticsLoading = true
      const res = await ajaxStore.factoryService.home.businessViewStatistics(data)
      this.statisticsLoading = false
      if (res.data && res.data.code === '0') {
        const list = res.data.data || []
        this.tableList = this.processingList(list)
      }
    }
  },
  components: {
    Card,
    SearchSonTenant,
    BusinessOverviewBarLine
  }
}
</script>

<style lang="stylus" scoped>
BORDER_COLOR = #EAEBEE
TEXT_COLOR = #494949
LINK_BlUE = #3C5DA4

.p-business-container
  margin-top 10px
.p-bc-container
  width 100%
  overflow hidden
.p-bc-info
  display flex
  // flex-wrap wrap
.p-bc-li
  display flex
  justify-content space-between
  align-items center
  flex-grow 1
  flex-shrink 0
  width 258px
  height 80px
  margin-left 10px
  margin-bottom 10px
  padding 15px
  background-color #F8F9FA
  .u-left
    margin-right 10px
    .u-text
      margin-bottom 5px
      i.el-icon-warning
        color #A3B2C2!important
        cursor pointer
    .u-amount
      font-size 20px
      font-family Helvetica-Bold, Helvetica
      font-weight bold
      // line-height 24px
      display flex
      align-items center
      i
        height 100%
        &.u-down
          color #25BECD
        &.u-up
          color #FF3E00
        // &.u-ping
          // width 9px
          // height 3px
          // margin-left 4px
          // background #3C5DA4
  .u-right
    width 65px
    height 34px
    position relative
  &:first-child
    margin-left 0
.p-bc-chart
  width 100%
  margin-top 10px
  border 1px solid BORDER_COLOR
.p-chart-title
  display flex
  justify-content space-between
  align-items center
  height 50px
  padding 0 20px
  border-bottom 1px solid BORDER_COLOR
  .u-text
    font-size 14px
    font-weight 500
    color TEXT_COLOR
  .u-operating
    button
      width 45px
      padding 0
    .u-button-group2
      margin-left 20px
      button
        width 80px
.p-chart-content
  height 350px
  padding 20px 20px 0 20px

.p-deg180
  display inline-block
  transform rotate(180deg)
.p-down
  // background linear-gradient(360deg, rgba(76, 224, 232, 0) 0%, rgba(57, 208, 219, 0.24) 49%, #25BECD 100%)
  background url('//cdn.qjdchina.com/static-online/saas/factoryService/home/down.png') no-repeat
  background-size cover
.p-up
  // background: linear-gradient(360deg, rgba(255, 62, 0, 0) 0%, rgba(255, 62, 0, 0.2) 49%, #FF3E00 100%)
  background url('//cdn.qjdchina.com/static-online/saas/factoryService/home/up.png') no-repeat
  background-size cover
.p-no-change
  // background: linear-gradient(360deg, rgba(255, 62, 0, 0) 0%, rgba(255, 62, 0, 0.2) 49%, #FF3E00 100%)
  background url('//cdn.qjdchina.com/static-online/saas/factoryService/home/noChange.png') no-repeat
  background-size cover
</style>
