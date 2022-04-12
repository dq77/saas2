<template lang="pug">
el-scrollbar(style="widht: 100%; height: 100%")
  .p-report-bg
    .p-page-1(v-loading='loading')
      .p-header
        .p-logo
        .p-report-title 仟金顶开发商评估报告
      .p-company-name {{baseInfo.name}}
      .p-block
        .p-flex
          .p-module.p-shadow-left
            el-table.p-report-table.p-summary-table(
              :data='reportData'
            )
              el-table-column(prop='module' label='模块' width='170')
                span(slot-scope='{row}' v-html='row.module')
              el-table-column(prop='expression' label='整体表现' width='190')
                span(slot-scope='{row}' v-html='row.expression')
              el-table-column(prop='unscrambleContent' label='总结/解读' width='495')
                span(slot-scope='{row}' v-html='row.unscrambleContent')
          .p-module.p-shadow-right
            .p-grade-title 评级释义
            el-table.p-report-table(
              :data='gradeData[type]'
              stripe
            )
              el-table-column(prop='grade' label='评级' width='50')
              el-table-column(prop='performance' label='综合表现' width='110')
              el-table-column(prop='number' label='分数区间' width='90')
    .p-page-2(v-loading='loading')
      .p-block-title 基本信息
      .p-block
        .p-flex
          .p-module.p-shadow-left.p-module-blue
            .p-module-title
              i.p-module-title-icon
              span {{baseInfo.name}}
            .p-base-info-content
              .p-base-info-content-item
                .p-content-item-label 经营开始时间
                .p-content-item-value
                  span(v-if='baseInfo.fromTime') {{baseInfo.fromTime}}
                  span(v-else) -
              .p-base-info-content-item
                .p-content-item-label 注册资本
                .p-content-item-value
                  span(v-if='baseInfo.regCapital') {{baseInfo.regCapital}}
                  span(v-else) -
              .p-base-info-content-item
                .p-content-item-label 实缴资本
                .p-content-item-value
                  span(v-if='baseInfo.actualCapital') {{baseInfo.actualCapital}}
                  span(v-else) -
              .p-base-info-content-item
                .p-content-item-label 股东结构
                .p-content-item-value
                  span 见下
              .p-base-info-content-item
                .p-content-item-label 2020年年度企业排名
                .p-content-item-value
                  span(v-if='baseInfo.rank') {{baseInfo.rank}}
                  span(v-else) -
              .p-base-info-content-item
                .p-content-item-label 剔除预收款后的资产负债率
                .p-content-item-value
                  span(v-if='threeRedLine.ebtratioaftereliminatedepositreceived') {{threeRedLine.showEbtratioaftereliminatedepositreceived.toFixed(2)}}%
                  span(v-else) -
              .p-base-info-content-item
                .p-content-item-label 净负债率
                .p-content-item-value
                  span(v-if='threeRedLine.netDebtRatio') {{threeRedLine.showNetDebtRatio.toFixed(2)}}%
                  span(v-else) -
              .p-base-info-content-item
                .p-content-item-label 现金短债比
                .p-content-item-value
                  span(v-if='threeRedLine.cashFlowsCoverageRatio') {{threeRedLine.cashFlowsCoverageRatio.toFixed(2)}}
                  span(v-else) -
          .p-module.p-shadow-right.p-threeredline
            .p-module-title.p-theme-black
              i.p-module-title-icon
              span 三条红线标准
            .p-module-content.p-threeredline-content
              .p-standard-item
                .p-standard-title
                  .u-tip
                    span 净负债率
                .p-standard-bar
                  .p-standard-line-left
                  .p-standard-line-right
                  .p-point(:style='`left:${threeRedLine.netDebtRatioPosition-1}%`' :class='!threeRedLine.netDebtRatioOverHalf ? "p-blue" : "p-red"')
                  span.p-standard-tips(:style='`left:${threeRedLine.netDebtRatioPosition-5.2}%`' :class='!threeRedLine.netDebtRatioOverHalf ? "p-blue" : ""') {{threeRedLine.showNetDebtRatio.toFixed(2)}}%
                .p-standard-label
                  .p-label-left.p-blue 良好
                  .p-label-center 100%
                  .p-label-right.p-red 差
              .p-standard-item
                .p-standard-title
                  .u-tip 剔除预收款后的资产负债率
                .p-standard-bar
                  .p-standard-line-left
                  .p-standard-line-right
                  .p-point(:style='`left:${threeRedLine.ebtratioaftereliminatedepositreceivedPosition-1}%`' :class='!threeRedLine.ebtratioaftereliminatedepositreceivedOverHalf ? "p-blue" : "p-red"')
                  span.p-standard-tips(:style='`left:${threeRedLine.ebtratioaftereliminatedepositreceivedPosition-5.2}%`' :class='!threeRedLine.ebtratioaftereliminatedepositreceivedOverHalf ? "p-blue" : ""') {{threeRedLine.showEbtratioaftereliminatedepositreceived.toFixed(2)}}%
                .p-standard-label
                  .p-label-left.p-blue 良好
                  .p-label-center 70%
                  .p-label-right.p-red 差
              .p-standard-item
                .p-standard-title
                  .u-tip 现金短债比
                .p-standard-bar
                  .p-standard-line-left.p-red
                  .p-standard-line-right.p-blue
                  .p-point(:style='`left:${threeRedLine.cashFlowsCoverageRatioPosition-1}%`' :class='threeRedLine.cashFlowsCoverageRatioOverHalf ? "p-blue" : "p-red"')
                  span.p-standard-tips(:style='`left:${threeRedLine.cashFlowsCoverageRatioPosition-5.2}%`' :class='threeRedLine.cashFlowsCoverageRatioOverHalf ? "p-blue" : ""') {{threeRedLine.cashFlowsCoverageRatio.toFixed(2)}}
                .p-standard-label
                  .p-label-left.p-red 差
                  .p-label-center.p-center-adjust 1
                  .p-label-right.p-blue 良好
        .p-module.p-shadow-top
          el-table.p-report-table(
            :data='gdjgData'
            stripe
          )
            el-table-column(prop='name' label='股东及出资信息' width='460')
            el-table-column(label='持股比例' width='300')
              template(slot-scope='{row}')
                span(v-if='row.capital.length') {{row.capital[0].percent}}
                span(v-else) -
            el-table-column(prop='amomon' label='持股金额' width='400')
              template(slot-scope='{row}')
                span(v-if='row.capital.length') {{row.capital[0].amomon}}
                span(v-else) -
    .p-page-3(v-loading='loading')
      .p-block-title 业务分析
      .p-block
        .p-module.p-module-blue.p-module-top
          .p-module-title
            i.p-module-title-icon
            span 销售数据/拿地数据
          .p-module-content
            .p-table.p-transparent(v-if='saleData.tableHeader.length > 1')
              el-table(ref="saleTable" :data='saleData.tableList' v-loading='loading' :fit='true')
                el-table-column(v-for='(item, key) in saleData.tableHeader' :key='key' :prop='item.property' :width='item.width' :min-width='item.minWidth' :align='item.align' :header-align='item.headerAlign')
                  template(slot='header' slot-scope='{column, $index}')
                    span(v-if='typeof $scopedSlots[item.thSlotName] !== "function"') {{item.name}}
                    slot(v-else :name='item.thSlotName' :scope='{column, $index}')
            .u-empty-tips.p-empty-dark(v-else) 暂无公开数据
        .p-flex.p-module-project
          .p-module.p-shadow-left.p-module-half
            .p-module-title.p-theme-black
              i.p-module-title-icon
              span 销售金额/拿地金额趋势
            .p-module-content
              #saleMoneyChart(v-if='saleData.source.length')
              .u-empty-tips(v-else) 暂无公开数据
          .p-module.p-shadow-right.p-module-half
            .p-module-title.p-theme-black
              i.p-module-title-icon
              span 销售面积/拿地面积趋势
            .p-module-content
              #saleAreaChart(v-if='saleData.source.length')
              .u-empty-tips(v-else) 暂无公开数据
        .p-module.p-shadow-top
          .p-module-title-center 项目数据
          .p-module-content
            #projectChart(v-if='projectData.length')
            .u-empty-tips(v-else) 暂无公开数据
    .p-page-4(v-loading='loading')
      .p-block-title 财务分析
      .p-block
        .p-module.p-shadow-bottom
          .p-module-content
            .p-table(v-if='financeData.tableHeader.length > 1')
              el-table.p-report-table(ref="financeTable" :data='financeData.tableList' v-loading='loading' :fit='true')
                el-table-column(v-for='(item, key) in financeData.tableHeader' :key='key' :prop='item.property' :width='item.width' :min-width='item.minWidth' :align='item.align' :header-align='item.headerAlign')
                  template(slot='header' slot-scope='{column, $index}')
                    span(v-if='typeof $scopedSlots[item.thSlotName] !== "function"') {{item.name}}
                    slot(v-else :name='item.thSlotName' :scope='{column, $index}')
            .u-empty-tips(v-else) 暂无公开数据
        .p-flex.p-module-project
          .p-module.p-shadow-left.p-module-half
            .p-module-title.p-theme-black
              i.p-module-title-icon
              span 盈利能力
            .p-module-content
              #profitabilityChart(v-if='financeData.chartData.gmjlr.join("") || financeData.chartData.jll.join("")')
              .u-empty-tips(v-else) 暂无公开数据
          .p-module.p-shadow-right.p-module-half
            .p-module-title.p-theme-black
              i.p-module-title-icon
              span 财务情况
            .p-module-content
              #efficiencyChart(v-if='financeData.chartData.ldbl.join("") || financeData.chartData.sdbl.join("") || financeData.chartData.zcfzl.join("")')
              .u-empty-tips(v-else) 暂无公开数据
    .p-page-5(v-loading='loading')
      .p-block-title 企业风险
      .p-block
        .p-module.p-shadow-bottom.p-modult-margin-bottom
          .p-module-title-center 司法风险
          .p-module-content.p-flex
            .p-module.p-module-blue.p-module-risk
              .p-base-info-content
                .p-base-info-content-item
                  .p-content-item-label 司法诉讼案件数
                  .p-content-item-value.p-number-align {{riskDistributionSummary.sfssTotalCount}}
                .p-base-info-content-item
                  .p-content-item-label 涉案金额（元）
                  .p-content-item-value.p-number-align {{riskDistributionSummary.lawCaseAmount}}
                .p-base-info-content-item
                  .p-content-item-label 原告
                  .p-content-item-value.p-number-align {{riskDistributionSummary.plaintiffCount}}
                .p-base-info-content-item
                  .p-content-item-label 被告
                  .p-content-item-value.p-number-align {{riskDistributionSummary.defendantCount}}
                .p-base-info-content-item
                  .p-content-item-label 动产抵押
                  .p-content-item-value.p-number-align {{riskDistributionSummary.dcdyTotalCount}}
                .p-base-info-content-item
                  .p-content-item-label 失信
                  .p-content-item-value.p-number-align {{riskDistributionSummary.sxTotalCount}}
                .p-base-info-content-item
                  .p-content-item-label 限制高消费
                  .p-content-item-value.p-number-align {{riskDistributionSummary.xgTotalCount}}
                .p-base-info-content-item
                  .p-content-item-label 行政处罚
                  .p-content-item-value.p-number-align {{riskDistributionSummary.xzcfTotalCount}}
                .p-base-info-content-item
                  .p-content-item-label 被执行人
                  .p-content-item-value.p-number-align {{riskDistributionSummary.bzxrTotalCount}}
            .p-risk-module
              .p-risk-module-title 司法诉讼地区分布
              #regionalDistribution(v-if='riskDistribution.area.length')
              .u-empty-tips(v-else) 暂无公开数据
            .p-risk-module
              .p-risk-module-title 案由分布
              #causeDistribution(v-if='riskDistribution.reason.length')
              .u-empty-tips(v-else) 暂无公开数据
          .p-module-content.p-flex
            .p-risk-module.p-appeal-module
              .p-risk-module-title 原告被告
              #plaintiffDefendant(v-if='riskDistributionSummary.defendantCount+riskDistributionSummary.plaintiffCount !== 0')
              .u-empty-tips(v-else) 暂无公开数据
            .p-risk-module
              .p-risk-module-title 涉案数量
              #nearOneYearRegional(v-if='riskDistribution.month.length')
              .u-empty-tips(v-else) 暂无公开数据
            .p-risk-module
              .p-risk-module-title 年度涉案数量
              #yearRegional(v-if='riskDistribution.year.length')
              .u-empty-tips(v-else) 暂无公开数据
        .p-module.p-shadow-top
          .p-module-title-center 2021年舆情风险
          .p-module-content
            el-table.p-report-table(
              :data='publicSentimentData'
            )
              el-table-column(prop='sentimentType' label='正负面' width='90')
                span(slot-scope='{row}')
                  span(v-if='row.sentimentType === 0') 中性
                  span(v-else-if='row.sentimentType === 1') 正面
                  span(v-else-if='row.sentimentType === -1') 负面
              el-table-column(prop='title' label='逾期概要' width='485')
              el-table-column(prop='source' label='舆情来源' width='110')
              el-table-column(prop='publishTime' label='产生时间' width='100')
              el-table-column(prop='webSite' label='舆情链接' width='375')
                a.p-link(slot-scope='{row}' :href='row.webSite' target='_blank') {{row.webSite}}

