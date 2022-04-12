<template lang="pug">
.operate_box
  div
    el-button(type="primary" v-if="permissions['PTN:RECEIVABLE:PALN_MANAGEMENT:MANAGE']" @click="addPlainHandle") 添加计划
    el-button(@click="uploadPlain" v-if="permissions['PTN:RECEIVABLE:PALN_MANAGEMENT:MANAGE'] && permissions['PTN:RECEIVABLE:SEARCH_MANAGEMENT:BATCH_PLAN']") 批量导入应收计划
    el-button(@click="uploadPay" v-if="permissions['PTN:RECEIVABLE:PAYMENT_MANAGEMENT:MANAGE'] && permissions['PTN:RECEIVABLE:SEARCH_MANAGEMENT:BATCH_PAYMENT']") 批量添加收款
  .operate_right
    Sort(
      ref="sortRef"
      :options="options"
      :defaultSort="'created_time'"
      @onChange="onChange"
      @orderHandle="orderHandle"
    )
    el-button(
      type="primary"
      style="margin-left: 15px"
      :loading="loading"
      v-if="permissions['PTN:RECEIVABLE:SEARCH_MANAGEMENT:DATE_EXPORT']"
      @click="uploadHandle"
    ) 数据导出
    el-button(v-if="permissions['PTN:RECEIVABLE:CONFIG_MANAGEMENT:MANAGE']" @click="sysConfigHandle") 应收系统配置
</template>
<script>
import { ref } from '@vue/composition-api'
import store from '@/store'
import Sort from '../components/sort'
import { options } from './config'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'
import { getFileRequest } from './util'

export default {
  components: {
    Sort
  },
  props: {
    search: Function,
    formApis: {
      type: Object,
      default: () => ({})
    },
    statusOptions: Array
  },
  setup(props, { root: { $router }, emit }) {
    // store
    const { state: { permissions } } = store
    // ajax
    const { receive: { uploadDataSource } } = ajaxStore
    // ref
    const sortRef = ref()
    // 切换排序条件
    const onChange = params => props.search && props.search(params)
    // 正序倒序
    const orderHandle = params => props.search && props.search(params)
    // 获取排序参数
    const getSortParams = () => sortRef.value?.getSortVal() ?? {}
    // 添加计划
    const addPlainHandle = () => $router.push({ name: 'PlainForm' })
    // 数据导出 - 接口
    const { doResult, loading } = useAsync({
      request: uploadDataSource,
      init: false,
      successCallBack: res => {
        const { code } = res ?? {}
        code === '0' && Message.success('数据导出申请成功')
      }
    })
    // 数据导出
    const uploadHandle = () => {
      const { formApis: { formData } } = props
      doResult({ reason: '申请', type: 10, requestValue: props.formApis.formData ? JSON.stringify(formData) : '', fileRequest: getFileRequest(formData, props.statusOptions) })
    }
    // 应收系统设置
    const sysConfigHandle = () => $router.push({ name: 'SystemConfig' })
    // 批量导入应收计划
    const uploadPlain = () => emit('uploadPlain')
    // 批量添加收款
    const uploadPay = () => emit('uploadPay')

    return {
      sortRef,
      options,
      onChange,
      orderHandle,
      getSortParams,
      addPlainHandle,
      uploadHandle,
      sysConfigHandle,
      uploadPlain,
      uploadPay,
      loading,
      permissions
    }
  },
}
</script>
<style lang="stylus" scoped>
.operate_box
  display: flex
  justify-content: space-between
  padding 20px
  .operate_right
    display flex
</style>
