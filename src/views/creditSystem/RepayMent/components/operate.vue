<template lang="pug">
.useCredit-btns
  div
    el-button(type="primary" weblogs-anchor="common-consume-payCreate" @click="createCreditHandle" v-if="permissions['PTN:SUPPLIER:SAASCREDIT_PAY:MANAGE:CREATE']") 新建还款单
    el-button(type="primary" weblogs-anchor="common-consume-payUpload" @click="leadHandle" v-if="permissions['PTN:SUPPLIER:SAASCREDIT_PAY:MANAGE:IMPORT']") 批量导入
    el-button(type="primary" :disabled="!dataSource.length" @click="closeHandle" v-if="permissions['PTN:SUPPLIER:SAASCREDIT_PAY:MANAGE:BATCH']") 批量退款
  div
    el-button(type="text" weblogs-anchor="common-consume-payRecord" @click="recordHandle" v-if="permissions['PTN:SUPPLIER:SAASCREDIT_PAY:MANAGE:IMPORT']") 批量处理记录
    el-button(type="text" weblogs-anchor="common-consume-payOperate" @click="operateRecordHandle" v-if="permissions['PTN:SUPPLIER:SAASCREDIT_PAY:MANAGE:IMPORT']") 操作记录
</template>
<script>
import store from '@/store'

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props, { emit, root }) {
    const { state: { permissions } } = store
    // 新建用信
    const createCreditHandle = () => emit('createCreditHandle')
    // 批量导入
    const leadHandle = () => emit('leadHandle')
    // 跳转批量处理记录
    const recordHandle = () => root.$router.push({ name: 'repayMentRecord' })
    // 操作记录
    const operateRecordHandle = () => emit('operateRecordHandle')
    // 批量还款
    const closeHandle = () => emit('closeHandle')

    return {
      createCreditHandle,
      leadHandle,
      recordHandle,
      operateRecordHandle,
      closeHandle,
      permissions
    }
  },
}
</script>
<style lang="stylus" scoped>
.useCredit-btns
  padding 20px 20px 0 20px
  display flex
  justify-content space-between
</style>