</template>

<script>
import { toAreaName, toAmountStr, toDateStr } from '@/utils/util'
import { gradeData } from './config'
export default {
  props: {
    detail: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      reportData: [
      ],
      type: 'stockMarket',
      gradeData,
      baseInfo: {},
      threeRedLine: {
        ebtratioaftereliminatedepositreceived: 0, // 剔除预收款后的资产负债率
        cashFlowsCoverageRatio: 0, // 现金短债比
        netDebtRatio: 0, // 净负债率
        netDebtRatioOverHalf: false,
        cashFlowsCoverageRatioOverHalf: false,
        ebtratioaftereliminatedepositreceivedOverHalf: false,
        netDebtRatioLeft: 0,
        netDebtRatioRight: 0,
        cashFlowsCoverageRatioLeft: 0,
        cashFlowsCoverageRatioRight: 0,
        ebtratioaftereliminatedepositreceivedLeft: 0,
        ebtratioaftereliminatedepositreceivedRight: 0,
        showNetDebtRatio: 0,
        showEbtratioaftereliminatedepositreceived: 0,
        netDebtRatioPosition: 0,
        ebtratioaftereliminatedepositreceivedPosition: 0,
        cashFlowsCoverageRatioPosition: 0
      },
      gdjgData: [],
      saleData: {
        tableHeader: [
        ],
        tableList: [
        ],
        source: {}
      },
      projectData: [

      ],
      financeData: {
        tableHeader: [
        ],
        tableList: [
        ],
        source: {},
        chartData: {
          gmjlr: [],
          jll: [],
          chzzts: [],
          zzczzy: [],
          jyxjlyysr: [],
          sdbl: [],
          ldbl: [],
          lxbs: [],
          zcfzl: []
        }
      },
      riskDistributionSummary: {
        bzxrTotalCount: 0,
        dcdyTotalCount: 0,
        defendantRate: 0,
        lawCaseAmount: 0,
        plaintiffRate: 0,
        sfssTotalCount: 0,
        sxTotalCount: 0,
        xgTotalCount: 0,
        xzcfTotalCount: 0,
        defendantCount: 0,
        plaintiffCount: 0
      },
      riskDistribution: {
        area: [],
        month: [],
        reason: [],
        year: []
      },
      publicSentimentData: []
    }
  },
  mounted () {
  },
  watch: {
    detail(newValue) {
      this.handleDetailData()
    },
  },
  methods: {
    toAmountStr,
    toDateStr,
    handleDetailData() {
      this.getGradeData()
      this.reportData = this.detail.unscramble
      this.getType()
      this.getBaseInfo()
      this.getThreeRedLine()
      this.gdjgData = this.detail.holder
      this.getSaleLand()
      this.getProjectSummary()
      this.getFinanceSummary()
      this.getRiskDistribution()
      this.getRiskDistributionSummary()
      this.getPublicSentiment()
    },
    getGradeData(publishTime) {
      const time = publishTime || toDateStr(this.detail.createTime, 'yyyy-MM-dd')
      const grade = this.gradeData.filter((item) => {
        return new Date(item.publishTime).getTime() > new Date(time).getTime()
      })[0]
      this.gradeData = grade.data
    },
    getType() {
      this.type = this.detail.initUnscramble.stockMarket === 'true' ? 'stockMarket' : 'unStockMarket'
    },
    getBaseInfo() {
      const { name, fromTime, regCapital, actualCapital, rank } = this.detail.baseInfo
      this.baseInfo = {
        name,
        fromTime: toDateStr(fromTime, 'yyyy-MM-dd'),
        regCapital,
        actualCapital,
        rank
      }
    },
    getThreeRedLine() {
      const { ebtratioaftereliminatedepositreceived, cashFlowsCoverageRatio, netDebtRatio } = this.detail.threeRedLine
      this.threeRedLine = {
        ebtratioaftereliminatedepositreceived: parseFloat(ebtratioaftereliminatedepositreceived),
        ebtratioaftereliminatedepositreceivedOverHalf: ebtratioaftereliminatedepositreceived > 0.7,
        ebtratioaftereliminatedepositreceivedLeft: ebtratioaftereliminatedepositreceived > 0.7 ? 50 : (parseFloat(ebtratioaftereliminatedepositreceived) * 100 / 1.4).toFixed(2),
        ebtratioaftereliminatedepositreceivedRight: ebtratioaftereliminatedepositreceived >= 0.7 ? (parseFloat(ebtratioaftereliminatedepositreceived - 0.7 > 0.7 ? 0.7 : ebtratioaftereliminatedepositreceived - 0.7) * 100 / 1.4).toFixed(2) : 0,
        showEbtratioaftereliminatedepositreceived: parseFloat(ebtratioaftereliminatedepositreceived * 100),
        cashFlowsCoverageRatio: cashFlowsCoverageRatio ? parseFloat(cashFlowsCoverageRatio) : 0,
        cashFlowsCoverageRatioOverHalf: cashFlowsCoverageRatio > 1,
        cashFlowsCoverageRatioLeft: cashFlowsCoverageRatio > 1 ? 50 : (parseFloat(cashFlowsCoverageRatio) * 100 / 2).toFixed(2),
        cashFlowsCoverageRatioRight: cashFlowsCoverageRatio >= 1 ? (parseFloat(cashFlowsCoverageRatio - 1 > 1 ? 1 : cashFlowsCoverageRatio - 1) * 100 / 2).toFixed(2) : 0,
        showCashFlowsCoverageRatio: cashFlowsCoverageRatio,
        netDebtRatio: parseFloat(netDebtRatio),
        netDebtRatioOverHalf: netDebtRatio > 1,
        netDebtRatioLeft: netDebtRatio > 1 ? 50 : (parseFloat(netDebtRatio) * 100 / 2).toFixed(2),
        netDebtRatioRight: netDebtRatio >= 1 ? (parseFloat(netDebtRatio - 1 > 1 ? 1 : netDebtRatio - 1) * 100 / 2).toFixed(2) : 0,
        showNetDebtRatio: parseFloat(netDebtRatio * 100),
      }
      this.threeRedLine.netDebtRatioPosition = parseFloat(this.threeRedLine.netDebtRatioLeft) + parseFloat(this.threeRedLine.netDebtRatioRight)
      this.threeRedLine.ebtratioaftereliminatedepositreceivedPosition = parseFloat(this.threeRedLine.ebtratioaftereliminatedepositreceivedLeft) + parseFloat(this.threeRedLine.ebtratioaftereliminatedepositreceivedRight)
      this.threeRedLine.cashFlowsCoverageRatioPosition = parseFloat(this.threeRedLine.cashFlowsCoverageRatioLeft) + parseFloat(this.threeRedLine.cashFlowsCoverageRatioRight)
    },
    getSaleLand() {
      const saleData = []
      this.detail.saleLand.map((item) => {
        saleData[item.rankYear] = {
          sellMoney: item.sellMoney || '-',
          sellArea: item.sellArea || '-',
          acquireMoney: item.acquireMoney || '-',
          acquireArea: item.acquireArea || '-'
        }
      })
      this.saleData.source = saleData
      this.getSaleData()
    },
    getSaleData () {
      const saleData = this.saleData.source
      const legend = ['销售金额（亿元）', '拿地金额（亿元）']
      const xData = []
      const yData = [
        {
          name: '销售金额（亿元）',
          data: [],
          type: 'bar',
          symbolSize: 5,
          label: {
            show: true,
            position: 'top'
          },
        },
        {
          name: '拿地金额（亿元）',
          data: [],
          type: 'line',
          symbolSize: 5,
          label: {
            show: true,
            position: 'top'
          },
        },
      ]
      const legend2 = ['销售面积（万平方米）', '拿地面积（万平方米）']
      const yData2 = [
        {
          name: '销售面积（万平方米）',
          data: [],
          type: 'bar',
          symbolSize: 5,
          label: {
            show: true,
            position: 'top'
          },
        },
        {
          name: '拿地面积（万平方米）',
          data: [],
          type: 'line',
          symbolSize: 5,
          label: {
            show: true,
            position: 'top'
          },
        },
      ]
      const tableHeader = [
        {
          name: '销售/拿地',
          property: 'title',
          width: '160'
        }
      ]
      const tableList = [
        {
          title: '销售金额（亿元）'
        },
        {
          title: '销售面积（万平方米）'
        },
        {
          title: '拿地金额（亿元）'
        },
        {
          title: '拿地面积（万平方米）'
        },
      ]
      for (const key in saleData) {
        tableHeader.push(
          { name: `${key}年`, property: `data${key}`, align: 'right' }
        )
        tableList[0][`data${key}`] = saleData[key].sellMoney
        tableList[1][`data${key}`] = saleData[key].sellArea
        tableList[2][`data${key}`] = saleData[key].acquireMoney
        tableList[3][`data${key}`] = saleData[key].acquireArea
        xData.push(key)
        yData[0].data.push(saleData[key].sellMoney)
        yData[1].data.push(saleData[key].acquireMoney)
        yData2[0].data.push(saleData[key].sellArea)
        yData2[1].data.push(saleData[key].acquireArea)
      }
      this.saleData = {
        tableHeader,
        tableList,
        source: saleData
      }
      if (saleData.length) {
        setTimeout(() => {
          this.initSaleChart('saleMoneyChart', xData, yData, legend)
          this.initSaleChart('saleAreaChart', xData, yData2, legend2)
        }, 0)
      }
    },
    initSaleChart(dom, xData, yData, legend) {
      const myChart = this.$echarts.init(document.getElementById(dom), null, { renderer: 'svg' })
      const option = {
        color: ['#3C5CA4', '#23BCCA'],
        legend: {
          data: legend,
        },
        barWidth: 16,
        grid: {
          top: '15%',
          bottom: '10%',
          left: '10%',
          right: '0'
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: xData,
          textStyle: {
            color: '#778CA2'
          }
        },
        yAxis: {
          type: 'value',
          splitLine: { // 网格线
            lineStyle: {
              type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
            },
            show: true // 隐藏或显示
          }
        },
        series: yData
      }

      option && myChart.setOption(option)
    },
    getProjectSummary() {
      const projectData = []
      this.detail.projectStatistics.map((item) => {
        projectData.push({
          name: item.province,
          value: item.num
        })
      })
      this.projectData = projectData
      this.getProjectData()
    },
    getProjectData() {
      const xData = []
      const yData = []
      this.projectData.map((item) => {
        xData.push(toAreaName(item.name))
        yData.push(item.value)
      })
      if (this.projectData.length) {
        setTimeout(() => {
          this.initProjectChart('projectChart', xData, yData)
        }, 0)
      }
    },
    initProjectChart(dom, xData, yData) {
      const myChart = this.$echarts.init(document.getElementById(dom), null, { renderer: 'svg' })
      const option = {
        color: ['#3C5CA4'],
        legend: {
          data: ['项目个数']
        },
        barWidth: 10,
        grid: {
          top: '10%',
          bottom: '10%',
          left: '4%',
          right: '0',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisLabel: {
            interval: 0,
            // rotate: 15,
            textStyle: {
              color: '#778CA2',
              fontSize: 12
            }
          },
        },
        yAxis: {
          type: 'value',
          splitLine: { // 网格线
            lineStyle: {
              type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
            },
            show: true // 隐藏或显示
          }
        },
        series: [{
          name: '项目个数',
          data: yData,
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          },
        }]
      }

      option && myChart.setOption(option)
    },
    getFinanceSummary() {
      const financeData = []
      this.detail.finance.map((item) => {
        financeData[parseInt(item.reportDate)] = {
          gmjlr: toAmountStr(item.gmjlr, 2),
          gsjlrtbzz: toAmountStr(item.gsjlrtbzz, 2),
          jll: toAmountStr(item.jll, 2),
          chzzts: toAmountStr(item.chzzts, 2),
          zzczzy: toAmountStr(item.zzczzy, 2),
          jyxjlyysr: toAmountStr(item.jyxjlyysr, 2),
          sdbl: toAmountStr(item.sdbl, 2),
          zcfzl: toAmountStr(item.zcfzl, 2),
          ldbl: toAmountStr(item.ldbl, 2),
          lxbs: toAmountStr(item.lxbs, 2)
        }
      })
      this.financeData.source = financeData
      this.getFinanceData()
      this.getFinanceDetail()
    },
    getFinanceData () {
      const financeData = this.financeData.source
      const tableHeader = [
        {
          name: '关键财务数据',
          property: 'title',
          width: '190'
        }
      ]
      const tableList = [
        {
          title: '归母净利润（亿元）'
        },
        {
          title: '归母净利润同比增长（%）'
        },
        {
          title: '净利率（%）'
        },
        {
          title: '存货周转天数（天）'
        },
        {
          title: '总资产周转率（次）'
        },
        {
          title: '销售现金比'
        },
        {
          title: '速动比率'
        },
        {
          title: '资产负债率（%）'
        },
        {
          title: '流动比率'
        },
        {
          title: '利息倍数'
        },
      ]
      for (const key in financeData) {
        tableHeader.push(
          { name: `${key}年`, property: `data${key}`, align: 'right' }
        )
        tableList[0][`data${key}`] = financeData[key].gmjlr || '-'
        tableList[1][`data${key}`] = financeData[key].gsjlrtbzz || '-'
        tableList[2][`data${key}`] = financeData[key].jll || '-'
        tableList[3][`data${key}`] = financeData[key].chzzts || '-'
        tableList[4][`data${key}`] = financeData[key].zzczzy || '-'
        tableList[5][`data${key}`] = financeData[key].jyxjlyysr || '-'
        tableList[6][`data${key}`] = financeData[key].sdbl || '-'
        tableList[7][`data${key}`] = financeData[key].zcfzl || '-'
        tableList[8][`data${key}`] = financeData[key].ldbl || '-'
        tableList[9][`data${key}`] = financeData[key].lxbs || '-'
      }
      this.financeData = {
        tableHeader,
        tableList,
        source: financeData
      }
    },
    getFinanceDetail() {
      const financeData = this.financeData.source
      const yearList = []
      const chartData = {
        gmjlr: [],
        jll: [],
        chzzts: [],
        zzczzy: [],
        jyxjlyysr: [],
        sdbl: [],
        ldbl: [],
        lxbs: [],
        zcfzl: [],
      }
      for (const key in financeData) {
        yearList.push(key)
        chartData.gmjlr.push(financeData[key].gmjlr)
        chartData.jll.push(financeData[key].jll)
        chartData.chzzts.push(financeData[key].chzzts)
        chartData.zzczzy.push(financeData[key].zzczzy)
        chartData.jyxjlyysr.push(financeData[key].jyxjlyysr)
        chartData.sdbl.push(financeData[key].sdbl)
        chartData.ldbl.push(financeData[key].ldbl)
        chartData.lxbs.push(financeData[key].lxbs)
        chartData.zcfzl.push(financeData[key].zcfzl)
      }
      this.financeData.chartData = chartData
      setTimeout(() => {
        if (chartData.gmjlr.join('') || chartData.jll.join('')) {
          this.initFinanceDetailChart('profitabilityChart', yearList,
            [
              {
                name: '归母净利润（亿元）',
                data: chartData.gmjlr,
                type: 'bar',
                label: {
                  show: true,
                  position: 'top'
                },
              },
              {
                name: '净利率（%）',
                data: chartData.jll,
                type: 'line',
                yAxisIndex: 1,
                symbolSize: 5,
                label: {
                  show: true,
                  position: 'top'
                },
              }
            ], ['归母净利润（亿元）', '净利率（%）'])
        }
        if (chartData.ldbl.join('') || chartData.sdbl.join('') || chartData.zcfzl.join('')) {
          this.initFinanceDetailChart('efficiencyChart', yearList,
            [
              {
                name: '流动比率',
                data: chartData.ldbl,
                type: 'bar',
                label: {
                  show: true,
                  position: 'top'
                },
              },
              {
                name: '速动比率',
                data: chartData.sdbl,
                type: 'line',
                yAxisIndex: 1,
                symbolSize: 5,
                label: {
                  show: true,
                  position: 'top'
                },
              },
              {
                name: '资产负债率(%)',
                data: chartData.zcfzl,
                type: 'line',
                yAxisIndex: 1,
                symbolSize: 5,
                label: {
                  show: true,
                  position: 'bottom',
                },
              }
            ], ['流动比率', '速动比率', '资产负债率(%)'])
        }
      }, 0)
    },
    initFinanceDetailChart(dom, xData, yData, legend) {
      const myChart = this.$echarts.init(document.getElementById(dom), null, { renderer: 'svg' })
      const option = {
        color: ['#3C5CA4', '#23BCCA', '#E29A27'],
        legend: {
          data: legend,
        },
        barWidth: 25,
        grid: {
          top: '20%',
          bottom: '10%',
          left: '12%',
          right: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: xData,
        },
        yAxis: [
          {
            name: legend[0],
            type: 'value',
            splitLine: { // 网格线
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true // 隐藏或显示
            }
          },
          {
            name: legend[1],
            type: 'value',
            splitLine: { // 网格线
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: false // 隐藏或显示
            }
          }
        ],
        series: yData
      }

      option && myChart.setOption(option)
    },
    getRiskDistribution() {
      this.riskDistribution = this.detail.riskDistribution
      setTimeout(() => {
        this.initRegionalDistribution()
        this.initCauseDistribution()
        this.initNearOneYearRegional()
        this.initYearRegional()
      }, 0)
    },
    initRegionalDistribution() {
      const {area} = this.riskDistribution
      const xData = []
      const yData = []
      area.reverse()
      area.map((item) => {
        xData.push(toAreaName(item.keyName))
        yData.push(item.value)
      })
      this.initRegionalDistributionChart('regionalDistribution', xData, [
        {
          data: yData,
          type: 'bar',
          label: {
            show: true,
            position: 'right'
          },
        }
      ])
    },
    initCauseDistribution() {
      const {reason} = this.riskDistribution
      const xData = []
      const yData = []
      reason.map((item) => {
        xData.push(toAreaName(item.keyName))
        yData.push(item.value)
      })
      this.initBarChart('causeDistribution', xData, [
        {
          data: yData,
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          },
        }
      ])
    },
    initNearOneYearRegional() {
      const {month} = this.riskDistribution
      const xData = []
      const yData = []
      month.map((item) => {
        xData.push(toAreaName(item.keyName))
        yData.push(item.value)
      })
      this.initBarChart('nearOneYearRegional', xData, [
        {
          data: yData,
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          },
        }
      ])
    },
    initYearRegional() {
      const {year} = this.riskDistribution
      const xData = []
      const yData = []
      year.map((item) => {
        xData.push(toAreaName(item.keyName))
        yData.push(item.value)
      })
      this.initBarChart('yearRegional', xData, [
        {
          data: yData,
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          },
        }
      ])
    },
    getRiskDistributionSummary() {
      const { defendantCount, plaintiffCount } = this.detail.dataGeneralization
      const all = defendantCount + plaintiffCount
      this.detail.dataGeneralization.defendantRate = all ? defendantCount / all : 0
      this.detail.dataGeneralization.plaintiffRate = all ? plaintiffCount / all : 0
      this.riskDistributionSummary = this.detail.dataGeneralization
      setTimeout(() => {
        this.initPlaintiffDefendantChart('plaintiffDefendant', [
          {
            name: '原告',
            value: this.detail.dataGeneralization.plaintiffCount
          },
          {
            name: '被告',
            value: this.detail.dataGeneralization.defendantCount
          }
        ])
      }, 0)
    },
    initPlaintiffDefendantChart(dom, data) {
      if (document.getElementById(dom)) {
        const myChart = this.$echarts.init(document.getElementById(dom), null, { renderer: 'svg' })
        const option = {
          color: ['#3C5CA4', '#23BCCA'],
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            right: 'right'
          },
          series: [
            {
              name: '案由分布',
              type: 'pie',
              radius: '90%',
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 0,
                borderColor: '#F5F7FD',
                borderWidth: 3,
                normal: {
                  label: {
                    show: true,
                    position: 'inner',
                    fontSize: 14,
                    color: '#fff',
                    // formatter: '{b} : {c} ({d}%)' //带当前图例名 + 百分比
                    formatter: '{d}%' // 只要百分比
                  },
                  labelLine: {show: false}
                }
              },
              labelLine: {
                show: false
              },
              data
            }
          ]
        }

        option && myChart.setOption(option)
      }
    },
    initBarChart(dom, xData, yData) {
      if (document.getElementById(dom)) {
        const myChart = this.$echarts.init(document.getElementById(dom), null, { renderer: 'svg' })
        const option = {
          color: ['#3C5CA4'],
          barWidth: 16,
          grid: {
            top: '5%',
            bottom: '0',
            left: '0',
            right: '0',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: xData,
            axisLabel: {
              interval: 0,
              rotate: xData[0].length > 5 ? 20 : 0,
              textStyle: {
                color: '#778CA2',
                fontSize: xData[0].length > 5 ? 10 : 12
              }
            },
          },
          yAxis: [
            {
              type: 'value',
              splitLine: { // 网格线
                lineStyle: {
                  type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
                },
                show: true // 隐藏或显示
              }
            }
          ],
          series: yData
        }

        option && myChart.setOption(option)
      }
    },
    initRegionalDistributionChart(dom, xData, yData) {
      const myChart = this.$echarts.init(document.getElementById(dom), null, { renderer: 'svg' })
      const option = {
        color: ['#3C5CA4'],
        barWidth: 16,
        grid: {
          top: '0',
          bottom: '0',
          left: '0',
          right: '5%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: [
          {
            type: 'value',
            splitLine: { // 网格线
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true // 隐藏或显示
            }
          }
        ],
        yAxis: {
          type: 'category',
          data: xData,
          axisLabel: {
            interval: 0,
            // rotate: 15,
          },
        },
        series: yData
      }

      option && myChart.setOption(option)
    },
    initCaseDistribution() {

    },
    getRiskSummary() {
      if (document.getElementById('regionalDistribution')) {
        this.$echarts.dispose(document.getElementById('regionalDistribution'))
        const {area} = this.riskDistribution
        // let data
        const xData = []
        const yData = []

        area.map((item) => {
          xData.push(toAreaName(item.keyName))
          yData.push(item.value)
        })
        this.initJudicialRiskChart('regionalDistribution', xData, [
          {
            data: yData,
            type: 'bar'
          }
        ])

        // data = []
        // reason.map((item) => {
        //   data.push(
        //     {
        //       name: item.keyName,
        //       value: item.value
        //     }
        //   )
        // })
        // this.initCaseDistribution('causeDistribution', data)

        // month.map((item) => {
        //   xData.push(item.keyName)
        //   yData.push(item.value)
        // })
        // this.initJudicialRiskChart('nearOneYearRegional', xData, [
        //   {
        //     data: yData,
        //     type: 'bar'
        //   }
        // ])

        // year.map((item) => {
        //   xData.push(item.keyName)
        //   yData.push(item.value)
        // })
        // this.initJudicialRiskChart('yearRegional', xData, [
        //   {
        //     data: yData,
        //     type: 'bar'
        //   }
        // ])

        // data = [
        //   {
        //     name: '原告',
        //     value: plaintiffCount
        //   },
        //   {
        //     name: '被告',
        //     value: defendantCount
        //   }
        // ]
        // this.initCaseDistribution('plaintiffDefendant', data)
      }
    },
    initJudicialRiskChart(dom, xData, yData) {
      const myChart = this.$echarts.init(document.getElementById(dom), null, { renderer: 'svg' })
      const option = {
        color: ['#5B7EEE'],
        barWidth: 25,
        grid: {
          top: '20%',
          bottom: '10%',
          left: '12%',
          right: '0'
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisLabel: {
            interval: 0,
            // rotate: 15,
            textStyle: {
              color: '#778CA2',
              fontSize: 10
            }
          },
        },
        yAxis: [
          {
            type: 'value',
            splitLine: { // 网格线
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true // 隐藏或显示
            }
          }
        ],
        series: yData
      }

      option && myChart.setOption(option)
    },
    getPublicSentiment() {
      this.publicSentimentData = this.detail.sentiment
    },
  },
}
</script>
<style lang="stylus">
.p-transparent .el-table thead th,
.p-transparent .el-table thead tr
  background #3c5ca4
  color #fff
  font-size 14px
  font-weight normal
