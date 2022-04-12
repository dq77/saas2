<template lang="pug">
  .page-wrap(v-loading='loading')
    detail-card(v-if='billingStatus==="2"' :detailInfo='billingInfo' :dataSource='billingData' @handleEdit='editBillingInfo')
    detail-card(:detailInfo='basicInfo' :dataSource='detailData')
    detail-card(:detailInfo='companyInfo' :dataSource='detailData')
    detail-card(:detailInfo='deliverInfo' :dataSource='deliverData' :isTable='true')
    detail-card(:detailInfo='receiveInfo' :dataSource='detailData')
    .page-operate(v-if='billingStatus==="1"')
      el-button(type='plain' @click='closeBilling' weblogs-anchor="supplyChain-factory-invoice-handle-close") 关闭
      el-button(type='primary'  @click='confirmBilling' weblogs-anchor="supplyChain-factory-invoice-handle-complete") 完成
    edit-dialog(:dialogVisible.sync='dialogVisible' :logisticsList.sync='logisticsList' :billingId='billingId' :invoiceNosList='invoiceNosList' :billingData='billingData' ref='editDialog')
</template>

<script>
import DetailCard from './Components/DetailCard'
import EditDialog from './Components/EditDialog'
import Form from '../Components/Form.vue'
import {toAmountStr} from '@/utils/util'
import { billStatus, invoiceTypes } from '@/utils/enums'

