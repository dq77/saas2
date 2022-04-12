<template lang="pug">
  .page-main
    Summary
    .page-title 企业历史履约记录
    .p-performance(v-loading='summaryLoading')
      .u-block
        .u-number {{(hasPerformInfo ? performInfo.loanPerformanceNums : '--')}}
        .u-label 货款履约（次）
        .u-axis
      .u-block
        .u-number {{(hasPerformInfo ? performInfo.servicePerformanceNums : '--')}}
        .u-label 服务费履约（次）
        .u-axis
      .u-block
        .u-number(v-if='hasPerformInfo') {{performInfo.loanPerformanceAmount | toAmountStr(2, true, true)}}
        .u-number(v-else) --
        .u-label 履约总额（万元）
        .u-axis
      .u-block
        .u-number {{(hasPerformInfo ? performInfo.loanAbnormalNums : '--')}}
        .u-label 支付货款异常（次）
        .u-axis
      .u-block
        .u-number {{(hasPerformInfo ? performInfo.serviceAbnormalNums : '--')}}
        .u-label 支付服务费异常（次）
        .u-axis
      .u-block
        .u-number(v-if='hasPerformInfo') {{performInfo.loanAbnormalAmount | toAmountStr(2, true, true)}}
        .u-number(v-else) --
        .u-label 支付异常总额（万元）
        .u-axis
    .page-title#p-list-page-hash-selector 企业历史异常记录
    .page-block
      list-page(
        ref='listPage'
        :config='listPageConfig'
        @privateSearchParams='privateSearchParams'
        :retainParams='retainParams'
      )
        template(slot='abnormalAmount' slot-scope='{row}')
          span(v-if='row.abnormalAmount') ￥{{ row.abnormalAmount | toAmountStr}}
          span(v-else) -
</template>
<script>
import ajaxStore from '@/apis'
import {abnormalType, currentRepaymentStatus} from '@/utils/enums'
import {toDateStr, renderModelItem} from '@/utils/util'
import ListPage from '@/components/ListPage'
import Summary from './summary/index'
export default {
  data () {
    return {
      infoLoading: false,
      summaryLoading: false,
      gradeDescribe: {
        B: '整体实力不足，建议慎重考虑是否合作',
        BB: '实力、经营能力风险较高，履约意愿及能力较弱，建议重点关注合作动态',
        BBB: '实力、经营能力一般；履约意愿及能力一般',
        A: '实力、经营能力良好；履约意愿及能力良好',
        AA: '实力、经营能力优秀；履约意愿及能力较强',
        AAA: '实力、经营能力极佳；履约意愿及能力优秀'
      },
      companyInfo: {},
      performInfo: {
        loanPerformanceNums: '',
        servicePerformanceNums: '',
        loanPerformanceAmount: '',
        loanAbnormalNums: '',
        serviceAbnormalNums: '',
        loanAbnormalAmount: ''
      },
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      tableList: [],
      productList: [],
      searchForm: {
        id: '',
        companyId: '',
        abnormalType: '',
        currentRepaymentStatus: ''
      },
      riskLoading: false,
      riskSummary: ''
    }
  },
  computed: {
    retainParams() {
      return {
        companyId: this.$route.query.companyId,
        id: this.$route.query.id,
        hashSelector: '#p-list-page-hash-selector',
      }
    },
    listPageConfig () {
      return {
        searchParams: [
          [
            {
              type: 'select',
              formItemName: 'abnormalType',
              placeholder: '请选择异常类型',
              label: '异常类型',
              enum: abnormalType,
              col: 6
            },
            {
              type: 'select',
              formItemName: 'currentRepaymentStatus',
              enum: currentRepaymentStatus,
              label: '当前还款状态',
              placeholder: '请选择还款状态',
              col: 6
            }
          ]
        ],
        tableHeader: [
          { name: '赊销编号', property: 'loanId', minWidth: 120, formatter: (v) => v ? (v.substr(3, 3) + '****' + v.substr(v.length - 3, 3)) : '-' },
          { name: '项目名称', property: 'projectName', minWidth: 150, formatter: (v) => v ? (v.substr(3, 3) + '****' + v.substr(v.length - 3, 3)) : '-' },
          { name: '异常天数', property: 'abnormalDays', minWidth: 80, formatter: (v) => v ? `${v}天` : '-'},
          { name: '应还日期', property: 'shouldPaidDay', minWidth: 80, formatter: (v) => v ? toDateStr(v, 'yyyy-MM-dd') : '-'},
          { name: '异常类型', property: 'abnormalType', minWidth: 100, formatter: (v) => v ? abnormalType[v] : '-' },
          { name: '异常金额', property: 'abnormalAmount', minWidth: 120, tdSlotName: 'abnormalAmount', align: 'right'},
          { name: '当前还款状态', property: 'currentRepaymentStatus', minWidth: 80, formatter: (v) => v ? currentRepaymentStatus[v] : '-' },
        ],
        getTableList: {
          type: 'component',
          fn: this.getAbnormalList
        }
      }
    },
    hasPerformInfo () {
      return this.performInfo && JSON.stringify(this.performInfo) !== '{}'
    }
  },
  methods: {
    renderModelItem,
    goTo(name) {
      this.$router.push({
        name
      })
    },
    privateSearchParams(params) {
      params.companyId = this.$route.query.companyId
      params.id = this.$route.query.id
    },
    initSearchParams() {
      const {
        id,
        companyId,
        abnormalType,
        currentRepaymentStatus,
        pageNo,
        pageSize
      } = this.$route.query
      this.searchForm.id = id
      this.searchForm.companyId = companyId
      this.searchForm.abnormalType = abnormalType
      this.searchForm.currentRepaymentStatus = currentRepaymentStatus
      this.searchForm.pageNo = pageNo || '1'
      this.searchForm.pageSize = pageSize || '10'
    },
    async getCompanyInfoById() {
      this.infoLoading = true
      const res = await ajaxStore.factoryService.layered.checkCompanyInfoById({id: this.$route.query.id})
      this.infoLoading = false
      if (res.data && res.data.code === '0') {
        this.companyInfo = res.data.data
        this.checkCompanyRiskSummary()
      }
    },
    async checkCompanyRiskSummary() {
      const {corpName, cifCompanyId} = this.companyInfo
      this.riskLoading = true
      const res = await ajaxStore.factoryService.layered.checkCompanyRiskSummary({
        companyId: cifCompanyId,
        companyName: corpName,
      })
      this.riskLoading = false
      if (res.data && res.data.code === '0') {
        this.riskSummary = res.data.data
      }
    },
    async getPerformInfo() {
      this.summaryLoading = true
      const res = await ajaxStore.factoryService.layered.getPerformInfo({companyId: this.$route.query.companyId || '-1'})
      this.summaryLoading = false
      if (res.data && res.data.code === '0') {
        this.performInfo = res.data.data
      }
    },
    async getAbnormalList() {
      this.initSearchParams()
      this.searchForm.companyId = this.searchForm.companyId || '-1'
      return this.ajaxStore.factoryService.layered.getAbnormalList(this.searchForm)
    }
  },
  components: { ListPage, Summary },
  mounted () {
    // this.getCompanyInfoById()
    this.getPerformInfo()
  }
}
</script>
<style lang="stylus" scoped>
.page-title
  margin-top 30px
  margin-bottom 20px
  &:first-child
    margin-top 0