.p-transparent .el-table tbody th,
.p-transparent .el-table tbody tr
  background #3c5ca4
  font-size 14px
  color #778CA2
  color #fff
.p-transparent .el-table tbody tr:hover,
.p-transparent .el-table--enable-row-hover .el-table__body tr:hover>td
  background #3c5ca4
  color #fff
.p-transparent .el-table td,
.p-transparent .el-table th.is-leaf
  border-bottom 1px dashed #8da8d6
.p-transparent .el-table--border::after,
.p-transparent .el-table--group::after,
.p-transparent .el-table::before
  background: none
.p-transparent .el-table__body-wrapper
  border none
.p-report-table.el-table thead th,
.p-report-table.el-table thead tr
  background #3C5CA4
  color #fff
  font-size 14px
.p-report-table.el-table tbody th,
.p-report-table.el-table tbody tr
  font-size 14px
  color #778CA2
.el-table--striped .el-table__body tr.el-table__row--striped td
  background #F6F9FE
.p-summary-table.el-table tbody .cell
  color #252631
.p-summary-table.el-table tbody .cell p
  margin 0
</style>
<style lang="stylus" scoped>
.page-main
  margin 0
  background #3B3B3B
.p-flex
  display flex
  justify-content space-between
  margin-bottom 15px
.p-report-bg
  margin 0 auto
  padding 0 40px 100px 40px
  background url('//cdn.qjdchina.com/static-online/saas/customerGuard/report-bg.jpg') no-repeat #27345E
  background-size contain
  width 1280px
  min-height 100vh
