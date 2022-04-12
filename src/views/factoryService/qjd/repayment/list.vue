<!--
 * @Date: 2021-07-27 11:16:16
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-08-17 09:47:12
-->
<template lang="pug">
  .page-main
    .order-list-content
      Card(noTitle noWrap style='margin-bottom: 10px;')
        .form-area
          el-form(:model="form")
            .search-area
              .search-item
                el-form-item(label="客户名称")
                  el-input(v-model="form.companyName" placeholder="请输入客户名称")
              .search-item
                el-form-item(label="货款编号")
                  el-input(v-model="form.loanOrderCode" placeholder="请输入货款编号")
              .search-item
                el-form-item(label="订单编号")
                  el-input(v-model="form.qjdOrderCode" placeholder="请输入订单编号")
              .search-item
                el-form-item(label="支付状态")
                  el-select(v-model="form.repaymentStatus" placeholder="请选择支付状态")
                    el-option(v-for='(value,key) in repayStatus' :key='key' :label='value' :value='key')
              .search-item
                el-form-item(label="到期时间")
                  el-date-picker(v-model="form.timeList" placeholder="请选择到期时间" start-placeholder="开始日期" end-placeholder="结束日期" type="daterange" value-format='yyyy-MM-dd' :editable='false' unlink-panels)
              .search-item.btn-list
                el-button(type='primary' :loading='loading' @click='querySearchForm') 搜索
                el-button(:loading='loading' @click='resetSearchForm') 重置
      Card(noTitle noWrap)
        .table-area
          DataExport.export-btn(
            weblogsMain='factory-openPlatform-repayment-export'
            weblogsSubmit='factory-openPlatform-repayment-export-submit'
            weblogsCancel='factory-openPlatform-repayment-export-cancel'
            page='REPAYMENT_EXP'
            :params='exportParams'
            :str='translateStr'
          )
          el-table(:data="tableList" v-loading='loading' @sort-change='handleSortChange' stripe)
            el-table-column(prop="qjdOrderCode" label="订单编号" min-width="120")
            el-table-column(prop="loanOrderCode" label="货款编号" min-width="120")
            el-table-column(prop="companyName" label="客户名称" min-width="120")
            el-table-column(prop="projectName" label="项目名称" min-width="120")
            el-table-column(prop="orderAmount" label="订单金额" min-width="80")
              template(slot-scope='{row}')
                span {{row.orderAmount ? `¥${toAmountStr(row.orderAmount, 2, true)}`: '--'}}
            el-table-column(prop="creditAmount" label="赊销金额" min-width="80")
              template(slot-scope='{row}')
                span {{row.creditAmount ? `¥${toAmountStr(row.creditAmount, 2, true)}`: '--'}}
            el-table-column(prop="principalExpiredTime" label="到期时间" min-width="90")
              template(slot-scope='{row}')
                span {{row.principalExpiredTime ? row.principalExpiredTime.slice(0, 10) : '--'}}
            el-table-column(prop="principalRepaidAmount" label="已付金额" min-width="80")
              template(slot-scope='{row}')
                span {{row.principalRepaidAmount ? `¥${toAmountStr(row.principalRepaidAmount, 2, true)}`: '--'}}
            el-table-column(prop="principalRemainAmount" label="剩余未付金额" min-width="80")
              template(slot-scope='{row}')
                span {{row.principalRemainAmount ? `¥${toAmountStr(row.principalRemainAmount, 2, true)}`: '--'}}
            el-table-column(prop="repaymentStatus" label="支付状态" min-width="80")
              template(slot-scope='{row}')
                span {{ repayStatus[row.repaymentStatus] }}
            el-table-column(prop="operate" label="操作" fixed="right" min-width="100")
              template(slot-scope='{row}')
                .u-nowrap
                  el-button.u-btn(
                    weblogs-anchor='factory-openPlatform-repayment-payDetail'
                    type='text'
                    @click='clickDetail(row)'
                  ) 支付明细
          el-pagination(:total='totalCount' :current-page.sync='pageNo' @current-change='changePage' layout='total, prev, pager, next, jumper')
      detailDialog(:show.sync='showDetail' @close='clickDetail' :row='detailRow')
</template>
<script>
import { onMounted, ref, reactive } from '@vue/composition-api'
import { toAmountStr } from '@/utils/util'
import ajaxStore from '@/apis'
import Card from '@/components/Card'
import DataExport from '@/components/export/dataExport'
import { deepCopy } from '@/utils/qjd'
import { Message } from 'element-ui'
import detailDialog from './components/detailDialog'

