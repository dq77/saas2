<!--
 * @Date: 2021-08-09 14:17:36
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-08-18 09:50:40
-->
<template lang="pug">
.risk-cooperate-list-dialog
  el-dialog(:title="titleType[row.column]" :visible.sync="show" width="800px" :before-close="handleClose")
    el-table(:data="tableList" v-loading='loading' stripe)
      el-table-column(
        v-for='item in tableColumn[row.column]'
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width || '80'"
        :key='item.label'
      )
    el-pagination(:total='totalCount' :current-page.sync='pageNo' @current-change='changePage' layout='total, prev, pager, next, jumper')
</template>
<script>
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'
import { ref, watch } from '@vue/composition-api'

export default {
  props: {
    show: {
      type: Boolean,
      defaultValue: false
    },
    row: {
      type: Object,
      defaultValue: () => {}
    }
  },
  components: {
  },
  setup(props, context) {
    const titleType = ['排黑前置', '授信审批', '项目审批']
    const { getExcludeBlack, getCreditApproval, getProjectApproval } = ajaxStore.factoryService.qjd
    const urlList = [getExcludeBlack, getCreditApproval, getProjectApproval]
    const tableColumn = [
      [
        { label: '编号', prop: 'id' },
        { label: '审批结果', prop: 'approvalResults' },
        { label: '流程状态', prop: 'processStatus' },
        { label: '提交时间', prop: 'submissionTime' },
      ],
      [
        { label: '编号', prop: 'id' },
        { label: '授信审批结果', prop: 'creditApprovalResult' },
        { label: '授信审批意见', prop: 'creditApprovalOpinion' },
        { label: '流程状态', prop: 'processStatus' },
        { label: '提交时间', prop: 'submissionTime' },
      ],
      [
        { label: '编号', prop: 'id' },
        { label: '项目审核结果', prop: 'projectApprovalResult' },
        { label: '项目审批意见', prop: 'projectApprovalOpinion' },
        { label: '流程状态', prop: 'processStatus' },
        { label: '提交时间', prop: 'submissionTime' },
      ]
    ]

    const loading = ref(true)
    const tableList = ref([])
    const pageNo = ref(1)
    const totalCount = ref(0)

    const getTableList = async () => {
      const params = {
        companyId: props.row.id,
        pageNo: pageNo.value
      }
      loading.value = true
      const res = await urlList[props.row.column](params)
      loading.value = false
      if (res.data && res.data.code === '0') {
        tableList.value = res.data.data.pagedRecords
        totalCount.value = res.data.data.totalCount
      }
    }

    watch(() => props.show, (val, preVal) => {
      if (val) {
        getTableList()
      }
    })

    const changePage = () => {
      getTableList()
    }

    const handleClose = () => {
      context.emit('close')
      pageNo.value = 1
    }

    return {
      loading,
      tableList,
      pageNo,
      totalCount,
      titleType,
      tableColumn,
      toAmountStr,
      changePage,
      handleClose
    }
  },
}
</script>
<style lang="stylus">
.risk-cooperate-list-dialog
  .el-dialog__body
    padding 10px 20px
</style>
