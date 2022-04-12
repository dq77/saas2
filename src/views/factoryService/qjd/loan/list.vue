<template lang='pug'>
.page-main.loan-search-list
  Card.list-page_search-area-wrapper(noTitle)
    .list-page_search-area
      el-row(:gutter='20')
        el-col(:span='6')
          .list-page_search-area-label 支付货款日期
          el-date-picker(
            v-model='searchForm.dataRange'
            type='daterange'
            start-placeholder='起始日期'
            end-placeholder='结束日期'
            format='yyyy-MM-dd'
            value-format='yyyy-MM-dd HH:mm:ss'
            :default-time='["00:00:00", "23:59:59"]'
            style='width:100%'
            unlink-panels
          )
        el-col(:span='6')
          .list-page_search-area-label 关联经销商
          search-auto-company-name(
            :companyName='searchForm.dealerName'
            @change='changeSearchName'
            )
        el-col(:span='6')
          .list-page_search-area-label 支付状态
          el-select.width-100(
            placeholder='请选择支付状态'
            filterable
            clearable
            v-model='searchForm.paymentStatus'
            :default-first-option='true'
          )
            el-option(
              v-for='(value,key) in enums.payStatus'
              :key='key'
              :label='value'
              :value='key'
            )
      .list-page_search-area-btns
        el-button(type='primary' :loading='loading'  @click='querySearchForm') 搜索
        el-button(@click='resetSearchForm') 重置
  Card.list-page_table-wrapper(noTitle noWrap)
    .list-page_table
      DataExport(
        weblogsMain='factory-openPlatform-payment-export'
        weblogsSubmit='factory-openPlatform-payment-export-submit'
        weblogsCancel='factory-openPlatform-payment-export-cancel'
        page='PAYMENT_EXP'
        :params='exportParams'
        :str='translateStr'
      )
      el-table(
        v-loading='loading'
        ref='table'
        :data='tableList'
        @sort-change='handleSortChange'
      )
        el-table-column(label='关联经销商' prop='companyName' min-width='100')
        el-table-column(label='仟金顶订单编号' prop='qjdOrderCode' min-width='120')
        el-table-column(label='厂家订单编号' prop='smokeOrderCode' min-width='100')
        el-table-column(label='合作项目名称' prop='projectName' min-width='180')
        el-table-column(label='订单金额' prop='orderAmount' min-width='110' sortable='custom' align='right')
          template(slot-scope='{row}')
            span {{ row.orderAmount ? `¥ ${toAmountStr(row.orderAmount, 2, true)}` : '-' }}
        el-table-column(label='发货日期' prop='deliveryDate' min-width='90')
          template(slot-scope='{row}')
            span {{ toDateStr(row.deliveryDate, 'yyyy-MM-dd') }}
        el-table-column(label='发货单号' prop='deliveryOrderCode' min-width='90')
        el-table-column(label='客户应付首付款' prop='downPaymentAmount' min-width='110' align='right')
          template(slot-scope='{row}')
            span {{ row.downPaymentAmount ? `¥ ${toAmountStr(row.downPaymentAmount, 2, true)}` : '-' }}
        //- 陈皓：客户已付首付款和仟金顶已付货款根据支付状态来判断展示规则 2021.08.02
        el-table-column(label='客户已付首付款' prop='downPaidAmount' min-width='110' align='right')
          template(slot-scope='{row}')
            span(v-if='["TODO", "DONE", "REPAYMENT_DONE"].includes(row.paymentStatus)') {{ `¥ ${toAmountStr(row.downPaymentAmount, 2, true)}` }}
            span(v-else) -
        el-table-column(label='仟金顶应付货款' prop='qjdDownPaymentAmount' min-width='110' align='right')
          template(slot-scope='{row}')
            span {{ row.qjdDownPaymentAmount ? `¥ ${toAmountStr(row.qjdDownPaymentAmount, 2, true)}` : '-' }}
        el-table-column(label='仟金顶已付货款' prop='qjdDownPaidAmount' min-width='130' sortable='custom' align='right')
          template(slot-scope='{row}')
            span {{ row.qjdDownPaiedAmount ? `¥ ${toAmountStr(row.qjdDownPaiedAmount, 2, true)}` : '-' }}
        el-table-column(label='仟金顶支付方式' prop='qjdPaymentMethod' min-width='110')
        el-table-column(label='支付货款编号' prop='loanOrderCode' min-width='250')
        el-table-column(label='支付货款日期' prop='loanPaymentDate' min-width='120' sortable='custom')
          template(slot-scope='{row}')
            span {{ toDateStr(row.loanPaymentDate, 'yyyy-MM-dd') }}
        el-table-column(label='支付状态' prop='paymentStatus' min-width='90')
          template(slot-scope='{row}')
            span {{ enums.payStatus[row.paymentStatus] }}
    .list-page_pagination
      el-pagination(
        :total='totalCount'
        :page-size='pageSize'
        :current-page='currentPage'
        @current-change='changePage'
        layout='total, prev, pager, next, jumper'
      )
