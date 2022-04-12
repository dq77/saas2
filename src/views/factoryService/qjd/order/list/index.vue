<template lang="pug">
.page-main
  Card.list-page_search-area-wrapper(noTitle)
    .list-page_search-area(style='height: 108px')
      el-row(:gutter='20')
        el-col(:span='6')
          .list-page_search-area-label 下单时间
          el-date-picker(
            v-model='searchForm.dataRange'
            type='daterange'
            start-placeholder="起始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            style='width:100%'
            unlink-panels
          )
        el-col(:span='6')
          .list-page_search-area-label 经销商
          search-auto-company-name(
            :companyName='searchForm.companyName'
            @change='changeSearchName'
            )
        el-col(:span='6')
          .list-page_search-area-label 产品方案
          el-select.width-100(
            placeholder='请选择产品方案'
            filterable
            clearable
            v-model='searchForm.productCode'
            :default-first-option='true'
          )
            el-option(
              v-for='item in productList'
              :key='item.code'
              :label='item.name'
              :value='item.code'
            )
        el-col(:span='6')
          .list-page_search-area-label 订单状态
          el-select.width-100(
            placeholder='请选择订单状态'
            filterable
            clearable
            v-model='searchForm.orderNodeStatus'
            :default-first-option='true'
          )
            el-option(
              v-for='(value,key) in enums.orderStatus'
              :key='key'
              :label='value'
              :value='key'
            )
      .list-page_search-area-btns
        el-button(type="primary" :loading='loading'  @click='querySearchForm') 搜索
        el-button(@click='resetSearchForm') 重置
  Card.list-page_table-wrapper(noTitle noWrap)
    .list-page_table
      DataExport.order-export-btn(
        weblogsMain='factory-openPlatform-order-export'
        weblogsSubmit='factory-openPlatform-order-export-submit'
        weblogsCancel='factory-openPlatform-order-export-cancel'
        page='ORDER_EXP'
        :params='exportParams'
        :str='translateStr'
      )
      el-table(
        v-loading='loading'
        ref='table'
        :data='tableList'
        @expand-change='expandData'
        @sort-change='handleSortChange'
        :default-sort='getDefaultSort()'
      )
        el-table-column( type='expand' )
          template(slot-scope='scope')
            el-table(
              v-loading='scope.row.loading'
              :data='scope.row.goodsList'
              :row-style="getRowClass"
              :header-row-style="getRowClass"
              :cell-style="getRowClass"
              :header-cell-style="getRowClass"
            )
              el-table-column(label='货物名称' min-width='100')
                template(slot-scope='scope') {{scope.row.productName||'-'}}
              el-table-column(label='货物数量' min-width='80')
                template(slot-scope='scope') {{scope.row.orderAmount||'-'}}
              el-table-column(label='单价' min-width='80' align='right')
                template(slot-scope='scope') {{scope.row.price ? `¥ ${scope.row.price}` : '-'}}
              el-table-column(label='总价' min-width='80' align='right')
                template(slot-scope='scope') {{scope.row.totalCost ? `¥ ${scope.row.totalCost}` : '-'}}
              el-table-column(label='规格' min-width='80')
                template(slot-scope='scope') {{scope.row.productSpecifications||'-'}}
              el-table-column(label='分类' min-width='80')
                template(slot-scope='scope') {{scope.row.classification||'-'}}
              el-table-column(label='单位' min-width='80')
                template(slot-scope='scope') {{scope.row.unit||'-'}}
              el-table-column(label='收货人' min-width='80')
                template(slot-scope='scope') {{scope.row.receiptPerson||'-'}}
              el-table-column(label='收货地址' min-width='120')
                template(slot-scope='scope') {{scope.row.address||'-'}}
        el-table-column(label='订单编号' min-width='100')
          template(slot-scope='scope') {{scope.row.orderCode||'-'}}
        el-table-column(label='经销商' min-width='120')
          template(slot-scope='scope') {{scope.row.companyName||'-'}}
        el-table-column(label='产品方案' min-width='90')
          template(slot-scope='scope')
            el-popover.popover(placement="top" width="450" trigger="hover" @show='popShow(scope.row)')
              el-row(:gutter='20')
                el-col(:span='8')
                  span 首付款比率
                el-col(:span='16')
                  span {{scope.row.downPaymentRatio}}%
              el-row.marginTop(:gutter='20')
                el-col(:span='8')
                  span 经销商阶段费率
                el-col(:span='16')
                  .u-info-item(v-for='(rate, i) in scope.row.rateVoList' :key='i')
                    span.u-i-day 第{{i + 1}}阶段：{{rate.dateFrom}}天-{{rate.dateEnd}}天
                    span 年化费率：{{rate.stairRate}}%
              el-row.marginTop(:gutter='20')
                el-col(:span='8')
                  span 赊销周期（天）
                el-col(:span='16')
                  span {{(scope.row.cycle||'-')}}
              el-row.marginTop(:gutter='20')
                el-col(:span='8')
                  span 支付方式
                el-col(:span='16')
                  span {{scope.row.paymentMethodVoFactory||'-'}}
              .text-link(slot="reference" ) {{scope.row.productName||'-'}}
        el-table-column(label='订单金额' min-width='120' align='right' prop='totalAmount')
          template(slot-scope='scope') {{scope.row.totalAmount ? `¥ ${toAmountStr(scope.row.totalAmount, 2, true)}` : '-'}}
        el-table-column(label='合作项目名称' min-width='110')
          template(slot-scope='scope') {{scope.row.projectName||'-'}}
        el-table-column(label='下单时间' min-width='80' align='right' prop='gmtCreated')
          template(slot-scope='scope') {{scope.row.gmtCreated| toDateStr('yyyy-MM-dd')||'-'}}
        el-table-column(label='订单状态' min-width='70' align='right')
          template(slot-scope='scope') {{enums.orderStatus[scope.row.orderNodeStatus]||'-'}}
        el-table-column(label="操作" v-if='permissions["PTN:SUPPLIER:CONSIGNMENT_INVOICE:VIEW"] || permissions["PTN:SUPPLIER:PRODUCT_ORDER_FORM:VIEW"]')
          template(slot-scope="scope")
            div(v-if='scope.row.preDeliverFile && permissions["PTN:SUPPLIER:CONSIGNMENT_INVOICE:VIEW"]')
              el-button(
                type='text'
                @click='downHandle(scope.row)'
              ) 委托发货单
            div(v-if='permissions["PTN:SUPPLIER:PRODUCT_ORDER_FORM:VIEW"]')
              el-button(
                weblogs-anchor='factory-openPlatform-order-productForm'
                type='text'
                @click='clickShowProductOrderDialog(scope.row)'
              ) 产品订货单
    .list-page_pagination
      el-pagination(
        :total='totalCount'
        :page-size='pageSize'
        :current-page='currentPage'
        @current-change='changePage'
        layout='total, prev, pager, next, jumper'
      )
    el-dialog(
      title='放款编号'
      width='500px'
      :visible.sync='dialogProductOrder.visible'
    )
      .p-loan-list(v-loading='dialogProductOrder.loading')
        template(v-if='dialogProductOrder.loanList.length')
          .u-item.text-link(
            v-for='item in dialogProductOrder.loanList'
            @click='downLoadProdcutOrder(item)'
          ) {{ item.makeId }}
        template(v-else)
          div 暂无数据