.p-credit-info
  padding 29px 24px 25px 24px
  border-radius 8px
  background #fff
  &>.u-title
    font-size 16px
    color #383B42
  &>.u-wrapper
    display flex
  &>.u-tip
    margin-top 50px
    padding-top 17px
    font-size 12px
    color #7A869E
    border-top 1px dashed #C5CDDD
    i
      margin-right 13px
  .u-main-right
    flex 1
    display flex
    margin-left 20px
    margin-top 25px
    // height 228px
    .u-col-1
      padding-right 13px
      width 45%
.p-suggest-quota,.p-ranking
  padding 22px 0 22px 24px
  color #fff
  border-radius 9px
  white-space nowrap
  .u-title
    font-size 14px
    line-height 14px
  .u-value
    margin-top 7px
    font-size 24px
    line-height 40px
    .u-number
      font-size 24px
  .u-tip
    font-size 12px
    line-height 12px
    &:before
      content ""
      display inline-block
      margin 0 7px 0 3px
      width 6px
      height 6px
      background #fff
      border-radius 6px
.p-suggest-quota
  background #427FFC
.p-ranking
  margin-top 14px
  background #6FCAFA
.p-feature-text
  padding 15px 24px 15px 24px
  width 55%
  background #F5F7FD
  border-radius 9px
  font-size 14px
  line-height 32px
  .u-title
    color #383B42
  .u-content
    color #7A869E
    height 63px
  .u-level,.u-level-2
    position relative
    top 117px
    margin 0 auto
    width 166px
    height 76px
    line-height 76px
    background #FFFFFF
    border 1px solid #DCDCE0
    box-shadow 0px 2px 3px 0px #E1EBF7
    border-radius 3px
    font-size 32px
    font-weight bold
    text-align center
    color #427FFC
  .u-level-2
    line-height normal
    .u-level-2-tip
      margin-top 5px
      font-size 14px
  .u-tip
    position relative
    top 130px
    font-size 14px
    color #7A869E
    text-align center
.p-performance
  display flex
  justify-content space-between
  .u-block
    flex 1
    margin-left 8px
    background #fff
    border-radius 8px
    overflow hidden
    &:first-child
      margin-left 0
    .u-number
      margin 22px 10px 0 22px
      font-size 24px
      color #383B42
      white-space nowrap
    .u-label
      margin-top 3px
      margin-left 22px
      color #7A869E
      font-size 12px
    .u-axis
      margin-top 18px
      height 3px
      background #427FFC
    &:nth-child(1) .u-axis
      background-color #427ffc
    &:nth-child(2) .u-axis
      background-color #6fcafa
    &:nth-child(3) .u-axis
      background-color #936ffa
    &:nth-child(4) .u-axis
      background-color #936ffa
    &:nth-child(5) .u-axis
      background-color #f05a4a
    &:nth-child(6) .u-axis
      background-color #fe8b32
.u-empty-tips
  display flex
  justify-content center
  align-items center
  color #738a9e
  min-height 100px
.u-risk-summary
  display flex
  flex-wrap wrap
  margin-top 20px
  .u-risk-summary-item
    font-size 12px
    border 1px solid #C9DBFF
    background #fff
    border-radius 12px
    color #427FFC
    height 23px
    line-height 23px
    padding 0 4px 0 12px
    margin 0 3px 3px 0
    cursor pointer
  .u-risk-summary-item:hover
    background #427FFC
    color #fff
</style>
