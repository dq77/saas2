<template lang="pug">
  .page-wrap
    Card(noTitle)
      el-button(type='primary' @click='dialogVisible=true' style='margin-bottom: 20px' weblogs-anchor='common-customer-import') 批量导入
      Table(:dataSource='dataSource' :cloumns='cloumns'  @oprateBtnClick='oprateHandle' :loading='tableLoading')
      Pagination(:total='total' :pageNo.sync='pagination.pageNo' :pageSize.sync='pagination.pageSize' @cpagination='getCustomerRecordList')
    upload-dialog(:dialogVisible.sync='dialogVisible')
</template>

<script>
import Table from '@/components/commonUse/Table/index'
import Pagination from '@/components/commonUse/Pagination/index'
import Card from '@/components/Card'
import UploadDialog from './uploadDialog'
import { taskStatus } from '@/utils/enums'
import { toPrefixUrl } from '@/utils/util'
import ajaxStore from '@/apis'

export default {
  components: {Table, Card, Pagination, UploadDialog},
  data() {
    return {
      dialogVisible: false,
      cloumns: [
        {label: '任务编号', key: 'taskId'},
        {label: '创建时间', key: 'createdTime'},
        {label: '创建人', key: 'createdBy'},
        {
          label: '任务状态',
          key: 'taskStatus',
          formatter: (row) => taskStatus[row.taskStatus],
        },
        {
          label: '导入数量',
          key: 'entityCompany',
          render: (h, scope) => {
            const { totalNum, taskStatus } = scope.row
            const str = taskStatus === '0' ? '--' : totalNum
            return <span> {str} </span>
          }
        },
        {
          label: '导入结果',
          key: 'invoiceType',
          render: (h, scope) => {
            const {successNum, failNum, taskStatus} = scope.row
            return (
              <div>
                <div>成功数：{taskStatus === '0' ? '--' : successNum}</div>
                <div>失败数：<span style='color:red'>{taskStatus === '0' ? '--' : failNum}</span></div>
              </div>
            )
          }
        },
        {
          label: '操作',
          key: 'operate',
          options: [
            {
              label: '刷新',
              render: (row) => {
                const str = row.taskStatus === '0' ? '刷新' : row.taskStatus === '2' ? '下载错误报告' : ''
                return str
              }
            }
          ]
        },
      ],
      dataSource: [],
      total: 0,
      pagination: {
        pageNo: 1,
        pageSize: 10,
      },
      tableLoading: false,
    }
  },
  methods: {
    async getCustomerRecordList() {
      const res = await ajaxStore.common.customer.getCustomerRecordList({...this.pagination})
      const {data: {data, code}} = res || {}
      const { pagedRecords, totalCount } = data
      if (code === '0') {
        this.dataSource = pagedRecords
        this.total = totalCount
      }
      return code
    },
    oprateHandle(row, btn) {
      if (row.taskStatus === '0') {
        this.getCustomerRecordList().then(code => {
          if (code === '0') {
            this.$message.success('刷新成功')
          }
        })
      }
      if (row.taskStatus === '2') {
        window.open(toPrefixUrl(`/saas-boss/customer/exportErrorExcelData?taskId=${row.taskId}`))
      }
    },
  },
  mounted() {
    this.getCustomerRecordList()
  }
}
</script>

<style lang="stylus" scoped>
.page-wrap
  padding 0 30px
</style>
