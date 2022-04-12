<template lang="pug">
  .page-main
    .p-m-title
      .page-title {{trusteeship.name}}额度数据概览
      div
        SearchSonTenant(@change='changeTenant' style='margin-right: 20px;')
    .top-count
      .card.p-total-info.total(v-loading='quotaSummaryLoading')
        .info-title
          .left 累计数据
          TimeRange(@change='changeDimension')
        .info-list(v-if='JSON.stringify(quotaSummary) !== "{}"')
          .info-item
            .item-title-name
              span 累计获得额度（万元）
              el-tooltip(effect="dark" :content="`累计成功获得${trusteeship.isTrusteeship ? '厂家赊销' : '仟金顶授信'}总额度（包含多次获得）`" placement="top")
                i.el-icon-warning
            .item-val {{ quotaHistory.totalCreditBalanceAmount }}
          .info-item
            .item-title-name
              span 获得额度经销商数（家）
              el-tooltip(effect="dark" :content="`仟金顶注册经销商中，获得过${trusteeship.isTrusteeship ? '厂家赊销' : '仟金顶授信'}额度的经销商总数`" placement="top")
                i.el-icon-warning
            .item-val {{ quotaHistory.dealerNum }}
        .u-empty-tips.m20(v-else) 暂无信息
      .card.p-total-info(v-loading='quotaSummaryLoading')
        .info-title
          .left 时点数据
        .info-list(v-if='JSON.stringify(quotaSummary) !== "{}"')
          .info-item
            .item-title-name
              span 生效中额度（万元）
              el-tooltip(effect="dark" :content="`当前经销商生效中${trusteeship.isTrusteeship ? '厂家赊销' : '仟金顶授信'}总额度，不含临额`" placement="top")
                i.el-icon-warning
            .item-val(:data-amount='quotaSummary.validCreditBalanceAmount') {{quotaSummary.validCreditBalanceAmount | toAmountStr(2, true, true)}}
          .info-item
            .item-title-name
              span 已使用额度（万元）
              el-tooltip(effect="dark" :content="`当前经销商生效中${trusteeship.isTrusteeship ? '厂家赊销' : '仟金顶授信'}总额度中，已使用的部分，不含冻结`" placement="top")
                i.el-icon-warning
            .item-val(:data-amount='quotaSummary.usedCreditBalanceAmount') {{quotaSummary.usedCreditBalanceAmount | toAmountStr(2, true, true)}}
          .info-item
            .item-title-name
              span 未使用额度（万元）
              el-tooltip(effect="dark" :content="`当前经销商生效中${trusteeship.isTrusteeship ? '厂家赊销' : '仟金顶授信'}总额度中，未使用的部分，包含冻结`" placement="top")
                i.el-icon-warning
            .item-val(:data-amount='quotaSummary.unusedCreditBalanceAmount') {{quotaSummary.unusedCreditBalanceAmount | toAmountStr(2, true, true)}}
          .info-item
            .item-title-name
              span 时点额度使用率（%）
              el-tooltip(effect="dark" content="已使用额度（万元）/生效中额度（万元）" placement="top")
                i.el-icon-warning
            .item-val {{quotaSummary.usedRate*100 | toAmountStr(2)}}
        .u-empty-tips.m20(v-else) 暂无信息
    .dealer-litigation-analysis
      .left-chart-area
        Card(title='获得额度-出货转化率' :loading='quotaSummaryLoading')
          .p-mlr-content
            ul.p-funnel-main
              li.u-funnel-item
                .u-funnel-amount {{quotaSummary.totalCreditBalanceDealerCount}}
                .u-funnel-title 累计获得额度经销商
              li.u-funnel-item
                .u-funnel-amount {{quotaSummary.usedCreditBalanceDealerCount}}
                .u-funnel-title 使用额度出货经销商
            ul.p-funnel-arrow-main
              li.u-funnel-arrow-item
                .u-funnel-arrow.u-funnel-arrow-1
                .u-funnel-text(v-if='quotaSummary.totalCreditBalanceDealerCount') 转化率{{(quotaSummary.usedCreditBalanceDealerCount/quotaSummary.totalCreditBalanceDealerCount*100).toFixed(0)}}%
                .u-funnel-text(v-else) -
        Card.mt10(title='额度状态分布' :loading='quotaSummaryLoading' noWrap)
          .u-quotaVerb-pie-main
            Pie(id='quotaVerbPie' :data='quotaVerbPieData' title='额度状态分布' :config='{size: 200}')
          .u-quotaVerb-legend
            .u-legend-item
              .u-legend-icon.using
              .u-legend-doc
                .u-legend-num-text {{quotaSummary.usingCreditBalanceDealerCount}}
                .u-legend-name 生效经销商数
            .u-legend-item
              .u-legend-icon.invalid
              .u-legend-doc
                .u-legend-num-text {{quotaSummary.invalidCreditBalanceDealerCount}}
                .u-legend-name 失效经销商数
      .right-map-area
        Card(title='各区域生效中额度分布' :loading='quotaSummaryLoading' noWrap height='100%')
          .dealer-involved-area
            .center-area
              .map-area
                Map(:data='mapData' :type='riskAreaType' tooltip='quota')
                .u-tips
                  i.el-icon-info.icon
                  span 注：颜色越深的区域，表示数值越大
            .line-area
              .risk-top-item
                .u-risk-title {{currentProvince | toAreaName}}获得额度 TOP3
                .u-table-block(v-if='topQuotaProvince.length')
                  el-table(:data='topQuotaProvince')
                    el-table-column(prop='dealerName' label='经销商名称')
                    el-table-column(:label='`生效中额度(万元)`' width='140px' align='right')
                      template(slot-scope='scope' :data-amount='scope.row.totalAmount') {{scope.row.totalAmount | toAmountStr(2, true, true)}}
                .u-empty-tips.u-empty-block(v-else) 暂无信息
              .risk-top-item
                .u-risk-title {{currentProvince | toAreaName}}生效中额度使用率 TOP3
                .u-table-block(v-if='topUseRateProvince.length')
                  el-table(:data="topUseRateProvince")
                    el-table-column(prop='dealerName' label='经销商名称')
                    el-table-column(:label='`生效中额度使用率(%)`' width='140px' align='right')
                      template(slot-scope='scope') {{(scope.row.usedRate*100).toFixed(2)}}
                .u-empty-tips.u-empty-block(v-else) 暂无信息
    .p-flex.mt10
      .using-item
        Card(title='生效中额度区间分布' :loading='quotaSummaryLoading')
          .u-pie-main(v-if='quotaSummary.validQuotaDealers')
            .u-caseReason-pie-main
              Pie(id='validQuotaDealers' :data='validQuotaDealersPieData' title='各区间经销商分布' :config='{size: 200}')
            .u-pie-legend-main
              .u-canvas-legend-detail
                .u-canvas-legend-item(v-for='(item, index) in quotaSummary.validQuotaDealers' :class='`item-${index + 1}`')
                  .u-canvas-legend-icon
                  .u-canvas-legend-doc
                    .u-canvas-legend-num-text {{item.count}}
                    .u-canvas-legend-name {{item.item}}
          .u-empty-tips(v-else) 暂无信息
      .using-item
        Card(title='生效中额度使用率' :loading='quotaSummaryLoading' noWrap)
          .u-chart-main.mt10(v-if='quotaSummary.quotaUseRate')
            .u-caseReason-pie-main
              Bar(id='quotaUseRate' :data='quotaUseRateChartData' :config='{ width: 490, height: 250, seriesLabel: "%" }')
          .u-empty-tips.m20(v-else) 暂无信息
