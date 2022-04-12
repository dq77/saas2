<template lang="pug">
.p-source
  template(v-if='!isSpouse')
    BankUpload(title='银行流水：' :bankInfo='uploadObj.bankInfo' ref='bankRef')
    NormalUpload(title='法人征信报告：' :info='uploadObj.reportInfo' ref='reportRef')
    NormalUpload(title='法人信息授权协议：' :info='uploadObj.dealInfo' ref='dealRef')
  template(v-else)
    BankUpload(title='配偶银行流水：' :bankInfo='uploadObj.spouseBankInfo' ref='spouseBankRef')
    NormalUpload(title='配偶征信报告：' :info='uploadObj.spouseReportInfo' ref='spouseReportRef')
    NormalUpload(title='配偶信息授权协议：' :info='uploadObj.spouseDealInfo' ref='spouseDealRef')
</template>
<script>
import BankUpload from './bankUpload'
import NormalUpload from './normalUpload'

export default {
  props: {
    isSpouse: {
      type: Boolean,
      defaultValue: false
    },
    uploadObj: {
      type: Object,
      defaultValue: () => {
        return {
          bankInfo: [],
          reportInfo: [],
          dealInfo: [],
          spouseBankInfo: [],
          spouseReportInfo: [],
          spouseDealInfo: []
        }
      }
    }
  },
  components: {
    BankUpload,
    NormalUpload
  },
  setup(props, {emit}) {
    return {
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-source
  border 1px solid #F2F2F6
  margin 20px 0
</style>
