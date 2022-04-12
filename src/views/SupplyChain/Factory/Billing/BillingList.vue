<template lang="pug">
  .page-wrap
    PromptInfo(title='当您的客户发起开票申请时，您可以在开票管理列表中进行查看。同时您也可以对您客户的开票申请进行审批。')
    TopTotalInfo
    Card(noTitle style='margin-bottom: 10px;')
      Form(:formConfig='formConfig' :formData='formData' ref='formRef')
        el-button(type='primary' @click='getBillingList') 搜索
        el-button(type='plain'  @click='getBillingList("reset")') 重置
    Card(noTitle)
      //- el-button(type='primary' style='margin-bottom: 20px') 发票类型配置
      Table(:cloumns='cloumns' :dataSource='dataSource' @oprateBtnClick='billingHandle' :loading='tableLoading')
      Pagination(:pagination='pagination' :total='total' :pageNo.sync='params.pageNo' :pageSize.sync='params.pageSize' @cpagination='getBillingList')
</template>

<script>
import Table from '../Components/Table/Table.vue'
import Pagination from '../Components/Pagination.vue'
import Form from '../Components/Form.vue'
import TopTotalInfo from './Components/topTotalInfo'
import Card from '@/components/Card'
import {toAmountStr} from '@/utils/util'
import { billStatus, invoiceTypes } from '@/utils/enums'
import { weblogsDom } from '@/utils/qjd/weblogs'
import PromptInfo from '../Components/PromptInfo.vue'

export default {
  data() {
    return {
      total: 0,
      tableLoading: false,
      params: {
        pageNo: 1,
        pageSize: 10,
      },
      cloumns: [
        {
          label: '开票订单号',
          key: 'invoiceNo',
          render: (h, scope) => {
            // const str = scope.row.invoiceNo ? invoiceTypes[scope.row.invoiceType] : '--'
            return scope.row.billingStatus === 1
              ? <div>
                <span style='width:8px;height:8px;border-radius:50%;background-color:#FF0028;display:inline-block;margin-right 5px'></span>
                <span> {scope.row.invoiceNo} </span>
              </div>
              : <span> {scope.row.invoiceNo} </span>
          }
        },
        {label: '申请时间', key: 'applicationTime'},
        {label: '客户', key: 'customerName'},
        {label: '开票主体公司', key: 'entityCompany'},
        {
          label: '开票状态',
          key: 'billingStatus',
          formatter: (row) => billStatus[row.billingStatus],
        },
        {
          label: '开票总金额',
          key: 'invoiceAmount',
          align: 'right',
          formatter: (row) => toAmountStr(row.invoiceAmount, 2, true),
        },
        {
          label: '开票类型',
          key: 'invoiceType',
          formatter: (row) => invoiceTypes[row.invoiceType]
          // render: (h, scope) => {
          //   const str = scope.row.invoiceType ? invoiceTypes[scope.row.invoiceType] : '--'
          //   return <span> {str} </span>
          // }
        },
        {label: '关联的发货单数量', key: 'deliverAmount'},
        {
          label: '操作',
          key: 'operate',
          options: [
            {
              label: '开票处理',
              render: (row) => {
                return row.billingStatus === 1 ? '开票处理' : '查看'
              }
            }
          ]
        },
      ],
      dataSource: [],
      formConfig: [
        {label: '申请时间', type: 'datePicker', key: 'createdTime', kind: 'daterange'},
        {
          label: '客户',
          type: 'select',
          key: 'customerId',
          remote: true,
          loading: true,
          filterable: true,
          remoteMethod: (query, item) => {
            if (query !== '') {
              item.loading = true
              setTimeout(() => {
                this.getCustomerList(query)
                item.loading = false
              }, 200)
            } else {
              this.formConfig[1].options = []
            }
          },
          options: []
        },
        {
          label: '开票状态',
          type: 'select',
          key: 'billingStatus',
          options: [
            {label: '开票中', value: '1'},
            {label: '已开票', value: '2'},
            {label: '已关闭', value: '3'},
          ]
        }
      ],
      formData: {
        createdTime: '',
        customerId: '',
        billingStatus: '',
      },
      pagination: {}
    }
  },
  components: {
    TopTotalInfo,
    Card,
    Table,
    Form,
    Pagination,
    PromptInfo
  },
  methods: {
    toAmountStr,
    async getBillingList(reset) {
      const routeParams = this.$route.params
      this.formData.billingStatus = routeParams.billingStatus ?? this.formData.billingStatus
      const { params, formData, privateSearchParams, _resetSearchParams } = this
      if (reset === 'reset') {
        params.pageNo = 1
        _resetSearchParams(formData)
      }
      const paramsData = {...privateSearchParams(formData), ...params, ...routeParams}
      // const paramsData = {..._filterSearchParams(formData), ...params}
      // console.log(paramsData, 'paramsData')
      this.tableLoading = true
      const res = await this.$http.factory.getBillingList(paramsData)
      if (res.data && res.data.code === '0') {
        this.tableLoading = false
        const { pagedRecords, totalCount } = res.data.data
        this.dataSource = pagedRecords
        this.total = totalCount
      }
    },
    async getCustomerList(customerName) {
      const res = await this.$http.factory.getCustomerList({customerName})
      if (res.data && res.data.code === '0') {
        const options = res.data.data.map(item => {
          return {
            label: item.customerName,
            value: item.id,
          }
        })
        this.$refs.formRef._updateOption('customerId', options)
      }
    },
    async billingHandle(row) {
      if (row.billingStatus === 1) {
        weblogsDom('开票管理-开票处理')
      } else {
        weblogsDom('开票管理-查看')
      }
      this.$router.push({
        name: 'billingDetail',
        query: {
          id: row.id,
          billingStatus: row.billingStatus
          // billingStatus: 1
        }
      })
    },
    _filterSearchParams(params) {
      const tempObj = {}
      for (const item in params) {
        if (params[item]) {
          tempObj[item] = params[item]
        }
      }
      return tempObj
    },
    _resetSearchParams(params) {
      for (const item in params) {
        params[item] = ''
      }
      return params
    },
    privateSearchParams(params) {
      const tempData = this._filterSearchParams(params)
      if (Object.prototype.hasOwnProperty.call(tempData, 'createdTime')) {
        tempData.beginTime = tempData.createdTime[0] + ' 00:00:00'
        tempData.endTime = tempData.createdTime[1] + ' 23:59:59'
        delete tempData.createdTime
      }
      return tempData
    }
  },
  mounted() {
    this.getBillingList()
  }
}
</script>

<style lang="stylus" scoped>
.page-wrap
  padding 0 30px
  &--form
    background-color #fff
    position relative
.red-dot
  width 8px
  height 8px
  border-radius 50%
  background-color #FF0028
  display inline-block
  margin-right 5px
</style>