</template>
<script>
import { provinceData, provinceShort } from '@/utils/enums'
import Bar from '@/components/dataView/EchartBar'
import Pie from '@/components/dataView/EchartPie'
import Map from '@/components/dataView/EchartMap'
import Card from '@/components/Card'
import SearchSonTenant from '@/components/SearchSonTenant'
import TimeRange from '@/components/TimeRange'
import { mapState, mapActions } from 'vuex'
import ajaxStore from '@/apis'
export default {
  data () {
    return {
      currentProvince: '',
      quotaSummary: {},
      riskAreaType: '1',
      provinceData,
      mapData: [],
      involvedCount: [],
      topQuotaProvince: [],
      topUseRateProvince: [],
      businessTopLoading: false,
      businessTopList: [],
      tenants: '',
      quotaHistory: {
        dealerNum: '',
        totalCreditBalanceAmount: '',
      },
      dimension: {
        type: 1
      },
      riskBasicLoading: false,
      quotaSummaryLoading: false,
      riskAreaLoading: false,
      timeRange: '',
      quotaVerbPieData: [],
      validQuotaDealersPieData: [],
      quotaUseRateChartData: [],
    }
  },
  computed: mapState(['menuData', 'trusteeship']),
  methods: {
    // 选择子公司后触发
    changeTenant(tenants) {
      tenants && (this.tenants = tenants.join(','))
      this.getQuotaSummary(this.tenants)
      this.getQuotaHistory()
    },
    getProvinceTop (i) {
      const quotaSummary = this.quotaSummary
      let quotaResult = false
      let useRateResult = false
      if (i === 0 && quotaSummary.quotaProvinces) {
        this.currentProvince = quotaSummary.quotaProvinces.length ? quotaSummary.quotaProvinces[0].province : ''
      }
      if (quotaSummary.quotaProvinces) {
        for (let i = 0; i < quotaSummary.quotaProvinces.length; i++) {
          if (this.currentProvince === quotaSummary.quotaProvinces[i].province) {
            quotaResult = true
            this.topQuotaProvince = quotaSummary.quotaProvinces[i].details
          }
        }
        for (let i = 0; i < quotaSummary.useRateProvinces.length; i++) {
          if (this.currentProvince === quotaSummary.useRateProvinces[i].province) {
            useRateResult = true
            this.topUseRateProvince = quotaSummary.useRateProvinces[i].details
          }
        }
      }
      if (!quotaResult) {
        this.topQuotaProvince = []
      }
      if (!useRateResult) {
        this.topUseRateProvince = []
      }
    },
    async getTopBusinessList () {
      const params = {
        ...this.dimension
      }
      this.businessTopLoading = true
      const res = await ajaxStore.factoryService.dataView.getBusinessSummary(params)
      this.businessTopLoading = false
      if (res.data && res.data.code === '0') {
        this.businessTopList = res.data.data.solutions
      }
    },
    changeDimension (val) {
      this.dimension = val
      this.getQuotaHistory()
    },
    async getQuotaHistory() {
      const params = {
        queryTime: ''
      }
      if (this.dimension.type === 2) {
        params.queryTime += this.dimension.year
      } else if (this.dimension.type === 3) {
        params.queryTime += this.dimension.month
      }
      this.tenants && (params.tenantIds = this.tenants)
      const res = await ajaxStore.factoryService.dataView.getQuotaHistory(params)
      if (res.data && res.data.code === '0') {
        this.quotaHistory.dealerNum = res.data.data.dealerNum
        this.quotaHistory.totalCreditBalanceAmount = res.data.data.totalCreditBalanceAmount
      }
    },
    async getQuotaSummary (tenants) {
      const data = {}
      tenants && (data.tenantIds = tenants)
      this.quotaSummaryLoading = true
      const res = await ajaxStore.factoryService.dataView.getQuotaSummary(data)
      this.quotaSummaryLoading = false
      if (res.data && res.data.code === '0') {
        // 演示数据 不要删 动之前吱一声
        // res.data.data.totalCreditBalanceAmount = 65400000
        // res.data.data.validCreditBalanceAmount = 51340000
        // res.data.data.usedCreditBalanceAmount = 22854600
        // res.data.data.unusedCreditBalanceAmount = 28485400
        // res.data.data.usedRate = 0.4452
        // res.data.data.totalCreditBalanceDealerCount = 102
        // res.data.data.usedCreditBalanceDealerCount = 82
        // res.data.data.usingCreditBalanceDealerCount = 71
        // res.data.data.invalidCreditBalanceDealerCount = 31
        // res.data.data.validQuotaDealers = [
        //   {quota: '<50万', dealerCount: 18, usageRate: 0, cifCompanyEffectAmount: 0, cif_companyEffectAmountUsing: 0},
        //   {quota: '50万-100万', dealerCount: 22, usageRate: 0, cifCompanyEffectAmount: 0, cif_companyEffectAmountUsing: 0},
        //   {quota: '100万-200万', dealerCount: 16, usageRate: 0, cifCompanyEffectAmount: 0, cif_companyEffectAmountUsing: 0},
        //   {quota: '200万-300万', dealerCount: 10, usageRate: 0, cifCompanyEffectAmount: 0, cif_companyEffectAmountUsing: 0},
        //   {quota: '300万-500万', dealerCount: 3, usageRate: 0, cifCompanyEffectAmount: 0, cif_companyEffectAmountUsing: 0},
        //   {quota: '500万-1000万', dealerCount: 2, usageRate: 0, cifCompanyEffectAmount: 0, cif_companyEffectAmountUsing: 0},
        //   {quota: '>=1000万', dealerCount: 0, usageRate: 0, cifCompanyEffectAmount: 0, cif_companyEffectAmountUsing: 0}
        // ]
        // res.data.data.quotaUseRate = [
        //   { quota: '<50万', usageRate: 0.2171}, { quota: '50万-100万', usageRate: 0.1135},
        //   { quota: '100万-200万', usageRate: 0.1391}, { quota: '200万-300万', usageRate: 0.1382},
        //   { quota: '300万-500万', usageRate: 0.1238}, { quota: '500万-1000万', usageRate: 0.2022},
        //   { quota: '>=1000万', usageRate: 0.0926 }
        // ]
        const quotaSummary = res.data.data
        this.quotaSummary = quotaSummary
        const validQuotaDealers = quotaSummary.validQuotaDealers
        const invalidQuotaDealers = quotaSummary.invalidQuotaDealers
        const quotaUseRate = quotaSummary.quotaUseRate
        const totalProvinces = quotaSummary.totalProvinces || []

        let result = false
        const realData = this.provinceData.map((item) => {
          result = false
          totalProvinces.map((realItem) => {
            if (item.name === realItem.province) {
              result = true
              item.value = realItem.totalAmount
            }
          })
          if (!result) {
            item.value = 0
          }
          return item
        })
        this.provinceData = totalProvinces.length ? realData : provinceData
        this.mapData = this.provinceData.map(item => {
          const newItem = {
            name: provinceShort[item.name],
            value: item.value
          }
          return newItem
        })

        this.getProvinceTop(0)
        if (this.quotaSummary.usingCreditBalanceDealerCount || this.quotaSummary.invalidCreditBalanceDealerCount) {
          this.quotaVerbPieData = [{
            name: '生效经销商数',
            value: this.quotaSummary.usingCreditBalanceDealerCount
          }, {
            name: '失效经销商数',
            value: this.quotaSummary.invalidCreditBalanceDealerCount
          }]
        }
        if (quotaUseRate) {
          this.quotaUseRateChartData = quotaUseRate.map((item, key) => {
            return [item.quota.replace(/>=/, '≥').replace(/万/g, '') + '万', (item.usageRate * 100).toFixed(2)]
          })
        }
        if (validQuotaDealers) {
          let validQuotaDealersAllCount = 0
          validQuotaDealers.map((item) => {
            validQuotaDealersAllCount += item.dealerCount
          })
          if (validQuotaDealersAllCount) {
            this.quotaSummary.validQuotaDealers = validQuotaDealers.map((item) => {
              return {
                item: item.quota,
                count: item.dealerCount,
                cifCompanyEffectAmount: item.cifCompanyEffectAmount,
                cif_companyEffectAmountUsing: item.cif_companyEffectAmountUsing,
                usageRate: item.usageRate,
                percent: item.dealerCount / validQuotaDealersAllCount
              }
            })
            this.validQuotaDealersPieData = this.quotaSummary.validQuotaDealers.map(item => {
              const pieItem = {
                name: item.item,
                value: item.count
              }
              return pieItem
            })
          } else {
            this.quotaSummary.validQuotaDealers = null
          }
        }
        if (invalidQuotaDealers) {
          let invalidQuotaDealersAllCount = 0
          invalidQuotaDealers.map((item) => {
            invalidQuotaDealersAllCount += item.dealerCount
          })
          if (invalidQuotaDealersAllCount) {
            this.quotaSummary.invalidQuotaDealers = invalidQuotaDealers.map((item) => {
              return {
                item: item.quota,
                count: item.dealerCount,
                cifCompanyEffectAmount: item.cifCompanyEffectAmount,
                cif_companyEffectAmountUsing: item.cif_companyEffectAmountUsing,
                usageRate: item.usageRate,
                percent: item.dealerCount / invalidQuotaDealersAllCount
              }
            })
            setTimeout(() => {
            }, 0)
          } else {
            this.quotaSummary.invalidQuotaDealers = null
          }
        }
      }
    },
    ...mapActions(['getUserType']),
  },
  mounted () {
    this.getUserType({ isForce: true })
    this.getQuotaSummary()
    this.getQuotaHistory()
  },
  components: {
    Bar,
    Pie,
    Map,
    Card,
    TimeRange,
    SearchSonTenant
  }
}
</script>
<style lang="stylus" scoped>
.p-m-title
  display flex
  justify-content space-between
  align-items center
  margin-bottom 15px
  .page-title
    margin-right 34px