.p-header
  display flex
  justify-content space-between
  padding 45px 0 38px 0
.p-logo
  width 160px
  height 30px
  background url('//cdn.qjdchina.com/static-online/saas/customerGuard/report-logo.png') no-repeat
  background-size cover
.p-report-title
  font-size 20px
  color #fff
.p-company-name
  font-size 60px
  font-weight bold
  color #fff
  text-align center
  text-shadow 2px 3px 7px #013487
  margin-bottom 72px
.p-block
  margin 0  0 40px 0
  border-radius 6px
  background #F5F7FD
.p-shadow-left
  box-shadow 3px 0 3px #E6E6E6
.p-shadow-right
  box-shadow -3px 0 3px #E6E6E6
.p-shadow-top
  box-shadow 0 -3px 3px #E6E6E6
.p-shadow-bottom
  box-shadow 0 3px 3px #E6E6E6
.p-module
  border-radius 6px
  background #fff
  padding 30px 20px
.p-grade-title
  color #252631
  font-size 20px
  text-align center
  margin-bottom 27px
  font-weight bold
.p-block-title
  font-size 28px
  font-weight bold
  color #fff
  margin-bottom 20px
.p-module-blue
  background #3C5CA4
  width 433px
  box-shadow none
.p-module-title
  color #ffffff
  font-size 20px
  font-weight bold
  display flex
  align-items center