</template>

<script>
import mixinListPage from '@/mixins/listPage'
import ajaxStore from '@/apis'
import SearchAutoCompanyName from '@/components/SearchAutoCompanyName'
import DataExport from '@/components/export/dataExport'
import Card from '@/components/Card'
import { payStatus } from '@/utils/enums'
import { toAmountStr, toDateStr } from '@/utils/util'
export default {
  data() {
    return {
      enums: {
        payStatus
      },
      loading: false,
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      tableList: [],
      translateStr: '',
      exportParams: {},
      searchForm: {
        paymentDateBegin: '',
        paymentDateEnd: '',
        dataRange: [],
        dealerName: '',
        cifCompanyId: '',
        paymentStatus: ''
      },
    }
  },
  computed: {},
  mixins: [mixinListPage],
  methods: {
    toAmountStr,
    toDateStr,
    initSearchParams() {
      const {
        paymentDateBegin,
        paymentDateEnd,
        cifCompanyId,
        dealerName,
        paymentStatus,
        pageNo,
        pageSize,
        descs,
        ascs,
      } = this.$route.query
      this.searchForm.dataRange = paymentDateBegin && paymentDateEnd ? [paymentDateBegin, paymentDateEnd] : []
      this.searchForm.cifCompanyId = cifCompanyId
      this.searchForm.dealerName = dealerName
      this.searchForm.paymentStatus = paymentStatus
      this.searchForm.pageNo = pageNo
      this.searchForm.pageSize = pageSize
      this.searchForm.descs = descs
      this.searchForm.ascs = ascs
    },
    privateSearchParams(params) {
      if (params) {
        if (Object.prototype.hasOwnProperty.call(params, 'dataRange')) {
          params.paymentDateBegin = params.dataRange[0]
          params.paymentDateEnd = params.dataRange[1]
          delete params.dataRange
        }
      }
      return params
    },
    translateParams(params) {
      let str = ''
      for (const key in params) {
        switch (key) {
          case 'paymentDateBegin':
            str += `开始日期：${params.paymentDateBegin.slice(0, 10)}。`
            break
          case 'paymentDateEnd':
            str += `结束日期：${params.paymentDateEnd.slice(0, 10)}。`
            break
          case 'cifCompanyId':
            str += `经销商：${this.searchForm.dealerName}。`
            break
          case 'paymentStatus':
            str += `支付状态：${this.enums.payStatus[params.paymentStatus]}。`
            break
        }
      }
      this.translateStr = str
      this.exportParams = params
    },
    handleSortChange(e) {
      if (e && e.order) {
        if (e.order === 'ascending') {
          this.searchForm.ascs = e.prop
          this.searchForm.descs = undefined
        } else if (e.order === 'descending') {
          this.searchForm.descs = e.prop
          this.searchForm.ascs = undefined
        }
      } else {
        this.searchForm.descs = undefined
        this.searchForm.ascs = undefined
      }
      this.querySearchForm()
    },
    async getTableList() {
      this.loading = true
      const params = this.getSearchParams()
      this.translateParams(params) // 参数语义化
      params.pageSize = this.pageSize
      delete params.dealerName
      const res = await ajaxStore.factoryService.qjd.paymentList(params)
      if (res.data && res.data.code === '0') {
        const data = res.data.data
        if (data) {
          // 演示数据 待删
          // const amounts = [358479, 489938, 249937, 720393, 522003, 745333, 1003023, 287264, 334538, 937223]
          // -
          this.tableList = data.pagedRecords ? data.pagedRecords.map((item, index) => {
            // 演示数据 待删
            // item.amount = amounts[index]
            // -
            item.index = index
            item.loading = false
            item.goodsList = []
            return item
          }) : null
          this.currentPage = data.pageNo
          this.totalCount = data.totalCount
        }
      }
      this.loading = false
    },
    changeSearchName(v) {
      this.searchForm.dealerName = v.companyName
      this.searchForm.cifCompanyId = v.companyId
    },
    dateChange(d) {
      this.searchForm.paymentDateEnd = d ? d + ' 23:59:59' : null
    }
  },
  mounted() {},
  components: {
    SearchAutoCompanyName, Card, DataExport
  }
}
</script>
<style lang='stylus'>
.loan-search-list
  .down-btn
    margin-bottom 10px
  .submit-export-btn
    margin-left 70px
</style>