export default {
  components: {
    DataExport, Card, detailDialog
  },
  setup(props, context) {
    const loading = ref(true)
    const showDetail = ref(false)
    const tableList = ref([])
    const pageNo = ref(1)
    const totalCount = ref(0)
    const translateStr = ref('')
    const detailRow = ref({})
    const exportParams = ref({})
    const form = reactive({
      companyName: '',
      projectName: '',
      loanOrderCode: '',
      qjdOrderCode: '',
      repaymentStatus: '',
      timeList: '',
      PageSize: 10
    })
    const params = ref({})

    const repayStatus = {
      WAIT_REPAYMENT: '待支付',
      REPAID: '已支付',
      BREACH_CONTRACT: '违约',
    }

    // 获取表格信息
    const getTableList = async (params) => {
      for (const key in params) {
        if (params[key] === '') {
          delete params[key]
        }
      }
      translateParams(params) // 参数语义化
      loading.value = true
      const { getRepayList } = ajaxStore.factoryService.qjd
      const res = await getRepayList(params)
      loading.value = false
      if (res.data && res.data.code === '0') {
        tableList.value = res.data.data.pagedRecords
        totalCount.value = res.data.data.totalCount
      }
    }

    const auditAudit = async (row) => {
      const { auditAudit } = ajaxStore.factoryService.qjd
      const res = await auditAudit({ id: row.id })
      if (res.data && res.data.code === '0') {
        Message.success(res.data.message)
      } else {
        Message.error(res.data.message)
      }
    }

    const translateParams = (params) => {
      let str = ''
      for (const key in params) {
        switch (key) {
          case 'companyName':
            str += `客户名称：${params.companyName}。`; break
          case 'projectName':
            str += `项目名称：${params.projectName}。`; break
          case 'loanOrderCode':
            str += `贷款编号：${params.loanOrderCode}。`; break
          case 'qjdOrderCode':
            str += `订单编号：${params.qjdOrderCode}。`; break
          case 'repaymentStatus':
            str += `支付状态：${repayStatus[params.repaymentStatus]}。`; break
          case 'principalExpiredTimeBegin':
            str += `开始日期：${params.principalExpiredTimeBegin.slice(0, 10)}。`; break
          case 'principalExpiredTimeEnd':
            str += `结束日期：${params.principalExpiredTimeEnd.slice(0, 10)}。`; break
        }
      }
      translateStr.value = str
      exportParams.value = params
    }

    const clickDetail = async (row) => {
      if (row) {
        showDetail.value = true
        detailRow.value = row
      } else {
        showDetail.value = false
      }
    }

    const querySearchForm = async () => {
      pageNo.value = 1
      params.value = deepCopy(form)
      delete params.value.timeList
      if (form.timeList && form.timeList.length) {
        params.value.principalExpiredTimeBegin = form.timeList[0] + ' 00:00:00'
        params.value.principalExpiredTimeEnd = form.timeList[1] + ' 23:59:59'
      }
      getTableList({ pageNo: pageNo.value, ...params.value })
    }

    const resetSearchForm = async () => {
      for (const key in form) {
        if (form[key] !== '') {
          form[key] = ''
          params.value[key] = ''
        }
      }
      querySearchForm()
    }

    const handleSortChange = (e) => {
      if (e && e.order) {
        if (e.order === 'ascending') {
          form.ascs = e.prop
          form.descs = undefined
        } else if (e.order === 'descending') {
          form.descs = e.prop
          form.ascs = undefined
        }
      } else {
        form.descs = undefined
        form.ascs = undefined
      }
      querySearchForm()
    }

    const changePage = () => {
      getTableList({ pageNo: pageNo.value, ...params.value })
    }

    onMounted(() => {
      getTableList({ pageNo: pageNo.value })
    })

    return {
      pageNo,
      totalCount,
      loading,
      showDetail,
      detailRow,
      form,
      tableList,
      repayStatus,
      translateStr,
      exportParams,
      handleSortChange,
      getTableList,
      auditAudit,
      clickDetail,
      querySearchForm,
      resetSearchForm,
      changePage,
      toAmountStr
    }
  }
}
</script>
<style lang="stylus">
.order-list-content
  .form-area
    padding 10px
    .search-area
      display flex
      flex-wrap wrap
      .search-item
        width 25%
        padding 0 10px
        .el-form-item__label
          display block
          width 100%
          text-align left
          color #494949
        .el-select
          width 100%
        .el-date-editor--daterange.el-input__inner
          width 100%
      .btn-list
        margin-left auto
        display flex
        justify-content flex-end
        align-items flex-end
        padding-bottom 18px
  .table-area
    padding 20px
    .export-btn
      margin-bottom 10px
    .u-btn + .u-btn
      margin-left 5px
  .el-pagination
    text-align right
    padding 20px
</style>
