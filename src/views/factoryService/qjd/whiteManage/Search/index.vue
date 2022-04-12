<template lang="pug">
.page-main-search
  list-page(ref="listPage", :config="listPageConfig")
    template(slot="supplierConfirmStatus" slot-scope='{row}')
      span(v-if="row.supplierConfirmStatus!==1") {{ row.supplierConfirmStatus === 0 ? '待确认' : row.supplierConfirmStatus === 2 ? '已确认' : row.supplierConfirmStatus === 3 ? '拒绝' : '- -' }}
      el-tooltip(v-else :content="row.feedbackReason" placement="top")
        span(style="color: #4A71F0;") 待二次确认
    template(slot="creditStatus" slot-scope='{row}')
      span {{ row.creditStatus === 1 ? '审批中' : row.creditStatus === 2 ? '审批通过' : row.creditStatus === 3 ? '拒绝' :  '- -' }}
    template(slot='differenceAmount' slot-scope='{row}')
      template(v-if='(row.creditAmount || row.creditAmount === 0) && (row.intentionAmount || row.intentionAmount === 0)')
        span(:class='{"page-main-search--red" : (row.creditAmount > row.intentionAmount)}') {{ (row.intentionAmount - row.creditAmount) | toAmountStr(2, true) }}
      span(v-else) - -
    template(slot='creditAmount' slot-scope='{row}')
      span(v-if='row.creditAmount || row.creditAmount === 0')
        span {{ row.creditAmount | toAmountStr(2, true) }}
      span(v-else)
        span {{ row.creditAmount || '- -' }}
      i.el-icon-chat-line-square.p-history-credit-icon(title='历史额度' @click='showHistoryCreditDialog(row)')
    template(slot='extraData' slot-scope='{row}')
      .p-remark(:title='row.extraData') {{ row.extraData || '- -'}}
    template(slot='operate' slot-scope='{row}')
      div
        el-button(@click="confirmHandle(row)", type="text", v-if="row.supplierConfirmStatus === 1") 确认
      div
        el-popconfirm(title="是否确认驳回" @confirm="rejectHandle(row)" v-if="row.supplierConfirmStatus === 1")
          el-button(type="text", slot="reference") 驳回
      div
        el-button(@click="seeHandle(row)", type="text") 查看进度
      div
        el-button(@click="showRemarkDialog(row)", type="text") 修改备注
  Progress(:visible="visible" :processData="processData" @closeHandle="closeHandle")
  RemarkDialog(
    :visible='remarkDialog.visible'
    :params='remarkDialog.params'
    @close='remarkDialog.visible = false'
    @modified='refreshTable'
  )
  HistoryCreditDialog(
    :visible='historyCreditDialog.visible'
    :params='historyCreditDialog.params'
    @close='historyCreditDialog.visible = false'
  )
</template>
<script>
import ListPage from '@/components/ListPage'
import { toAmountStr } from '@/utils/util'
import { maturity, intentionDegree } from '@/utils/enums'
import ajaxStore from '@/apis'
import Progress from './progress'
import RemarkDialog from './remarkDialog'
import HistoryCreditDialog from './historyCreditDialog'

