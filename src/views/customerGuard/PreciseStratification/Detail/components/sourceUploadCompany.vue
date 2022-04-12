<template lang="pug">
.p-main
  BankUpload(title='银行流水：' :bankInfo='uploadObj.bankInfo' ref='bankRef')
  NormalUpload(title='企业征信报告：' :info='uploadObj.reportInfo' ref='reportRef')
  NormalUpload(title='企业信息授权协议：' :info='uploadObj.dealInfo' ref='dealRef')
</template>
<script>
import BankUpload from './bankUpload'
import NormalUpload from './normalUpload'

export default {
  props: {
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
    return {
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-main
  border 1px solid #F2F2F6
</style>
