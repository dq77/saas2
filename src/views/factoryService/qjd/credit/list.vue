<template lang="pug">
.page-main
  div(v-if='activeTab==="company"')
    Card.list-page_search-area-wrapper(noTitle)
      .list-page_search-area(style='height: 108px')
        el-row(:gutter='20')
          el-col(:span='6')
            .list-page_search-area-label 到期时间
            el-date-picker(
              v-model='searchForm.dataRange'
              type='daterange'
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format='yyyy-MM-dd HH:mm:ss'
              :default-time="['00:00:00', '23:59:59']"
              style='width:100%'
              unlink-panels
            )
          el-col(:span='6')
            .list-page_search-area-label 经销商
            search-auto-company-name(
              @change='changeSearchName'
              :companyName='searchForm.companyName'
            )
          el-col(:span='6')
            .list-page_search-area-label 额度状态
            el-select.width-100(placeholder='请选择额度状态'
              filterable
              clearable
              v-model='searchForm.creditStatus'
              :default-first-option='true'
            )
              el-option(
                v-for='(value, key) in enums.creditStatus'
                :key='key'
                :label='value'
                :value='key'
              )
          el-col(:span='6')
            .list-page_search-area-label 经销商状态
            el-select.width-100(
              placeholder='请选择经销商状态'
              filterable
              clearable
              v-model='searchForm.creditUsing'
              :default-first-option='true'
            )
              el-option(
                v-for='(value, key) in enums.creditUsing'
                :key='key'
                :label='value'
                :value='key'
              )
        .list-page_search-area-btns
          el-button(type="primary" :loading='loading' @click='querySearchForm') 搜索
          el-button(@click='resetSearchForm') 重置
    Card.list-page_table-wrapper(noTitle noWrap)
      .list-page_table
        DataExport.credit-export-btn(
          weblogsMain='factory-openPlatform-creditDetail-export'
          weblogsSubmit='factory-openPlatform-creditDetail-export-submit'
          weblogsCancel='factory-openPlatform-creditDetail-export-cancel'
          page='CREDIT_DETAILS_EXP'
          :params='exportParams'
          :str='translateStr'
        )
        el-table(
          ref='table'
          :data='tableList'
          v-loading='loading'
          @sort-change='handleSortChange'
          :default-sort='getDefaultSort()'
        )
          el-table-column(label='经销商名称' min-width='120')
            template(slot-scope='scope') {{scope.row.companyName||'-'}}
          el-table-column(:label='`${trusteeship.name}额度`' min-width='150' align='right' sortable= 'custom' prop='creditLine')
            .sort-cell(slot-scope='scope')
              span ¥ {{scope.row.creditLine}}
              el-popover(
                placement='top-start'
                content='合作风险较大，额度已禁用'
                trigger='hover'
                v-if='scope.row.inBlacklist'
              )
                i.el-icon-warning.u-warning-icon(slot='reference')
          el-table-column(:label='`已使用${trusteeship.name}额度`' min-width='160' align='right' sortable='custom' prop='amountInUse')
            .sort-cell(slot-scope='scope') ¥ {{scope.row.amountInUse}}
          el-table-column(label='剩余可使用额度' min-width='150' align='right' sortable='custom' prop='availableLine')
            .sort-cell(slot-scope='scope') ¥ {{scope.row.availableLine||'-'}}
          el-table-column(:label='`最新获得${trusteeship.name}额度时间`' min-width='190' align='right' sortable='custom' prop='validFrom')
            .sort-cell(slot-scope='scope') {{scope.row.validFrom| toDateStr('yyyy-MM-dd')||'-'}}
          el-table-column(label='额度状态' min-width='100' align='right')
            template(slot-scope='scope') {{enums.creditStatus[scope.row.creditStatus]}}
          el-table-column(:label='`${trusteeship.name}额度有效期截止日`' min-width='190' align='right' sortable='custom' prop='validTo')
            .sort-cell(slot-scope='scope') {{scope.row.validTo| toDateStr('yyyy-MM-dd')||'-'}}
      .list-page_pagination
        el-pagination(
          :total='totalCount'
          :page-size='pageSize'
          :current-page='currentPage'
          @current-change='changePage'
          layout='total, prev, pager, next, jumper'
        )
  div(v-else-if='activeTab==="qjd"')
    Card.list-page_search-area-wrapper(noTitle)
      .list-page_search-area(style='height: 108px')
        el-row(:gutter='20')
          el-col(:span='6')
            .list-page_search-area-label 到期时间
            el-date-picker(
              v-model='searchForm.dataRange'
              type='daterange'
              start-placeholder="请选择起始日期"
              end-placeholder="请选择截止日期"
              format="yyyy-MM-dd"
              value-format='yyyy-MM-dd HH:mm:ss'
              :default-time="['00:00:00', '23:59:59']"
              style='width:100%'
            )
          el-col(:span='6')
            .list-page_search-area-label 经销商
            search-auto-company-name(
              @change='changeSearchName'
              :companyName='searchForm.companyName'
            )
          el-col(:span='6')
            .list-page_search-area-label 额度状态
            el-select(
              placeholder='请选择额度状态'
              filterable
              clearable
              v-model='searchForm.creditStatus'
              :default-first-option='true'
            )
              el-option(
                v-for='(value, key)  in enums.creditStatus'
                :key='key'
                :label='value'
                :value='key'
              )
          el-col(:span='6')
            .list-page_search-area-label 经销商状态
            el-select(
              placeholder='请选择经销商状态'
              filterable
              clearable
              v-model='searchForm.creditUsing'
              :default-first-option='true'
            )
              el-option(
                v-for='(value, key)  in enums.creditUsing'
                :key='key'
                :label='value'
                :value='key'
              )
        .list-page_search-area-btns
          el-button(type="primary" :loading='loading'  @click='querySearchForm') 搜索
          el-button(@click='resetSearchForm') 重置
    Card.list-page_table-wrapper(noTitle noWrap)
      .list-page_table
        DataExport.credit-export-btn(
          weblogsMain='factory-openPlatform-creditDetail-export'
          weblogsSubmit='factory-openPlatform-creditDetail-export-submit'
          weblogsCancel='factory-openPlatform-creditDetail-export-cancel'
          page='CREDIT_DETAILS_EXP'
          :params='exportParams'
          :str='translateStr'
        )
        el-table(
          ref='table'
          :data='tableList'
          v-loading='loading'
          @sort-change='handleSortChange'
          :default-sort='getDefaultSort()'
        )
          el-table-column(label='经销商名称' min-width='120')
            template(slot-scope='scope') {{scope.row.companyName||'-'}}
          el-table-column(:label='`${trusteeship.name}额度`' min-width='180' align='right' sortable='custom' prop='creditLine')
            .sort-cell(slot-scope='scope')
              span ¥ {{scope.row.creditLine}}
              el-popover(
                placement='top-start'
                content='合作风险较大，额度已禁用'
                trigger='hover'
                v-if='scope.row.inBlacklist'
              )
                i.el-icon-warning.u-warning-icon(slot='reference')
          el-table-column(:label='`已使用${trusteeship.name}额度`' min-width='150' align='right' sortable='custom' prop='amountInUse')
            .sort-cell(slot-scope='scope') ¥ {{scope.row.amountInUse}}
          el-table-column(label='剩余可使用额度' min-width='180' align='right' sortable='custom' prop='availableLine')
            .sort-cell(slot-scope='scope') ¥ {{scope.row.availableLine}}
          el-table-column(:label='`最新获得${trusteeship.name}额度时间`' min-width='190' align='right' sortable='custom' prop='validFrom')
            .sort-cell(slot-scope='scope') {{scope.row.validFrom| toDateStr('yyyy-MM-dd')||'-'}}
          el-table-column(label='额度状态' min-width='100' align='right')
            template(slot-scope='scope') {{enums.creditStatus[scope.row.creditStatus]}}
          el-table-column(:label='`${trusteeship.name}额度有效期截止日`' min-width='190' align='right' sortable='custom' prop='validTo')
            .sort-cell(slot-scope='scope') {{scope.row.validTo| toDateStr('yyyy-MM-dd')||'-'}}
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
import SearchAutoCompanyName from '@/components/SearchAutoCompanyName'
import DataExport from '@/components/export/dataExport'
import Card from '@/components/Card'
import ajaxStore from '@/apis'
import { creditUsing } from '@/utils/enums'
import { toAmountStr } from '@/utils/util'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      enums: {
        creditStatus: {
          1: '正常',
          2: '失效',
          3: '作废'
        },
        creditUsing
      },
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      activeTab: 'company',
      loading: false,
      tableList: [],
      translateStr: '',
      exportParams: {},
      searchForm: {
        companyName: '',
        cifCompanyId: '',
        creditStatus: '',
        creditType: '',
        creditUsing: '',
        deadEndDate: '',
        deadStartDate: '',
        dataRange: [],
      }
    }
  },
  computed: mapState(['trusteeship']),
  mixins: [mixinListPage],
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return 'background:#F3F4F8;'
    },
    async initSearchParams() {
      await this.$store.dispatch('getUserType')
      this.activeTab = this.trusteeship.isTrusteeship ? 'company' : 'qjd'
      const {
        cifCompanyId,
        companyName,
        creditStatus,
        creditUsing,
        deadEndDate,
        deadStartDate,
        pageNo,
        pageSize,
        descs,
        ascs,
      } = this.$route.query
      this.searchForm.companyName = companyName
      this.searchForm.cifCompanyId = cifCompanyId
      this.searchForm.creditStatus = creditStatus
      this.searchForm.creditType = this.trusteeship.isTrusteeship ? '64' : '2'
      this.searchForm.creditUsing = creditUsing
      this.searchForm.dataRange = deadEndDate && deadStartDate ? [deadStartDate, deadEndDate] : []
      this.searchForm.pageNo = pageNo
      this.searchForm.pageSize = pageSize
      this.searchForm.descs = descs
      this.searchForm.ascs = ascs
      this.activeTab = this.searchForm.creditType === '64' ? 'company' : 'qjd'
    },
    translateParams(params) {
      let str = ''
      for (const key in params) {
        switch (key) {
          case 'deadStartDate':
            str += `开始日期：${params.deadStartDate.slice(0, 10)}。`
            break
          case 'deadEndDate':
            str += `结束日期：${params.deadEndDate.slice(0, 10)}。`
            break
          case 'cifCompanyId':
            str += `经销商：${this.searchForm.companyName}。`
            break
          case 'creditStatus':
            str += `额度状态：${this.enums.creditStatus[params.creditStatus]}。`
            break
          case 'creditUsing':
            str += `支付状态：${this.enums.creditUsing[params.creditUsing]}。`
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
      params.creditType = this.trusteeship.isTrusteeship ? '64' : '2'
      delete params.companyName
      const res = await ajaxStore.factoryService.qjd.creditList(params)
      if (res.data && res.data.code === '0') {
        const data = res.data.data
        if (data) {
          if (this.searchForm.creditType === '2') {
            this.tableList = data.pagedRecords ? data.pagedRecords.map((item, index) => {
              const isHide = item.trustship && item.creditLine <= 100
              item.creditLine = isHide ? '-' : toAmountStr(item.creditLine, 2, true)
              item.amountInUse = isHide ? '-' : toAmountStr(item.amountInUse, 2, true)
              item.availableLine = isHide ? '-' : toAmountStr(item.availableLine, 2, true)
              return item
            }) : null
          } else {
            this.tableList = data.pagedRecords ? data.pagedRecords.map((item, index) => {
              item.creditLine = toAmountStr(item.creditLine, 2, true)
              item.amountInUse = toAmountStr(item.amountInUse, 2, true)
              item.availableLine = toAmountStr(item.availableLine, 2, true)
              return item
            }) : null
          }
          this.currentPage = data.pageNo
          this.totalCount = data.totalCount
        }
      }
      this.loading = false
    },
    privateSearchParams(params) {
      if (params) {
        if (Object.prototype.hasOwnProperty.call(params, 'dataRange')) {
          params.deadStartDate = params.dataRange[0]
          params.deadEndDate = params.dataRange[1]
          delete params.dataRange
        }
      }
      return params
    },
    changeTab(e) {
      if (Object.keys(this.$route.query).length === 0) {
        this.searchForm.creditType =
          e.$options.propsData.name === 'qjd' ? '2' : '64'
        this.querySearchForm()
      } else {
        this.resetSearchForm({
          creditType: e.$options.propsData.name === 'qjd' ? '2' : '64'
        })
      }
    },
    dateChange(d) {
      this.searchForm.deadEndTime = d ? d + ' 23:59:59' : null
    },
    changeSearchName(v) {
      this.searchForm.companyName = v.companyName
      this.searchForm.cifCompanyId = v.companyId
    }
  },
  mounted() {
    // await this.$store.dispatch('getUserType')

  },
  components: {
    SearchAutoCompanyName, Card, DataExport
  }
}
</script>

<style lang="stylus" scoped>
.u-warning-icon
  color #F05A4A
  margin 0 -19px 0 7px
  font-size 14px
.credit-export-btn
  margin-bottom 10px
.el-select
  display block
</style>