</template>

<script>
import { mapState } from 'vuex'
import mixinListPage from '@/mixins/listPage'
import ajaxStore from '@/apis'
import SearchAutoCompanyName from '@/components/SearchAutoCompanyName'
import DataExport from '@/components/export/dataExport'
import Card from '@/components/Card'
import { orderStatus } from '@/utils/enums'
import { getRegionTextArr } from '@/utils/regionHandle'
import { toAmountStr, toPrefixUrl } from '@/utils/util'

export default {
  data() {
    return {
      enums: {
        orderStatus
      },
      loading: false,
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      tableList: [],
      translateStr: '',
      exportParams: {},
      productList: [],
      searchForm: {
        startDate: '',
        endDate: '',
        dataRange: [],
        companyName: '',
        companyId: '',
        productCode: '',
        orderNodeStatus: ''
      },
      config: {
        sortMethod: this.sortMethod,
        reSortMethod: this.reSortMethod
      },
      dialogProductOrder: {
        visible: false,
        loading: false,
        loanList: []
      }
    }
  },
  computed: {
    ...mapState(['permissions']),
  },
  mixins: [mixinListPage],
  methods: {
    toAmountStr,
    sortMethod(param) {
      return param
    },
    reSortMethod (param) {
      return param
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      // return 'background:#F3F4F8;'
    },
    initSearchParams() {
      const {
        startDate,
        endDate,
        companyName,
        companyId,
        productCode,
        orderNodeStatus,
        pageNo,
        pageSize,
        descs,
        ascs,
      } = this.$route.query
      this.searchForm.startDate = startDate
      this.searchForm.endDate = endDate
      this.searchForm.dataRange = startDate && endDate ? [startDate, endDate] : []
      this.searchForm.companyName = companyName
      this.searchForm.companyId = companyId
      this.searchForm.productCode = productCode
      this.searchForm.orderNodeStatus = orderNodeStatus
      this.searchForm.pageNo = pageNo
      this.searchForm.pageSize = pageSize
      this.searchForm.descs = descs
      this.searchForm.ascs = ascs
    },
    privateSearchParams(params) {
      if (params) {
        if (Object.prototype.hasOwnProperty.call(params, 'dataRange')) {
          params.startDate = params.dataRange[0]
          params.endDate = params.dataRange[1]
          delete params.dataRange
        }
      }
      return params
    },
    translateParams(params) {
      let str = ''
      for (const key in params) {
        switch (key) {
          case 'startDate':
            str += `下单开始日期：${params.startDate.slice(0, 10)}。`
            break
          case 'endDate':
            str += `下单结束日期：${params.endDate.slice(0, 10)}。`
            break
          case 'companyId':
            str += `经销商：${this.searchForm.companyName}。`
            break
          case 'productCode':
            str += `产品方案：${this.productList.find(item => {
              return item.code === params.productCode
            }).name}。`
            break
          case 'orderNodeStatus':
            str += `订单状态：${this.enums.orderStatus[params.orderNodeStatus]}。`
            break
        }
      }
      this.translateStr = str
      this.exportParams = params
    },
    async getTableList() {
      this.loading = true
      const params = this.getSearchParams()
      this.translateParams(params) // 参数语义化
      params.pageSize = this.pageSize
      delete params.companyName
      const res = await ajaxStore.factoryService.qjd.orderList(params)
      if (res.data && res.data.code === '0') {
        const data = res.data.data
        if (data) {
          // 演示数据 待删
          // const totalAmounts = [458379, 289938, 349987, 120093, 320003, 345433, 801023, 987364, 134598, 837723]
          // -
          this.tableList = data.pagedRecords ? data.pagedRecords.map((item, index) => {
            // 演示数据 待删
            // item.totalAmount = totalAmounts[index]
            // -
            item.index = index
            item.loading = false
            item.downPaymentRatio = 0
            item.cycle = ''
            item.companyStageRate = ''
            item.paymentMethodVoFactory = ''
            item.goodsList = []
            return item
          }) : null
          this.currentPage = data.pageNo
          this.totalCount = data.totalCount
        }
      }
      this.loading = false
    },
    async getGoodsList(orderCode, row) {
      this.tableList[row.index].loading = true
      const res = await ajaxStore.factoryService.qjd.orderListDetail({ orderCode })
      if (res.data && res.data.code === '0') {
        const data = res.data.data
        if (data && data.length > 0) {
          data.map(item => {
            const ojb = JSON.parse(item.data)
            item.productSpecifications = ojb.productSpecifications
            item.classification = ojb.classification
            item.unit = ojb.unit
            item.receiptPerson = row.receiptPerson
            item.address =
              getRegionTextArr(row.provinceCode, row.cityCode, row.areaCode) +
              row.address
            return item
          })
          this.tableList[row.index].goodsList = data
        }
      }
      this.tableList[row.index].loading = false
    },
    changeSearchName(v) {
      this.searchForm.companyName = v.companyName
      this.searchForm.companyId = v.companyId
    },
    expandData(row, expandedRows) {
      if (row) {
        this.getGoodsList(row.orderCode, row)
      }
    },
    async getProductList() {
      const res = await ajaxStore.factoryService.qjd.getProductList()
      if (res.data && res.data.code === '0') {
        res.data.data.forEach(item => {
          this.productList.push({
            code: item.code,
            name: item.name
          })
        })
      }
    },
    dateChange(d) {
      this.searchForm.endDate = d ? d + ' 23:59:59' : null
    },
    async popShow(item) {
      const res = await ajaxStore.factoryService.qjd.getProduct(item.productCode)
      if (res.data && res.data.code === '0') {
        const data = res.data.data
        const companyStageRate = JSON.parse(data.companyStageRate)
        this.tableList[item.index].downPaymentRatio = data.downPaymentRatio
        this.tableList[item.index].cycle = companyStageRate.cycle
        this.tableList[item.index].rateVoList = companyStageRate.rateVoList
        this.tableList[item.index].paymentMethodVoFactory =
          '银承：' +
          data.paymentMethodVoFactory.acceptRatio +
          '%，现金：' +
          data.paymentMethodVoFactory.cashRatio +
          '%'
      }
    },
    // 下载委托发货单
    downHandle(row) {
      const { preDeliverFile } = row || {}
      window.open(toPrefixUrl(`/proof/file/rawFile?fileKey=${preDeliverFile}`))
    },
    // 打开产品订货单弹框
    async clickShowProductOrderDialog(row) {
      this.dialogProductOrder.visible = true
      this.dialogProductOrder.loading = true
      this.dialogProductOrder.loanList = []
      const res = await ajaxStore.factoryService.qjd.getOrderLoanIds({orderCode: row.orderCode})
      this.dialogProductOrder.loading = false
      if (res.data && res.data.code === '0') {
        this.dialogProductOrder.loanList = res.data.data
      }
    },
    // 点击下载产品订货单
    downLoadProdcutOrder(item) {
      if (item.sourceType === 'LC') { // 流程类型
        window.open(toPrefixUrl(`/partner/common/file/download?fileKey=${item.fileKey}`))
      } else if (item.sourceType === 'HT') { // 合同类型
        window.open(toPrefixUrl(`/proof/file/rawFile?fileKey=${item.fileKey}`))
      } else {
        console.error('无效的sourceType')
      }
    }
  },
  mounted() {
    this.getProductList()
  },
  components: {
    SearchAutoCompanyName, Card, DataExport
  }
}
</script>

<style lang="stylus" scoped>
.marginTop
  margin-top 20px
.order-export-btn
  margin-bottom 10px
.u-info-item
  .u-i-day
    margin-right 10px
</style>