export default {
  data() {
    return {
      loading: true,
      billingId: this.$route.query.id,
      billingStatus: '',
      invoiceNosList: [],
      logisticsList: [],
      detailData: {},
      billingData: {},
      billingInfo: {
        hasRightHead: true,
        cardTitle: '开票信息',
        list: [
          {label: '发票号', key: 'logisticsNo'},
          {label: '物流单号', key: 'logisticsOrderNo'},
          {
            label: '物流公司',
            key: 'logisticsCompany'
          },
        ]
      },
      deliverData: [],
      deliverInfo: {
        cardTitle: '关联的发货单',
        list: [
          {label: '序号', type: 'index'},
          {label: '订单号', key: 'orderSn'},
          {label: '项目', key: 'projectName'},
          {
            label: '金额（含税）',
            key: 'deliveryAmount',
            align: 'right',
            formatter: (row) => toAmountStr(row.deliveryAmount, 2, true)
          }
        ]
      },
      basicInfo: {
        cardTitle: '基本信息',
        list: [
          {label: '开票订单号', key: 'invoiceNo'},
          {label: '客户', key: 'customerName'},
          {
            label: '开票状态',
            key: 'billingStatus',
            render: (key, dataSource) => {
              return billStatus[dataSource[key]]
            }
          },
          {label: '申请时间', key: 'applicationTime'},
        ]
      },
      companyInfo: {
        cardTitle: '开票主体公司信息',
        list: [
          {label: '开票主体公司', key: 'entityCompany'},
          {label: '公司税号', key: 'taxNumber'},
          {
            label: '开票总金额',
            key: 'invoiceAmount',
            render: (key, dataSource) => {
              return dataSource[key] ? `¥${toAmountStr(dataSource[key], 2, true)}` : '--'
            }
          },
          {
            label: '开票类型',
            key: 'invoiceType',
            render: (key, dataSource) => {
              const str = dataSource[key] ? invoiceTypes[dataSource[key]] : '--'
              return str
            }
          },
        ]
      },
      receiveInfo: {
        cardTitle: '开票接收信息',
        list: [
          {label: '收货人', key: 'consignee'},
          {label: '收货电话', key: 'consigneeTel'},
          {
            label: '收货地址',
            key: 'province',
            render: (key, dataSource) => {
              return `${dataSource.province}${dataSource.area}${dataSource.address}`
            }
          },
        ]
      },
      dialogVisible: false,
    }
  },
  components: {
    DetailCard,
    EditDialog,
    Form
  },
  methods: {
    toAmountStr,
    resetBillingList() {
      this.billingInfo.list = [
        {label: '物流单号', key: 'logisticsOrderNo'},
        {
          label: '物流公司',
          key: 'logisticsCompany',
          render: (key, dataSource) => {
            let logisticsCompanyStr = '--'
            this.logisticsList.forEach(item => {
              if (item.value === dataSource[key]) {
                logisticsCompanyStr = item.label
              }
            })
            return logisticsCompanyStr
          }
        },
      ]
    },
    handleBillingConfigData(invoiceNos) {
      this.resetBillingList()
      const invoiceNosInfo = invoiceNos && invoiceNos.map((item, index) => {
        return {
          label: '发票号' + (index + 1),
          key: 'invoiceNo' + (index + 1)
        }
      })
      invoiceNosInfo && this.billingInfo.list.unshift(...invoiceNosInfo)
    },
    handleBillingSourceData(invoiceNos) {
      const dataObj = {}
      invoiceNos && invoiceNos.map((item, index) => {
        dataObj['invoiceNo' + (index + 1)] = item
      })
      return dataObj
    },
    async getBillingDetail() {
      const res = await this.$http.factory.getBillingDetail({id: this.billingId})
      const { data: { data, code } } = res || {}
      this.loading = true
      if (data && code === '0') {
        const { deliverInvoiceDetailVOS, deliverInvoiceInfoVO, billingStatus } = data || {}
        this.detailData = data || {} // 存储 基本信息 开票主体公司信息 开票接收信息
        this.deliverData = deliverInvoiceDetailVOS // 存储 关联的发货单
        this.billingStatus = billingStatus.toString()
        const {logisticsCompany, logisticsOrderNo, invoiceNos} = deliverInvoiceInfoVO || {}
        if (!this.logisticsList.length) {
          this.logisticsList = await this.getLogisticsListEnum()
        }
        this.invoiceNosList = invoiceNos || [] // 发票号列表
        invoiceNos && this.handleBillingConfigData(invoiceNos)
        const invoiceNosInfoData = invoiceNos && this.handleBillingSourceData(invoiceNos)
        this.billingData = { // 存储 开票信息
          ...invoiceNosInfoData,
          logisticsCompany,
          logisticsOrderNo
        }
        this.loading = false
      }
    },
    editBillingInfo() {
      this.dialogVisible = true
      setTimeout(() => {
        this.$refs.editDialog.editBillingInfo()
      })
    },
    async getLogisticsListEnum() {
      const res = await this.$http.factory.getLogisticsListEnum({dictCategoryCode: 'sendInvoicesExpress'})
      if (res.data && res.data.code === '0') {
        return res.data.data.map(item => {
          return {
            label: item.dictName,
            value: item.dictCode
          }
        })
      }
    },
    closeBilling() {
      this.$confirm('确认关闭开票申请吗？', '提示', {
        type: 'warning',
        roundButton: true,
      }).then(async () => {
        const res = await this.$http.factory.closeBilling({id: this.billingId})
        if (res.data && res.data.code === '0') {
          this.getBillingDetail()
        }
      })
      // const res = await this.$http.supplyChain.closeBilling({id: this.billingId})
      // if (res.data && res.data.code === '0') {
      //   this.getBillingDetail()
      // }
    },
    confirmBilling() {
      this.$confirm('确认完成开票申请吗？', '提示', {
        type: 'warning',
        roundButton: true,
      }).then(async () => {
        const res = await this.$http.factory.confirmBilling({id: this.billingId})
        if (res.data && res.data.code === '0') {
          this.getBillingDetail()
        }
      })
    },
  },
  created() {
    this.getBillingDetail()
    // console.log(this.billingStatus)
  }
}
</script>

<style lang="stylus" scoped>
.page-wrap
  padding 0 30px
  .page-operate
    text-align center
  .card
    margin-bottom 10px
  .dynamicInput
    >>>.el-input
      width 90%
</style>
