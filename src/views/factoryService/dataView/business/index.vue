<template lang="pug">
  .page-main.p-market
    .p-m-title
      .page-title 数据概览
      div
        SearchSonTenant(v-model='selectedTenants' @change='refreshPage' style='margin-right: 20px;')
        el-date-picker(v-model='timeRange' type='monthrange' align='right' range-separator='-' start-placeholder='开始月份' end-placeholder='结束月份' :picker-options="pickerOptions" unlink-panels value-format='yyyy-M' @change='changeTime' @clear='changeTime')
    Card.p-m-summary(title='累计业务数据' v-loading='businessSummaryLoading')
      ul.p-ms-ul
        li.p-ms-li
          .u-name
            span 累计订单金额（万元）
            el-tooltip(effect="dark" content="在仟金顶发生业务的经销商，累计产生的订单总额（包含已通过、已完结的订单金额）" placement="top")
              i.el-icon-warning
          .u-value(:data-amount='businessSummary.orderAmount') {{businessSummary.orderAmount | toAmountStr(2, true, true)}}
        li.p-ms-li
          .u-name
            span 累计订单数（个）
            el-tooltip(effect="dark" content="在仟金顶发生业务的经销商，累计产生的订单总数（包含已通过、已完结的订单数）" placement="top")
              i.el-icon-warning
          .u-value {{businessSummary.orderCount}}
        li.p-ms-li
          .u-name
            span 累计出货额（万元）
            el-tooltip(effect="dark" content="在仟金顶发生业务的经销商，累计已支付货款的出货金额，包含背靠背，但不包含托盘还款" placement="top")
              i.el-icon-warning
          .u-value(:data-amount='businessSummary.shipmentAmount') {{businessSummary.shipmentAmount | toAmountStr(2, true, true)}}
        li.p-ms-li
          .u-name
            span 累计出货次数（次）
            el-tooltip(effect="dark" content="在仟金顶发生业务的经销商，累计已支付货款的出货总次数，包含背靠背，但不包含托盘还款" placement="top")
              i.el-icon-warning
          .u-value {{businessSummary.shipmentCount}}
        li.p-ms-li
          .u-name
            span 当前应收款（万元）
            el-tooltip(effect="dark" content="在仟金顶发生业务的经销商，当前垫资中的总金额" placement="top")
              i.el-icon-warning
          .u-value(:data-amount='businessSummary.creditBalanceAmount') {{businessSummary.creditBalanceAmount | toAmountStr(2, true, true)}}
        li.p-ms-li
          .u-name
            span 累计出货经销商（家）
            el-tooltip(effect="dark" content="在仟金顶发生业务的，累计已支付货款的总经销商数（去重）" placement="top")
              i.el-icon-warning
          .u-value(:data-amount='businessSummary.companyCount') {{ businessSummary.companyCount }}
    .p-mf-right
      Card(title='出货区域分布' :loading='businessAreaLoading')
        template(slot='headRight')
          .p-table-header
            el-radio-group.p-radio-group(v-model='businessAreaType' @change='getBusinessArea')
              el-radio-button.u-first(label='2') 出货金额
              el-radio-button(label='1') 出货经销商
        .p-content-main
          .p-map-box
            el-scrollbar
              .p-chart-content
                ChinaMapGeo(:data='mapList' :type='businessAreaType')
            .p-noice
              i.el-icon-warning
              span 注：颜色越深的区域，表示数值越大
          .p-table-box
            .p-table-content
              .u-title 出货经销商地域分布 TOP10
              el-table(:data='topProvince')
                el-table-column(prop="name" label="省份")
                el-table-column(prop="value" :label='businessAreaType === "2" ? "金额（万元）" : "家"' align='right')
                  template(slot-scope='scope')
                    span(v-if='businessAreaType === "2"') {{ scope.row.value | toAmountStr(2, true, true) }}
                    span(v-else) {{ scope.row.value }}
              .p-empty(v-if='topProvince.length === 0')
                img.u-empty-img(:src="`${$assetsBaseUrl}/factoryService/dataView/empty-table.png`")
                .u-fill-txt 暂无信息
    .p-mf-left
      Card.p-mfl-top(title='平均业务数据' :loading='businessSummaryLoading')
        ul.p-mfl-ul
          li.p-mfl-li
            .u-name 经销商平均出货金额（万元）
            .u-value(:data-amount='businessSummary.averageShipmentAmount') {{businessSummary.averageShipmentAmount | toAmountStr(2, true, true)}}
          li.p-mfl-li
            .u-name 经销商平均出货次数（次）
            .u-value {{businessSummary.averageShipmentCount}}
          li.p-mfl-li
            .u-name 平均每笔出货金额（万元）
            .u-value(:data-amount='businessSummary.averageOrderShipmentAmount') {{businessSummary.averageOrderShipmentAmount | toAmountStr(2, true, true)}}
      Card.p-mfl-bottom(title='经销商转化' :loading='businessSummaryLoading')
        .p-mlr-content(v-if='businessSummary.dealerTransform && businessSummary.dealerTransform.dealerCount')
          ul.p-funnel-main
            li.u-funnel-item
              .u-funnel-amount {{businessSummary.dealerTransform.dealerCount}}
              .u-funnel-title 注册经销商
            li.u-funnel-item
              .u-funnel-amount {{businessSummary.dealerTransform.quotaDealerCount}}
              .u-funnel-title 获得额度经销商
            li.u-funnel-item
              .u-funnel-amount {{businessSummary.dealerTransform.shipmentDealerCount}}
              .u-funnel-title 出货经销商
          ul.p-funnel-arrow-main
            li.u-funnel-arrow-item.u-funnel-arrow-1
              .u-funnel-arrow
              .u-funnel-text(v-if='businessSummary.dealerTransform.dealerCount') 转化率{{(businessSummary.dealerTransform.quotaDealerCount/businessSummary.dealerTransform.dealerCount*100).toFixed(0)}}%
              .u-funnel-text(v-else) -
            li.u-funnel-arrow-item.u-funnel-arrow-2
              .u-funnel-arrow
              .u-funnel-text(v-if='businessSummary.dealerTransform.quotaDealerCount') 转化率{{(businessSummary.dealerTransform.shipmentDealerCount/businessSummary.dealerTransform.quotaDealerCount*100).toFixed(0)}}%
              .u-funnel-text(v-else) -
        .u-empty-tips(v-else) 暂无信息
      Card.p-mfl-bottom(title='出货经销商排行TOP10' :loading='businessTopLoading' noWrap)
        template(slot='headRight')
          TimeRange.choose-time(@change='changeDimension')
        .list-scroll(v-if='businessTopList.length')
            el-scrollbar(style="height:100%;width: 100%")
              ul.business-top-list
                li.item(v-for='(item, index) in businessTopList' :key='item.companyId')
                  span {{ index+1 }}. {{ item.companyName }}
        .u-empty-tips(v-else) 暂无信息
