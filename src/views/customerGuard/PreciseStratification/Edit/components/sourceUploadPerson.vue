<template lang="pug">
.p-main
  template(v-if='!isSpouse')
    BankUpload(title='银行流水：' :status='true' :bankInfo='uploadObj.bankInfo' ref='bankRef' :uploadParam='bankParam')
    NormalUpload(title='实控人征信报告：' :info='uploadObj.reportInfo' ref='reportRef' :uploadParam='recordParam')
    NormalUpload(title='实控人信息授权协议：' :status='true' :info='uploadObj.dealInfo' ref='dealRef' :uploadParam='dealParam')
  template(v-else)
    BankUpload(title='配偶银行流水：' :status='hasSpouse' :bankInfo='uploadObj.spouseBankInfo' ref='spouseBankRef' :uploadParam='spouseBankParam')
    NormalUpload(title='配偶征信报告：' :info='uploadObj.spouseReportInfo' ref='spouseReportRef' :uploadParam='spouseRecordParam')
    NormalUpload(title='配偶信息授权协议：' :status='hasSpouse' :info='uploadObj.spouseDealInfo' ref='spouseDealRef' :uploadParam='spouseDealParam')
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
    hasSpouse: {
      type: Boolean,
      defaultValue: false
    },
    isSpouse: {
      type: Boolean,
      defaultValue: false
    },
    uploadObj: {
      type: Object,
      defaultValue: () => {
        return {
          bankInfo: [],
          reportInfo: {},
          dealInfo: {},
          spouseBankInfo: [],
          spouseReportInfo: {},
          spouseDealInfo: {}
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
    const spouseBankRef = ref()
    const spouseReportRef = ref()
    const spouseDealRef = ref()
    const state = reactive({
      bankParam: {
        type: 'C0002',
        owner: props.owner,
        ownerType: '1',
      },
      recordParam: {
        type: 'C0004',
        owner: props.owner,
        ownerType: '1',
      },
      dealParam: {
        type: 'C0003',
        owner: props.owner,
        ownerType: '1',
      },
      spouseBankParam: {
        type: 'C0002',
        owner: props.owner,
        ownerType: '1',
      },
      spouseRecordParam: {
        type: 'C0004',
        owner: props.owner,
        ownerType: '1',
      },
      spouseDealParam: {
        type: 'C0003',
        owner: props.owner,
        ownerType: '1',
      }
    })
    const getUpload = () => {
      return !props.isSpouse ? {
        bankState: bankRef.value.getState(),
        reportState: reportRef.value.getState(),
        dealState: dealRef.value.getState(),
      } : {
        bankState: spouseBankRef.value.getState(),
        reportState: spouseReportRef.value.getState(),
        dealState: spouseDealRef.value.getState(),
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
        ownerType: '1',
      }
      state.recordParam = {
        type: 'C0004',
        owner: val,
        ownerType: '1',
      }
      state.dealParam = {
        type: 'C0003',
        owner: val,
        ownerType: '1',
      }
      state.spouseBankParam = {
        type: 'C0002',
        owner: val,
        ownerType: '1',
      }
      state.spouseRecordParam = {
        type: 'C0004',
        owner: val,
        ownerType: '1',
      }
      state.spouseDealParam = {
        type: 'C0003',
        owner: val,
        ownerType: '1',
      }
    }, { immediate: true })
    return {
      bankRef,
      reportRef,
      dealRef,
      spouseBankRef,
      spouseReportRef,
      spouseDealRef,
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
