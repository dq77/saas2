<template lang="pug">
.global-main
  //- 查询
  Search(
    :searchHandle="tableApis.searchHandle"
    :getPayAmount="currentAPis.getPayAmount"
    :loading="tableApis.loading"
    :isAccount="currentAPis.isAccount"
    :setCunstomName="currentAPis.setCunstomName"
    @searchFormHandle="searchFormHandle"
    @resetFormHandle="resetFormHandle"
  )
  div(style="background: #fff;")
    //- 初始化空态
    .credit-empty(v-show="currentAPis.isInit") 请输入筛选条件查询数据
    //- 非初始化
    div(style="padding: 20px;" v-show="!currentAPis.isInit")
      .credit-num(v-if="currentAPis.isAccount !=='none'")
        span 还款账户总额：
        span {{ currentAPis.payAmount }}
      //- table
      Table(
        ref="tableRef"
        :dataSource="tableApis.dataSource"
        :columns="tableApis.columns"
        :loading="tableApis.loading"
        :checkbox="true"
        :checkBoxDisabled="currentAPis.checkBoxDisabled"
        @selectionHandle="selectionHandle"
        @cellChangeHandle="editHandle"
      )
      //- 本次还款总额 & 总额
      Money(
        :currentPay="currentAPis.currentPay"
        :payAmount="currentAPis.payAmount"
        :isAccount="currentAPis.isAccount"
      )
      //- 分页
      Pagination(:pagination="tableApis.pagination")
      .pay-button
        el-button(type="primary" @click="payHandle", v-show="currentAPis.isPay") 提交还款
  //- 弹窗
  Modal(
    :visible="modalApis.visible"
    :title="modalApis.title"
    :detail="modalApis.detail"
    :isAccount="currentAPis.isAccount"
    @cancleHandle="modalApis.cancleHandle"
    @successHandle="successHandle"
  )

</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import Money from './money'
import Modal from './modal'
import Search from './search'
import useTable from 'hooks/useTable'
import useModal from 'hooks/useModal'
import useCurrent from './index'
import { columns } from './config'
import ajaxStore from '@/apis'
import { deepCopy } from '@/utils/qjd'
import { Message } from 'element-ui'

export default {
  components: {
    Table,
    Pagination,
    Search,
    Money,
    Modal
  },
  setup() {
    const { credit: { getRepaymentList } } = ajaxStore
    const tableRef = ref()
    // 当前页面-显示、金额等小逻辑
    const currentAPis = useCurrent()
    // modal
    const modalApis = useModal('')
    // table & page
    const tableApis = useTable({
      request: getRepaymentList,
      isInit: false,
      checkbox: true,
      edit: true,
      isActiveColumn: true,
      columns,
      callback: ({ pagedRecords, totalCount }) => {
        pagedRecords.forEach(item => { item.refundAmount = item.repaymentAmount })
        return {
          totalCount,
          dataSource: pagedRecords
        }
      }
    })
    // table-checkbox勾选
    const selectionHandle = vals => {
      tableApis.selectionChange(vals)
      currentAPis.getCurrentPay(vals)
    }
    // 编辑table
    const editHandle = () => {
      const { setEditChange, dataSource, currentSelects } = tableApis
      setEditChange && setEditChange(dataSource)
      currentAPis.getCurrentPay(currentSelects)
    }
    // 设置columns
    const _setColumns = (repayStatus) => {
      const cols = deepCopy(columns)
      if (repayStatus === 2) cols.splice(cols.length - 1, 1)
      tableApis.setColumns(cols)
    }
    // search-form 提交
    const searchFormHandle = (repayStatus) => {
      const { checkInit, checkBoxDisFn, checkIsPay } = currentAPis
      // 初始化状态修改
      checkInit && checkInit(false)
      // table-checkbox 切换disabled
      checkBoxDisFn && checkBoxDisFn(repayStatus === 1)
      // 提交还款按钮是否显示
      checkIsPay(repayStatus === 1)
      // table-checkbox重置
      tableRef.value && tableRef.value.clearSelection()
      // table-edit重置
      tableApis.clearEdits && tableApis.clearEdits()
      // 设置columns
      _setColumns(repayStatus)
    }
    //  search-form 重置
    const resetFormHandle = () => {
      const { resetHandle, clearEdits } = tableApis
      // table重置
      resetHandle()
      // table-checkbox重置
      tableRef.value && tableRef.value.clearSelection()
      // table-edit重置
      clearEdits && clearEdits()
      // 初始化状态重置
      currentAPis.checkInit && currentAPis.checkInit(true)
    }
    // 提交还款
    const payHandle = () => {
      const { currentSelects, searchInfo } = tableApis
      const { payAmount, currentPay, customerName } = currentAPis
      if (!currentSelects.length) return Message.warning('请勾选订单')
      // 有还款账户且账户余额不足时触发余额校验
      if (currentAPis.isAccount !== 'none' && payAmount - currentPay < 0) return Message.warning('余额不足')
      modalApis.setTitle(currentAPis.isAccount !== 'none' ? '请确定？' : '提交还款单')
      modalApis.setDetail({ payAmount, currentPay, currentSelects, searchInfo, customerName })
      modalApis.openHandle()
    }
    // 确定成功回调
    const successHandle = () => {
      const { searchInfo, searchHandle } = tableApis
      const { customerId, organizationCode: orgCode } = searchInfo || {}
      // 重置金额
      currentAPis.getCurrentPay([])
      // table-checkbox重置
      tableRef.value && tableRef.value.clearSelection()
      // table-edit重置
      tableApis.clearEdits && tableApis.clearEdits()
      // table重查
      searchHandle(searchInfo)
      // 金额重查
      currentAPis.isAccount !== 'none' && currentAPis.getPayAmount({ customerId, orgCode })
    }

    const state = reactive({
      tableApis,
      currentAPis,
      modalApis
    })

    return {
      tableRef,
      selectionHandle,
      editHandle,
      payHandle,
      searchFormHandle,
      resetFormHandle,
      successHandle,
      ...toRefs(state),
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