.page-main
  min-width 1274px
.mt10
  margin-top 10px
.top-count
  display flex
  margin 0 -5px
  .p-total-info
    flex 2 1 800px
    margin 0 5px
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.08)
    background: linear-gradient(219deg, #4989C7 0%, #498CC9 19%, rgba(70, 106, 181, 0.93) 42%, rgba(67, 101, 176, 0.95) 54%, rgba(62, 94, 167, 0.99) 70%, #334D91 100%);
    color #FFF
    padding 10px 20px 20px
    margin-bottom 10px
    line-height 22px
    &.total
      flex 1 1 400px
    .info-title
      height 32px
      display flex
      justify-content space-between
      align-items center
      color #FFF
      position relative
      font-size 16px
      text-indent 7px
      &:before
        content ''
        position absolute
        top 9px
        left 0
        width 3px
        height 14px
        background-color #25becd
        border-radius 2px
    .info-list
      display flex
      font-size 14px
      .info-item
        flex 1 0 auto
        padding 15px 2%
        margin-top 15px
        border-left 1px solid #5386DB
        .item-title-name
          .el-icon-warning
            color #a3b2c2
            font-size 14px
        .item-val
          font-size 28px
          margin-top 15px
      .info-item:first-child
        padding-left 0
        border-left none
.dealer-litigation-analysis
  display flex
  width 100%
  .left-chart-area
    flex 1 0 250px
    margin-right 10px
    .p-mlr-content
      display flex
      justify-content center
      height 190px
      .p-funnel-main
        width 208px
        height 190px
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
          margin-bottom 12px
          &:before, &:after
            content ''
            position absolute
            top 0
            width 0
            height 0
            border-bottom 72px solid #fff
          &:before
            left 0
            border-right 20px solid transparent
          &:after
            right 0
            border-left 20px solid transparent
          &:nth-child(1)
            width 208px
            background: linear-gradient(180deg, rgba(95, 130, 207, 0.7) 0%, rgba(59, 92, 162, 0.7) 100%)
          &:nth-child(2)
            width 164px
            background: linear-gradient(180deg, rgba(95, 130, 207, 0.9) 0%, rgba(59, 92, 162, 0.9) 100%)
          .u-funnel-amount
            margin-bottom 4px
            font-size 20px
            line-height 28px
          .u-funnel-title
            font-size 12px
      .p-funnel-arrow-main
        .u-funnel-arrow-item
          display flex
          margin-top 70px
          align-items center
        .u-funnel-arrow-1
          background url('//cdn.qjdchina.com/static-online/saas/factoryService/qjd/funel3-arrow-1.png') center center no-repeat
          background-size contain
        .u-funnel-arrow
          width 12px
          height 18px
        .u-funnel-text
          margin-left 10px
          font-size 12px
          color #7A869E
    .u-quotaVerb-pie-main
      width 200px
      height 200px
      margin 0 auto
    .u-quotaVerb-legend
      display flex
      justify-content space-around
      padding 20px
      .u-legend-item
        width 120px
        display flex
        align-items center
        justify-content center
        .u-legend-icon
          width 10px
          height 10px
          background #6FCAFA
          margin-right 10px
          &.using
            background-color #3C5DA4
          &.invalid
            background-color #25BECD
        .u-legend-doc
          .u-legend-num-text
            color #494949
            font-size 18px
            font-weight bold
            margin-bottom 3px
          .u-legend-name
            color #9AA6B8
  .right-map-area
    flex 1 0 750px
    .dealer-involved-btn
      padding-right 20px
      text-align center
      >>>.el-radio-button
        margin-left 20px
        .el-radio-button__inner
          color #3C5CA4
          background-color #EFF4FC
          width 100px
          text-indent 0px
          border 1px solid #EFF4FC
          border-radius 4px
      >>>.is-active
        .el-radio-button__inner
          color #FFF
          background-color #3C5DA4
          border-left none
    .dealer-involved-area
      display flex
      height 100%
      .center-area
        flex 1 0 auto
        .map-area
          max-width 600px
          margin 0 auto
          padding 20px
          position relative
          height 100%
          .u-tips
            position absolute
            bottom 34px
            left 0
            width 100%
            text-align center
            color #6D7278
            .icon
              color #FFA86B
      .line-area
        width 360px
        border-left 1px solid #EAEBEE
        .risk-top-item
          padding 25px 25px 10px
          height 50%
          .u-risk-title
            color #494949
            font-size 16px
            margin-bottom 15px
          .u-table-block
            width 100%
          >>>.el-table
            color #494949
            .el-table__row:nth-child(2)
              background-color #EFF4FC
        .risk-top-item:last-child
          border-top 1px solid #EAEBEE
.u-pie-main
  display flex
  min-width 504px
  .u-caseReason-pie-main
    width 200px
    display flex
    flex-direction column
    justify-content center
    margin-right 20px
  .u-pie-legend-main
    background #F8F9FA
    flex 1 0 auto
    padding 20px
    padding-left 30px
    .u-canvas-legend-detail
      height 240px
      display flex
      flex-direction column
      justify-content space-around
      flex-wrap wrap
      .u-canvas-legend-item
        width 120px
        display flex
        align-items center
        height 60px
        .u-canvas-legend-name
          color #7A869E
          font-size 12px
        .u-canvas-legend-icon
          width 10px
          height 10px
          background #6FCAFA
          margin-right 10px
        &.item-1
          .u-canvas-legend-icon
            background-color #3C5DA4
        &.item-2
          .u-canvas-legend-icon
            background-color #25BECD
        &.item-3
          .u-canvas-legend-icon
            background-color #376BD7
        &.item-4
          .u-canvas-legend-icon
            background-color #56E5DA
        &.item-5
          .u-canvas-legend-icon
            background-color #5480DE
        &.item-6
          .u-canvas-legend-icon
            background-color #C2F1D8
        &.item-7
          .u-canvas-legend-icon
            background-color #82A7F3
.using-item
  flex 1 0 200px
  display flex
  flex-direction column
  &:last-child
    margin-left 10px
>>>.card
  flex 1 0 auto
  display flex
  flex-direction column
  .card-content
    flex 1 0 auto
.p-flex
  display flex
.u-empty-block
  height 154px
.m20
  margin 20px
</style>
