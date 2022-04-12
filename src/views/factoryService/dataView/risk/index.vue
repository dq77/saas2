<template lang="pug">
  .page-main
    .p-total-info(v-loading='riskBasicLoading')
      .info-title 累计异常数据分析
      .info-list(v-if='riskBasic.exceptionInfo')
        .info-item
          .item-title-name
            span 累计异常金额（万元）
            el-tooltip(effect="dark" content="在客户池的用户，累计产生的异常总额（货款+服务费），包含已支付金额和待支付金额" placement="top")
              i.el-icon-warning
          .item-val(:data-amount='riskBasic.exceptionInfo.exceptionAmount') {{riskBasic.exceptionInfo.exceptionAmount | toAmountStr(2, true, true)}}
        .info-item
          .item-title-name
            span 累计异常经销商数（个）
            el-tooltip(effect="dark" content="在客户池的用户，累计产生异常金额的总经销商数（去重）" placement="top")
              i.el-icon-warning
          .item-val {{riskBasic.exceptionInfo.exceptionDealerCount}}
        .info-item
          .item-title-name
            span 累计异常次数（次）
            el-tooltip(effect="dark" content="在客户池的用户，累计产生异常金额的次数（一笔订单下多次异常只取一次）" placement="top")
              i.el-icon-warning
          .item-val {{riskBasic.exceptionInfo.exceptionCount}}
        .info-item
          .item-title-name
            span 当前异常金额（万元）
            el-tooltip(effect="dark" content="在客户池的用户，累计产生的待支付异常总额（货款+服务费）" placement="top")
              i.el-icon-warning
          .item-val(:data-amount='riskBasic.exceptionInfo.curExceptionAmount') {{riskBasic.exceptionInfo.curExceptionAmount | toAmountStr(2, true, true)}}
        .info-item
          .item-title-name
            span 当前异常经销商数（个）
            el-tooltip(effect="dark" content="在客户池的用户，累计产生待还异常金额的总经销商数（去重）" placement="top")
              i.el-icon-warning
          .item-val {{riskBasic.exceptionInfo.curExceptionCount}}
      .u-empty-tips(v-else) 暂无信息
    .p-unusual-area
      Card.unusual-card(title='异常金额分布(万元)' :loading='riskBasicLoading' width='300px')
        .u-unusual-money(v-if='riskBasic.exceptionInfo.loanAbnormalAmount+riskBasic.exceptionInfo.interestAbnormalAmount !== 0')
          .u-canvas-exceptionAmountPie
            Pie(v-if='!riskBasicLoading' id='exceptionAmountPie' :data='exceptionAmountPieData' title='异常金额分布' :config='{size: 150}')
            //- canvas#exceptionAmountPie
          .u-canvas-unusual-tip
            .u-canvas-legend-item.item-1
              .u-canvas-legend-icon
              .u-canvas-legend-doc
                .u-canvas-legend-num-text {{riskBasic.exceptionInfo.loanAbnormalAmount | toAmountStr(2, true, true)}}
                .u-canvas-legend-name 货款异常金额
            .u-canvas-legend-item.item-2
              .u-canvas-legend-icon
              .u-canvas-legend-doc
                .u-canvas-legend-num-text {{riskBasic.exceptionInfo.interestAbnormalAmount | toAmountStr(2, true, true)}}
                .u-canvas-legend-name 服务费异常金额
        .u-empty-tips(v-else) 暂无信息
      Card.unusual-card(title='各区域异常金额TOP5(万元)' :loading='riskBasicLoading' width='300px')
        .u-risk-area-chart-main(v-if='riskBasic.provincesChartData && riskBasic.provincesChartData.length')
          Bar(id='provincesChart' :data='riskBasic.provincesChartData || []' :config='{ width: 324, height: 218 }')
        .u-empty-tips(v-else) 暂无信息
      Card.unusual-card(title='经销商异常金额TOP5(万元)' :loading='riskBasicLoading' width='300px')
        .u-dealers-list(v-if='riskBasic.dealers && riskBasic.dealers.length')
          .u-dealers-item(v-for='(item, index) in riskBasic.dealers')
            .u-dealers-left
              .u-dealers-icon(:class='"num" + index') {{ index + 1 }}
              .u-dealers-name {{item.name}}
            .u-dealers-amount {{item.value | toAmountStr(2, true, true)}}
        .u-empty-tips(v-else) 暂无信息
    .page-title 风险数据概览
    .p-public-sentiment-nav
      .p-nav-item(@click='goTo("judicialLitigation")')
        .nav-content
          .p-nav-num {{consensusStatistics.sfssTotalCount || 0}}
          .p-nav-title 司法诉讼案件总数
          .p-nav-title (个)
      .p-nav-item(@click='goTo("executee")')
        .nav-content
          .p-nav-num {{consensusStatistics.bzxrTotalCount || 0}}
          .p-nav-title 被执行人案件总数
          .p-nav-title (个)
      .p-nav-item(@click='goTo("breakPromise")')
        .nav-content
          .p-nav-num {{consensusStatistics.sxTotalCount || 0}}
          .p-nav-title 失信被执行人案件总数
          .p-nav-title (个)
      .p-nav-item(@click='goTo("heightLimit")')
        .nav-content
          .p-nav-num {{consensusStatistics.xgTotalCount || 0}}
          .p-nav-title 限制高消费案件总数
          .p-nav-title (个)
      .p-nav-item(@click='goTo("abnormalOperation")')
        .nav-content
          .p-nav-num {{consensusStatistics.jyycTotalCount || 0}}
          .p-nav-title 经营异常案件总数
          .p-nav-title (个)
      .p-nav-item(@click='goTo("chattelMortgage")')
        .nav-content
          .p-nav-num {{consensusStatistics.dcdyTotalCount || 0}}
          .p-nav-title 动产抵押案件总数
          .p-nav-title (个)
      .p-nav-item(@click='goTo("administrativeSanction")')
        .nav-content
          .p-nav-num {{consensusStatistics.xzcfTotalCount || 0}}
          .p-nav-title 行政处罚案件总数
          .p-nav-title (个)
    Card.mt10(title='经销商被执行人情况分析' v-if='consensusStatistics.bzxrTotalCount || consensusStatistics.bzxrDealerCount || consensusStatistics.bzxrTotalAmount || riskTop.zxAreaTopData.length || (riskTop.zxDealerTop && riskTop.zxDealerTop.length)')
      .p-summary
        .p-summary-item
          .p-summary-detail
            .p-summary-item-title 被执行案件总数(个)
            .p-summary-item-num {{consensusStatistics.bzxrTotalCount}}
          img.p-summary-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/compony-case-1.png`")
        .p-summary-item
          .p-summary-detail
            .p-summary-item-title 被执行经销商总数(个)
            .p-summary-item-num {{consensusStatistics.bzxrDealerCount}}
          img.p-summary-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/compony-case-2.png`")
        .p-summary-item
          .p-summary-detail
            .p-summary-item-title 被执行总金额(万元)
            .p-summary-item-num {{consensusStatistics.bzxrTotalAmount | toAmountStr(2, true, true)}}
          img.p-summary-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/compony-case-3.png`")
      .dealer-executed
        .u-executed-detail
          .executed-title 各区域被执行案件数TOP5(次)
          .u-risk-area-chart-main(v-if='riskTop.zxAreaTopData.length')
            Bar(id='executeeProvincesChart' :data='riskTop.zxAreaTopData' :config='{ width: 470, height: 180 }')
          .u-empty-tips(v-else) 暂无信息
        .u-executed-detail
          .executed-title 经销商被执行金额TOP5(万元)
          .u-module-content(v-if='riskTop.zxDealerTop && riskTop.zxDealerTop.length')
            .u-executed-list
              .u-executed-item(v-for='(item, index) in riskTop.zxDealerTop' :class='"num" + index')
                .u-executed-left
                  .u-executed-icon {{ index + 1 }}
                  .u-executed-name {{item.name}}
                .u-executed-amount {{item.value | toAmountStr(2, true, true)}}
          .u-empty-tips(v-else) 暂无信息
    Card.mt10(title='经销商失信被执行情况分析' v-if='consensusStatistics.sxTotalCount || consensusStatistics.sxDealerCount || consensusStatistics.sxTotalAmount || consensusStatistics.sxDealerRate')
      .p-summary
        .p-summary-item
          .p-summary-detail
            .p-summary-item-title 失信案件总数(个)
            .p-summary-item-num {{consensusStatistics.sxTotalCount}}
          img.p-summary-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/compony-sx-1.png`")
        .p-summary-item
          .p-summary-detail
            .p-summary-item-title 失信经销商总数(个)
            .p-summary-item-num {{consensusStatistics.sxDealerCount}}
          img.p-summary-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/compony-sx-2.png`")
        .p-summary-item
          .p-summary-detail
            .p-summary-item-title 失信总金额(万元)
            .p-summary-item-num {{consensusStatistics.sxTotalAmount | toAmountStr(2, true, true)}}
          img.p-summary-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/compony-sx-3.png`")
        .p-summary-item
          .p-summary-detail
            .p-summary-item-title 失信经销商占比
            .p-summary-item-num {{consensusStatistics.sxDealerRate ? ((consensusStatistics.sxDealerRate*100).toFixed(2)+'%') : ''}}
          img.p-summary-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/compony-sx-4.png`")
      .dealer-executed
        .u-executed-detail
          .executed-title 失信经销商履行金额占比(万元)
          .u-unusual-money(v-if='consensusStatistics.sxPerformedPart+consensusStatistics.sxUnperformedPart !== 0')
            .u-canvas-exceptionAmountPie
              Pie(id='breakPromiseAmountPie' :data='breakPromiseAmountPieData' title='预算金额分布' :config='{size: 150}')
            .u-canvas-unusual-tip
              .u-canvas-legend-item.item-1
                .u-canvas-legend-icon
                .u-canvas-legend-doc
                  .u-canvas-legend-num-text {{consensusStatistics.sxPerformedPart | toAmountStr(2, true, true)}}
                  .u-canvas-legend-name 已履行金额
              .u-canvas-legend-item.item-2
                .u-canvas-legend-icon
                .u-canvas-legend-doc
                  .u-canvas-legend-num-text {{consensusStatistics.sxUnperformedPart | toAmountStr(2, true, true)}}
                  .u-canvas-legend-name 未履行金额
          .u-empty-tips(v-else) 暂无信息
        .u-executed-detail
          .executed-title 各区域失信案件数TOP5(次)
          .u-risk-area-chart-main(v-if='riskTop.sxAreaTopData.length')
            Bar(id='breakPromiseProvincesChart' :data='riskTop.sxAreaTopData' :config='{ width: 300, height: 180 }')
          .u-empty-tips(v-else) 暂无信息
        .u-executed-detail
          .executed-title 经销商失信金额TOP5(万元)
          .u-dealers-list(v-if='riskTop.sxDealerTop && riskTop.sxDealerTop.length')
            .u-dealers-item(v-for='(item, index) in riskTop.sxDealerTop')
              .u-dealers-left
                .u-dealers-icon(:class='"num" + index') {{ index + 1 }}
                .u-dealers-name {{item.name}}
              .u-dealers-amount {{item.value | toAmountStr(2, true, true)}}
          .u-empty-tips(v-else) 暂无信息
    Card.mt10(title='经销商被限制高消费情况分析' v-if='consensusStatistics.xgTotalCount || consensusStatistics.xgDealerCount || consensusStatistics.xgDealerRate || riskTop.xgAreaTopData.length || (riskTop.xgDealerTop && riskTop.xgDealerTop.length)')
      .p-summary
        .p-summary-item
          .p-summary-detail
            .p-summary-item-title 被限制高消费案件总数(个)
            .p-summary-item-num {{consensusStatistics.xgTotalCount}}
          img.p-summary-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/compony-xg-1.png`")
        .p-summary-item
          .p-summary-detail
            .p-summary-item-title 被限制高消费经销商总数(个)
            .p-summary-item-num {{consensusStatistics.xgDealerCount}}
          img.p-summary-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/compony-xg-2.png`")
        .p-summary-item
          .p-summary-detail
            .p-summary-item-title 被限制高消费经销商占比
            .p-summary-item-num {{(consensusStatistics.xgDealerRate*100).toFixed(2)}}%
          img.p-summary-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/compony-xg-3.png`")
      .dealer-executed
        .u-executed-detail
          .executed-title 各区域被限制高消费经销商TOP5(个)
          .u-risk-area-chart-main(v-if='riskTop.xgAreaTopData.length')
            Bar(id='heightLimitProvincesChart' :data='riskTop.xgAreaTopData' :config='{ width: 410, height: 200 }')
          .u-empty-tips(v-else) 暂无信息
        .u-executed-detail
          .executed-title 经销商被限制高消费次数TOP5(次)
          .u-executed-list(v-if='(riskTop.xgDealerTop && riskTop.xgDealerTop.length)')
            .u-executed-item(v-for='(item, index) in riskTop.xgDealerTop' :class='"num" + index')
              .u-executed-left
                .u-executed-icon {{ index + 1 }}
                .u-executed-name {{item.name}}
              .u-executed-amount {{item.value}}
          .u-empty-tips(v-else) 暂无信息
    .page-title 涉诉数据概览
    .p-performance(v-loading='riskBasicLoading')
      .u-block
        img.u-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/total-case-1.png`")
        .u-detail
          .u-number {{riskBasic.dealerCount}}
          .u-label 经销商总数(个)
      .u-block
        img.u-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/total-case-2.png`")
        .u-detail
          .u-number {{consensusStatistics.sfssDealerCount || 0}}
          .u-label 涉诉经销商数(个)
      .u-block
        img.u-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/total-case-3.png`")
        .u-detail
          .u-number {{consensusStatistics.sfssTotalCount || 0}}
          .u-label 案件总数(个)
      .u-block
        img.u-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/total-case-4.png`")
        .u-detail
          .u-number {{riskSummary.accuserCount}}
          .u-label 原告经销商数(个)
      .u-block
        img.u-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/total-case-5.png`")
        .u-detail
          .u-number {{riskSummary.defendantCount}}
          .u-label 被告经销商数(个)
      .u-block
        img.u-icon(:src="`${$assetsBaseUrl}/factoryService/dataView/total-case-6.png`")
        .u-detail
          .u-number {{consensusStatistics.sfssProvinceCount || 0}}
          .u-label 涉诉省份(个)
    .page-title.u-flex-main
      .u-flex-main-text 经销商涉诉情况分析
      .right-picker-area
        el-select(v-model='timeAreaFix' @change='chooseTime' placeholder='统计维度')
          el-option(label='本月' :value='1')
          el-option(label='最近三个月' :value='2')
          el-option(label='最近六个月' :value='3')
          el-option(label='今年至今' :value='4')
          el-option(label='自定义' :value='5')
        el-date-picker.data-picker(v-model='timeRange' type='daterange' align='right' range-separator='-' start-placeholder='开始日期' end-placeholder='结束日期' :picker-options="pickerOptions" unlink-panels value-format='yyyy-MM-dd' @change='changeTime' @clear='changeTime')
    .dealer-litigation-analysis
      .left-chart-area
        Card(title='经销商原被告分析' :loading='riskSummaryLoading' noWrap)
          .u-unusual-money.involved-count(v-if='involvedCount.length')
            .u-canvas-exceptionAmountPie
              Pie(id='involvedCountPie' :data='involvedCountPieData' title='原被告 分析' :config='{size: 150}')
            .u-canvas-unusual-tip
              .u-canvas-legend-item(v-for='(item, index) in involvedCount' :class='`item-${index + 1}`')
                .u-canvas-legend-icon
                .u-canvas-legend-doc
                  .u-canvas-legend-name {{item.type}}
                    span {{item.value}}个
          .u-empty-tips(v-else) 暂无信息
        Card.mt10(title='关联经销商涉诉情况分析' :loading='riskSummaryLoading')
          template(v-slot:headRight)
            el-radio-group.dealer-involved-btn(v-model='caseReasonType' @change='changeCaseReason')
              el-radio-button(label='1') 原告
              el-radio-button(label='2') 被告
          .u-risk-area-chart(v-if='riskSummary.caseReasonsChartData && riskSummary.caseReasonsChartData.length')
            Bar(id='caseReasonsChart' :data='riskSummary.caseReasonsChartData' :config='{ width: 320, height: 220 }')
          .u-empty-tips.m20(v-else) 暂无信息
      .right-map-area
        Card(title='涉诉经销商地域分布情况' :loading='riskAreaLoading' noWrap height='100%')
          template(v-slot:headRight)
            el-radio-group.dealer-involved-btn(v-model='riskAreaType' @change='getRiskArea')
              el-radio-button(label='1') 经销商数量
              el-radio-button(label='2') 案件数量
          .dealer-involved-area(v-if='topProvince.length')
            .center-area
              .map-area
                Map(:data='mapData' :type='riskAreaType' tooltip='risk')
                .u-tips
                  i.el-icon-info.icon
                  span 注：颜色越深的区域，表示数值越大
            .line-area
              .risk-top-item
                .u-risk-title 涉诉经销商地域分布 TOP5
                .u-top-list(v-if='topProvince.length')
                  .u-top-item(v-for='item in topProvince')
                    .u-top-item-detail
                      .u-top-item-name {{item.type}}
                      .u-top-item-num {{item.value}}
                    .u-top-item-line
                      .u-top-item-line-bar(:style='getPercentage(item.width)')
                .u-empty-tips(v-else) 暂无信息
              .risk-top-item
                .u-risk-title 涉诉经销商城市分布 TOP5
                .u-top-list(v-if='topCity.length')
                  .u-top-item(v-for='item in topCity')
                    .u-top-item-detail
                      .u-top-item-name {{item.type}}
                      .u-top-item-num {{item.value}}
                    .u-top-item-line
                      .u-top-item-line-bar.green(:style='getPercentage(item.width)')
                .u-empty-tips(v-else) 暂无信息
          .u-empty-tips(v-else) 暂无信息

</template>
<script>
import ajaxStore from '@/apis'
import { provinceData, provinceShort } from '@/utils/enums'
import { getCurrentMonthFirst, toAreaName, toAmountStr, toDateStr } from '@/utils/util'
import { mapState } from 'vuex'
import Bar from '@/components/dataView/EchartBar'
import Pie from '@/components/dataView/EchartPie'
import Map from '@/components/dataView/EchartMap'
import Card from '@/components/Card'
export default {
  data () {
    return {
      riskBasic: {
        accuserDealerCount: '',
        caseCount: '',
        dealerCount: '',
        defendantDealerCount: '',
        provinceCount: '',
        riskDealerCount: '',
        exceptionInfo: '',
        provincesChartData: [],
        caseReasonsChartData: [],
        dealers: []
      },
      exceptionAmountPieData: [],
      breakPromiseAmountPieData: [],
      involvedCountPieData: [],
      riskSummary: {},
      riskAreaType: '1',
      caseReasonType: '1',
      provinceData,
      mapData: [],
      involvedCount: [],
      topProvince: [],
      topCity: [],
      timeAreaFix: 5,
      riskBasicLoading: false,
      riskSummaryLoading: false,
      riskAreaLoading: false,
      timeRange: '',
      involvedCountPie: '',
      classOption: {
        autoPlay: false,
        switchSingleStep: 140
      },
      riskTop: {
        zxAreaTopData: [],
        sxAreaTopData: [],
        xgAreaTopData: [],
        sxDealerTop: [],
        xgDealerTop: [],
        zxDealerTop: [],
      },
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now()
        }
      },
    }
  },
  computed: mapState(['consensusStatistics']),
  methods: {
    goTo(name) {
      this.$router.push({
        name: 'riskRadar',
        query: {tab: name}
      })
    },
    setColor (color) {
      return {
        color
      }
    },
    getPercentage(num) {
      return {
        width: `${num}%`
      }
    },
    async getRiskBasic () {
      this.riskBasicLoading = true
      const res = await ajaxStore.factoryService.dataView.getRiskBasic()
      if (res.data && res.data.code === '0') {
        this.exceptionAmountPieData = [{
          name: '货款异常金额',
          value: toAmountStr(res.data.data.exceptionInfo.loanAbnormalAmount, 2, true, true, false)
        }, {
          name: '服务费异常金额',
          value: toAmountStr(res.data.data.exceptionInfo.interestAbnormalAmount, 2, true, true, false)
        }]
        this.riskBasic = res.data.data
        this.riskBasic.provincesChartData = this.riskBasic.provinces?.map((item, key) => {
          return [toAreaName(item.name), toAmountStr(item.value, 2, true, true)]
        }) ?? []
        this.fillChart(this.riskBasic.provincesChartData)
      }
      this.riskBasicLoading = false
    },
    // 数据不足五根柱子时，右侧填补空数据
    fillChart(data) {
      if (data.length && data.length < 5) {
        for (let i = data.length; i < 5; i++) {
          data.push(['-', ''])
        }
      }
    },
    async changeCaseReason(type) {
      const list = type === '1' ? this.riskSummary.accusers : this.riskSummary.defendants
      const newList = list.map((item, key) => {
        // 文案太长，X轴不够显示
        if (item.firstCaseReason === '侵权责任纠纷') {
          item.firstCaseReason = '侵权纠纷'
        }
        if (item.firstCaseReason === '保全、执行') {
          item.firstCaseReason = '保全执行'
        }
        item.firstCaseReason = item.firstCaseReason ? item.firstCaseReason.replace(/纠纷/, '') : '未分类'
        return [item.firstCaseReason, item.count]
      })
      this.fillChart(newList)
      this.$set(this.riskSummary, 'caseReasonsChartData', newList)
    },
    async getRiskArea (type) {
      this.riskAreaLoading = true
      const startTime = this.timeRange && this.timeRange.length ? this.timeRange[0] : ''
      const endTime = this.timeRange && this.timeRange.length ? this.timeRange[1] : ''
      const res = await ajaxStore.factoryService.dataView.getRiskArea({
        startTime,
        endTime,
        type: type || this.riskAreaType
      })
      setTimeout(() => {
        this.riskAreaLoading = false
      }, 100)
      if (res.data && res.data.code === '0') {
        let result = false
        const realData = this.provinceData.map((item) => {
          result = false
          res.data.data.provinces.map((realItem) => {
            if (item.name.indexOf(realItem.name) > -1) {
              result = true
              item.value = realItem.value
            }
          })
          if (!result) {
            item.value = 0
          }
          return item
        })
        const typeName = this.riskAreaType === '1' ? '经销商数量' : '案件数量'
        this.provinceData = res.data.data.provinces.length ? realData : provinceData
        this.mapData = this.provinceData.map(item => {
          const newItem = {
            name: provinceShort[item.name],
            value: item.value
          }
          return newItem
        })
        res.data.data.provinces.map((item, index) => {
          res.data.data.provinces[index].type = item.name
          res.data.data.provinces[index].width = (item.value / res.data.data.provinces[0].value) * 100
          res.data.data.provinces[index][typeName] = item.value
        })
        res.data.data.citys.map((item, index) => {
          res.data.data.citys[index].type = item.name
          res.data.data.citys[index].width = (item.value / res.data.data.citys[0].value) * 100
          res.data.data.citys[index][typeName] = item.value
        })
        this.topProvince = res.data.data.provinces.slice(0, 5)
        this.topCity = res.data.data.citys.slice(0, 5)
      }
    },
    async getRiskSummary () {
      this.riskSummaryLoading = true
      const startTime = this.timeRange && this.timeRange.length ? this.timeRange[0] : ''
      const endTime = this.timeRange && this.timeRange.length ? this.timeRange[1] : ''
      const res = await ajaxStore.factoryService.dataView.getRiskSummary({
        startTime,
        endTime,
        type: this.riskAreaType
      })
      this.riskSummaryLoading = false
      if (res.data && res.data.code === '0') {
        const riskSummary = res.data.data
        this.riskSummary = riskSummary
        this.riskSummary.caseReasons.reverse()
        this.changeCaseReason('1') // 默认原告
        const allCount = riskSummary.defendantCount + riskSummary.accuserCount
        if (allCount) {
          this.involvedCount = [
            { name: '', type: '原告', value: riskSummary.accuserCount, percent: riskSummary.defendantCount / allCount },
            { name: '', type: '被告', value: riskSummary.defendantCount, percent: riskSummary.accuserCount / allCount }
          ]
          this.involvedCountPieData = [{
            name: '原告',
            value: riskSummary.accuserCount
          }, {
            name: '被告',
            value: riskSummary.defendantCount
          }]
        } else {
          this.involvedCount = []
        }
      }
    },
    async getRiskTop() {
      const res = await ajaxStore.factoryService.dataView.getRiskTop()
      if (res.data && res.data.code === '0') {
        const riskTop = res.data.data
        riskTop.zxAreaTopData = riskTop.zxAreaTop?.map((item, key) => {
          return [toAreaName(item.name), item.value]
        }) ?? []
        this.fillChart(riskTop.zxAreaTopData)
        riskTop.sxAreaTopData = riskTop.sxAreaTop?.map((item, key) => {
          return [toAreaName(item.name), item.value]
        }) ?? []
        this.fillChart(riskTop.sxAreaTopData)
        riskTop.xgAreaTopData = riskTop.xgAreaTop?.map((item, key) => {
          return [toAreaName(item.name), item.value]
        }) ?? []
        this.fillChart(riskTop.xgAreaTopData)
        this.riskTop = riskTop
      }
    },
    chooseTime(type) {
      let start = new Date()
      switch (type) {
        case 1:
          start = new Date(getCurrentMonthFirst(start))
          break
        case 2: {
          start.setMonth(start.getMonth() - 3)
          break
        }
        case 3: {
          start.setMonth(start.getMonth() - 6)
          break
        }
        case 4: {
          start = new Date(start.getFullYear(), 0)
          break
        }
        default:
          break
      }
      this.timeRange = [toDateStr(start, 'yyyy-MM-dd'), toDateStr(new Date(), 'yyyy-MM-dd')]
      this.getRiskSummary()
      this.getRiskArea()
    },
    changeTime(e) {
      if (!e) {
        this.timeRange = []
      }
      this.timeAreaFix = 5
      this.getRiskSummary()
      this.getRiskArea()
    },
    async getConsensusStatistics() {
      await this.$store.dispatch('getConsensusStatistics')
      this.breakPromiseAmountPieData = [{
        name: '已履行金额',
        value: toAmountStr(this.consensusStatistics.sxPerformedPart, 2, true, true)
      }, {
        name: '未履行金额',
        value: toAmountStr(this.consensusStatistics.sxUnperformedPart, 2, true, true)
      }]
    }
  },
  mounted () {
    this.getConsensusStatistics()
    this.getRiskBasic()
    this.getRiskSummary()
    this.getRiskArea()
    this.getRiskTop()
  },
  components: {
    Bar,
    Pie,
    Map,
    Card
  }
}
</script>
<style lang="stylus" scoped>
.page-main
  min-width 1208px
  padding-bottom: 20px
.mt10
  margin-top 10px
.p-total-info
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.08)
  background: linear-gradient(219deg, #4989C7 0%, #498CC9 19%, rgba(70, 106, 181, 0.93) 42%, rgba(67, 101, 176, 0.95) 54%, rgba(62, 94, 167, 0.99) 70%, #334D91 100%);
  color #FFF
  padding 15px 20px 20px
  margin-bottom 10px
  line-height 22px
  .info-title
    color #FFF
    position relative
    font-size 16px
    text-indent 7px
    &:before
      content ''
      position absolute
      top 4px
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
      padding 15px 30px
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
.p-unusual-area
  display flex
  .unusual-card
    flex 1 0 auto
    margin-right 10px
  .unusual-card:last-child
    margin-right 0
.u-dealers-list
  .u-dealers-item
    display flex
    justify-content space-between
    color #494949
    margin-bottom 26px
    .u-dealers-left
      display flex
      align-items center
      .u-dealers-icon
        margin-right 10px
        font-size 14px
        color #9AA6B8
        &.num0
          color #F25754
        &.num1
          color #F29354
        &.num2
          color #F2C154
      .u-dealers-name
        line-height 15px
        max-width 197px
        white-space nowrap
        overflow hidden
        display block
        text-overflow ellipsis
        word-break break-all
.u-unusual-money
  height 190px
  display flex
  .u-canvas-exceptionAmountPie
    flex 1 0 190px
    display flex
    justify-content center
    align-items center
  .u-canvas-unusual-tip
    flex 1 1 auto
    align-items center
    display flex
    flex-direction column
    justify-content space-around
  &.involved-count
    margin-top 30px
.u-canvas-legend-item
  width 120px
  display flex
  align-items center
  .u-canvas-legend-icon
    width 10px
    height 10px
    background #6FCAFA
    margin-right 10px
  .u-canvas-legend-doc
    .u-canvas-legend-num-text
      color #494949
      font-size 18px
      font-weight bold
      margin-bottom 3px
    .u-canvas-legend-name
      color #9AA6B8
      span
        margin-left 5px
  &.item-1
    .u-canvas-legend-icon
      background-color #3C5DA4
    .u-canvas-legend-name
      span
        color #3C5DA4
  &.item-2
    .u-canvas-legend-icon
      background-color #25BECD
    .u-canvas-legend-name
      span
        color #25BECD
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
.page-title
  padding 30px 0 20px
.m20
  margin 20px
.p-public-sentiment-nav
  display flex
  background #fff
  justify-content space-between
  margin-bottom 10px
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.05)
  text-align center
  .p-nav-item
    cursor pointer
    width 100px
    flex 1 0 auto
    padding 38px 0
    .nav-content
      border-right 1px solid #EAEBEE
      .p-nav-num
        font-size 26px
        color #383B42
        font-weight bold
        margin-bottom 14px
      .p-nav-title
        color #9AA6B8
        line-height 20px
  .p-nav-item:last-child
    .nav-content
      border-right none
  .p-nav-item:hover
    transition: all .2s ease
    background-color #25BECD
    .nav-content
      border-right 1px solid #25BECD
      .p-nav-num, .p-nav-title
        color #fff
.p-summary
  display flex
  margin-bottom 20px
  .p-summary-item
    background #F8F9FA
    flex 1 0 auto
    padding 20px 30px 20px 20px
    display flex
    align-items center
    justify-content space-between
    margin-right 8px
    color #494949
    .p-summary-detail
      .p-summary-item-title
        font-size 12px
        margin-bottom 6px
      .p-summary-item-num
        font-size 20px
        font-weight bold
    .p-summary-icon
      width 80px
      height 60px
  .p-summary-item:last-child
    margin-right 0
.dealer-executed
  display flex
  border 1px solid #EAEBEE
  .u-executed-detail
    border-right 1px solid #EAEBEE
    width 300px
    flex 1 0 auto
    padding 20px
    .executed-title
      font-size 14px
      color #494949
      margin-bottom 20px
    .u-executed-list
      .u-executed-item
        display flex
        justify-content space-between
        padding 11px
        margin-bottom 3px
        .u-executed-left
          display flex
          align-items center
          .u-executed-icon
            margin-right 10px
            font-size 14px
            color #9AA6B8
          .u-executed-name
            line-height 15px
            max-width 197px
            white-space nowrap
            overflow hidden
            display block
            text-overflow ellipsis
            word-break break-all
        &.num0
          background: linear-gradient(270deg, #FFFFFF 0%, #CFD7E9 100%)
          .u-executed-icon
            color #F25754
        &.num1
          background: linear-gradient(270deg, #FFFFFF 0%, #ECEFF6 100%)
          .u-executed-icon
            color #F29354
        &.num2
          background: linear-gradient(270deg, #FFFFFF 0%, #F8F9FC 100%)
          .u-executed-icon
            color #F2C154

  .u-executed-detail:last-child
    border-right none
.dealer-litigation-analysis
  display flex
  padding-bottom: 20px
  .left-chart-area
    flex 1 0 300px
    display flex
    flex-direction column
    >>>.card
      flex 1 0 100px
      display flex
      flex-direction column
      .card-content
        flex 1 0 auto
    margin-right 10px
  .dealer-involved-btn
    padding-right 20px
    text-align center
    >>>.el-radio-button
      margin-left 10px
      .el-radio-button__inner
        color #3C5CA4
        background-color #EFF4FC
        min-width 76px
        text-indent 0px
        border 1px solid #EFF4FC
        border-radius 4px
    >>>.is-active
      .el-radio-button__inner
        color #FFF
        background-color #3C5DA4
        border-left none
  .right-map-area
    flex 2 0 600px
    .dealer-involved-area
      display flex
      .center-area
        flex 2 0 400px
        border-right 1px solid #EAEBEE
        .map-area
          width 80%
          min-width 400px
          padding 20px
          position relative
          height 520px
          margin 0 auto
          .u-tips
            position absolute
            bottom 50px
            left 0
            width 100%
            text-align center
            color #6D7278
            .icon
              color #FFA86B
      .line-area
        flex 1 0 auto
        .risk-top-item
          padding 25px 25px 10px
          .u-risk-title
            color #494949
            font-size 16px
          .u-top-list
            margin 20px 0
            .u-top-item
              color #9AA6B8
              margin-bottom 15px
              .u-top-item-detail
                display flex
                justify-content space-between
                width 100%
                margin-bottom 2px
              .u-top-item-line
                height 8px
                border-radius 4px
                background #EFF4FC
                position relative
                .u-top-item-line-bar
                  background #3C5DA4
                  width 80%
                  height 8px
                  border-radius 4px
                  position absolute
                  left 0
                  top 0
                  &.green
                    background #25BECD
        .risk-top-item:last-child
          border-top 1px solid #EAEBEE
.p-performance
  display flex
  background #fff
  padding 0 20px
  .u-block
    padding 23px 0 19px
    border-bottom 5px solid #FFF
    flex 1 0 100px
    display flex
    align-items center
    justify-content center
    .u-icon
      height 28px
      width 28px
      margin-right 10px
    .u-detail
      .u-number
        margin-bottom 4px
        font-size 24px
        color #383B42
      .u-label
        color #7A869E
        font-size 12px
  .u-block:hover
    border-bottom 5px solid #25BECD
    transition: all .2s ease
.u-flex-main
  display flex
  justify-content space-between
  .u-flex-main-text
    padding-top 4px
  .right-picker-area
    >>>.el-select
      width 120px
  .data-picker
    margin-left 10px
.p-pie-flex
  display flex
  flex-wrap wrap
  margin 5px -5px -5px
  .pie-item
    width: 50%
    padding 5px

.u-empty-tips
  display flex
  justify-content center
  align-items center
  color #738a9e
  min-height 100px
  width 100%
</style>
