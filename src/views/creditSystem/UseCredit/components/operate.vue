<template lang="pug">
.useCredit-btns
  div
    el-button(type="primary" weblogs-anchor="common-consume-create" @click="createCreditHandle" v-if="permissions['PTN:SUPPLIER:SAASCREDIT_USE:MANAGE:CREATE']") 新建用信单
    el-button(type="primary" weblogs-anchor="common-consume-upload" @click="leadHandle" v-if="permissions['PTN:SUPPLIER:SAASCREDIT_USE:MANAGE:IMPORT']") 批量导入
    el-button(type="primary" :disabled="!dataSource.length" @click="closeHandle" v-if="permissions['PTN:SUPPLIER:SAASCREDIT_USE:MANAGE:BATCH']") 批量关单
  div
    el-button(type="text" weblogs-anchor="common-consume-record" @click="recordHandle" v-if="permissions['PTN:SUPPLIER:SAASCREDIT_USE:MANAGE:IMPORT']") 批量处理记录
    el-button(type="text" weblogs-anchor="common-consume-operate" @click="operateRecordHandle" v-if="permissions['PTN:SUPPLIER:SAASCREDIT_USE:MANAGE:IMPORT']") 操作记录
</template>
<script>
import store from '@/store'

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    checkInfo: Function
  },
  setup(props, { emit, root }) {
    const { state: { permissions } } = store
    // 新建用信
    const createCreditHandle = () => {
      props.checkInfo && props.checkInfo({ appScenario: 'create_order' })
      emit('createCreditHandle')
    }
    // 批量导入
    const leadHandle = () => {
      props.checkInfo && props.checkInfo({ appScenario: 'create_order' })
      emit('leadHandle')
    }
    // 跳转批量处理记录
    const recordHandle = () => root.$router.push({ name: 'useRecord' })
    // 操作记录
    const operateRecordHandle = () => emit('operateRecordHandle')
    // 批量关单
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