.p-module-title-icon
  background #23BCCA
  margin-right 10px
  width 4px
  height 20px
  border-radius 2px
  display block
.p-module-title
  margin-bottom 52px
.p-base-info-content-item
  font-size 16px
  color #fff
  display flex
  padding 10px 0
  border-bottom 1px dashed #8DA8D6
.p-content-item-label
  width 450px
.p-content-item-value
  width 100%
.p-threeredline
  width 755px
.p-theme-black
  color #252631
.p-standard-item
  margin-bottom 35px
.p-standard-title
  margin-bottom 40px
  font-size 16px
.p-standard-bar
  background #DEE8F6
  width 100%
  height 16px
  position relative
  border-radius 8px
.p-standard-center
  width 2px
  height 24px
  background #3C5CA4
  position absolute
  left 50%
  top -4px
.p-point
  width 15px
  height 15px
  border-radius 50%
  background #3C5CA4
  position absolute
  left 50%
  top 0
  border 2px solid #fff
  box-shadow 0 0 4px #040000
.p-point.p-red
  background #f25754
.p-standard-line-left
  background #3C5CA4
  height 100%
  width 50%
  position absolute
  left 0
  top 0
  border-top-left-radius 8px
  border-bottom-left-radius 8px
.p-standard-line-right
  background #C20000
  height 100%
  width 50%
  position absolute
  left 50%
  top 0
  border-top-right-radius 8px
  border-bottom-right-radius 8px
