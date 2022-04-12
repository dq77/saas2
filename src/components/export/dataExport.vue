<!--
 * @Date: 2021-07-22 14:22:24
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-08-06 14:24:50
-->
<template lang="pug">
  .export-btn-area(v-if='hasPermission')
    el-button.down-btn(
      :weblogs='weblogsMain || undefined'
      @click='() => {show = true}'
    )
      span
        i.icon.iconfont.icondaochu
      span 数据导出
    el-dialog(title='数据导出' :visible.sync='show' width='300px')
      el-form(:rules='rules' :model='exportForm' ref='exportFormRef' label-position='left' label-width='70px')
        el-form-item(label='申请原因' prop='reason')
          el-input(v-model='exportForm.reason' type='text')
      br
      el-button.submit-export-btn(
        :weblogs='weblogsSubmit || undefined'
        type='primary'
        @click='submitExport'
      ) 提交
      el-button(
        :weblogs='weblogsCancel || undefined'
        @click='() => {show = false}'
      ) 取消
    el-dialog.tips(title='导出提示：' :visible.sync='tipsShow' width='500px')
      div 1.当前筛选数据将被全部导出；
      div
        span 2.请前往顶部菜单“数据导出中心”&nbsp;
        i.icon.iconfont.iconshujudaochuzhongxin
        span &nbsp;下载导出文件；
      div(slot='footer' style='text-align:center')
        el-button(@click='tipsShow = false') 稍后前往下载
        el-button(type='primary' @click='goDown') 立即前往下载
</template>
<script>
import ajaxStore from '@/apis'
import { deepCopy } from '@/utils/qjd'
import store from '@/store'
import Router from '@/router'
import { onMounted, reactive, ref, computed } from '@vue/composition-api'

export default {
  props: {
    page: {
      type: String,
      defaultValue: ''
    },
    params: {
      type: Object,
      defaultValue: () => {}
    },
    str: {
      type: String,
      defaultValue: ''
    },
    weblogsMain: {
      type: String,
    },
    weblogsCancel: {
      type: String,
    },
    weblogsSubmit: {
      type: String,
    },
  },
  components: {
  },
  setup(props, context) {
    const show = ref(false)
    const tipsShow = ref(false)
    const exportFormRef = ref(null)
    const rules = { reason: [{required: true, message: '请输入申请原因', trigger: 'blur'}] }
    const exportForm = reactive({ reason: '' })
    const hasPermission = computed(() => {
      const permissionList = {
        ORDER_EXP: 'PTN:SUPPLIER:ORDER:DETAIL:EXPORT', // 订单列表导出
        PAYMENT_EXP: 'PTN:SUPPLIER:LOAN:DETAIL:EXPORT', // 支付列表导出
        REPAYMENT_EXP: 'PTN:SUPPLIER:SAASCREDIT_REFUND:DETAIL:EXPORT', // 还款列表导出
        CREDIT_DETAILS_EXP: 'PTN:SUPPLIER:CREDIT:DETAIL:EXPORT', // 赊销明细导出
      }
      const permissions = store.state.permissions
      return permissions[permissionList[props.page]]
    })

    const submitExport = () => {
      exportFormRef.value.validate(async (valid) => {
        if (valid) {
          show.value = false
          tipsShow.value = true
          const condition = deepCopy(props.params)
          delete condition.pageNo
          delete condition.pageSize
          const params = {
            reason: exportForm.reason,
            dataExportType: props.page,
            conditionViewText: props.str,
            condition,
          }
          await ajaxStore.common.dataExport.dataExport(params)
        }
      })
    }
    const goDown = () => {
      Router.push({
        name: 'exportList'
      })
    }
    onMounted(() => {
    })

    return {
      show,
      tipsShow,
      rules,
      exportForm,
      submitExport,
      exportFormRef,
      hasPermission,
      goDown
    }
  },
}
</script>
<style lang="stylus">
.export-btn-area
  .down-btn
    padding 2px 15px
    .iconfont
      margin-right 4px
      font-size 12px
      vertical-align bottom
  .tips
    .el-dialog__body
      color #494949
</style>