export default {
  components: {
    ListPage,
    Progress,
    RemarkDialog,
    HistoryCreditDialog,
  },
  data() {
    return {
      visible: false,
      processData: {},
      remarkDialog: {
        visible: false,
        params: {
          showId: '',
          extraData: '',
        }
      },
      historyCreditDialog: {
        visible: false,
        params: {
          showId: '',
          extraData: '',
        }
      }
    }
  },
  computed: {
    listPageConfig() {
      const getTableList = this.getTableList
      return {
        searchParams: [
          [
            {
              type: 'select',
              formItemName: 'creditStatus',
              label: '审核状态',
              placeholder: '请选择审批状态',
              col: 6,
              enum: {
                1: '审批中',
                2: '审批通过',
                3: '拒绝',
              }
            },
            {
              type: 'select',
              formItemName: 'supplierConfirmStatus',
              label: '确认状态',
              placeholder: '请选择确认状态',
              col: 6,
              enum: {
                0: '待确认',
                1: '待二次确认',
                2: '已确认',
                3: '拒绝',
              }
            },
            {
              type: 'text',
              formItemName: 'companyNameLike',
              label: '经销商公司名称',
              placeholder: '请输入经销商公司名称',
              col: 6,
            },
          ],
        ],
        tableHeader: [
          { name: '社会统一信用代码', property: 'creditCode', minWidth: 150 },
          { name: '经销商', property: 'companyName', minWidth: 150 },
          {
            name: '审核状态',
            property: 'creditStatus',
            tdSlotName: 'creditStatus',
          },
          {
            name: '确认状态',
            property: 'supplierConfirmStatus',
            formatter: (e) => e === 0 ? '待确认' : e === 1 ? '待二次确认' : e === 2 ? '已确认' : e === 3 ? '拒绝' : '',
            tdSlotName: 'supplierConfirmStatus'
          },
          {
            name: '差异金额（元）',
            property: 'differenceAmount',
            align: 'right',
            tdSlotName: 'differenceAmount',
            minWidth: 150
          },
          {
            name: '当前平移额度（元）',
            tdSlotName: 'creditAmount',
            align: 'right',
            minWidth: 150
          },
          { name: '最近意向额度（元）', property: 'intentionAmount', align: 'right', formatter: (e) => e || e === 0 ? `${toAmountStr(e, 2, true)}` : e, minWidth: 150 },
          { name: '最近意向产品', property: 'productName', minWidth: 150 },
          {
            name: '成熟度',
            property: 'maturity',
            formatter: e => maturity[e],
            minWidth: 150
          },
          {
            name: '意向程度',
            property: 'intentionDegree',
            formatter: e => intentionDegree[e],
            minWidth: 150
          },
          { name: '客户经理', property: 'customerManager' },
          { name: '客户经理联系方式', property: 'customerManagerPhone', minWidth: 120 },
          {
            name: '备注',
            property: 'extraData',
            tdSlotName: 'extraData',
            minWidth: 150
          },
          { name: '操作', property: 'operate', tdSlotName: 'operate', fixed: 'right' },
        ],
        getTableList: {
          fn: getTableList,
        },

      }
    },
  },
  methods: {
    confirmHandle(row) {
      const { id } = row
      this._decisionHandle({ affirm: true, ids: [id] })
    },
    rejectHandle(row) {
      const { id } = row
      this._decisionHandle({ affirm: false, ids: [id] })
    },
    seeHandle(row) {
      const { id } = row
      const { getProcess } = ajaxStore.factoryService.qjd.white
      getProcess({ showId: id }).then((res = {}) => {
        const { data: { data, code, message } } = res
        if (code === '0') {
          this.processData = data || {}
        } else {
          this.$message.error(message)
        }
        this.visible = true
      })
    },
    _decisionHandle(params) {
      const { decisionHandle } = ajaxStore.factoryService.qjd.white
      decisionHandle(params).then((res = {}) => {
        const { data: { code, message } } = res
        const { affirm } = params
        if (code === '0') {
          affirm && this.$message.success('已确认')
          !affirm && this.$message.success('已驳回')
          this.$refs.listPage.getTableList()
        } else {
          this.$message.error(message)
        }
      })
    },
    closeHandle() {
      this.visible = false
    },
    async getTableList(params) {
      const res = await ajaxStore.factoryService.qjd.white.getSearchList(params)
      if (res?.data?.code === '0') {
        const resData = res.data.data
        // 为列表数据添加历史额度的浮层的默认属性
        resData.pagedRecords && resData.pagedRecords.forEach(item => {
          item.historyCreditPopover = {
            requested: false, // 是否已完成获取
            loading: false,
            list: []
          }
        })
        return {
          tableList: resData.pagedRecords,
          currentPage: resData.pageNo,
          totalCount: resData.totalCount
        }
      }
      return {
        tableList: [],
        currentPage: 1,
        totalCount: 0
      }
    },
    // 修改备注后刷新表格
    refreshTable() {
      this.$refs.listPage.getTableList()
    },
    // 显示修改备注的弹框
    showRemarkDialog(row) {
      this.remarkDialog.params = {
        showId: row.id,
        extraData: row.extraData
      }
      this.remarkDialog.visible = true
    },
    // 显示历史额度的弹框
    showHistoryCreditDialog(row) {
      this.historyCreditDialog.params = {
        companyId: row.cifCompanyId,
        supplierId: row.supplierId
      }
      this.historyCreditDialog.visible = true
    },
  }
}
</script>
<style lang="stylus" scoped>
.white-content
  background #fff
  padding 20px
.page-main-search--red
  color #f05a4a
.p-history-credit-icon
  margin-left 6px
  cursor pointer
.p-remark
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
</style>