.p-standard-line-left.p-red
  background #C20000
.p-standard-line-right.p-blue
  background #3C5CA4
.p-standard-tips
  color #fff
  padding 3px 6px
  border-radius 25px
  background #C20000
  position absolute
  left 54%
  top -35px
  font-size 16px
  width 70px
  text-align center
.p-standard-tips.p-blue
  background #3C5CA4
.p-standard-tips:after,
.p-standard-tips:before
  content ""
  border-top solid 3px #C20000
  border-left solid 3px #00800000
  border-right solid 3px #00800000
  border-bottom solid 0px #00800000
  position: absolute
  left 48%
  top 100%
.p-standard-tips.p-blue:after,
.p-standard-tips.p-blue:before
  border-top solid 3px #3C5CA4
.p-standard-label
  color #494949
  display flex
  justify-content space-between
  margin-top 15px
  font-size 14px
  .p-blue
    color #3C5CA4
  .p-red
    color #C20000
.p-threeredline-content
  padding 0 20px
.p-center-adjust
  margin-left 15px
.p-module-top
  width 100%
.u-empty-tips
  display flex
  justify-content center
  align-items center
  color #252631
  font-size 14px
  min-height 190px
.p-empty-dark
  color #fff
.p-module-half
  width 49.7%
  margin 10px 0 0 0
#saleMoneyChart,
#saleAreaChart,
#profitabilityChart,
#efficiencyChart
  height 300px
.p-module-title-center
  color #252631
  font-size 20px
  text-align center
  font-weight bold
  margin-bottom 20px
#projectChart
  height 500px
.p-module-project
  margin-bottom 10px
.p-number-align
  text-align right
  width 100%
.p-module-risk
  width 250px
#regionalDistribution,
#causeDistribution
  width 400px
  height 320px
.p-risk-module
  width 430px
  .p-risk-module-title
    color #252631
    font-size 16px
    margin-bottom 30px
.p-appeal-module
  background #F5F7FD
  width 250px
  padding 20px 15px
#plaintiffDefendant
  width 235px
  height 280px
#nearOneYearRegional,
#yearRegional
  width 400px
  height 320px
.p-modult-margin-bottom
  margin-bottom 10px
.p-link
  color #23BCCA
</style>
