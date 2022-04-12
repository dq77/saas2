<template lang="pug">
.p-main
  BankUpload(title='银行流水：' :status='true' :bankInfo='uploadObj.bankInfo' ref='bankRef' :uploadParam='bankParam')
  NormalUpload(title='企业征信报告：' :info='uploadObj.reportInfo' ref='reportRef' :uploadParam='recordParam')
  NormalUpload(title='企业信息授权协议：' :status='true' :info='uploadObj.dealInfo' ref='dealRef' :uploadParam='dealParam')
</template>
<script>
import { ref, reactive, toRefs, watch } from '@vue/composition-api'
import BankUpload from './bankUpload'
import NormalUpload from './normalUpload'

export default {
  props: {
    owner: {
      type: String,
      defaultValue: ''
    },
    uploadObj: {
      type: Object,
      defaultValue: () => {
        return {
          bankInfo: [],
          reportInfo: [],
          dealInfo: [],
        }
      }
    }
  },
  components: {
    BankUpload,
    NormalUpload
  },
  setup(props, {emit}) {
    const bankRef = ref()
    const reportRef = ref()
    const dealRef = ref()
    const state = reactive({
      bankParam: {
        type: 'C0002',
        owner: props.owner,
        ownerType: '2',
      },
      recordParam: {
        type: 'C0001',
        owner: props.owner,
        ownerType: '2',
      },
      dealParam: {
        type: 'C0003',
        owner: props.owner,
        ownerType: '2',
      }
    })
    const getUpload = () => {
      return {
        bankState: bankRef.value.getState(),
        reportState: reportRef.value.getState(),
        dealState: dealRef.value.getState(),
      }
    }
    const checkUpload = () => {
      const {bankState, reportState, dealState} = getUpload()
      const result = [bankState, reportState, dealState].some(state => {
        const isEmpty = state.dataSource.some(item => !item.fileKey)
        return isEmpty
      })
      return !result
    }
    const getDataSource = () => {
      const {bankState, reportState, dealState} = getUpload()
      return {
        bankInfo: bankState.dataSource,
        reportInfo: reportState.dataSource,
        dealInfo: dealState.dataSource
      }
    }
    watch(() => props.owner, (val, preVal) => {
      state.bankParam = {
        type: 'C0002',
        owner: val,
        ownerType: '2',
      }
      state.recordParam = {
        type: 'C0001',
        owner: val,
        ownerType: '2',
      }
      state.dealParam = {
        type: 'C0003',
        owner: val,
        ownerType: '2',
      }
    }, { immediate: true })
    return {
      bankRef,
      reportRef,
      dealRef,
      getUpload,
      checkUpload,
      getDataSource,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-main
  border 1px solid #F2F2F6
</style>