</template>
<script>
// import { Chart } from '@antv/g2'
import ajaxStore from '@/apis'
import { provinceData } from '@/utils/enums'
import { getCurrentMonthFirst } from '@/utils/util'
import { mapState } from 'vuex'
import Card from '@/components/Card'
import SearchSonTenant from '@/components/SearchSonTenant'
import TimeRange from '@/components/TimeRange'
import ChinaMapGeo from './chinaMapGeo'
export default {
  data () {
    return {
      isMore: false,
      businessSummary: {},
      businessAreaType: '1',
      provinceData,
      topProvince: [],
      businessTopLoading: false,
      businessTopList: [],
      dimension: {
        type: 1
      },
      businessSummaryLoading: false,
      businessAreaLoading: false,
      shipmentSummaryLoading: false,
      timeRange: '',
      selectedTenants: [],
      shipmentSummary: {},
      shipmentAmountSummaryData: [],
      shipmentDealerSummaryData: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', [new Date(getCurrentMonthFirst(new Date())), new Date()])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 3)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 6)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '今年至今',
          onClick(picker) {
            const end = new Date()
            const start = new Date(new Date().getFullYear(), 0)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      nameEnums: {
        云南省: '云南',
        黑龙江省: '黑龙江',
        贵州省: '贵州',
        北京市: '北京',
        河北省: '河北',
        山西省: '山西',
        吉林省: '吉林',
        宁夏回族自治区: '宁夏',
        辽宁省: '辽宁',
        海南省: '海南',
        内蒙古自治区: '内蒙古',
        天津市: '天津',
        新疆维吾尔自治区: '新疆',
        上海市: '上海',
        陕西省: '陕西',
        甘肃省: '甘肃',
        安徽省: '安徽',
        香港特别行政区: '香港',
        广东省: '广东',
        河南省: '河南',
        湖南省: '湖南',
        江西省: '江西',
        四川省: '四川',
        广西壮族自治区: '广西',
        江苏省: '江苏',
        澳门特别行政区: '澳门',
        浙江省: '浙江',
        山东省: '山东',
        青海省: '青海',
        重庆市: '重庆',
        福建省: '福建',
        湖北省: '湖北',
        西藏自治区: '西藏',
        台湾省: '台湾'
      },
      mapList: []
    }
  },
  computed: mapState(['menuData']),
  methods: {
    // 选择子公司后触发
    refreshPage(tenants) {
      tenants && (tenants = tenants.join(','))
      this.getBusinessSummary(tenants)
      this.getBusinessArea(tenants)
      this.getTopBusinessList()
    },
    async getBusinessArea() {
      const data = {}
      this.selectedTenants && (data.tenantIds = this.selectedTenants.join(','))
      data.startTime = this.timeRange && this.timeRange.length ? this.timeRange[0] : ''
      data.endTime = this.timeRange && this.timeRange.length ? this.timeRange[1] : ''
      data.type = this.businessAreaType
      this.businessAreaLoading = true
      const res = await ajaxStore.factoryService.dataView.getBusinessArea(data)
      this.businessAreaLoading = false
      if (res.data && res.data.code === '0') {
        const provinceList = res.data.data || []
        const provinceObj = {}
        provinceList.forEach(item => {
          provinceObj[item.name] = item
        })
        const realData = []
        Object.keys(this.nameEnums).forEach((key) => {
          const provinceData = provinceObj[key]
          const realDataItem = {}
          realDataItem.name = this.nameEnums[key]
          if (provinceData) {
            realDataItem.value = this.businessAreaType === '1' ? provinceData.value : parseFloat((provinceData.value / 10000).toFixed(2))
          } else {
            realDataItem.value = 0
          }
          realData.push(realDataItem)
        })
        this.mapList = realData
        this.topProvince = provinceList.slice(0, 10)
      } else {
        this.provinceData = []
        this.topProvince = []
        this.mapList = []
      }
    },
    async getBusinessSummary () {
      const data = {}
      this.selectedTenants && (data.tenantIds = this.selectedTenants.join(','))
      data.startTime = this.timeRange && this.timeRange.length ? this.timeRange[0] : ''
      data.endTime = this.timeRange && this.timeRange.length ? this.timeRange[1] : ''
      this.businessSummaryLoading = true
      const res = await ajaxStore.factoryService.dataView.getBusinessSummary(data)
      this.businessSummaryLoading = false
      if (res.data && res.data.code === '0') {
        const businessSummary = res.data.data || {}
        // 演示数据 待删
        // businessSummary.orderAmount = 58872400
        // businessSummary.orderCount = 316
        // businessSummary.shipmentAmount = 50321200
        // businessSummary.shipmentCount = 349
        // businessSummary.creditBalanceAmount = 22854600
        // businessSummary.averageShipmentAmount = 613700
        // businessSummary.averageShipmentCount = 4.26
        // businessSummary.averageOrderShipmentAmount = 144200
        // businessSummary.dealerTransform = {
        //   dealerCount: 158,
        //   quotaDealerCount: 102,
        //   shipmentDealerCount: 82
        // }
        // -
        businessSummary.dealerTransform = businessSummary.dealerTransform || {
          dealerCount: 0,
          quotaDealerCount: 0,
          shipmentDealerCount: 0
        }

        // 区分productName中的（）or ()中的内容
        businessSummary.solutions = businessSummary.solutions?.map((item) => {
          item.title = item.productName.match(/（(.+?)）/g)
          item.productName = item.productName.replace(item.title, '')
          item.title = Array.isArray(item.title) ? item.title[0].replace(/（|）/g, '') : item.productName.match(/\((.+?)\)/g)
          item.productName = item.productName.replace(item.title, '')
          item.title = Array.isArray(item.title) ? item.title[0].replace(/\(|\)/g, '') : item.title
          return item
        }) ?? []
        this.businessSummary = businessSummary
      }
    },
    async getTopBusinessList () {
      const params = {
        queryTime: ''
      }
      if (this.dimension.type === 2) {
        params.queryTime += this.dimension.year
      } else if (this.dimension.type === 3) {
        params.queryTime += this.dimension.month
      }
      this.selectedTenants && (params.tenantIds = this.selectedTenants.join(','))
      this.businessTopLoading = true
      const res = await ajaxStore.factoryService.dataView.getBusinessCompanyTop(params)
      this.businessTopLoading = false
      if (res.data && res.data.code === '0') {
        this.businessTopList = res.data.data || []
      }
    },
    changeDimension (val) {
      this.dimension = val
      this.getTopBusinessList()
    },
    showMoreProduct () {
      this.isMore = !this.isMore
    },
    changeTime(e) {
      if (!e) {
        this.timeRange = []
      }
      this.getBusinessSummary()
      this.getBusinessArea()
    }
  },
  mounted () {
    this.getBusinessSummary()
    this.getBusinessArea()
    this.getTopBusinessList()
  },
  components: {
    Card,
    SearchSonTenant,
    TimeRange,
    ChinaMapGeo
  }
}
</script>
<style lang="stylus" scoped>
SPACING = 10px

.p-m-title
  display flex
  justify-content space-between
  align-items center
  margin-bottom 15px
  .page-title
    margin-right 34px
.p-m-summary
  margin-bottom SPACING
  background linear-gradient(219deg, #498CC9 0%, rgba(70, 106, 181, 0.93) 42%, rgba(67, 101, 176, 0.95) 54%, rgba(62, 94, 167, 0.99) 70%, #334D91 100%)
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.08)
.p-ms-ul
  display flex
  justify-content space-between
  align-items center
.p-ms-li
  width 20%
  padding 15px 0 12px 20px
  color #fff
  border-left 1px solid #5386DB
  &:first-child
    padding-left 0
    border none
  .u-name
    margin-bottom 10px
    font-size 14px
    .el-icon-warning
      color #a3b2c2
      font-size 14px
  .u-value
    font-size 28px
.p-mf-left
  display flex
  padding-top 10px
  margin 0 -5px
  .card
    margin 0 5px
.p-mf-right
  height 710px
  flex-grow 1
  display flex
  justify-content space-between
.p-content-main
  display flex
.p-map-box
  position relative
  margin-top -20px
  padding-bottom 40px
  // height 100%
  padding-right 20px
  flex-grow 1
  border-right 1px solid #EAEBEE
.p-noice
  position absolute
  bottom 50px
  width 100%
  text-align center
  color #6D7278
  i
    margin-right 5px
    font-size 14px
    color #FFA86B
.p-table-box
  width 300px
  margin-left 20px
  padding 20px 0
  background #fff
  position relative
  // box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.08)
.p-mfl-top
  margin-bottom SPACING
  height 350px!important
.p-mfl-ul
  display flex
  flex-direction column
  justify-content space-between
  height 258px
.p-mfl-li
  border-bottom 1px solid #F4F9FD
  height 100px
  display flex
  flex-direction column
  justify-content center
  flex-shrink 0
  &:last-child
    border-bottom 0
  .u-name
    margin-bottom 8px
    color #738A9E
    font-size 14px
  .u-value
    color #494949
    font-size 28px
.p-mlr-content
  display flex
  height 258px
.choose-time
  padding-right 10px
.list-scroll
  height 298px
  padding 10px
  .business-top-list
    list-style none
    padding 0 10px
    .item
      color #494949
      padding 12px
      font-size 14px
    .item:nth-child(2n)
      background-color #EFF4FC
.p-funnel-main
  width 208px
  height 258px
  position relative
  display flex
  flex-direction column
  align-items center
  .u-funnel-item
    color #fff
    text-align center
    position relative
    width 100%
    height 72px
    padding 12px 0
    margin-bottom 14px
    &:before, &:after
      content ''
      position absolute
      top 0
      width 0
      height 0
      border-bottom 72px solid #fff
    &:before
      left 0
      border-right 22px solid transparent
    &:after
      right 0
      border-left 22px solid transparent
    &:nth-child(1)
      width 208px
      background: linear-gradient(180deg, rgba(95, 130, 207, 0.7) 0%, rgba(59, 92, 162, 0.7) 100%)
    &:nth-child(2)
      width 165px
      background: linear-gradient(180deg, rgba(95, 130, 207, 0.9) 0%, rgba(59, 92, 162, 0.9) 100%)
    &:nth-child(3)
      width 126px
      background: linear-gradient(180deg, rgba(95, 130, 207, 1) 0%, rgba(59, 92, 162, 1) 100%)
    .u-funnel-amount
      margin-bottom 4px
      font-size 20px
      line-height 28px
    .u-funnel-title
      font-size 12px
.p-funnel-arrow-main
  .u-funnel-arrow-item
    display flex
    align-items center
    &.u-funnel-arrow-1
      .u-funnel-arrow
        margin-top 70px
        background url('//cdn.qjdchina.com/static-online/saas/factoryService/dataView/funel3-arrow-1.png') center center no-repeat
        background-size contain
      .u-funnel-text
        margin-top 67px
    &.u-funnel-arrow-2
      .u-funnel-arrow
        margin-top 53px
        background url('//cdn.qjdchina.com/static-online/saas/factoryService/dataView/funel3-arrow-2.png') center center no-repeat
        background-size contain
      .u-funnel-text
        margin-top 50px
  .u-funnel-arrow
    width 16px
    height 26px
  .u-funnel-text
    margin-top 66px
    margin-left 10px
    font-size 12px
    color #7A869E
// 出货区域分布
.p-chart-content
  // min-width 600px
  height 618px
/deep/ .el-radio-button--small .el-radio-button__inner
  width 90px
  padding 7px 14px
  border-radius 0
  color #3C5CA4
  background-color #EFF4FC
/deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner
  color #fff
  background-color #3C5DA4
  border-color #3C5DA4
  box-shadow none
.p-radio-group
  // display flex
  // justify-content space-between
  // padding 11px 20px 11px 0
  // .u-first
  //   margin-right 15px
  padding-right 20px
  text-align center
  >>>.el-radio-button
    margin-left 20px
    .el-radio-button__inner
      color #3C5CA4
      background-color #EFF4FC
      width 90px
      text-indent 0px
      border 1px solid #EFF4FC
      border-radius 4px
  >>>.is-active
    .el-radio-button__inner
      color #FFF
      background-color #3C5DA4
      border-left none
.p-table-content
  .u-title
    margin-bottom 20px
    font-size 14px
    color #494949
.p-empty
  margin-top 100px
  text-align center
  color #738a9e
  img
    height 118px
  .u-fill-txt
    margin-top 20px
/deep/ .el-table thead tr,
/deep/ .el-table thead.is-group tr,
/deep/ .el-table thead th,
/deep/ .el-table thead.is-group th
  padding 11px 0
  color #fff
  background-color #8CA8D6
/deep/ .el-table--small td,
/deep/ .el-table--small th
  height 45px
  color #494949
/deep/ .el-table .el-table__body tr.el-table__row:nth-child(2n) td
  background-color #EFF4FC
/deep/ .el-table__empty-block
  display none
>>>.el-table td, >>>.el-table th.is-leaf
  border 0
>>>.el-table__body-wrapper.is-scrolling-none
  border 0

.p-mfl-bottom
  height 350px!important
  .u-empty-tips
    margin-top 140px
    text-align center
    color #738a9e
.p-empty-tips
  position absolute
  top 0
  width 100%
  text-align center
  color #738a9e
  line-height 100px
</style>

<style lang="stylus">
.p-m-summary.card
  overflow hidden
  border none
.p-m-summary .card-title
  color #fff
  border none
.p-m-summary .card-title_text
  font-size 16px
  font-weight 600
.p-m-summary .card-content
  margin-top 0
  height 90px
.p-mfl-top .card-content
  margin-top 0
  margin-bottom 0
</style>
